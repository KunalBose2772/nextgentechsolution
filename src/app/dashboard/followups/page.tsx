"use client";

import { motion } from "framer-motion";
import { Phone, Calendar, AlertCircle, Clock, CheckCircle2 } from "lucide-react";
import PageHeader from "@/components/crm/shared/PageHeader";
import StatusBadge from "@/components/crm/shared/StatusBadge";

const SURFACE_STYLE = {
  background: "var(--crm-surface)",
  border: "1px solid var(--crm-border)",
  boxShadow: "var(--crm-shadow-sm)",
};

const FOLLOWUPS = [
  { id: "1", name: "Rahul Mehta",   company: "Mehta Enterprises", time: "10:30 AM", date: "Today",    status: "follow_up", priority: "high",   phone: "+91 9876543210", note: "Discuss SaaS pricing" },
  { id: "2", name: "Priya Sharma",  company: "Kapoor Tech",       time: "2:00 PM",  date: "Today",    status: "interested",priority: "urgent",  phone: "+91 9876543211", note: "Follow up on web dev quote" },
  { id: "3", name: "Arjun Singh",   company: "Singh & Co",        time: "4:00 PM",  date: "Today",    status: "follow_up", priority: "medium",  phone: "+91 9876543212", note: "Demo call scheduled" },
  { id: "4", name: "Divya Kapoor",  company: "Digital Pro",       time: "11:00 AM", date: "Tomorrow", status: "new",       priority: "medium",  phone: "+91 9876543213", note: "Initial discussion" },
  { id: "5", name: "Karan Singh",   company: "KM Solutions",      time: "3:30 PM",  date: "Tomorrow", status: "interested",priority: "high",    phone: "+91 9876543214", note: "Send final proposal" },
];

export default function FollowUpsPage() {
  const today = FOLLOWUPS.filter(f => f.date === "Today");
  const tomorrow = FOLLOWUPS.filter(f => f.date === "Tomorrow");

  return (
    <div>
      <PageHeader title="Follow-ups" subtitle="Today's scheduled calls and follow-up tasks" badge="Today" badgeColor="#d97706" />

      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: "Due Today",    count: today.length,    color: "#d97706", icon: AlertCircle },
          { label: "Due Tomorrow", count: tomorrow.length, color: "#5b5bd6", icon: Clock },
          { label: "Completed",    count: 8,               color: "#16a34a", icon: CheckCircle2 },
        ].map((s, i) => (
          <motion.div key={s.label} className="rounded-xl p-4 flex items-center gap-3"
            style={SURFACE_STYLE}
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: `${s.color}12`, color: s.color }}>
              <s.icon className="w-4 h-4" strokeWidth={1.9} />
            </div>
            <div>
              <p className="text-[20px] font-semibold leading-none" style={{ color: s.color }}>{s.count}</p>
              <p className="text-[11px]" style={{ color: "var(--crm-text-muted)" }}>{s.label}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {[{ title: "Today's Follow-ups", items: today }, { title: "Tomorrow", items: tomorrow }].map((section) => (
        section.items.length > 0 && (
          <div key={section.title} className="mb-6">
            <h3 className="text-[12px] font-semibold uppercase tracking-wider mb-3" style={{ color: "var(--crm-text-faint)" }}>{section.title}</h3>
            <div className="space-y-3">
              {section.items.map((f, i) => (
                <motion.div key={f.id} className="rounded-xl p-4 transition-all"
                  style={SURFACE_STYLE}
                  initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}>
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center text-[13px] font-semibold text-white shrink-0"
                      style={{ background: "linear-gradient(135deg,#5b5bd6,#7c3aed)" }}>{f.name.charAt(0)}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="text-[14px] font-semibold" style={{ color: "var(--crm-text-strong)" }}>{f.name}</p>
                        <StatusBadge type="priority" status={f.priority} />
                      </div>
                      <p className="text-[12px] mb-2" style={{ color: "var(--crm-text-muted)" }}>{f.company} · {f.phone}</p>
                      <p className="text-[12px] italic" style={{ color: "var(--crm-text)" }}>{f.note}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="flex items-center gap-1 text-[13px] font-semibold mb-1" style={{ color: "var(--crm-warning)" }}>
                        <Clock className="w-3.5 h-3.5" /> {f.time}
                      </div>
                      <StatusBadge type="lead" status={f.status as "follow_up"} />
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-3 pt-3 border-t" style={{ borderColor: "var(--crm-border-faint)" }}>
                    <button className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-[11px] font-medium transition-colors"
                      style={{ color: "var(--crm-success)", border: "1px solid rgba(22,163,74,0.25)", background: "rgba(22,163,74,0.06)" }}>
                      <Phone className="w-3 h-3" /> Call Now
                    </button>
                    <button className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-[11px] font-medium transition-colors"
                      style={{ color: "var(--crm-primary)", border: "1px solid rgba(91,91,214,0.25)", background: "rgba(91,91,214,0.06)" }}>
                      <Calendar className="w-3 h-3" /> Reschedule
                    </button>
                    <button className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-[11px] font-medium transition-colors ml-auto"
                      style={{ color: "#16a34a", border: "1px solid rgba(22,163,74,0.25)", background: "rgba(22,163,74,0.06)" }}>
                      <CheckCircle2 className="w-3 h-3" /> Done
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )
      ))}
    </div>
  );
}
