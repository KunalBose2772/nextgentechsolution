"use client";

import PageHero from "@/components/common/PageHero";
import Services from "@/components/sections/Services";
import Process from "@/components/sections/Process";
import Contact from "@/components/sections/Contact";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Code, Smartphone, Layout, Cpu } from "lucide-react";
import Link from "next/link";

const serviceHighlights = [
  {
    id: "web",
    title: "Web Development",
    headline: "Next-gen web applications built for scale",
    description: "We architect and build full-stack web applications using Next.js, React, TypeScript, and cloud-native infrastructure. From marketing sites to complex enterprise platforms.",
    features: [
      "Server-side rendering and edge computing",
      "Real-time features with WebSockets",
      "API design and microservices",
      "SEO optimization and Core Web Vitals",
      "Progressive Web Apps (PWA)",
      "A11y and WCAG compliance",
    ],
    accent: "#3b82f6",
    icon: Code,
    mockup: (
      <div className="space-y-2.5 font-mono text-[10px] text-slate-400 p-4 bg-black/40 rounded-xl border border-blue-500/10">
        <div className="flex items-center gap-1.5 border-b border-white/5 pb-2 mb-2 text-slate-500 text-[9px]">
          <span className="w-2 h-2 rounded-full bg-red-500/50" />
          <span className="w-2 h-2 rounded-full bg-yellow-500/50" />
          <span className="w-2 h-2 rounded-full bg-green-500/50" />
          <span className="ml-2 font-mono">App.tsx</span>
        </div>
        <div><span className="text-purple-400">import</span> React, &#123; useState &#125; <span className="text-purple-400">from</span> <span className="text-emerald-400">&apos;react&apos;</span>;</div>
        <div><span className="text-purple-400">const</span> <span className="text-blue-400">NextGenApp</span> = () =&gt; &#123;</div>
        <div className="pl-4"><span className="text-purple-400">const</span> [scale] = <span className="text-blue-400">useEdgeRouting</span>();</div>
        <div className="pl-4"><span className="text-purple-400">return</span> (</div>
        <div className="pl-8 text-cyan-400">&lt;<span className="text-blue-450">Platform</span> edge=&#123;true&#125; optimization=&#123;<span className="text-amber-400">&quot;maximum&quot;</span>&#125;&gt;</div>
        <div className="pl-12 text-slate-500">// Render static pages at 0ms latency</div>
        <div className="pl-8 text-cyan-400">&lt;/<span className="text-blue-450">Platform</span>&gt;</div>
        <div className="pl-4">);</div>
        <div>&#125;;</div>
      </div>
    )
  },
  {
    id: "mobile",
    title: "Mobile App Development",
    headline: "Native and cross-platform mobile experiences",
    description: "Beautiful, performant mobile apps for iOS and Android. Whether you need React Native for cross-platform reach or Swift/Kotlin for native performance — we build both.",
    features: [
      "React Native & Flutter cross-platform",
      "Native iOS (Swift) & Android (Kotlin)",
      "Offline-first architecture",
      "Push notifications & real-time sync",
      "App Store & Play Store submission",
      "App performance optimization",
    ],
    accent: "#7c3aed",
    icon: Smartphone,
    mockup: (
      <div className="w-44 mx-auto rounded-3xl border-4 border-zinc-800 bg-zinc-950 p-3 relative shadow-2xl h-48 overflow-hidden flex flex-col justify-between">
        {/* Dynamic Island */}
        <div className="w-16 h-3.5 bg-zinc-850 rounded-full mx-auto mb-2 border border-white/5" />
        
        {/* Mock Application UI */}
        <div className="flex-1 flex flex-col justify-between">
          <div className="space-y-1.5">
            <div className="h-2 w-16 bg-purple-500/20 rounded" />
            <div className="h-6 w-full bg-white/5 rounded-lg border border-white/5 p-1 flex items-center justify-between">
              <span className="text-[7px] text-purple-400 font-bold font-sora">Dashboard</span>
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex gap-1">
              <div className="h-8 flex-1 bg-white/2 rounded-md border border-white/5 flex flex-col items-center justify-center">
                <span className="text-[8px] font-bold text-white font-sora">$24K</span>
                <span className="text-[5px] text-slate-500">Sales</span>
              </div>
              <div className="h-8 flex-1 bg-purple-950/10 rounded-md border border-purple-500/10 flex flex-col items-center justify-center">
                <span className="text-[8px] font-bold text-purple-400 font-sora">+18%</span>
                <span className="text-[5px] text-purple-450">Growth</span>
              </div>
            </div>
            <div className="h-6 w-full bg-white/5 rounded-lg flex items-center justify-center text-[7px] text-white font-bold cursor-pointer hover:bg-white/10 transition-colors">
              Refresh Data
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: "saas",
    title: "SaaS Platform Development",
    headline: "Build the next unicorn SaaS product",
    description: "End-to-end SaaS development — multi-tenancy, subscription billing, analytics, and everything you need to grow from 0 to 100K users.",
    features: [
      "Multi-tenant architecture",
      "Stripe subscription billing",
      "Usage analytics & dashboards",
      "Role-based access control",
      "API-first design",
      "White-labeling support",
    ],
    accent: "#06b6d4",
    icon: Layout,
    mockup: (
      <div className="space-y-3 p-4 bg-zinc-950 rounded-2xl border border-cyan-500/10">
        <div className="flex items-center justify-between border-b border-white/5 pb-2">
          <span className="text-[10px] font-bold text-white font-sora">Stripe Billing</span>
          <span className="text-[9px] text-cyan-400 font-medium bg-cyan-950/20 px-2 py-0.5 rounded-full border border-cyan-500/10">Active</span>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between items-center text-[10px]">
            <span className="text-slate-450">Enterprise Subscriptions</span>
            <span className="text-white font-bold">$12,450 / mo</span>
          </div>
          {/* Progress bar */}
          <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-cyan-400 rounded-full" 
              initial={{ width: 0 }}
              whileInView={{ width: "72%" }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2 }}
            />
          </div>
          <div className="flex justify-between items-center text-[8px] text-slate-500">
            <span>Quota Usage</span>
            <span>72% of 500K ops</span>
          </div>
        </div>
      </div>
    )
  },
  {
    id: "ai",
    title: "AI & Machine Learning",
    headline: "Embed intelligence into your product",
    description: "From GPT-4 integrations to custom ML models — we help you build AI features that deliver real business value, not just demos.",
    features: [
      "OpenAI / Claude API integration",
      "Custom LLM fine-tuning",
      "RAG (Retrieval Augmented Generation)",
      "Computer vision solutions",
      "Predictive analytics & forecasting",
      "NLP and text analysis",
    ],
    accent: "#22c55e",
    icon: Cpu,
    mockup: (
      <div className="space-y-3 p-4 bg-zinc-950 rounded-2xl border border-emerald-500/10">
        <div className="flex items-center gap-2 border-b border-white/5 pb-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          <span className="text-[10px] font-bold text-white font-sora">LLM Agent Engine</span>
        </div>
        <div className="space-y-1.5 text-[9px] font-mono">
          <div className="text-emerald-400">&gt; Initiate vector search ...</div>
          <div className="text-slate-450">Found 3 matching chunks (score: 0.94)</div>
          <div className="text-emerald-400">&gt; Generating refined context summary ...</div>
          <div className="text-slate-300 bg-white/5 p-2 rounded-lg leading-relaxed text-[8.5px]">
            &quot;The client interface will scale routing via edge worker caches ...&quot;
          </div>
        </div>
      </div>
    )
  },
];

