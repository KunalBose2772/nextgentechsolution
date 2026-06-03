import { NextRequest, NextResponse } from "next/server";
import { getServerSupabase, isSupabaseConfigured, nextLeadId, logActivity } from "@/lib/supabase";
import { verifyToken, TOKEN_KEY } from "@/lib/auth";

async function getUser(req: NextRequest) {
  const token = req.cookies.get(TOKEN_KEY)?.value;
  if (!token) return null;
  return verifyToken(token);
}

/* ── GET /api/leads ──────────────────────────────────────────────── */
export async function GET(req: NextRequest) {
  const user = await getUser(req);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  if (!isSupabaseConfigured()) {
    return NextResponse.json({ data: [], total: 0, page: 1, limit: 20, totalPages: 0 });
  }

  const supabase = getServerSupabase()!;
  const { searchParams } = new URL(req.url);
  const page     = Math.max(1, Number(searchParams.get("page")  ?? 1));
  const limit    = Math.min(100, Number(searchParams.get("limit") ?? 20));
  const status   = searchParams.get("status");
  const priority = searchParams.get("priority");
  const source   = searchParams.get("source");
  const assigned = searchParams.get("assignedTo");
  const search   = searchParams.get("search");

  let query = supabase.from("leads").select("*", { count: "exact" });

  // Telecallers see only their own leads
  if (user.role === "telecaller") query = query.eq("assigned_to", user.sub as string);
  if (status)   query = query.eq("status", status);
  if (priority) query = query.eq("priority", priority);
  if (source)   query = query.eq("source", source);
  if (assigned && user.role !== "telecaller") query = query.eq("assigned_to", assigned);
  if (search)   query = query.or(`name.ilike.%${search}%,email.ilike.%${search}%,phone.ilike.%${search}%,company.ilike.%${search}%,lead_id.ilike.%${search}%`);

  const from = (page - 1) * limit;
  const { data, count, error } = await query
    .order("created_at", { ascending: false })
    .range(from, from + limit - 1);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({
    data: (data ?? []).map(mapLead),
    total: count ?? 0,
    page,
    limit,
    totalPages: Math.ceil((count ?? 0) / limit),
  });
}

/* ── POST /api/leads ─────────────────────────────────────────────── */
export async function POST(req: NextRequest) {
  const user = await getUser(req);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  if (!isSupabaseConfigured()) {
    return NextResponse.json({ error: "Database not configured. Add Supabase credentials to .env.local" }, { status: 503 });
  }

  const supabase = getServerSupabase()!;
  const body = await req.json();
  const leadId = await nextLeadId(supabase);

  const { data, error } = await supabase
    .from("leads")
    .insert({
      lead_id:       leadId,
      name:          body.name,
      email:         body.email,
      phone:         body.phone,
      company:       body.company ?? "",
      website:       body.website ?? "",
      city:          body.city ?? "",
      state:         body.state ?? "",
      country:       body.country ?? "India",
      status:        body.status ?? "new",
      priority:      body.priority ?? "medium",
      source:        body.source ?? "website",
      services:      body.services ?? [],
      budget:        body.budget ?? "",
      requirement:   body.requirement ?? "",
      assigned_to:   body.assignedTo || null,
      created_by:    user.sub,
      follow_up_date: body.followUpDate || null,
      tags:          body.tags ?? [],
      value:         body.value ?? 0,
      probability:   body.probability ?? 0,
      notes:         [],
      calls:         [],
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  await logActivity({
    type: "lead_created",
    description: `New lead created: ${data.name}`,
    entityType: "lead",
    entityId: data.id,
    entityName: data.name,
    performedBy: String(user.sub),
    performedByName: String(user.name),
  });

  return NextResponse.json({ data: mapLead(data) }, { status: 201 });
}

/* ── Map snake_case ↔ camelCase ─────────────────────────────────── */
function mapLead(row: Record<string, unknown>) {
  return {
    _id:           row.id,
    leadId:        row.lead_id,
    name:          row.name,
    email:         row.email,
    phone:         row.phone,
    company:       row.company,
    website:       row.website,
    city:          row.city,
    state:         row.state,
    country:       row.country,
    status:        row.status,
    priority:      row.priority,
    source:        row.source,
    services:      row.services,
    budget:        row.budget,
    requirement:   row.requirement,
    notes:         row.notes,
    calls:         row.calls,
    assignedTo:    row.assigned_to,
    createdBy:     row.created_by,
    followUpDate:  row.follow_up_date,
    tags:          row.tags,
    value:         row.value,
    probability:   row.probability,
    lostReason:    row.lost_reason,
    convertedAt:   row.converted_at,
    closedAt:      row.closed_at,
    createdAt:     row.created_at,
    updatedAt:     row.updated_at,
  };
}
