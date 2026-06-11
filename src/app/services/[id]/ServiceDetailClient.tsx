"use client";

import { motion } from "framer-motion";
import { 
  CheckCircle2, ArrowRight, Mail, Phone, MapPin, Send, AlertCircle, ArrowLeft,
  Code2, Smartphone, Layers, Brain, Cloud, Server, 
  BarChart3, Palette, Zap, Settings2, LucideIcon 
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import PageHero from "@/components/common/PageHero";
import { ServiceDetail } from "@/lib/services-data";
import { COMPANY } from "@/lib/utils";

const ICON_MAP: Record<string, LucideIcon> = {
  web: Code2,
  mobile: Smartphone,
  saas: Layers,
  ai: Brain,
  cloud: Cloud,
  erp: BarChart3,
  devops: Server,
  design: Palette,
  transform: Zap,
  support: Settings2,
};

export default function ServiceDetailClient({ service }: { service: ServiceDetail }) {
  const Icon = ICON_MAP[service.iconName] || Code2;
  const [form, setForm] = useState({ name: "", email: "", phone: "", budget: "", message: "" });
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
        body: JSON.stringify({ ...form, service: service.title }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Something went wrong. Please try again.");
        setSending(false);
        return;
      }
      setLeadId(data.leadId ?? null);
      setSent(true);
      setForm({ name: "", email: "", phone: "", budget: "", message: "" });
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="bg-[#050505] min-h-screen text-slate-300">
      <PageHero
        badge={service.title}
        title={service.headline.split(" ").slice(0, 2).join(" ")}
        titleHighlight={service.headline.split(" ").slice(2, 4).join(" ")}
        titleOutline={service.headline.split(" ").slice(4).join(" ")}
        description={service.description}
        gradient={service.gradient}
        accentColor={service.accent}
      >
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-slate-450 hover:text-white transition-colors text-xs font-semibold px-4 py-2 rounded-full border border-white/5 bg-white/[0.02]"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Services
          </Link>
          <a
            href="#estimate-calculator"
            className="inline-flex items-center gap-2 text-xs font-semibold text-white px-5 py-2.5 rounded-full shadow-lg transition-all"
            style={{
              background: `linear-gradient(135deg, ${service.accent}cc, ${service.accent}88)`,
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = "none";
            }}
          >
            View Pricing Tiers
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </PageHero>

      {/* 1. Key Features Grid */}
      <section className="py-20 border-t border-white/5 relative">
        <div className="absolute inset-0 pointer-events-none opacity-[0.02] ng-grid-bg" />
        <div className="ng-container relative z-10">
          <div className="text-center mb-14">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-white/10 bg-white/[0.02] text-slate-400 text-[10px] font-bold uppercase tracking-wider mb-4">
              Core Capabilities
            </span>
            <h2 className="text-white font-extrabold text-2xl sm:text-3xl md:text-4xl tracking-tight font-sora">
              What We Offer in {service.title}
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {service.features.map((feat, idx) => (
              <motion.div
                key={feat}
                className="group rounded-2xl p-6 border transition-all duration-300 relative overflow-hidden"
                style={{
                  background: "rgba(255, 255, 255, 0.02)",
                  borderColor: "rgba(255, 255, 255, 0.05)",
                }}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                whileHover={{
                  y: -4,
                  borderColor: `${service.accent}30`,
                  boxShadow: `0 15px 30px rgba(0, 0, 0, 0.3), 0 0 15px ${service.accent}05`
                }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{
                    backgroundColor: `${service.accent}12`,
                    border: `1px solid ${service.accent}20`
                  }}
                >
                  <CheckCircle2 className="w-5 h-5" style={{ color: service.accent }} />
                </div>
                <h4 className="text-white font-bold text-[15px] mb-2 font-sora">{feat.split(" & ")[0]}</h4>
                <p className="text-slate-450 text-[13px] leading-relaxed">{feat}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Tech Stack Section */}
      <section className="py-16 border-t border-white/5 bg-[#08080A]">
        <div className="ng-container text-center">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-white/10 bg-white/[0.02] text-slate-400 text-[10px] font-bold uppercase tracking-wider mb-4">
            Technology Stack
          </span>
          <h3 className="text-white font-extrabold text-xl sm:text-2xl mb-8 font-sora">
            Built with Modern, Scalable Technologies
          </h3>
          <div className="flex flex-wrap justify-center gap-3 max-w-2xl mx-auto">
            {service.techStack.map((tech) => (
              <span
                key={tech}
                className="px-5 py-2.5 rounded-full border border-white/5 bg-white/[0.01] text-white font-semibold text-xs sm:text-sm tracking-wide transition-all"
                style={{
                  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05)"
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = service.accent;
                  e.currentTarget.style.boxShadow = `0 0 10px ${service.accent}15`;
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.05)";
                  e.currentTarget.style.boxShadow = "inset 0 1px 0 rgba(255,255,255,0.05)";
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Our Process Workflow */}
      <section className="py-20 border-t border-white/5 relative">
        <div className="ng-container">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-white/10 bg-white/[0.02] text-slate-400 text-[10px] font-bold uppercase tracking-wider mb-4">
              Our Process
            </span>
            <h2 className="text-white font-extrabold text-2xl sm:text-3xl md:text-4xl tracking-tight font-sora">
              How We Deliver Success
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {service.process.map((step, idx) => (
              <motion.div
                key={step.step}
                className="relative p-6 rounded-2xl border"
                style={{
                  background: "rgba(255, 255, 255, 0.01)",
                  borderColor: "rgba(255, 255, 255, 0.04)"
                }}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <div
                  className="absolute -top-6 left-6 font-extrabold text-2xl font-mono bg-[#050505] px-3.5"
                  style={{ color: service.accent }}
                >
                  {step.step}
                </div>
                <h4 className="text-white font-bold text-[16px] mt-2 mb-2 font-sora">{step.title}</h4>
                <p className="text-slate-450 text-[13px] leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Pricing Tiers */}
      <section className="py-20 border-t border-white/5 bg-[#08080A]" id="estimate-calculator">
        <div className="ng-container">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-white/10 bg-white/[0.02] text-slate-400 text-[10px] font-bold uppercase tracking-wider mb-4">
              Pricing & Budgets
            </span>
            <h2 className="text-white font-extrabold text-2xl sm:text-3xl md:text-4xl tracking-tight font-sora">
              Transparent Estimate Estimates
            </h2>
            <p className="text-slate-400 text-[13px] sm:text-sm mt-3 max-w-lg mx-auto">
              Choose a tier that fits your project needs. All prices are transparent estimations.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 items-stretch">
            {service.pricing.map((tier, idx) => (
              <motion.div
                key={tier.tier}
                className="group rounded-3xl p-8 border flex flex-col justify-between"
                style={{
                  background: "rgba(255, 255, 255, 0.02)",
                  borderColor: idx === 1 ? `${service.accent}30` : "rgba(255, 255, 255, 0.05)",
                  boxShadow: idx === 1 ? `0 15px 35px rgba(0, 0, 0, 0.4), 0 0 15px ${service.accent}05` : "none"
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
              >
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-white font-bold text-[18px] font-sora">{tier.tier}</span>
                    {idx === 1 && (
                      <span
                        className="text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider text-black"
                        style={{ backgroundColor: service.accent }}
                      >
                        Popular Choice
                      </span>
                    )}
                  </div>
                  <div className="text-2xl font-extrabold text-white mb-2 font-sora">{tier.price}</div>
                  <p className="text-slate-450 text-xs mb-6 leading-relaxed">{tier.desc}</p>
                  
                  <div className="space-y-3 mb-8 pt-6 border-t border-white/[0.04]">
                    {tier.features.map((feat) => (
                      <div key={feat} className="flex items-center gap-2.5 text-xs text-slate-450">
                        <CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: service.accent }} />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <a
                  href="#contact-project-form"
                  className="w-full h-11 rounded-xl font-bold text-xs text-white border flex items-center justify-center gap-1.5 transition-all"
                  style={{
                    borderColor: idx === 1 ? service.accent : "rgba(255,255,255,0.08)",
                    backgroundColor: idx === 1 ? `${service.accent}15` : "transparent",
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.backgroundColor = service.accent;
                    e.currentTarget.style.color = "#000000";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.backgroundColor = idx === 1 ? `${service.accent}15` : "transparent";
                    e.currentTarget.style.color = "#ffffff";
                  }}
                >
                  Select Package
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Custom Service Contact Form */}
      <section className="py-20 border-t border-white/5 relative" id="contact-project-form">
        <div className="ng-container">
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            {/* Left Info */}
            <div className="lg:col-span-5 space-y-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-white/10 bg-white/[0.02] text-slate-400 text-[10px] font-bold uppercase tracking-wider">
                Start Project
              </span>
              <h2 className="text-white font-extrabold text-2xl sm:text-3xl md:text-4xl tracking-tight leading-tight font-sora">
                Let&apos;s Build Your Custom {service.title} Solution
              </h2>
              <p className="text-slate-450 text-[13.5px] leading-relaxed">
                Provide some initial details regarding your requirements and budget range, and our technical architects will get back to you with a comprehensive scope report in 24 hours.
              </p>

              <div className="space-y-4 pt-6 border-t border-white/[0.04]">
                {[
                  { icon: Mail, label: "Email Us", value: COMPANY.email, href: `mailto:${COMPANY.email}` },
                  { icon: Phone, label: "Call Us", value: COMPANY.phone, href: `tel:${COMPANY.phone}` },
                  { icon: MapPin, label: "Address", value: COMPANY.location, href: "#" },
                ].map(({ icon: Icon, label, value, href }) => (
                  <a key={label} href={href} className="flex items-center gap-3.5 group">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border"
                      style={{
                        borderColor: "rgba(255,255,255,0.05)",
                        backgroundColor: "rgba(255,255,255,0.01)"
                      }}
                    >
                      <Icon className="w-4 h-4 text-slate-450 group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <div className="text-[10px] font-bold text-slate-500">{label}</div>
                      <div className="text-[13.5px] font-semibold text-white font-sora">{value}</div>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Right Form */}
            <div className="lg:col-span-7">
              <div
                className="rounded-3xl p-8 border backdrop-blur-md"
                style={{
                  background: "rgba(255, 255, 255, 0.02)",
                  borderColor: "rgba(255, 255, 255, 0.05)"
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
                      style={{
                        backgroundColor: `${service.accent}12`,
                        border: `1px solid ${service.accent}20`
                      }}
                    >
                      <Send className="w-6 h-6" style={{ color: service.accent }} />
                    </div>
                    <h3 className="text-white font-bold text-[20px] mb-2 font-sora">Project Request Sent!</h3>
                    <p className="text-[14px] text-slate-400 mb-2">
                      Our system registered your lead details. Our {service.title} engineering leads will review it shortly.
                    </p>
                    {leadId && (
                      <p className="text-[12px] font-mono text-slate-500">
                        Reference Code: <span style={{ color: service.accent }}>{leadId}</span>
                      </p>
                    )}
                    <button
                      onClick={() => { setSent(false); setLeadId(null); }}
                      className="mt-6 text-[13px] font-semibold cursor-pointer"
                      style={{ color: service.accent }}
                    >
                      Submit another inquiry
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    {error && (
                      <div className="flex items-center gap-2 p-3 rounded-xl bg-red-500/5 border border-red-500/20 text-xs text-red-400">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span>{error}</span>
                      </div>
                    )}

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-500 mb-1.5 ml-0.5">Full Name *</label>
                        <input
                          type="text" required value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          placeholder="Aryan Roy"
                          className="w-full h-11 px-3.5 rounded-xl bg-black/40 border border-white/5 focus:border-[#06B6D4] text-xs text-white placeholder-slate-600 outline-none transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-500 mb-1.5 ml-0.5">Email Address *</label>
                        <input
                          type="email" required value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          placeholder="aryan@organization.com"
                          className="w-full h-11 px-3.5 rounded-xl bg-black/40 border border-white/5 focus:border-[#06B6D4] text-xs text-white placeholder-slate-600 outline-none transition-all"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-500 mb-1.5 ml-0.5">Phone Number *</label>
                        <input
                          type="tel" required value={form.phone}
                          onChange={(e) => setForm({ ...form, phone: e.target.value })}
                          placeholder="+91 9031806381"
                          className="w-full h-11 px-3.5 rounded-xl bg-black/40 border border-white/5 focus:border-[#06B6D4] text-xs text-white placeholder-slate-600 outline-none transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-500 mb-1.5 ml-0.5">Estimated Budget</label>
                        <select
                          value={form.budget}
                          onChange={(e) => setForm({ ...form, budget: e.target.value })}
                          className="w-full h-11 px-3.5 rounded-xl bg-black/40 border border-white/5 focus:border-[#06B6D4] text-xs outline-none transition-all"
                          style={{ color: form.budget ? "#ffffff" : "#64748B" }}
                        >
                          <option value="">Select range</option>
                          <option value="startup">Startup Tier (Under ₹4 Lakhs)</option>
                          <option value="growth">Growth Tier (₹4 - ₹10 Lakhs)</option>
                          <option value="enterprise">Enterprise Tier (Custom Quote)</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-500 mb-1.5 ml-0.5">Project Specifics *</label>
                      <textarea
                        required rows={4} value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        placeholder={`Tell us about your ${service.title} project requirements, target goals, and expected delivery timeline...`}
                        className="w-full p-3.5 rounded-xl bg-black/40 border border-white/5 focus:border-[#06B6D4] text-xs text-white placeholder-slate-600 outline-none transition-all resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={sending}
                      className="w-full h-12 rounded-xl text-white font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
                      style={{
                        background: `linear-gradient(135deg, ${service.accent}cc, ${service.accent}88)`,
                      }}
                    >
                      {sending ? (
                        <>
                          <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                          Submitting Inquiry...
                        </>
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5" />
                          Request Custom Proposal
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
