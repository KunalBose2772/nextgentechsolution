"use client";

import { motion } from "framer-motion";
import {
  AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import {
  Megaphone, TrendingUp, Eye, MousePointerClick, DollarSign,
  Plus, ExternalLink, Target,
} from "lucide-react";
import PageHeader from "@/components/crm/shared/PageHeader";
import StatCard from "@/components/crm/shared/StatCard";

const SURFACE_STYLE = {
  background: "var(--crm-surface)",
  border: "1px solid var(--crm-border)",
  boxShadow: "var(--crm-shadow-sm)",
};

const CAMPAIGNS = [
  { id: "1", name: "Q2 Spring Promotion",   channel: "Google Ads",  budget: 250000, spent: 187500, leads: 48, conversions: 14, status: "active",    roi: 285 },
  { id: "2", name: "LinkedIn B2B Outreach", channel: "LinkedIn",    budget: 180000, spent: 142000, leads: 32, conversions: 9,  status: "active",    roi: 220 },
  { id: "3", name: "Brand Awareness",       channel: "Facebook Ads",budget: 100000, spent: 95000,  leads: 28, conversions: 6,  status: "active",    roi: 145 },
  { id: "4", name: "Retargeting Campaign",  channel: "Google Ads",  budget: 80000,  spent: 80000,  leads: 21, conversions: 8,  status: "completed", roi: 310 },
  { id: "5", name: "SEO Content Push",      channel: "Organic",     budget: 50000,  spent: 28000,  leads: 19, conversions: 5,  status: "active",    roi: 410 },
];

const CHANNEL_DATA = [
  { channel: "Google",    leads: 64, cost: 230 },
  { channel: "LinkedIn",  leads: 45, cost: 310 },
  { channel: "Facebook",  leads: 38, cost: 180 },
  { channel: "Organic",   leads: 42, cost: 65  },
  { channel: "Referral",  leads: 28, cost: 0   },
  { channel: "Email",     leads: 22, cost: 45  },
];

const TREND_DATA = [
  { month: "Jan", spend: 380000, leads: 95  },
  { month: "Feb", spend: 425000, leads: 112 },
  { month: "Mar", spend: 510000, leads: 138 },
  { month: "Apr", spend: 480000, leads: 132 },
  { month: "May", spend: 540000, leads: 148 },
];

interface TooltipPayloadItem { color?: string; name?: string; value?: number | string; }
interface TooltipProps { active?: boolean; payload?: TooltipPayloadItem[]; label?: string | number; }

function ChartTooltip({ active, payload, label }: TooltipProps) {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg px-3 py-2 text-[12px]"
        style={{ background: "var(--crm-surface)", border: "1px solid var(--crm-border)", boxShadow: "var(--crm-shadow-lg)" }}>
        <p style={{ color: "var(--crm-text-muted)" }} className="mb-1">{label}</p>
        {payload.map((p, i) => (
          <p key={i} className="font-medium" style={{ color: p.color ?? "var(--crm-text)" }}>{p.name}: {p.value}</p>
        ))}
      </div>
    );
  }
  return null;
}

