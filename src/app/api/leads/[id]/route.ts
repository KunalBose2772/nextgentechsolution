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

/* ── GET /api/leads/[id] ─────────────────────────────────────────── */
export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const user = await getUser(req);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const dbErr = guardDB(); if (dbErr) return dbErr;

  const supabase = getServerSupabase()!;
  const { id } = await params;
  const { data, error } = await supabase.from("leads").select("*").eq("id", id).single();
  if (error || !data) return NextResponse.json({ error: "Lead not found" }, { status: 404 });
  return NextResponse.json({ data });
}

/* ── PATCH /api/leads/[id] ───────────────────────────────────────── */
export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const user = await getUser(req);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const dbErr = guardDB(); if (dbErr) return dbErr;

  const supabase = getServerSupabase()!;
  const { id } = await params;
  const body = await req.json();

  // Snake-case the relevant fields
  const update: Record<string, unknown> = {};
  if (body.name        !== undefined) update.name        = body.name;
  if (body.email       !== undefined) update.email       = body.email;
  if (body.phone       !== undefined) update.phone       = body.phone;
  if (body.company     !== undefined) update.company     = body.company;
  if (body.city        !== undefined) update.city        = body.city;
  if (body.state       !== undefined) update.state       = body.state;
  if (body.status      !== undefined) update.status      = body.status;
  if (body.priority    !== undefined) update.priority    = body.priority;
  if (body.source      !== undefined) update.source      = body.source;
  if (body.services    !== undefined) update.services    = body.services;
  if (body.budget      !== undefined) update.budget      = body.budget;
  if (body.requirement !== undefined) update.requirement = body.requirement;
  if (body.assignedTo  !== undefined) update.assigned_to = body.assignedTo;
  if (body.followUpDate !== undefined) update.follow_up_date = body.followUpDate;
  if (body.metadata     !== undefined) update.metadata     = body.metadata;
  if (body.value       !== undefined) update.value       = body.value;
  if (body.probability !== undefined) update.probability = body.probability;
  if (body.tags        !== undefined) update.tags        = body.tags;

  const { data, error } = await supabase
    .from("leads")
    .update(update)
    .eq("id", id)
    .select()
    .single();

  if (error || !data) return NextResponse.json({ error: error?.message ?? "Lead not found" }, { status: 404 });

  await logActivity({
    type: body.status ? "lead_status_changed" : "lead_updated",
    description: body.status ? `Lead status changed to ${body.status}` : `Lead updated: ${data.name}`,
    entityType: "lead",
    entityId: data.id,
    entityName: data.name,
    performedBy: String(user.sub),
    performedByName: String(user.name),
    metadata: body,
  });

  return NextResponse.json({ data });
}

/* ── DELETE /api/leads/[id] ──────────────────────────────────────── */
export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const user = await getUser(req);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (user.role !== "admin" && user.role !== "superadmin")
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const dbErr = guardDB(); if (dbErr) return dbErr;

  const supabase = getServerSupabase()!;
  const { id } = await params;
  const { error } = await supabase.from("leads").delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}

/* ── POST /api/leads/[id] — add note or call log ─────────────────── */
export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const user = await getUser(req);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const dbErr = guardDB(); if (dbErr) return dbErr;

  const supabase = getServerSupabase()!;
  const { id } = await params;
  const body = await req.json();
  const { type, ...data } = body;

  // Fetch current lead
  const { data: lead, error: fetchErr } = await supabase
    .from("leads")
    .select("*")
    .eq("id", id)
    .single();
  if (fetchErr || !lead) return NextResponse.json({ error: "Lead not found" }, { status: 404 });

  if (type === "note") {
    const newNote = {
      id: crypto.randomUUID(),
      content: data.content,
      createdBy: String(user.sub),
      createdByName: String(user.name),
      createdAt: new Date().toISOString(),
    };
    const updatedNotes = [...((lead.notes as unknown[]) ?? []), newNote];
    const { data: updated, error } = await supabase
      .from("leads")
      .update({ notes: updatedNotes })
      .eq("id", id)
      .select()
      .single();
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    await logActivity({
      type: "note_added",
      description: `Note added to lead: ${updated.name}`,
      entityType: "lead",
      entityId: updated.id,
      entityName: updated.name,
      performedBy: String(user.sub),
      performedByName: String(user.name),
    });

    return NextResponse.json({ data: updated });
  }

  if (type === "call") {
    const newCall = {
      id: crypto.randomUUID(),
      duration: data.duration ?? "",
      outcome: data.outcome,
      notes: data.notes ?? "",
      createdBy: String(user.sub),
      createdByName: String(user.name),
      createdAt: new Date().toISOString(),
    };
    const updatedCalls = [...((lead.calls as unknown[]) ?? []), newCall];
    const { data: updated, error } = await supabase
      .from("leads")
      .update({ calls: updatedCalls })
      .eq("id", id)
      .select()
      .single();
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    await logActivity({
      type: "call_logged",
      description: `Call logged for lead: ${updated.name}`,
      entityType: "lead",
      entityId: updated.id,
      entityName: updated.name,
      performedBy: String(user.sub),
      performedByName: String(user.name),
    });

    return NextResponse.json({ data: updated });
  }

  return NextResponse.json({ error: "Invalid type" }, { status: 400 });
}
