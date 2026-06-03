"use client";

import { motion } from "framer-motion";
import { Calendar, DollarSign, Users, Plus } from "lucide-react";
import PageHeader from "@/components/crm/shared/PageHeader";

const SURFACE_STYLE = {
  background: "var(--crm-surface)",
  border: "1px solid var(--crm-border)",
  boxShadow: "var(--crm-shadow-sm)",
};

const PROJECTS = [
  { id: "1", name: "E-Commerce Platform", client: "RetailMax Pvt Ltd", status: "active",    value: 850000, progress: 65, team: 4, deadline: "Jul 15, 2025", tech: ["Next.js","Node.js","MongoDB"] },
  { id: "2", name: "CRM System",           client: "FinTech Corp",      status: "active",    value: 1200000,progress: 40, team: 5, deadline: "Aug 30, 2025", tech: ["React","Django","PostgreSQL"] },
  { id: "3", name: "Mobile Banking App",   client: "PaySecure",         status: "planning",  value: 2000000,progress: 10, team: 6, deadline: "Oct 1, 2025",  tech: ["Flutter","AWS"] },
  { id: "4", name: "Healthcare Portal",    client: "MediCare Hospitals", status: "completed", value: 650000, progress: 100,team: 3, deadline: "Mar 20, 2025", tech: ["React","Node.js"] },
  { id: "5", name: "Logistics Dashboard",  client: "QuickShip India",   status: "on_hold",   value: 480000, progress: 55, team: 3, deadline: "Sep 10, 2025", tech: ["Next.js","Python"] },
  { id: "6", name: "EdTech Platform",      client: "LearnFast",         status: "active",    value: 950000, progress: 80, team: 4, deadline: "Jun 30, 2025", tech: ["React","Django"] },
];

const STATUS_STYLE: Record<string, { color: string; label: string }> = {
  active:    { color: "#16a34a", label: "Active" },
  planning:  { color: "#5b5bd6", label: "Planning" },
  on_hold:   { color: "#d97706", label: "On Hold" },
  completed: { color: "#64748b", label: "Completed" },
};

export default function ProjectsPage() {
  return (
    <div>
      <PageHeader
        title="Projects"
        subtitle="Track active, planned, and completed projects"
        badge="Projects"
        badgeColor="#7c3aed"
        actions={
          <button className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-[13px] font-semibold text-white transition-all"
            style={{ background: "linear-gradient(135deg,#7c3aed,#ec4899)", boxShadow: "0 1px 2px 0 rgba(124,58,237,0.25)" }}>
            <Plus className="w-4 h-4" /> New Project
          </button>
        }
      />

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Active",    count: PROJECTS.filter(p => p.status === "active").length,    color: "#16a34a" },
          { label: "Planning",  count: PROJECTS.filter(p => p.status === "planning").length,  color: "#5b5bd6" },
          { label: "On Hold",   count: PROJECTS.filter(p => p.status === "on_hold").length,   color: "#d97706" },
          { label: "Completed", count: PROJECTS.filter(p => p.status === "completed").length, color: "#64748b" },
        ].map((s, i) => (
          <motion.div key={s.label} className="rounded-xl p-4" style={SURFACE_STYLE}
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <p className="text-[22px] font-semibold" style={{ color: s.color }}>{s.count}</p>
            <p className="text-[11px]" style={{ color: "var(--crm-text-muted)" }}>{s.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {PROJECTS.map((project, i) => {
          const style = STATUS_STYLE[project.status];
          return (
            <motion.div key={project.id} className="rounded-xl p-5 transition-all cursor-pointer"
              style={SURFACE_STYLE}
              initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05 }}
              whileHover={{ y: -1, boxShadow: "0 4px 12px -2px rgb(16 24 40 / 0.08)" }}>
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-[14px] font-semibold mb-0.5" style={{ color: "var(--crm-text-strong)" }}>{project.name}</p>
                  <p className="text-[12px]" style={{ color: "var(--crm-text-muted)" }}>{project.client}</p>
                </div>
                <span className="text-[11px] font-medium px-2 py-0.5 rounded-md"
                  style={{ color: style.color, background: `${style.color}12`, border: `1px solid ${style.color}22` }}>
                  {style.label}
                </span>
              </div>

              <div className="mb-4">
                <div className="flex justify-between mb-1.5">
                  <span className="text-[11px]" style={{ color: "var(--crm-text-subtle)" }}>Progress</span>
                  <span className="text-[11px] font-semibold" style={{ color: "var(--crm-text)" }}>{project.progress}%</span>
                </div>
                <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "var(--crm-surface-muted)" }}>
                  <motion.div className="h-full rounded-full"
                    style={{ background: `linear-gradient(90deg,${style.color}90,${style.color})` }}
                    initial={{ width: 0 }} animate={{ width: `${project.progress}%` }} transition={{ delay: i * 0.05 + 0.2, duration: 0.7, ease: "easeOut" }} />
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] mb-3" style={{ color: "var(--crm-text-muted)" }}>
                <span className="flex items-center gap-1"><DollarSign className="w-3 h-3" />₹{(project.value / 100000).toFixed(1)}L</span>
                <span className="flex items-center gap-1"><Users className="w-3 h-3" />{project.team}</span>
                <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{project.deadline}</span>
              </div>

              <div className="flex flex-wrap gap-1">
                {project.tech.map(t => (
                  <span key={t} className="text-[10px] px-2 py-0.5 rounded-md"
                    style={{ background: "var(--crm-surface-muted)", color: "var(--crm-text-muted)", border: "1px solid var(--crm-border-faint)" }}>{t}</span>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