export default function MarketingPage() {
  const totalSpend = CAMPAIGNS.reduce((s, c) => s + c.spent, 0);
  const totalLeads = CAMPAIGNS.reduce((s, c) => s + c.leads, 0);
  const totalConv  = CAMPAIGNS.reduce((s, c) => s + c.conversions, 0);
  const avgRoi     = Math.round(CAMPAIGNS.reduce((s, c) => s + c.roi, 0) / CAMPAIGNS.length);

  return (
    <div>
      <PageHeader
        title="Marketing"
        subtitle="Campaign performance, channels & digital marketing analytics"
        badge="Marketing"
        badgeColor="#ec4899"
        actions={
          <button className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-[13px] font-semibold text-white transition-all"
            style={{ background: "linear-gradient(135deg,#ec4899,#7c3aed)", boxShadow: "0 1px 2px 0 rgba(236,72,153,0.25)" }}>
            <Plus className="w-4 h-4" /> New Campaign
          </button>
        }
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard title="Total Spend"        value={`₹${(totalSpend/100000).toFixed(1)}L`} icon={DollarSign}        color="#ec4899" delay={0}    />
        <StatCard title="Total Leads"        value={totalLeads}                            change={18} icon={Megaphone} color="#5b5bd6" delay={0.05} />
        <StatCard title="Conversions"        value={totalConv}                             change={12} icon={Target}    color="#16a34a" delay={0.1}  />
        <StatCard title="Avg ROI"            value={avgRoi} suffix="%"                     change={8}  icon={TrendingUp} color="#d97706" delay={0.15} />
      </div>

      <div className="grid lg:grid-cols-3 gap-5 mb-6">
        <motion.div className="lg:col-span-2 rounded-xl p-5" style={SURFACE_STYLE} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-[14px] font-semibold" style={{ color: "var(--crm-text-strong)" }}>Marketing Trend</h3>
              <p className="text-[12px] mt-0.5" style={{ color: "var(--crm-text-muted)" }}>Spend vs leads generated</p>
            </div>
            <div className="flex items-center gap-3 text-[11px]" style={{ color: "var(--crm-text-muted)" }}>
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-sm" style={{ background: "#ec4899" }} /> Spend</span>
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-sm" style={{ background: "#5b5bd6" }} /> Leads</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={210}>
            <AreaChart data={TREND_DATA} margin={{ top: 4, right: 4, left: -16, bottom: 0 }}>
              <defs>
                <linearGradient id="spendGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ec4899" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#ec4899" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="leadsGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#5b5bd6" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#5b5bd6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" />
              <XAxis dataKey="month" tick={{ fill: "#8a8f99", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#8a8f99", fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<ChartTooltip />} />
              <Area type="monotone" dataKey="spend" stroke="#ec4899" strokeWidth={2} fill="url(#spendGrad)" name="Spend" />
              <Area type="monotone" dataKey="leads" stroke="#5b5bd6" strokeWidth={2} fill="url(#leadsGrad)" name="Leads" />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div className="rounded-xl p-5" style={SURFACE_STYLE} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
          <h3 className="text-[14px] font-semibold mb-1" style={{ color: "var(--crm-text-strong)" }}>Channel Performance</h3>
          <p className="text-[12px] mb-3" style={{ color: "var(--crm-text-muted)" }}>Leads by channel</p>
          <ResponsiveContainer width="100%" height={185}>
            <BarChart data={CHANNEL_DATA} layout="vertical" margin={{ top: 0, right: 4, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" horizontal={false} />
              <XAxis type="number" tick={{ fill: "#8a8f99", fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis dataKey="channel" type="category" tick={{ fill: "#8a8f99", fontSize: 10 }} axisLine={false} tickLine={false} width={60} />
              <Tooltip content={<ChartTooltip />} />
              <Bar dataKey="leads" fill="#7c3aed" radius={[0,6,6,0]} name="Leads" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      <div className="rounded-xl overflow-hidden" style={SURFACE_STYLE}>
        <div className="px-5 py-4 border-b" style={{ borderColor: "var(--crm-border-faint)" }}>
          <h3 className="text-[14px] font-semibold" style={{ color: "var(--crm-text-strong)" }}>Active Campaigns</h3>
          <p className="text-[12px] mt-0.5" style={{ color: "var(--crm-text-muted)" }}>All marketing campaigns and their performance</p>
        </div>

        <div className="grid grid-cols-[1.8fr_1fr_1.4fr_1fr_1fr_1fr_80px] gap-3 px-5 py-2.5 border-b text-[11px] uppercase tracking-wider font-medium"
          style={{ borderColor: "var(--crm-border-faint)", background: "var(--crm-surface-muted)", color: "var(--crm-text-subtle)" }}>
          <span>Campaign</span>
          <span>Channel</span>
          <span>Budget / Spent</span>
          <span>Leads</span>
          <span>Conv.</span>
          <span>ROI</span>
          <span className="text-right">View</span>
        </div>

        {CAMPAIGNS.map((c, i) => {
          const pct = Math.round((c.spent / c.budget) * 100);
          return (
            <motion.div key={c.id}
              className="grid grid-cols-[1.8fr_1fr_1.4fr_1fr_1fr_1fr_80px] gap-3 items-center px-5 py-3 border-b transition-colors"
              style={{ borderColor: "var(--crm-border-faint)" }}
              initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "var(--crm-surface-hover)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
            >
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center"
                  style={{ background: "rgba(236,72,153,0.10)", color: "#ec4899" }}>
                  <Megaphone className="w-3.5 h-3.5" />
                </div>
                <div>
                  <p className="text-[13px] font-medium" style={{ color: "var(--crm-text-strong)" }}>{c.name}</p>
                  <p className="text-[10px] capitalize" style={{ color: "var(--crm-text-subtle)" }}>{c.status}</p>
                </div>
              </div>

              <span className="text-[12px] font-medium" style={{ color: "var(--crm-text)" }}>{c.channel}</span>

              <div>
                <div className="flex items-center justify-between text-[11px] mb-1">
                  <span style={{ color: "var(--crm-text-muted)" }}>₹{(c.spent/1000).toFixed(0)}k</span>
                  <span style={{ color: "var(--crm-text-subtle)" }}>/ ₹{(c.budget/1000).toFixed(0)}k</span>
                </div>
                <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "var(--crm-surface-muted)" }}>
                  <div className="h-full rounded-full"
                    style={{ width: `${pct}%`, background: pct >= 100 ? "#dc2626" : "linear-gradient(90deg,#ec4899,#7c3aed)" }} />
                </div>
              </div>

              <div className="flex items-center gap-1 text-[13px]" style={{ color: "var(--crm-text)" }}>
                <Eye className="w-3 h-3" style={{ color: "var(--crm-text-subtle)" }} />
                <span className="font-medium">{c.leads}</span>
              </div>

              <div className="flex items-center gap-1 text-[13px]" style={{ color: "var(--crm-text)" }}>
                <MousePointerClick className="w-3 h-3" style={{ color: "var(--crm-text-subtle)" }} />
                <span className="font-medium">{c.conversions}</span>
              </div>

              <span className="text-[13px] font-semibold" style={{ color: c.roi >= 200 ? "var(--crm-success)" : c.roi >= 100 ? "var(--crm-warning)" : "var(--crm-danger)" }}>
                {c.roi}%
              </span>

              <div className="flex justify-end">
                <button className="p-1.5 rounded-md transition-colors" style={{ color: "var(--crm-text-muted)" }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(91,91,214,0.10)"; e.currentTarget.style.color = "var(--crm-primary)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--crm-text-muted)"; }}>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
