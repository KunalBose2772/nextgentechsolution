import { NextRequest, NextResponse } from "next/server";
import { getServerSupabase, isSupabaseConfigured } from "@/lib/supabase";
import { verifyToken, TOKEN_KEY } from "@/lib/auth";

async function getUser(req: NextRequest) {
  const token = req.cookies.get(TOKEN_KEY)?.value;
  if (!token) return null;
  return verifyToken(token);
}

const MOCK_PROJECTS = [
  {
    id: "1",
    project_id: "1",
    title: "Decentralized Finance Payment Architecture",
    tags: ["Fintech", "Blockchain", "Web3"],
    category: "Fintech",
    image: "/images/portfolio/1.jpg",
    description: "Enterprise Web3 gateway processing $10M+ daily. Zero-latency smart contract execution and robust multi-chain reconciliation.",
    outcomes: ["$10M+ daily volume", "Under 2s reconciliation", "Multi-chain auditing"],
    accent: "#22c55e",
  },
  {
    id: "2",
    project_id: "2",
    title: "AI-Driven Logistics Optimization Platform",
    tags: ["AI & ML", "Cloud", "SaaS"],
    category: "AI & ML",
    image: "/images/portfolio/ai.png",
    description: "Predictive route planning engine that reduced carrier dispatch delays by 35% using real-time traffic and weather models.",
    outcomes: ["35% delay reduction", "Dynamic routing", "40% fuel savings"],
    accent: "#3b82f6",
  },
  {
    id: "3",
    project_id: "3",
    title: "HIPAA-Compliant Patient Telehealth Portal",
    tags: ["Healthcare", "React Native", "API Dev"],
    category: "Healthcare",
    image: "/images/portfolio/2.jpg",
    description: "Secure teleconsultation platform connecting 50K+ patients with specialists via encrypted WebRTC channels.",
    outcomes: ["50K+ users", "HIPAA HL7 standard", "End-to-end encryption"],
    accent: "#06b6d4",
  },
  {
    id: "4",
    project_id: "4",
    title: "High-Throughput E-Commerce Core Engine",
    tags: ["E-Commerce", "Serverless", "Stripe"],
    category: "E-Commerce",
    image: "/images/portfolio/saas.png",
    description: "Serverless storefront handling 2M+ concurrent users, featuring AI-powered search rankings and one-click checkouts.",
    outcomes: ["2M+ scale cap", "AI products recommendation", "40% conversions boost"],
    accent: "#f97316",
  },
  {
    id: "5",
    project_id: "5",
    title: "Autoscaling Kubernetes Cloud Infrastructure",
    tags: ["DevOps", "Kubernetes", "AWS"],
    category: "DevOps",
    image: "/images/portfolio/security.png",
    description: "Infrastructure-as-code automation enabling automated failover and 99.99% multi-region uptime SLA for SaaS enterprises.",
    outcomes: ["99.99% uptime SLA", "Zero-downtime deploy", "30% host savings"],
    accent: "#7c3aed",
  },
  {
    id: "6",
    project_id: "6",
    title: "Real-Time Collaborative Canvas Platform",
    tags: ["WebSockets", "SaaS", "UI/UX"],
    category: "SaaS",
    image: "/images/portfolio/mobile.png",
    description: "A collaborative drawing and brainstorming web canvas, featuring sub-100ms multi-user syncing via WebSockets.",
    outcomes: ["Sub-100ms latency sync", "Multiplayer cursors", "Figma-grade layout"],
    accent: "#ec4899",
  },
  {
    id: "7",
    project_id: "7",
    title: "Custom Healthcare EHR Analytics Engine",
    tags: ["Healthcare", "Data Science", "Cloud"],
    category: "Healthcare",
    image: "/images/portfolio/3.jpg",
    description: "Clinical analytics dashboard compiling patient statistics, treatment cycles, and automated medical report extraction.",
    outcomes: ["98% data accuracy", "Integrated charts", "Saved admin hours"],
    accent: "#06b6d4",
  },
  {
    id: "8",
    project_id: "8",
    title: "Fintech Trading & Investment Dashboard",
    tags: ["Fintech", "SaaS", "Next.js"],
    category: "Fintech",
    image: "/images/portfolio/4.jpg",
    description: "Real-time stock and crypto brokerage UI with interactive charting, automated buy/sell alerts, and portfolio tracking.",
    outcomes: ["Real-time price ticks", "Custom warning triggers", "Interactive canvas charts"],
    accent: "#22c55e",
  },
];

// ── GET /api/portfolio ──
export async function GET(req: NextRequest) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json({ data: MOCK_PROJECTS, source: "mock" });
  }

  const supabase = getServerSupabase()!;
  const { data, error } = await supabase
    .from("website_portfolio")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const mapped = (data ?? []).map((row) => ({
    id: row.id,
    projectId: row.project_id,
    title: row.title,
    tags: row.tags ?? [],
    category: row.category,
    image: row.image,
    description: row.description,
    outcomes: row.outcomes ?? [],
    accent: row.accent,
    createdAt: row.created_at,
  }));

  return NextResponse.json({ data: mapped, source: "database" });
}

// ── POST /api/portfolio ──
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
      projectId,
      title,
      tags,
      category,
      image,
      description,
      outcomes,
      accent,
    } = body;

    if (!projectId || !title || !description || !category) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const { data, error } = await supabase
      .from("website_portfolio")
      .insert({
        project_id: projectId,
        title,
        tags: tags ?? [],
        category,
        image: image ?? "/images/portfolio/1.jpg",
        description,
        outcomes: outcomes ?? [],
        accent: accent ?? "#5b5bd6",
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
