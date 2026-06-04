"use client";

import { motion } from "framer-motion";
import {
  Search, FileText, Palette, Code2, TestTube, Rocket, Wrench,
} from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import { useInView } from "@/hooks/useInView";

const steps = [
  {
    icon: Search, number: "01", title: "Discovery",
    description: "Deep-dive into your business goals, requirements, and user needs. We map out scope and define success metrics.",
    duration: "1–2 weeks",
    deliverables: ["Requirements doc", "Technical audit", "Project roadmap"],
  },
  {
    icon: FileText, number: "02", title: "Planning",
    description: "Architecture design, technology selection, sprint planning, and resource allocation for seamless execution.",
    duration: "1 week",
    deliverables: ["System architecture", "Tech stack", "Timeline & milestones"],
  },
  {
    icon: Palette, number: "03", title: "Design",
    description: "UI/UX design, wireframes, interactive prototypes, and design system — all reviewed and approved by you.",
    duration: "2–3 weeks",
    deliverables: ["Figma mockups", "Design system", "Interactive prototype"],
  },
  {
    icon: Code2, number: "04", title: "Development",
    description: "Agile sprints with daily updates, code reviews, and CI. Clean, tested, documented code every step.",
    duration: "4–12 weeks",
    deliverables: ["Working software", "API documentation", "Tests"],
  },
  {
    icon: TestTube, number: "05", title: "Testing",
    description: "Comprehensive QA — performance, security, accessibility, and cross-browser testing before any release.",
    duration: "1–2 weeks",
    deliverables: ["Test reports", "Performance metrics", "Security audit"],
  },
  {
    icon: Rocket, number: "06", title: "Deployment",
    description: "Zero-downtime deployment with CI/CD pipelines, monitoring setup, and real-time alerting from day one.",
    duration: "1 week",
    deliverables: ["Live production", "CI/CD pipeline", "Monitoring"],
  },
  {
    icon: Wrench, number: "07", title: "Maintenance",
    description: "Ongoing support, performance monitoring, feature enhancements, and security patches — long-term.",
    duration: "Ongoing",
    deliverables: ["Monthly reports", "Feature updates", "24/7 monitoring"],
  },
];

export default function Process() {
  const { ref, inView } = useInView(0.1, true);

  return (
    <section
      className="ng-section relative overflow-hidden"
      id="process"
      style={{ background: "#0A0F1C" }}
    >
      <div className="ng-container">
        <div className="mb-14">
          <SectionHeader
            badge="Our Process"
            title="How We"
            titleHighlight="Build Excellence"
            description="A proven 7-step framework that delivers world-class software on time, every time."
          />
        </div>

        <div ref={ref as React.RefObject<HTMLDivElement>} className="space-y-3">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              className="group rounded-[20px] p-6 transition-all duration-300"
              style={{
                background: "#121A2B",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: i * 0.07, duration: 0.4 }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(37,99,235,0.22)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"; }}
            >
              <div className="flex flex-col sm:flex-row sm:items-start gap-5">
                {/* Step number + icon */}
                <div className="flex items-center gap-4 sm:block sm:space-y-2">
                  <span
                    className="text-[11px] font-semibold block"
                    style={{ color: "#2563EB", fontFamily: "Sora, sans-serif", letterSpacing: "0.06em" }}
                  >
                    {step.number}
                  </span>
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: "rgba(37,99,235,0.10)" }}
                  >
                    <step.icon className="w-5 h-5" style={{ color: "#2563EB" }} />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <h3
                      className="text-[16px] font-semibold text-white"
                      style={{ fontFamily: "Sora, sans-serif" }}
                    >
                      {step.title}
                    </h3>
                    <span
                      className="text-[11px] px-2.5 py-1 rounded-full"
                      style={{
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,255,255,0.06)",
                        color: "#64748B",
                      }}
                    >
                      {step.duration}
                    </span>
                  </div>
                  <p className="text-[14px] leading-[1.65] mb-4" style={{ color: "#94A3B8" }}>
                    {step.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {step.deliverables.map((d) => (
                      <span
                        key={d}
                        className="text-[11px] px-2.5 py-1 rounded-lg"
                        style={{
                          background: "rgba(37,99,235,0.08)",
                          border: "1px solid rgba(37,99,235,0.18)",
                          color: "#2563EB",
                        }}
                      >
                        {d}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
