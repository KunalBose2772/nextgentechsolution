"use client";

import { motion } from "framer-motion";
import {
  MapPin, Calendar, Clock, CheckCircle2, Plus,
  Navigation, Building2, Phone, AlertCircle,
} from "lucide-react";
import PageHeader from "@/components/crm/shared/PageHeader";
import StatCard from "@/components/crm/shared/StatCard";

const SURFACE_STYLE = {
  background: "var(--crm-surface)",
  border: "1px solid var(--crm-border)",
  boxShadow: "var(--crm-shadow-sm)",
};

const VISITS = [
  { id: "1", client: "Innovate Solutions",    contact: "Ramesh Sharma", address: "Bandra West, Mumbai",       time: "10:30 AM", status: "completed", agent: "Vijay K." },
  { id: "2", client: "TechCorp India",        contact: "Amit Kapoor",   address: "Saket, New Delhi",          time: "12:00 PM", status: "in_progress", agent: "Anil S." },
  { id: "3", client: "DigitalEdge Pvt Ltd",   contact: "Sneha Patel",   address: "Koramangala, Bengaluru",   time: "2:30 PM",  status: "scheduled", agent: "Vijay K." },
  { id: "4", client: "CloudFirst Systems",    contact: "Rohit Verma",   address: "Hitech City, Hyderabad",   time: "4:00 PM",  status: "scheduled", agent: "Manoj P." },
  { id: "5", client: "Skyline Infrastructure", contact: "Pooja Mehta",   address: "Vashi, Navi Mumbai",        time: "5:30 PM",  status: "scheduled", agent: "Anil S." },
];

const AGENTS = [
  { name: "Vijay Kumar",  visits: 18, leads: 12, conversions: 5,  region: "Mumbai" },
  { name: "Anil Sharma",  visits: 22, leads: 15, conversions: 7,  region: "Delhi NCR" },
  { name: "Manoj Patel",  visits: 16, leads: 11, conversions: 4,  region: "Hyderabad" },
  { name: "Suresh Reddy", visits: 14, leads: 9,  conversions: 3,  region: "Bengaluru" },
];

const STATUS_STYLE: Record<string, { color: string; label: string }> = {
  scheduled:   { color: "#5b5bd6", label: "Scheduled" },
  in_progress: { color: "#d97706", label: "In Progress" },
  completed:   { color: "#16a34a", label: "Completed" },
  cancelled:   { color: "#dc2626", label: "Cancelled" },
};

