"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Plus, Search, CheckCircle, XCircle, Send, Eye, Trash2 } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";
import StatusBadge from "@/components/crm/shared/StatusBadge";
import PageHeader from "@/components/crm/shared/PageHeader";
import Modal from "@/components/crm/shared/Modal";
import type { Quotation } from "@/types/crm";

const SURFACE_STYLE = {
  background: "var(--crm-surface)",
  border: "1px solid var(--crm-border)",
  boxShadow: "var(--crm-shadow-sm)",
};

const MOCK: Quotation[] = Array.from({ length: 8 }, (_, i) => ({
  _id: String(i),
  quotationId: `NGQ25${String(i + 1).padStart(4, "0")}`,
  lead: String(i), leadName: `Client ${i + 1}`, leadEmail: `client${i + 1}@example.com`,
  leadPhone: `+91 9876${String(500000 + i).padStart(6, "0")}`,
  leadCompany: `Company ${i + 1}`,
  items: [{ _id: "1", description: "Web Development", quantity: 1, unitPrice: 150000, discount: 0, total: 150000 }],
  subtotal: 150000, discountAmount: 0, taxRate: 18, taxAmount: 27000, total: 177000,
  currency: "INR",
  status: (["draft","pending_approval","approved","sent","accepted","rejected","declined","pending_approval"] as const)[i % 8],
  validUntil: new Date(Date.now() + 30 * 86400000).toISOString(),
  terms: "50% advance payment required before project commencement.",
  notes: "", adminRemarks: "",
  createdBy: "tc_001",
  createdAt: new Date(Date.now() - i * 86400000).toISOString(),
  updatedAt: new Date().toISOString(),
}));

