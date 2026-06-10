"use client";

import { motion } from "framer-motion";
import { 
  Search, FileText, Palette, Code2, TestTube, Rocket, Wrench, 
  CheckCircle, ArrowRight, Sparkles 
} from "lucide-react";
import Link from "next/link";
import SectionHeader from "@/components/ui/SectionHeader";
import SectionGlow from "@/components/ui/SectionGlow";

const steps = [
  {
    icon: Search,
    number: "01",
    title: "Discovery & Strategy",
    description: "Deep-dive into your business goals, requirements, and user needs. We map out scope, conduct competitive research, and define concrete success metrics.",
    duration: "1–2 weeks",
    deliverables: ["Product Requirements Document", "Technical Feasibility Audit", "Roadmap & Estimate"],
    color: "#06B6D4",
    glow: "rgba(6, 182, 212, 0.15)",
  },
  {
    icon: FileText,
    number: "02",
    title: "Planning & Architecture",
    description: "Designing the blueprint. We select the technology stack, structure system architecture, define database schemas, and map out milestones for execution.",
    duration: "1 week",
    deliverables: ["Database & Schema Design", "Tech Stack Selection", "Timeline & Sprint Planning"],
    color: "#7C3AED",
    glow: "rgba(124, 58, 237, 0.15)",
  },
  {
    icon: Palette,
    number: "03",
    title: "UI/UX & Interactive Design",
    description: "Crafting pixel-perfect interface designs. We build user flows, wireframes, interactive prototypes, and a comprehensive design system.",
    duration: "2–3 weeks",
    deliverables: ["High-Fidelity Figma Mockups", "Interactive Prototypes", "Design System & Tokens"],
    color: "#EC4899",
    glow: "rgba(236, 72, 153, 0.15)",
  },
  {
    icon: Code2,
    number: "04",
    title: "Agile Development",
    description: "Code implementation. We build in fast-paced sprints with daily updates, automated code testing, clean architectures, and clear documentation.",
    duration: "4–12 weeks",
    deliverables: ["Production-Ready Build", "Documented APIs & Schema", "Clean Unit & Integration Tests"],
    color: "#10B981",
    glow: "rgba(16, 185, 129, 0.15)",
  },
  {
    icon: TestTube,
    number: "05",
    title: "Automated QA & Testing",
    description: "Quality assurance. We perform rigid security scans, speed performance tuning, accessibility testing, and end-to-end user flows validation.",
    duration: "1–2 weeks",
    deliverables: ["Security & Penetration Audit", "Performance & Speed Audit", "Automated QA Test Reports"],
    color: "#F59E0B",
    glow: "rgba(245, 158, 11, 0.15)",
  },
  {
    icon: Rocket,
    number: "06",
    title: "Deployment & Orchestration",
    description: "Going live securely. We configure automated CI/CD pipelines, set up autoscaling infrastructure, monitor telemetry metrics, and deploy without downtime.",
    duration: "1 week",
    deliverables: ["Zero-Downtime Live Release", "CI/CD Pipeline Integration", "Monitoring & Alerts Setup"],
    color: "#3B82F6",
    glow: "rgba(59, 130, 246, 0.15)",
  },
  {
    icon: Wrench,
    number: "07",
    title: "Continuous Maintenance",
    description: "Long-term partnership. We keep servers updated, monitor application health, apply security updates, and implement ongoing performance optimizations.",
    duration: "Ongoing",
    deliverables: ["24/7 Monitoring Reports", "Server Security Patches", "Feature Updates & Tweaks"],
    color: "#8B5CF6",
    glow: "rgba(139, 92, 246, 0.15)",
  }
];

