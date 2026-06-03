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

export default function Contact() {
  const [form, setForm] = useState({
    name: "", email: "", phone: "", service: "", budget: "", message: "",
  });
  // Honeypot — must stay empty (bots will fill it)
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

      if (!res.ok) {
        setError(data.error ?? "Something went wrong. Please try again.");
        setSending(false);
        return;
      }

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
    <section className="section-padding relative overflow-hidden bg-[#060609]" id="contact">
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-200 h-100 bg-blue-500/4 rounded-full blur-3xl" />

      <div className="container-xl relative">
        <div className="mb-16">
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
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="glass-card rounded-3xl p-8 border border-white/8">
              {sent ? (
                <motion.div
                  className="text-center py-12"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <div className="w-16 h-16 rounded-2xl bg-green-500/20 border border-green-500/30 flex items-center justify-center mx-auto mb-4">
                    <Send className="w-7 h-7 text-green-400" />
                  </div>
                  <h3 className="text-white font-bold text-xl mb-2">Message Sent!</h3>
                  <p className="text-white/50 text-sm">
                    Our team will reach out within 24 hours. We&apos;ve sent a confirmation to your inbox.
                  </p>
                  {leadId && (
                    <p className="text-white/40 text-xs mt-2 font-mono">
                      Reference: <span className="text-blue-400">{leadId}</span>
                    </p>
                  )}
                  <button
                    onClick={() => { setSent(false); setLeadId(null); }}
                    className="mt-6 text-blue-400 text-sm hover:text-blue-300 transition-colors"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Honeypot — hidden from real users, bots fill it */}
                  <input
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    className="absolute opacity-0 pointer-events-none w-0 h-0 overflow-hidden"
                    aria-hidden="true"
                  />

                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-start gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 text-sm"
                    >
                      <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                      <span>{error}</span>
                    </motion.div>
                  )}

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="relative group">
                      <label className="block text-white/50 text-xs font-medium mb-1.5 ml-1">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="John Doe"
                        className="premium-input"
                      />
                    </div>
                    <div className="relative group">
                      <label className="block text-white/50 text-xs font-medium mb-1.5 ml-1">Email Address *</label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="john@company.com"
                        className="premium-input"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-white/50 text-xs font-medium mb-1.5 ml-1">Phone Number</label>
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        placeholder="+91 9876543210"
                        className="premium-input"
                      />
                    </div>
                    <div>
                      <label className="block text-white/50 text-xs font-medium mb-1.5 ml-1">Budget Range</label>
                      <select
                        value={form.budget}
                        onChange={(e) => setForm({ ...form, budget: e.target.value })}
                        className="premium-input"
                        style={{ appearance: "none" }}
                      >
                        <option value="">Select budget</option>
                        <option value="5k-15k">$5K - $15K</option>
                        <option value="15k-50k">$15K - $50K</option>
                        <option value="50k-100k">$50K - $100K</option>
                        <option value="100k+">$100K+</option>
                      </select>
                    </div>
                  </div>

                  {/* Service selection */}
                  <div>
                    <label className="block text-white/50 text-xs font-medium mb-2 ml-1">Service Needed</label>
                    <div className="flex flex-wrap gap-2">
                      {services.map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setForm({ ...form, service: s })}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                            form.service === s
                              ? "bg-blue-500/20 text-blue-300 border-blue-500/40"
                              : "bg-white/3 text-white/40 border-white/8 hover:border-white/20 hover:text-white/70"
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-white/50 text-xs font-medium mb-1.5 ml-1">Project Details *</label>
                    <textarea
                      required
                      rows={4}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Tell us about your project, goals, and timeline..."
                      className="premium-input resize-none"
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={sending}
                    className="w-full py-4 rounded-xl text-white font-semibold flex items-center justify-center gap-3 relative overflow-hidden"
                    style={{ background: "linear-gradient(135deg, #3b82f6, #7c3aed)" }}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    {sending ? (
                      <>
                        <div className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Send Message
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                    {/* Shimmer on hover */}
                    <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-700 pointer-events-none" />
                  </motion.button>

                  <p className="text-white/25 text-xs text-center">
                    We respond within 24 hours. No spam, ever.
                  </p>
                </form>
              )}
            </div>
          </motion.div>

          {/* Right: Contact info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {/* Info cards */}
            {[
              { icon: Mail, label: "Email Us", value: COMPANY.email, href: `mailto:${COMPANY.email}`, color: "#3b82f6" },
              { icon: Phone, label: "Call Us", value: COMPANY.phone, href: `tel:${COMPANY.phone}`, color: "#7c3aed" },
              { icon: MapPin, label: "Location", value: "India (Remote-First)", href: "#", color: "#06b6d4" },
            ].map(({ icon: Icon, label, value, href, color }) => (
              <motion.a
                key={label}
                href={href}
                className="flex items-center gap-4 p-5 glass-card rounded-2xl border border-white/5 hover:border-white/12 transition-all group"
                whileHover={{ x: 4 }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: `${color}15`, border: `1px solid ${color}25` }}
                >
                  <Icon className="w-5 h-5" style={{ color }} />
                </div>
                <div>
                  <div className="text-white/40 text-xs font-medium mb-0.5">{label}</div>
                  <div className="text-white/80 font-medium text-sm group-hover:text-white transition-colors">{value}</div>
                </div>
                <ArrowRight className="w-4 h-4 text-white/20 group-hover:text-white/50 group-hover:translate-x-1 transition-all ml-auto" />
              </motion.a>
            ))}

            {/* Social */}
            <div className="p-6 glass-card rounded-2xl border border-white/5">
              <div className="text-white/40 text-xs font-medium uppercase tracking-wide mb-4">Connect With Us</div>
              <div className="flex gap-3">
                {[
                  { icon: FaLinkedinIn, href: COMPANY.social.linkedin, label: "LinkedIn", color: "#0A66C2" },
                  { icon: FaTwitter, href: COMPANY.social.twitter, label: "Twitter", color: "#1DA1F2" },
                  { icon: FaGithub, href: COMPANY.social.github, label: "GitHub", color: "#FFFFFF" },
                ].map(({ icon: Icon, href, label }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl glass border border-white/8 text-white/50 hover:text-white text-sm font-medium transition-all hover:border-white/20 group"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <Icon className="w-4 h-4" style={{ color: "inherit" }} />
                    <span>{label}</span>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Response time */}
            <div
              className="p-5 rounded-2xl border"
              style={{
                background: "linear-gradient(135deg, rgba(59,130,246,0.06), rgba(124,58,237,0.06))",
                borderColor: "rgba(59,130,246,0.15)",
              }}
            >
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-green-400 mt-1.5 shrink-0 animate-pulse" />
                <div>
                  <div className="text-white/70 text-sm font-medium mb-1">Available right now</div>
                  <p className="text-white/40 text-xs leading-relaxed">
                    Our team typically responds within 2-4 hours during business hours (IST). Guaranteed response within 24 hours.
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
