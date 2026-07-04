import { NextRequest, NextResponse } from "next/server";
import { getServerSupabase, isSupabaseConfigured } from "@/lib/supabase";
import { verifyToken, TOKEN_KEY } from "@/lib/auth";
import { posts as MOCK_POSTS } from "@/lib/blog-data";

async function getUser(req: NextRequest) {
  const token = req.cookies.get(TOKEN_KEY)?.value;
  if (!token) return null;
  return verifyToken(token);
}

// ── GET /api/blogs ──
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const statusFilter = searchParams.get("status"); // e.g. "published" or all for admins
  
  if (!isSupabaseConfigured()) {
    // Return mock data
    let items = MOCK_POSTS;
    if (statusFilter === "published") {
      // All mock posts are considered published
      items = MOCK_POSTS;
    }
    return NextResponse.json({ data: items, source: "mock" });
  }

  const supabase = getServerSupabase()!;
  let query = supabase.from("website_blogs").select("*");

  if (statusFilter) {
    query = query.eq("status", statusFilter);
  }

  const { data, error } = await query.order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Map to frontend interface (camelCase)
  const mapped = (data ?? []).map((row) => ({
    id: row.id,
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    content: row.content,
    image: row.image,
    category: row.category,
    author: row.author,
    authorRole: row.author_role,
    tags: row.tags ?? [],
    readTime: row.read_time,
    accent: row.accent,
    status: row.status,
    publishedAt: row.published_at,
    createdAt: row.created_at,
  }));

  return NextResponse.json({ data: mapped, source: "database" });
}

// ── POST /api/blogs ──
export async function POST(req: NextRequest) {
  const user = await getUser(req);
  if (!user || (user.role !== "admin" && user.role !== "superadmin")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!isSupabaseConfigured()) {
    return NextResponse.json({ error: "Database credentials not configured" }, { status: 503 });
  }

  try {
    const supabase = getServerSupabase()!;
    const body = await req.json();
    const {
      title,
      slug,
      excerpt,
      content,
      image,
      category,
      author,
      authorRole,
      tags,
      readTime,
      accent,
      status,
    } = body;

    if (!title || !slug || !content || !category) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const { data, error } = await supabase
      .from("website_blogs")
      .insert({
        title,
        slug,
        excerpt: excerpt ?? "",
        content,
        image: image ?? "/images/saas_architecture.png",
        category,
        author: author ?? user.name,
        author_role: authorRole ?? "NextGen Team",
        tags: tags ?? [],
        read_time: readTime ?? "5 min read",
        accent: accent ?? "#7c3aed",
        status: status ?? "draft",
        published_at: status === "published" ? new Date().toISOString() : null,
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data, success: true }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
