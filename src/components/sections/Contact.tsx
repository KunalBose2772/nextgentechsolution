"use client";

import { useState, useEffect } from "react";
import { Mail, Phone, MapPin, Send, ArrowRight, AlertCircle } from "lucide-react";
import { FaLinkedinIn, FaTwitter, FaGithub } from "react-icons/fa";
import { COMPANY } from "@/lib/utils";
import SectionHeader from "@/components/ui/SectionHeader";

const services = [
  "Web Development", "Mobile App", "SaaS Platform",
  "AI Solutions", "Cloud / DevOps", "UI/UX Design",
  "ERP / CRM", "Digital Transformation",
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", service: "", budget: "", message: "" });
  const [website, setWebsite] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [leadId, setLeadId] = useState<string | null>(null);

  useEffect(() => {
    const checkPlannedScope = () => {
      const saved = localStorage.getItem("nextgen_planned_scope");
      if (saved) {
        try {
          const scope = JSON.parse(saved);
          setForm(prev => ({
            ...prev,
            service: scope.service || prev.service,
            budget: scope.budget || prev.budget,
            message: `Locked Blueprint Specs:\n• ID: ${scope.blueprintId}\n• Primary: ${scope.service}\n• Scale: ${scope.scale}\n• Timeline Velocity: ${scope.velocity}\n• Est. Hours: ${scope.hours} hrs\n• Estimated Cost: ${scope.costRange}\n\nLet's discuss my custom requirement details: `
          }));
          // Remove to avoid repeated pre-population on page navigation/refresh
          localStorage.removeItem("nextgen_planned_scope");
        } catch (e) {
          console.error("Error parsing planned scope", e);
        }
      }
    };

    checkPlannedScope();
    window.addEventListener("nextgen_scope_locked", checkPlannedScope);
    return () => window.removeEventListener("nextgen_scope_locked", checkPlannedScope);
  }, []);

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
    <section className="py-24 border-t relative overflow-hidden" style={{ background: "var(--bg-primary)", borderColor: "var(--border-subtle)" }} id="contact">
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%] bg-[radial-gradient(circle_at_center,_rgba(6,182,212,0.02)_0%,_transparent_70%)] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        
        <SectionHeader
          badge="CONTACT US"
          title="Let's Build Something Great"
          titleHighlight="Together"
          description="Ready to transform your vision into reality? Reach out and let's discuss your project."
          align="center"
          theme="dark"
          className="mb-16"
        />

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          
          {/* Form */}
          <div className="bg-[#0a0a0c]/60 border border-white/[0.08] rounded-2xl p-6 sm:p-8 backdrop-blur-md">
            {sent ? (
              <div className="text-center py-12">
                <div className="w-14 h-14 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mx-auto mb-4 text-cyan-400">
                  <Send className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Message Sent!</h3>
                <p className="text-xs text-slate-400 mb-2">
                  Our team will reach out within 24 hours.
                </p>
                {leadId && (
                  <p className="text-[10px] text-slate-500 font-mono">
                    Reference: <span className="text-cyan-400 font-bold">{leadId}</span>
                  </p>
                )}
                <button
                  onClick={() => { setSent(false); setLeadId(null); }}
                  className="mt-6 text-xs font-bold text-cyan-400 hover:underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Honeypot */}
                <input
                  type="text" tabIndex={-1} autoComplete="off" value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  className="absolute opacity-0 pointer-events-none w-0 h-0 overflow-hidden" aria-hidden="true"
                />

                {error && (
                  <div className="flex items-start gap-2 p-3 rounded-xl text-xs bg-red-950/25 border border-red-500/25 text-red-400">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-500" />
                    <span>{error}</span>
                  </div>
                )}

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 mb-2 uppercase tracking-wider">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="John Doe"
                      className="w-full bg-slate-950 border border-white/10 focus:border-cyan-500 focus:ring-0 rounded-lg px-4 py-2 text-xs outline-none text-white transition-all h-10"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 mb-2 uppercase tracking-wider">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="john@company.com"
                      className="w-full bg-slate-950 border border-white/10 focus:border-cyan-500 focus:ring-0 rounded-lg px-4 py-2 text-xs outline-none text-white transition-all h-10"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 mb-2 uppercase tracking-wider">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="+91 9876543210"
                      className="w-full bg-slate-950 border border-white/10 focus:border-cyan-500 focus:ring-0 rounded-lg px-4 py-2 text-xs outline-none text-white transition-all h-10"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 mb-2 uppercase tracking-wider">Budget Range</label>
                    <select
                      value={form.budget}
                      onChange={(e) => setForm({ ...form, budget: e.target.value })}
                      className="w-full bg-slate-950 border border-white/10 focus:border-cyan-500 focus:ring-0 rounded-lg px-4 py-2 text-xs outline-none text-slate-400 transition-all h-10"
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
                  <label className="block text-[10px] font-bold text-slate-400 mb-2 uppercase tracking-wider">Service Needed</label>
                  <div className="flex flex-wrap gap-2">
                    {services.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setForm({ ...form, service: s })}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                          form.service === s
                            ? "bg-cyan-500/10 border-cyan-500 text-white"
                            : "bg-white/[0.02] border-white/10 text-slate-400 hover:border-white/20"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-400 mb-2 uppercase tracking-wider">Project Details *</label>
                  <textarea
                    required
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Tell us about your project, goals, and timeline..."
                    className="w-full bg-slate-950 border border-white/10 focus:border-cyan-500 focus:ring-0 rounded-lg px-4 py-2.5 text-xs outline-none text-white transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={sending}
                  className="w-full bg-white hover:bg-slate-100 disabled:opacity-50 text-slate-950 font-bold text-xs h-11 rounded-lg flex items-center justify-center gap-2 transition-all shadow-sm cursor-pointer"
                >
                  {sending ? (
                    <>
                      <div className="w-4 h-4 rounded-full border-2 border-slate-950/30 border-t-slate-950 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Info Panels */}
          <div className="space-y-6">
            <div className="space-y-4">
              {[
                { icon: Mail, label: "Email Us", value: COMPANY.email, href: `mailto:${COMPANY.email}` },
                { icon: Phone, label: "Call Us", value: COMPANY.phone, href: `tel:${COMPANY.phone}` },
                { icon: MapPin, label: "Location", value: COMPANY.location, href: "#" },
              ].map(({ icon: Icon, label, value, href }) => (
                <a
                  key={label}
                  href={href}
                  className="flex items-center gap-4 bg-[#0a0a0c]/60 border border-white/[0.08] hover:border-white/20 rounded-2xl p-5 transition-all group backdrop-blur-md"
                >
                  <div className="w-11 h-11 rounded-xl bg-slate-950 border border-white/10 flex items-center justify-center shrink-0 text-cyan-400">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{label}</div>
                    <div className="text-xs font-bold text-white mt-0.5">{value}</div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-500 transition-transform group-hover:translate-x-1 group-hover:text-white" />
                </a>
              ))}
            </div>

            <div className="bg-[#0a0a0c]/60 border border-white/[0.08] rounded-2xl p-5 backdrop-blur-md">
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-4">
                Connect With Us
              </p>
              <div className="flex flex-wrap gap-3">
                {[
                  { icon: FaLinkedinIn, href: COMPANY.social.linkedin, label: "LinkedIn" },
                  { icon: FaTwitter, href: COMPANY.social.twitter, label: "Twitter" },
                  { icon: FaGithub, href: COMPANY.social.github, label: "GitHub" },
                ].map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-slate-950 border border-white/10 hover:border-white/20 text-slate-400 hover:text-white px-4 py-2.5 rounded-xl text-xs font-semibold transition-all"
                  >
                    <Icon className="w-4 h-4" />
                    {label}
                  </a>
                ))}
              </div>
            </div>

            <div className="bg-[#0a0a0c]/60 border border-white/[0.08] rounded-2xl p-5 flex items-start gap-3 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-green-500 shrink-0 mt-1.5 animate-pulse" />
              <div>
                <div className="text-white font-bold text-xs">Available right now</div>
                <p className="text-[11px] leading-relaxed text-slate-400 mt-1">
                  Our team typically responds within 2–4 hours during business hours (IST). Guaranteed response within 24 hours.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
