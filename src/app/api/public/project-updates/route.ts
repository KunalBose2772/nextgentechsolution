import { NextRequest, NextResponse } from "next/server";
import { getServerSupabase, isSupabaseConfigured } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json({ error: "Database not configured" }, { status: 503 });
  }

  const { searchParams } = new URL(req.url);
  const searchId = searchParams.get("id")?.trim();

  if (!searchId) {
    return NextResponse.json({ error: "Search ID is required" }, { status: 400 });
  }

  const supabase = getServerSupabase()!;

  // 1. Try to fetch by project_id
  let { data: project, error } = await supabase
    .from("projects")
    .select("*")
    .eq("project_id", searchId)
    .maybeSingle();

  // 2. If not found, look up linked lead by lead_id or email
  if (!project) {
    let leadQuery = supabase.from("leads").select("id, name, email");
    if (searchId.includes("@")) {
      leadQuery = leadQuery.eq("email", searchId.toLowerCase());
    } else {
      leadQuery = leadQuery.eq("lead_id", searchId);
    }
    const { data: lead } = await leadQuery.maybeSingle();

    if (lead) {
      const { data: prjByLead } = await supabase
        .from("projects")
        .select("*")
        .eq("lead_id", lead.id)
        .maybeSingle();
      project = prjByLead;
    }
  }

  if (!project) {
    return NextResponse.json({ error: "Project not found with the provided identifier" }, { status: 404 });
  }

  // 3. Resolve Lead Details for client name
  let clientName = project.client;
  let clientEmail = "";
  if (project.lead_id) {
    const { data: leadDetail } = await supabase
      .from("leads")
      .select("name, email")
      .eq("id", project.lead_id)
      .maybeSingle();
    if (leadDetail) {
      clientName = leadDetail.name;
      clientEmail = leadDetail.email;
    }
  }

  return NextResponse.json({
    success: true,
    data: {
      id: project.id,
      projectId: project.project_id,
      title: project.title,
      client: clientName,
      clientEmail: clientEmail,
      status: project.status,
      startDate: project.start_date,
      endDate: project.end_date,
      progress: project.progress || 0,
      developerName: project.developer_name || "Assigned Developer",
      updates: project.updates || [],
    }
  });
}
