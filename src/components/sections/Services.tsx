"use client";

import { motion } from "framer-motion";
import {
  Code2, Smartphone, Layers, Brain, Cloud, Server,
  BarChart3, Palette, Zap, Settings2, ArrowRight, ChevronRight,
} from "lucide-react";
import Link from "next/link";
import SectionHeader from "@/components/ui/SectionHeader";

const services = [
  {
    icon: Code2, title: "Web Development", id: "web",
    description: "Full-stack modern web applications built with Next.js, React, TypeScript, and cloud infrastructure.",
    features: ["Next.js & React", "TypeScript", "REST & GraphQL APIs", "Progressive Web Apps"],
  },
  {
    icon: Smartphone, title: "Mobile App Development", id: "mobile",
    description: "Native iOS and Android apps, plus cross-platform solutions with React Native and Flutter.",
    features: ["React Native", "Flutter", "iOS & Android", "App Store Optimization"],
  },
  {
    icon: Layers, title: "SaaS Platforms", id: "saas",
    description: "Multi-tenant SaaS with subscription management, analytics, and enterprise-grade scalability.",
    features: ["Multi-tenancy", "Subscription billing", "Real-time dashboards", "API-first design"],
  },
  {
    icon: Brain, title: "AI & ML Solutions", id: "ai",
    description: "Intelligent automation, predictive analytics, NLP, and custom AI integrations.",
    features: ["GPT integrations", "Custom ML models", "Computer vision", "Predictive analytics"],
  },
  {
    icon: Cloud, title: "Cloud Computing", id: "cloud",
    description: "Cloud architecture, migration, and optimization across AWS, Azure, and GCP.",
    features: ["AWS / Azure / GCP", "Serverless architecture", "Cost optimization", "99.99% uptime SLA"],
  },
  {
    icon: Server, title: "DevOps & CI/CD", id: "devops",
    description: "Streamlined pipelines, infrastructure as code, container orchestration, and monitoring.",
    features: ["Docker & Kubernetes", "CI/CD pipelines", "Infrastructure as code", "24/7 monitoring"],
  },
  {
    icon: BarChart3, title: "ERP & CRM Systems", id: "erp",
    description: "Custom enterprise resource planning and CRM systems built for your unique workflow.",
    features: ["Custom ERP", "CRM integrations", "Workflow automation", "Business intelligence"],
  },
  {
    icon: Palette, title: "UI/UX Design", id: "design",
    description: "Pixel-perfect, user-centered design systems that drive conversion and engagement.",
    features: ["Design systems", "Figma prototypes", "User research", "Accessibility"],
  },
  {
    icon: Zap, title: "Digital Transformation", id: "transform",
    description: "End-to-end transformation strategies that modernize legacy systems and future-proof businesses.",
    features: ["Legacy modernization", "Process automation", "Technology audit", "Change management"],
  },
  {
    icon: Settings2, title: "Maintenance & Support", id: "support",
    description: "Ongoing support, performance monitoring, security patches, and continuous enhancement.",
    features: ["24/7 monitoring", "Security updates", "Performance tuning", "Dedicated support"],
  },
];

function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  return (
    <motion.div
      className="group rounded-[20px] p-6 cursor-pointer transition-all duration-300"
      style={{
        background: "#121A2B",
        border: "1px solid rgba(255,255,255,0.06)",
        boxShadow: "0 10px 40px rgba(0,0,0,0.20)",
      }}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: index * 0.04 }}
      whileHover={{ y: -4 }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(37,99,235,0.24)"; e.currentTarget.style.boxShadow = "0 20px 60px rgba(0,0,0,0.35)"; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"; e.currentTarget.style.boxShadow = "0 10px 40px rgba(0,0,0,0.20)"; }}
    >
      {/* Icon */}
      <div
        className="w-11 h-11 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-105"
        style={{ background: "rgba(37,99,235,0.10)" }}
      >
        <service.icon className="w-5 h-5" style={{ color: "#2563EB" }} />
      </div>

      {/* Title */}
      <h3
        className="text-[16px] font-semibold text-white mb-2"
        style={{ fontFamily: "Sora, sans-serif" }}
      >
        {service.title}
      </h3>

      {/* Description */}
      <p className="text-[14px] leading-[1.65] mb-4" style={{ color: "#94A3B8" }}>
        {service.description}
      </p>

      {/* Features */}
      <div className="space-y-1.5 mb-5">
        {service.features.map((feature) => (
          <div key={feature} className="flex items-center gap-2">
            <div className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: "#2563EB" }} />
            <span className="text-[12px]" style={{ color: "#64748B" }}>{feature}</span>
          </div>
        ))}
      </div>

      {/* CTA */}
      <Link
        href={`/services#${service.id}`}
        className="inline-flex items-center gap-1.5 text-[13px] font-medium transition-all duration-200 opacity-0 group-hover:opacity-100"
        style={{ color: "#2563EB" }}
      >
        Learn more <ChevronRight className="w-3.5 h-3.5" />
      </Link>
    </motion.div>
  );
}

export default function Services() {
  return (
    <section className="ng-section relative overflow-hidden" id="services" style={{ background: "#0F1422" }}>
      <div className="ng-container">
        <div className="mb-14">
          <SectionHeader
            badge="Services"
            title="Everything You Need to"
            titleHighlight="Build & Scale"
            description="From concept to launch and beyond — end-to-end technology services for every stage of your digital journey."
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {services.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Link href="/services" className="ng-btn-ghost">
            View All Services
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
