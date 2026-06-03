"use client";

import { useRef } from "react";
import { motion, useMotionValue } from "framer-motion";
import {
  Code2, Smartphone, Layers, Brain, Cloud, Server,
  BarChart3, Settings, Palette, Zap, ArrowRight, ChevronRight,
} from "lucide-react";
import Link from "next/link";
import SectionHeader from "@/components/ui/SectionHeader";

const services = [
  {
    icon: Code2, title: "Web Development", id: "web",
    description: "Full-stack modern web applications built with Next.js, React, TypeScript, and cutting-edge cloud infrastructure.",
    features: ["Next.js & React", "TypeScript", "REST & GraphQL APIs", "Progressive Web Apps"],
    gradient: "from-blue-500/20 to-blue-600/5",
    glow: "rgba(59,130,246,0.15)",
    iconBg: "bg-blue-500/20",
    iconColor: "text-blue-400",
    borderHover: "hover:border-blue-500/30",
  },
  {
    icon: Smartphone, title: "Mobile App Development", id: "mobile",
    description: "Native iOS and Android apps, plus cross-platform solutions using React Native and Flutter.",
    features: ["React Native", "Flutter", "iOS & Android", "App Store Optimization"],
    gradient: "from-violet-500/20 to-violet-600/5",
    glow: "rgba(124,58,237,0.15)",
    iconBg: "bg-violet-500/20",
    iconColor: "text-violet-400",
    borderHover: "hover:border-violet-500/30",
  },
  {
    icon: Layers, title: "SaaS Platforms", id: "saas",
    description: "Multi-tenant SaaS platforms with subscription management, analytics dashboards, and enterprise-grade scalability.",
    features: ["Multi-tenancy", "Subscription billing", "Real-time dashboards", "API-first design"],
    gradient: "from-cyan-500/20 to-cyan-600/5",
    glow: "rgba(6,182,212,0.15)",
    iconBg: "bg-cyan-500/20",
    iconColor: "text-cyan-400",
    borderHover: "hover:border-cyan-500/30",
  },
  {
    icon: Brain, title: "AI & ML Solutions", id: "ai",
    description: "Intelligent automation, predictive analytics, NLP, and custom AI integrations that give your business a competitive edge.",
    features: ["GPT integrations", "Custom ML models", "Computer vision", "Predictive analytics"],
    gradient: "from-green-500/20 to-green-600/5",
    glow: "rgba(34,197,94,0.15)",
    iconBg: "bg-green-500/20",
    iconColor: "text-green-400",
    borderHover: "hover:border-green-500/30",
  },
  {
    icon: Cloud, title: "Cloud Computing", id: "cloud",
    description: "Cloud architecture, migration, and optimization across AWS, Azure, and Google Cloud Platform.",
    features: ["AWS / Azure / GCP", "Serverless architecture", "Cost optimization", "99.99% uptime SLA"],
    gradient: "from-orange-500/20 to-orange-600/5",
    glow: "rgba(249,115,22,0.15)",
    iconBg: "bg-orange-500/20",
    iconColor: "text-orange-400",
    borderHover: "hover:border-orange-500/30",
  },
  {
    icon: Server, title: "DevOps & CI/CD", id: "devops",
    description: "Streamlined deployment pipelines, infrastructure as code, container orchestration, and automated monitoring.",
    features: ["Docker & Kubernetes", "CI/CD pipelines", "Infrastructure as code", "24/7 monitoring"],
    gradient: "from-pink-500/20 to-pink-600/5",
    glow: "rgba(236,72,153,0.15)",
    iconBg: "bg-pink-500/20",
    iconColor: "text-pink-400",
    borderHover: "hover:border-pink-500/30",
  },
  {
    icon: BarChart3, title: "ERP & CRM Systems", id: "erp",
    description: "Custom enterprise resource planning and customer relationship management systems built for your unique workflow.",
    features: ["Custom ERP", "CRM integrations", "Workflow automation", "Business intelligence"],
    gradient: "from-teal-500/20 to-teal-600/5",
    glow: "rgba(20,184,166,0.15)",
    iconBg: "bg-teal-500/20",
    iconColor: "text-teal-400",
    borderHover: "hover:border-teal-500/30",
  },
  {
    icon: Palette, title: "UI/UX Design", id: "design",
    description: "Pixel-perfect, user-centered design systems that create memorable digital experiences and drive conversion.",
    features: ["Design systems", "Figma prototypes", "User research", "Accessibility"],
    gradient: "from-yellow-500/20 to-yellow-600/5",
    glow: "rgba(234,179,8,0.15)",
    iconBg: "bg-yellow-500/20",
    iconColor: "text-yellow-400",
    borderHover: "hover:border-yellow-500/30",
  },
  {
    icon: Zap, title: "Digital Transformation", id: "transform",
    description: "End-to-end digital transformation strategies that modernize legacy systems and future-proof your business.",
    features: ["Legacy modernization", "Process automation", "Technology audit", "Change management"],
    gradient: "from-indigo-500/20 to-indigo-600/5",
    glow: "rgba(99,102,241,0.15)",
    iconBg: "bg-indigo-500/20",
    iconColor: "text-indigo-400",
    borderHover: "hover:border-indigo-500/30",
  },
  {
    icon: Settings, title: "Maintenance & Support", id: "support",
    description: "Ongoing technical support, performance monitoring, security patches, and continuous feature enhancement.",
    features: ["24/7 monitoring", "Security updates", "Performance tuning", "Dedicated support"],
    gradient: "from-slate-500/20 to-slate-600/5",
    glow: "rgba(100,116,139,0.15)",
    iconBg: "bg-slate-500/20",
    iconColor: "text-slate-400",
    borderHover: "hover:border-slate-500/30",
  },
];

