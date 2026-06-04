"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  SiReact, SiNextdotjs, SiTypescript, SiNodedotjs, SiPython,
  SiDocker, SiKubernetes, SiMongodb, SiPostgresql, SiFirebase,
  SiTailwindcss, SiFigma, SiGraphql, SiRedis, SiFlutter,
  SiAndroid, SiApple, SiGooglecloud, SiTerraform, SiGithubactions,
  SiSupabase, SiPrisma, SiStripe, SiOpenai,
} from "react-icons/si";
import { FaAws } from "react-icons/fa";
import { VscAzure } from "react-icons/vsc";
import SectionHeader from "@/components/ui/SectionHeader";

const categories = ["All", "Frontend", "Backend", "Cloud", "Database", "DevOps", "Mobile", "AI/ML"];

const technologies = [
  { name: "React",          icon: SiReact,          category: "Frontend",  color: "#61DAFB", desc: "UI Library" },
  { name: "Next.js",        icon: SiNextdotjs,       category: "Frontend",  color: "#FFFFFF", desc: "React Framework" },
  { name: "TypeScript",     icon: SiTypescript,      category: "Frontend",  color: "#3178C6", desc: "Type Safety" },
  { name: "Tailwind CSS",   icon: SiTailwindcss,     category: "Frontend",  color: "#06B6D4", desc: "CSS Framework" },
  { name: "Figma",          icon: SiFigma,           category: "Frontend",  color: "#F24E1E", desc: "Design" },
  { name: "Node.js",        icon: SiNodedotjs,       category: "Backend",   color: "#339933", desc: "JS Runtime" },
  { name: "Python",         icon: SiPython,          category: "Backend",   color: "#3776AB", desc: "Backend / AI" },
  { name: "GraphQL",        icon: SiGraphql,         category: "Backend",   color: "#E10098", desc: "API Query" },
  { name: "Prisma",         icon: SiPrisma,          category: "Backend",   color: "#8A9BA8", desc: "ORM" },
  { name: "Stripe",         icon: SiStripe,          category: "Backend",   color: "#635BFF", desc: "Payments" },
  { name: "AWS",            icon: FaAws,             category: "Cloud",     color: "#FF9900", desc: "Cloud Platform" },
  { name: "Azure",          icon: VscAzure,          category: "Cloud",     color: "#0089D6", desc: "Microsoft Cloud" },
  { name: "Google Cloud",   icon: SiGooglecloud,     category: "Cloud",     color: "#4285F4", desc: "GCP" },
  { name: "Docker",         icon: SiDocker,          category: "DevOps",    color: "#2496ED", desc: "Containers" },
  { name: "Kubernetes",     icon: SiKubernetes,      category: "DevOps",    color: "#326CE5", desc: "Orchestration" },
  { name: "Terraform",      icon: SiTerraform,       category: "DevOps",    color: "#7B42BC", desc: "IaC" },
  { name: "GitHub Actions", icon: SiGithubactions,   category: "DevOps",    color: "#2563EB", desc: "CI/CD" },
  { name: "PostgreSQL",     icon: SiPostgresql,      category: "Database",  color: "#336791", desc: "SQL DB" },
  { name: "MongoDB",        icon: SiMongodb,         category: "Database",  color: "#47A248", desc: "NoSQL DB" },
  { name: "Redis",          icon: SiRedis,           category: "Database",  color: "#DC382D", desc: "Cache" },
  { name: "Supabase",       icon: SiSupabase,        category: "Database",  color: "#3ECF8E", desc: "BaaS" },
  { name: "Firebase",       icon: SiFirebase,        category: "Database",  color: "#FFCA28", desc: "BaaS" },
  { name: "OpenAI",         icon: SiOpenai,          category: "AI/ML",     color: "#A8A8A8", desc: "AI APIs" },
  { name: "Flutter",        icon: SiFlutter,         category: "Mobile",    color: "#02569B", desc: "Cross-platform" },
  { name: "iOS / Swift",    icon: SiApple,           category: "Mobile",    color: "#A2AAAD", desc: "Apple Platform" },
  { name: "Android",        icon: SiAndroid,         category: "Mobile",    color: "#3DDC84", desc: "Google Platform" },
];

export default function TechStack() {
  const [active, setActive] = useState("All");

  const filtered = active === "All" ? technologies : technologies.filter((t) => t.category === active);

  return (
    <section
      className="ng-section relative overflow-hidden"
      id="technologies"
      style={{ background: "#0A0F1C" }}
    >
      <div className="ng-container">
        <div className="mb-12">
          <SectionHeader
            badge="Technology Stack"
            title="Powered by the Best"
            titleHighlight="Modern Tech"
            description="Battle-tested technologies chosen for performance, scalability, and developer experience."
          />
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className="px-4 py-2 rounded-xl text-[13px] font-medium transition-all duration-200"
              style={{
                background: active === cat ? "rgba(37,99,235,0.12)" : "rgba(255,255,255,0.04)",
                border: active === cat ? "1px solid rgba(37,99,235,0.30)" : "1px solid rgba(255,255,255,0.06)",
                color: active === cat ? "#2563EB" : "#94A3B8",
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Tech Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-9 gap-3"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
          >
            {filtered.map((tech, i) => (
              <motion.div
                key={tech.name}
                className="group flex flex-col items-center gap-2 p-4 rounded-[16px] transition-all duration-300 cursor-default"
                style={{
                  background: "#121A2B",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.025, duration: 0.35 }}
                whileHover={{ y: -4 }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(37,99,235,0.22)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"; }}
              >
                <tech.icon className="w-6 h-6" style={{ color: tech.color }} />
                <div className="text-center">
                  <div className="text-[11px] font-medium text-white leading-tight">{tech.name}</div>
                  <div className="text-[10px] mt-0.5" style={{ color: "#64748B" }}>{tech.desc}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
