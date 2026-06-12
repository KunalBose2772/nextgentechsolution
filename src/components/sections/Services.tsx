"use client";

import { useState } from "react";
import {
  Code2, Smartphone, Layers, Brain, Cloud, Server,
  BarChart3, Palette, Zap, Settings2, ArrowRight, ChevronRight, CheckCircle2
} from "lucide-react";
import Link from "next/link";

const categories = [
  { id: "all", label: "All Services" },
  { id: "software", label: "Software & SaaS" },
  { id: "ai-cloud", label: "AI & Cloud" },
  { id: "design-growth", label: "Design & Growth" }
];

const services = [
  {
    icon: Code2, title: "Web Development", id: "web", category: "software",
    description: "Full-stack modern web applications built with Next.js, React, TypeScript, and cloud infrastructure.",
    features: ["Next.js & React", "TypeScript", "REST & GraphQL APIs", "Progressive Web Apps"],
  },
  {
    icon: Smartphone, title: "Mobile App Development", id: "mobile", category: "software",
    description: "Native iOS and Android apps, plus cross-platform solutions with React Native and Flutter.",
    features: ["React Native", "Flutter", "iOS & Android", "App Store Optimization"],
  },
  {
    icon: Layers, title: "SaaS Platforms", id: "saas", category: "software",
    description: "Multi-tenant SaaS with subscription management, analytics, and enterprise-grade scalability.",
    features: ["Multi-tenancy", "Subscription billing", "Real-time dashboards", "API-first design"],
  },
  {
    icon: Brain, title: "AI & ML Solutions", id: "ai", category: "ai-cloud",
    description: "Intelligent automation, predictive analytics, NLP, and custom AI integrations.",
    features: ["GPT integrations", "Custom ML models", "Computer vision", "Predictive analytics"],
  },
  {
    icon: Cloud, title: "Cloud Computing", id: "cloud", category: "ai-cloud",
    description: "Cloud architecture, migration, and optimization across AWS, Azure, and GCP.",
    features: ["AWS / Azure / GCP", "Serverless architecture", "Cost optimization", "99.99% uptime SLA"],
  },
  {
    icon: Server, title: "DevOps & CI/CD", id: "devops", category: "ai-cloud",
    description: "Streamlined pipelines, infrastructure as code, container orchestration, and monitoring.",
    features: ["Docker & Kubernetes", "CI/CD pipelines", "Infrastructure as code", "24/7 monitoring"],
  },
  {
    icon: BarChart3, title: "ERP & CRM Systems", id: "erp", category: "software",
    description: "Custom enterprise resource planning and CRM systems built for your unique workflow.",
    features: ["Custom ERP", "CRM integrations", "Workflow automation", "Business intelligence"],
  },
  {
    icon: Palette, title: "UI/UX Design", id: "design", category: "design-growth",
    description: "Pixel-perfect, user-centered design systems that drive conversion and engagement.",
    features: ["Design systems", "Figma prototypes", "User research", "Accessibility"],
  },
  {
    icon: Zap, title: "Digital Transformation", id: "transform", category: "design-growth",
    description: "End-to-end transformation strategies that modernize legacy systems and future-proof businesses.",
    features: ["Legacy modernization", "Process automation", "Technology audit", "Change management"],
  },
  {
    icon: Settings2, title: "Maintenance & Support", id: "support", category: "design-growth",
    description: "Ongoing support, performance monitoring, security patches, and continuous enhancement.",
    features: ["24/7 monitoring", "Security updates", "Performance tuning", "Dedicated support"],
  },
];

export default function Services() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredServices = services.filter((service) => {
    if (activeCategory === "all") return true;
    return service.category === activeCategory;
  });

  return (
    <section className="py-16 bg-slate-950 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-cyan-950/20 via-slate-950 to-slate-950 text-white border-t border-slate-900/50" id="services">
      <div className="max-w-7xl mx-auto px-4">
        
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 mb-2 block">
              OUR SERVICES
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Everything You Need to Build & Scale
            </h2>
            <p className="text-slate-400 mt-2 max-w-xl text-sm leading-relaxed">
              From concept to launch and beyond — end-to-end technology services for every stage of your digital journey.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-bold border transition-all ${
                  activeCategory === cat.id
                    ? "bg-cyan-400 text-slate-950 border-cyan-400"
                    : "bg-slate-900/50 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-white"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="p-6 bg-slate-900/40 border border-slate-800/60 rounded-2xl flex flex-col justify-between backdrop-blur-md transition-all duration-200 hover:-translate-y-1 hover:border-cyan-950/50"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-cyan-950/30 text-cyan-400 border border-cyan-900/30 flex items-center justify-center mb-4">
                  <service.icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white mb-2">{service.title}</h3>
                <p className="text-xs text-slate-400 mb-4 leading-relaxed">{service.description}</p>
                <div className="space-y-1.5 border-t border-slate-800/60 pt-4 mb-6">
                  {service.features.map((feat) => (
                    <div key={feat} className="flex items-center gap-2 text-xs text-slate-400">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <Link
                  href={`/services/${service.id}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  Explore service <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 bg-cyan-400 hover:bg-cyan-500 text-slate-950 font-bold text-xs px-6 py-3 rounded-full shadow-lg shadow-cyan-950/20 transition-all"
          >
            View All Services <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
}
