"use client";

import { motion } from "framer-motion";
import { ArrowRight, MapPin, Clock, Briefcase, TrendingUp, Zap, Star, Heart, Users } from "lucide-react";
import Link from "next/link";
import SectionHeader from "@/components/ui/SectionHeader";

const jobs = [
  { title: "Senior Full-Stack Engineer",   department: "Engineering",     location: "Remote / India", type: "Full-time", experience: "4+ years" },
  { title: "AI/ML Engineer",               department: "AI Research",     location: "Remote / India", type: "Full-time", experience: "3+ years" },
  { title: "DevOps Engineer",              department: "Infrastructure",   location: "Remote",         type: "Full-time", experience: "3+ years" },
  { title: "Senior UI/UX Designer",        department: "Design",          location: "Remote / India", type: "Full-time", experience: "4+ years" },
];

const perks = [
  { icon: TrendingUp, title: "Competitive Salary",  desc: "Top-of-market packages with equity options" },
  { icon: Zap,        title: "Remote-First",         desc: "Work from anywhere in the world" },
  { icon: Star,       title: "Learning Budget",      desc: "$2,000/year for courses and conferences" },
  { icon: Heart,      title: "Health Benefits",      desc: "Full health, dental, and vision coverage" },
  { icon: Users,      title: "Great Team",           desc: "Work with world-class engineers and designers" },
  { icon: Briefcase,  title: "Impactful Work",       desc: "Build products used by millions worldwide" },
];

export default function Careers() {
  return (
    <section
      className="ng-section relative overflow-hidden"
      id="careers"
      style={{ background: "#0F1422" }}
    >
      <div className="ng-container">
        <div className="mb-14">
          <SectionHeader
            badge="Careers"
            title="Build the Future"
            titleHighlight="With Us"
            description="Join a team of ambitious engineers, designers, and builders working on high-impact projects for global clients."
          />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left: Open Roles */}
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.10em] mb-5" style={{ color: "#64748B" }}>
              Open Positions
            </p>
            <div className="space-y-3">
              {jobs.map((job, i) => (
                <motion.div
                  key={job.title}
                  className="group rounded-[20px] p-5 transition-all duration-300 cursor-pointer"
                  style={{
                    background: "#121A2B",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(37,99,235,0.22)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"; }}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span
                          className="text-[11px] font-medium px-2.5 py-1 rounded-full"
                          style={{
                            background: "rgba(37,99,235,0.10)",
                            border: "1px solid rgba(37,99,235,0.20)",
                            color: "#2563EB",
                          }}
                        >
                          {job.department}
                        </span>
                        <span className="flex items-center gap-1 text-[11px]" style={{ color: "#22c55e" }}>
                          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                          Hiring
                        </span>
                      </div>
                      <h4
                        className="text-white font-semibold text-[15px] mb-2"
                        style={{ fontFamily: "Sora, sans-serif" }}
                      >
                        {job.title}
                      </h4>
                      <div className="flex flex-wrap gap-3 text-[12px]" style={{ color: "#64748B" }}>
                        <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{job.location}</span>
                        <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{job.type}</span>
                        <span className="flex items-center gap-1"><Briefcase className="w-3.5 h-3.5" />{job.experience}</span>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 flex-shrink-0 mt-1 transition-transform group-hover:translate-x-1" style={{ color: "#64748B" }} />
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
              <Link href="/careers" className="ng-btn-primary">
                View All Openings
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>

          {/* Right: Perks */}
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.10em] mb-5" style={{ color: "#64748B" }}>
              Why Work With Us
            </p>
            <div className="grid grid-cols-2 gap-3">
              {perks.map((perk, i) => (
                <motion.div
                  key={perk.title}
                  className="rounded-[20px] p-5 transition-all duration-300"
                  style={{
                    background: "#121A2B",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ y: -3 }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(37,99,235,0.22)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"; }}
                >
                  <perk.icon className="w-5 h-5 mb-3" style={{ color: "#2563EB" }} />
                  <div className="text-white font-semibold text-[13px] mb-1" style={{ fontFamily: "Sora, sans-serif" }}>{perk.title}</div>
                  <div className="text-[12px] leading-[1.55]" style={{ color: "#94A3B8" }}>{perk.desc}</div>
                </motion.div>
              ))}
            </div>

            {/* Culture quote */}
            <motion.div
              className="mt-4 rounded-[20px] p-5"
              style={{
                background: "#121A2B",
                border: "1px solid rgba(37,99,235,0.15)",
              }}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex items-center gap-2 mb-2">
                <Star className="w-3.5 h-3.5" style={{ color: "#2563EB" }} />
                <span className="text-[12px] font-medium" style={{ color: "#94A3B8" }}>Glassdoor Rating: 4.9/5</span>
              </div>
              <p className="text-[13px] leading-[1.65] italic" style={{ color: "#94A3B8" }}>
                &ldquo;The most collaborative and technically challenging place I&apos;ve ever worked. Real ownership, real impact.&rdquo;
              </p>
              <div className="text-[11px] mt-2" style={{ color: "#64748B" }}>— Senior Engineer, 3 years at NextGen</div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
