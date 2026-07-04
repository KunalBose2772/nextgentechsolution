import { NextRequest, NextResponse } from "next/server";
import { getServerSupabase, isSupabaseConfigured } from "@/lib/supabase";
import { verifyToken, TOKEN_KEY, getStaticUsers } from "@/lib/auth";

async function getUser(req: NextRequest) {
  const token = req.cookies.get(TOKEN_KEY)?.value;
  if (!token) return null;
  return verifyToken(token);
}

export async function GET(req: NextRequest) {
  const user = await getUser(req);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  if (!isSupabaseConfigured()) {
    return NextResponse.json({
      totalLeads: 0, newLeads: 0, convertedLeads: 0, lostLeads: 0,
      totalQuotations: 0, pendingApprovals: 0, openTickets: 0,
      totalRevenue: 0, conversionRate: 0, activeProjects: 0,
      leadsByStatus: [], leadsBySource: [], monthlyLeads: [],
      telecallerPerformance: [], recentActivities: [],
      _note: "Connect Supabase to see live data",
    });
  }

  const supabase = getServerSupabase()!;
  const staticUsers = getStaticUsers();
  const isTC = user.role === "telecaller";
  const tcId = user.sub as string;

  const baseQ = () => {
    const q = supabase.from("leads").select("*", { count: "exact", head: true });
    return isTC ? q.eq("assigned_to", tcId) : q;
  };

  // ── Parallel count queries ──────────────────────────────────────
  const [
    { count: totalLeads },
    { count: newLeads },
    { count: convertedLeads },
    { count: lostLeads },
    { count: totalQuotations },
    { count: pendingApprovals },
    { count: openTickets },
    { count: activeProjects },
    { data: statusRows },
    { data: sourceRows },
    { data: revenueRows },
    { data: monthlyRows },
    { data: perfRows },
    { data: recentActivities },
  ] = await Promise.all([
    baseQ(),
    baseQ().eq("status", "new"),
    baseQ().eq("status", "converted"),
    baseQ().eq("status", "lost"),
    isTC
      ? supabase.from("quotations").select("*", { count: "exact", head: true }).eq("created_by", tcId)
      : supabase.from("quotations").select("*", { count: "exact", head: true }),
    supabase.from("quotations").select("*", { count: "exact", head: true }).eq("status", "pending_approval"),
    supabase.from("tickets").select("*", { count: "exact", head: true }).in("status", ["open", "in_progress"]),
    supabase.from("projects").select("*", { count: "exact", head: true }).eq("status", "active"),
    isTC
      ? supabase.from("leads").select("status").eq("assigned_to", tcId)
      : supabase.from("leads").select("status"),
    isTC
      ? supabase.from("leads").select("source").eq("assigned_to", tcId)
      : supabase.from("leads").select("source"),
    supabase.from("leads").select("value").eq("status", "converted"),
    supabase.from("leads").select("created_at, status").gte(
      "created_at",
      new Date(Date.now() - 180 * 24 * 60 * 60 * 1000).toISOString()
    ),
    supabase.from("leads").select("assigned_to, status, value"),
    supabase.from("activities").select("*").order("created_at", { ascending: false }).limit(10),
  ]);

  // ── Aggregate status distribution ──────────────────────────────
  const statusMap = new Map<string, number>();
  (statusRows ?? []).forEach((r) => statusMap.set(r.status, (statusMap.get(r.status) ?? 0) + 1));
  const leadsByStatus = Array.from(statusMap.entries()).map(([status, count]) => ({ status, count }));

  // ── Aggregate source distribution ──────────────────────────────
  const sourceMap = new Map<string, number>();
  (sourceRows ?? []).forEach((r) => sourceMap.set(r.source, (sourceMap.get(r.source) ?? 0) + 1));
  const leadsBySource = Array.from(sourceMap.entries()).map(([source, count]) => ({ source, count }));

  // ── Total revenue from converted leads ─────────────────────────
  const totalRevenue = (revenueRows ?? []).reduce((acc, l) => acc + (Number(l.value) || 0), 0);

  // ── Conversion rate ─────────────────────────────────────────────
  const conversionRate = (totalLeads ?? 0) > 0
    ? Number((((convertedLeads ?? 0) / (totalLeads ?? 1)) * 100).toFixed(1))
    : 0;

  // ── Monthly leads (last 6 months) ──────────────────────────────
  const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const monthlyMap: Record<string, { month: string; leads: number; converted: number }> = {};
  for (let i = 5; i >= 0; i--) {
    const d = new Date(); d.setMonth(d.getMonth() - i);
    const key = MONTHS[d.getMonth()];
    monthlyMap[key] = { month: key, leads: 0, converted: 0 };
  }
  (monthlyRows ?? []).forEach((l) => {
    const key = MONTHS[new Date(l.created_at as string).getMonth()];
    if (monthlyMap[key]) {
      monthlyMap[key].leads += 1;
      if (l.status === "converted") monthlyMap[key].converted += 1;
    }
  });
  const monthlyLeads = Object.values(monthlyMap);

  // ── Telecaller performance ──────────────────────────────────────
  const perfMap: Record<string, { name: string; leads: number; converted: number; revenue: number }> = {};
  (perfRows ?? []).forEach((l) => {
    const tcUserId = l.assigned_to as string | null;
    if (!tcUserId) return;
    const tcUser = staticUsers.find((u) => u._id === tcUserId);
    const name = tcUser?.name ?? "Unassigned";
    if (!perfMap[name]) perfMap[name] = { name, leads: 0, converted: 0, revenue: 0 };
    perfMap[name].leads += 1;
    if (l.status === "converted") {
      perfMap[name].converted += 1;
      perfMap[name].revenue += Number(l.value) || 0;
    }
  });
  const telecallerPerformance = Object.values(perfMap).sort((a, b) => b.leads - a.leads);

  return NextResponse.json({
    totalLeads:           totalLeads        ?? 0,
    newLeads:             newLeads          ?? 0,
    convertedLeads:       convertedLeads    ?? 0,
    lostLeads:            lostLeads         ?? 0,
    totalQuotations:      totalQuotations   ?? 0,
    pendingApprovals:     pendingApprovals  ?? 0,
    openTickets:          openTickets       ?? 0,
    totalRevenue,
    conversionRate,
    activeProjects:       activeProjects    ?? 0,
    leadsByStatus,
    leadsBySource,
    monthlyLeads,
    telecallerPerformance,
    recentActivities:     recentActivities  ?? [],
  });
}
