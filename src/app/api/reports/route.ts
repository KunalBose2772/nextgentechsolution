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

  const staticUsers = getStaticUsers();

  // Clean Fallback static reports data if Supabase isn't configured
  const fallbackData = {
    kpis: {
      totalRevenue: "₹4.85L",
      totalLeads: 12,
      conversionRate: "25%",
      avgDealValue: "₹40.4K",
      raw: {
        totalRevenue: 485000,
        totalLeads: 12,
        conversionRate: 25,
        avgDealValue: 40416
      }
    },
    monthlyData: [
      { month: "Jan", leads: 28, converted: 7,  revenue: 380000 },
      { month: "Feb", leads: 35, converted: 9,  revenue: 520000 },
      { month: "Mar", leads: 42, converted: 11, revenue: 680000 },
      { month: "Apr", leads: 38, converted: 10, revenue: 610000 },
      { month: "May", leads: 51, converted: 14, revenue: 890000 },
      { month: "Jun", leads: 48, converted: 13, revenue: 820000 },
    ],
    sourceData: [
      { name: "Website",    value: 112 },
      { name: "Referral",   value: 78 },
      { name: "Google Ads", value: 64 },
      { name: "LinkedIn",   value: 45 },
      { name: "Cold Call",  value: 43 },
    ],
    teamData: [
      { name: "Rahul S.", leads: 78, converted: 22, revenue: 1200000 },
      { name: "Priya V.", leads: 64, converted: 18, revenue: 980000  },
      { name: "Admin",    leads: 45, converted: 15, revenue: 750000  },
    ]
  };

  if (!isSupabaseConfigured()) {
    return NextResponse.json(fallbackData);
  }

  const supabase = getServerSupabase()!;
  
  // Fetch all leads (simple, server-side in-memory aggregation)
  const { data: leads, error } = await supabase
    .from("leads")
    .select("created_at, status, source, value, assigned_to");

  if (error) {
    console.error("[reports] Failed to fetch leads:", error);
    return NextResponse.json(fallbackData);
  }

  if (!leads || leads.length === 0) {
    return NextResponse.json({
      kpis: { totalRevenue: "₹0", totalLeads: 0, conversionRate: "0%", avgDealValue: "₹0", raw: { totalRevenue: 0, totalLeads: 0, conversionRate: 0, avgDealValue: 0 } },
      monthlyData: [],
      sourceData: [],
      teamData: []
    });
  }

  // 1. Basic KPI metrics
  const totalLeads = leads.length;
  const convertedLeads = leads.filter(l => l.status === "converted");
  const totalRevenue = convertedLeads.reduce((acc, l) => acc + (Number(l.value) || 0), 0);
  const conversionRate = totalLeads > 0 ? Math.round((convertedLeads.length / totalLeads) * 100) : 0;
  const avgDealValue = convertedLeads.length > 0 ? Math.round(totalRevenue / convertedLeads.length) : 0;

  const formatLakhs = (val: number) => {
    if (val >= 100000) {
      return `₹${(val / 100000).toFixed(1)}L`;
    }
    return `₹${val.toLocaleString("en-IN")}`;
  };

  // 2. Monthly Data (Last 6 Months)
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const last6Months: Record<string, { month: string; leads: number; converted: number; revenue: number; sortIdx: number }> = {};
  
  for (let i = 5; i >= 0; i--) {
    const d = new Date();
    d.setMonth(d.getMonth() - i);
    const mName = months[d.getMonth()];
    last6Months[mName] = { month: mName, leads: 0, converted: 0, revenue: 0, sortIdx: d.getTime() };
  }

  leads.forEach(l => {
    const date = new Date(l.created_at);
    const mName = months[date.getMonth()];
    if (last6Months[mName]) {
      last6Months[mName].leads += 1;
      if (l.status === "converted") {
        last6Months[mName].converted += 1;
        last6Months[mName].revenue += Number(l.value) || 0;
      }
    }
  });

  const monthlyList = Object.values(last6Months).sort((a, b) => a.sortIdx - b.sortIdx).map(({ month, leads, converted, revenue }) => ({
    month, leads, converted, revenue
  }));

  // 3. Source distribution
  const sourceCounts: Record<string, number> = {};
  leads.forEach(l => {
    const src = l.source ? String(l.source).replace("_", " ").replace(/\b\w/g, (c: string) => c.toUpperCase()) : "Other";
    sourceCounts[src] = (sourceCounts[src] || 0) + 1;
  });
  const sourceList = Object.entries(sourceCounts)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 5);

  // 4. Team performance
  const teamStats: Record<string, { name: string; leads: number; converted: number; revenue: number }> = {};
  
  leads.forEach(l => {
    const tcId = l.assigned_to;
    const tcUser = tcId ? staticUsers.find(u => u._id === tcId) : null;
    const tcName = tcUser ? tcUser.name : "Unassigned";

    if (!teamStats[tcName]) {
      teamStats[tcName] = { name: tcName, leads: 0, converted: 0, revenue: 0 };
    }
    
    teamStats[tcName].leads += 1;
    if (l.status === "converted") {
      teamStats[tcName].converted += 1;
      teamStats[tcName].revenue += Number(l.value) || 0;
    }
  });

  const teamList = Object.values(teamStats).sort((a, b) => b.revenue - a.revenue);

  return NextResponse.json({
    kpis: {
      totalRevenue: formatLakhs(totalRevenue),
      totalLeads,
      conversionRate: `${conversionRate}%`,
      avgDealValue: formatLakhs(avgDealValue),
      raw: {
        totalRevenue,
        totalLeads,
        conversionRate,
        avgDealValue
      }
    },
    monthlyData: monthlyList,
    sourceData: sourceList,
    teamData: teamList
  });
}
