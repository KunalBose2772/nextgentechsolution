"use client";

import { motion } from "framer-motion";
import PageHero from "@/components/common/PageHero";
import Contact from "@/components/sections/Contact";
import { ArrowRight, RefreshCw, CreditCard, Activity, ShoppingBag, GraduationCap, Building2, Check } from "lucide-react";
import Link from "next/link";

const solutions = [
  {
    id: "digital",
    category: "Enterprise",
    title: "Digital Transformation",
    icon: RefreshCw,
    description: "End-to-end modernization of legacy systems, business processes, and technology infrastructure. We help enterprises evolve from outdated systems to cloud-native, AI-powered operations.",
    outcomes: ["60% reduction in operational costs", "3x faster time-to-market", "Zero legacy downtime migration", "Full cloud adoption"],
    accent: "#3b82f6",
    gradient: "rgba(59, 130, 246, 0.15)",
  },
  {
    id: "fintech",
    category: "FinTech",
    title: "Financial Technology",
    icon: CreditCard,
    description: "Secure, compliant, and scalable financial platforms — from neobanks to payment gateways, investment dashboards, and blockchain solutions.",
    outcomes: ["PCI-DSS compliance", "Real-time transaction processing", "Fraud detection AI", "Open banking APIs"],
    accent: "#22c55e",
    gradient: "rgba(34, 197, 94, 0.15)",
  },
  {
    id: "health",
    category: "HealthTech",
    title: "Healthcare Technology",
    icon: Activity,
    description: "HIPAA-compliant telemedicine platforms, EHR systems, patient management solutions, and health analytics built for the modern healthcare ecosystem.",
    outcomes: ["HIPAA & HL7 compliant", "End-to-end encryption", "EHR integrations", "Real-time monitoring"],
    accent: "#06b6d4",
    gradient: "rgba(6, 182, 212, 0.15)",
  },
  {
    id: "ecommerce",
    category: "E-Commerce",
    title: "Retail & E-Commerce",
    icon: ShoppingBag,
    description: "High-performance e-commerce platforms with AI-powered personalization, inventory management, and seamless payment experiences at any scale.",
    outcomes: ["Handles 2M+ concurrent users", "AI product recommendations", "Multi-vendor support", "+40% conversion lift"],
    accent: "#f97316",
    gradient: "rgba(249, 115, 22, 0.15)",
  },
  {
    id: "education",
    category: "EdTech",
    title: "Education Technology",
    icon: GraduationCap,
    description: "Next-generation learning management systems, live streaming platforms, AI tutoring, and gamified learning experiences for modern education.",
    outcomes: ["Live video at scale", "AI-powered tutoring", "Gamification systems", "Certificate generation"],
    accent: "#ec4899",
    gradient: "rgba(236, 72, 153, 0.15)",
  },
  {
    id: "enterprise",
    category: "Enterprise",
    title: "Enterprise Software",
    icon: Building2,
    description: "Custom ERP, CRM, HRMS, and workflow automation systems designed specifically for your business processes — no off-the-shelf compromise.",
    outcomes: ["Custom workflows", "Role-based access", "Third-party integrations", "Business intelligence"],
    accent: "#7c3aed",
    gradient: "rgba(124, 92, 246, 0.15)",
  },
];

export default function SolutionsPage() {
  return (
    <div className="bg-[#050505] min-h-screen">
      <PageHero
        badge="Solutions"
        title="Industry-Specific"
        titleHighlight="Digital Solutions"
        description="We don't build generic software. We build solutions deeply tailored to your industry's unique challenges, compliance requirements, and growth objectives."
        gradient="rgba(6, 182, 212, 0.08)"
      />

      <section className="py-20 md:py-28 border-t border-white/5 relative">
        <div className="absolute inset-0 pointer-events-none opacity-[0.02] ng-grid-bg" />
        <div className="ng-container relative z-10">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {solutions.map((sol, i) => (
              <motion.div
                key={sol.id}
                id={sol.id}
                className="group rounded-3xl overflow-hidden border transition-all duration-500 flex flex-col justify-between"
                style={{
                  background: "rgba(255, 255, 255, 0.02)",
                  borderColor: "rgba(255, 255, 255, 0.05)",
                }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                whileHover={{ 
                  y: -5,
                  borderColor: sol.accent,
                  boxShadow: `0 20px 40px rgba(0, 0, 0, 0.3), 0 0 20px ${sol.accent}15`
                }}
              >
                {/* Top color bar */}
                <div className="h-1.5" style={{ background: `linear-gradient(to right, ${sol.accent}, ${sol.accent}60)` }} />

                <div className="p-7 flex flex-col justify-between flex-1">
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <span
                        className="text-xs font-semibold px-2.5 py-1 rounded-full"
                        style={{ color: sol.accent, background: `${sol.accent}10`, border: `1px solid ${sol.accent}20` }}
                      >
                        {sol.category}
                      </span>
                      
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center border" style={{ borderColor: `${sol.accent}20`, background: `${sol.accent}05` }}>
                        <sol.icon className="w-4 h-4" style={{ color: sol.accent }} />
                      </div>
                    </div>

                    <h3 className="text-white font-bold text-xl mb-3 font-sora">{sol.title}</h3>
                    <p className="text-slate-400 text-[13.5px] leading-relaxed mb-5">{sol.description}</p>

                    <div className="space-y-2.5 mb-6 pt-4 border-t border-white/[0.04]">
                      {sol.outcomes.map((o) => (
                        <div key={o} className="flex items-center gap-2.5 text-slate-400 text-xs sm:text-[13px]">
                          <div className="w-4 h-4 rounded-full flex-shrink-0 flex items-center justify-center bg-white/[0.02] border border-white/[0.05]">
                            <Check className="w-2.5 h-2.5" style={{ color: sol.accent }} />
                          </div>
                          <span>{o}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider group/link transition-colors pt-2"
                    style={{ color: sol.accent }}
                  >
                    Explore solution
                    <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Contact />
    </div>
  );
}
