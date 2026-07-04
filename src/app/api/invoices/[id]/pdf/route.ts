import { NextRequest, NextResponse } from "next/server";
import { getServerSupabase, isSupabaseConfigured } from "@/lib/supabase";
import { verifyToken, TOKEN_KEY } from "@/lib/auth";
import { generateInvoicePDF } from "@/lib/pdf";
import type { Invoice } from "@/types/crm";

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
    .from("invoices")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !row) {
    return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
  }

  // Telecaller restriction: can only download invoices they created
  if (user.role === "telecaller" && row.created_by !== user.sub) {
    return NextResponse.json(
      { error: "You can only download invoices you created" },
      { status: 403 }
    );
  }

  // Build Invoice object for PDF generation
  const invoice: Invoice = {
    _id:            row.id,
    invoiceId:      row.invoice_id,
    lead:           row.lead_id ?? "",
    quotation:      row.quotation_id ?? "",
    leadName:       row.lead_name,
    leadEmail:      row.lead_email,
    leadPhone:      row.lead_phone,
    leadCompany:    row.lead_company ?? "",
    items:          row.items ?? [],
    subtotal:       Number(row.subtotal),
    discountAmount: Number(row.discount_amount ?? 0),
    taxRate:        Number(row.tax_rate ?? 18),
    taxAmount:      Number(row.tax_amount),
    total:          Number(row.total),
    amountPaid:     Number(row.amount_paid ?? 0),
    dueAmount:      Number(row.due_amount),
    status:         row.status,
    billingDate:    row.billing_date,
    dueDate:        row.due_date,
    terms:          row.terms ?? "",
    bankDetails:    row.bank_details ?? "",
    createdBy:      row.created_by,
    createdAt:      row.created_at,
    updatedAt:      row.updated_at,
  };

  try {
    const pdfBuffer = await generateInvoicePDF(invoice);
    const filename  = `${row.invoice_id}.pdf`;

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
    console.error("[invoice-pdf] generation failed:", err);
    return NextResponse.json(
      { error: "PDF generation failed: " + err.message },
      { status: 500 }
    );
  }
}
