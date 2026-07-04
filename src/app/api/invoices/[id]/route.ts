import { NextRequest, NextResponse } from "next/server";
import { getServerSupabase, isSupabaseConfigured, logActivity } from "@/lib/supabase";
import { verifyToken, TOKEN_KEY } from "@/lib/auth";

async function getUser(req: NextRequest) {
  const token = req.cookies.get(TOKEN_KEY)?.value;
  if (!token) return null;
  return verifyToken(token);
}

function guardDB() {
  return !isSupabaseConfigured()
    ? NextResponse.json({ error: "Database not configured" }, { status: 503 })
    : null;
}

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const user = await getUser(req);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const dbErr = guardDB(); if (dbErr) return dbErr;

  const supabase = getServerSupabase()!;
  const { id } = await params;
  const { data, error } = await supabase.from("invoices").select("*").eq("id", id).single();
  if (error || !data) return NextResponse.json({ error: "Not found" }, { status: 404 });

  // Telecaller restriction: can only view their own invoices
  if (user.role === "telecaller" && data.created_by !== user.sub) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  return NextResponse.json({ data: mapInvoice(data) });
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const user = await getUser(req);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const dbErr = guardDB(); if (dbErr) return dbErr;

  const supabase = getServerSupabase()!;
  const { id } = await params;
  const body = await req.json();

  // Find the invoice first
  const { data: current, error: findErr } = await supabase.from("invoices").select("*").eq("id", id).single();
  if (findErr || !current) return NextResponse.json({ error: "Not found" }, { status: 404 });

  // Telecaller restriction: can only update their own invoices
  if (user.role === "telecaller" && current.created_by !== user.sub) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const update: Record<string, any> = {};
  if (body.status !== undefined)       update.status       = body.status;
  if (body.terms !== undefined)        update.terms        = body.terms;
  if (body.bankDetails !== undefined)  update.bank_details = body.bankDetails;
  if (body.amountPaid !== undefined) {
    update.amount_paid = body.amountPaid;
    update.due_amount  = Number(current.total) - Number(body.amountPaid);
    // Auto status adjust if they fully paid
    if (update.due_amount <= 0) {
      update.status = "paid";
    } else if (update.due_amount < Number(current.total)) {
      update.status = "partially_paid";
    } else {
      update.status = "unpaid";
    }
  }

  const { data, error } = await supabase
    .from("invoices")
    .update(update)
    .eq("id", id)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  await logActivity({
    type: "invoice_updated",
    description: `Invoice ${current.invoice_id} updated. Status: ${data.status}`,
    entityType: "invoice",
    entityId: data.id,
    entityName: current.invoice_id,
    performedBy: String(user.sub),
    performedByName: String(user.name),
  });

  return NextResponse.json({ data: mapInvoice(data) });
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const user = await getUser(req);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (user.role !== "admin" && user.role !== "superadmin")
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const dbErr = guardDB(); if (dbErr) return dbErr;

  const supabase = getServerSupabase()!;
  const { id } = await params;
  const { error } = await supabase.from("invoices").delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
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
