import { NextRequest, NextResponse } from "next/server";
import { getServerSupabase, isSupabaseConfigured, nextTicketId, logActivity } from "@/lib/supabase";
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

  let query = supabase.from("tickets").select("*", { count: "exact" });
  if (user.role === "telecaller") query = query.eq("created_by", user.sub as string);
  if (status) query = query.eq("status", status);

  const from = (page - 1) * limit;
  const { data, count, error } = await query
    .order("created_at", { ascending: false })
    .range(from, from + limit - 1);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({
    data: (data ?? []).map(mapTicket),
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
  const ticketId = await nextTicketId(supabase);

  const { data, error } = await supabase
    .from("tickets")
    .insert({
      ticket_id:   ticketId,
      title:       body.title,
      description: body.description,
      status:      body.status ?? "open",
      priority:    body.priority ?? "medium",
      category:    body.category ?? "general",
      lead_id:     body.lead ?? null,
      assigned_to: body.assignedTo ?? null,
      created_by:  user.sub,
      comments:    [],
      tags:        body.tags ?? [],
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  await logActivity({
    type: "ticket_created",
    description: `Ticket ${ticketId} created: ${body.title}`,
    entityType: "ticket",
    entityId: data.id,
    entityName: ticketId,
    performedBy: String(user.sub),
    performedByName: String(user.name),
  });

  return NextResponse.json({ data: mapTicket(data) }, { status: 201 });
}

function mapTicket(row: Record<string, unknown>) {
  return {
    _id:         row.id,
    ticketId:    row.ticket_id,
    title:       row.title,
    description: row.description,
    status:      row.status,
    priority:    row.priority,
    category:    row.category,
    lead:        row.lead_id,
    assignedTo:  row.assigned_to,
    createdBy:   row.created_by,
    comments:    row.comments,
    tags:        row.tags,
    resolvedAt:  row.resolved_at,
    closedAt:    row.closed_at,
    createdAt:   row.created_at,
    updatedAt:   row.updated_at,
  };
}
