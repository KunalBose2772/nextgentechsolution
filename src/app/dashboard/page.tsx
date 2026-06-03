"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Users2, TrendingUp, FileText, Ticket, DollarSign,
  CheckCircle, Clock, ArrowRight, Activity, Target,
} from "lucide-react";
import Link from "next/link";
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import StatCard from "@/components/crm/shared/StatCard";
import StatusBadge from "@/components/crm/shared/StatusBadge";
import type { DashboardStats, LeadStatus } from "@/types/crm";

const COLORS = ["#5b5bd6","#7c3aed","#0891b2","#16a34a","#d97706","#ea580c","#ec4899","#6366f1"];

const SURFACE_STYLE = {
  background: "var(--crm-surface)",
  border: "1px solid var(--crm-border)",
  boxShadow: "var(--crm-shadow-sm)",
};

interface TooltipPayloadItem { color?: string; name?: string; value?: number | string; }
interface TooltipProps { active?: boolean; payload?: TooltipPayloadItem[]; label?: string | number; }

function ChartTooltip({ active, payload, label }: TooltipProps) {
  if (active && payload && payload.length) {
    return (
      <div
        className="rounded-lg px-3 py-2 text-[12px]"
        style={{
          background: "var(--crm-surface)",
          border: "1px solid var(--crm-border)",
          boxShadow: "var(--crm-shadow-lg)",
        }}
      >
        <p style={{ color: "var(--crm-text-muted)" }} className="mb-1">{label}</p>
        {payload.map((p, i) => (
          <p key={i} className="font-medium" style={{ color: p.color ?? "var(--crm-text)" }}>
            {p.name}: {p.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
}

const RECENT_LEADS = [
  { id: "NGL00245", name: "Rohit Mehta",    status: "new" as LeadStatus,            company: "Mehta Enterprises",  time: "2m ago" },
  { id: "NGL00244", name: "Sneha Kapoor",   status: "follow_up" as LeadStatus,      company: "Kapoor Tech",        time: "18m ago" },
  { id: "NGL00243", name: "Arjun Singh",    status: "interested" as LeadStatus,     company: "Singh & Co",         time: "1h ago" },
  { id: "NGL00242", name: "Divya Sharma",   status: "converted" as LeadStatus,      company: "Sharma Solutions",   time: "3h ago" },
  { id: "NGL00241", name: "Karan Malhotra", status: "quotation_sent" as LeadStatus, company: "KM Enterprises",     time: "5h ago" },
];

export default function DashboardPage() {
  const [stats,   setStats]   = useState<DashboardStats | null>(null);
  const [, setLoading]        = useState(true);

  useEffect(() => {
    fetch("/api/dashboard/stats")
      .then((r) => r.json())
      .then((d) => { setStats(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const s = stats ?? {
    totalLeads: 342, newLeads: 28, convertedLeads: 89, lostLeads: 41,
    totalQuotations: 156, pendingApprovals: 7, openTickets: 14,
    totalRevenue: 4850000, conversionRate: 26.0, activeProjects: 23,
    monthlyLeads: [
      { month: "Dec", leads: 22, converted: 5  },
      { month: "Jan", leads: 28, converted: 7  },
      { month: "Feb", leads: 35, converted: 9  },
      { month: "Mar", leads: 42, converted: 11 },
      { month: "Apr", leads: 38, converted: 10 },
      { month: "May", leads: 51, converted: 14 },
    ],
    leadsByStatus: [],
    leadsBySource: [
      { source: "Website",    count: 112 },
      { source: "Referral",   count: 78  },
      { source: "Google Ads", count: 64  },
      { source: "LinkedIn",   count: 45  },
      { source: "Cold Call",  count: 43  },
    ],
    telecallerPerformance: [
      { name: "Rahul S.", leads: 78, converted: 22 },
      { name: "Priya V.", leads: 64, converted: 18 },
    ],
    recentActivities: [],
  };

  return (
    <div className="space-y-7">
      {/* Welcome banner */}
      <motion.div
        className="relative rounded-2xl overflow-hidden p-6 lg:p-7"
        style={{
          background: "linear-gradient(135deg, #5b5bd6 0%, #4338ca 50%, #6d28d9 100%)",
        }}
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),
                              linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)`,
            backgroundSize: "32px 32px",
          }}
        />
        <div className="absolute -top-16 -right-16 w-72 h-72 rounded-full opacity-30"
          style={{ background: "radial-gradient(circle, rgba(255,255,255,0.4), transparent 70%)", filter: "blur(40px)" }}
        />
        <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-[20px] font-semibold text-white tracking-tight">Good morning, Admin</h2>
            <p className="text-[13px] text-white/80 mt-1">
              You have <span className="font-semibold text-white">{s.newLeads} new leads</span> and{" "}
              <span className="font-semibold text-white">{s.pendingApprovals} quotations</span> pending approval today.
            </p>
          </div>
          <Link
            href="/dashboard/leads"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-[13px] font-semibold transition-colors shrink-0"
            style={{ background: "rgba(255,255,255,0.95)", color: "#4338ca" }}
          >
            View all leads <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </motion.div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Leads"      value={s.totalLeads}     change={12} icon={Users2}      color="#5b5bd6"  delay={0}    />
        <StatCard title="Converted"        value={s.convertedLeads} change={8}  icon={CheckCircle} color="#16a34a"  delay={0.05} />
        <StatCard title="Revenue"          value={s.totalRevenue / 100000} prefix="₹" suffix="L" change={18} icon={DollarSign} color="#d97706" delay={0.10} />
        <StatCard title="Conversion Rate"  value={s.conversionRate} suffix="%" change={3} icon={TrendingUp} color="#7c3aed" delay={0.15} />
        <StatCard title="Quotations"       value={s.totalQuotations} change={5} icon={FileText}   color="#0891b2" delay={0.20} />
        <StatCard title="Pending Approval" value={s.pendingApprovals}            icon={Clock}      color="#d97706" delay={0.25} />
        <StatCard title="Open Tickets"     value={s.openTickets}                 icon={Ticket}     color="#ec4899" delay={0.30} />
        <StatCard title="Active Projects"  value={s.activeProjects} change={2}   icon={Target}     color="#6366f1" delay={0.35} />
      </div>

      {/* Charts row 1 */}
      <div className="grid lg:grid-cols-3 gap-5">
        <motion.div
          className="lg:col-span-2 rounded-xl p-5"
          style={SURFACE_STYLE}
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
        >
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-[14px] font-semibold" style={{ color: "var(--crm-text-strong)" }}>Lead Trend</h3>
              <p className="text-[12px] mt-0.5" style={{ color: "var(--crm-text-muted)" }}>
                Monthly leads vs conversions
              </p>
            </div>
            <div className="flex items-center gap-3 text-[11px]" style={{ color: "var(--crm-text-muted)" }}>
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-sm inline-block" style={{ background: "#5b5bd6" }} /> Leads</span>
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-sm inline-block" style={{ background: "#16a34a" }} /> Converted</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={210}>
            <AreaChart data={s.monthlyLeads} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="gLeads" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#5b5bd6" stopOpacity={0.30} />
                  <stop offset="95%" stopColor="#5b5bd6" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gConv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#16a34a" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#16a34a" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" />
              <XAxis dataKey="month" tick={{ fill: "#8a8f99", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#8a8f99", fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<ChartTooltip />} />
              <Area type="monotone" dataKey="leads"     stroke="#5b5bd6" strokeWidth={2} fill="url(#gLeads)" name="Leads"     dot={false} />
              <Area type="monotone" dataKey="converted" stroke="#16a34a" strokeWidth={2} fill="url(#gConv)"  name="Converted" dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div
          className="rounded-xl p-5"
          style={SURFACE_STYLE}
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
        >
          <h3 className="text-[14px] font-semibold" style={{ color: "var(--crm-text-strong)" }}>Lead Sources</h3>
          <p className="text-[12px] mt-0.5 mb-4" style={{ color: "var(--crm-text-muted)" }}>Where leads come from</p>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie data={s.leadsBySource} dataKey="count" nameKey="source" cx="50%" cy="50%" outerRadius={65} innerRadius={40}>
                {s.leadsBySource.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<ChartTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-3 space-y-1.5">
            {s.leadsBySource.slice(0, 4).map((item, i) => (
              <div key={item.source} className="flex items-center justify-between text-[12px]">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ background: COLORS[i % COLORS.length] }} />
                  <span style={{ color: "var(--crm-text-muted)" }}>{item.source}</span>
                </div>
                <span className="font-medium" style={{ color: "var(--crm-text)" }}>{item.count}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Charts row 2 + Tables */}
      <div className="grid lg:grid-cols-3 gap-5">
        <motion.div
          className="rounded-xl p-5"
          style={SURFACE_STYLE}
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
        >
          <h3 className="text-[14px] font-semibold" style={{ color: "var(--crm-text-strong)" }}>Team Performance</h3>
          <p className="text-[12px] mt-0.5 mb-4" style={{ color: "var(--crm-text-muted)" }}>Telecaller stats</p>
          <ResponsiveContainer width="100%" height={170}>
            <BarChart data={s.telecallerPerformance} margin={{ top: 4, right: 4, left: -22, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" />
              <XAxis dataKey="name" tick={{ fill: "#8a8f99", fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#8a8f99", fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip content={<ChartTooltip />} />
              <Bar dataKey="leads"     fill="#5b5bd6" radius={[6,6,0,0]} name="Leads" />
              <Bar dataKey="converted" fill="#16a34a" radius={[6,6,0,0]} name="Converted" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div
          className="lg:col-span-2 rounded-xl overflow-hidden"
          style={SURFACE_STYLE}
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}
        >
          <div className="flex items-center justify-between px-5 py-4 border-b" style={{ borderColor: "var(--crm-border-faint)" }}>
            <div>
              <h3 className="text-[14px] font-semibold" style={{ color: "var(--crm-text-strong)" }}>Recent Leads</h3>
              <p className="text-[12px] mt-0.5" style={{ color: "var(--crm-text-muted)" }}>Latest incoming leads</p>
            </div>
            <Link href="/dashboard/leads" className="text-[12px] font-medium flex items-center gap-1" style={{ color: "var(--crm-primary)" }}>
              View all <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div>
            {RECENT_LEADS.map((lead, i) => (
              <motion.div
                key={lead.id}
                className="flex items-center gap-4 px-5 py-3.5 border-b cursor-pointer group"
                style={{ borderColor: "var(--crm-border-faint)" }}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.04 }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "var(--crm-surface-hover)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-[12px] font-semibold text-white shrink-0"
                  style={{ background: `linear-gradient(135deg,${COLORS[i % COLORS.length]},${COLORS[(i+1) % COLORS.length]})` }}
                >
                  {lead.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-medium truncate" style={{ color: "var(--crm-text-strong)" }}>{lead.name}</p>
                  <p className="text-[11px] truncate" style={{ color: "var(--crm-text-muted)" }}>{lead.company}</p>
                </div>
                <StatusBadge type="lead" status={lead.status} />
                <span className="text-[11px] shrink-0" style={{ color: "var(--crm-text-faint)" }}>{lead.time}</span>
                <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: "var(--crm-text-subtle)" }} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Quick actions */}
      <motion.div
        className="grid grid-cols-2 sm:grid-cols-4 gap-4"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55 }}
      >
        {[
          { label: "Add Lead",      href: "/dashboard/leads?new=1",     color: "#5b5bd6", icon: Users2   },
          { label: "New Quotation", href: "/dashboard/quotations/new",  color: "#0891b2", icon: FileText },
          { label: "Create Ticket", href: "/dashboard/tickets?new=1",   color: "#ec4899", icon: Ticket   },
          { label: "View Reports",  href: "/dashboard/reports",         color: "#16a34a", icon: Activity },
        ].map((action) => (
          <Link
            key={action.label}
            href={action.href}
            className="group flex items-center gap-3 p-4 rounded-xl transition-all"
            style={SURFACE_STYLE}
          >
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
              style={{ background: `${action.color}12`, color: action.color }}
            >
              <action.icon className="w-4 h-4" strokeWidth={1.9} />
            </div>
            <span className="text-[13px] font-medium" style={{ color: "var(--crm-text)" }}>{action.label}</span>
            <ArrowRight className="w-3.5 h-3.5 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: "var(--crm-text-subtle)" }} />
          </Link>
        ))}
      </motion.div>
    </div>
  );
}
