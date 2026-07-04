import { NextRequest, NextResponse } from "next/server";
import { getServerSupabase, isSupabaseConfigured } from "@/lib/supabase";
import { verifyToken, TOKEN_KEY } from "@/lib/auth";

async function getUser(req: NextRequest) {
  const token = req.cookies.get(TOKEN_KEY)?.value;
  if (!token) return null;
  return verifyToken(token);
}

// ── PATCH /api/portfolio/[id] ──
export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const user = await getUser(req);
  if (!user || (user.role !== "admin" && user.role !== "superadmin")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!isSupabaseConfigured()) {
    return NextResponse.json({ error: "Database credentials not configured" }, { status: 503 });
  }

  try {
    const supabase = getServerSupabase()!;
    const { id } = await params;
    const body = await req.json();

    const update: Record<string, any> = {};
    if (body.projectId !== undefined) update.project_id = body.projectId;
    if (body.title !== undefined) update.title = body.title;
    if (body.tags !== undefined) update.tags = body.tags;
    if (body.category !== undefined) update.category = body.category;
    if (body.image !== undefined) update.image = body.image;
    if (body.description !== undefined) update.description = body.description;
    if (body.outcomes !== undefined) update.outcomes = body.outcomes;
    if (body.accent !== undefined) update.accent = body.accent;

    const { data, error } = await supabase
      .from("website_portfolio")
      .update(update)
      .eq("id", id)
      .select()
      .single();

    if (error || !data) {
      return NextResponse.json({ error: error?.message ?? "Project not found" }, { status: 404 });
    }

    return NextResponse.json({ data, success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// ── DELETE /api/portfolio/[id] ──
export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const user = await getUser(req);
  if (!user || (user.role !== "admin" && user.role !== "superadmin")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!isSupabaseConfigured()) {
    return NextResponse.json({ error: "Database credentials not configured" }, { status: 503 });
  }

  try {
    const supabase = getServerSupabase()!;
    const { id } = await params;

    const { error } = await supabase
      .from("website_portfolio")
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
