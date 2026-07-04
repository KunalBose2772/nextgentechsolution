import { NextRequest, NextResponse } from "next/server";
import { getServerSupabase, isSupabaseConfigured } from "@/lib/supabase";
import { verifyToken, TOKEN_KEY } from "@/lib/auth";

async function getUser(req: NextRequest) {
  const token = req.cookies.get(TOKEN_KEY)?.value;
  if (!token) return null;
  return verifyToken(token);
}

const MOCK_TEAM = [
  {
    id: "1",
    name: "Dr. Rahul Sharma",
    role: "Managing Director",
    expertise: "Enterprise Systems & AI Strategy",
    image: "/images/team/rahul.png",
    linkedin: "#",
    twitter: "#",
    github: "#",
    sortOrder: 1,
  },
  {
    id: "2",
    name: "Priya Malhotra",
    role: "Creative Director",
    expertise: "Brand Strategy & Human-Centric UX",
    image: "/images/team/priya.png",
    linkedin: "#",
    twitter: "#",
    github: "#",
    sortOrder: 2,
  },
  {
    id: "3",
    name: "Vikram Singhania",
    role: "Director of Operations",
    expertise: "Global Delivery & Agile Scale",
    image: "/images/team/vikram.png",
    linkedin: "#",
    twitter: "#",
    github: "#",
    sortOrder: 3,
  },
  {
    id: "4",
    name: "Sneha Reddy",
    role: "Director of Client Success",
    expertise: "Client Partnerships & Product Growth",
    image: "/images/team/sneha.png",
    linkedin: "#",
    twitter: "#",
    github: "#",
    sortOrder: 4,
  },
  {
    id: "5",
    name: "Aryan Kapoor",
    role: "Director of Engineering",
    expertise: "Cloud Infrastructure & Hyper-Scale Systems",
    image: "/images/team/aryan.png",
    linkedin: "#",
    twitter: "#",
    github: "#",
    sortOrder: 5,
  },
  {
    id: "6",
    name: "Ananya Roy",
    role: "Director of Product",
    expertise: "SaaS Roadmap & AI-First Frameworks",
    image: "/images/team/ananya.png",
    linkedin: "#",
    twitter: "#",
    github: "#",
    sortOrder: 6,
  },
];

// ── GET /api/team ──
export async function GET(req: NextRequest) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json({ data: MOCK_TEAM, source: "mock" });
  }

  const supabase = getServerSupabase()!;
  const { data, error } = await supabase
    .from("website_team")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const mapped = (data ?? []).map((row) => ({
    id: row.id,
    name: row.name,
    role: row.role,
    expertise: row.expertise,
    image: row.image,
    linkedin: row.linkedin,
    twitter: row.twitter,
    github: row.github,
    sortOrder: row.sort_order,
    createdAt: row.created_at,
  }));

  return NextResponse.json({ data: mapped, source: "database" });
}

// ── POST /api/team ──
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
      name,
      role,
      expertise,
      image,
      linkedin,
      twitter,
      github,
      sortOrder,
    } = body;

    if (!name || !role || !expertise) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const { data, error } = await supabase
      .from("website_team")
      .insert({
        name,
        role,
        expertise,
        image: image ?? "/images/team/rahul.png",
        linkedin: linkedin ?? "#",
        twitter: twitter ?? "#",
        github: github ?? "#",
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
