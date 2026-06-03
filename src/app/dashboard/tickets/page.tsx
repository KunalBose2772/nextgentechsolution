"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Plus, Search, MessageSquare, X, CheckCircle } from "lucide-react";
import toast from "react-hot-toast";
import StatusBadge from "@/components/crm/shared/StatusBadge";
import PageHeader from "@/components/crm/shared/PageHeader";
import Modal from "@/components/crm/shared/Modal";
import type { Ticket, TicketStatus, TicketPriority, TicketCategory } from "@/types/crm";

const SURFACE_STYLE = {
  background: "var(--crm-surface)",
  border: "1px solid var(--crm-border)",
  boxShadow: "var(--crm-shadow-sm)",
};

const MOCK_TICKETS: Ticket[] = Array.from({ length: 8 }, (_, i) => ({
  _id: String(i), ticketId: `NGT${String(i + 1).padStart(5, "0")}`,
  title: ["Website bug on checkout","Invoice not received","Need ERP customization","API integration help",
          "Mobile app crash","SEO report request","Server downtime issue","Feature request: dark mode"][i],
  description: "Detailed description of the issue…",
  status: (["open","in_progress","on_hold","resolved","closed","open","in_progress","open"] as TicketStatus[])[i],
  priority: (["high","medium","critical","medium","high","low","critical","medium"] as TicketPriority[])[i],
  category: (["technical","billing","technical","technical","technical","sales","technical","feature_request"] as TicketCategory[])[i],
  assignedTo: i % 2 === 0 ? "adm_001" : "tc_001",
  createdBy: "tc_001", comments: [], tags: [],
  createdAt: new Date(Date.now() - i * 86400000).toISOString(),
  updatedAt: new Date().toISOString(),
}));

const CATEGORIES: TicketCategory[] = ["technical","billing","sales","general","bug","feature_request","escalation"];

