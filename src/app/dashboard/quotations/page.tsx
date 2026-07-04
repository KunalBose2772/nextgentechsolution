"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import {
  Plus, Search, CheckCircle, XCircle, Send,
  Eye, Trash2, Download, FileText, Loader2,
} from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";
import StatusBadge from "@/components/crm/shared/StatusBadge";
import PageHeader from "@/components/crm/shared/PageHeader";
import Modal from "@/components/crm/shared/Modal";
import { useCRM } from "@/lib/crm-context";
import type { Quotation } from "@/types/crm";

const SURFACE_STYLE = {
  background: "var(--crm-surface)",
  border: "1px solid var(--crm-border)",
  boxShadow: "var(--crm-shadow-sm)",
};

export default function QuotationsPage() {
  const { user }   = useCRM();
  const isAdmin    = user?.role === "admin" || user?.role === "superadmin";
  const isTC       = user?.role === "telecaller";

  const [quotations, setQuotations] = useState<Quotation[]>([]);
  const [loading,    setLoading]    = useState(true);
  const [search,     setSearch]     = useState("");
  const [view,       setView]       = useState<Quotation | null>(null);
  const [remark,     setRemark]     = useState("");
  const [acting,     setActing]     = useState(false);
  const [downloading, setDownloading] = useState<string | null>(null); // tracks which quotation is downloading

  const fetchQ = useCallback(async () => {
    setLoading(true);
    try {
      const res  = await fetch("/api/quotations");
      const json = await res.json();
      setQuotations(json.data ?? []);
    } catch {
      toast.error("Failed to load quotations");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchQ(); }, [fetchQ]);

  const filtered = quotations.filter(
    (q) =>
      !search ||
      q.leadName.toLowerCase().includes(search.toLowerCase()) ||
      q.quotationId.toLowerCase().includes(search.toLowerCase()) ||
      q.leadEmail.toLowerCase().includes(search.toLowerCase())
  );

  // ── Download PDF ────────────────────────────────────────────────
  const downloadPDF = async (q: Quotation) => {
    setDownloading(q._id);
    try {
      const res = await fetch(`/api/quotations/${q._id}/pdf`);
      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: "Download failed" }));
        toast.error(err.error ?? "Download failed");
        return;
      }
      const blob = await res.blob();
      const url  = URL.createObjectURL(blob);
      const a    = document.createElement("a");
      a.href     = url;
      a.download = `${q.quotationId}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
      toast.success(`Downloaded ${q.quotationId}.pdf`);
    } catch {
      toast.error("Network error while downloading PDF");
    } finally {
      setDownloading(null);
    }
  };

  // ── Approve / Reject / Send actions (admin only) ────────────────
  const doAction = async (id: string, action: string) => {
    setActing(true);
    try {
      const res = await fetch(`/api/quotations/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action, adminRemarks: remark }),
      });
      if (res.ok) {
        toast.success(
          action === "approve" ? "Quotation approved!" :
          action === "reject"  ? "Quotation rejected." :
          "Quotation sent to client!"
        );
        fetchQ();
        setView(null);
      } else {
        const err = await res.json();
        toast.error(err.error ?? "Action failed");
      }
    } catch { toast.error("Network error"); } finally { setActing(false); }
  };

  const deleteQ = async (id: string) => {
    if (!confirm("Permanently delete this quotation?")) return;
    const res = await fetch(`/api/quotations/${id}`, { method: "DELETE" });
    if (res.ok) { toast.success("Deleted"); fetchQ(); }
    else toast.error("Delete failed");
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
        subtitle={`${filtered.length} quotation${filtered.length !== 1 ? "s" : ""} total`}
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
            <Link href="/dashboard/quotations/new"
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-[13px] font-semibold text-white transition-all"
              style={{ background: "linear-gradient(135deg,#0891b2,#5b5bd6)", boxShadow: "0 1px 2px 0 rgba(8,145,178,0.25)" }}>
              <Plus className="w-4 h-4" /> New Quote
            </Link>
          </div>
        }
      />

      {/* ── Stats ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        {statusStats.map((stat, i) => (
          <motion.div key={stat.label} className="rounded-xl p-4" style={SURFACE_STYLE}
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <p className="text-[22px] font-semibold mb-0.5" style={{ color: stat.color }}>{stat.count}</p>
            <p className="text-[12px]" style={{ color: "var(--crm-text-muted)" }}>{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* ── Table ── */}
      <div className="rounded-xl overflow-hidden" style={SURFACE_STYLE}>
        <div className="grid grid-cols-[1fr_1.2fr_1fr_1fr_120px] gap-3 px-5 py-2.5 border-b text-[11px] tracking-wide uppercase font-medium"
          style={{ borderColor: "var(--crm-border-faint)", background: "var(--crm-surface-muted)", color: "var(--crm-text-subtle)" }}>
          <span>Quote ID / Client</span>
          <span>Contact</span>
          <span>Amount</span>
          <span>Status</span>
          <span className="text-right">Actions</span>
        </div>

        {loading ? (
          <div className="py-16 flex flex-col items-center gap-3" style={{ color: "var(--crm-text-muted)" }}>
            <div className="w-7 h-7 rounded-full border-2 border-indigo-500/30 border-t-indigo-500 animate-spin" />
            <p className="text-[13px]">Loading quotations…</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-16 text-center" style={{ color: "var(--crm-text-muted)" }}>
            <FileText className="w-10 h-10 mx-auto mb-3 opacity-30" />
            <p className="text-[13px] font-medium">No quotations yet</p>
            <p className="text-[12px] mt-1 opacity-70">
              {isTC ? "Create a quotation for one of your assigned leads." : "Create the first quotation to get started."}
            </p>
          </div>
        ) : filtered.map((q, i) => (
          <motion.div key={q._id}
            className="grid grid-cols-[1fr_1.2fr_1fr_1fr_120px] gap-3 items-center px-5 py-3 border-b group transition-colors"
            style={{ borderColor: "var(--crm-border-faint)" }}
            initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "var(--crm-surface-hover)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}>

            <div>
              <p className="text-[13px] font-mono font-medium" style={{ color: "var(--crm-text-strong)" }}>{q.quotationId}</p>
              <p className="text-[12px]" style={{ color: "var(--crm-text-muted)" }}>{q.leadName}</p>
            </div>
            <div>
              <p className="text-[12px] truncate" style={{ color: "var(--crm-text)" }}>{q.leadEmail}</p>
              <p className="text-[11px]" style={{ color: "var(--crm-text-muted)" }}>{q.leadCompany}</p>
            </div>
            <div>
              <p className="text-[14px] font-semibold" style={{ color: "var(--crm-text-strong)" }}>
                ₹{Number(q.total).toLocaleString("en-IN")}
              </p>
              <p className="text-[11px]" style={{ color: "var(--crm-text-muted)" }}>
                Valid: {new Date(q.validUntil).toLocaleDateString("en-IN")}
              </p>
            </div>

            <StatusBadge type="quotation" status={q.status} />

            {/* Actions */}
            <div className="flex items-center justify-end gap-1">
              {/* View */}
              <button onClick={() => { setView(q); setRemark(""); }}
                title="View details"
                className="p-1.5 rounded-md transition-colors cursor-pointer"
                style={{ color: "var(--crm-text-muted)" }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(91,91,214,0.10)"; e.currentTarget.style.color = "var(--crm-primary)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--crm-text-muted)"; }}>
                <Eye className="w-3.5 h-3.5" />
              </button>

              {/* Download PDF */}
              <button
                onClick={() => downloadPDF(q)}
                disabled={downloading === q._id}
                title="Download PDF"
                className="p-1.5 rounded-md transition-colors cursor-pointer disabled:opacity-50"
                style={{ color: "var(--crm-text-muted)" }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(16,185,129,0.10)"; e.currentTarget.style.color = "#10b981"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--crm-text-muted)"; }}>
                {downloading === q._id
                  ? <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  : <Download className="w-3.5 h-3.5" />
                }
              </button>

              {/* Delete (admin only) */}
              {isAdmin && (
                <button onClick={() => deleteQ(q._id)}
                  title="Delete quotation"
                  className="p-1.5 rounded-md transition-colors cursor-pointer"
                  style={{ color: "var(--crm-text-muted)" }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(220,38,38,0.08)"; e.currentTarget.style.color = "var(--crm-danger)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--crm-text-muted)"; }}>
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* ── View / Action Modal ── */}
      <Modal open={!!view} onClose={() => setView(null)}
        title={`Quotation ${view?.quotationId}`}
        subtitle={`For: ${view?.leadName} · ${view?.leadEmail}`}
        size="lg">
        {view && (
          <div className="space-y-5">
            {/* Client info */}
            <div className="grid sm:grid-cols-3 gap-3 text-[12px] p-3 rounded-lg" style={{ background: "var(--crm-surface-muted)", border: "1px solid var(--crm-border-faint)" }}>
              <div><p className="text-[10px] uppercase tracking-wider mb-0.5" style={{ color: "var(--crm-text-subtle)" }}>Client</p><p style={{ color: "var(--crm-text-strong)" }}>{view.leadName}</p></div>
              <div><p className="text-[10px] uppercase tracking-wider mb-0.5" style={{ color: "var(--crm-text-subtle)" }}>Email</p><p style={{ color: "var(--crm-text)" }}>{view.leadEmail}</p></div>
              <div><p className="text-[10px] uppercase tracking-wider mb-0.5" style={{ color: "var(--crm-text-subtle)" }}>Phone</p><p style={{ color: "var(--crm-text)" }}>{view.leadPhone}</p></div>
            </div>

            {/* Items table */}
            <div className="rounded-lg overflow-hidden" style={{ border: "1px solid var(--crm-border)" }}>
              <div className="grid grid-cols-[2fr_1fr_1fr_1fr] text-[11px] font-medium uppercase tracking-wider px-4 py-2.5 border-b"
                style={{ borderColor: "var(--crm-border-faint)", background: "var(--crm-surface-muted)", color: "var(--crm-text-subtle)" }}>
                <span>Description</span><span>Qty</span><span>Unit Price</span><span className="text-right">Total</span>
              </div>
              {view.items.map((item, idx) => (
                <div key={item._id ?? idx} className="grid grid-cols-[2fr_1fr_1fr_1fr] px-4 py-2.5 text-[13px] border-b last:border-0"
                  style={{ borderColor: "var(--crm-border-faint)" }}>
                  <span style={{ color: "var(--crm-text)" }}>{item.description}</span>
                  <span style={{ color: "var(--crm-text-muted)" }}>{item.quantity}</span>
                  <span style={{ color: "var(--crm-text-muted)" }}>₹{Number(item.unitPrice).toLocaleString("en-IN")}</span>
                  <span className="text-right font-medium" style={{ color: "var(--crm-text-strong)" }}>₹{Number(item.total).toLocaleString("en-IN")}</span>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div className="space-y-2 text-[13px]">
              <div className="flex justify-between"><span style={{ color: "var(--crm-text-muted)" }}>Subtotal</span><span style={{ color: "var(--crm-text)" }}>₹{Number(view.subtotal).toLocaleString("en-IN")}</span></div>
              {Number(view.discountAmount) > 0 && (
                <div className="flex justify-between"><span style={{ color: "var(--crm-text-muted)" }}>Discount</span><span className="text-red-500">-₹{Number(view.discountAmount).toLocaleString("en-IN")}</span></div>
              )}
              <div className="flex justify-between"><span style={{ color: "var(--crm-text-muted)" }}>GST ({view.taxRate}%)</span><span style={{ color: "var(--crm-text)" }}>₹{Number(view.taxAmount).toLocaleString("en-IN")}</span></div>
              <div className="flex justify-between font-semibold text-[15px] pt-2 border-t" style={{ borderColor: "var(--crm-border)", color: "var(--crm-text-strong)" }}>
                <span>Total</span><span>₹{Number(view.total).toLocaleString("en-IN")}</span>
              </div>
            </div>

            {/* Admin remarks textarea for pending approval */}
            {view.status === "pending_approval" && isAdmin && (
              <div>
                <label className="text-[12px] font-medium block mb-1.5" style={{ color: "var(--crm-text)" }}>Admin Remarks (optional)</label>
                <textarea value={remark} onChange={(e) => setRemark(e.target.value)} rows={2}
                  placeholder="Add remarks before approval/rejection…"
                  className="w-full px-3 py-2 rounded-lg text-[13px] outline-none resize-none"
                  style={{ background: "var(--crm-surface)", border: "1px solid var(--crm-border)", color: "var(--crm-text)" }} />
              </div>
            )}

            {/* Action buttons */}
            <div className="flex flex-wrap gap-2 pt-2 border-t" style={{ borderColor: "var(--crm-border-faint)" }}>
              {/* Download PDF — available to ALL roles */}
              <button
                onClick={() => downloadPDF(view)}
                disabled={downloading === view._id}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-[13px] font-semibold cursor-pointer disabled:opacity-50"
                style={{ background: "rgba(16,185,129,0.10)", color: "#059669", border: "1px solid rgba(16,185,129,0.25)" }}>
                {downloading === view._id
                  ? <Loader2 className="w-4 h-4 animate-spin" />
                  : <Download className="w-4 h-4" />
                }
                Download PDF
              </button>

              {/* Admin-only workflow actions */}
              {isAdmin && view.status === "pending_approval" && (
                <>
                  <button onClick={() => doAction(view._id, "approve")} disabled={acting}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-[13px] font-semibold text-white cursor-pointer disabled:opacity-50"
                    style={{ background: "linear-gradient(135deg,#16a34a,#15803d)" }}>
                    <CheckCircle className="w-4 h-4" /> Approve
                  </button>
                  <button onClick={() => doAction(view._id, "reject")} disabled={acting}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-[13px] font-semibold text-white cursor-pointer disabled:opacity-50"
                    style={{ background: "linear-gradient(135deg,#dc2626,#b91c1c)" }}>
                    <XCircle className="w-4 h-4" /> Reject
                  </button>
                </>
              )}
              {isAdmin && view.status === "approved" && (
                <button onClick={() => doAction(view._id, "send")} disabled={acting}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-[13px] font-semibold text-white cursor-pointer disabled:opacity-50"
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
