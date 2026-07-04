"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import {
  Search, Eye, Trash2, Download, CreditCard, Loader2, Calendar, FileText
} from "lucide-react";
import toast from "react-hot-toast";
import PageHeader from "@/components/crm/shared/PageHeader";
import Modal from "@/components/crm/shared/Modal";
import { useCRM } from "@/lib/crm-context";
import type { Payment } from "@/types/crm";

const SURFACE_STYLE = {
  background: "var(--crm-surface)",
  border: "1px solid var(--crm-border)",
  boxShadow: "var(--crm-shadow-sm)",
};

const METHOD_LABELS: Record<string, string> = {
  bank_transfer: "Bank Transfer (NEFT/IMPS)",
  upi: "UPI (GooglePay/PhonePe)",
  card: "Credit/Debit Card",
  cash: "Cash",
  cheque: "Cheque",
  other: "Other"
};

export default function PaymentsPage() {
  const { user }   = useCRM();
  const isAdmin    = user?.role === "admin" || user?.role === "superadmin";

  const [payments,    setPayments]    = useState<Payment[]>([]);
  const [loading,     setLoading]     = useState(true);
  const [search,      setSearch]      = useState("");
  const [view,        setView]        = useState<Payment | null>(null);
  
  const [downloading, setDownloading] = useState<string | null>(null);
  const [deleting,    setDeleting]    = useState<string | null>(null);

  const fetchPayments = useCallback(async () => {
    setLoading(true);
    try {
      const res  = await fetch("/api/payments");
      const json = await res.json();
      setPayments(json.data ?? []);
    } catch {
      toast.error("Failed to load payment receipts");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPayments();
  }, [fetchPayments]);

  const filtered = payments.filter(
    (p) =>
      !search ||
      p.paymentId.toLowerCase().includes(search.toLowerCase()) ||
      (p.referenceNumber && p.referenceNumber.toLowerCase().includes(search.toLowerCase())) ||
      (p.notes && p.notes.toLowerCase().includes(search.toLowerCase()))
  );

  // ── Download Receipt PDF ──────────────────────────────────────────
  const downloadReceipt = async (p: Payment) => {
    setDownloading(p._id);
    try {
      const res = await fetch(`/api/payments/${p._id}/pdf`);
      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: "Download failed" }));
        toast.error(err.error ?? "Download failed");
        return;
      }
      const blob = await res.blob();
      const url  = URL.createObjectURL(blob);
      const a    = document.createElement("a");
      a.href     = url;
      a.download = `Receipt_${p.paymentId}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
      toast.success(`Downloaded Receipt_${p.paymentId}.pdf`);
    } catch {
      toast.error("Network error while downloading receipt PDF");
    } finally {
      setDownloading(null);
    }
  };

  // ── Delete Payment Receipt (Admin Only) ───────────────────────────
  const handleDelete = async (p: Payment) => {
    const confirmMsg = `Are you sure you want to delete payment ${p.paymentId}?\nThis will undo this payment amount (Rs.${p.amount.toLocaleString("en-IN")}) from the linked invoice balance.`;
    if (!confirm(confirmMsg)) return;

    setDeleting(p._id);
    try {
      const res = await fetch(`/api/payments/${p._id}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Payment receipt deleted and invoice outstanding updated!");
        fetchPayments();
      } else {
        toast.error("Failed to delete payment receipt");
      }
    } catch {
      toast.error("Network error deleting payment receipt");
    } finally {
      setDeleting(null);
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Payment Receipts & Slips"
        subtitle="Verify transaction confirmations, export payment receipts, and audits logs."
      />

      {/* Search Filter */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between p-4 rounded-xl" style={SURFACE_STYLE}>
        <div className="relative w-full sm:max-w-md">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search payment ID, transaction ref UTR, notes..."
            className="w-full pl-9 pr-4 py-2 rounded-lg border border-slate-200 text-xs focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-slate-50/50"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Receipts Table List */}
      <div className="rounded-xl overflow-hidden" style={SURFACE_STYLE}>
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <Loader2 className="w-8 h-8 text-purple-600 animate-spin" />
            <p className="text-xs text-slate-500 font-medium">Loading receipts...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <CreditCard className="w-12 h-12 text-slate-300 mb-3" />
            <h3 className="text-sm font-semibold text-slate-700">No Payment Slips Found</h3>
            <p className="text-xs text-slate-500 max-w-xs mt-1">
              You haven't recorded any payment receipts yet. Log them from the Invoices screen.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/70 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                  <th className="px-5 py-3.5">Receipt ID</th>
                  <th className="px-5 py-3.5">Linked Invoice</th>
                  <th className="px-5 py-3.5">Amount Received</th>
                  <th className="px-5 py-3.5">Payment Method</th>
                  <th className="px-5 py-3.5">Reference UTR</th>
                  <th className="px-5 py-3.5">Date Paid</th>
                  <th className="px-5 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {filtered.map((pay) => (
                  <tr key={pay._id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-5 py-4 font-bold text-slate-800">
                      {pay.paymentId}
                    </td>
                    <td className="px-5 py-4 font-semibold text-purple-600">
                      {typeof pay.invoice === "object" ? (pay.invoice as any)?.invoiceId : (pay.invoice || "Direct / Advance")}
                    </td>
                    <td className="px-5 py-4 font-bold text-slate-800 text-sm">
                      Rs.{pay.amount.toLocaleString("en-IN")}
                    </td>
                    <td className="px-5 py-4 font-medium text-slate-600">
                      {METHOD_LABELS[pay.paymentMethod] ?? pay.paymentMethod}
                    </td>
                    <td className="px-5 py-4 text-slate-500 font-mono">
                      {pay.referenceNumber || "N/A"}
                    </td>
                    <td className="px-5 py-4 text-slate-500 font-medium">
                      {new Date(pay.paymentDate).toLocaleDateString("en-IN")}
                    </td>
                    <td className="px-5 py-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setView(pay)}
                          title="View Details"
                          className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-600 transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => downloadReceipt(pay)}
                          disabled={downloading === pay._id}
                          title="Download Receipt PDF"
                          className="p-1.5 rounded-lg hover:bg-slate-100 text-purple-600 transition-colors disabled:opacity-50"
                        >
                          {downloading === pay._id ? (
                            <Loader2 className="w-4 h-4 animate-spin text-slate-400" />
                          ) : (
                            <Download className="w-4 h-4" />
                          )}
                        </button>

                        {isAdmin && (
                          <button
                            onClick={() => handleDelete(pay)}
                            disabled={deleting === pay._id}
                            title="Delete Payment & Rollback"
                            className="p-1.5 rounded-lg hover:bg-red-50 text-red-600 transition-colors disabled:opacity-50"
                          >
                            {deleting === pay._id ? (
                              <Loader2 className="w-4 h-4 animate-spin text-slate-400" />
                            ) : (
                              <Trash2 className="w-4 h-4" />
                            )}
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* VIEW RECEIPT DETAILS MODAL */}
      {view && (
        <Modal open={!!view} title={`Payment Receipt details — ${view.paymentId}`} onClose={() => setView(null)} size="md">
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <p className="text-[10px] text-slate-400 uppercase font-semibold">Payment Date</p>
                <p className="text-xs font-bold text-slate-700 mt-0.5">{new Date(view.paymentDate).toLocaleDateString("en-IN")}</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-slate-400 uppercase font-semibold">Method</p>
                <p className="text-xs font-bold text-purple-700 mt-0.5">{METHOD_LABELS[view.paymentMethod] ?? view.paymentMethod}</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-purple-50/50 border border-purple-100/50 text-center">
              <p className="text-xs font-medium text-slate-500">Amount Received</p>
              <h2 className="text-2xl font-bold text-purple-600 mt-1">Rs.{view.amount.toLocaleString("en-IN")}</h2>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between border-b border-slate-50 pb-2">
                <span className="text-slate-400">Customer Name:</span>
                <span className="font-semibold text-slate-700">
                  {typeof view.invoice === "object" ? (view.invoice as any)?.leadName : "N/A"}
                </span>
              </div>
              <div className="flex justify-between border-b border-slate-50 pb-2">
                <span className="text-slate-400">Linked Invoice Reference:</span>
                <span className="font-semibold text-purple-700">
                  {typeof view.invoice === "object" ? (view.invoice as any)?.invoiceId : (view.invoice || "N/A")}
                </span>
              </div>
              <div className="flex justify-between border-b border-slate-50 pb-2">
                <span className="text-slate-400">Service Offered:</span>
                <span className="font-semibold text-slate-700 text-right max-w-xs break-words">
                  {typeof view.invoice === "object" && (view.invoice as any)?.items
                    ? (view.invoice as any).items.map((i: any) => i.description || "").filter(Boolean).join(", ")
                    : "N/A"}
                </span>
              </div>
              <div className="flex justify-between border-b border-slate-50 pb-2">
                <span className="text-slate-400">Transaction UTR/Reference ID:</span>
                <span className="font-mono font-semibold text-slate-700">{view.referenceNumber || "N/A"}</span>
              </div>
            </div>

            {view.notes && (
              <div>
                <p className="text-xs font-bold text-slate-700 mb-1">Receipt Notes</p>
                <p className="p-3 bg-slate-50 border border-slate-100 rounded-lg text-xs text-slate-600 whitespace-pre-wrap">
                  {view.notes}
                </p>
              </div>
            )}

            <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
              <button
                onClick={() => downloadReceipt(view)}
                className="flex items-center gap-1.5 px-4 py-2 bg-purple-50 hover:bg-purple-100 text-purple-700 rounded-lg font-semibold transition-all duration-150"
              >
                <Download className="w-4 h-4" />
                Download Receipt PDF
              </button>
              <button
                onClick={() => setView(null)}
                className="px-4 py-2 border border-slate-200 text-slate-600 rounded-lg font-semibold hover:bg-slate-50 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
