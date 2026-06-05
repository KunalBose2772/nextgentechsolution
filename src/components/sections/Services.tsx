"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Code2, Smartphone, Layers, Brain, Cloud, Server,
  BarChart3, Palette, Zap, Settings2, ArrowRight, ChevronRight, CheckCircle2
} from "lucide-react";
import Link from "next/link";
import SectionHeader from "@/components/ui/SectionHeader";
import SectionGlow from "@/components/ui/SectionGlow";

// Category definitions
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

// Single Service Card Component
function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }

  return (
    <motion.div
      layout
      className="group relative rounded-2xl p-6 bg-white border border-slate-200/80 overflow-hidden cursor-pointer flex flex-col justify-between"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay: index * 0.03 }}
      whileHover={{ 
        y: -6,
        borderColor: "rgba(var(--accent-primary-rgb), 0.35)",
        boxShadow: "0 20px 40px -10px rgba(15, 23, 42, 0.08), 0 0 0 1px rgba(var(--accent-primary-rgb), 0.1)"
      }}
      style={{
        boxShadow: "0 4px 20px -4px rgba(15, 23, 42, 0.04), 0 1px 3px rgba(15, 23, 42, 0.02)",
        transition: "border-color 0.25s ease, box-shadow 0.25s ease"
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Spotlight Tracking Layer */}
      {isHovered && (
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300 z-0"
          style={{
            background: `radial-gradient(220px circle at ${coords.x}px ${coords.y}px, rgba(var(--accent-primary-rgb), 0.06), transparent 85%)`,
          }}
        />
      )}

      <div className="relative z-10 flex flex-col h-full">
        {/* Header: Icon & Category Indicator */}
        <div className="flex items-center justify-between mb-5">
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-105"
            style={{ backgroundColor: "var(--accent-primary-dim)" }}
          >
            <service.icon className="w-5 h-5" style={{ color: "var(--accent-primary)" }} />
          </div>
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest bg-slate-50/50 px-2.5 py-1 rounded-full border border-slate-200/60">
            {service.category}
          </span>
        </div>

        {/* Title */}
        <h3
          className="text-[17px] font-bold mb-2 mt-1"
          style={{ fontFamily: "Sora, sans-serif", color: "#0F172A" }}
        >
          {service.title}
        </h3>

        {/* Description */}
        <p className="text-[13.5px] leading-[1.65] mb-5 flex-grow" style={{ color: "#334155" }}>
          {service.description}
        </p>

        {/* Features Checklist */}
        <div className="space-y-2 mb-6 border-t border-slate-100 pt-4">
          {service.features.map((feature) => (
            <div key={feature} className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 shrink-0" style={{ color: "var(--accent-blue)" }} />
              <span className="text-[12.5px] font-medium" style={{ color: "#334155" }}>{feature}</span>
            </div>
          ))}
        </div>

        {/* CTA Link */}
        <div className="pt-4 border-t border-slate-100 mt-2 flex">
          <Link
            href={`/services#${service.id}`}
            className="inline-flex self-start items-center gap-1.5 text-[13px] font-semibold px-5 py-2 rounded-full text-white transition-all duration-200 cursor-pointer"
            style={{ 
              backgroundColor: "var(--accent-blue)",
              boxShadow: "0 4px 12px 0 rgba(37, 99, 235, 0.22)",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.backgroundColor = "var(--accent-primary-hover)";
              e.currentTarget.style.boxShadow = "0 6px 18px 0 rgba(37, 99, 235, 0.32)";
              e.currentTarget.style.transform = "translateY(-1.5px)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.backgroundColor = "var(--accent-blue)";
              e.currentTarget.style.boxShadow = "0 4px 12px 0 rgba(37, 99, 235, 0.22)";
              e.currentTarget.style.transform = "none";
            }}
          >
            Explore service 
            <ChevronRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export default function Services() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredServices = services.filter((service) => {
    if (activeCategory === "all") return true;
    return service.category === activeCategory;
  });

  return (
    <section className="py-6 sm:py-10 relative" id="services">
      <SectionGlow />

      {/* Curved Visual Capsule Section Wrapper */}
      <div 
        className="relative mx-[20px] md:mx-[30px] rounded-[32px] sm:rounded-[40px] lg:rounded-[48px] overflow-hidden border border-slate-200/50 shadow-2xl py-[20px] md:py-[30px] z-30"
        style={{
          background: "linear-gradient(180deg, #F8FAFC 0%, #EFF6FF 100%)",
        }}
      >
        {/* Technical Dotted Grid Background */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-[0.25] z-0" 
          style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, rgba(6, 182, 212, 0.15) 1.5px, transparent 0)",
            backgroundSize: "24px 24px"
          }}
        />

        {/* Large Blurry Colored Ambient Glows */}
        <div 
          className="absolute top-[-10%] left-[-15%] w-[450px] h-[450px] rounded-full pointer-events-none opacity-[0.14] blur-[90px] z-0" 
          style={{ background: "radial-gradient(circle, #06B6D4 0%, transparent 70%)" }} 
        />
        <div 
          className="absolute bottom-[-10%] right-[-15%] w-[500px] h-[500px] rounded-full pointer-events-none opacity-[0.10] blur-[100px] z-0" 
          style={{ background: "radial-gradient(circle, #3B82F6 0%, transparent 70%)" }} 
        />

        <div className="ng-container relative z-10">
          
          {/* Section Header — text left, tabs right */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 mb-14">

            {/* Left: text */}
            <div className="max-w-xl">
              <SectionHeader
                theme="light"
                badge="Our Services"
                title="Everything You Need to"
                titleHighlight="Build & Scale"
                description="From concept to launch and beyond — end-to-end technology services for every stage of your digital journey."
                align="left"
              />
            </div>

            {/* Right: liquid glass filter tabs */}
            <div className="flex justify-start lg:justify-end shrink-0">
              <div
                className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-full"
                style={{
                  background: "rgba(255, 255, 255, 0.30)",
                  backdropFilter: "blur(20px) saturate(180%)",
                  WebkitBackdropFilter: "blur(20px) saturate(180%)",
                  border: "1px solid rgba(255, 255, 255, 0.45)",
                  boxShadow: "0 4px 24px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.7)",
                }}
              >
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`relative px-5 py-2.5 rounded-full text-[13px] font-medium transition-all duration-300 focus:outline-none cursor-pointer ${
                      activeCategory === cat.id ? "text-white" : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    <span className="relative z-10">{cat.label}</span>
                    {activeCategory === cat.id && (
                      <motion.div
                        layoutId="active-service-tab"
                        className="absolute inset-0 rounded-full shadow-sm z-0"
                        style={{ backgroundColor: "var(--accent-blue)" }}
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Cards Grid with Framer Motion AnimatePresence and layout springs */}
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredServices.map((service, index) => (
                <motion.div
                  key={service.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95, y: 15 }}
                  transition={{ duration: 0.45 }}
                  className="flex h-full"
                >
                  <ServiceCard service={service} index={index} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Bottom Call To Action */}
          <motion.div
            className="text-center mt-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-[13px] font-semibold px-6 py-2.5 rounded-full text-white transition-all duration-200 cursor-pointer group"
              style={{
                backgroundColor: "var(--accent-blue)",
                boxShadow: "0 4px 12px 0 rgba(37, 99, 235, 0.22)",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.backgroundColor = "var(--accent-primary-hover)";
                e.currentTarget.style.boxShadow = "0 6px 18px 0 rgba(37, 99, 235, 0.32)";
                e.currentTarget.style.transform = "translateY(-1.5px)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.backgroundColor = "var(--accent-blue)";
                e.currentTarget.style.boxShadow = "0 4px 12px 0 rgba(37, 99, 235, 0.22)";
                e.currentTarget.style.transform = "none";
              }}
            >
              View All Services
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
