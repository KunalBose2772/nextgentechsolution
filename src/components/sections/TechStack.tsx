"use client";

import {
  SiReact, SiNextdotjs, SiTypescript, SiNodedotjs, SiPython,
  SiDocker, SiKubernetes, SiMongodb, SiFirebase,
  SiTailwindcss, SiFigma, SiGraphql, SiRedis, SiFlutter,
  SiSupabase, SiPrisma, SiStripe, SiOpenai,
} from "react-icons/si";
import { FaAws } from "react-icons/fa";

const technologies = [
  { name: "React", icon: SiReact, color: "#61DAFB" },
  { name: "Next.js", icon: SiNextdotjs, color: "#FFFFFF" },
  { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
  { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
  { name: "Python", icon: SiPython, color: "#3776AB" },
  { name: "GraphQL", icon: SiGraphql, color: "#E10098" },
  { name: "AWS", icon: FaAws, color: "#FF9900" },
  { name: "Docker", icon: SiDocker, color: "#2496ED" },
  { name: "Kubernetes", icon: SiKubernetes, color: "#326CE5" },
  { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
  { name: "Redis", icon: SiRedis, color: "#DC382D" },
  { name: "Supabase", icon: SiSupabase, color: "#3ECF8E" },
  { name: "Prisma", icon: SiPrisma, color: "#8A9BA8" },
  { name: "Tailwind", icon: SiTailwindcss, color: "#06B6D4" },
  { name: "Figma", icon: SiFigma, color: "#F24E1E" },
  { name: "Firebase", icon: SiFirebase, color: "#FFCA28" },
  { name: "Stripe", icon: SiStripe, color: "#635BFF" },
  { name: "OpenAI", icon: SiOpenai, color: "#A8A8A8" },
  { name: "Flutter", icon: SiFlutter, color: "#02569B" },
];

export default function TechStack() {
  return (
    <section className="py-16 bg-slate-50 text-slate-850 border-t border-slate-200/50" id="technologies">
      <div className="max-w-7xl mx-auto px-4">
        
        <div className="text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-2 block">
            TECHNOLOGY ECOSYSTEM
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Powered by Modern Technologies
          </h2>
          <p className="text-slate-500 mt-2 max-w-xl mx-auto text-sm leading-relaxed">
            Battle-tested technologies chosen for scalability, performance, security, and long-term growth.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {technologies.map((tech) => (
            <div
              key={tech.name}
              className="p-6 bg-white border border-slate-200/60 rounded-2xl flex flex-col items-center justify-center gap-3 transition-all duration-200 hover:-translate-y-1 hover:shadow-sm"
            >
              <tech.icon className="w-9 h-9" style={{ color: tech.color }} />
              <span className="text-xs font-bold text-slate-800">{tech.name}</span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