function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (rect) {
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    }
  };

  return (
    <motion.div
      ref={cardRef}
      className={`relative group glass-card rounded-2xl p-6 border border-white/5 ${service.borderHover} transition-all duration-300 cursor-pointer overflow-hidden`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      whileHover={{ y: -4 }}
      onMouseMove={handleMouseMove}
    >
      {/* Spotlight effect */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"
        style={{
          background: `radial-gradient(300px circle at ${mouseX.get()}px ${mouseY.get()}px, ${service.glow}, transparent 70%)`,
        }}
      />

      {/* Gradient overlay */}
      <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none`} />

      <div className="relative z-10">
        {/* Icon */}
        <div className={`w-12 h-12 rounded-xl ${service.iconBg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
          <service.icon className={`w-6 h-6 ${service.iconColor}`} />
        </div>

        {/* Title */}
        <h3 className="text-white font-bold text-lg mb-2 group-hover:text-white transition-colors">
          {service.title}
        </h3>

        {/* Description */}
        <p className="text-white/50 text-sm leading-relaxed mb-4 group-hover:text-white/60 transition-colors">
          {service.description}
        </p>

        {/* Features */}
        <div className="space-y-1.5 mb-5">
          {service.features.map((feature) => (
            <div key={feature} className="flex items-center gap-2">
              <div className={`w-1.5 h-1.5 rounded-full ${service.iconColor.replace("text-", "bg-")}`} />
              <span className="text-white/40 text-xs group-hover:text-white/55 transition-colors">{feature}</span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <Link
          href={`/services#${service.id}`}
          className={`inline-flex items-center gap-1.5 ${service.iconColor} text-sm font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 hover:gap-2.5`}
        >
          Learn more <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
    </motion.div>
  );
}

export default function Services() {
  return (
    <section className="section-padding relative overflow-hidden bg-[#050505]" id="services">
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/3 rounded-full blur-3xl" />

      <div className="container-xl relative">
        <div className="mb-16">
          <SectionHeader
            badge="Our Services"
            title="Everything You Need to"
            titleHighlight="Build & Scale"
            description="From concept to launch and beyond — we offer end-to-end technology services that cover every stage of your digital journey."
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {services.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Link
            href="/services"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-white/10 hover:border-blue-500/40 text-white/70 hover:text-white font-medium transition-all group"
          >
            View All Services
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
