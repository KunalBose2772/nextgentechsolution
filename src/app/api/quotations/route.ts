import { NextRequest, NextResponse } from "next/server";
import { getServerSupabase, isSupabaseConfigured, nextQuotationId, logActivity } from "@/lib/supabase";
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
  const leadId = searchParams.get("leadId");

  let query = supabase.from("quotations").select("*", { count: "exact" });
  if (user.role === "telecaller") query = query.eq("created_by", user.sub as string);
  if (status) query = query.eq("status", status);
  if (leadId) query = query.eq("lead_id", leadId);

  const from = (page - 1) * limit;
  const { data, count, error } = await query
    .order("created_at", { ascending: false })
    .range(from, from + limit - 1);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({
    data: (data ?? []).map(mapQuotation),
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

  // ── Telecaller restriction: lead_id is required and must be assigned to them ──
  if (user.role === "telecaller") {
    if (!body.lead) {
      return NextResponse.json(
        { error: "Telecallers must select an assigned lead to create a quotation" },
        { status: 403 }
      );
    }
    // Verify the lead actually belongs to this telecaller
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
        { error: "You can only create quotations for leads assigned to you" },
        { status: 403 }
      );
    }
  }

  const quotationId = await nextQuotationId(supabase);

  const { data, error } = await supabase
    .from("quotations")
    .insert({
      quotation_id:    quotationId,
      lead_id:         body.lead ?? null,
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
      currency:        body.currency ?? "INR",
      status:          body.status ?? "draft",
      valid_until:     body.validUntil,
      terms:           body.terms ?? "",
      notes:           body.notes ?? "",
      admin_remarks:   "",
      created_by:      user.sub,
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  await logActivity({
    type: "quotation_created",
    description: `Quotation ${quotationId} created for ${body.leadName}`,
    entityType: "quotation",
    entityId: data.id,
    entityName: quotationId,
    performedBy: String(user.sub),
    performedByName: String(user.name),
  });

  return NextResponse.json({ data: mapQuotation(data) }, { status: 201 });
}


function mapQuotation(row: Record<string, unknown>) {
  return {
    _id:            row.id,
    quotationId:    row.quotation_id,
    lead:           row.lead_id,
    leadName:       row.lead_name,
    leadEmail:      row.lead_email,
    leadPhone:      row.lead_phone,
    leadCompany:    row.lead_company,
    items:          row.items,
    subtotal:       row.subtotal,
    discountAmount: row.discount_amount,
    taxRate:        row.tax_rate,
    taxAmount:      row.tax_amount,
    total:          row.total,
    currency:       row.currency,
    status:         row.status,
    validUntil:     row.valid_until,
    terms:          row.terms,
    notes:          row.notes,
    adminRemarks:   row.admin_remarks,
    createdBy:      row.created_by,
    approvedBy:     row.approved_by,
    approvedAt:     row.approved_at,
    sentAt:         row.sent_at,
    createdAt:      row.created_at,
    updatedAt:      row.updated_at,
  };
}
