"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, User, Mail, Phone, Building, Check, Loader2, 
  AlertCircle, MessageSquare, Sparkles, Clock
} from "lucide-react";
import { COMPANY } from "@/lib/utils";

export interface BookDemoTriggerOptions {
  productName?: string;
  accentColor?: string;
}

// Helper to convert hex to RGB for alpha channels
function hexToRgb(hex: string): string {
  const cleanHex = hex.replace("#", "");
  const r = parseInt(cleanHex.substring(0, 2), 16);
  const g = parseInt(cleanHex.substring(2, 4), 16);
  const b = parseInt(cleanHex.substring(4, 6), 16);
  return isNaN(r) || isNaN(g) || isNaN(b) ? "124, 58, 237" : `${r}, ${g}, ${b}`;
}

// Global trigger helper
export function triggerBookDemoModal(options?: BookDemoTriggerOptions) {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("open-book-demo", { detail: options }));
  }
}

const AVAILABLE_PRODUCTS = [
  "Documents Management",
  "Learning Management",
  "Hospital Management",
  "CRM System",
  "Logistics Management",
  "Inventory Management",
  "HR Payroll & Roster",
  "E-Commerce Solutions"
];

export default function BookDemoModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1); // Step 1: Form, Step 2: Success
  const [accentColor, setAccentColor] = useState("#7C3AED"); // Default purple
  const [selectedProduct, setSelectedProduct] = useState("");

  // Form State
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: ""
  });

  // Touched state for validation error display
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    phone: false
  });

  const [sending, setSending] = useState(false);
  const [leadId, setLeadId] = useState("");
  const [error, setError] = useState("");

  // Listen for trigger events
  useEffect(() => {
    const handleOpen = (e: Event) => {
      const customEvent = e as CustomEvent<BookDemoTriggerOptions>;
      const detail = customEvent.detail || {};
      
      setSelectedProduct(detail.productName || AVAILABLE_PRODUCTS[0]);
      setAccentColor(detail.accentColor || "#7C3AED");

      // Reset form and states
      setForm({
        name: "",
        email: "",
        phone: "",
        company: "",
        message: ""
      });

      setTouched({
        name: false,
        email: false,
        phone: false
      });

      setIsOpen(true);
      setStep(1);
      setError("");
      setLeadId("");
    };

    window.addEventListener("open-book-demo", handleOpen);
    return () => window.removeEventListener("open-book-demo", handleOpen);
  }, []);

  // Prevent background scrolling when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleClose = () => {
    setIsOpen(false);
  };

  // Restrict phone input to 10 digits
  const handlePhoneChange = (val: string) => {
    const cleaned = val.replace(/\D/g, "");
    if (cleaned.length <= 10) {
      setForm(prev => ({ ...prev, phone: cleaned }));
    }
  };

  const handleBlur = (field: keyof typeof touched) => {
    setTouched(prev => ({ ...prev, [field]: true }));
  };

  // Validation
  const isNameValid = form.name.trim().length >= 2;
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);
  const isPhoneValid = form.phone.length === 10;

  const isFormValid = () => {
    return isNameValid && isEmailValid && isPhoneValid;
  };

  const handleSubmit = async () => {
    setSending(true);
    setError("");

    try {
      const finalMessage = `Product Demo Requested:
- Product: ${selectedProduct}
- Company: ${form.company || "Not Provided"}
- Custom Note: ${form.message.trim() || "None"}`;

      const res = await fetch("/api/public/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          company: form.company,
          message: finalMessage,
          service: `Demo: ${selectedProduct}`,
          metadata: {
            flowType: "demo",
            selectedProduct: selectedProduct
          }
        })
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Failed to log demo booking. Please try again.");
        setSending(false);
        return;
      }

      setLeadId(data.leadId ?? "");
      setStep(2); 
    } catch {
      setError("A connection error occurred. Please try again.");
    } finally {
      setSending(false);
    }
  };

  // Inline dynamic accent variables
  const customStyles = {
    "--accent-global": accentColor,
    "--accent-global-hover": `${accentColor}dd`,
    "--accent-global-dim": `rgba(${hexToRgb(accentColor)}, 0.08)`,
    "--accent-global-rgb": hexToRgb(accentColor),
  } as React.CSSProperties;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-55 flex items-center justify-center p-4 overflow-y-auto" style={customStyles}>
          
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-0"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 15 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="bg-white text-slate-800 rounded-3xl w-full max-w-4xl shadow-2xl relative z-10 overflow-hidden min-h-[480px] flex flex-col md:flex-row border border-slate-100"
          >
            
            {/* Left Info Pane */}
            <div className="w-full md:w-[350px] bg-slate-950 text-white p-8 flex flex-col justify-between relative overflow-hidden shrink-0">
              {/* Background decorative glow */}
              <div 
                className="absolute -top-12 -left-12 w-48 h-48 rounded-full blur-[80px] opacity-40 pointer-events-none" 
                style={{ background: "var(--accent-global)" }}
              />
              <div 
                className="absolute -bottom-16 -right-16 w-56 h-56 rounded-full blur-[100px] opacity-25 pointer-events-none" 
                style={{ background: "cyan" }}
              />
              
              <div className="relative z-10 space-y-6">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest bg-white/10 text-white border border-white/15">
                  <Sparkles className="w-3.5 h-3.5 text-[var(--accent-global)] animate-pulse" /> Live Product Demo
                </span>
                
                <h3 className="text-2xl sm:text-3xl font-extrabold font-sora tracking-tight leading-tight">
                  Schedule a <br />
                  <span style={{ color: "var(--accent-global)" }}>1-on-1 Workspace</span> Walkthrough.
                </h3>
                
                <p className="text-slate-400 text-xs leading-relaxed">
                  Join our engineering specialists for a customized walkthrough. We will map your organizational scope, storage requirements, and system integrations in real-time.
                </p>

                <div className="space-y-3.5 pt-4">
                  {[
                    "Guided system features run",
                    "Custom database/ERP layout consult",
                    "Security, SLA, and compliance review",
                    "On-demand sandbox deployment"
                  ].map((feat, i) => (
                    <div key={i} className="flex items-center gap-2.5 text-xs text-slate-300">
                      <div className="w-5 h-5 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3 text-[var(--accent-global)] stroke-[2.5]" />
                      </div>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer details */}
              <div className="relative z-10 pt-8 border-t border-white/10 mt-8 text-[11px] text-slate-400 flex items-center gap-2 font-mono">
                <Clock className="w-4 h-4 text-[var(--accent-global)]" />
                <span>Duration: <span className="text-white font-bold">20-30 mins</span></span>
              </div>
            </div>

            {/* Right Interactive Content Pane */}
            <div className="flex-1 p-8 sm:p-10 flex flex-col justify-between bg-white">
              
              {/* Header row */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: "var(--accent-global)" }}>
                    {step === 1 && "Demo Request"}
                    {step === 2 && "Booking Complete"}
                  </span>
                  
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={handleClose}
                      className="w-8 h-8 rounded-full flex items-center justify-center bg-slate-50 hover:bg-slate-100 text-slate-450 hover:text-slate-900 transition-all border border-slate-100 cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Main Content */}
              <div className="flex-1 my-4 space-y-6">
                
                {/* STEP 1: Contact Form */}
                {step === 1 && (
                  <div className="space-y-4 animate-fadeIn">
                    <label className="block text-slate-900 font-extrabold text-lg font-sora tracking-tight">
                      Request a Walkthrough for <span className="text-[var(--accent-global)]">{selectedProduct}</span>
                    </label>

                    <div className="grid sm:grid-cols-2 gap-4">
                      {/* Name */}
                      <div className="space-y-1">
                        <label className="block text-xs font-bold text-slate-655">Full Name *</label>
                        <div className="relative">
                          <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                          <input
                            type="text"
                            required
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            onBlur={() => handleBlur("name")}
                            placeholder="Enter your full name"
                            className={`w-full h-11 pl-10 pr-4 rounded-xl bg-slate-50 border text-sm text-slate-900 outline-none transition-all ${
                              touched.name && !isNameValid
                                ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                                : "border-slate-200 focus:bg-white focus:border-[var(--accent-global)] focus:ring-2 focus:ring-[var(--accent-global-dim)]"
                            }`}
                          />
                        </div>
                        {touched.name && !isNameValid && (
                          <p className="text-red-500 text-[10px] font-semibold flex items-center gap-1 mt-1">
                            <AlertCircle className="w-3.5 h-3.5" /> Minimum 2 characters required.
                          </p>
                        )}
                      </div>

                      {/* Company */}
                      <div className="space-y-1">
                        <label className="block text-xs font-bold text-slate-655">Company Name</label>
                        <div className="relative">
                          <Building className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                          <input
                            type="text"
                            value={form.company}
                            onChange={(e) => setForm({ ...form, company: e.target.value })}
                            placeholder="Enter your company name"
                            className="w-full h-11 pl-10 pr-4 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 outline-none transition-all focus:bg-white focus:border-[var(--accent-global)] focus:ring-2 focus:ring-[var(--accent-global-dim)]"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      {/* Phone */}
                      <div className="space-y-1">
                        <label className="block text-xs font-bold text-slate-655">Phone Number *</label>
                        <div className="relative">
                          <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                          <input
                            type="tel"
                            required
                            value={form.phone}
                            onChange={(e) => handlePhoneChange(e.target.value)}
                            onBlur={() => handleBlur("phone")}
                            placeholder="Enter 10-digit number"
                            className={`w-full h-11 pl-10 pr-4 rounded-xl bg-slate-50 border text-sm text-slate-900 outline-none transition-all ${
                              touched.phone && !isPhoneValid
                                ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                                : "border-slate-200 focus:bg-white focus:border-[var(--accent-global)] focus:ring-2 focus:ring-[var(--accent-global-dim)]"
                            }`}
                          />
                        </div>
                        {touched.phone && !isPhoneValid && (
                          <p className="text-red-500 text-[10px] font-semibold flex items-center gap-1 mt-1">
                            <AlertCircle className="w-3.5 h-3.5" /> Must be exactly a 10-digit number.
                          </p>
                        )}
                      </div>

                      {/* Email */}
                      <div className="space-y-1">
                        <label className="block text-xs font-bold text-slate-655">Work Email *</label>
                        <div className="relative">
                          <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                          <input
                            type="email"
                            required
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            onBlur={() => handleBlur("email")}
                            placeholder="Enter your email address"
                            className={`w-full h-11 pl-10 pr-4 rounded-xl bg-slate-50 border text-sm text-slate-900 outline-none transition-all ${
                              touched.email && !isEmailValid
                                ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                                : "border-slate-200 focus:bg-white focus:border-[var(--accent-global)] focus:ring-2 focus:ring-[var(--accent-global-dim)]"
                            }`}
                          />
                        </div>
                        {touched.email && !isEmailValid && (
                          <p className="text-red-500 text-[10px] font-semibold flex items-center gap-1 mt-1">
                            <AlertCircle className="w-3.5 h-3.5" /> Please enter a valid email address.
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Requirements Message */}
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-slate-655">Specific Requirements or Volume (Optional)</label>
                      <div className="relative">
                        <MessageSquare className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                        <textarea
                          rows={3}
                          value={form.message}
                          onChange={(e) => setForm(prev => ({ ...prev, message: e.target.value }))}
                          placeholder="Tell us about your team size, system goals or custom integration needs..."
                          className="w-full p-3 pl-10 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 outline-none resize-none focus:bg-white focus:border-[var(--accent-global)] focus:ring-2 focus:ring-[var(--accent-global-dim)] transition-all leading-relaxed"
                        />
                      </div>
                    </div>

                    {error && (
                      <div className="flex items-center gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-xs text-red-500 font-semibold mt-2">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span>{error}</span>
                      </div>
                    )}
                  </div>
                )}

                {/* SUCCESS SCREEN */}
                {step === 2 && (
                  <div className="w-full flex flex-col items-center justify-center text-center py-6 animate-fadeIn" style={{ fontFamily: "'Inter', sans-serif" }}>
                    <div 
                      className="w-16 h-16 rounded-full flex items-center justify-center mb-5 text-white shadow-lg shadow-[var(--accent-global-rgb)]/20"
                      style={{ background: "var(--accent-global)" }}
                    >
                      <Check className="w-8 h-8 stroke-[3]" />
                    </div>

                    <h3 className="text-xl sm:text-2xl font-extrabold font-sora text-slate-900 tracking-tight mb-2">
                      Demo Request Sent!
                    </h3>
                    <p className="text-slate-500 text-xs max-w-md leading-relaxed mb-5">
                      Your demo request has been submitted successfully. Our engineering specialists will contact you shortly to schedule your live walkthrough.
                    </p>

                    <div className="w-full max-w-sm rounded-2xl bg-slate-50 border border-slate-200/60 p-4 mb-6 text-left space-y-2 text-xs">
                      <div className="flex justify-between border-b border-slate-200/40 pb-2">
                        <span className="text-slate-400 font-semibold">Product Walkthrough</span>
                        <span className="text-slate-900 font-bold">{selectedProduct}</span>
                      </div>
                      <div className="flex justify-between border-b border-slate-200/40 pb-2">
                        <span className="text-slate-400 font-semibold">Contact Email</span>
                        <span className="text-slate-900 font-bold">{form.email}</span>
                      </div>
                      {leadId && (
                        <div className="flex justify-between pt-1">
                          <span className="text-slate-400 font-semibold">Lead Reference Code</span>
                          <span className="font-mono text-[var(--accent-global)] font-extrabold">{leadId}</span>
                        </div>
                      )}
                    </div>

                    <button
                      onClick={handleClose}
                      className="px-6 py-2.5 text-white font-extrabold text-xs uppercase tracking-widest rounded-full transition-all duration-200"
                      style={{ 
                        background: "var(--accent-global)",
                        boxShadow: "0 6px 20px rgba(var(--accent-global-rgb), 0.2)"
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.background = "var(--accent-global-hover)"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = "var(--accent-global)"; }}
                    >
                      Close Window
                    </button>
                  </div>
                )}

              </div>

              {/* Bottom Nav Buttons */}
              {step === 1 && (
                <div className="flex items-center justify-end pt-6 border-t border-slate-100 mt-6">
                  <button
                    onClick={handleSubmit}
                    disabled={!isFormValid() || sending}
                    className="h-10 px-6 text-white font-extrabold text-xs uppercase tracking-widest rounded-full transition-all duration-200 flex items-center gap-2 cursor-pointer disabled:opacity-50"
                    style={{ 
                      background: "var(--accent-global)",
                      boxShadow: "0 6px 20px rgba(var(--accent-global-rgb), 0.25)"
                    }}
                    onMouseEnter={(e) => {
                      if (!isFormValid() || sending) return;
                      e.currentTarget.style.background = "var(--accent-global-hover)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "var(--accent-global)";
                    }}
                  >
                    {sending ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" /> Submitting...
                      </>
                    ) : (
                      "Submit Demo Request"
                    )}
                  </button>
                </div>
              )}

              {/* Legal footer info */}
              {step === 1 && (
                <p className="text-[9px] text-slate-400 mt-6 leading-relaxed">
                  By submitting this form, you authorize representatives of {COMPANY.name} to contact you regarding your demo request and sandbox access details.
                </p>
              )}

            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
