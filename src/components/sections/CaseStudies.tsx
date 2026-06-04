"use client";

import { motion } from "framer-motion";
import { ArrowRight, TrendingUp } from "lucide-react";
import Link from "next/link";
import SectionHeader from "@/components/ui/SectionHeader";

const cases = [
  {
    id: "1",
    client: "FinanceIQ", industry: "FinTech", duration: "4 months",
    title: "Rebuilt a legacy banking dashboard into a modern real-time SaaS",
    challenge: "Outdated legacy system handling $500M/year in transactions with 15% downtime.",
    solution: "Complete rebuild with Next.js, real-time WebSocket updates, PostgreSQL, and AWS.",
    results: [
      { metric: "Downtime",  value: "0%",    change: "from 15%" },
      { metric: "Load time", value: "0.8s",  change: "from 12s" },
      { metric: "Users",     value: "+127%", change: "in 6 months" },
    ],
    tags: ["Next.js", "PostgreSQL", "AWS", "WebSocket"],
  },
  {
    id: "2",
    client: "RetailMax", industry: "E-Commerce", duration: "6 months",
    title: "Scaled an e-commerce platform to handle 2M+ concurrent users",
    challenge: "Platform crashing under peak load during sale events. Revenue loss of $100K/crash.",
    solution: "Microservices architecture, Kubernetes auto-scaling, Redis caching, CDN optimization.",
    results: [
      { metric: "Uptime",      value: "99.99%", change: "SLA achieved" },
      { metric: "Infra costs", value: "−40%",   change: "saved $200K/yr" },
      { metric: "Conversion",  value: "+35%",   change: "revenue impact" },
    ],
    tags: ["Kubernetes", "Redis", "Node.js", "CDN"],
  },
  {
    id: "3",
    client: "MediConnect", industry: "HealthTech", duration: "5 months",
    title: "Built a HIPAA-compliant telemedicine platform from zero to 500+ doctors",
    challenge: "Zero digital infrastructure. Needed end-to-end compliant telemedicine system.",
    solution: "React Native apps, secure WebRTC video, end-to-end encryption, AWS HIPAA compliance.",
    results: [
      { metric: "Launch time",  value: "5 mo",  change: "concept to live" },
      { metric: "Doctors",      value: "500+",  change: "onboarded" },
      { metric: "Patient NPS",  value: "92",    change: "out of 100" },
    ],
    tags: ["React Native", "WebRTC", "AWS", "Node.js"],
  },
];

export default function CaseStudies() {
  return (
    <section
      className="ng-section relative overflow-hidden"
      id="case-studies"
      style={{ background: "#0F1422" }}
    >
      <div className="ng-container">
        <div className="mb-14">
          <SectionHeader
            badge="Case Studies"
            title="Real Results,"
            titleHighlight="Real Impact"
            description="Deep dives into how we've helped enterprises overcome their toughest technical challenges."
          />
        </div>

        <div className="space-y-4">
          {cases.map((c, i) => (
            <motion.div
              key={c.id}
              className="group rounded-[20px] overflow-hidden transition-all duration-300"
              style={{
                background: "#121A2B",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.08, duration: 0.45 }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(37,99,235,0.22)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"; }}
            >
              <div className="p-7 md:p-8">
                <div className="grid lg:grid-cols-12 gap-8 items-start">
                  {/* Left: Info */}
                  <div className="lg:col-span-5">
                    <div className="flex items-center gap-3 mb-4">
                      <span
                        className="text-[11px] font-medium px-2.5 py-1 rounded-full"
                        style={{
                          background: "rgba(37,99,235,0.10)",
                          border: "1px solid rgba(37,99,235,0.20)",
                          color: "#2563EB",
                        }}
                      >
                        {c.industry}
                      </span>
                      <span className="text-[11px]" style={{ color: "#64748B" }}>
                        {c.duration}
                      </span>
                    </div>

                    <h3
                      className="text-[17px] font-semibold text-white leading-[1.4] mb-5"
                      style={{ fontFamily: "Sora, sans-serif" }}
                    >
                      {c.title}
                    </h3>

                    <div className="space-y-3 mb-5">
                      <div>
                        <div className="text-[11px] font-medium uppercase tracking-[0.08em] mb-1" style={{ color: "#64748B" }}>
                          Challenge
                        </div>
                        <p className="text-[13px] leading-[1.65]" style={{ color: "#94A3B8" }}>{c.challenge}</p>
                      </div>
                      <div>
                        <div className="text-[11px] font-medium uppercase tracking-[0.08em] mb-1" style={{ color: "#64748B" }}>
                          Solution
                        </div>
                        <p className="text-[13px] leading-[1.65]" style={{ color: "#94A3B8" }}>{c.solution}</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {c.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[11px] px-2.5 py-1 rounded-lg"
                          style={{
                            background: "rgba(255,255,255,0.04)",
                            border: "1px solid rgba(255,255,255,0.06)",
                            color: "#64748B",
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <Link
                      href={`/case-studies/${c.id}`}
                      className="inline-flex items-center gap-1.5 text-[13px] font-medium transition-colors"
                      style={{ color: "#2563EB" }}
                    >
                      Read full case study
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>

                  {/* Right: Results */}
                  <div className="lg:col-span-7">
                    <div className="text-[11px] font-medium uppercase tracking-[0.08em] mb-4" style={{ color: "#64748B" }}>
                      Results
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      {c.results.map((result) => (
                        <div
                          key={result.metric}
                          className="p-4 rounded-[16px]"
                          style={{
                            background: "rgba(37,99,235,0.06)",
                            border: "1px solid rgba(37,99,235,0.14)",
                          }}
                        >
                          <TrendingUp className="w-3.5 h-3.5 mb-2" style={{ color: "#2563EB" }} />
                          <div
                            className="text-[22px] font-semibold mb-0.5 leading-none"
                            style={{ color: "#2563EB", fontFamily: "Sora, sans-serif", letterSpacing: "-0.02em" }}
                          >
                            {result.value}
                          </div>
                          <div className="text-[12px] font-medium text-white mb-0.5">{result.metric}</div>
                          <div className="text-[11px]" style={{ color: "#64748B" }}>{result.change}</div>
                        </div>
                      ))}
                    </div>

                    {/* Progress bar */}
                    <div
                      className="mt-4 p-4 rounded-[16px]"
                      style={{
                        background: "rgba(255,255,255,0.03)",
                        border: "1px solid rgba(255,255,255,0.06)",
                      }}
                    >
                      <div className="text-[11px] mb-3" style={{ color: "#64748B" }}>
                        Performance improvement
                      </div>
                      <div className="space-y-2.5">
                        {[
                          { label: "Before", value: 25 },
                          { label: "After",  value: 97 },
                        ].map((bar) => (
                          <div key={bar.label} className="flex items-center gap-3">
                            <span className="text-[11px] w-10" style={{ color: "#64748B" }}>{bar.label}</span>
                            <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
                              <motion.div
                                className="h-full rounded-full"
                                style={{
                                  background: bar.label === "After" ? "#2563EB" : "rgba(255,255,255,0.15)",
                                }}
                                initial={{ width: 0 }}
                                whileInView={{ width: `${bar.value}%` }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.3, duration: 0.9, ease: "easeOut" }}
                              />
                            </div>
                            <span className="text-[11px] w-8 text-right" style={{ color: "#64748B" }}>{bar.value}%</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center mt-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <Link href="/case-studies" className="ng-btn-ghost">
            View All Case Studies
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
