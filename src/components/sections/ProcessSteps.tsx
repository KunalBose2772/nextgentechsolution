"use client";

import { motion } from "framer-motion";

interface ProcessStep {
  step: string;
  title: string;
  desc: string;
}

// Icon sets per step index
const stepIcons = [
  // Step 1 - Discovery / Analysis
  (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="w-6 h-6">
      <circle cx="11" cy="11" r="8" />
      <path d="M21 21l-4.35-4.35" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  // Step 2 - Build / Engineering
  (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="w-6 h-6">
      <path d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  // Step 3 - Test / Review
  (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="w-6 h-6">
      <path d="M9 11l3 3L22 4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  // Step 4 - Launch / Scale
  (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="w-6 h-6">
      <path d="M22 2L11 13" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M22 2L15 22l-4-9-9-4 19-7z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
];

export default function ProcessSteps({
  steps,
  serviceTitle,
}: {
  steps: ProcessStep[];
  serviceTitle?: string;
}) {
  // Ensure we have at most 4 steps to display
  const displaySteps = steps.slice(0, 4);

  return (
    <section className="relative w-full overflow-hidden" style={{ background: "#F7F8FA" }}>
      {/* Subtle top border separator */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-24 sm:py-32">

        {/* ── Header ── */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-20">
          {/* Left: Headline */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest mb-5"
              style={{
                background: "var(--accent-global-dim, rgba(124,58,237,0.10))",
                color: "var(--accent-global, #7c3aed)",
                border: "1px solid color-mix(in srgb, var(--accent-global, #7c3aed) 25%, transparent)",
              }}
            >
              Our Process
            </span>
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-[1.1] tracking-tight font-sora text-slate-900"
              style={{ fontFamily: "'Sora', sans-serif" }}
            >
              How We Deliver{" "}
              <span style={{ color: "var(--accent-global, #7c3aed)" }}>Success</span>
              {" "}in 4 Steps
            </h2>
          </motion.div>

          {/* Right: Description */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-4"
          >
            <p className="text-slate-500 text-sm sm:text-base leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
              Our engineering lifecycle prioritizes complete transparency, rigorous quality testing,
              and rapid deployments — so you always know exactly what&apos;s happening at every stage
              {serviceTitle ? ` of your ${serviceTitle} project` : ""}.
            </p>
            <a
              href="#contact-project-form"
              className="inline-flex items-center gap-2 text-sm font-bold rounded-xl px-6 py-3 text-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
              style={{
                background: "var(--accent-global, #7c3aed)",
                boxShadow: "0 4px 14px color-mix(in srgb, var(--accent-global, #7c3aed) 35%, transparent)",
                fontFamily: "'Inter', sans-serif",
              }}
            >
              Start Your Project
              <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth={2}>
                <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </motion.div>
        </div>

        {/* ── 4 Step Cards ── */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {displaySteps.map((step, idx) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group relative bg-white rounded-[28px] p-7 border border-slate-100 hover:border-slate-200 hover:-translate-y-1.5 hover:shadow-[0_20px_50px_rgba(0,0,0,0.07)] transition-all duration-300 cursor-default overflow-hidden"
              style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.04)" }}
            >
              {/* Large background step number — solid purple */}
              <div
                className="absolute -bottom-5 -right-2 text-[100px] font-black leading-none select-none pointer-events-none"
                style={{
                  fontFamily: "'Sora', sans-serif",
                  color: "#7c3aed",
                  opacity: 0.09,
                }}
                aria-hidden="true"
              >
                {String(idx + 1).padStart(2, "0")}
              </div>

              {/* Icon */}
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5 transition-colors duration-300"
                style={{
                  background: "var(--accent-global-dim, rgba(124,58,237,0.08))",
                  color: "var(--accent-global, #7c3aed)",
                  border: "1px solid var(--accent-global, #7c3aed)20",
                }}
              >
                {stepIcons[idx] ?? stepIcons[0]}
              </div>

              {/* Step label */}
              <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 font-mono">
                Step {String(idx + 1).padStart(2, "0")}
              </div>

              {/* Title */}
              <h3
                className="text-slate-900 font-extrabold text-[15px] sm:text-base mb-3 leading-tight font-sora"
                style={{ fontFamily: "'Sora', sans-serif" }}
              >
                {step.title}
              </h3>

              {/* Description */}
              <p
                className="text-slate-500 text-[13px] leading-relaxed"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {step.desc}
              </p>

              {/* Bottom connector arrow (hidden on last card) */}
              {idx < displaySteps.length - 1 && (
                <div className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 items-center justify-center z-10">
                  <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4 text-slate-300" stroke="currentColor" strokeWidth={2}>
                    <path d="M4 8h8M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              )}
            </motion.div>
          ))}
        </div>

      </div>

      {/* Subtle bottom border */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
    </section>
  );
}
