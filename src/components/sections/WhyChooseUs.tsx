"use client";

import Link from "next/link";
import {
  Zap, Shield, Target, Code2, Globe, Lock,
  ArrowRight, CheckCircle2, Sparkles, BarChart2, Clock3, DollarSign
} from "lucide-react";

const advantages = [
  {
    icon: Zap,
    title: "Lightning-Fast Delivery",
    desc: "Agile sprints designed to launch MVPs within weeks, not months.",
    accent: "#06B6D4",
    stat: "3× faster",
    statLabel: "time-to-market",
  },
  {
    icon: Shield,
    title: "Enterprise-Grade Security",
    desc: "ISO-aligned protocols, end-to-end encryption, and zero-trust architecture.",
    accent: "#3B82F6",
    stat: "99.9%",
    statLabel: "uptime SLA",
  },
  {
    icon: Target,
    title: "ROI-Driven Engineering",
    desc: "Every feature maps to measurable outcomes — conversions, retention, and revenue.",
    accent: "#8B5CF6",
    stat: "240%",
    statLabel: "avg. client ROI",
  },
  {
    icon: Globe,
    title: "Global Delivery Excellence",
    desc: "Teams across time zones ensuring continuous progress and rapid iteration.",
    accent: "#10B981",
    stat: "15+",
    statLabel: "countries served",
  },
  {
    icon: Code2,
    title: "Modern Tech Stack",
    desc: "Next.js, React, Python, AWS, Kubernetes — battle-tested for scale.",
    accent: "#F59E0B",
    stat: "30+",
    statLabel: "core technologies",
  },
  {
    icon: Lock,
    title: "Full IP Ownership",
    desc: "All code, designs, and assets transfer to you completely upon delivery.",
    accent: "#EF4444",
    stat: "100%",
    statLabel: "IP transferred",
  },
];

const comparisons = [
  { label: "Delivery Speed", us: "2–8 weeks", them: "3–6 months" },
  { label: "Communication", us: "Daily standups", them: "Weekly emails" },
  { label: "Code Quality", us: "Peer-reviewed + CI", them: "Variable" },
  { label: "Post-Launch Support", us: "30 days free", them: "Paid only" },
  { label: "IP Ownership", us: "Fully yours", them: "Often retained" },
];

