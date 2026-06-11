"use client";

import { motion } from "framer-motion";
import PageHero from "@/components/common/PageHero";
import { CheckCircle2, Users, Award, TrendingUp, Globe, Heart, Zap, Shield, ArrowUpRight } from "lucide-react";
import { FaLinkedinIn, FaTwitter } from "react-icons/fa";

const team = [
  { name: "Aryan Kapoor", role: "CEO & Co-Founder", expertise: "Engineering & Strategy", avatar: "AK", color: "#3b82f6", linkedin: "#", twitter: "#" },
  { name: "Priya Singh", role: "CTO", expertise: "Cloud Architecture & AI", avatar: "PS", color: "#7c3aed", linkedin: "#", twitter: "#" },
  { name: "Rahul Dev", role: "Head of Engineering", expertise: "Full-Stack & DevOps", avatar: "RD", color: "#06b6d4", linkedin: "#", twitter: "#" },
  { name: "Ananya Mehta", role: "Head of Design", expertise: "UI/UX & Design Systems", avatar: "AM", color: "#ec4899", linkedin: "#", twitter: "#" },
  { name: "Vikram Shah", role: "Head of AI/ML", expertise: "Machine Learning & NLP", avatar: "VS", color: "#22c55e", linkedin: "#", twitter: "#" },
  { name: "Sneha Gupta", role: "Head of Delivery", expertise: "Project Management", avatar: "SG", color: "#f97316", linkedin: "#", twitter: "#" },
];

const values = [
  { icon: Zap, title: "Innovation First", desc: "We challenge the status quo and embrace emerging technologies to create breakthrough solutions.", color: "text-amber-400", bg: "bg-amber-500/10", border: "rgba(245, 158, 11, 0.2)" },
  { icon: Shield, title: "Trust & Integrity", desc: "Transparent communication, honest timelines, and zero compromise on quality standards.", color: "text-emerald-400", bg: "bg-emerald-500/10", border: "rgba(16, 185, 129, 0.2)" },
  { icon: Heart, title: "Client Success", desc: "Your success is our metric. We're not done until your project achieves its business goals.", color: "text-rose-400", bg: "bg-rose-500/10", border: "rgba(244, 63, 94, 0.2)" },
  { icon: Users, title: "Team Excellence", desc: "We hire the best, invest in their growth, and foster a culture of continuous learning.", color: "text-blue-400", bg: "bg-blue-500/10", border: "rgba(59, 130, 246, 0.2)" },
];

const milestones = [
  { year: "2019", event: "Founded in India with a team of 3 engineers" },
  { year: "2020", event: "First enterprise client — built an ERP system for a logistics firm" },
  { year: "2021", event: "Expanded to 15 team members, launched AI practice" },
  { year: "2022", event: "Delivered 50+ projects, opened remote offices" },
  { year: "2023", event: "100+ projects milestone, expanded to SaaS and cloud" },
  { year: "2024", event: "50+ global clients, 30+ team members, AI-first strategy" },
  { year: "2025", event: "150+ projects, international expansion underway" },
];