export default function TicketsPage() {
  const [tickets,   setTickets]   = useState<Ticket[]>([]);
  const [loading,   setLoading]   = useState(true);
  const [search,    setSearch]    = useState("");
  const [showModal, setShowModal] = useState(false);
  const [view,      setView]      = useState<Ticket | null>(null);
  const [comment,   setComment]   = useState("");
  const [form,      setForm]      = useState({ title: "", description: "", priority: "medium" as TicketPriority, category: "general" as TicketCategory });
  const [saving,    setSaving]    = useState(false);

  const fetchTickets = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/tickets");
      const data = await res.json();
      setTickets(data.data?.length ? data.data : MOCK_TICKETS);
    } catch { setTickets(MOCK_TICKETS); } finally { setLoading(false); }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchTickets();
  }, [fetchTickets]);

  const filtered = tickets.filter((t) => !search || t.title.toLowerCase().includes(search.toLowerCase()) || t.ticketId.includes(search));

  const handleCreate = async () => {
    if (!form.title || !form.description) { toast.error("Title and description required"); return; }
    setSaving(true);
    try {
      const res = await fetch("/api/tickets", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      if (res.ok) { toast.success("Ticket created!"); setShowModal(false); fetchTickets(); }
      else toast.error("Failed");
    } catch { toast.error("Network error"); } finally { setSaving(false); }
  };

  const updateStatus = async (id: string, status: string) => {
    const res = await fetch(`/api/tickets/${id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status }) });
    if (res.ok) { toast.success("Status updated"); fetchTickets(); setView(v => v ? { ...v, status: status as TicketStatus } : null); }
  };

  const addComment = async () => {
    if (!comment.trim() || !view) return;
    const res = await fetch(`/api/tickets/${view._id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ type: "comment", content: comment }) });
    if (res.ok) { toast.success("Comment added"); setComment(""); fetchTickets(); }
  };

  return (
    <div>
      <PageHeader
        title="Tickets"
        subtitle={`${filtered.length} total tickets`}
        badge="Support"
        badgeColor="#ec4899"
        actions={
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5" style={{ color: "var(--crm-text-faint)" }} />
              <input type="text" placeholder="Search…" value={search} onChange={(e) => setSearch(e.target.value)}
                className="pl-9 pr-8 py-2 rounded-lg text-[13px] outline-none w-52 transition-all"
                style={{ background: "var(--crm-surface)", border: "1px solid var(--crm-border)", color: "var(--crm-text)" }}
                onFocus={(e) => { e.currentTarget.style.borderColor = "var(--crm-primary)"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(91,91,214,0.10)"; }}
                onBlur={(e)  => { e.currentTarget.style.borderColor = "var(--crm-border)";  e.currentTarget.style.boxShadow = "none"; }}
              />
              {search && <button onClick={() => setSearch("")} className="absolute right-2.5 top-1/2 -translate-y-1/2" style={{ color: "var(--crm-text-faint)" }}><X className="w-3.5 h-3.5" /></button>}
            </div>
            <button onClick={() => setShowModal(true)} className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-[13px] font-semibold text-white transition-all"
              style={{ background: "linear-gradient(135deg,#ec4899,#7c3aed)", boxShadow: "0 1px 2px 0 rgba(236,72,153,0.25)" }}>
              <Plus className="w-4 h-4" /> New Ticket
            </button>
          </div>
        }
      />

      {/* Status pills */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-6">
        {(["open","in_progress","on_hold","resolved","closed"] as TicketStatus[]).map((s) => {
          const count = tickets.filter(t => t.status === s).length;
          const colors: Record<string, string> = { open: "#2563eb", in_progress: "#d97706", on_hold: "#6b7280", resolved: "#16a34a", closed: "#475569" };
          return (
            <div key={s} className="rounded-xl p-3 flex items-center justify-between" style={SURFACE_STYLE}>
              <span className="text-[11px] capitalize" style={{ color: "var(--crm-text-muted)" }}>{s.replace("_"," ")}</span>
              <span className="text-[18px] font-semibold" style={{ color: colors[s] }}>{count}</span>
            </div>
          );
        })}
      </div>

      <div className="rounded-xl overflow-hidden" style={SURFACE_STYLE}>
        <div className="grid grid-cols-[1fr_1fr_1fr_1fr_80px] gap-3 px-5 py-2.5 border-b text-[11px] uppercase tracking-wider font-medium"
          style={{ borderColor: "var(--crm-border-faint)", background: "var(--crm-surface-muted)", color: "var(--crm-text-subtle)" }}>
          <span>Ticket</span><span>Priority</span><span>Category</span><span>Status</span><span className="text-right">Action</span>
        </div>
        {loading ? (
          <div className="py-12 text-center text-[13px]" style={{ color: "var(--crm-text-muted)" }}>Loading…</div>
        ) : filtered.map((t, i) => (
          <motion.div key={t._id}
            className="grid grid-cols-[1fr_1fr_1fr_1fr_80px] gap-3 items-center px-5 py-3 border-b cursor-pointer transition-colors"
            style={{ borderColor: "var(--crm-border-faint)" }}
            initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}
            onClick={() => setView(t)}
            onMouseEnter={(e) => { e.currentTarget.style.background = "var(--crm-surface-hover)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
          >
            <div>
              <p className="text-[13px] font-medium truncate" style={{ color: "var(--crm-text-strong)" }}>{t.title}</p>
              <p className="text-[11px] font-mono" style={{ color: "var(--crm-text-muted)" }}>{t.ticketId}</p>
            </div>
            <StatusBadge type="priority" status={t.priority} />
            <span className="text-[12px] capitalize" style={{ color: "var(--crm-text-muted)" }}>{t.category.replace("_"," ")}</span>
            <StatusBadge type="ticket" status={t.status} />
            <div className="flex justify-end" onClick={(e) => e.stopPropagation()}>
              <button onClick={() => updateStatus(t._id, t.status === "open" ? "in_progress" : "resolved")}
                className="p-1.5 rounded-md transition-colors"
                style={{ color: "var(--crm-text-muted)" }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(22,163,74,0.10)"; e.currentTarget.style.color = "var(--crm-success)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--crm-text-muted)"; }}>
                <CheckCircle className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Create modal */}
      <Modal open={showModal} onClose={() => setShowModal(false)} title="Create New Ticket" size="md">
        <div className="space-y-4">
          <div className="space-y-1">
            <label className="text-[12px] font-medium" style={{ color: "var(--crm-text)" }}>Title</label>
            <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Brief issue summary"
              className="w-full px-3 py-2 rounded-lg text-[13px] outline-none"
              style={{ background: "var(--crm-surface)", border: "1px solid var(--crm-border)", color: "var(--crm-text)" }} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-[12px] font-medium" style={{ color: "var(--crm-text)" }}>Priority</label>
              <select value={form.priority} onChange={(e) => setForm({ ...form, priority: e.target.value as TicketPriority })}
                className="w-full px-3 py-2 rounded-lg text-[13px] outline-none appearance-none"
                style={{ background: "var(--crm-surface)", border: "1px solid var(--crm-border)", color: "var(--crm-text)" }}>
                {["low","medium","high","critical"].map(p => <option key={p} value={p}>{p.charAt(0).toUpperCase() + p.slice(1)}</option>)}
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-[12px] font-medium" style={{ color: "var(--crm-text)" }}>Category</label>
              <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value as TicketCategory })}
                className="w-full px-3 py-2 rounded-lg text-[13px] outline-none appearance-none"
                style={{ background: "var(--crm-surface)", border: "1px solid var(--crm-border)", color: "var(--crm-text)" }}>
                {CATEGORIES.map(c => <option key={c} value={c}>{c.replace("_"," ").replace(/\b\w/g, x => x.toUpperCase())}</option>)}
              </select>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-[12px] font-medium" style={{ color: "var(--crm-text)" }}>Description</label>
            <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={4} placeholder="Describe the issue in detail…"
              className="w-full px-3 py-2 rounded-lg text-[13px] outline-none resize-none"
              style={{ background: "var(--crm-surface)", border: "1px solid var(--crm-border)", color: "var(--crm-text)" }} />
          </div>
          <div className="flex justify-end gap-2 pt-2 border-t" style={{ borderColor: "var(--crm-border-faint)" }}>
            <button onClick={() => setShowModal(false)} className="px-4 py-2 rounded-lg text-[13px] font-medium transition-colors"
              style={{ background: "var(--crm-surface)", color: "var(--crm-text)", border: "1px solid var(--crm-border)" }}>
              Cancel
            </button>
            <button onClick={handleCreate} disabled={saving} className="flex items-center gap-2 px-4 py-2 rounded-lg text-[13px] font-semibold text-white"
              style={{ background: "linear-gradient(135deg,#ec4899,#7c3aed)" }}>
              {saving ? <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Plus className="w-3.5 h-3.5" />}
              Create Ticket
            </button>
          </div>
        </div>
      </Modal>

      {/* Detail modal */}
      <Modal open={!!view} onClose={() => setView(null)} title={view?.title ?? ""} subtitle={view?.ticketId} size="lg">
        {view && (
          <div className="space-y-5">
            <div className="flex flex-wrap gap-2">
              <StatusBadge type="ticket" status={view.status} size="md" />
              <StatusBadge type="priority" status={view.priority} size="md" />
              <span className="text-[12px] px-2 py-1 rounded-md capitalize"
                style={{ color: "var(--crm-text-muted)", background: "var(--crm-surface-muted)", border: "1px solid var(--crm-border-faint)" }}>
                {view.category.replace("_"," ")}
              </span>
            </div>
            <p className="text-[13px] leading-relaxed" style={{ color: "var(--crm-text)" }}>{view.description}</p>

            <div className="flex flex-wrap gap-1.5">
              {(["open","in_progress","on_hold","resolved","closed"] as TicketStatus[]).map(s => {
                const active = view.status === s;
                return (
                  <button key={s} onClick={() => updateStatus(view._id, s)}
                    className="px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors"
                    style={active
                      ? { background: "rgba(91,91,214,0.10)", color: "var(--crm-primary)", border: "1px solid rgba(91,91,214,0.25)" }
                      : { background: "var(--crm-surface)", color: "var(--crm-text-muted)", border: "1px solid var(--crm-border)" }
                    }>
                    {s.replace("_"," ").replace(/\b\w/g, c => c.toUpperCase())}
                  </button>
                );
              })}
            </div>

            <div className="flex gap-2">
              <input value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Add a comment…"
                className="flex-1 px-3 py-2 rounded-lg text-[13px] outline-none"
                style={{ background: "var(--crm-surface)", border: "1px solid var(--crm-border)", color: "var(--crm-text)" }} />
              <button onClick={addComment} className="px-4 py-2 rounded-lg text-[13px] font-semibold text-white shrink-0"
                style={{ background: "linear-gradient(135deg,#ec4899,#7c3aed)" }}>
                <MessageSquare className="w-4 h-4" />
              </button>
            </div>

            {view.comments?.length > 0 && (
              <div className="space-y-2">
                {view.comments.map((c) => (
                  <div key={c._id} className="p-3 rounded-lg" style={{ background: "var(--crm-surface-muted)", border: "1px solid var(--crm-border-faint)" }}>
                    <p className="text-[13px]" style={{ color: "var(--crm-text)" }}>{c.content}</p>
                    <p className="text-[10px] mt-1" style={{ color: "var(--crm-text-subtle)" }}>{c.createdByName}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
}
