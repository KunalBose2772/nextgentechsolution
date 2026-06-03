"use client";

import { motion } from "framer-motion";
import {
  Search, FileText, Palette, Code2, TestTube,
  Rocket, Wrench, ArrowRight,
} from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import { useInView } from "@/hooks/useInView";

const steps = [
  {
    icon: Search, number: "01", title: "Discovery",
    description: "Deep-dive into your business goals, technical requirements, and user needs. We map out the full scope and define success metrics.",
    duration: "1-2 weeks",
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
    glow: "#3b82f6",
    deliverables: ["Requirements doc", "Technical audit", "Project roadmap"],
  },
  {
    icon: FileText, number: "02", title: "Planning",
    description: "Architecture design, technology selection, sprint planning, and resource allocation for a seamless execution.",
    duration: "1 week",
    color: "text-violet-400",
    bg: "bg-violet-500/10",
    border: "border-violet-500/20",
    glow: "#7c3aed",
    deliverables: ["System architecture", "Tech stack finalized", "Timeline & milestones"],
  },
  {
    icon: Palette, number: "03", title: "Design",
    description: "UI/UX design, wireframes, interactive prototypes, and design system creation — all reviewed and approved by you.",
    duration: "2-3 weeks",
    color: "text-pink-400",
    bg: "bg-pink-500/10",
    border: "border-pink-500/20",
    glow: "#ec4899",
    deliverables: ["Figma mockups", "Design system", "Interactive prototype"],
  },
  {
    icon: Code2, number: "04", title: "Development",
    description: "Agile sprints with daily updates, code reviews, and continuous integration. Clean, tested, documented code every step.",
    duration: "4-12 weeks",
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/20",
    glow: "#06b6d4",
    deliverables: ["Working software", "API documentation", "Unit & integration tests"],
  },
  {
    icon: TestTube, number: "05", title: "Testing",
    description: "Comprehensive QA — performance, security, accessibility, and cross-browser/device testing before any release.",
    duration: "1-2 weeks",
    color: "text-green-400",
    bg: "bg-green-500/10",
    border: "border-green-500/20",
    glow: "#22c55e",
    deliverables: ["Test reports", "Performance metrics", "Security audit"],
  },
  {
    icon: Rocket, number: "06", title: "Deployment",
    description: "Zero-downtime deployment with CI/CD pipelines, monitoring setup, and real-time alerting from day one.",
    duration: "1 week",
    color: "text-orange-400",
    bg: "bg-orange-500/10",
    border: "border-orange-500/20",
    glow: "#f97316",
    deliverables: ["Live production", "CI/CD pipeline", "Monitoring dashboard"],
  },
  {
    icon: Wrench, number: "07", title: "Maintenance",
    description: "Ongoing support, performance monitoring, feature enhancements, and security patches — we stay with you long-term.",
    duration: "Ongoing",
    color: "text-teal-400",
    bg: "bg-teal-500/10",
    border: "border-teal-500/20",
    glow: "#14b8a6",
    deliverables: ["Monthly reports", "Feature updates", "24/7 monitoring"],
  },
];

export default function Process() {
  const { ref, inView } = useInView(0.1, true);

  return (
    <section className="section-padding relative overflow-hidden bg-[#060609]" id="process">
      <div className="absolute inset-0 bg-grid opacity-25" />

      <div className="container-xl relative">
        <div className="mb-16">
          <SectionHeader
            badge="Our Process"
            title="How We"
            titleHighlight="Build Excellence"
            description="A proven 7-step framework that delivers world-class software on time, every time."
          />
        </div>

        <div ref={ref as React.RefObject<HTMLDivElement>} className="relative">
          {/* Vertical line (desktop) */}
          <div className="hidden lg:block absolute left-8 top-0 bottom-0 w-[1px] timeline-line" />

          <div className="space-y-6 lg:space-y-0">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                className="relative"
                initial={{ opacity: 0, x: -30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <div className="lg:pl-24 group">
                  {/* Timeline dot */}
                  <div className="hidden lg:flex absolute left-0 top-6 w-16 items-center justify-center">
                    <motion.div
                      className={`w-10 h-10 rounded-xl ${step.bg} border ${step.border} flex items-center justify-center z-10 bg-[#060609]`}
                      whileHover={{ scale: 1.1 }}
                      style={{
                        boxShadow: inView ? `0 0 20px ${step.glow}30` : "none",
                      }}
                    >
                      <step.icon className={`w-5 h-5 ${step.color}`} />
                    </motion.div>
                  </div>

                  <div className={`glass-card rounded-2xl p-6 border border-white/5 group-hover:border-white/10 transition-all duration-300 mb-4 lg:mb-0`}>
                    <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                      {/* Mobile icon */}
                      <div className={`lg:hidden w-10 h-10 rounded-xl ${step.bg} border ${step.border} flex items-center justify-center flex-shrink-0`}>
                        <step.icon className={`w-5 h-5 ${step.color}`} />
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className={`text-xs font-bold ${step.color} opacity-60`}>{step.number}</span>
                          <h3 className="text-white font-bold text-lg">{step.title}</h3>
                          <span className="ml-auto text-white/25 text-xs glass px-2.5 py-1 rounded-full border border-white/5">
                            {step.duration}
                          </span>
                        </div>
                        <p className="text-white/50 text-sm leading-relaxed mb-4">{step.description}</p>

                        {/* Deliverables */}
                        <div className="flex flex-wrap gap-2">
                          {step.deliverables.map((d) => (
                            <span
                              key={d}
                              className="flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-lg"
                              style={{
                                color: step.glow,
                                background: `${step.glow}10`,
                                border: `1px solid ${step.glow}20`,
                              }}
                            >
                              <ArrowRight className="w-3 h-3" />
                              {d}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
