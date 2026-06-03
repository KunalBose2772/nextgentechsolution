"use client";

import PageHero from "@/components/common/PageHero";
import Services from "@/components/sections/Services";
import Process from "@/components/sections/Process";
import Contact from "@/components/sections/Contact";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
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
  },
];

export default function ServicesPage() {
  return (
    <div className="bg-[#050505]">
      <PageHero
        badge="Our Services"
        title="End-to-End Technology"
        titleHighlight="Services"
        description="From MVP to enterprise scale — we offer the full spectrum of technology services that modern businesses need to win."
      >
        <div className="flex flex-wrap justify-center gap-3">
          {["Web Dev", "Mobile", "SaaS", "AI/ML", "Cloud", "DevOps", "Design", "ERP"].map((s) => (
            <span
              key={s}
              className="px-3 py-1.5 rounded-full glass border border-white/8 text-white/50 text-sm"
            >
              {s}
            </span>
          ))}
        </div>
      </PageHero>

      {/* Detailed Service Blocks */}
      <section className="py-20 border-t border-white/5">
        <div className="container-xl space-y-20">
          {serviceHighlights.map((service, i) => (
            <motion.div
              key={service.id}
              id={service.id}
              className={`grid lg:grid-cols-2 gap-12 items-center ${i % 2 === 1 ? "lg:grid-flow-col-dense" : ""}`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className={i % 2 === 1 ? "lg:col-start-2" : ""}>
                <span
                  className="text-xs font-medium uppercase tracking-wider"
                  style={{ color: service.accent }}
                >
                  {service.title}
                </span>
                <h2 className="text-white font-bold text-3xl mt-2 mb-4 leading-tight">{service.headline}</h2>
                <p className="text-white/55 leading-relaxed mb-6">{service.description}</p>
                <div className="space-y-2.5 mb-6">
                  {service.features.map((f) => (
                    <div key={f} className="flex items-center gap-3">
                      <CheckCircle2 className="w-4 h-4 flex-shrink-0" style={{ color: service.accent }} />
                      <span className="text-white/60 text-sm">{f}</span>
                    </div>
                  ))}
                </div>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white font-semibold text-sm group"
                  style={{ background: `linear-gradient(135deg, ${service.accent}cc, ${service.accent}88)` }}
                >
                  Start This Service
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              <div className={i % 2 === 1 ? "lg:col-start-1" : ""}>
                <div
                  className="glass-card rounded-3xl p-8 border"
                  style={{ borderColor: `${service.accent}20` }}
                >
                  <div
                    className="h-48 rounded-2xl mb-6 bg-grid opacity-60"
                    style={{ background: `linear-gradient(135deg, ${service.accent}10, transparent)` }}
                  />
                  <div className="space-y-3">
                    {service.features.slice(0, 3).map((f) => (
                      <div
                        key={f}
                        className="flex items-center gap-3 p-3 rounded-xl"
                        style={{ background: `${service.accent}08`, border: `1px solid ${service.accent}15` }}
                      >
                        <div className="w-2 h-2 rounded-full" style={{ background: service.accent }} />
                        <span className="text-white/60 text-sm">{f}</span>
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
