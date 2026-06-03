import { NextRequest, NextResponse } from "next/server";
import { getServerSupabase, isSupabaseConfigured } from "@/lib/supabase";
import { verifyToken, TOKEN_KEY } from "@/lib/auth";

async function getUser(req: NextRequest) {
  const token = req.cookies.get(TOKEN_KEY)?.value;
  if (!token) return null;
  return verifyToken(token);
}

/* Mock stats shown when Supabase is not yet configured */
function mockStats() {
  return {
    totalLeads: 342,
    newLeads: 28,
    convertedLeads: 89,
    lostLeads: 41,
    totalQuotations: 156,
    pendingApprovals: 7,
    openTickets: 14,
    totalRevenue: 4850000,
    conversionRate: 26.0,
    activeProjects: 23,
    leadsByStatus: [
      { status: "new", count: 28 },
      { status: "assigned", count: 45 },
      { status: "follow_up", count: 67 },
      { status: "interested", count: 38 },
      { status: "quotation_sent", count: 29 },
      { status: "negotiation", count: 15 },
      { status: "converted", count: 89 },
      { status: "lost", count: 41 },
    ],
    leadsBySource: [
      { source: "website",     count: 112 },
      { source: "referral",    count: 78  },
      { source: "google_ads",  count: 64  },
      { source: "linkedin",    count: 45  },
      { source: "cold_call",   count: 43  },
    ],
    monthlyLeads: [
      { month: "Dec", leads: 22, converted: 5  },
      { month: "Jan", leads: 28, converted: 7  },
      { month: "Feb", leads: 35, converted: 9  },
      { month: "Mar", leads: 42, converted: 11 },
      { month: "Apr", leads: 38, converted: 10 },
      { month: "May", leads: 51, converted: 14 },
    ],
    telecallerPerformance: [
      { name: "Rahul Sharma", leads: 78, converted: 22 },
      { name: "Priya Verma",  leads: 64, converted: 18 },
    ],
    recentActivities: [],
  };
}

export async function GET(req: NextRequest) {
  const user = await getUser(req);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  if (!isSupabaseConfigured()) return NextResponse.json(mockStats());

  const supabase = getServerSupabase()!;
  const leadFilter = user.role === "telecaller" ? { assigned_to: user.sub as string } : null;

  const baseLeadQuery = () => {
    const q = supabase.from("leads").select("*", { count: "exact", head: true });
    return leadFilter ? q.eq("assigned_to", leadFilter.assigned_to) : q;
  };

  const [
    { count: totalLeads },
    { count: newLeads },
    { count: convertedLeads },
    { count: lostLeads },
    { count: totalQuotations },
    { count: pendingApprovals },
    { count: openTickets },
    { data: byStatusRaw },
    { data: bySourceRaw },
    { data: recentActivities },
  ] = await Promise.all([
    baseLeadQuery(),
    baseLeadQuery().eq("status", "new"),
    baseLeadQuery().eq("status", "converted"),
    baseLeadQuery().eq("status", "lost"),
    user.role === "telecaller"
      ? supabase.from("quotations").select("*", { count: "exact", head: true }).eq("created_by", user.sub as string)
      : supabase.from("quotations").select("*", { count: "exact", head: true }),
    supabase.from("quotations").select("*", { count: "exact", head: true }).eq("status", "pending_approval"),
    supabase.from("tickets").select("*", { count: "exact", head: true }).in("status", ["open", "in_progress"]),
    leadFilter
      ? supabase.from("leads").select("status").eq("assigned_to", leadFilter.assigned_to)
      : supabase.from("leads").select("status"),
    leadFilter
      ? supabase.from("leads").select("source").eq("assigned_to", leadFilter.assigned_to)
      : supabase.from("leads").select("source"),
    supabase.from("activities").select("*").order("created_at", { ascending: false }).limit(10),
  ]);

  // Aggregate status counts
  const statusMap = new Map<string, number>();
  (byStatusRaw ?? []).forEach((r) => statusMap.set(r.status, (statusMap.get(r.status) ?? 0) + 1));
  const leadsByStatus = Array.from(statusMap.entries()).map(([status, count]) => ({ status, count }));

  // Aggregate source counts
  const sourceMap = new Map<string, number>();
  (bySourceRaw ?? []).forEach((r) => sourceMap.set(r.source, (sourceMap.get(r.source) ?? 0) + 1));
  const leadsBySource = Array.from(sourceMap.entries()).map(([source, count]) => ({ source, count }));

  const convRate = (totalLeads ?? 0) > 0
    ? Number((((convertedLeads ?? 0) / (totalLeads ?? 1)) * 100).toFixed(1))
    : 0;

  return NextResponse.json({
    totalLeads:        totalLeads        ?? 0,
    newLeads:          newLeads          ?? 0,
    convertedLeads:    convertedLeads    ?? 0,
    lostLeads:         lostLeads         ?? 0,
    totalQuotations:   totalQuotations   ?? 0,
    pendingApprovals:  pendingApprovals  ?? 0,
    openTickets:       openTickets       ?? 0,
    totalRevenue:      4850000,
    conversionRate:    convRate,
    activeProjects:    23,
    leadsByStatus,
    leadsBySource,
    monthlyLeads: [
      { month: "Dec", leads: 22, converted: 5  },
      { month: "Jan", leads: 28, converted: 7  },
      { month: "Feb", leads: 35, converted: 9  },
      { month: "Mar", leads: 42, converted: 11 },
      { month: "Apr", leads: 38, converted: 10 },
      { month: "May", leads: 51, converted: 14 },
    ],
    telecallerPerformance: [
      { name: "Rahul Sharma", leads: 78, converted: 22 },
      { name: "Priya Verma",  leads: 64, converted: 18 },
    ],
    recentActivities: recentActivities ?? [],
  });
}