export default function WhyChooseUs() {
  return (
    <section
      className="relative overflow-hidden py-20 md:py-28"
      id="why-choose-us"
      style={{
        background: "linear-gradient(160deg, #020209 0%, #060612 40%, #020209 100%)",
      }}
    >
      {/* Background effects */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[400px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">

        {/* ── Header ── */}
        <div className="text-center max-w-2xl mx-auto mb-16 md:mb-20">
          <span className="inline-block text-[10.5px] font-bold uppercase tracking-widest text-cyan-400 mb-4 px-3 py-1 rounded-full border border-cyan-400/20 bg-cyan-400/5">
            NEXTGEN ADVANTAGE
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
            Why Global Leaders{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              Choose NextGen
            </span>
          </h2>
          <p className="text-slate-400 text-sm leading-relaxed">
            World-class engineering talent, enterprise security, and transparent delivery — engineered to maximize the ROI of your technology investments.
          </p>
        </div>

        {/* ── 6 Advantage Cards ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 mb-16">
          {advantages.map((adv, idx) => {
            const Icon = adv.icon;
            return (
              <div
                key={idx}
                className="relative group rounded-2xl p-6 border border-white/[0.07] hover:border-white/[0.14] transition-all duration-300 hover:-translate-y-1"
                style={{
                  background: "rgba(255,255,255,0.025)",
                  backdropFilter: "blur(12px)",
                }}
              >
                {/* Hover glow */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at 30% 30%, ${adv.accent}10 0%, transparent 65%)`,
                  }}
                />

                {/* Top row: icon + stat */}
                <div className="flex items-start justify-between mb-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: `${adv.accent}18`, border: `1px solid ${adv.accent}30` }}
                  >
                    <Icon className="w-5 h-5" style={{ color: adv.accent }} />
                  </div>
                  <div className="text-right">
                    <div
                      className="text-xl font-black leading-none tracking-tight"
                      style={{ color: adv.accent }}
                    >
                      {adv.stat}
                    </div>
                    <div className="text-[9px] font-bold uppercase tracking-wider text-slate-500 mt-0.5">
                      {adv.statLabel}
                    </div>
                  </div>
                </div>

                <h3 className="text-sm font-bold text-white mb-2 relative z-10">
                  {adv.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed relative z-10">
                  {adv.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* ── Comparison Table + CTA ── */}
        <div className="grid lg:grid-cols-2 gap-8 items-start">

          {/* Comparison table */}
          <div
            className="rounded-2xl border border-white/[0.08] overflow-hidden"
            style={{ background: "rgba(255,255,255,0.02)" }}
          >
            <div className="px-6 py-4 border-b border-white/[0.06]">
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                How We Compare
              </span>
            </div>
            {/* Header row */}
            <div className="grid grid-cols-3 px-6 py-3 border-b border-white/[0.04]">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Factor</span>
              <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider text-center">NextGen</span>
              <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider text-center">Typical Agency</span>
            </div>
            {comparisons.map((row, i) => (
              <div
                key={i}
                className="grid grid-cols-3 px-6 py-3.5 border-b border-white/[0.03] last:border-0"
              >
                <span className="text-xs text-slate-400 font-medium">{row.label}</span>
                <span className="text-xs text-emerald-400 font-bold text-center">{row.us}</span>
                <span className="text-xs text-slate-600 text-center">{row.them}</span>
              </div>
            ))}
          </div>

          {/* CTA Block */}
          <div className="flex flex-col gap-6">
            {/* Metric Pills */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: BarChart2, value: "150+", label: "Projects", color: "#06B6D4" },
                { icon: Clock3, value: "98%", label: "On Time", color: "#10B981" },
                { icon: DollarSign, value: "4.9★", label: "Rated", color: "#F59E0B" },
              ].map((m, i) => {
                const MIcon = m.icon;
                return (
                  <div
                    key={i}
                    className="rounded-2xl p-4 border border-white/[0.07] text-center"
                    style={{ background: "rgba(255,255,255,0.02)" }}
                  >
                    <MIcon className="w-4 h-4 mx-auto mb-2" style={{ color: m.color }} />
                    <div className="text-lg font-black text-white leading-none mb-1">{m.value}</div>
                    <div className="text-[9px] text-slate-500 font-bold uppercase tracking-wider">{m.label}</div>
                  </div>
                );
              })}
            </div>

            {/* Text + CTA */}
            <div
              className="rounded-2xl p-6 border border-cyan-500/20"
              style={{ background: "linear-gradient(135deg, rgba(6,182,212,0.06) 0%, rgba(59,130,246,0.04) 100%)" }}
            >
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-cyan-400">
                  Start Your Project
                </span>
              </div>
              <h3 className="text-white font-bold text-base mb-2 leading-snug">
                Ready to accelerate growth without compromising quality?
              </h3>
              <p className="text-slate-400 text-xs leading-relaxed mb-5">
                Book a free consultation. We&apos;ll analyze your requirements and deliver a comprehensive proposal within 24 hours.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="#contact"
                  className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs px-6 py-3 rounded-full transition-all shadow-[0_4px_20px_rgba(6,182,212,0.25)] hover:shadow-[0_4px_24px_rgba(6,182,212,0.4)]"
                >
                  Get a Free Consultation <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/case-studies"
                  className="inline-flex items-center justify-center gap-2 border border-white/10 text-white hover:border-white/20 font-bold text-xs px-6 py-3 rounded-full transition-all hover:bg-white/5"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                  See Case Studies
                </Link>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
