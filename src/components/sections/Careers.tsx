"use client";

import { motion } from "framer-motion";
import { ArrowRight, MapPin, Clock, Briefcase, Star, Zap, Users, TrendingUp, Heart } from "lucide-react";
import Link from "next/link";
import SectionHeader from "@/components/ui/SectionHeader";

const jobs = [
  {
    title: "Senior Full-Stack Engineer",
    department: "Engineering",
    location: "Remote / India",
    type: "Full-time",
    experience: "4+ years",
    accent: "#3b82f6",
  },
  {
    title: "AI/ML Engineer",
    department: "AI Research",
    location: "Remote / India",
    type: "Full-time",
    experience: "3+ years",
    accent: "#7c3aed",
  },
  {
    title: "DevOps Engineer",
    department: "Infrastructure",
    location: "Remote",
    type: "Full-time",
    experience: "3+ years",
    accent: "#06b6d4",
  },
  {
    title: "Senior UI/UX Designer",
    department: "Design",
    location: "Remote / India",
    type: "Full-time",
    experience: "4+ years",
    accent: "#ec4899",
  },
];

const perks = [
  { icon: TrendingUp, title: "Competitive Salary", desc: "Top-of-market packages with equity options" },
  { icon: Zap, title: "Remote-First", desc: "Work from anywhere in the world" },
  { icon: Star, title: "Learning Budget", desc: "$2,000/year for courses and conferences" },
  { icon: Heart, title: "Health Benefits", desc: "Full health, dental, and vision coverage" },
  { icon: Users, title: "Great Team", desc: "Work with world-class engineers and designers" },
  { icon: Briefcase, title: "Impactful Work", desc: "Build products used by millions worldwide" },
];

export default function Careers() {
  return (
    <section className="section-padding relative overflow-hidden bg-[#050505]" id="careers">
      <div className="absolute inset-0 bg-grid opacity-25" />
      <div className="absolute right-0 top-1/4 w-96 h-96 bg-violet-500/4 rounded-full blur-3xl" />

      <div className="container-xl relative">
        <div className="mb-16">
          <SectionHeader
            badge="Careers"
            title="Build the Future"
            titleHighlight="With Us"
            description="Join a team of ambitious engineers, designers, and product builders working on high-impact projects for global clients."
          />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left: Open Roles */}
          <div>
            <h3 className="text-white/60 text-sm font-medium uppercase tracking-wider mb-5">Open Positions</h3>
            <div className="space-y-3">
              {jobs.map((job, i) => (
                <motion.div
                  key={job.title}
                  className="group glass-card rounded-2xl p-5 border border-white/5 hover:border-white/12 transition-all cursor-pointer"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  whileHover={{ x: 4 }}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span
                          className="text-xs font-medium px-2.5 py-1 rounded-full"
                          style={{
                            color: job.accent,
                            background: `${job.accent}15`,
                            border: `1px solid ${job.accent}25`,
                          }}
                        >
                          {job.department}
                        </span>
                        <span className="text-green-400 text-xs flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                          Hiring
                        </span>
                      </div>
                      <h4 className="text-white font-semibold mb-2 group-hover:text-white transition-colors">{job.title}</h4>
                      <div className="flex flex-wrap gap-3 text-white/40 text-xs">
                        <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{job.location}</span>
                        <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{job.type}</span>
                        <span className="flex items-center gap-1"><Briefcase className="w-3.5 h-3.5" />{job.experience}</span>
                      </div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-white/20 group-hover:text-white/60 group-hover:translate-x-1 transition-all flex-shrink-0 mt-1" />
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              className="mt-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <Link
                href="/careers"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white font-semibold text-sm"
                style={{ background: "linear-gradient(135deg, #3b82f6, #7c3aed)" }}
              >
                View All Openings
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>

          {/* Right: Perks */}
          <div>
            <h3 className="text-white/60 text-sm font-medium uppercase tracking-wider mb-5">Why Work With Us</h3>
            <div className="grid grid-cols-2 gap-3">
              {perks.map((perk, i) => (
                <motion.div
                  key={perk.title}
                  className="glass-card rounded-2xl p-5 border border-white/5 hover:border-white/12 transition-all group"
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  whileHover={{ y: -2 }}
                >
                  <perk.icon className="w-6 h-6 text-blue-400 mb-3 group-hover:scale-110 transition-transform" />
                  <div className="text-white font-semibold text-sm mb-1">{perk.title}</div>
                  <div className="text-white/40 text-xs leading-relaxed">{perk.desc}</div>
                </motion.div>
              ))}
            </div>

            {/* Culture blurb */}
            <motion.div
              className="mt-4 p-6 glass-card rounded-2xl border border-blue-500/15"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              style={{ background: "linear-gradient(135deg, rgba(59,130,246,0.05), rgba(124,58,237,0.05))" }}
            >
              <div className="flex items-center gap-2 mb-2">
                <Star className="w-4 h-4 text-yellow-400" />
                <span className="text-white/70 text-sm font-medium">Glassdoor Rating: 4.9/5</span>
              </div>
              <p className="text-white/45 text-sm leading-relaxed">
                &ldquo;The most collaborative and technically challenging place I&apos;ve ever worked. Real ownership, real impact.&rdquo;
              </p>
              <div className="text-white/30 text-xs mt-2">— Senior Engineer, 3 years at NextGen</div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
