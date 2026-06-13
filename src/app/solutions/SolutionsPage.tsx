"use client";

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
  },
  {
    id: "fintech",
    category: "FinTech",
    title: "Financial Technology",
    icon: CreditCard,
    description: "Secure, compliant, and scalable financial platforms — from neobanks to payment gateways, investment dashboards, and blockchain solutions.",
    outcomes: ["PCI-DSS compliance", "Real-time transaction processing", "Fraud detection AI", "Open banking APIs"],
    accent: "#22c55e",
  },
  {
    id: "health",
    category: "HealthTech",
    title: "Healthcare Technology",
    icon: Activity,
    description: "HIPAA-compliant telemedicine platforms, EHR systems, patient management solutions, and health analytics built for the modern healthcare ecosystem.",
    outcomes: ["HIPAA & HL7 compliant", "End-to-end encryption", "EHR integrations", "Real-time monitoring"],
    accent: "#06b6d4",
  },
  {
    id: "ecommerce",
    category: "E-Commerce",
    title: "Retail & E-Commerce",
    icon: ShoppingBag,
    description: "High-performance e-commerce platforms with AI-powered personalization, inventory management, and seamless payment experiences at any scale.",
    outcomes: ["Handles 2M+ concurrent users", "AI product recommendations", "Multi-vendor support", "+40% conversion lift"],
    accent: "#f97316",
  },
  {
    id: "education",
    category: "EdTech",
    title: "Education Technology",
    icon: GraduationCap,
    description: "Next-generation learning management systems, live streaming platforms, AI tutoring, and gamified learning experiences for modern education.",
    outcomes: ["Live video at scale", "AI-powered tutoring", "Gamification systems", "Certificate generation"],
    accent: "#ec4899",
  },
  {
    id: "enterprise",
    category: "Enterprise",
    title: "Enterprise Software",
    icon: Building2,
    description: "Custom ERP, CRM, HRMS, and workflow automation systems designed specifically for your business processes — no off-the-shelf compromise.",
    outcomes: ["Custom workflows", "Role-based access", "Third-party integrations", "Business intelligence"],
    accent: "#7c3aed",
  },
];

export default function SolutionsPage() {
  return (
    <div className="bg-white min-h-screen text-slate-800">

      <PageHero
        badge="Solutions"
        title="Industry-Specific"
        titleHighlight="Digital Solutions"
        description="We don't build generic software. We build solutions deeply tailored to your industry's unique challenges, compliance requirements, and growth objectives."
        breadcrumbs={[{ label: "Solutions" }]}
      />

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {solutions.map((sol) => (
            <div
              key={sol.id}
              id={sol.id}
              className="bg-white border border-slate-200/60 rounded-3xl overflow-hidden flex flex-col justify-between hover:-translate-y-1 hover:shadow-sm transition-all duration-200"
            >
              {/* Top accent bar */}
              <div className="h-1" style={{ backgroundColor: sol.accent }} />

              <div className="p-6 flex flex-col justify-between flex-1">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className="text-[9px] font-bold px-2.5 py-1 rounded"
                      style={{ color: sol.accent, backgroundColor: `${sol.accent}12` }}
                    >
                      {sol.category}
                    </span>
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-slate-50 border border-slate-100">
                      <sol.icon className="w-4 h-4" style={{ color: sol.accent }} />
                    </div>
                  </div>

                  <h3 className="text-slate-900 font-bold text-lg mb-2">{sol.title}</h3>
                  <p className="text-slate-550 text-xs leading-relaxed mb-5">{sol.description}</p>

                  <div className="space-y-2 mb-6 pt-4 border-t border-slate-100">
                    {sol.outcomes.map((o) => (
                      <div key={o} className="flex items-center gap-2 text-xs text-slate-600">
                        <Check className="w-3.5 h-3.5 shrink-0" style={{ color: sol.accent }} />
                        <span>{o}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Link
                  href="/contact"
                  className="inline-flex items-center gap-1.5 text-xs font-bold transition-colors pt-2"
                  style={{ color: sol.accent }}
                >
                  Explore solution <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Contact />
    </div>
  );
}
