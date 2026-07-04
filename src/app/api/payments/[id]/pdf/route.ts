import { NextRequest, NextResponse } from "next/server";
import { getServerSupabase, isSupabaseConfigured } from "@/lib/supabase";
import { verifyToken, TOKEN_KEY } from "@/lib/auth";
import { generatePaymentReceiptPDF } from "@/lib/pdf";
import type { Payment } from "@/types/crm";

async function getUser(req: NextRequest) {
  const token = req.cookies.get(TOKEN_KEY)?.value;
  if (!token) return null;
  return verifyToken(token);
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getUser(req);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!isSupabaseConfigured()) {
    return NextResponse.json({ error: "Database not configured" }, { status: 503 });
  }

  const supabase = getServerSupabase()!;
  const { id } = await params;

  const { data: row, error } = await supabase
    .from("payments")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !row) {
    return NextResponse.json({ error: "Payment receipt not found" }, { status: 404 });
  }

  // Telecaller restriction: can only download payment slips they created
  if (user.role === "telecaller" && row.created_by !== user.sub) {
    return NextResponse.json(
      { error: "You can only download payment slips you created" },
      { status: 403 }
    );
  }

  // Retrieve Invoice Reference string if linked
  let invoiceIdStr = "";
  let customerName = "";
  let serviceOffered = "";
  if (row.invoice_id) {
    const { data: invRow } = await supabase
      .from("invoices")
      .select("invoice_id, lead_name, items")
      .eq("id", row.invoice_id)
      .single();
    if (invRow) {
      invoiceIdStr = invRow.invoice_id;
      customerName = invRow.lead_name || "";
      if (invRow.items && Array.isArray(invRow.items)) {
        serviceOffered = invRow.items.map((i: any) => i.description || "").filter(Boolean).join(", ");
      }
    }
  }

  // Build Payment object
  const payment: Payment = {
    _id:             row.id,
    paymentId:       row.payment_id,
    invoice:         row.invoice_id ?? "",
    lead:            row.lead_id ?? "",
    amount:          Number(row.amount),
    paymentMethod:   row.payment_method,
    referenceNumber: row.reference_number ?? "",
    paymentDate:     row.payment_date,
    status:          row.status,
    notes:           row.notes ?? "",
    createdBy:       row.created_by,
    createdAt:       row.created_at,
    updatedAt:       row.updated_at,
  };

  try {
    const pdfBuffer = await generatePaymentReceiptPDF(payment, invoiceIdStr, customerName, serviceOffered);
    const filename  = `Receipt_${row.payment_id}.pdf`;

    return new NextResponse(pdfBuffer as any, {
      status: 200,
      headers: {
        "Content-Type":        "application/pdf",
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Content-Length":      String(pdfBuffer.length),
        "Cache-Control":       "no-store",
      },
    });
  } catch (err: any) {
    console.error("[payment-receipt-pdf] generation failed:", err);
    return NextResponse.json(
      { error: "PDF generation failed: " + err.message },
      { status: 500 }
    );
  }
}
