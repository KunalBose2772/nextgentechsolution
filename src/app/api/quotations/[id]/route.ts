import { NextRequest, NextResponse } from "next/server";
import { getServerSupabase, isSupabaseConfigured, logActivity } from "@/lib/supabase";
import { verifyToken, TOKEN_KEY } from "@/lib/auth";
import { sendEmail, quotationEmailTemplate } from "@/lib/email";
import { generateQuotationPDF } from "@/lib/pdf";
import type { Quotation as QuotationType } from "@/types/crm";

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
  const { data, error } = await supabase.from("quotations").select("*").eq("id", id).single();
  if (error || !data) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ data });
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const user = await getUser(req);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const dbErr = guardDB(); if (dbErr) return dbErr;

  const supabase = getServerSupabase()!;
  const { id } = await params;
  const body = await req.json();

  /* ── Approve ── */
  if (body.action === "approve") {
    if (user.role !== "admin" && user.role !== "superadmin")
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });

    const { data, error } = await supabase
      .from("quotations")
      .update({
        status: "approved",
        approved_by: user.sub,
        approved_at: new Date().toISOString(),
        admin_remarks: body.adminRemarks ?? "",
      })
      .eq("id", id)
      .select()
      .single();

    if (error || !data) return NextResponse.json({ error: error?.message ?? "Not found" }, { status: 404 });

    await logActivity({
      type: "quotation_approved",
      description: `Quotation ${data.quotation_id} approved`,
      entityType: "quotation",
      entityId: data.id,
      entityName: data.quotation_id,
      performedBy: String(user.sub),
      performedByName: String(user.name),
    });

    return NextResponse.json({ data });
  }

  /* ── Reject ── */
  if (body.action === "reject") {
    const { data, error } = await supabase
      .from("quotations")
      .update({
        status: "rejected",
        admin_remarks: body.adminRemarks ?? "",
      })
      .eq("id", id)
      .select()
      .single();
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ data });
  }

  /* ── Send ── */
  if (body.action === "send") {
    const { data, error } = await supabase
      .from("quotations")
      .update({ status: "sent", sent_at: new Date().toISOString() })
      .eq("id", id)
      .select()
      .single();
    if (error || !data) return NextResponse.json({ error: error?.message ?? "Not found" }, { status: 404 });

    // Build QuotationType payload for PDF + email
    const payload: QuotationType = {
      _id: data.id,
      quotationId: data.quotation_id,
      lead: data.lead_id ?? "",
      leadName: data.lead_name,
      leadEmail: data.lead_email,
      leadPhone: data.lead_phone,
      leadCompany: data.lead_company,
      items: data.items,
      subtotal: data.subtotal,
      discountAmount: data.discount_amount,
      taxRate: data.tax_rate,
      taxAmount: data.tax_amount,
      total: data.total,
      currency: data.currency,
      status: data.status,
      validUntil: data.valid_until,
      terms: data.terms,
      notes: data.notes,
      adminRemarks: data.admin_remarks,
      createdBy: data.created_by,
      approvedBy: data.approved_by,
      approvedAt: data.approved_at,
      sentAt: data.sent_at,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
    };

    try {
      const pdfBuffer = await generateQuotationPDF(payload);
      const html = quotationEmailTemplate(data.lead_name, data.quotation_id, data.total);
      await sendEmail({
        to: data.lead_email,
        subject: `Quotation ${data.quotation_id} from ${process.env.PDF_COMPANY_NAME}`,
        html,
        attachments: [{ filename: `${data.quotation_id}.pdf`, content: pdfBuffer, contentType: "application/pdf" }],
      });
    } catch (err) {
      console.error("[Quotation] Email send failed:", err);
    }

    await logActivity({
      type: "quotation_sent",
      description: `Quotation ${data.quotation_id} sent to ${data.lead_email}`,
      entityType: "quotation",
      entityId: data.id,
      entityName: data.quotation_id,
      performedBy: String(user.sub),
      performedByName: String(user.name),
    });

    return NextResponse.json({ data });
  }

  /* ── Generic update ── */
  const update: Record<string, unknown> = {};
  if (body.status !== undefined)       update.status        = body.status;
  if (body.adminRemarks !== undefined) update.admin_remarks = body.adminRemarks;
  if (body.terms !== undefined)        update.terms         = body.terms;
  if (body.notes !== undefined)        update.notes         = body.notes;

  const { data, error } = await supabase
    .from("quotations")
    .update(update)
    .eq("id", id)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ data });
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const user = await getUser(req);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (user.role !== "admin" && user.role !== "superadmin")
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const dbErr = guardDB(); if (dbErr) return dbErr;

  const supabase = getServerSupabase()!;
  const { id } = await params;
  const { error } = await supabase.from("quotations").delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
