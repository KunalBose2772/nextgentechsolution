"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, ArrowRight, AlertCircle } from "lucide-react";
import { FaLinkedinIn, FaTwitter, FaGithub } from "react-icons/fa";
import SectionHeader from "@/components/ui/SectionHeader";
import { COMPANY } from "@/lib/utils";

const services = [
  "Web Development", "Mobile App", "SaaS Platform",
  "AI Solutions", "Cloud / DevOps", "UI/UX Design",
  "ERP / CRM", "Digital Transformation",
];

const Label = ({ children }: { children: React.ReactNode }) => (
  <label className="block text-[12px] font-medium mb-1.5 ml-0.5" style={{ color: "#64748B" }}>
    {children}
  </label>
);

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", service: "", budget: "", message: "" });
  const [website, setWebsite] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [leadId, setLeadId] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSending(true);

    try {
      const res = await fetch("/api/public/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, website }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error ?? "Something went wrong. Please try again."); setSending(false); return; }
      setLeadId(data.leadId ?? null);
      setSent(true);
      setForm({ name: "", email: "", phone: "", service: "", budget: "", message: "" });
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <section
      className="ng-section relative overflow-hidden"
      id="contact"
      style={{ background: "#0A0F1C" }}
    >
      <div className="ng-container">
        <div className="mb-14">
          <SectionHeader
            badge="Contact Us"
            title="Let's Build Something"
            titleHighlight="Great Together"
            description="Ready to transform your vision into reality? Reach out and let's discuss your project."
          />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left: Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div
              className="rounded-[20px] p-8"
              style={{
                background: "#121A2B",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              {sent ? (
                <motion.div
                  className="text-center py-12"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4"
                    style={{ background: "rgba(37,99,235,0.12)", border: "1px solid rgba(37,99,235,0.25)" }}
                  >
                    <Send className="w-6 h-6" style={{ color: "#2563EB" }} />
                  </div>
                  <h3
                    className="text-white font-semibold text-[20px] mb-2"
                    style={{ fontFamily: "Sora, sans-serif" }}
                  >
                    Message Sent!
                  </h3>
                  <p className="text-[14px] mb-2" style={{ color: "#94A3B8" }}>
                    Our team will reach out within 24 hours.
                  </p>
                  {leadId && (
                    <p className="text-[12px] font-mono" style={{ color: "#64748B" }}>
                      Reference: <span style={{ color: "#2563EB" }}>{leadId}</span>
                    </p>
                  )}
                  <button
                    onClick={() => { setSent(false); setLeadId(null); }}
                    className="mt-6 text-[13px] font-medium transition-colors"
                    style={{ color: "#2563EB" }}
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Honeypot */}
                  <input
                    type="text" tabIndex={-1} autoComplete="off" value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    className="absolute opacity-0 pointer-events-none w-0 h-0 overflow-hidden" aria-hidden="true"
                  />

                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-start gap-2 p-3 rounded-xl text-[13px]"
                      style={{ background: "rgba(220,38,38,0.08)", border: "1px solid rgba(220,38,38,0.20)", color: "#F87171" }}
                    >
                      <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                      <span>{error}</span>
                    </motion.div>
                  )}

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label>Full Name *</Label>
                      <input type="text" required value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="John Doe" className="ng-input" />
                    </div>
                    <div>
                      <Label>Email Address *</Label>
                      <input type="email" required value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="john@company.com" className="ng-input" />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label>Phone Number</Label>
                      <input type="tel" value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        placeholder="+91 9876543210" className="ng-input" />
                    </div>
                    <div>
                      <Label>Budget Range</Label>
                      <select value={form.budget}
                        onChange={(e) => setForm({ ...form, budget: e.target.value })}
                        className="ng-input" style={{ appearance: "none", background: "#121A2B", color: form.budget ? "#ffffff" : "#64748B" }}
                      >
                        <option value="">Select budget</option>
                        <option value="5k-15k">$5K – $15K</option>
                        <option value="15k-50k">$15K – $50K</option>
                        <option value="50k-100k">$50K – $100K</option>
                        <option value="100k+">$100K+</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <Label>Service Needed</Label>
                    <div className="flex flex-wrap gap-2">
                      {services.map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setForm({ ...form, service: s })}
                          className="px-3 py-1.5 rounded-lg text-[12px] font-medium transition-all"
                          style={{
                            background: form.service === s ? "rgba(37,99,235,0.12)" : "rgba(255,255,255,0.04)",
                            border: form.service === s ? "1px solid rgba(37,99,235,0.30)" : "1px solid rgba(255,255,255,0.06)",
                            color: form.service === s ? "#2563EB" : "#94A3B8",
                          }}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label>Project Details *</Label>
                    <textarea
                      required rows={4} value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Tell us about your project, goals, and timeline..."
                      className="ng-textarea"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={sending}
                    className="ng-btn-primary w-full justify-center"
                    style={{ height: "52px" }}
                  >
                    {sending ? (
                      <>
                        <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Send Message
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <p className="text-[12px] text-center" style={{ color: "#64748B" }}>
                    We respond within 24 hours. No spam, ever.
                  </p>
                </form>
              )}
            </div>
          </motion.div>

          {/* Right: Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            {[
              { icon: Mail,   label: "Email Us",  value: COMPANY.email,                href: `mailto:${COMPANY.email}` },
              { icon: Phone,  label: "Call Us",   value: COMPANY.phone,                href: `tel:${COMPANY.phone}` },
              { icon: MapPin, label: "Location",  value: "India (Remote-First)",        href: "#" },
            ].map(({ icon: Icon, label, value, href }) => (
              <a
                key={label}
                href={href}
                className="flex items-center gap-4 rounded-[20px] p-5 transition-all group"
                style={{
                  background: "#121A2B",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(37,99,235,0.22)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"; }}
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: "rgba(37,99,235,0.10)", border: "1px solid rgba(37,99,235,0.20)" }}
                >
                  <Icon className="w-5 h-5" style={{ color: "#2563EB" }} />
                </div>
                <div className="flex-1">
                  <div className="text-[11px] font-medium mb-0.5" style={{ color: "#64748B" }}>{label}</div>
                  <div className="text-[14px] font-medium text-white">{value}</div>
                </div>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" style={{ color: "#64748B" }} />
              </a>
            ))}

            {/* Social */}
            <div
              className="rounded-[20px] p-5"
              style={{ background: "#121A2B", border: "1px solid rgba(255,255,255,0.06)" }}
            >
              <p className="text-[11px] font-medium uppercase tracking-[0.10em] mb-4" style={{ color: "#64748B" }}>
                Connect With Us
              </p>
              <div className="flex gap-3">
                {[
                  { icon: FaLinkedinIn, href: COMPANY.social.linkedin, label: "LinkedIn" },
                  { icon: FaTwitter,   href: COMPANY.social.twitter,  label: "Twitter" },
                  { icon: FaGithub,    href: COMPANY.social.github,   label: "GitHub" },
                ].map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-[13px] font-medium transition-all"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.06)",
                      color: "#94A3B8",
                    }}
                    onMouseEnter={e => { e.currentTarget.style.color = "#ffffff"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.14)"; }}
                    onMouseLeave={e => { e.currentTarget.style.color = "#94A3B8"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"; }}
                  >
                    <Icon className="w-4 h-4" />
                    {label}
                  </a>
                ))}
              </div>
            </div>

            {/* Availability */}
            <div
              className="rounded-[20px] p-5"
              style={{
                background: "#121A2B",
                border: "1px solid rgba(37,99,235,0.15)",
              }}
            >
              <div className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse shrink-0 mt-1.5" />
                <div>
                  <div className="text-white font-medium text-[14px] mb-1">Available right now</div>
                  <p className="text-[13px] leading-[1.6]" style={{ color: "#94A3B8" }}>
                    Our team typically responds within 2–4 hours during business hours (IST). Guaranteed response within 24 hours.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