export default function AboutPage() {
  return (
    <div className="bg-[#050505] min-h-screen text-slate-300">
      <PageHero
        badge="About NextGen Tech"
        title="We Build Software"
        titleHighlight="That Changes"
        titleOutline="Industries"
        description="Founded in 2019, NextGen Tech Solution is a premium software development company on a mission to empower businesses with world-class digital solutions."
        gradient="rgba(6, 182, 212, 0.08)"
      />

      {/* Story Section */}
      <section className="py-20 md:py-28 border-t border-white/5 relative">
        <div className="absolute inset-0 pointer-events-none opacity-[0.02] ng-grid-bg" />
        <div className="ng-container relative z-10">
          <div className="grid lg:grid-cols-12 gap-16 items-center">
            <motion.div
              className="lg:col-span-6"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-cyan-500/20 bg-cyan-950/10 text-cyan-400 text-[10px] font-bold uppercase tracking-wider mb-5">
                Our Story
              </div>
              <h2 
                className="text-white font-extrabold text-3xl sm:text-4xl md:text-5xl leading-tight mb-6 tracking-tight"
                style={{ fontFamily: "Sora, sans-serif" }}
              >
                From a 3-person startup to a global technology partner
              </h2>
              <div className="space-y-4 text-slate-400 leading-relaxed text-[14px]">
                <p>NextGen Tech Solution was born from a simple belief: that every business deserves access to world-class software engineering — not just the Fortune 500.</p>
                <p>We started in 2019 as three engineers building side projects. Today, we are a team of 30+ specialists delivering enterprise-grade software for clients across India, North America, and Europe.</p>
                <p>Our secret? We treat every project as if it were our own startup. We care about outcomes, not just deliverables. We obsess over performance, design, and code quality in equal measure.</p>
              </div>
            </motion.div>

            <motion.div
              className="lg:col-span-6"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {/* Timeline */}
              <div className="space-y-4 pl-4 border-l border-white/5">
                {milestones.map((m, i) => (
                  <motion.div
                    key={m.year}
                    className="flex gap-4 group relative"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                  >
                    {/* Pulsing indicator */}
                    <div className="absolute -left-[21px] top-1.5 w-2.5 h-2.5 rounded-full bg-zinc-800 border-2 border-slate-500 group-hover:border-cyan-400 transition-colors z-10" />

                    <div className="pb-4">
                      <div className="text-cyan-400 text-xs font-bold mb-1 tracking-wider">{m.year}</div>
                      <p className="text-slate-350 text-sm leading-relaxed">{m.event}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 md:py-28 border-t border-white/5 bg-[#08080A]">
        <div className="ng-container">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-purple-500/20 bg-purple-950/10 text-purple-400 text-[10px] font-bold uppercase tracking-wider mb-5">
              Our Values
            </span>
            <h2 
              className="text-white font-extrabold text-3xl sm:text-4xl md:text-5xl tracking-tight"
              style={{ fontFamily: "Sora, sans-serif" }}
            >
              What We Stand For
            </h2>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                className="group rounded-3xl p-6 border transition-all duration-300 relative overflow-hidden flex flex-col justify-between"
                style={{
                  background: "rgba(255, 255, 255, 0.02)",
                  borderColor: "rgba(255, 255, 255, 0.05)",
                  backdropFilter: "blur(12px)",
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{
                  y: -5,
                  borderColor: v.border,
                  boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)"
                }}
              >
                <div>
                  <div className={`w-11 h-11 rounded-xl ${v.bg} flex items-center justify-center mb-5 group-hover:scale-105 transition-transform duration-300`}>
                    <v.icon className={`w-5 h-5 ${v.color}`} />
                  </div>
                  <h3 
                    className="text-white font-bold text-base mb-2 font-sora"
                  >
                    {v.title}
                  </h3>
                  <p className="text-slate-400 text-xs sm:text-[13px] leading-relaxed">{v.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 border-t border-white/5 relative">
        <div className="absolute inset-0 pointer-events-none opacity-[0.02] ng-grid-bg" />
        <div className="ng-container relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: TrendingUp, value: "150+", label: "Projects Delivered", color: "text-blue-400", border: "rgba(59, 130, 246, 0.15)" },
              { icon: Globe, value: "50+", label: "Global Clients", color: "text-violet-400", border: "rgba(124, 58, 237, 0.15)" },
              { icon: Users, value: "30+", label: "Team Members", color: "text-cyan-400", border: "rgba(6, 182, 212, 0.15)" },
              { icon: Award, value: "5 Yrs", label: "Industry Experience", color: "text-green-400", border: "rgba(34, 197, 94, 0.15)" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                className="text-center p-8 rounded-3xl border transition-all duration-300 flex flex-col items-center justify-center"
                style={{
                  background: "rgba(255, 255, 255, 0.01)",
                  borderColor: "rgba(255, 255, 255, 0.04)"
                }}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{
                  y: -4,
                  borderColor: stat.border,
                  boxShadow: "0 15px 30px rgba(0, 0, 0, 0.25)"
                }}
              >
                <div className="w-12 h-12 rounded-xl bg-white/[0.02] border border-white/[0.04] flex items-center justify-center mb-4">
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                <div className="text-3xl sm:text-4xl font-extrabold text-white mb-1 tracking-tight font-sora">{stat.value}</div>
                <div className="text-slate-500 text-xs sm:text-[13px]">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 md:py-28 border-t border-white/5 bg-[#08080A]" id="team">
        <div className="ng-container">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-cyan-500/20 bg-cyan-950/10 text-cyan-400 text-[10px] font-bold uppercase tracking-wider mb-5">
              The Team
            </span>
            <h2 
              className="text-white font-extrabold text-3xl sm:text-4xl md:text-5xl tracking-tight mb-4"
              style={{ fontFamily: "Sora, sans-serif" }}
            >
              Meet Our Leaders
            </h2>
            <p className="text-slate-400 text-xs sm:text-[14px] max-w-xl mx-auto leading-relaxed">
              World-class engineers, designers, and strategists united by a passion for building extraordinary software.
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                className="group rounded-3xl p-6 border transition-all duration-300 relative overflow-hidden flex flex-col justify-between"
                style={{
                  background: "rgba(255, 255, 255, 0.02)",
                  borderColor: "rgba(255, 255, 255, 0.05)",
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{
                  y: -5,
                  borderColor: `${member.color}25`,
                  boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)"
                }}
              >
                <div className="flex items-center gap-4 mb-5">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center text-white font-bold text-xl flex-shrink-0"
                    style={{ 
                      background: `linear-gradient(135deg, ${member.color}30, ${member.color}10)`, 
                      border: `1px solid ${member.color}20` 
                    }}
                  >
                    {member.avatar}
                  </div>
                  <div>
                    <div className="text-white font-bold text-[15px] font-sora">{member.name}</div>
                    <div className="text-slate-500 text-xs">{member.role}</div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t border-white/[0.04]">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" style={{ color: member.color }} />
                    <span className="text-slate-400 text-xs">{member.expertise}</span>
                  </div>

                  {/* Social hover shortcuts */}
                  <div className="flex items-center gap-2">
                    <a href={member.linkedin} className="text-slate-500 hover:text-white transition-colors">
                      <FaLinkedinIn className="w-3.5 h-3.5" />
                    </a>
                    <a href={member.twitter} className="text-slate-500 hover:text-white transition-colors">
                      <FaTwitter className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
