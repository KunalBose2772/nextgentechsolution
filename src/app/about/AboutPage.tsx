"use client";

import { motion } from "framer-motion";
import PageHero from "@/components/common/PageHero";
import { CheckCircle2, Users, Award, TrendingUp, Globe, Heart, Zap, Shield } from "lucide-react";

const team = [
  { name: "Aryan Kapoor", role: "CEO & Co-Founder", expertise: "Engineering & Strategy", avatar: "AK", color: "#3b82f6" },
  { name: "Priya Singh", role: "CTO", expertise: "Cloud Architecture & AI", avatar: "PS", color: "#7c3aed" },
  { name: "Rahul Dev", role: "Head of Engineering", expertise: "Full-Stack & DevOps", avatar: "RD", color: "#06b6d4" },
  { name: "Ananya Mehta", role: "Head of Design", expertise: "UI/UX & Design Systems", avatar: "AM", color: "#ec4899" },
  { name: "Vikram Shah", role: "Head of AI/ML", expertise: "Machine Learning & NLP", avatar: "VS", color: "#22c55e" },
  { name: "Sneha Gupta", role: "Head of Delivery", expertise: "Project Management", avatar: "SG", color: "#f97316" },
];

const values = [
  { icon: Zap, title: "Innovation First", desc: "We challenge the status quo and embrace emerging technologies to create breakthrough solutions.", color: "text-yellow-400", bg: "bg-yellow-500/10" },
  { icon: Shield, title: "Trust & Integrity", desc: "Transparent communication, honest timelines, and zero compromise on quality standards.", color: "text-green-400", bg: "bg-green-500/10" },
  { icon: Heart, title: "Client Success", desc: "Your success is our metric. We're not done until your project achieves its business goals.", color: "text-pink-400", bg: "bg-pink-500/10" },
  { icon: Users, title: "Team Excellence", desc: "We hire the best, invest in their growth, and foster a culture of continuous learning.", color: "text-blue-400", bg: "bg-blue-500/10" },
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
    <div className="bg-[#050505]">
      <PageHero
        badge="About NextGen Tech"
        title="We Build Software That"
        titleHighlight="Changes Industries"
        description="Founded in 2019, NextGen Tech Solution is a premium software development company on a mission to empower businesses with world-class digital solutions."
      />

      {/* Story Section */}
      <section className="py-20 border-t border-white/5">
        <div className="container-xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-blue-400 text-xs font-medium uppercase tracking-wider">Our Story</span>
              <h2 className="text-white font-bold text-4xl mt-3 mb-6 leading-tight">
                From a 3-person startup to a global technology partner
              </h2>
              <div className="space-y-4 text-white/55 leading-relaxed">
                <p>NextGen Tech Solution was born from a simple belief: that every business deserves access to world-class software engineering — not just the Fortune 500.</p>
                <p>We started in 2019 as three engineers building side projects. Today, we are a team of 30+ specialists delivering enterprise-grade software for clients across India, North America, and Europe.</p>
                <p>Our secret? We treat every project as if it were our own startup. We care about outcomes, not just deliverables. We obsess over performance, design, and code quality in equal measure.</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {/* Timeline */}
              <div className="space-y-4">
                {milestones.map((m, i) => (
                  <motion.div
                    key={m.year}
                    className="flex gap-4 group"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                  >
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 rounded-xl bg-blue-500/15 border border-blue-500/25 flex items-center justify-center flex-shrink-0">
                        <span className="text-blue-400 text-xs font-bold">{m.year.slice(2)}</span>
                      </div>
                      {i < milestones.length - 1 && (
                        <div className="w-px flex-1 mt-2 bg-white/5" />
                      )}
                    </div>
                    <div className="pb-4">
                      <div className="text-white/30 text-xs mb-1">{m.year}</div>
                      <p className="text-white/65 text-sm leading-relaxed">{m.event}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 border-t border-white/5 bg-[#060609]">
        <div className="container-xl">
          <div className="text-center mb-12">
            <span className="text-blue-400 text-xs font-medium uppercase tracking-wider">Our Values</span>
            <h2 className="text-white font-bold text-4xl mt-3">What We Stand For</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                className="glass-card rounded-2xl p-6 border border-white/5 hover:border-white/12 transition-all group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -4 }}
              >
                <div className={`w-12 h-12 rounded-xl ${v.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <v.icon className={`w-6 h-6 ${v.color}`} />
                </div>
                <h3 className="text-white font-bold text-base mb-2">{v.title}</h3>
                <p className="text-white/45 text-sm leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 border-t border-white/5">
        <div className="container-xl">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: TrendingUp, value: "150+", label: "Projects Delivered", color: "text-blue-400" },
              { icon: Globe, value: "50+", label: "Global Clients", color: "text-violet-400" },
              { icon: Users, value: "30+", label: "Team Members", color: "text-cyan-400" },
              { icon: Award, value: "5 Yrs", label: "Industry Experience", color: "text-green-400" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                className="text-center p-8 glass-card rounded-2xl border border-white/5"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <stat.icon className={`w-7 h-7 ${stat.color} mx-auto mb-3`} />
                <div className="text-4xl font-extrabold text-white mb-1">{stat.value}</div>
                <div className="text-white/40 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 border-t border-white/5 bg-[#060609]" id="team">
        <div className="container-xl">
          <div className="text-center mb-12">
            <span className="text-blue-400 text-xs font-medium uppercase tracking-wider">The Team</span>
            <h2 className="text-white font-bold text-4xl mt-3">Meet Our Leaders</h2>
            <p className="text-white/50 mt-4 max-w-xl mx-auto">World-class engineers, designers, and strategists united by a passion for building extraordinary software.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                className="group glass-card rounded-2xl p-6 border border-white/5 hover:border-white/12 transition-all"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -4 }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center text-white font-bold text-xl flex-shrink-0"
                    style={{ background: `linear-gradient(135deg, ${member.color}40, ${member.color}20)`, border: `1px solid ${member.color}25` }}
                  >
                    {member.avatar}
                  </div>
                  <div>
                    <div className="text-white font-semibold">{member.name}</div>
                    <div className="text-white/40 text-sm">{member.role}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 flex-shrink-0" />
                  <span className="text-white/50 text-xs">{member.expertise}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
