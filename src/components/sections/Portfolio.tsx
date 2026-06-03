"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ExternalLink, TrendingUp } from "lucide-react";
import Link from "next/link";
import SectionHeader from "@/components/ui/SectionHeader";

const categories = ["All", "Web App", "Mobile", "SaaS", "AI/ML", "E-Commerce"];

const projects = [
  {
    id: "1", title: "FinanceIQ Dashboard", category: "SaaS",
    description: "Real-time financial analytics platform with AI-powered insights, serving 10K+ daily active users.",
    tags: ["Next.js", "Python", "PostgreSQL", "Stripe"],
    metrics: [{ label: "Users", value: "10K+" }, { label: "Revenue", value: "$2M+" }],
    gradient: "from-blue-600/20 via-blue-500/5 to-transparent",
    accent: "#3b82f6",
    size: "large",
  },
  {
    id: "2", title: "MediConnect App", category: "Mobile",
    description: "Healthcare platform connecting 500+ doctors with patients for telemedicine consultations.",
    tags: ["React Native", "Node.js", "MongoDB"],
    metrics: [{ label: "Doctors", value: "500+" }, { label: "Consultations", value: "50K+" }],
    gradient: "from-green-600/20 via-green-500/5 to-transparent",
    accent: "#22c55e",
    size: "small",
  },
  {
    id: "3", title: "ShopSmart AI", category: "E-Commerce",
    description: "AI-powered e-commerce platform with personalized recommendations and dynamic pricing.",
    tags: ["Next.js", "OpenAI", "Stripe", "Redis"],
    metrics: [{ label: "GMV", value: "$5M+" }, { label: "Conversion", value: "+45%" }],
    gradient: "from-violet-600/20 via-violet-500/5 to-transparent",
    accent: "#7c3aed",
    size: "small",
  },
  {
    id: "4", title: "LogiTrack Enterprise", category: "Web App",
    description: "Supply chain management system handling 2M+ daily shipment trackings for global logistics firm.",
    tags: ["React", "Java Spring", "PostgreSQL", "Docker"],
    metrics: [{ label: "Shipments", value: "2M/day" }, { label: "Cost Save", value: "30%" }],
    gradient: "from-orange-600/20 via-orange-500/5 to-transparent",
    accent: "#f97316",
    size: "small",
  },
  {
    id: "5", title: "SentimentAI Platform", category: "AI/ML",
    description: "Real-time social media sentiment analysis tool processing 1M+ posts per day for brand monitoring.",
    tags: ["Python", "TensorFlow", "AWS", "React"],
    metrics: [{ label: "Posts/day", value: "1M+" }, { label: "Accuracy", value: "97%" }],
    gradient: "from-cyan-600/20 via-cyan-500/5 to-transparent",
    accent: "#06b6d4",
    size: "large",
  },
  {
    id: "6", title: "EduLearn Pro", category: "SaaS",
    description: "Online learning management system with live classes, AI tutoring, and certification tracking.",
    tags: ["Next.js", "WebRTC", "Node.js", "MongoDB"],
    metrics: [{ label: "Students", value: "25K+" }, { label: "Courses", value: "500+" }],
    gradient: "from-pink-600/20 via-pink-500/5 to-transparent",
    accent: "#ec4899",
    size: "small",
  },
];

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className={`relative group rounded-2xl overflow-hidden border border-white/6 hover:border-white/15 transition-all duration-500 cursor-pointer bg-[#0a0a0f] ${
        project.size === "large" ? "md:col-span-2" : ""
      }`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.08, duration: 0.6 }}
      whileHover={{ y: -3 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      {/* Background gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-60`} />

      {/* Animated gradient overlay on hover */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(400px circle at 50% 0%, ${project.accent}15, transparent)`,
        }}
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.4 }}
      />

      <div className="relative p-6 h-full flex flex-col">
        {/* Category badge */}
        <div className="flex items-start justify-between mb-4">
          <span
            className="text-xs font-medium px-3 py-1 rounded-full border"
            style={{
              color: project.accent,
              borderColor: `${project.accent}30`,
              background: `${project.accent}10`,
            }}
          >
            {project.category}
          </span>
          <motion.div
            animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : 10 }}
            transition={{ duration: 0.3 }}
          >
            <ExternalLink className="w-4 h-4 text-white/40" />
          </motion.div>
        </div>

        {/* Visual area */}
        <div className="relative h-32 rounded-xl bg-white/3 border border-white/5 mb-5 overflow-hidden flex items-center justify-center">
          <div className="absolute inset-0 bg-grid opacity-30" />
          <div
            className="w-20 h-20 rounded-2xl flex items-center justify-center text-white font-bold text-2xl"
            style={{ background: `linear-gradient(135deg, ${project.accent}30, ${project.accent}10)`, border: `1px solid ${project.accent}20` }}
          >
            {project.title.charAt(0)}
          </div>

          {/* Metrics floating */}
          <motion.div
            className="absolute bottom-3 right-3 flex gap-2"
            animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 10 }}
          >
            {project.metrics.map((m) => (
              <div
                key={m.label}
                className="px-2.5 py-1 rounded-lg text-xs font-bold"
                style={{
                  background: `${project.accent}15`,
                  color: project.accent,
                  border: `1px solid ${project.accent}20`,
                }}
              >
                {m.value}
              </div>
            ))}
          </motion.div>
        </div>

        <h3 className="text-white font-bold text-lg mb-2 group-hover:text-white transition-colors">{project.title}</h3>
        <p className="text-white/45 text-sm leading-relaxed flex-1 mb-4">{project.description}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-white/30 text-xs px-2 py-0.5 rounded-md bg-white/3 border border-white/5"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Metrics row */}
        <div className="flex items-center gap-4 pt-4 border-t border-white/5">
          {project.metrics.map((m) => (
            <div key={m.label} className="flex items-center gap-1.5">
              <TrendingUp className="w-3 h-3 text-green-400" />
              <span className="text-white/60 text-xs">{m.value} {m.label}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = activeCategory === "All"
    ? projects
    : projects.filter((p) => p.category === activeCategory);

  return (
    <section className="section-padding relative overflow-hidden bg-[#060609]" id="portfolio">
      <div className="absolute inset-0 bg-dot opacity-20" />

      <div className="container-xl relative">
        <div className="mb-12">
          <SectionHeader
            badge="Our Portfolio"
            title="Work That"
            titleHighlight="Speaks for Itself"
            description="A curated selection of projects that demonstrate our technical excellence and business impact."
          />
        </div>

        {/* Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <motion.button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                activeCategory === cat
                  ? "bg-blue-500/20 text-blue-300 border border-blue-500/40"
                  : "text-white/40 hover:text-white/70 border border-white/5 glass"
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {cat}
            </motion.button>
          ))}
        </div>

        {/* Projects grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {filtered.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* CTA */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-white/10 hover:border-blue-500/40 text-white/70 hover:text-white font-medium transition-all group"
          >
            View Full Portfolio
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
