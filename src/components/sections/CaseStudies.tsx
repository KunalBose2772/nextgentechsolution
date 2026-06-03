"use client";

import { motion } from "framer-motion";
import { ArrowRight, TrendingUp } from "lucide-react";
import Link from "next/link";
import SectionHeader from "@/components/ui/SectionHeader";

const cases = [
  {
    id: "1",
    client: "FinanceIQ",
    industry: "FinTech",
    title: "Rebuilt a legacy banking dashboard into a modern real-time SaaS",
    challenge: "Outdated legacy system handling $500M/year in transactions, causing 15% downtime.",
    solution: "Complete rebuild with Next.js, real-time WebSocket updates, PostgreSQL, and AWS.",
    results: [
      { metric: "Downtime", value: "0%", change: "from 15%", positive: true },
      { metric: "Load time", value: "0.8s", change: "from 12s", positive: true },
      { metric: "Users", value: "+127%", change: "in 6 months", positive: true },
    ],
    duration: "4 months",
    gradient: "from-blue-500/15 to-transparent",
    accent: "#3b82f6",
    tags: ["Next.js", "PostgreSQL", "AWS", "WebSocket"],
  },
  {
    id: "2",
    client: "RetailMax",
    industry: "E-Commerce",
    title: "Scaled an e-commerce platform to handle 2M+ concurrent users",
    challenge: "Platform crashing under peak load during sale events. Revenue loss of $100K/crash.",
    solution: "Microservices architecture, Kubernetes auto-scaling, Redis caching, CDN optimization.",
    results: [
      { metric: "Uptime", value: "99.99%", change: "SLA achieved", positive: true },
      { metric: "Infra costs", value: "-40%", change: "saved $200K/yr", positive: true },
      { metric: "Conversion", value: "+35%", change: "revenue impact", positive: true },
    ],
    duration: "6 months",
    gradient: "from-orange-500/15 to-transparent",
    accent: "#f97316",
    tags: ["Kubernetes", "Redis", "Node.js", "CDN"],
  },
  {
    id: "3",
    client: "MediConnect",
    industry: "HealthTech",
    title: "Built a HIPAA-compliant telemedicine platform from zero to 500+ doctors",
    challenge: "Zero digital infrastructure. Needed end-to-end compliant telemedicine system.",
    solution: "React Native apps, secure WebRTC video, end-to-end encryption, AWS HIPAA compliance.",
    results: [
      { metric: "Launch time", value: "5 months", change: "from concept", positive: true },
      { metric: "Doctors", value: "500+", change: "onboarded", positive: true },
      { metric: "Patient NPS", value: "92", change: "out of 100", positive: true },
    ],
    duration: "5 months",
    gradient: "from-green-500/15 to-transparent",
    accent: "#22c55e",
    tags: ["React Native", "WebRTC", "AWS", "Node.js"],
  },
];

export default function CaseStudies() {
  return (
    <section className="section-padding relative overflow-hidden bg-[#050505]" id="case-studies">
      <div className="absolute inset-0 bg-grid opacity-25" />

      <div className="container-xl relative">
        <div className="mb-16">
          <SectionHeader
            badge="Case Studies"
            title="Real Results,"
            titleHighlight="Real Impact"
            description="Deep dives into how we've helped enterprises overcome their toughest technical challenges."
          />
        </div>

        <div className="space-y-6">
          {cases.map((c, i) => (
            <motion.div
              key={c.id}
              className="group glass-card rounded-3xl overflow-hidden border border-white/6 hover:border-white/12 transition-all duration-500"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              whileHover={{ y: -2 }}
            >
              <div className={`absolute inset-0 bg-gradient-to-r ${c.gradient} opacity-50`} />

              <div className="relative p-8 md:p-10">
                <div className="grid lg:grid-cols-12 gap-8 items-start">
                  {/* Left: Info */}
                  <div className="lg:col-span-5">
                    <div className="flex items-center gap-3 mb-4">
                      <span
                        className="text-xs font-medium px-3 py-1 rounded-full"
                        style={{
                          color: c.accent,
                          background: `${c.accent}15`,
                          border: `1px solid ${c.accent}30`,
                        }}
                      >
                        {c.industry}
                      </span>
                      <span className="text-white/30 text-xs">{c.duration}</span>
                    </div>

                    <h3 className="text-white font-bold text-xl leading-tight mb-4">{c.title}</h3>

                    <div className="space-y-3 mb-6">
                      <div>
                        <div className="text-xs font-medium text-white/30 uppercase tracking-wide mb-1">Challenge</div>
                        <p className="text-white/55 text-sm leading-relaxed">{c.challenge}</p>
                      </div>
                      <div>
                        <div className="text-xs font-medium text-white/30 uppercase tracking-wide mb-1">Solution</div>
                        <p className="text-white/55 text-sm leading-relaxed">{c.solution}</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {c.tags.map((tag) => (
                        <span key={tag} className="text-xs px-2.5 py-1 rounded-lg bg-white/4 text-white/40 border border-white/5">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <Link
                      href={`/case-studies/${c.id}`}
                      className="inline-flex items-center gap-2 text-sm font-medium transition-all group/link"
                      style={{ color: c.accent }}
                    >
                      Read full case study
                      <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                    </Link>
                  </div>

                  {/* Right: Results */}
                  <div className="lg:col-span-7">
                    <div className="text-xs font-medium text-white/30 uppercase tracking-wide mb-4">Results</div>
                    <div className="grid grid-cols-3 gap-4">
                      {c.results.map((result) => (
                        <div
                          key={result.metric}
                          className="p-5 rounded-2xl border transition-all group/result"
                          style={{
                            background: `${c.accent}08`,
                            borderColor: `${c.accent}20`,
                          }}
                        >
                          <TrendingUp
                            className="w-4 h-4 mb-2 opacity-60"
                            style={{ color: c.accent }}
                          />
                          <div
                            className="text-2xl font-extrabold mb-1 leading-none"
                            style={{ color: c.accent }}
                          >
                            {result.value}
                          </div>
                          <div className="text-white/60 text-xs font-medium mb-0.5">{result.metric}</div>
                          <div className="text-white/30 text-xs">{result.change}</div>
                        </div>
                      ))}
                    </div>

                    {/* Visual bar chart */}
                    <div className="mt-6 p-5 rounded-2xl bg-white/2 border border-white/5">
                      <div className="text-xs text-white/30 mb-3">Performance improvement</div>
                      <div className="space-y-2">
                        {[
                          { label: "Before", value: 25, color: "bg-red-500/30" },
                          { label: "After", value: 97, color: "", accent: c.accent },
                        ].map((bar) => (
                          <div key={bar.label} className="flex items-center gap-3">
                            <span className="text-white/30 text-xs w-12">{bar.label}</span>
                            <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
                              <motion.div
                                className={`h-full rounded-full ${bar.color || ""}`}
                                style={{
                                  width: `${bar.value}%`,
                                  background: bar.accent
                                    ? `linear-gradient(to right, ${bar.accent}80, ${bar.accent})`
                                    : undefined,
                                }}
                                initial={{ width: 0 }}
                                whileInView={{ width: `${bar.value}%` }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.3, duration: 1, ease: "easeOut" }}
                              />
                            </div>
                            <span className="text-white/40 text-xs w-8">{bar.value}%</span>
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
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-white/10 hover:border-blue-500/40 text-white/70 hover:text-white font-medium transition-all group"
          >
            View All Case Studies
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
