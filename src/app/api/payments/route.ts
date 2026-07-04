import { NextRequest, NextResponse } from "next/server";
import { getServerSupabase, isSupabaseConfigured, nextPaymentId, logActivity } from "@/lib/supabase";
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

  let query = supabase.from("payments").select("*, invoices(*)", { count: "exact" });
  if (user.role === "telecaller") query = query.eq("created_by", user.sub as string);
  if (status) query = query.eq("status", status);

  const from = (page - 1) * limit;
  const { data, count, error } = await query
    .order("created_at", { ascending: false })
    .range(from, from + limit - 1);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({
    data: (data ?? []).map(mapPayment),
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

  // Telecaller restriction: must own the invoice
  if (user.role === "telecaller" && body.invoiceId) {
    const { data: invRow, error: invErr } = await supabase
      .from("invoices")
      .select("id, created_by")
      .eq("id", body.invoiceId)
      .single();

    if (invErr || !invRow) {
      return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
    }
    if (invRow.created_by !== user.sub) {
      return NextResponse.json(
        { error: "You can only log payments against invoices you created" },
        { status: 403 }
      );
    }
  }

  const payMethod = body.paymentMethod;
  const payRef = body.referenceNumber ? String(body.referenceNumber).trim() : "";

  if (payMethod === "bank_transfer" || payMethod === "upi" || payMethod === "cheque") {
    if (!payRef) {
      return NextResponse.json({ error: "Transaction Reference / UTR is required for this payment method" }, { status: 400 });
    }
  }

  if (payRef) {
    const isAlphanumeric = /^[a-zA-Z0-9]+$/.test(payRef);
    if (!isAlphanumeric) {
      return NextResponse.json({ error: "Transaction Reference / UTR must be alphanumeric (letters and numbers only)" }, { status: 400 });
    }
    if (payRef.length < 12 || payRef.length > 22) {
      return NextResponse.json({ error: "Transaction Reference / UTR must be between 12 and 22 characters" }, { status: 400 });
    }
  }

  // 1. Fetch current Invoice if provided
  let linkedInvoice = null;
  if (body.invoiceId) {
    const { data: inv } = await supabase
      .from("invoices")
      .select("*")
      .eq("id", body.invoiceId)
      .single();
    linkedInvoice = inv;
  }

  const paymentId = await nextPaymentId(supabase);

  // 2. Insert Payment
  const { data, error } = await supabase
    .from("payments")
    .insert({
      payment_id:       paymentId,
      invoice_id:       body.invoiceId ?? null,
      lead_id:          body.leadId ?? (linkedInvoice ? linkedInvoice.lead_id : null),
      amount:           body.amount,
      payment_method:   body.paymentMethod,
      reference_number: body.referenceNumber ?? "",
      payment_date:     body.paymentDate ?? new Date().toISOString(),
      status:           body.status ?? "completed",
      notes:            body.notes ?? "",
      created_by:       user.sub,
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  // 3. If linked to an invoice and payment is completed, adjust invoice balance and status
  if (linkedInvoice && (body.status === "completed" || !body.status)) {
    const newAmountPaid = Number(linkedInvoice.amount_paid) + Number(body.amount);
    const newDueAmount  = Math.max(0, Number(linkedInvoice.total) - newAmountPaid);
    
    let newStatus = "partially_paid";
    if (newDueAmount <= 0) {
      newStatus = "paid";
    }

    await supabase
      .from("invoices")
      .update({
        amount_paid: newAmountPaid,
        due_amount:  newDueAmount,
        status:      newStatus,
        updated_at:  new Date().toISOString()
      })
      .eq("id", linkedInvoice.id);

    // Also update lead status if it is a major client transition
    if (newDueAmount <= 0 && linkedInvoice.lead_id) {
      await supabase
        .from("leads")
        .update({ status: "closed", updated_at: new Date().toISOString() })
        .eq("id", linkedInvoice.lead_id);
    }
  }

  await logActivity({
    type: "payment_created",
    description: `Payment ${paymentId} of Rs.${Number(body.amount).toLocaleString("en-IN")} logged`,
    entityType: "payment",
    entityId: data.id,
    entityName: paymentId,
    performedBy: String(user.sub),
    performedByName: String(user.name),
  });

  return NextResponse.json({ data: mapPayment(data) }, { status: 201 });
}

function mapPayment(row: Record<string, any>) {
  return {
    _id:             row.id,
    paymentId:       row.payment_id,
    invoice:         row.invoices ? {
      _id: row.invoices.id,
      invoiceId: row.invoices.invoice_id,
      leadName: row.invoices.lead_name,
      items: row.invoices.items || [],
    } : row.invoice_id,
    lead:            row.lead_id,
    amount:          Number(row.amount),
    paymentMethod:   row.payment_method,
    referenceNumber: row.reference_number,
    paymentDate:     row.payment_date,
    status:          row.status,
    notes:           row.notes,
    createdBy:       row.created_by,
    createdAt:       row.created_at,
    updatedAt:       row.updated_at,
  };
}
