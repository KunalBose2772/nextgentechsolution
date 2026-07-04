import { NextRequest, NextResponse } from "next/server";
import { getServerSupabase, isSupabaseConfigured } from "@/lib/supabase";
import { verifyToken, TOKEN_KEY } from "@/lib/auth";

async function getUser(req: NextRequest) {
  const token = req.cookies.get(TOKEN_KEY)?.value;
  if (!token) return null;
  return verifyToken(token);
}

const MOCK_GALLERY = [
  {
    id: "mock-1",
    title: "Modern Collaboration Hub",
    description: "Our main interactive lounge designed for cross-functional brainstorming and design sprints.",
    category: "Workspace",
    image: "/images/about_office1.png",
    date: "June 2026",
    sortOrder: 1
  },
  {
    id: "mock-2",
    title: "AI & Neural Tech Lab",
    description: "Engineers working on training large language models and multi-agent system workflows.",
    category: "Collaboration",
    image: "/images/about_office2.png",
    date: "May 2026",
    sortOrder: 2
  },
  {
    id: "mock-3",
    title: "NextGen Cloud Summit",
    description: "Hosting regional developers to discuss container security and serverless paradigms.",
    category: "Tech Events",
    image: "/images/slide_cloud.png",
    date: "April 2026",
    sortOrder: 3
  },
  {
    id: "mock-4",
    title: "Annual Leadership Retreat",
    description: "Setting the strategic vision for upcoming enterprise CRM and ERP platform releases.",
    category: "Success Celebrations",
    image: "/images/slide_custom.png",
    date: "March 2026",
    sortOrder: 4
  },
  {
    id: "mock-5",
    title: "Creative Strategy Studio",
    description: "Where our design directors craft premium brand assets, layouts, and typography guidelines.",
    category: "Workspace",
    image: "/images/about-s-1-1.png",
    date: "February 2026",
    sortOrder: 5
  },
  {
    id: "mock-6",
    title: "AI Hackathon Winner's Stage",
    description: "Celebrating our engineering team's first-place win in automated web scraper algorithms.",
    category: "Success Celebrations",
    image: "/images/slide_ai.png",
    date: "January 2026",
    sortOrder: 6
  },
  {
    id: "mock-7",
    title: "Interactive Client Showcases",
    description: "Deep dive workshops presenting scalable software prototypes to our global partners.",
    category: "Collaboration",
    image: "/images/slide_transform.png",
    date: "December 2025",
    sortOrder: 7
  },
  {
    id: "mock-8",
    title: "Product Launch Operations Room",
    description: "The central war room monitoring metrics and servers during major product rollouts.",
    category: "Workspace",
    image: "/images/slide_analytics.png",
    date: "November 2025",
    sortOrder: 8
  }
];

// ── GET /api/gallery ──
export async function GET(req: NextRequest) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json({ data: MOCK_GALLERY, source: "mock" });
  }

  const supabase = getServerSupabase()!;
  const { data, error } = await supabase
    .from("website_gallery")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: true });

  if (error) {
    console.warn("Supabase query on website_gallery failed, falling back to mock:", error.message);
    return NextResponse.json({ data: MOCK_GALLERY, source: "mock-fallback", error: error.message });
  }

  const mapped = (data ?? []).map((row) => ({
    id: row.id,
    title: row.title,
    description: row.description,
    category: row.category,
    image: row.image,
    date: row.date,
    sortOrder: row.sort_order,
    createdAt: row.created_at,
  }));

  return NextResponse.json({ data: mapped, source: "database" });
}

// ── POST /api/gallery ──
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
    const { title, description, category, image, date, sortOrder } = body;

    if (!title || !description || !category || !image || !date) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const { data, error } = await supabase
      .from("website_gallery")
      .insert({
        title,
        description,
        category,
        image,
        date,
        sort_order: sortOrder ?? 0,
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
