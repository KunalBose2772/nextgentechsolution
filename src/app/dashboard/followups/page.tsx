"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Phone, Calendar, AlertCircle, Clock, CheckCircle2, User, Building, Trash2 } from "lucide-react";
import PageHeader from "@/components/crm/shared/PageHeader";
import StatusBadge from "@/components/crm/shared/StatusBadge";
import Modal from "@/components/crm/shared/Modal";
import toast from "react-hot-toast";
import type { Lead } from "@/types/crm";

const SURFACE_STYLE = {
  background: "var(--crm-surface)",
  border: "1px solid var(--crm-border)",
  boxShadow: "var(--crm-shadow-sm)",
};

export default function FollowUpsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Reschedule Modal State
  const [rescheduleLead, setRescheduleLead] = useState<Lead | null>(null);
  const [newDate, setNewDate] = useState("");
  const [newTime, setNewTime] = useState("10:00");
  const [saving, setSaving] = useState(false);

  // Done Modal / Call Logging State
  const [completingLead, setCompletingLead] = useState<Lead | null>(null);
  const [callOutcome, setCallOutcome] = useState("interested");
  const [callNotes, setCallNotes] = useState("");
  
  const fetchFollowups = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/leads?followUpOnly=true&limit=100");
      if (res.ok) {
        const data = await res.json();
        setLeads(data.data ?? []);
      } else {
        toast.error("Failed to load live follow-ups");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error connecting to server");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFollowups();
  }, [fetchFollowups]);

  // Group leads into Overdue/Today vs Upcoming
  const now = new Date();
  const todayStr = now.toISOString().split("T")[0];

  const overdueOrToday = leads.filter(lead => {
    if (!lead.followUpDate) return false;
    const fDate = new Date(lead.followUpDate).toISOString().split("T")[0];
    return fDate <= todayStr && !["converted", "lost", "closed"].includes(lead.status);
  });

  const upcoming = leads.filter(lead => {
    if (!lead.followUpDate) return false;
    const fDate = new Date(lead.followUpDate).toISOString().split("T")[0];
    return fDate > todayStr && !["converted", "lost", "closed"].includes(lead.status);
  });

  const handleOpenReschedule = (lead: Lead) => {
    setRescheduleLead(lead);
    if (lead.followUpDate) {
      const dt = new Date(lead.followUpDate);
      setNewDate(dt.toISOString().split("T")[0]);
      const hours = String(dt.getHours()).padStart(2, "0");
      const mins = String(dt.getMinutes()).padStart(2, "0");
      setNewTime(`${hours}:${mins}`);
    } else {
      setNewDate(todayStr);
      setNewTime("10:00");
    }
  };

  const handleSaveReschedule = async () => {
    if (!rescheduleLead || !newDate) return;
    setSaving(true);
    try {
      const combinedDateTime = new Date(`${newDate}T${newTime}:00`).toISOString();
      const res = await fetch(`/api/leads/${rescheduleLead._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          followUpDate: combinedDateTime,
          status: "follow_up"
        }),
      });

      if (res.ok) {
        toast.success(`Rescheduled ${rescheduleLead.name}`);
        setRescheduleLead(null);
        fetchFollowups();
      } else {
        toast.error("Could not update follow-up date");
      }
    } catch {
      toast.error("Network error");
    } finally {
      setSaving(false);
    }
  };

  const handleOpenComplete = (lead: Lead) => {
    setCompletingLead(lead);
    setCallOutcome("interested");
    setCallNotes("");
  };

  const handleSaveComplete = async () => {
    if (!completingLead) return;
    setSaving(true);
    try {
      // 1. Log the call outcome
      const callRes = await fetch(`/api/leads/${completingLead._id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "call",
          outcome: `Follow-up complete: ${callOutcome}`,
          duration: "2 min",
          notes: callNotes || "Follow-up mark as completed."
        }),
      });

      if (!callRes.ok) {
        toast.error("Could not log completed call outcome");
        setSaving(false);
        return;
      }

      // 2. Clear the follow_up_date and optionally change status
      const leadRes = await fetch(`/api/leads/${completingLead._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          followUpDate: null,
          status: callOutcome // 'interested', 'negotiation', 'converted', 'lost', etc.
        }),
      });

      if (leadRes.ok) {
        toast.success("Follow-up marked as completed");
        setCompletingLead(null);
        fetchFollowups();
      } else {
        toast.error("Failed to update lead status");
      }
    } catch {
      toast.error("Network error");
    } finally {
      setSaving(false);
    }
  };

  const formatFollowUpTime = (dateStr: string) => {
    const dt = new Date(dateStr);
    return dt.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true
    });
  };

  return (
    <div>
      <PageHeader 
        title="Follow-ups" 
        subtitle="Live scheduled calls and follow-up pipeline tasks" 
        badge="Live Dashboard" 
        badgeColor="#d97706" 
      />

      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: "Due Today / Overdue", count: overdueOrToday.length, color: "#d97706", icon: AlertCircle },
          { label: "Upcoming Schedule", count: upcoming.length, color: "#5b5bd6", icon: Clock },
          { label: "Total Pending Tasks", count: leads.length, color: "#7c3aed", icon: Calendar },
        ].map((s, i) => (
          <motion.div key={s.label} className="rounded-xl p-4 flex items-center gap-3"
            style={SURFACE_STYLE}
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: `${s.color}12`, color: s.color }}>
              <s.icon className="w-4 h-4" strokeWidth={1.9} />
            </div>
            <div>
              <p className="text-[20px] font-semibold leading-none" style={{ color: s.color }}>{s.count}</p>
              <p className="text-[11px] mt-1" style={{ color: "var(--crm-text-muted)" }}>{s.label}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {loading ? (
        <div className="py-16 text-center text-[13px]" style={{ color: "var(--crm-text-muted)" }}>Loading follow-ups…</div>
      ) : leads.length === 0 ? (
        <div className="py-16 text-center" style={SURFACE_STYLE}>
          <CheckCircle2 className="w-10 h-10 mx-auto mb-3 text-green-500" />
          <p className="text-[13px] font-medium" style={{ color: "var(--crm-text-strong)" }}>All caught up!</p>
          <p className="text-[11px]" style={{ color: "var(--crm-text-muted)" }}>No pending follow-ups scheduled.</p>
        </div>
      ) : (
        <>
          {overdueOrToday.length > 0 && (
            <div className="mb-6">
              <h3 className="text-[12px] font-bold uppercase tracking-wider mb-3 text-amber-600 flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5" /> Today / Overdue Follow-ups
              </h3>
              <div className="space-y-3">
                {overdueOrToday.map((f, i) => (
                  <motion.div key={f._id} className="rounded-xl p-4 transition-all"
                    style={SURFACE_STYLE}
                    initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}>
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-lg flex items-center justify-center text-[13px] font-semibold text-white shrink-0"
                        style={{ background: "linear-gradient(135deg,#eab308,#ea580c)" }}>{f.name.charAt(0)}</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="text-[14px] font-semibold truncate" style={{ color: "var(--crm-text-strong)" }}>{f.name}</p>
                          <StatusBadge type="priority" status={f.priority} />
                        </div>
                        <p className="text-[12px] mb-2" style={{ color: "var(--crm-text-muted)" }}>
                          {f.company ? `${f.company} · ` : ""}{f.phone}
                        </p>
                        {f.requirement && <p className="text-[12px] italic text-slate-500 line-clamp-2">“{f.requirement}”</p>}
                      </div>
                      <div className="text-right shrink-0">
                        <div className="flex items-center gap-1 text-[12px] font-semibold mb-1 text-amber-600">
                          <Clock className="w-3.5 h-3.5" /> {f.followUpDate ? formatFollowUpTime(f.followUpDate) : ""}
                        </div>
                        <StatusBadge type="lead" status={f.status} />
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 mt-4 pt-3 border-t" style={{ borderColor: "var(--crm-border-faint)" }}>
                      <a href={`tel:${f.phone}`} className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[11px] font-medium transition-colors"
                        style={{ color: "var(--crm-primary)", border: "1px solid rgba(91,91,214,0.25)", background: "rgba(91,91,214,0.06)" }}>
                        <Phone className="w-3 h-3" /> Call {f.phone}
                      </a>
                      <button onClick={() => handleOpenReschedule(f)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[11px] font-medium transition-colors"
                        style={{ color: "var(--crm-text-muted)", border: "1px solid var(--crm-border)", background: "var(--crm-surface)" }}>
                        <Calendar className="w-3 h-3" /> Reschedule
                      </button>
                      <button onClick={() => handleOpenComplete(f)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[11px] font-semibold transition-colors ml-auto"
                        style={{ color: "#16a34a", border: "1px solid rgba(22,163,74,0.25)", background: "rgba(22,163,74,0.06)" }}>
                        <CheckCircle2 className="w-3 h-3" /> Complete Task
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {upcoming.length > 0 && (
            <div className="mb-6">
              <h3 className="text-[12px] font-semibold uppercase tracking-wider mb-3 text-indigo-500 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" /> Upcoming Scheduled Tasks
              </h3>
              <div className="space-y-3">
                {upcoming.map((f, i) => (
                  <motion.div key={f._id} className="rounded-xl p-4 transition-all"
                    style={SURFACE_STYLE}
                    initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}>
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-lg flex items-center justify-center text-[13px] font-semibold text-white shrink-0"
                        style={{ background: "linear-gradient(135deg,#5b5bd6,#7c3aed)" }}>{f.name.charAt(0)}</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="text-[14px] font-semibold truncate" style={{ color: "var(--crm-text-strong)" }}>{f.name}</p>
                          <StatusBadge type="priority" status={f.priority} />
                        </div>
                        <p className="text-[12px] mb-2" style={{ color: "var(--crm-text-muted)" }}>
                          {f.company ? `${f.company} · ` : ""}{f.phone}
                        </p>
                        {f.requirement && <p className="text-[12px] italic text-slate-500 line-clamp-1">“{f.requirement}”</p>}
                      </div>
                      <div className="text-right shrink-0">
                        <div className="flex items-center gap-1 text-[12px] font-semibold mb-1" style={{ color: "var(--crm-text-muted)" }}>
                          <Clock className="w-3.5 h-3.5" /> {f.followUpDate ? formatFollowUpTime(f.followUpDate) : ""}
                        </div>
                        <StatusBadge type="lead" status={f.status} />
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 mt-4 pt-3 border-t" style={{ borderColor: "var(--crm-border-faint)" }}>
                      <a href={`tel:${f.phone}`} className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[11px] font-medium transition-colors"
                        style={{ color: "var(--crm-primary)", border: "1px solid rgba(91,91,214,0.25)", background: "rgba(91,91,214,0.06)" }}>
                        <Phone className="w-3 h-3" /> Call
                      </a>
                      <button onClick={() => handleOpenReschedule(f)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[11px] font-medium transition-colors"
                        style={{ color: "var(--crm-text-muted)", border: "1px solid var(--crm-border)", background: "var(--crm-surface)" }}>
                        <Calendar className="w-3 h-3" /> Reschedule
                      </button>
                      <button onClick={() => handleOpenComplete(f)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[11px] font-semibold transition-colors ml-auto"
                        style={{ color: "#16a34a", border: "1px solid rgba(22,163,74,0.25)", background: "rgba(22,163,74,0.06)" }}>
                        <CheckCircle2 className="w-3 h-3" /> Complete Task
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </>
      )}

      {/* Reschedule Modal */}
      <Modal
        open={!!rescheduleLead}
        onClose={() => setRescheduleLead(null)}
        title="Reschedule Follow-up"
        subtitle={rescheduleLead ? `Select new follow-up date and time for ${rescheduleLead.name}` : ""}
        size="md"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-[12px] font-medium mb-1.5" style={{ color: "var(--crm-text)" }}>Follow-up Date</label>
            <input
              type="date"
              value={newDate}
              onChange={(e) => setNewDate(e.target.value)}
              className="w-full px-3 py-2 rounded-lg text-[13px] outline-none"
              style={{ background: "var(--crm-surface)", border: "1px solid var(--crm-border)", color: "var(--crm-text)" }}
            />
          </div>

          <div>
            <label className="block text-[12px] font-medium mb-1.5" style={{ color: "var(--crm-text)" }}>Time</label>
            <input
              type="time"
              value={newTime}
              onChange={(e) => setNewTime(e.target.value)}
              className="w-full px-3 py-2 rounded-lg text-[13px] outline-none"
              style={{ background: "var(--crm-surface)", border: "1px solid var(--crm-border)", color: "var(--crm-text)" }}
            />
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 mt-6 pt-4 border-t" style={{ borderColor: "var(--crm-border-faint)" }}>
          <button
            onClick={() => setRescheduleLead(null)}
            className="px-4 py-2 rounded-lg text-[13px] font-medium transition-colors"
            style={{ background: "var(--crm-surface)", color: "var(--crm-text)", border: "1px solid var(--crm-border)" }}
          >
            Cancel
          </button>
          <button
            onClick={handleSaveReschedule}
            disabled={saving}
            className="px-4 py-2 rounded-lg text-[13px] font-semibold text-white flex items-center gap-2"
            style={{ background: "linear-gradient(135deg,#5b5bd6,#7c3aed)" }}
          >
            {saving ? "Saving..." : "Reschedule Call"}
          </button>
        </div>
      </Modal>

      {/* Done / Call Outcome Logging Modal */}
      <Modal
        open={!!completingLead}
        onClose={() => setCompletingLead(null)}
        title="Complete Follow-up Task"
        subtitle={completingLead ? `Log call result and update status for ${completingLead.name}` : ""}
        size="md"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-[12px] font-medium mb-1.5" style={{ color: "var(--crm-text)" }}>Select Lead Status Outcome</label>
            <select
              value={callOutcome}
              onChange={(e) => setCallOutcome(e.target.value)}
              className="w-full px-3 py-2 rounded-lg text-[13px] outline-none"
              style={{ background: "var(--crm-surface)", border: "1px solid var(--crm-border)", color: "var(--crm-text)" }}
            >
              <option value="interested">Interested (Keep Pipeline Active)</option>
              <option value="negotiation">Negotiation (Send Quotation)</option>
              <option value="converted">Converted (Won Deal!)</option>
              <option value="lost">Lost (Disqualified)</option>
              <option value="not_responding">Not Responding</option>
            </select>
          </div>

          <div>
            <label className="block text-[12px] font-medium mb-1.5" style={{ color: "var(--crm-text)" }}>Call Summary Notes</label>
            <textarea
              value={callNotes}
              onChange={(e) => setCallNotes(e.target.value)}
              placeholder="What was discussed during the follow-up?"
              rows={3}
              className="w-full px-3 py-2 rounded-lg text-[13px] outline-none resize-none"
              style={{ background: "var(--crm-surface)", border: "1px solid var(--crm-border)", color: "var(--crm-text)" }}
            />
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 mt-6 pt-4 border-t" style={{ borderColor: "var(--crm-border-faint)" }}>
          <button
            onClick={() => setCompletingLead(null)}
            className="px-4 py-2 rounded-lg text-[13px] font-medium transition-colors"
            style={{ background: "var(--crm-surface)", color: "var(--crm-text)", border: "1px solid var(--crm-border)" }}
          >
            Cancel
          </button>
          <button
            onClick={handleSaveComplete}
            disabled={saving}
            className="px-4 py-2 rounded-lg text-[13px] font-semibold text-white flex items-center gap-2"
            style={{ background: "linear-gradient(135deg,#16a34a,#15803d)" }}
          >
            {saving ? "Saving..." : "Log Outcome & Complete"}
          </button>
        </div>
      </Modal>
    </div>
  );
}
