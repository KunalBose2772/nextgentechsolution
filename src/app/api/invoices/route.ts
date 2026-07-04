import { NextRequest, NextResponse } from "next/server";
import { getServerSupabase, isSupabaseConfigured, nextInvoiceId, nextPaymentId, logActivity } from "@/lib/supabase";
import { verifyToken, TOKEN_KEY } from "@/lib/auth";

async function getUser(req: NextRequest) {
  const token = req.cookies.get(TOKEN_KEY)?.value;
  if (!token) return null;
  return verifyToken(token);
}

export async function GET(req: NextRequest) {
  const user = await getUser(req);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  if (!isSupabaseConfigured()) {
    return NextResponse.json({ data: [], total: 0, page: 1, limit: 20, totalPages: 0 });
  }

  const supabase = getServerSupabase()!;
  const { searchParams } = new URL(req.url);
  const page   = Math.max(1, Number(searchParams.get("page")  ?? 1));
  const limit  = Math.min(100, Number(searchParams.get("limit") ?? 20));
  const status = searchParams.get("status");

  let query = supabase.from("invoices").select("*", { count: "exact" });
  if (user.role === "telecaller") query = query.eq("created_by", user.sub as string);
  if (status) query = query.eq("status", status);

  const from = (page - 1) * limit;
  const { data, count, error } = await query
    .order("created_at", { ascending: false })
    .range(from, from + limit - 1);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({
    data: (data ?? []).map(mapInvoice),
    total: count ?? 0,
    page,
    limit,
    totalPages: Math.ceil((count ?? 0) / limit),
  });
}

export async function POST(req: NextRequest) {
  const user = await getUser(req);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  if (!isSupabaseConfigured()) {
    return NextResponse.json({ error: "Database not configured" }, { status: 503 });
  }

  const supabase = getServerSupabase()!;
  const body = await req.json();

  // Telecaller restriction: lead is required and must be assigned to them
  if (user.role === "telecaller") {
    if (!body.lead) {
      return NextResponse.json(
        { error: "Telecallers must select a lead to create an invoice" },
        { status: 403 }
      );
    }
    const { data: leadRow, error: leadErr } = await supabase
      .from("leads")
      .select("id, assigned_to")
      .eq("id", body.lead)
      .single();

    if (leadErr || !leadRow) {
      return NextResponse.json({ error: "Lead not found" }, { status: 404 });
    }
    if (leadRow.assigned_to !== user.sub) {
      return NextResponse.json(
        { error: "You can only create invoices for leads assigned to you" },
        { status: 403 }
      );
    }
  }

  const invoiceId = await nextInvoiceId(supabase);
  const dueAmount = Number(body.total) - Number(body.amountPaid ?? 0);

  const { data, error } = await supabase
    .from("invoices")
    .insert({
      invoice_id:      invoiceId,
      lead_id:         body.lead ?? null,
      quotation_id:     body.quotation ?? null,
      lead_name:       body.leadName,
      lead_email:      body.leadEmail,
      lead_phone:      body.leadPhone,
      lead_company:    body.leadCompany ?? "",
      items:           body.items ?? [],
      subtotal:        body.subtotal,
      discount_amount: body.discountAmount ?? 0,
      tax_rate:        body.taxRate ?? 18,
      tax_amount:      body.taxAmount,
      total:           body.total,
      amount_paid:     body.amountPaid ?? 0,
      due_amount:      dueAmount,
      status:          body.status ?? "unpaid",
      billing_date:    body.billingDate ?? new Date().toISOString(),
      due_date:        body.dueDate,
      terms:           body.terms ?? "",
      bank_details:    body.bankDetails ?? "",
      created_by:      user.sub,
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  // If there is an initial advance payment, auto-insert a payment slip record
  if (body.amountPaid && Number(body.amountPaid) > 0) {
    try {
      const paymentId = await nextPaymentId(supabase);
      const { data: payData, error: payErr } = await supabase
        .from("payments")
        .insert({
          payment_id:       paymentId,
          invoice_id:       data.id,
          lead_id:          body.lead ?? null,
          amount:           Number(body.amountPaid),
          payment_method:   "bank_transfer",
          reference_number: "Initial Advance",
          payment_date:     body.billingDate ?? new Date().toISOString(),
          status:           "completed",
          notes:            "Initial paid advance logged automatically during invoice creation.",
          created_by:       user.sub,
        })
        .select()
        .single();

      if (!payErr && payData) {
        await logActivity({
          type: "payment_created",
          description: `Payment ${paymentId} of Rs.${Number(body.amountPaid).toLocaleString("en-IN")} logged automatically as initial advance`,
          entityType: "payment",
          entityId: payData.id,
          entityName: paymentId,
          performedBy: String(user.sub),
          performedByName: String(user.name),
        });
      } else {
        console.error("[Invoice Creation] Failed to auto-insert payment slip:", payErr?.message);
      }
    } catch (payErr: any) {
      console.error("[Invoice Creation] Error auto-generating payment slip:", payErr.message);
    }
  }

  await logActivity({
    type: "invoice_created",
    description: `Invoice ${invoiceId} created for ${body.leadName}`,
    entityType: "invoice",
    entityId: data.id,
    entityName: invoiceId,
    performedBy: String(user.sub),
    performedByName: String(user.name),
  });

  return NextResponse.json({ data: mapInvoice(data) }, { status: 201 });
}

function mapInvoice(row: Record<string, any>) {
  return {
    _id:            row.id,
    invoiceId:      row.invoice_id,
    lead:           row.lead_id,
    quotation:      row.quotation_id,
    leadName:       row.lead_name,
    leadEmail:      row.lead_email,
    leadPhone:      row.lead_phone,
    leadCompany:    row.lead_company,
    items:          row.items,
    subtotal:       Number(row.subtotal),
    discountAmount: Number(row.discount_amount),
    taxRate:        Number(row.tax_rate),
    taxAmount:      Number(row.tax_amount),
    total:          Number(row.total),
    amountPaid:     Number(row.amount_paid),
    dueAmount:      Number(row.due_amount),
    status:         row.status,
    billingDate:    row.billing_date,
    dueDate:        row.due_date,
    terms:          row.terms,
    bankDetails:    row.bank_details,
    createdBy:      row.created_by,
    createdAt:      row.created_at,
    updatedAt:      row.updated_at,
  };
}
