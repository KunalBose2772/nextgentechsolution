import { NextRequest, NextResponse } from "next/server";
import { getServerSupabase, isSupabaseConfigured } from "@/lib/supabase";
import { verifyToken, TOKEN_KEY } from "@/lib/auth";

async function getUser(req: NextRequest) {
  const token = req.cookies.get(TOKEN_KEY)?.value;
  if (!token) return null;
  return verifyToken(token);
}

const MOCK_PROJECTS = [
  { id: "1", projectId: "PRJ-001", title: "E-Commerce Platform", client: "RetailMax Pvt Ltd", status: "active",    value: 850000, progress: 65, team: 4, deadline: "Jul 15, 2025", tags: ["Next.js","Node.js","MongoDB"] },
  { id: "2", projectId: "PRJ-002", title: "CRM System",           client: "FinTech Corp",      status: "active",    value: 1200000,progress: 40, team: 5, deadline: "Aug 30, 2025", tags: ["React","Django","PostgreSQL"] },
  { id: "3", projectId: "PRJ-003", title: "Mobile Banking App",   client: "PaySecure",         status: "planning",  value: 2000000,progress: 10, team: 6, deadline: "Oct 1, 2025",  tags: ["Flutter","AWS"] },
  { id: "4", projectId: "PRJ-004", title: "Healthcare Portal",    client: "MediCare Hospitals", status: "completed", value: 650000, progress: 100,team: 3, deadline: "Mar 20, 2025", tags: ["React","Node.js"] },
  { id: "5", projectId: "PRJ-005", title: "Logistics Dashboard",  client: "QuickShip India",   status: "on_hold",   value: 480000, progress: 55, team: 3, deadline: "Sep 10, 2025", tags: ["Next.js","Python"] },
  { id: "6", projectId: "PRJ-006", title: "EdTech Platform",      client: "LearnFast",         status: "active",    value: 950000, progress: 80, team: 4, deadline: "Jun 30, 2025", tags: ["React","Django"] },
];

// ── GET /api/projects ──
export async function GET(req: NextRequest) {
  const user = await getUser(req);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  if (!isSupabaseConfigured()) {
    return NextResponse.json({ data: MOCK_PROJECTS, source: "mock" });
  }

  const supabase = getServerSupabase()!;
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const mapped = (data ?? []).map((row) => ({
    id: row.id,
    projectId: row.project_id,
    title: row.title,
    client: row.client,
    leadId: row.lead_id,
    status: row.status,
    startDate: row.start_date,
    endDate: row.end_date,
    value: Number(row.value),
    description: row.description,
    assignedTeam: row.assigned_team ?? [],
    tags: row.tags ?? [],
    progress: row.progress || 0,
    createdAt: row.created_at,
    developerId: row.developer_id ?? "",
    developerName: row.developer_name ?? "",
    updates: row.updates ?? [],
  }));

  return NextResponse.json({ data: mapped, source: "database" });
}

// ── POST /api/projects ──
export async function POST(req: NextRequest) {
  const user = await getUser(req);
  if (!user || (user.role !== "admin" && user.role !== "superadmin")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!isSupabaseConfigured()) {
    return NextResponse.json({ error: "Database not configured" }, { status: 503 });
  }

  try {
    const supabase = getServerSupabase()!;
    const body = await req.json();

    // Generate project ID like PRJ-00X
    const { count } = await supabase.from("projects").select("*", { head: true, count: "exact" });
    const pId = `PRJ-${String((count ?? 0) + 1).padStart(3, "0")}`;

    const { data, error } = await supabase
      .from("projects")
      .insert({
        project_id: pId,
        title: body.title,
        client: body.client,
        lead_id: body.leadId || null,
        status: body.status ?? "planning",
        start_date: body.startDate || null,
        end_date: body.endDate || null,
        value: body.value ?? 0,
        description: body.description ?? "",
        assigned_team: body.assignedTeam ?? [],
        tags: body.tags ?? [],
        progress: body.progress ?? 0,
        developer_id: body.developerId || null,
        developer_name: body.developerName || null,
        updates: body.updates ?? [],
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
