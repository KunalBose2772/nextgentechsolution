"use client";

import PageHero from "@/components/common/PageHero";
import Contact from "@/components/sections/Contact";
import TrustedBy from "@/components/sections/TrustedBy";
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
    <div className="min-h-screen bg-[#fafbfc]">

      <PageHero
        badge="Solutions"
        title="Industry-Specific"
        titleHighlight="Digital Solutions"
        description="We don't build generic software. We build solutions deeply tailored to your industry's unique challenges, compliance requirements, and growth objectives."
        breadcrumbs={[{ label: "Solutions" }]}
      />

      {/* Social Proof Marquee for Premium Aesthetic */}
      <TrustedBy />

      {/* Main Grid Section */}
      <section className="py-24 relative overflow-hidden bg-gradient-to-b from-[#fafbfc] to-slate-50 border-b border-slate-200/50">
        {/* Fine Technical Grid Overlay */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-[0.35]"
          style={{
            backgroundImage: "linear-gradient(rgba(15,23,42,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,0.015) 1px, transparent 1px)",
            backgroundSize: "64px 64px"
          }}
        />

        {/* Dynamic Light Blurs for Background Depth */}
        <div className="absolute top-[10%] left-[-5%] w-[400px] h-[400px] bg-[radial-gradient(circle,_rgba(124,58,237,0.04)_0%,_transparent_75%)] blur-[100px] pointer-events-none" />
        <div className="absolute bottom-[20%] right-[-5%] w-[400px] h-[400px] bg-[radial-gradient(circle,_rgba(6,182,212,0.04)_0%,_transparent_75%)] blur-[100px] pointer-events-none" />

        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider text-[var(--accent-global)] bg-[var(--accent-global-dim)] mb-4">
              Enterprise Domains
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4 font-sora">
              Tailored Engineering for <span className="text-[var(--accent-global)]">Your Industry</span>
            </h2>
            <p className="text-slate-500 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
              We leverage mature engineering templates, pre-audited compliance protocols, and scalable cloud blueprints to accelerate your custom product roadmap.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {solutions.map((sol) => (
              <div
                key={sol.id}
                id={sol.id}
                className="bg-white border border-slate-200/80 rounded-3xl overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:shadow-slate-200/40 hover:-translate-y-2 group"
                style={{ padding: 0 }}
              >
                {/* Solution Card Image */}
                <div className="relative h-52 w-full overflow-hidden border-b border-slate-100">
                  <img
                    src={sol.image}
                    alt={sol.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div 
                    className="absolute inset-0 opacity-15 pointer-events-none transition-opacity duration-300 group-hover:opacity-25" 
                    style={{
                      background: `linear-gradient(to bottom, transparent, ${sol.accent})`
                    }}
                  />
                  {/* Float Icon Badge */}
                  <div 
                    className="absolute top-4 right-4 w-9 h-9 rounded-xl flex items-center justify-center backdrop-blur-md border border-white/40 shadow-sm transition-transform duration-300 group-hover:scale-105"
                    style={{ backgroundColor: "rgba(255, 255, 255, 0.85)" }}
                  >
                    <sol.icon className="w-5 h-5" style={{ color: sol.accent }} />
                  </div>
                </div>

                <div className="p-6 flex flex-col justify-between flex-1 bg-white">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span
                        className="inline-flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full"
                        style={{ color: sol.accent, backgroundColor: `${sol.accent}12`, border: `1px solid ${sol.accent}20` }}
                      >
                        <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: sol.accent }} />
                        {sol.category}
                      </span>
                    </div>

                    <h3 className="font-bold text-base mb-2 font-sora text-slate-900 group-hover:text-[var(--accent-global)] transition-colors duration-200">{sol.title}</h3>
                    <p className="text-xs sm:text-sm leading-relaxed mb-5 text-slate-500">{sol.description}</p>

                    <div className="space-y-2 mb-6 pt-4 border-t border-slate-100">
                      {sol.outcomes.map((o) => (
                        <div key={o} className="flex items-center gap-2.5 text-xs text-slate-650 font-medium">
                          <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110" style={{ backgroundColor: `${sol.accent}10` }}>
                            <Check className="w-3 h-3" style={{ color: sol.accent }} />
                          </div>
                          <span>{o}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-1.5 text-xs font-bold transition-all pt-2 group/btn hover:opacity-85"
                    style={{ color: sol.accent }}
                  >
                    <span>Explore solution</span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Contact />
    </div>
  );
}
