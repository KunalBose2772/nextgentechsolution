"use client";

import { useState, useEffect } from "react";
import { Mail, Phone, MapPin, Send, ArrowRight, AlertCircle } from "lucide-react";
import { FaLinkedinIn, FaTwitter, FaGithub } from "react-icons/fa";
import { COMPANY } from "@/lib/utils";

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
    <section className="py-16 bg-white text-slate-850 border-t border-slate-200/50" id="contact">
      <div className="max-w-7xl mx-auto px-4">
        
        <div className="text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-2 block">
            CONTACT US
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Let's Build Something Great Together
          </h2>
          <p className="text-slate-500 mt-2 max-w-xl mx-auto text-sm leading-relaxed">
            Ready to transform your vision into reality? Reach out and let's discuss your project.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          
          {/* Form */}
          <div className="bg-slate-50 border border-slate-200/60 rounded-2xl p-6 sm:p-8">
            {sent ? (
              <div className="text-center py-12">
                <div className="w-14 h-14 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center mx-auto mb-4 text-blue-600">
                  <Send className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Message Sent!</h3>
                <p className="text-xs text-slate-500 mb-2">
                  Our team will reach out within 24 hours.
                </p>
                {leadId && (
                  <p className="text-[10px] text-slate-400 font-mono">
                    Reference: <span className="text-blue-600 font-bold">{leadId}</span>
                  </p>
                )}
                <button
                  onClick={() => { setSent(false); setLeadId(null); }}
                  className="mt-6 text-xs font-bold text-blue-600 hover:underline"
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
                  <div className="flex items-start gap-2 p-3 rounded-xl text-xs bg-red-50 border border-red-200 text-red-600">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>{error}</span>
                  </div>
                )}

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-2">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="John Doe"
                      className="w-full bg-white border border-slate-200 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 rounded-lg px-4 py-2 text-xs outline-none text-slate-800 transition-all h-10"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-2">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="john@company.com"
                      className="w-full bg-white border border-slate-200 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 rounded-lg px-4 py-2 text-xs outline-none text-slate-800 transition-all h-10"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-2">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="+91 9876543210"
                      className="w-full bg-white border border-slate-200 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 rounded-lg px-4 py-2 text-xs outline-none text-slate-800 transition-all h-10"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-2">Budget Range</label>
                    <select
                      value={form.budget}
                      onChange={(e) => setForm({ ...form, budget: e.target.value })}
                      className="w-full bg-white border border-slate-200 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 rounded-lg px-4 py-2 text-xs outline-none text-slate-500 transition-all h-10"
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
                  <label className="block text-xs font-bold text-slate-500 mb-2">Service Needed</label>
                  <div className="flex flex-wrap gap-2">
                    {services.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setForm({ ...form, service: s })}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                          form.service === s
                            ? "bg-blue-50 border-blue-600 text-blue-600"
                            : "bg-white border-slate-200 text-slate-500 hover:border-slate-350"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-2">Project Details *</label>
                  <textarea
                    required
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Tell us about your project, goals, and timeline..."
                    className="w-full bg-white border border-slate-200 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 rounded-lg px-4 py-2.5 text-xs outline-none text-slate-800 transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={sending}
                  className="w-full bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white font-bold text-xs h-11 rounded-lg flex items-center justify-center gap-2 transition-all shadow-sm"
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
                  className="flex items-center gap-4 bg-slate-50 border border-slate-200/60 hover:border-slate-300 rounded-2xl p-5 transition-all group"
                >
                  <div className="w-11 h-11 rounded-xl bg-white border border-slate-200/60 flex items-center justify-center shrink-0 text-blue-600">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{label}</div>
                    <div className="text-xs font-bold text-slate-800 mt-0.5">{value}</div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 transition-transform group-hover:translate-x-1" />
                </a>
              ))}
            </div>

            <div className="bg-slate-50 border border-slate-200/60 rounded-2xl p-5">
              <p className="text-[10px] font-bold text-slate-450 uppercase tracking-wider mb-4">
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
                    className="flex items-center gap-2 bg-white border border-slate-200 hover:border-slate-300 text-slate-500 hover:text-slate-800 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all"
                  >
                    <Icon className="w-4 h-4" />
                    {label}
                  </a>
                ))}
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200/60 rounded-2xl p-5 flex items-start gap-3">
              <span className="w-2 h-2 rounded-full bg-green-500 shrink-0 mt-1.5" />
              <div>
                <div className="text-slate-850 font-bold text-xs">Available right now</div>
                <p className="text-[11px] leading-relaxed text-slate-500 mt-1">
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
