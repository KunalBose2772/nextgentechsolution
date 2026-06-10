"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, ArrowRight, AlertCircle } from "lucide-react";
import { FaLinkedinIn, FaTwitter, FaGithub } from "react-icons/fa";
import SectionHeader from "@/components/ui/SectionHeader";
import SectionGlow from "@/components/ui/SectionGlow";
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
      className="relative overflow-hidden py-16 md:py-24 z-30" 
      id="contact"
      style={{
        background: "linear-gradient(180deg, #0A0A0B 0%, #030303 100%)",
      }}
    >
      <SectionGlow />

      {/* Technical Dotted Grid Background */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.03] z-0 ng-grid-bg" 
      />
      
      {/* Ambient Glows */}
      <div 
        className="absolute top-[10%] right-[-15%] w-[450px] h-[450px] rounded-full pointer-events-none opacity-[0.10] blur-[90px] z-0" 
        style={{ background: "radial-gradient(circle, #3B82F6 0%, transparent 70%)" }} 
      />
      <div 
        className="absolute bottom-[10%] left-[-15%] w-[500px] h-[500px] rounded-full pointer-events-none opacity-[0.08] blur-[100px] z-0" 
        style={{ background: "radial-gradient(circle, #06B6D4 0%, transparent 70%)" }} 
      />

      <div className="ng-container relative z-10">
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
              className="rounded-2xl p-8"
              style={{
                background: "rgba(255, 255, 255, 0.02)",
                border: "1px solid rgba(255, 255, 255, 0.05)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
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
                    style={{ background: "rgba(var(--accent-primary-rgb),0.12)", border: "1px solid rgba(var(--accent-primary-rgb),0.25)" }}
                  >
                    <Send className="w-6 h-6" style={{ color: "var(--accent-primary)" }} />
                  </div>
                  <h3
                    className="text-white font-bold text-[20px] mb-2"
                    style={{ fontFamily: "Sora, sans-serif" }}
                  >
                    Message Sent!
                  </h3>
                  <p className="text-[14px] mb-2" style={{ color: "#94A3B8" }}>
                    Our team will reach out within 24 hours.
                  </p>
                  {leadId && (
                    <p className="text-[12px] font-mono" style={{ color: "#64748B" }}>
                      Reference: <span style={{ color: "var(--accent-primary)" }}>{leadId}</span>
                    </p>
                  )}
                  <button
                    onClick={() => { setSent(false); setLeadId(null); }}
                    className="mt-6 text-[13px] font-semibold transition-colors cursor-pointer"
                    style={{ color: "var(--accent-primary)" }}
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
                        placeholder="John Doe" className="ng-input bg-black/40 border-white/5 focus:border-[#06B6D4] focus:ring-1 focus:ring-[#06B6D4] transition-all" />
                    </div>
                    <div>
                      <Label>Email Address *</Label>
                      <input type="email" required value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="john@company.com" className="ng-input bg-black/40 border-white/5 focus:border-[#06B6D4] focus:ring-1 focus:ring-[#06B6D4] transition-all" />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label>Phone Number *</Label>
                      <input type="tel" required value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        placeholder="+91 9876543210" className="ng-input bg-black/40 border-white/5 focus:border-[#06B6D4] focus:ring-1 focus:ring-[#06B6D4] transition-all" />
                    </div>
                    <div>
                      <Label>Budget Range</Label>
                      <select value={form.budget}
                        onChange={(e) => setForm({ ...form, budget: e.target.value })}
                        className="ng-input bg-black/40 border-white/5 focus:border-[#06B6D4] focus:ring-1 focus:ring-[#06B6D4] transition-all" style={{ appearance: "none", color: form.budget ? "#ffffff" : "#64748B" }}
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
                          className="px-3 py-1.5 rounded-lg text-[12px] font-semibold transition-all cursor-pointer"
                          style={{
                            background: form.service === s ? "rgba(var(--accent-primary-rgb),0.12)" : "rgba(255,255,255,0.04)",
                            border: form.service === s ? "1px solid rgba(var(--accent-primary-rgb),0.30)" : "1px solid rgba(255,255,255,0.06)",
                            color: form.service === s ? "var(--accent-primary)" : "#94A3B8",
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
                      className="ng-textarea bg-black/40 border-white/5 focus:border-[#06B6D4] focus:ring-1 focus:ring-[#06B6D4] transition-all"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={sending}
                    className="ng-btn-primary w-full justify-center cursor-pointer"
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
              <motion.a
                key={label}
                href={href}
                className="flex items-center gap-4 rounded-2xl p-5 transition-all group border"
                style={{
                  background: "rgba(255, 255, 255, 0.02)",
                  borderColor: "rgba(255, 255, 255, 0.05)",
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                }}
                whileHover={{
                  y: -4,
                  borderColor: "rgba(var(--accent-primary-rgb), 0.25)",
                  background: "rgba(255, 255, 255, 0.04)",
                  boxShadow: "0 12px 30px rgba(0, 0, 0, 0.3), 0 0 20px rgba(var(--accent-primary-rgb), 0.04)"
                }}
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: "rgba(var(--accent-primary-rgb),0.10)", border: "1px solid rgba(var(--accent-primary-rgb),0.20)" }}
                >
                  <Icon className="w-5 h-5" style={{ color: "var(--accent-primary)" }} />
                </div>
                <div className="flex-1">
                  <div className="text-[11px] font-bold mb-0.5" style={{ color: "#64748B" }}>{label}</div>
                  <div className="text-[14px] font-bold text-white" style={{ fontFamily: "Sora, sans-serif" }}>{value}</div>
                </div>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" style={{ color: "#64748B" }} />
              </motion.a>
            ))}

            {/* Social */}
            <div
              className="rounded-2xl p-5"
              style={{
                background: "rgba(255, 255, 255, 0.02)",
                border: "1px solid rgba(255, 255, 255, 0.05)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
              }}
            >
              <p className="text-[11px] font-bold uppercase tracking-[0.10em] mb-4" style={{ color: "#64748B" }}>
                Connect With Us
              </p>
              <div className="flex gap-3">
                {[
                  { icon: FaLinkedinIn, href: COMPANY.social.linkedin, label: "LinkedIn" },
                  { icon: FaTwitter,   href: COMPANY.social.twitter,  label: "Twitter" },
                  { icon: FaGithub,    href: COMPANY.social.github,   label: "GitHub" },
                ].map(({ icon: Icon, href, label }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-[13px] font-semibold transition-all border"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      borderColor: "rgba(255,255,255,0.06)",
                      color: "#94A3B8",
                    }}
                    whileHover={{
                      scale: 1.02,
                      color: "#ffffff",
                      borderColor: "rgba(var(--accent-primary-rgb),0.35)",
                      background: "rgba(var(--accent-primary-rgb),0.06)"
                    }}
                  >
                    <Icon className="w-4 h-4" />
                    {label}
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Availability */}
            <div
              className="rounded-2xl p-5"
              style={{
                background: "rgba(255, 255, 255, 0.02)",
                border: "1px solid rgba(var(--accent-primary-rgb),0.15)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
              }}
            >
              <div className="flex items-start gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse shrink-0 mt-1.5" />
                <div>
                  <div className="text-white font-bold text-[14px] mb-1" style={{ fontFamily: "Sora, sans-serif" }}>Available right now</div>
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