export default function FieldSalesPage() {
  return (
    <div>
      <PageHeader
        title="Field Sales"
        subtitle="Track on-ground visits, agent performance, and client meetings"
        badge="On-Field"
        badgeColor="#ea580c"
        actions={
          <button className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-[13px] font-semibold text-white transition-all"
            style={{ background: "linear-gradient(135deg,#ea580c,#dc2626)", boxShadow: "0 1px 2px 0 rgba(234,88,12,0.25)" }}>
            <Plus className="w-4 h-4" /> Schedule Visit
          </button>
        }
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard title="Today's Visits"      value={VISITS.length}        icon={Calendar}     color="#ea580c" delay={0}    />
        <StatCard title="Completed"           value={VISITS.filter(v => v.status === "completed").length} icon={CheckCircle2} color="#16a34a" delay={0.05} />
        <StatCard title="Active Agents"       value={AGENTS.length}        icon={MapPin}       color="#5b5bd6" delay={0.1}  />
        <StatCard title="Conversions (MTD)"   value={19}                   change={14} icon={Building2} color="#7c3aed" delay={0.15} />
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 rounded-xl overflow-hidden" style={SURFACE_STYLE}>
          <div className="px-5 py-4 border-b flex items-center justify-between" style={{ borderColor: "var(--crm-border-faint)" }}>
            <div>
              <h3 className="text-[14px] font-semibold" style={{ color: "var(--crm-text-strong)" }}>Today&apos;s Visits</h3>
              <p className="text-[12px] mt-0.5" style={{ color: "var(--crm-text-muted)" }}>Scheduled and ongoing field visits</p>
            </div>
            <button className="text-[12px] font-medium" style={{ color: "var(--crm-primary)" }}>View map →</button>
          </div>

          {VISITS.map((v, i) => {
            const style = STATUS_STYLE[v.status];
            return (
              <motion.div key={v.id}
                className="px-5 py-3.5 border-b flex items-start gap-3 transition-colors"
                style={{ borderColor: "var(--crm-border-faint)" }}
                initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "var(--crm-surface-hover)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
              >
                <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                  style={{ background: `${style.color}12`, color: style.color }}>
                  <MapPin className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className="text-[13px] font-semibold truncate" style={{ color: "var(--crm-text-strong)" }}>{v.client}</p>
                    <span className="text-[10px] font-medium px-1.5 py-0.5 rounded-md"
                      style={{ color: style.color, background: `${style.color}12`, border: `1px solid ${style.color}22` }}>
                      {style.label}
                    </span>
                  </div>
                  <p className="text-[12px]" style={{ color: "var(--crm-text-muted)" }}>{v.address}</p>
                  <div className="flex items-center gap-3 mt-1.5 text-[11px]" style={{ color: "var(--crm-text-subtle)" }}>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{v.time}</span>
                    <span className="flex items-center gap-1"><Phone className="w-3 h-3" />{v.contact}</span>
                    <span className="flex items-center gap-1">Agent: <strong style={{ color: "var(--crm-text)" }}>{v.agent}</strong></span>
                  </div>
                </div>
                <button className="p-1.5 rounded-md transition-colors" style={{ color: "var(--crm-text-muted)" }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(91,91,214,0.10)"; e.currentTarget.style.color = "var(--crm-primary)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--crm-text-muted)"; }}>
                  <Navigation className="w-3.5 h-3.5" />
                </button>
              </motion.div>
            );
          })}
        </div>

        <div className="space-y-5">
          <div className="rounded-xl overflow-hidden" style={SURFACE_STYLE}>
            <div className="px-5 py-4 border-b" style={{ borderColor: "var(--crm-border-faint)" }}>
              <h3 className="text-[14px] font-semibold" style={{ color: "var(--crm-text-strong)" }}>Agent Performance</h3>
              <p className="text-[12px] mt-0.5" style={{ color: "var(--crm-text-muted)" }}>This month</p>
            </div>
            {AGENTS.map((a, i) => (
              <motion.div key={a.name}
                className="px-5 py-3 border-b"
                style={{ borderColor: "var(--crm-border-faint)" }}
                initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
                <div className="flex items-center gap-2.5 mb-2">
                  <div className="w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-semibold text-white"
                    style={{ background: "linear-gradient(135deg,#ea580c,#dc2626)" }}>{a.name.charAt(0)}</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-medium truncate" style={{ color: "var(--crm-text-strong)" }}>{a.name}</p>
                    <p className="text-[10px]" style={{ color: "var(--crm-text-subtle)" }}>{a.region}</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div>
                    <p className="text-[14px] font-semibold" style={{ color: "var(--crm-text-strong)" }}>{a.visits}</p>
                    <p className="text-[10px]" style={{ color: "var(--crm-text-subtle)" }}>Visits</p>
                  </div>
                  <div>
                    <p className="text-[14px] font-semibold" style={{ color: "#5b5bd6" }}>{a.leads}</p>
                    <p className="text-[10px]" style={{ color: "var(--crm-text-subtle)" }}>Leads</p>
                  </div>
                  <div>
                    <p className="text-[14px] font-semibold" style={{ color: "var(--crm-success)" }}>{a.conversions}</p>
                    <p className="text-[10px]" style={{ color: "var(--crm-text-subtle)" }}>Conv.</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="rounded-xl p-5" style={SURFACE_STYLE}>
            <div className="flex items-start gap-3">
              <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" style={{ color: "var(--crm-warning)" }} />
              <div>
                <p className="text-[12px] font-semibold mb-1" style={{ color: "var(--crm-text)" }}>GPS Tracking</p>
                <p className="text-[11px] leading-relaxed" style={{ color: "var(--crm-text-muted)" }}>
                  GPS-ready architecture is enabled. Configure agent devices to enable live location tracking.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
