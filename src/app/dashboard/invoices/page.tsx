"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import {
  Plus, Search, Eye, Trash2, Download, Receipt, Loader2, CreditCard, DollarSign, Calendar
} from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";
import PageHeader from "@/components/crm/shared/PageHeader";
import Modal from "@/components/crm/shared/Modal";
import { useCRM } from "@/lib/crm-context";
import type { Invoice } from "@/types/crm";

const SURFACE_STYLE = {
  background: "var(--crm-surface)",
  border: "1px solid var(--crm-border)",
  boxShadow: "var(--crm-shadow-sm)",
};

export default function InvoicesPage() {
  const { user }   = useCRM();
  const isAdmin    = user?.role === "admin" || user?.role === "superadmin";

  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading,  setLoading]  = useState(true);
  const [search,   setSearch]   = useState("");
  
  // Modal states
  const [view,          setView]          = useState<Invoice | null>(null);
  const [payModal,      setPayModal]      = useState<Invoice | null>(null);
  
  // Pay form states
  const [payAmount,     setPayAmount]     = useState("");
  const [payMethod,     setPayMethod]     = useState("bank_transfer");
  const [payRef,        setPayRef]        = useState("");
  const [payNotes,      setPayNotes]      = useState("");
  const [paying,        setPaying]        = useState(false);
  
  // Downloading PDF states
  const [downloading,   setDownloading]   = useState<string | null>(null);
  const [deleting,      setDeleting]      = useState<string | null>(null);

  const fetchInvoices = useCallback(async () => {
    setLoading(true);
    try {
      const res  = await fetch("/api/invoices");
      const json = await res.json();
      setInvoices(json.data ?? []);
    } catch {
      toast.error("Failed to load invoices");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchInvoices();
  }, [fetchInvoices]);

  const filtered = invoices.filter(
    (inv) =>
      !search ||
      inv.leadName.toLowerCase().includes(search.toLowerCase()) ||
      inv.invoiceId.toLowerCase().includes(search.toLowerCase()) ||
      inv.leadEmail.toLowerCase().includes(search.toLowerCase())
  );

  // ── Download Invoice PDF ──────────────────────────────────────────
  const downloadPDF = async (inv: Invoice) => {
    setDownloading(inv._id);
    try {
      const res = await fetch(`/api/invoices/${inv._id}/pdf`);
      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: "Download failed" }));
        toast.error(err.error ?? "Download failed");
        return;
      }
      const blob = await res.blob();
      const url  = URL.createObjectURL(blob);
      const a    = document.createElement("a");
      a.href     = url;
      a.download = `${inv.invoiceId}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
      toast.success(`Downloaded ${inv.invoiceId}.pdf`);
    } catch {
      toast.error("Network error while downloading invoice PDF");
    } finally {
      setDownloading(null);
    }
  };

  // ── Log Payment Transaction ───────────────────────────────────────
  const logPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!payModal) return;
    if (!payAmount || Number(payAmount) <= 0) {
      toast.error("Please enter a valid payment amount");
      return;
    }

    const trimmedRef = payRef.trim();
    if (payMethod === "bank_transfer" || payMethod === "upi" || payMethod === "cheque") {
      if (!trimmedRef) {
        toast.error(`Transaction Reference / UTR is required for ${payMethod === "cheque" ? "Cheque" : "Bank Transfer/UPI"}`);
        return;
      }
    }

    if (trimmedRef) {
      const isAlphanumeric = /^[a-zA-Z0-9]+$/.test(trimmedRef);
      if (!isAlphanumeric) {
        toast.error("Transaction Reference / UTR must be alphanumeric (letters and numbers only, no spaces/special characters)");
        return;
      }
      if (trimmedRef.length < 12 || trimmedRef.length > 22) {
        toast.error("Transaction Reference / UTR must be between 12 and 22 characters long");
        return;
      }
    }

    setPaying(true);
    try {
      const res = await fetch("/api/payments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          invoiceId:       payModal._id,
          amount:          Number(payAmount),
          paymentMethod:   payMethod,
          referenceNumber: payRef,
          notes:           payNotes,
        }),
      });

      const json = await res.json();
      if (!res.ok) {
        toast.error(json.error ?? "Failed to log payment");
        return;
      }

      toast.success(`Payment of Rs.${Number(payAmount).toLocaleString("en-IN")} logged successfully!`);
      setPayModal(null);
      setPayAmount("");
      setPayRef("");
      setPayNotes("");
      fetchInvoices();
    } catch {
      toast.error("Network error logging payment");
    } finally {
      setPaying(false);
    }
  };

  // ── Delete Invoice ────────────────────────────────────────────────
  const handleDelete = async (inv: Invoice) => {
    if (!confirm(`Are you sure you want to delete invoice ${inv.invoiceId}?`)) return;
    setDeleting(inv._id);
    try {
      const res = await fetch(`/api/invoices/${inv._id}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Invoice deleted successfully");
        fetchInvoices();
      } else {
        toast.error("Failed to delete invoice");
      }
    } catch {
      toast.error("Network error deleting invoice");
    } finally {
      setDeleting(null);
    }
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "partially_paid":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "unpaid":
        return "bg-red-50 text-red-700 border-red-200";
      case "void":
        return "bg-gray-50 text-gray-700 border-gray-200";
      case "overdue":
        return "bg-rose-50 text-rose-700 border-rose-300";
      default:
        return "bg-gray-50 text-gray-600 border-gray-200";
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Billing Invoices"
        subtitle="Raise official billing tax invoices and track outstanding payments."
        actions={
          <Link href="/dashboard/invoices/new">
            <button className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-sm transition-all duration-150">
              <Plus className="w-3.5 h-3.5" />
              New Invoice
            </button>
          </Link>
        }
      />

      {/* Filter / Search Bar */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between p-4 rounded-xl" style={SURFACE_STYLE}>
        <div className="relative w-full sm:max-w-md">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search invoice number, client name or email..."
            className="w-full pl-9 pr-4 py-2 rounded-lg border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-slate-50/50"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Invoice Table list */}
      <div className="rounded-xl overflow-hidden" style={SURFACE_STYLE}>
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <Loader2 className="w-8 h-8 text-emerald-600 animate-spin" />
            <p className="text-xs text-slate-500 font-medium">Loading invoices...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <Receipt className="w-12 h-12 text-slate-300 mb-3" />
            <h3 className="text-sm font-semibold text-slate-700">No Invoices Found</h3>
            <p className="text-xs text-slate-500 max-w-xs mt-1">
              You haven't generated any tax invoices yet, or none match your search.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/70 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                  <th className="px-5 py-3.5">Invoice ID</th>
                  <th className="px-5 py-3.5">Client Details</th>
                  <th className="px-5 py-3.5">Total Amount</th>
                  <th className="px-5 py-3.5">Amount Paid</th>
                  <th className="px-5 py-3.5">Balance Due</th>
                  <th className="px-5 py-3.5">Status</th>
                  <th className="px-5 py-3.5">Due Date</th>
                  <th className="px-5 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {filtered.map((inv) => (
                  <tr key={inv._id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-5 py-4 font-bold text-slate-800">
                      {inv.invoiceId}
                    </td>
                    <td className="px-5 py-4">
                      <p className="font-semibold text-slate-800">{inv.leadName}</p>
                      <p className="text-[10px] text-slate-500">{inv.leadEmail}</p>
                    </td>
                    <td className="px-5 py-4 font-semibold text-slate-700">
                      Rs.{inv.total.toLocaleString("en-IN")}
                    </td>
                    <td className="px-5 py-4 text-emerald-600 font-medium">
                      Rs.{inv.amountPaid.toLocaleString("en-IN")}
                    </td>
                    <td className="px-5 py-4 text-red-500 font-bold">
                      Rs.{inv.dueAmount.toLocaleString("en-IN")}
                    </td>
                    <td className="px-5 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-semibold border ${getStatusBadgeClass(inv.status)}`}>
                        {inv.status.replace("_", " ").toUpperCase()}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-slate-500 font-medium">
                      {new Date(inv.dueDate).toLocaleDateString("en-IN")}
                    </td>
                    <td className="px-5 py-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setView(inv)}
                          title="View Details"
                          className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-600 transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        
                        {inv.status !== "paid" && (
                          <button
                            onClick={() => {
                              setPayModal(inv);
                              setPayAmount(String(inv.dueAmount));
                            }}
                            title="Log Payment"
                            className="p-1.5 rounded-lg hover:bg-emerald-50 text-emerald-600 transition-colors"
                          >
                            <CreditCard className="w-4 h-4" />
                          </button>
                        )}

                        <button
                          onClick={() => downloadPDF(inv)}
                          disabled={downloading === inv._id}
                          title="Download PDF"
                          className="p-1.5 rounded-lg hover:bg-slate-100 text-emerald-600 transition-colors disabled:opacity-50"
                        >
                          {downloading === inv._id ? (
                            <Loader2 className="w-4 h-4 animate-spin text-slate-400" />
                          ) : (
                            <Download className="w-4 h-4" />
                          )}
                        </button>

                        {isAdmin && (
                          <button
                            onClick={() => handleDelete(inv)}
                            disabled={deleting === inv._id}
                            title="Delete Invoice"
                            className="p-1.5 rounded-lg hover:bg-red-50 text-red-600 transition-colors disabled:opacity-50"
                          >
                            {deleting === inv._id ? (
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

      {/* VIEW DETAILS MODAL */}
      {view && (
        <Modal open={!!view} title={`Invoice Details — ${view.invoiceId}`} onClose={() => setView(null)} size="lg">
          <div className="space-y-6">
            {/* Metadata Section */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
              <div>
                <p className="text-[10px] text-slate-400 uppercase font-semibold">Client Name</p>
                <p className="text-xs font-bold text-slate-700 mt-0.5">{view.leadName}</p>
              </div>
              <div>
                <p className="text-[10px] text-slate-400 uppercase font-semibold">Status</p>
                <span className={`inline-block px-2.5 py-0.5 mt-0.5 rounded-full text-[10px] font-semibold border ${getStatusBadgeClass(view.status)}`}>
                  {view.status.replace("_", " ").toUpperCase()}
                </span>
              </div>
              <div>
                <p className="text-[10px] text-slate-400 uppercase font-semibold">Billing Date</p>
                <p className="text-xs font-bold text-slate-700 mt-0.5">{new Date(view.billingDate).toLocaleDateString("en-IN")}</p>
              </div>
              <div>
                <p className="text-[10px] text-slate-400 uppercase font-semibold">Due Date</p>
                <p className="text-xs font-bold text-slate-700 mt-0.5">{new Date(view.dueDate).toLocaleDateString("en-IN")}</p>
              </div>
            </div>

            {/* Items Table */}
            <div>
              <p className="text-xs font-bold text-slate-800 mb-2">Invoice Items Breakdown</p>
              <div className="border border-slate-200 rounded-lg overflow-hidden">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-slate-100 bg-slate-50 font-semibold text-slate-500 uppercase tracking-wider">
                      <th className="px-4 py-2">Description</th>
                      <th className="px-4 py-2 text-center">Qty</th>
                      <th className="px-4 py-2 text-right">Unit Price</th>
                      <th className="px-4 py-2 text-right">Discount</th>
                      <th className="px-4 py-2 text-right">Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {view.items.map((item, idx) => (
                      <tr key={idx}>
                        <td className="px-4 py-2.5 font-medium text-slate-700">{item.description}</td>
                        <td className="px-4 py-2.5 text-center">{item.quantity}</td>
                        <td className="px-4 py-2.5 text-right">Rs.{item.unitPrice.toLocaleString("en-IN")}</td>
                        <td className="px-4 py-2.5 text-right">{item.discount > 0 ? `${item.discount}%` : "—"}</td>
                        <td className="px-4 py-2.5 text-right font-bold text-slate-800">Rs.{item.total.toLocaleString("en-IN")}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Summary Block */}
            <div className="flex justify-end">
              <div className="w-full max-w-xs space-y-2 border-t border-slate-100 pt-3 text-xs">
                <div className="flex justify-between text-slate-500">
                  <span>Subtotal:</span>
                  <span className="font-semibold text-slate-700">Rs.{view.subtotal.toLocaleString("en-IN")}</span>
                </div>
                {view.discountAmount > 0 && (
                  <div className="flex justify-between text-red-500">
                    <span>Discount:</span>
                    <span>-Rs.{view.discountAmount.toLocaleString("en-IN")}</span>
                  </div>
                )}
                <div className="flex justify-between text-slate-500">
                  <span>GST ({view.taxRate}%):</span>
                  <span className="font-semibold text-slate-700">Rs.{view.taxAmount.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between font-bold text-sm text-slate-800 pt-1 border-t border-slate-100">
                  <span>TOTAL AMOUNT:</span>
                  <span>Rs.{view.total.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between font-medium text-emerald-600">
                  <span>Amount Paid:</span>
                  <span>Rs.{view.amountPaid.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between font-bold text-red-500 pt-1 border-t border-slate-100">
                  <span>BALANCE DUE:</span>
                  <span>Rs.{view.dueAmount.toLocaleString("en-IN")}</span>
                </div>
              </div>
            </div>

            {/* Terms and bank details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs pt-4 border-t border-slate-100">
              {view.bankDetails && (
                <div>
                  <p className="font-bold text-slate-700 mb-1">Bank Payment Instructions</p>
                  <pre className="p-3 bg-slate-50 border border-slate-100 rounded-lg text-slate-600 font-mono text-[10px] whitespace-pre-wrap">
                    {view.bankDetails}
                  </pre>
                </div>
              )}
              {view.terms && (
                <div>
                  <p className="font-bold text-slate-700 mb-1">Terms & Conditions</p>
                  <p className="p-3 bg-slate-50 border border-slate-100 rounded-lg text-slate-600 whitespace-pre-wrap">
                    {view.terms}
                  </p>
                </div>
              )}
            </div>

            {/* Action Bar */}
            <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
              <button
                onClick={() => downloadPDF(view)}
                className="flex items-center gap-1.5 px-4 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-lg font-semibold transition-all duration-150"
              >
                <Download className="w-4 h-4" />
                Download Invoice PDF
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

      {/* LOG PAYMENT MODAL */}
      {payModal && (
        <Modal open={!!payModal} title={`Log Payment Receipt — ${payModal.invoiceId}`} onClose={() => setPayModal(null)} size="md">
          <form onSubmit={logPayment} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                Payment Amount (INR) *
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                <input
                  type="number"
                  required
                  placeholder="0.00"
                  max={payModal.dueAmount}
                  className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-slate-50/50 font-bold"
                  value={payAmount}
                  onChange={(e) => setPayAmount(e.target.value)}
                />
              </div>
              <p className="text-[10px] text-slate-400 mt-1">
                Outstanding balance is Rs.{payModal.dueAmount.toLocaleString("en-IN")}. Cannot exceed this amount.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                  Payment Method *
                </label>
                <select
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-slate-50/50"
                  value={payMethod}
                  onChange={(e) => setPayMethod(e.target.value)}
                >
                  <option value="bank_transfer">Bank Transfer (NEFT/IMPS)</option>
                  <option value="upi">UPI (GPay/PhonePe)</option>
                  <option value="card">Credit/Debit Card</option>
                  <option value="cash">Cash</option>
                  <option value="cheque">Cheque</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                  Transaction Reference / UTR
                </label>
                <input
                  type="text"
                  placeholder="e.g. UTR182739172"
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-slate-50/50"
                  value={payRef}
                  onChange={(e) => setPayRef(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                Receipt Notes
              </label>
              <textarea
                placeholder="Log internal comments about payment, e.g. received via HDFC bank account."
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-slate-50/50 h-20 resize-none"
                value={payNotes}
                onChange={(e) => setPayNotes(e.target.value)}
              />
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setPayModal(null)}
                className="px-4 py-2 border border-slate-200 text-slate-600 rounded-lg font-semibold hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={paying}
                className="flex items-center gap-1.5 px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-semibold transition-colors disabled:opacity-50 font-bold"
              >
                {paying ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Saving Receipt...
                  </>
                ) : (
                  <>
                    <CreditCard className="w-4 h-4" />
                    Save Payment Receipt
                  </>
                )}
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
