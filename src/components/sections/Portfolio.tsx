"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, TrendingUp } from "lucide-react";
import Link from "next/link";
import SectionHeader from "@/components/ui/SectionHeader";

const categories = ["All", "Web App", "Mobile", "SaaS", "AI/ML", "E-Commerce"];

const projects = [
  {
    id: "1", title: "FinanceIQ Dashboard", category: "SaaS",
    description: "Real-time financial analytics platform with AI-powered insights, serving 10K+ daily active users.",
    tags: ["Next.js", "Python", "PostgreSQL", "Stripe"],
    metrics: [{ label: "Users", value: "10K+" }, { label: "Revenue", value: "$2M+" }],
    size: "large",
  },
  {
    id: "2", title: "MediConnect App", category: "Mobile",
    description: "Healthcare platform connecting 500+ doctors with patients for telemedicine consultations.",
    tags: ["React Native", "Node.js", "MongoDB"],
    metrics: [{ label: "Doctors", value: "500+" }, { label: "Consultations", value: "50K+" }],
    size: "small",
  },
  {
    id: "3", title: "ShopSmart AI", category: "E-Commerce",
    description: "AI-powered e-commerce platform with personalized recommendations and dynamic pricing.",
    tags: ["Next.js", "OpenAI", "Stripe", "Redis"],
    metrics: [{ label: "GMV", value: "$5M+" }, { label: "Conversion", value: "+45%" }],
    size: "small",
  },
  {
    id: "4", title: "LogiTrack Enterprise", category: "Web App",
    description: "Supply chain management handling 2M+ daily shipment trackings for a global logistics firm.",
    tags: ["React", "Java Spring", "PostgreSQL", "Docker"],
    metrics: [{ label: "Shipments/day", value: "2M+" }, { label: "Cost Save", value: "30%" }],
    size: "small",
  },
  {
    id: "5", title: "SentimentAI Platform", category: "AI/ML",
    description: "Real-time social media sentiment analysis processing 1M+ posts per day for brand monitoring.",
    tags: ["Python", "TensorFlow", "AWS", "React"],
    metrics: [{ label: "Posts/day", value: "1M+" }, { label: "Accuracy", value: "97%" }],
    size: "large",
  },
  {
    id: "6", title: "EduLearn Pro", category: "SaaS",
    description: "Online learning management system with live classes, AI tutoring, and certification tracking.",
    tags: ["Next.js", "WebRTC", "Node.js", "MongoDB"],
    metrics: [{ label: "Students", value: "25K+" }, { label: "Courses", value: "500+" }],
    size: "small",
  },
];

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  return (
    <motion.div
      className={`group rounded-[20px] overflow-hidden transition-all duration-300 cursor-pointer ${
        project.size === "large" ? "md:col-span-2" : ""
      }`}
      style={{
        background: "var(--bg-surface)",
        border: "1px solid rgba(255,255,255,0.06)",
      }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: index * 0.06, duration: 0.4 }}
      whileHover={{ y: -4 }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(var(--accent-primary-rgb),0.22)"; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"; }}
    >
      {/* Visual Placeholder */}
      <div
        className="relative h-36 flex items-center justify-center ng-grid-bg"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div
          className="w-14 h-14 rounded-[14px] flex items-center justify-center text-white text-xl font-semibold"
          style={{
            background: "rgba(var(--accent-primary-rgb),0.15)",
            border: "1px solid rgba(var(--accent-primary-rgb),0.25)",
            fontFamily: "Sora, sans-serif",
          }}
        >
          {project.title.charAt(0)}
        </div>
        {/* Category badge */}
        <div
          className="absolute top-3 left-3 text-[11px] font-medium px-2.5 py-1 rounded-full"
          style={{
            background: "rgba(var(--accent-primary-rgb),0.10)",
            border: "1px solid rgba(var(--accent-primary-rgb),0.20)",
            color: "var(--accent-primary)",
          }}
        >
          {project.category}
        </div>
      </div>

      <div className="p-5">
        <h3
          className="text-[15px] font-semibold text-white mb-2"
          style={{ fontFamily: "Sora, sans-serif" }}
        >
          {project.title}
        </h3>
        <p className="text-[13px] leading-[1.65] mb-4" style={{ color: "#94A3B8" }}>
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-[11px] px-2 py-0.5 rounded-md"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.06)",
                color: "#64748B",
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Metrics */}
        <div className="flex items-center gap-4 pt-4 border-t" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
          {project.metrics.map((m) => (
            <div key={m.label} className="flex items-center gap-1.5">
              <TrendingUp className="w-3 h-3" style={{ color: "var(--accent-primary)" }} />
              <span className="text-[12px]" style={{ color: "#94A3B8" }}>
                <span className="font-medium text-white">{m.value}</span> {m.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function Portfolio() {
  const [active, setActive] = useState("All");

  const filtered = active === "All" ? projects : projects.filter((p) => p.category === active);

  return (
    <section
      className="ng-section relative overflow-hidden"
      id="portfolio"
      style={{ background: "#000000" }}
    >
      <div className="ng-container">
        <div className="mb-12">
          <SectionHeader
            badge="Our Portfolio"
            title="Work That"
            titleHighlight="Speaks for Itself"
            description="A curated selection of projects demonstrating our technical excellence and business impact."
          />
        </div>

        {/* Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className="px-4 py-2 rounded-xl text-[13px] font-medium transition-all duration-200"
              style={{
                background: active === cat ? "rgba(var(--accent-primary-rgb),0.12)" : "rgba(255,255,255,0.04)",
                border: active === cat ? "1px solid rgba(var(--accent-primary-rgb),0.30)" : "1px solid rgba(255,255,255,0.06)",
                color: active === cat ? "var(--accent-primary)" : "#94A3B8",
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-4"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {filtered.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <Link href="/portfolio" className="ng-btn-ghost">
            View Full Portfolio
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
