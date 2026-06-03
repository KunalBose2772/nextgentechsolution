"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Plus, Trash2, CheckCircle, ArrowLeft, Calculator } from "lucide-react";
import toast from "react-hot-toast";
import PageHeader from "@/components/crm/shared/PageHeader";

interface Item { id: string; description: string; quantity: number; unitPrice: number; discount: number; total: number; }

const SURFACE_STYLE = {
  background: "var(--crm-surface)",
  border: "1px solid var(--crm-border)",
  boxShadow: "var(--crm-shadow-sm)",
};

function Input({ ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className="w-full px-3 py-2 rounded-lg text-[13px] outline-none transition-all"
      style={{ background: "var(--crm-surface)", border: "1px solid var(--crm-border)", color: "var(--crm-text)" }}
      onFocus={(e) => { e.currentTarget.style.borderColor = "var(--crm-primary)"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(91,91,214,0.10)"; }}
      onBlur={(e)  => { e.currentTarget.style.borderColor = "var(--crm-border)";  e.currentTarget.style.boxShadow = "none"; }}
      {...props}
    />
  );
}

export default function NewQuotationPage() {
  const router = useRouter();
  const [saving,    setSaving]    = useState(false);
  const [client,    setClient]    = useState({ name: "", email: "", phone: "", company: "" });
  const [taxRate,   setTaxRate]   = useState(18);
  const [validDays, setValidDays] = useState(30);
  const [terms,     setTerms]     = useState("50% advance payment required before project commencement. Balance due on delivery.");
  const [items,     setItems]     = useState<Item[]>([
    { id: "1", description: "", quantity: 1, unitPrice: 0, discount: 0, total: 0 },
  ]);

  const updateItem = (id: string, field: keyof Item, value: string | number) => {
    setItems((prev) => prev.map((item) => {
      if (item.id !== id) return item;
      const updated = { ...item, [field]: value };
      const price = updated.unitPrice * updated.quantity;
      updated.total = price - (price * updated.discount / 100);
      return updated;
    }));
  };

  const addItem = () => setItems((p) => [...p, { id: Date.now().toString(), description: "", quantity: 1, unitPrice: 0, discount: 0, total: 0 }]);
  const removeItem = (id: string) => setItems((p) => p.filter((i) => i.id !== id));

  const subtotal = items.reduce((s, i) => s + i.total, 0);
  const taxAmount = subtotal * taxRate / 100;
  const total = subtotal + taxAmount;

  const [now, setNow] = useState<number>(0);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setNow(Date.now());
  }, []);
  const validUntil = useMemo(
    () => new Date(now + validDays * 86400000).toISOString(),
    [now, validDays]
  );

  const handleSave = async (sendForApproval = false) => {
    if (!client.name || !client.email || !client.phone) { toast.error("Client details required"); return; }
    if (!items.some(i => i.description && i.unitPrice > 0)) { toast.error("Add at least one item"); return; }
    setSaving(true);
    try {
      const res = await fetch("/api/quotations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          leadName: client.name, leadEmail: client.email, leadPhone: client.phone,
          leadCompany: client.company,
          items: items.filter(i => i.description),
          subtotal, taxRate, taxAmount, total, currency: "INR",
          status: sendForApproval ? "pending_approval" : "draft",
          validUntil, terms,
        }),
      });
      if (res.ok) {
        toast.success(sendForApproval ? "Sent for approval!" : "Draft saved!");
        router.push("/dashboard/quotations");
      } else toast.error("Failed to save");
    } catch { toast.error("Network error"); } finally { setSaving(false); }
  };

  return (
    <div>
      <PageHeader
        title="New Quotation"
        subtitle="Build and send a professional quotation"
        actions={
          <button onClick={() => router.back()} className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-[13px] font-medium transition-colors"
            style={{ background: "var(--crm-surface)", color: "var(--crm-text)", border: "1px solid var(--crm-border)" }}>
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
        }
      />

      <div className="grid lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 space-y-5">
          <motion.div className="rounded-xl p-5" style={SURFACE_STYLE} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
            <h3 className="text-[14px] font-semibold mb-4" style={{ color: "var(--crm-text-strong)" }}>Client Information</h3>
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[12px] font-medium" style={{ color: "var(--crm-text)" }}>Name</label>
                <Input value={client.name}    onChange={(e) => setClient({ ...client, name: e.target.value })}    placeholder="Client Name" />
              </div>
              <div className="space-y-1">
                <label className="text-[12px] font-medium" style={{ color: "var(--crm-text)" }}>Email</label>
                <Input type="email" value={client.email} onChange={(e) => setClient({ ...client, email: e.target.value })} placeholder="email@company.com" />
              </div>
              <div className="space-y-1">
                <label className="text-[12px] font-medium" style={{ color: "var(--crm-text)" }}>Phone</label>
                <Input value={client.phone}   onChange={(e) => setClient({ ...client, phone: e.target.value })}   placeholder="+91 9876543210" />
              </div>
              <div className="space-y-1">
                <label className="text-[12px] font-medium" style={{ color: "var(--crm-text)" }}>Company</label>
                <Input value={client.company} onChange={(e) => setClient({ ...client, company: e.target.value })} placeholder="Company Name" />
              </div>
            </div>
          </motion.div>

          <motion.div className="rounded-xl overflow-hidden" style={SURFACE_STYLE} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
            <div className="px-5 py-3 border-b flex items-center justify-between" style={{ borderColor: "var(--crm-border-faint)" }}>
              <h3 className="text-[14px] font-semibold" style={{ color: "var(--crm-text-strong)" }}>Services & Items</h3>
              <button onClick={addItem} className="flex items-center gap-1 px-2.5 py-1.5 rounded-md text-[11px] font-medium transition-colors"
                style={{ color: "var(--crm-primary)", border: "1px solid rgba(91,91,214,0.25)", background: "rgba(91,91,214,0.06)" }}>
                <Plus className="w-3 h-3" /> Add Item
              </button>
            </div>
            <div className="grid grid-cols-[2fr_60px_100px_80px_80px_36px] gap-2 px-5 py-2 text-[10px] uppercase tracking-wider border-b"
              style={{ borderColor: "var(--crm-border-faint)", color: "var(--crm-text-subtle)", background: "var(--crm-surface-muted)" }}>
              <span>Description</span><span>Qty</span><span>Unit Price</span><span>Disc %</span><span className="text-right">Total</span><span />
            </div>
            {items.map((item, i) => (
              <motion.div key={item.id}
                className="grid grid-cols-[2fr_60px_100px_80px_80px_36px] gap-2 items-center px-5 py-2 border-b"
                style={{ borderColor: "var(--crm-border-faint)" }}
                initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.03 }}>
                <Input value={item.description} onChange={(e) => updateItem(item.id, "description", e.target.value)} placeholder="Service / Product" />
                <Input type="number" min={1} value={item.quantity} onChange={(e) => updateItem(item.id, "quantity", +e.target.value)} />
                <Input type="number" min={0} value={item.unitPrice || ""} onChange={(e) => updateItem(item.id, "unitPrice", +e.target.value)} placeholder="0" />
                <Input type="number" min={0} max={100} value={item.discount || ""} onChange={(e) => updateItem(item.id, "discount", +e.target.value)} placeholder="0" />
                <p className="text-[13px] font-semibold text-right pr-1" style={{ color: "var(--crm-text-strong)" }}>₹{item.total.toLocaleString("en-IN")}</p>
                {items.length > 1 && (
                  <button onClick={() => removeItem(item.id)} className="p-1.5 rounded-md transition-colors"
                    style={{ color: "var(--crm-text-muted)" }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(220,38,38,0.08)"; e.currentTarget.style.color = "var(--crm-danger)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--crm-text-muted)"; }}>
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </motion.div>
            ))}
          </motion.div>

          <motion.div className="rounded-xl p-5" style={SURFACE_STYLE} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <h3 className="text-[14px] font-semibold mb-3" style={{ color: "var(--crm-text-strong)" }}>Terms & Conditions</h3>
            <textarea value={terms} onChange={(e) => setTerms(e.target.value)} rows={3}
              className="w-full px-3 py-2 rounded-lg text-[13px] outline-none resize-none"
              style={{ background: "var(--crm-surface)", border: "1px solid var(--crm-border)", color: "var(--crm-text)" }} />
          </motion.div>
        </div>

        <div className="space-y-4">
          <motion.div className="rounded-xl p-5 sticky top-20" style={SURFACE_STYLE} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.07 }}>
            <div className="flex items-center gap-2 mb-4">
              <Calculator className="w-4 h-4" style={{ color: "var(--crm-primary)" }} />
              <h3 className="text-[14px] font-semibold" style={{ color: "var(--crm-text-strong)" }}>Summary</h3>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="space-y-1">
                <label className="text-[12px] font-medium" style={{ color: "var(--crm-text)" }}>GST Rate</label>
                <select value={taxRate} onChange={(e) => setTaxRate(+e.target.value)}
                  className="w-full px-3 py-2 rounded-lg text-[13px] outline-none appearance-none"
                  style={{ background: "var(--crm-surface)", border: "1px solid var(--crm-border)", color: "var(--crm-text)" }}>
                  {[0,5,12,18,28].map((r) => <option key={r} value={r}>{r}%</option>)}
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-[12px] font-medium" style={{ color: "var(--crm-text)" }}>Valid (days)</label>
                <Input type="number" value={validDays} onChange={(e) => setValidDays(+e.target.value)} />
              </div>
            </div>

            <div className="space-y-2 mb-5 pt-4 border-t text-[13px]" style={{ borderColor: "var(--crm-border-faint)" }}>
              <div className="flex justify-between"><span style={{ color: "var(--crm-text-muted)" }}>Subtotal</span><span style={{ color: "var(--crm-text)" }}>₹{subtotal.toLocaleString("en-IN")}</span></div>
              <div className="flex justify-between"><span style={{ color: "var(--crm-text-muted)" }}>GST ({taxRate}%)</span><span style={{ color: "var(--crm-text)" }}>₹{taxAmount.toLocaleString("en-IN")}</span></div>
              <div className="flex justify-between font-semibold text-[15px] pt-2 border-t" style={{ borderColor: "var(--crm-border-faint)", color: "var(--crm-text-strong)" }}>
                <span>Total</span><span>₹{total.toLocaleString("en-IN")}</span>
              </div>
            </div>

            <div className="space-y-2">
              <button onClick={() => handleSave(true)} disabled={saving} className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-[13px] font-semibold text-white"
                style={{ background: "linear-gradient(135deg,#5b5bd6,#7c3aed)", boxShadow: "0 1px 2px 0 rgba(91,91,214,0.25)" }}>
                {saving ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <CheckCircle className="w-4 h-4" />}
                Submit for Approval
              </button>
              <button onClick={() => handleSave(false)} disabled={saving} className="w-full py-2.5 rounded-lg text-[13px] font-medium transition-colors"
                style={{ background: "var(--crm-surface)", color: "var(--crm-text)", border: "1px solid var(--crm-border)" }}>
                Save as Draft
              </button>
            </div>

            <p className="text-[11px] text-center mt-3" style={{ color: "var(--crm-text-subtle)" }}>
              Valid until: {new Date(validUntil).toLocaleDateString()}
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
