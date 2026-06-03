"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SiReact, SiNextdotjs, SiTypescript, SiNodedotjs, SiPython, SiDocker, SiKubernetes, SiMongodb, SiPostgresql, SiFirebase, SiSpring, SiOpenjdk, SiTailwindcss, SiFigma, SiGraphql, SiRedis, SiElasticsearch, SiFlutter, SiAndroid, SiApple, SiGooglecloud, SiTerraform, SiGithubactions, SiSupabase, SiPrisma, SiStripe, SiOpenai } from "react-icons/si";
import { FaAws } from "react-icons/fa";
import { VscAzure } from "react-icons/vsc";
import SectionHeader from "@/components/ui/SectionHeader";

const categories = ["All", "Frontend", "Backend", "Cloud", "Database", "DevOps", "Mobile", "AI/ML"];

const technologies = [
  { name: "React", icon: SiReact, category: "Frontend", color: "#61DAFB", desc: "UI Library" },
  { name: "Next.js", icon: SiNextdotjs, category: "Frontend", color: "#FFFFFF", desc: "React Framework" },
  { name: "TypeScript", icon: SiTypescript, category: "Frontend", color: "#3178C6", desc: "Type Safety" },
  { name: "Tailwind CSS", icon: SiTailwindcss, category: "Frontend", color: "#06B6D4", desc: "CSS Framework" },
  { name: "Flutter", icon: SiFlutter, category: "Mobile", color: "#02569B", desc: "Cross-platform" },
  { name: "Node.js", icon: SiNodedotjs, category: "Backend", color: "#339933", desc: "JS Runtime" },
  { name: "Python", icon: SiPython, category: "Backend", color: "#3776AB", desc: "Backend / AI" },
  { name: "Java", icon: SiOpenjdk, category: "Backend", color: "#007396", desc: "Enterprise" },
  { name: "Spring Boot", icon: SiSpring, category: "Backend", color: "#6DB33F", desc: "Java Framework" },
  { name: "GraphQL", icon: SiGraphql, category: "Backend", color: "#E10098", desc: "API Query" },
  { name: "Prisma", icon: SiPrisma, category: "Backend", color: "#2D3748", desc: "ORM" },
  { name: "AWS", icon: FaAws, category: "Cloud", color: "#FF9900", desc: "Cloud Platform" },
  { name: "Azure", icon: VscAzure, category: "Cloud", color: "#0089D6", desc: "Microsoft Cloud" },
  { name: "Google Cloud", icon: SiGooglecloud, category: "Cloud", color: "#4285F4", desc: "GCP" },
  { name: "Docker", icon: SiDocker, category: "DevOps", color: "#2496ED", desc: "Containers" },
  { name: "Kubernetes", icon: SiKubernetes, category: "DevOps", color: "#326CE5", desc: "Orchestration" },
  { name: "Terraform", icon: SiTerraform, category: "DevOps", color: "#7B42BC", desc: "IaC" },
  { name: "GitHub Actions", icon: SiGithubactions, category: "DevOps", color: "#2088FF", desc: "CI/CD" },
  { name: "PostgreSQL", icon: SiPostgresql, category: "Database", color: "#336791", desc: "SQL DB" },
  { name: "MongoDB", icon: SiMongodb, category: "Database", color: "#47A248", desc: "NoSQL DB" },
  { name: "Redis", icon: SiRedis, category: "Database", color: "#DC382D", desc: "Cache" },
  { name: "Supabase", icon: SiSupabase, category: "Database", color: "#3ECF8E", desc: "BaaS" },
  { name: "Firebase", icon: SiFirebase, category: "Database", color: "#FFCA28", desc: "Google BaaS" },
  { name: "Elasticsearch", icon: SiElasticsearch, category: "Database", color: "#005571", desc: "Search" },
  { name: "OpenAI", icon: SiOpenai, category: "AI/ML", color: "#412991", desc: "AI APIs" },
  { name: "iOS / Swift", icon: SiApple, category: "Mobile", color: "#A2AAAD", desc: "Apple Platform" },
  { name: "Android", icon: SiAndroid, category: "Mobile", color: "#3DDC84", desc: "Google Platform" },
  { name: "Figma", icon: SiFigma, category: "Frontend", color: "#F24E1E", desc: "Design" },
  { name: "Stripe", icon: SiStripe, category: "Backend", color: "#635BFF", desc: "Payments" },
];

export default function TechStack() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = activeCategory === "All"
    ? technologies
    : technologies.filter((t) => t.category === activeCategory);

  return (
    <section className="section-padding relative overflow-hidden bg-[#060609]" id="technologies">
      <div className="absolute inset-0 bg-dot opacity-25" />
      <div className="absolute left-1/4 top-0 w-[500px] h-[400px] bg-violet-500/5 rounded-full blur-3xl" />

      <div className="container-xl relative">
        <div className="mb-12">
          <SectionHeader
            badge="Technology Stack"
            title="Powered by the Best"
            titleHighlight="Modern Tech"
            description="We leverage the most advanced and battle-tested technologies to build solutions that scale, perform, and endure."
          />
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <motion.button
              key={cat}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                activeCategory === cat
                  ? "bg-blue-500/20 text-blue-300 border border-blue-500/40"
                  : "text-white/40 hover:text-white/70 border border-white/5 hover:border-white/15 glass"
              }`}
              onClick={() => setActiveCategory(cat)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {cat}
            </motion.button>
          ))}
        </div>

        {/* Tech Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {filtered.map((tech, i) => (
              <motion.div
                key={tech.name}
                className="group relative flex flex-col items-center gap-2.5 p-4 rounded-2xl glass-card border border-white/5 hover:border-white/15 transition-all duration-300 cursor-default"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.03, duration: 0.4, ease: [0, 0, 0.2, 1] }}
                whileHover={{ y: -4, scale: 1.05 }}
              >
                {/* Glow on hover */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: `radial-gradient(80px circle at center, ${tech.color}15, transparent)`,
                    boxShadow: `0 0 20px ${tech.color}20`,
                  }}
                />

                <tech.icon
                  className="w-7 h-7 relative z-10 transition-transform duration-300 group-hover:scale-110"
                  style={{ color: tech.color }}
                />
                <div className="relative z-10 text-center">
                  <div className="text-white/60 text-xs font-medium group-hover:text-white/80 transition-colors leading-tight">{tech.name}</div>
                  <div className="text-white/20 text-[10px] group-hover:text-white/35 transition-colors">{tech.desc}</div>
                </div>

                {/* Tooltip */}
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black/80 text-white/80 text-xs px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                  {tech.category}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Stats row */}
        <motion.div
          className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          {[
            { value: "29+", label: "Technologies", color: "text-blue-400" },
            { value: "8", label: "Tech Categories", color: "text-violet-400" },
            { value: "100%", label: "Modern Stack", color: "text-cyan-400" },
            { value: "24/7", label: "Tech Support", color: "text-green-400" },
          ].map((item) => (
            <div key={item.label} className="text-center p-6 glass-card rounded-2xl">
              <div className={`text-3xl font-extrabold ${item.color} mb-1`}>{item.value}</div>
              <div className="text-white/40 text-sm">{item.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
