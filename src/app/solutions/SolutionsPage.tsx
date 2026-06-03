"use client";

import { motion } from "framer-motion";
import PageHero from "@/components/common/PageHero";
import Contact from "@/components/sections/Contact";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const solutions = [
  {
    id: "digital",
    category: "Enterprise",
    title: "Digital Transformation",
    description: "End-to-end modernization of legacy systems, business processes, and technology infrastructure. We help enterprises evolve from outdated systems to cloud-native, AI-powered operations.",
    outcomes: ["60% reduction in operational costs", "3x faster time-to-market", "Zero legacy downtime migration", "Full cloud adoption"],
    accent: "#3b82f6",
    gradient: "from-blue-500/10 to-transparent",
  },
  {
    id: "fintech",
    category: "FinTech",
    title: "Financial Technology",
    description: "Secure, compliant, and scalable financial platforms — from neobanks to payment gateways, investment dashboards, and blockchain solutions.",
    outcomes: ["PCI-DSS compliance", "Real-time transaction processing", "Fraud detection AI", "Open banking APIs"],
    accent: "#22c55e",
    gradient: "from-green-500/10 to-transparent",
  },
  {
    id: "health",
    category: "HealthTech",
    title: "Healthcare Technology",
    description: "HIPAA-compliant telemedicine platforms, EHR systems, patient management solutions, and health analytics built for the modern healthcare ecosystem.",
    outcomes: ["HIPAA & HL7 compliant", "End-to-end encryption", "EHR integrations", "Real-time monitoring"],
    accent: "#06b6d4",
    gradient: "from-cyan-500/10 to-transparent",
  },
  {
    id: "ecommerce",
    category: "E-Commerce",
    title: "Retail & E-Commerce",
    description: "High-performance e-commerce platforms with AI-powered personalization, inventory management, and seamless payment experiences at any scale.",
    outcomes: ["Handles 2M+ concurrent users", "AI product recommendations", "Multi-vendor support", "+40% conversion lift"],
    accent: "#f97316",
    gradient: "from-orange-500/10 to-transparent",
  },
  {
    id: "education",
    category: "EdTech",
    title: "Education Technology",
    description: "Next-generation learning management systems, live streaming platforms, AI tutoring, and gamified learning experiences for modern education.",
    outcomes: ["Live video at scale", "AI-powered tutoring", "Gamification systems", "Certificate generation"],
    accent: "#ec4899",
    gradient: "from-pink-500/10 to-transparent",
  },
  {
    id: "enterprise",
    category: "Enterprise",
    title: "Enterprise Software",
    description: "Custom ERP, CRM, HRMS, and workflow automation systems designed specifically for your business processes — no off-the-shelf compromise.",
    outcomes: ["Custom workflows", "Role-based access", "Third-party integrations", "Business intelligence"],
    accent: "#7c3aed",
    gradient: "from-violet-500/10 to-transparent",
  },
];

export default function SolutionsPage() {
  return (
    <div className="bg-[#050505]">
      <PageHero
        badge="Solutions"
        title="Industry-Specific"
        titleHighlight="Digital Solutions"
        description="We don't build generic software. We build solutions deeply tailored to your industry's unique challenges, compliance requirements, and growth objectives."
      />

      <section className="py-20 border-t border-white/5">
        <div className="container-xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {solutions.map((sol, i) => (
              <motion.div
                key={sol.id}
                id={sol.id}
                className="group glass-card rounded-3xl overflow-hidden border border-white/6 hover:border-white/12 transition-all duration-500"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                whileHover={{ y: -4 }}
              >
                {/* Top color bar */}
                <div className="h-1.5" style={{ background: `linear-gradient(to right, ${sol.accent}, ${sol.accent}60)` }} />

                <div className="p-7">
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className="text-xs font-medium px-2.5 py-1 rounded-full"
                      style={{ color: sol.accent, background: `${sol.accent}15`, border: `1px solid ${sol.accent}25` }}
                    >
                      {sol.category}
                    </span>
                  </div>

                  <h3 className="text-white font-bold text-xl mb-3">{sol.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed mb-5">{sol.description}</p>

                  <div className="space-y-2 mb-6">
                    {sol.outcomes.map((o) => (
                      <div key={o} className="flex items-center gap-2.5 text-white/50 text-sm">
                        <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: sol.accent }} />
                        {o}
                      </div>
                    ))}
                  </div>

                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 text-sm font-medium group/link transition-colors"
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
