import { NextRequest, NextResponse } from "next/server";
import { getServerSupabase, isSupabaseConfigured } from "@/lib/supabase";
import { verifyToken, TOKEN_KEY } from "@/lib/auth";
import { generateQuotationPDF } from "@/lib/pdf";
import type { Quotation } from "@/types/crm";

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
    .from("quotations")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !row) {
    return NextResponse.json({ error: "Quotation not found" }, { status: 404 });
  }

  // Telecallers can only download quotations they created
  if (user.role === "telecaller" && row.created_by !== user.sub) {
    return NextResponse.json(
      { error: "You can only download quotations you created" },
      { status: 403 }
    );
  }

  // Build the full Quotation object for PDF generation
  const quotation: Quotation = {
    _id:           row.id,
    quotationId:   row.quotation_id,
    lead:          row.lead_id ?? "",
    leadName:      row.lead_name,
    leadEmail:     row.lead_email,
    leadPhone:     row.lead_phone,
    leadCompany:   row.lead_company ?? "",
    items:         row.items ?? [],
    subtotal:      Number(row.subtotal),
    discountAmount: Number(row.discount_amount ?? 0),
    taxRate:       Number(row.tax_rate ?? 18),
    taxAmount:     Number(row.tax_amount),
    total:         Number(row.total),
    currency:      row.currency ?? "INR",
    status:        row.status,
    validUntil:    row.valid_until,
    terms:         row.terms ?? "",
    notes:         row.notes ?? "",
    adminRemarks:  row.admin_remarks ?? "",
    createdBy:     row.created_by,
    approvedBy:    row.approved_by ?? undefined,
    approvedAt:    row.approved_at ?? undefined,
    sentAt:        row.sent_at ?? undefined,
    createdAt:     row.created_at,
    updatedAt:     row.updated_at,
  };

  try {
    const pdfBuffer = await generateQuotationPDF(quotation);
    const filename  = `${row.quotation_id}.pdf`;

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
    console.error("[pdf] generation failed:", err);
    return NextResponse.json(
      { error: "PDF generation failed: " + err.message },
      { status: 500 }
    );
  }
}
