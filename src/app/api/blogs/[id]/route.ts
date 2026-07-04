import { NextRequest, NextResponse } from "next/server";
import { getServerSupabase, isSupabaseConfigured } from "@/lib/supabase";
import { verifyToken, TOKEN_KEY } from "@/lib/auth";
import { posts as MOCK_POSTS } from "@/lib/blog-data";

async function getUser(req: NextRequest) {
  const token = req.cookies.get(TOKEN_KEY)?.value;
  if (!token) return null;
  return verifyToken(token);
}

// ── GET /api/blogs/[id] ──
export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  if (!isSupabaseConfigured()) {
    // Find in mock data by id or slug
    const mock = MOCK_POSTS.find((p: any) => p.id === id || p.slug === id);
    if (!mock) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }
    return NextResponse.json({ data: mock, source: "mock" });
  }

  const supabase = getServerSupabase()!;
  // Check if ID is UUID or slug
  const column = id.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i) ? "id" : "slug";
  
  const { data, error } = await supabase
    .from("website_blogs")
    .select("*")
    .eq(column, id)
    .single();

  if (error || !data) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }

  const mapped = {
    id: data.id,
    slug: data.slug,
    title: data.title,
    excerpt: data.excerpt,
    content: data.content,
    image: data.image,
    category: data.category,
    author: data.author,
    authorRole: data.author_role,
    tags: data.tags ?? [],
    readTime: data.read_time,
    accent: data.accent,
    status: data.status,
    publishedAt: data.published_at,
    createdAt: data.created_at,
  };

  return NextResponse.json({ data: mapped, source: "database" });
}

// ── PATCH /api/blogs/[id] ──
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
    if (body.title !== undefined) update.title = body.title;
    if (body.slug !== undefined) update.slug = body.slug;
    if (body.excerpt !== undefined) update.excerpt = body.excerpt;
    if (body.content !== undefined) update.content = body.content;
    if (body.image !== undefined) update.image = body.image;
    if (body.category !== undefined) update.category = body.category;
    if (body.author !== undefined) update.author = body.author;
    if (body.authorRole !== undefined) update.author_role = body.authorRole;
    if (body.tags !== undefined) update.tags = body.tags;
    if (body.readTime !== undefined) update.read_time = body.readTime;
    if (body.accent !== undefined) update.accent = body.accent;
    if (body.status !== undefined) {
      update.status = body.status;
      if (body.status === "published") {
        update.published_at = new Date().toISOString();
      }
    }

    const { data, error } = await supabase
      .from("website_blogs")
      .update(update)
      .eq("id", id)
      .select()
      .single();

    if (error || !data) {
      return NextResponse.json({ error: error?.message ?? "Post not found" }, { status: 404 });
    }

    return NextResponse.json({ data, success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// ── DELETE /api/blogs/[id] ──
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
      .from("website_blogs")
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