export default function QuotationsPage() {
  const [quotations, setQuotations] = useState<Quotation[]>([]);
  const [loading,    setLoading]    = useState(true);
  const [search,     setSearch]     = useState("");
  const [view,       setView]       = useState<Quotation | null>(null);
  const [remark,     setRemark]     = useState("");
  const [acting,     setActing]     = useState(false);

  const fetchQ = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/quotations");
      const data = await res.json();
      setQuotations(data.data?.length ? data.data : MOCK);
    } catch { setQuotations(MOCK); } finally { setLoading(false); }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchQ();
  }, [fetchQ]);

  const filtered = quotations.filter(
    (q) => !search || q.leadName.toLowerCase().includes(search.toLowerCase()) || q.quotationId.includes(search)
  );

  const doAction = async (id: string, action: string) => {
    setActing(true);
    try {
      const res = await fetch(`/api/quotations/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action, adminRemarks: remark }),
      });
      if (res.ok) { toast.success(`Quotation ${action}d successfully`); fetchQ(); setView(null); }
      else toast.error("Action failed");
    } catch { toast.error("Network error"); } finally { setActing(false); }
  };

  const deleteQ = async (id: string) => {
    if (!confirm("Delete this quotation?")) return;
    const res = await fetch(`/api/quotations/${id}`, { method: "DELETE" });
    if (res.ok) { toast.success("Deleted"); fetchQ(); }
  };

  const statusStats = [
    { label: "Pending Approval", count: quotations.filter(q => q.status === "pending_approval").length, color: "#d97706" },
    { label: "Approved",         count: quotations.filter(q => q.status === "approved").length,         color: "#16a34a" },
    { label: "Sent",             count: quotations.filter(q => q.status === "sent").length,             color: "#2563eb" },
    { label: "Accepted",         count: quotations.filter(q => q.status === "accepted").length,         color: "#10b981" },
  ];

  return (
    <div>
      <PageHeader
        title="Quotations"
        subtitle={`${filtered.length} quotations total`}
        badge="Quotes"
        badgeColor="#0891b2"
        actions={
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5" style={{ color: "var(--crm-text-faint)" }} />
              <input type="text" placeholder="Search…" value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 pr-3 py-2 rounded-lg text-[13px] outline-none w-52 transition-all"
                style={{ background: "var(--crm-surface)", border: "1px solid var(--crm-border)", color: "var(--crm-text)" }}
                onFocus={(e) => { e.currentTarget.style.borderColor = "var(--crm-primary)"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(91,91,214,0.10)"; }}
                onBlur={(e)  => { e.currentTarget.style.borderColor = "var(--crm-border)";  e.currentTarget.style.boxShadow = "none"; }}
              />
            </div>
            <Link
              href="/dashboard/quotations/new"
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-[13px] font-semibold text-white transition-all"
              style={{ background: "linear-gradient(135deg,#0891b2,#5b5bd6)", boxShadow: "0 1px 2px 0 rgba(8,145,178,0.25)" }}
            >
              <Plus className="w-4 h-4" /> New Quote
            </Link>
          </div>
        }
      />

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        {statusStats.map((stat, i) => (
          <motion.div key={stat.label} className="rounded-xl p-4" style={SURFACE_STYLE}
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
          >
            <p className="text-[22px] font-semibold mb-0.5" style={{ color: stat.color }}>{stat.count}</p>
            <p className="text-[12px]" style={{ color: "var(--crm-text-muted)" }}>{stat.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="rounded-xl overflow-hidden" style={SURFACE_STYLE}>
        <div className="grid grid-cols-[1fr_1.2fr_1fr_1fr_80px] gap-3 px-5 py-2.5 border-b text-[11px] tracking-wide uppercase font-medium"
          style={{ borderColor: "var(--crm-border-faint)", background: "var(--crm-surface-muted)", color: "var(--crm-text-subtle)" }}>
          <span>Quote ID / Client</span>
          <span>Contact</span>
          <span>Amount</span>
          <span>Status</span>
          <span className="text-right">Actions</span>
        </div>

        {loading ? (
          <div className="py-12 text-center text-[13px]" style={{ color: "var(--crm-text-muted)" }}>Loading…</div>
        ) : filtered.map((q, i) => (
          <motion.div
            key={q._id}
            className="grid grid-cols-[1fr_1.2fr_1fr_1fr_80px] gap-3 items-center px-5 py-3 border-b group transition-colors"
            style={{ borderColor: "var(--crm-border-faint)" }}
            initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "var(--crm-surface-hover)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
          >
            <div>
              <p className="text-[13px] font-mono" style={{ color: "var(--crm-text-strong)" }}>{q.quotationId}</p>
              <p className="text-[12px]" style={{ color: "var(--crm-text-muted)" }}>{q.leadName}</p>
            </div>
            <div>
              <p className="text-[12px]" style={{ color: "var(--crm-text)" }}>{q.leadEmail}</p>
              <p className="text-[11px]" style={{ color: "var(--crm-text-muted)" }}>{q.leadCompany}</p>
            </div>
            <div>
              <p className="text-[14px] font-semibold" style={{ color: "var(--crm-text-strong)" }}>₹{q.total.toLocaleString("en-IN")}</p>
              <p className="text-[11px]" style={{ color: "var(--crm-text-muted)" }}>Valid: {new Date(q.validUntil).toLocaleDateString()}</p>
            </div>
            <StatusBadge type="quotation" status={q.status} />
            <div className="flex items-center justify-end gap-1">
              <button onClick={() => { setView(q); setRemark(""); }}
                className="p-1.5 rounded-md transition-colors"
                style={{ color: "var(--crm-text-muted)" }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(91,91,214,0.10)"; e.currentTarget.style.color = "var(--crm-primary)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--crm-text-muted)"; }}
              >
                <Eye className="w-3.5 h-3.5" />
              </button>
              <button onClick={() => deleteQ(q._id)}
                className="p-1.5 rounded-md transition-colors"
                style={{ color: "var(--crm-text-muted)" }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(220,38,38,0.08)"; e.currentTarget.style.color = "var(--crm-danger)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--crm-text-muted)"; }}
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <Modal open={!!view} onClose={() => setView(null)} title={`Quotation ${view?.quotationId}`} subtitle={`For: ${view?.leadName}`} size="lg">
        {view && (
          <div className="space-y-5">
            <div className="rounded-lg overflow-hidden" style={{ border: "1px solid var(--crm-border)" }}>
              <div className="grid grid-cols-[2fr_1fr_1fr_1fr] text-[11px] font-medium uppercase tracking-wider px-4 py-2.5 border-b"
                style={{ borderColor: "var(--crm-border-faint)", background: "var(--crm-surface-muted)", color: "var(--crm-text-subtle)" }}>
                <span>Description</span><span>Qty</span><span>Unit Price</span><span className="text-right">Total</span>
              </div>
              {view.items.map((item) => (
                <div key={item._id} className="grid grid-cols-[2fr_1fr_1fr_1fr] px-4 py-2.5 text-[13px]">
                  <span style={{ color: "var(--crm-text)" }}>{item.description}</span>
                  <span style={{ color: "var(--crm-text-muted)" }}>{item.quantity}</span>
                  <span style={{ color: "var(--crm-text-muted)" }}>₹{item.unitPrice.toLocaleString("en-IN")}</span>
                  <span className="text-right font-medium" style={{ color: "var(--crm-text-strong)" }}>₹{item.total.toLocaleString("en-IN")}</span>
                </div>
              ))}
            </div>

            <div className="space-y-2 text-[13px]">
              <div className="flex justify-between"><span style={{ color: "var(--crm-text-muted)" }}>Subtotal</span><span style={{ color: "var(--crm-text)" }}>₹{view.subtotal.toLocaleString("en-IN")}</span></div>
              <div className="flex justify-between"><span style={{ color: "var(--crm-text-muted)" }}>GST ({view.taxRate}%)</span><span style={{ color: "var(--crm-text)" }}>₹{view.taxAmount.toLocaleString("en-IN")}</span></div>
              <div className="flex justify-between font-semibold text-[15px] pt-2 border-t" style={{ borderColor: "var(--crm-border)", color: "var(--crm-text-strong)" }}>
                <span>Total</span><span>₹{view.total.toLocaleString("en-IN")}</span>
              </div>
            </div>

            {view.status === "pending_approval" && (
              <div>
                <label className="text-[12px] font-medium block mb-1.5" style={{ color: "var(--crm-text)" }}>Admin Remarks (optional)</label>
                <textarea
                  value={remark} onChange={(e) => setRemark(e.target.value)}
                  rows={2} placeholder="Add remarks before approval/rejection…"
                  className="w-full px-3 py-2 rounded-lg text-[13px] outline-none resize-none"
                  style={{ background: "var(--crm-surface)", border: "1px solid var(--crm-border)", color: "var(--crm-text)" }}
                />
              </div>
            )}

            <div className="flex flex-wrap gap-2 pt-2">
              {view.status === "pending_approval" && (
                <>
                  <button onClick={() => doAction(view._id, "approve")} disabled={acting}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-[13px] font-semibold text-white"
                    style={{ background: "linear-gradient(135deg,#16a34a,#15803d)" }}>
                    <CheckCircle className="w-4 h-4" /> Approve
                  </button>
                  <button onClick={() => doAction(view._id, "reject")} disabled={acting}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-[13px] font-semibold text-white"
                    style={{ background: "linear-gradient(135deg,#dc2626,#b91c1c)" }}>
                    <XCircle className="w-4 h-4" /> Reject
                  </button>
                </>
              )}
              {view.status === "approved" && (
                <button onClick={() => doAction(view._id, "send")} disabled={acting}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-[13px] font-semibold text-white"
                  style={{ background: "linear-gradient(135deg,#5b5bd6,#0891b2)" }}>
                  <Send className="w-4 h-4" /> Send to Client (Email + PDF)
                </button>
              )}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