export default function Process() {
  return (
    <section 
      className="relative overflow-hidden py-20 md:py-28 z-30" 
      id="process"
      style={{
        background: "linear-gradient(180deg, #0A0A0B 0%, #030303 100%)",
      }}
    >
      <SectionGlow />

      {/* Grid background overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02] z-0 ng-grid-bg" />

      {/* Dynamic Background Radial Glows */}
      <div 
        className="absolute top-[10%] left-[-10%] w-[500px] h-[500px] rounded-full pointer-events-none opacity-[0.08] blur-[100px] z-0" 
        style={{ background: "radial-gradient(circle, #06B6D4 0%, transparent 70%)" }} 
      />
      <div 
        className="absolute bottom-[10%] right-[-10%] w-[500px] h-[500px] rounded-full pointer-events-none opacity-[0.08] blur-[100px] z-0" 
        style={{ background: "radial-gradient(circle, #7C3AED 0%, transparent 70%)" }} 
      />

      <div className="ng-container relative z-10">
        
        {/* Section Header */}
        <div className="mb-16 text-center">
          <SectionHeader
            badge="Our Process"
            title="How We"
            titleHighlight="Build Excellence"
            description="Our proven 7-step engineering framework designed to take products from abstract concept to market leader."
            align="center"
          />
        </div>

        {/* Process Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                className="group rounded-3xl p-6 transition-all duration-300 flex flex-col justify-between relative overflow-hidden"
                style={{
                  background: "rgba(255, 255, 255, 0.02)",
                  border: "1px solid rgba(255, 255, 255, 0.05)",
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: idx * 0.06 }}
                whileHover={{
                  y: -6,
                  borderColor: `${step.color}35`,
                  background: "rgba(255, 255, 255, 0.04)",
                  boxShadow: `0 20px 40px rgba(0, 0, 0, 0.4), 0 0 25px ${step.glow}`
                }}
              >
                {/* Dynamic Corner Highlight */}
                <div 
                  className="absolute top-0 right-0 w-24 h-24 rounded-full blur-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" 
                  style={{ background: `radial-gradient(circle, ${step.color}30, transparent 70%)` }}
                />

                <div>
                  {/* Top line with Icon and Number */}
                  <div className="flex items-center justify-between mb-6">
                    <div 
                      className="w-10 h-10 rounded-xl flex items-center justify-center border transition-all duration-300"
                      style={{
                        background: `${step.color}10`,
                        borderColor: `${step.color}25`,
                        color: step.color,
                      }}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <span 
                      className="text-4xl font-extrabold select-none opacity-10 group-hover:opacity-20 transition-opacity duration-300 font-sora"
                      style={{ color: step.color }}
                    >
                      {step.number}
                    </span>
                  </div>

                  {/* Title & Duration */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between gap-2 mb-1.5 flex-wrap">
                      <h4 
                        className="text-white font-bold text-[16px] group-hover:text-white transition-colors font-sora"
                      >
                        {step.title}
                      </h4>
                    </div>
                    <span 
                      className="text-[10px] font-semibold px-2 py-0.5 rounded-md"
                      style={{
                        background: "rgba(255, 255, 255, 0.04)",
                        border: "1px solid rgba(255, 255, 255, 0.06)",
                        color: "#94A3B8"
                      }}
                    >
                      {step.duration}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-[13px] leading-[1.6] text-slate-400 mb-6 group-hover:text-slate-300 transition-colors">
                    {step.description}
                  </p>
                </div>

                {/* Deliverables List */}
                <div className="pt-4 border-t border-white/5 space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#64748B] block mb-1">
                    Key Deliverables:
                  </span>
                  {step.deliverables.map((del, dIdx) => (
                    <div key={dIdx} className="flex items-start gap-2 text-[11.5px] text-slate-400">
                      <CheckCircle 
                        className="w-3.5 h-3.5 shrink-0 mt-0.5" 
                        style={{ color: step.color }} 
                      />
                      <span>{del}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}

          {/* Symmetrical CTA Card */}
          <motion.div
            className="group rounded-3xl p-6 transition-all duration-300 flex flex-col justify-between relative overflow-hidden"
            style={{
              background: "linear-gradient(135deg, rgba(6, 182, 212, 0.08) 0%, rgba(59, 130, 246, 0.08) 100%)",
              border: "1px solid rgba(6, 182, 212, 0.15)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
            }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: 7 * 0.06 }}
            whileHover={{
              y: -6,
              borderColor: "rgba(6, 182, 212, 0.35)",
              boxShadow: "0 20px 40px rgba(0, 0, 0, 0.4), 0 0 25px rgba(6, 182, 212, 0.20)"
            }}
          >
            {/* Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 opacity-50 pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                  <Sparkles className="w-5 h-5 animate-pulse" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 font-sora">
                  Start Now
                </span>
              </div>

              <h4 className="text-white font-extrabold text-[17px] mb-2 font-sora leading-snug">
                Have a project idea in mind?
              </h4>
              <p className="text-[13px] leading-[1.6] text-slate-400 mb-6">
                Let&apos;s build a custom solution engineered specifically for your business goals, performance targets, and scalability needs.
              </p>
            </div>

            <div className="pt-4">
              <Link 
                href="/contact"
                className="w-full h-11 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/10 transition-all cursor-pointer"
              >
                Get a Free Proposal
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
