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
    image: "/images/solutions/digital_transformation.png",
    description: "End-to-end modernization of legacy systems, business processes, and technology infrastructure. We help enterprises evolve from outdated systems to cloud-native, AI-powered operations.",
    outcomes: ["60% reduction in operational costs", "3x faster time-to-market", "Zero legacy downtime migration", "Full cloud adoption"],
    accent: "#3b82f6",
  },
  {
    id: "fintech",
    category: "FinTech",
    title: "Financial Technology",
    icon: CreditCard,
    image: "/images/solutions/fintech.png",
    description: "Secure, compliant, and scalable financial platforms — from neobanks to payment gateways, investment dashboards, and blockchain solutions.",
    outcomes: ["PCI-DSS compliance", "Real-time transaction processing", "Fraud detection AI", "Open banking APIs"],
    accent: "#22c55e",
  },
  {
    id: "health",
    category: "HealthTech",
    title: "Healthcare Technology",
    icon: Activity,
    image: "/images/solutions/healthtech.png",
    description: "HIPAA-compliant telemedicine platforms, EHR systems, patient management solutions, and health analytics built for the modern healthcare ecosystem.",
    outcomes: ["HIPAA & HL7 compliant", "End-to-end encryption", "EHR integrations", "Real-time monitoring"],
    accent: "#06b6d4",
  },
  {
    id: "ecommerce",
    category: "E-Commerce",
    title: "Retail & E-Commerce",
    icon: ShoppingBag,
    image: "/images/solutions/ecommerce.png",
    description: "High-performance e-commerce platforms with AI-powered personalization, inventory management, and seamless payment experiences at any scale.",
    outcomes: ["Handles 2M+ concurrent users", "AI product recommendations", "Multi-vendor support", "+40% conversion lift"],
    accent: "#f97316",
  },
  {
    id: "education",
    category: "EdTech",
    title: "Education Technology",
    icon: GraduationCap,
    image: "/images/solutions/edtech.png",
    description: "Next-generation learning management systems, live streaming platforms, AI tutoring, and gamified learning experiences for modern education.",
    outcomes: ["Live video at scale", "AI-powered tutoring", "Gamification systems", "Certificate generation"],
    accent: "#ec4899",
  },
  {
    id: "enterprise",
    category: "Enterprise",
    title: "Enterprise Software",
    icon: Building2,
    image: "/images/solutions/enterprise.png",
    description: "Custom ERP, CRM, HRMS, and workflow automation systems designed specifically for your business processes — no off-the-shelf compromise.",
    outcomes: ["Custom workflows", "Role-based access", "Third-party integrations", "Business intelligence"],
    accent: "#7c3aed",
  },
];

export default function SolutionsPage() {
  return (
    <div className="min-h-screen" style={{ background: "var(--bg-primary)" }}>

      <PageHero
        badge="Solutions"
        title="Industry-Specific"
        titleHighlight="Digital Solutions"
        description="We don't build generic software. We build solutions deeply tailored to your industry's unique challenges, compliance requirements, and growth objectives."
        breadcrumbs={[{ label: "Solutions" }]}
      />

      <div className="max-w-7xl mx-auto px-4 py-24">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {solutions.map((sol) => (
            <div
              key={sol.id}
              id={sol.id}
              className="ng-card-dark overflow-hidden flex flex-col justify-between transition-all duration-300"
              style={{ padding: 0 }}
            >
              {/* Solution Card Image */}
              <div className="relative h-44 w-full overflow-hidden border-b border-white/[0.04] group">
                <img
                  src={sol.image}
                  alt={sol.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div 
                  className="absolute inset-0 opacity-20 pointer-events-none" 
                  style={{
                    background: `linear-gradient(to bottom, transparent, ${sol.accent})`
                  }}
                />
                {/* Float Icon Badge */}
                <div 
                  className="absolute top-4 right-4 w-8 h-8 rounded-xl flex items-center justify-center backdrop-blur-md border border-white/20"
                  style={{ backgroundColor: "rgba(10, 10, 12, 0.7)" }}
                >
                  <sol.icon className="w-4 h-4" style={{ color: sol.accent }} />
                </div>
              </div>

              <div className="p-6 flex flex-col justify-between flex-1">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className="text-[9px] font-bold px-2.5 py-1 rounded"
                      style={{ color: sol.accent, backgroundColor: `${sol.accent}16`, border: `1px solid ${sol.accent}25` }}
                    >
                      {sol.category}
                    </span>
                  </div>

                  <h3 className="font-bold text-base mb-2" style={{ color: "var(--text-primary)" }}>{sol.title}</h3>
                  <p className="text-xs leading-relaxed mb-5" style={{ color: "var(--text-secondary)" }}>{sol.description}</p>

                  <div className="space-y-2 mb-6 pt-4 border-t" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
                    {sol.outcomes.map((o) => (
                      <div key={o} className="flex items-center gap-2 text-xs" style={{ color: "var(--text-muted)" }}>
                        <div className="w-4 h-4 rounded-full flex items-center justify-center shrink-0" style={{ background: `${sol.accent}12` }}>
                          <Check className="w-2.5 h-2.5" style={{ color: sol.accent }} />
                        </div>
                        <span>{o}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Link
                  href="/contact"
                  className="inline-flex items-center gap-1.5 text-xs font-bold transition-colors pt-2 hover:brightness-110"
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
