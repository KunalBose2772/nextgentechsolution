import { NextRequest, NextResponse } from "next/server";
import { getServerSupabase, isSupabaseConfigured, logActivity } from "@/lib/supabase";
import { verifyToken, TOKEN_KEY } from "@/lib/auth";

async function getUser(req: NextRequest) {
  const token = req.cookies.get(TOKEN_KEY)?.value;
  if (!token) return null;
  return verifyToken(token);
}

// ── PATCH /api/projects/[id] ──
export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const user = await getUser(req);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!isSupabaseConfigured()) {
    return NextResponse.json({ error: "Database not configured" }, { status: 503 });
  }

  try {
    const supabase = getServerSupabase()!;
    const { id } = await params;
    const body = await req.json();

    // Verify role permissions
    const isAdmin = user.role === "admin" || user.role === "superadmin";
    const isDeveloper = user.role === "developer";

    if (!isAdmin && !isDeveloper) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // Check project assignment if developer
    const { data: currentPrj, error: checkErr } = await supabase
      .from("projects")
      .select("developer_id")
      .eq("id", id)
      .single();

    if (checkErr || !currentPrj) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    if (isDeveloper && currentPrj.developer_id !== user.sub) {
      return NextResponse.json({ error: "Forbidden: You are not leading this project" }, { status: 403 });
    }

    const update: Record<string, any> = {};

    if (isAdmin) {
      if (body.title !== undefined) update.title = body.title;
      if (body.client !== undefined) update.client = body.client;
      if (body.leadId !== undefined) update.lead_id = body.leadId;
      if (body.startDate !== undefined) update.start_date = body.startDate;
      if (body.endDate !== undefined) update.end_date = body.endDate;
      if (body.value !== undefined) update.value = body.value;
      if (body.description !== undefined) update.description = body.description;
      if (body.assignedTeam !== undefined) update.assigned_team = body.assignedTeam;
      if (body.tags !== undefined) update.tags = body.tags;
      if (body.developerId !== undefined) update.developer_id = body.developerId;
      if (body.developerName !== undefined) update.developer_name = body.developerName;
    }

    // Both Admin and Developer can update progress, status, and updates logs
    if (body.status !== undefined) update.status = body.status;
    if (body.progress !== undefined) update.progress = body.progress;
    if (body.updates !== undefined) update.updates = body.updates;

    const { data, error } = await supabase
      .from("projects")
      .update(update)
      .eq("id", id)
      .select()
      .single();

    if (error || !data) {
      return NextResponse.json({ error: error?.message ?? "Failed to update project" }, { status: 500 });
    }

    // Log activity
    await logActivity({
      type: "project_updated",
      description: `Project ${data.project_id} updated by ${user.name}`,
      entityType: "lead", // Projects belong to lead entity auditing
      entityId: data.lead_id || data.id,
      entityName: data.title,
      performedBy: String(user.sub),
      performedByName: String(user.name),
      metadata: update,
    });

    return NextResponse.json({ data, success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// ── DELETE /api/projects/[id] ──
export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const user = await getUser(req);
  if (!user || (user.role !== "admin" && user.role !== "superadmin")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!isSupabaseConfigured()) {
    return NextResponse.json({ error: "Database not configured" }, { status: 503 });
  }

  try {
    const supabase = getServerSupabase()!;
    const { id } = await params;

    const { error } = await supabase
      .from("projects")
      .delete()
      .eq("id", id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
