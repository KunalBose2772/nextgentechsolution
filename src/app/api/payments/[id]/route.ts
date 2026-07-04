import { NextRequest, NextResponse } from "next/server";
import { getServerSupabase, isSupabaseConfigured } from "@/lib/supabase";
import { verifyToken, TOKEN_KEY } from "@/lib/auth";

async function getUser(req: NextRequest) {
  const token = req.cookies.get(TOKEN_KEY)?.value;
  if (!token) return null;
  return verifyToken(token);
}

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const user = await getUser(req);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  if (!isSupabaseConfigured()) {
    return NextResponse.json({ error: "Database not configured" }, { status: 503 });
  }

  const supabase = getServerSupabase()!;
  const { id } = await params;
  const { data, error } = await supabase.from("payments").select("*, invoices(*)").eq("id", id).single();
  if (error || !data) return NextResponse.json({ error: "Not found" }, { status: 404 });

  // Telecaller restriction: can only view their own payment slips
  if (user.role === "telecaller" && data.created_by !== user.sub) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  return NextResponse.json({ data: mapPayment(data) });
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const user = await getUser(req);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (user.role !== "admin" && user.role !== "superadmin")
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  if (!isSupabaseConfigured()) {
    return NextResponse.json({ error: "Database not configured" }, { status: 503 });
  }

  const supabase = getServerSupabase()!;
  const { id } = await params;

  // 1. Fetch current payment details
  const { data: payRow, error: findErr } = await supabase.from("payments").select("*").eq("id", id).single();
  if (findErr || !payRow) return NextResponse.json({ error: "Not found" }, { status: 404 });

  // 2. Undo payment on the Invoice if applicable
  if (payRow.invoice_id && payRow.status === "completed") {
    const { data: invRow } = await supabase.from("invoices").select("*").eq("id", payRow.invoice_id).single();
    if (invRow) {
      const restoredAmountPaid = Math.max(0, Number(invRow.amount_paid) - Number(payRow.amount));
      const restoredDueAmount  = Number(invRow.total) - restoredAmountPaid;
      
      let restoredStatus = "partially_paid";
      if (restoredAmountPaid <= 0) {
        restoredStatus = "unpaid";
      } else if (restoredDueAmount <= 0) {
        restoredStatus = "paid";
      }

      await supabase
        .from("invoices")
        .update({
          amount_paid: restoredAmountPaid,
          due_amount:  restoredDueAmount,
          status:      restoredStatus,
          updated_at:  new Date().toISOString()
        })
        .eq("id", invRow.id);
    }
  }

  // 3. Delete Payment record
  const { error } = await supabase.from("payments").delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ success: true });
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
