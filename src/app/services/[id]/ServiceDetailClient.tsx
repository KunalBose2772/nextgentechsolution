"use client";

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
    <div className="bg-slate-50 min-h-screen text-slate-800 py-16">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Back navigation */}
        <div className="mb-6 flex flex-wrap gap-4 items-center">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-slate-650 hover:text-slate-900 transition-colors text-xs font-bold px-4 py-2 rounded-full border border-slate-200 bg-white shadow-sm"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Services
          </Link>
          <a
            href="#estimate-calculator"
            className="inline-flex items-center gap-2 text-xs font-bold text-white px-5 py-2 rounded-full shadow-md hover:opacity-95 transition-all"
            style={{
              backgroundColor: service.accent,
            }}
          >
            View Pricing Tiers
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Header/Hero area */}
        <div className="mb-16 rounded-3xl p-8 bg-white border border-slate-200/60 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <Icon className="w-6 h-6" style={{ color: service.accent }} />
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
              {service.title}
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight tracking-tight">
            {service.headline}
          </h1>
          <p className="text-slate-550 mt-4 max-w-3xl leading-relaxed text-xs sm:text-sm">
            {service.description}
          </p>
        </div>

        {/* 1. Key Features Grid */}
        <section className="py-12 border-t border-slate-200/60">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-2 block">
              CORE CAPABILITIES
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
              What We Offer in {service.title}
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {service.features.map((feat) => (
              <div
                key={feat}
                className="rounded-2xl p-6 border border-slate-200/60 bg-white hover:-translate-y-1 hover:shadow-md transition-all duration-200"
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center mb-4 border"
                  style={{
                    backgroundColor: `${service.accent}12`,
                    borderColor: `${service.accent}20`,
                  }}
                >
                  <CheckCircle2 className="w-4 h-4" style={{ color: service.accent }} />
                </div>
                <h4 className="text-slate-900 font-bold text-sm mb-2">{feat.split(" & ")[0]}</h4>
                <p className="text-slate-550 text-xs leading-relaxed">{feat}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 2. Tech Stack Section */}
        <section className="py-12 border border-slate-200/60 bg-white rounded-3xl px-6 my-12 shadow-sm">
          <div className="text-center">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-2 block">
              TECHNOLOGY STACK
            </span>
            <h3 className="text-slate-900 font-bold text-base mb-8">
              Built with Modern, Scalable Technologies
            </h3>
            <div className="flex flex-wrap justify-center gap-3 max-w-2xl mx-auto">
              {service.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-4 py-2 rounded-full border border-slate-200 bg-slate-50 text-slate-800 font-bold text-xs transition-colors hover:border-blue-600 hover:bg-white"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* 3. Our Process Workflow */}
        <section className="py-12 border-t border-slate-200/60">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-2 block">
              OUR PROCESS
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
              How We Deliver Success
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {service.process.map((step) => (
              <div
                key={step.step}
                className="relative p-6 rounded-2xl border border-slate-200/60 bg-white hover:-translate-y-1 hover:shadow-sm transition-all duration-200"
              >
                <div className="font-extrabold text-lg mb-2" style={{ color: service.accent }}>
                  {step.step}
                </div>
                <h4 className="text-slate-900 font-bold text-sm mb-2">{step.title}</h4>
                <p className="text-slate-550 text-xs leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 4. Pricing Tiers */}
        <section className="py-12 border-t border-slate-200/60 my-12" id="estimate-calculator">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-2 block">
              PRICING & BUDGETS
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
              Transparent Pricing Packages
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 items-stretch">
            {service.pricing.map((tier, idx) => (
              <div
                key={tier.tier}
                className="rounded-3xl p-8 border bg-white border-slate-200/60 flex flex-col justify-between hover:-translate-y-1 hover:shadow-sm transition-all duration-200"
              >
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-slate-900 font-bold text-sm">{tier.tier}</span>
                    {idx === 1 && (
                      <span 
                        className="text-[9px] font-bold px-2.5 py-0.5 rounded-full uppercase text-white"
                        style={{ backgroundColor: service.accent }}
                      >
                        Popular Choice
                      </span>
                    )}
                  </div>
                  <div className="text-xl font-bold text-slate-900 mb-2">{tier.price}</div>
                  <p className="text-slate-500 text-xs mb-6 leading-relaxed">{tier.desc}</p>
                  
                  <div className="space-y-3 mb-8 pt-6 border-t border-slate-100">
                    {tier.features.map((feat) => (
                      <div key={feat} className="flex items-center gap-2.5 text-xs text-slate-650">
                        <CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: service.accent }} />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <a
                  href="#contact-project-form"
                  className="w-full h-11 rounded-xl font-bold text-xs text-slate-800 border border-slate-200 bg-slate-50 hover:bg-slate-100 flex items-center justify-center gap-1.5 transition-all"
                >
                  Select Package <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* 5. Custom Service Contact Form */}
        <section className="py-12 border-t border-slate-200/60" id="contact-project-form">
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            {/* Left Info */}
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-2 block">
                START PROJECT
              </span>
              <h2 className="text-slate-900 font-extrabold text-2xl md:text-3xl leading-tight tracking-tight">
                Let's Build Your Custom {service.title} Solution
              </h2>
              <p className="text-slate-550 text-xs leading-relaxed">
                Provide some initial details regarding your requirements and budget range, and our technical architects will get back to you with a comprehensive scope report in 24 hours.
              </p>

              <div className="space-y-4 pt-6 border-t border-slate-100">
                {[
                  { icon: Mail, label: "Email Us", value: COMPANY.email, href: `mailto:${COMPANY.email}` },
                  { icon: Phone, label: "Call Us", value: COMPANY.phone, href: `tel:${COMPANY.phone}` },
                  { icon: MapPin, label: "Address", value: COMPANY.location, href: "#" },
                ].map(({ icon: Icon, label, value, href }) => (
                  <a key={label} href={href} className="flex items-center gap-3.5 group">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border border-slate-200 bg-white">
                      <Icon className="w-4 h-4 text-slate-500 group-hover:text-blue-600 transition-colors" />
                    </div>
                    <div>
                      <div className="text-[9px] font-bold text-slate-400">{label}</div>
                      <div className="text-xs font-bold text-slate-800">{value}</div>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Right Form */}
            <div className="lg:col-span-7">
              <div className="rounded-3xl p-8 border border-slate-200/60 bg-white shadow-sm">
                {sent ? (
                  <div className="text-center py-12">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 bg-blue-50 border border-blue-150 text-blue-600">
                      <Send className="w-5 h-5" />
                    </div>
                    <h3 className="text-slate-900 font-bold text-lg mb-2">Project Request Sent!</h3>
                    <p className="text-xs text-slate-500 mb-2">
                      Our system registered your lead details. Our {service.title} engineering leads will review it shortly.
                    </p>
                    {leadId && (
                      <p className="text-[10px] font-mono text-slate-400">
                        Reference Code: <span className="text-blue-600 font-bold">{leadId}</span>
                      </p>
                    )}
                    <button
                      onClick={() => { setSent(false); setLeadId(null); }}
                      className="mt-6 text-xs font-bold text-blue-600 hover:underline"
                    >
                      Submit another inquiry
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {error && (
                      <div className="flex items-center gap-2 p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-655">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span>{error}</span>
                      </div>
                    )}

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 mb-1">Full Name *</label>
                        <input
                          type="text" required value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          placeholder="Aryan Roy"
                          className="w-full h-10 px-3 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-800 outline-none focus:bg-white focus:border-blue-600"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 mb-1">Email Address *</label>
                        <input
                          type="email" required value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          placeholder="aryan@organization.com"
                          className="w-full h-10 px-3 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-800 outline-none focus:bg-white focus:border-blue-600"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 mb-1">Phone Number *</label>
                        <input
                          type="tel" required value={form.phone}
                          onChange={(e) => setForm({ ...form, phone: e.target.value })}
                          placeholder="+91 9031806381"
                          className="w-full h-10 px-3 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-800 outline-none focus:bg-white focus:border-blue-600"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 mb-1">Estimated Budget</label>
                        <select
                          value={form.budget}
                          onChange={(e) => setForm({ ...form, budget: e.target.value })}
                          className="w-full h-10 px-3 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-500 outline-none focus:bg-white focus:border-blue-600"
                        >
                          <option value="">Select range</option>
                          <option value="startup">Startup Tier (Under ₹4 Lakhs)</option>
                          <option value="growth">Growth Tier (₹4 - ₹10 Lakhs)</option>
                          <option value="enterprise">Enterprise Tier (Custom Quote)</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 mb-1">Project Specifics *</label>
                      <textarea
                        required rows={4} value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        placeholder={`Tell us about your ${service.title} project requirements, target goals, and expected delivery timeline...`}
                        className="w-full p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-800 outline-none resize-none focus:bg-white focus:border-blue-600"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={sending}
                      className="w-full h-11 bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white font-bold text-xs flex items-center justify-center gap-2 rounded-lg transition-colors cursor-pointer"
                    >
                      {sending ? "Submitting Inquiry..." : "Request Custom Proposal"}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
