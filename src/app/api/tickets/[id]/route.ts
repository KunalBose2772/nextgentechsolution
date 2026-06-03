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
  const { data, error } = await supabase.from("tickets").select("*").eq("id", id).single();
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

  /* ── Add comment ── */
  if (body.type === "comment") {
    const { data: ticket, error: fetchErr } = await supabase
      .from("tickets")
      .select("*")
      .eq("id", id)
      .single();
    if (fetchErr || !ticket) return NextResponse.json({ error: "Not found" }, { status: 404 });

    const newComment = {
      id: crypto.randomUUID(),
      content: body.content,
      isInternal: body.isInternal ?? false,
      createdBy: String(user.sub),
      createdByName: String(user.name),
      createdAt: new Date().toISOString(),
    };
    const updatedComments = [...((ticket.comments as unknown[]) ?? []), newComment];
    const { data, error } = await supabase
      .from("tickets")
      .update({ comments: updatedComments })
      .eq("id", id)
      .select()
      .single();
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ data });
  }

  /* ── Generic update ── */
  const update: Record<string, unknown> = {};
  if (body.status      !== undefined) update.status      = body.status;
  if (body.priority    !== undefined) update.priority    = body.priority;
  if (body.category    !== undefined) update.category    = body.category;
  if (body.assignedTo  !== undefined) update.assigned_to = body.assignedTo;
  if (body.title       !== undefined) update.title       = body.title;
  if (body.description !== undefined) update.description = body.description;
  if (body.status === "resolved") update.resolved_at = new Date().toISOString();
  if (body.status === "closed")   update.closed_at   = new Date().toISOString();

  const { data, error } = await supabase
    .from("tickets")
    .update(update)
    .eq("id", id)
    .select()
    .single();
  if (error || !data) return NextResponse.json({ error: error?.message ?? "Not found" }, { status: 404 });

  await logActivity({
    type: "ticket_updated",
    description: `Ticket ${data.ticket_id} updated`,
    entityType: "ticket",
    entityId: data.id,
    entityName: data.ticket_id,
    performedBy: String(user.sub),
    performedByName: String(user.name),
    metadata: body,
  });

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
  const { error } = await supabase.from("tickets").delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