export default function ServicesPage() {
  return (
    <div className="bg-[#050505] min-h-screen">
      <PageHero
        badge="Our Services"
        title="End-to-End Technology"
        titleHighlight="Services"
        description="From MVP to enterprise scale — we offer the full spectrum of technology services that modern businesses need to win."
        gradient="rgba(6, 182, 212, 0.08)"
      >
        <div className="flex flex-wrap justify-center gap-3">
          {["Web Dev", "Mobile", "SaaS", "AI/ML", "Cloud", "DevOps", "Design", "ERP"].map((s) => (
            <span
              key={s}
              className="px-3.5 py-1.5 rounded-full border border-white/5 bg-white/[0.02] text-slate-450 text-[12.5px] transition-colors hover:border-cyan-500/30 hover:text-white"
            >
              {s}
            </span>
          ))}
        </div>
      </PageHero>

      {/* Detailed Service Blocks */}
      <section className="py-20 md:py-28 border-t border-white/5 relative">
        <div className="absolute inset-0 pointer-events-none opacity-[0.02] ng-grid-bg" />
        <div className="ng-container relative z-10 space-y-24">
          {serviceHighlights.map((service, i) => (
            <motion.div
              key={service.id}
              id={service.id}
              className={`grid lg:grid-cols-12 gap-12 items-center ${i % 2 === 1 ? "lg:grid-flow-col-dense" : ""}`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {/* Content Column (7 cols) */}
              <div className={`lg:col-span-7 ${i % 2 === 1 ? "lg:col-start-6" : ""}`}>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center border" style={{ borderColor: `${service.accent}20`, background: `${service.accent}08` }}>
                    <service.icon className="w-4 h-4" style={{ color: service.accent }} />
                  </div>
                  <span
                    className="text-xs font-semibold uppercase tracking-wider"
                    style={{ color: service.accent }}
                  >
                    {service.title}
                  </span>
                </div>
                <h2 
                  className="text-white font-extrabold text-2xl sm:text-3xl md:text-4xl mt-2 mb-4 leading-tight font-sora"
                >
                  {service.headline}
                </h2>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">{service.description}</p>
                
                <div className="grid sm:grid-cols-2 gap-3 mb-8">
                  {service.features.map((f) => (
                    <div key={f} className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 flex-shrink-0" style={{ color: service.accent }} />
                      <span className="text-slate-350 text-xs sm:text-[13px]">{f}</span>
                    </div>
                  ))}
                </div>
                
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-white font-bold text-xs tracking-wider transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                  style={{ background: `linear-gradient(135deg, ${service.accent}cc, ${service.accent}88)` }}
                >
                  Start This Project
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              {/* Mockup Column (5 cols) */}
              <div className={`lg:col-span-5 ${i % 2 === 1 ? "lg:col-start-1" : ""}`}>
                <div
                  className="group rounded-3xl p-6 border transition-all duration-300 flex flex-col justify-center relative overflow-hidden"
                  style={{ 
                    borderColor: "rgba(255, 255, 255, 0.05)",
                    background: "rgba(255, 255, 255, 0.01)",
                    backdropFilter: "blur(12px)"
                  }}
                >
                  {/* Background accent glow behind mockup */}
                  <div className="absolute inset-0 pointer-events-none opacity-[0.03] transition-opacity duration-300 group-hover:opacity-[0.06]" style={{ background: `radial-gradient(circle, ${service.accent} 0%, transparent 70%)` }} />
                  
                  {service.mockup}
                  
                  <div className="mt-5 space-y-2">
                    {service.features.slice(0, 2).map((f) => (
                      <div
                        key={f}
                        className="flex items-center gap-2.5 p-2.5 rounded-xl"
                        style={{ background: `${service.accent}08`, border: `1px solid ${service.accent}15` }}
                      >
                        <div className="w-1.5 h-1.5 rounded-full" style={{ background: service.accent }} />
                        <span className="text-slate-400 text-xs">{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <Services />
      <Process />
      <Contact />
    </div>
  );
}
