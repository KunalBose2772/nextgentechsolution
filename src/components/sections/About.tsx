"use client";

import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { useCounter } from "@/hooks/useCounter";
import { ArrowRight, CheckCircle2, TrendingUp, Award, Users, Globe } from "lucide-react";
import Link from "next/link";
import SectionHeader from "@/components/ui/SectionHeader";

const stats = [
  { end: 150, suffix: "+", label: "Projects Delivered", icon: TrendingUp, color: "text-blue-400" },
  { end: 50, suffix: "+", label: "Global Clients", icon: Globe, color: "text-violet-400" },
  { end: 30, suffix: "+", label: "Expert Engineers", icon: Users, color: "text-cyan-400" },
  { end: 5, suffix: "yrs", label: "Industry Experience", icon: Award, color: "text-green-400" },
];

const values = [
  "Innovation-first engineering culture",
  "Enterprise-grade security standards",
  "Agile & transparent processes",
  "24/7 dedicated support",
  "Long-term partnership mindset",
  "Cutting-edge technology stack",
];

function StatCounter({ end, suffix, label, icon: Icon, color, trigger }: typeof stats[0] & { trigger: boolean }) {
  const count = useCounter(end, 2000, 0, trigger);
  return (
    <div className="text-center p-6 glass-card rounded-2xl hover:border-white/10 transition-all group">
      <Icon className={`w-6 h-6 ${color} mx-auto mb-3 group-hover:scale-110 transition-transform`} />
      <div className="stat-number text-white font-extrabold leading-none mb-1">
        {count}{suffix}
      </div>
      <div className="text-white/40 text-sm font-medium">{label}</div>
    </div>
  );
}

export default function About() {
  const { ref, inView } = useInView(0.2, true);

  return (
    <section className="section-padding relative overflow-hidden bg-[#060609]" id="about">
      {/* BG */}
      <div className="absolute inset-0 bg-dot opacity-20" />
      <div className="absolute right-0 top-1/4 w-96 h-96 bg-violet-500/5 rounded-full blur-3xl" />
      <div className="absolute left-0 bottom-1/4 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl" />

      <div className="container-xl relative">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Left: Content */}
          <div>
            <SectionHeader
              badge="About Us"
              title="Building the Future of"
              titleHighlight="Digital Innovation"
              description="We are a premium technology company specializing in crafting intelligent, scalable, and beautiful digital products that transform businesses."
              align="left"
            />

            <div
              ref={ref as React.RefObject<HTMLDivElement>}
              className="mt-8 space-y-3"
            >
              {values.map((value, i) => (
                <motion.div
                  key={value}
                  className="flex items-center gap-3 text-white/60 group"
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                >
                  <CheckCircle2 className="w-5 h-5 text-blue-400 flex-shrink-0 group-hover:text-blue-300 transition-colors" />
                  <span className="text-sm font-medium group-hover:text-white/80 transition-colors">{value}</span>
                </motion.div>
              ))}
            </div>

            <motion.div
              className="mt-10 flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white font-semibold text-sm group"
                style={{ background: "linear-gradient(135deg, #3b82f6, #7c3aed)" }}
              >
                Our Story
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/careers"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white/70 hover:text-white border border-white/10 hover:border-white/20 font-medium text-sm transition-all"
              >
                Join Our Team
              </Link>
            </motion.div>
          </div>

          {/* Right: Visual */}
          <div className="relative">
            {/* Main visual card */}
            <motion.div
              className="relative glass-card rounded-3xl p-8 overflow-hidden"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              {/* Abstract visual */}
              <div className="relative h-64 rounded-2xl overflow-hidden bg-[#0a0a12] border border-white/5 mb-6">
                {/* Animated grid */}
                <div className="absolute inset-0 bg-grid opacity-40" />

                {/* Floating elements */}
                <motion.div
                  className="absolute top-6 left-6 bg-blue-500/20 border border-blue-500/30 rounded-xl px-4 py-3 backdrop-blur-sm"
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  <div className="text-blue-300 text-xs font-medium">Next.js 15</div>
                  <div className="text-white/60 text-xs mt-0.5">Frontend</div>
                </motion.div>

                <motion.div
                  className="absolute top-6 right-6 bg-violet-500/20 border border-violet-500/30 rounded-xl px-4 py-3 backdrop-blur-sm"
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                >
                  <div className="text-violet-300 text-xs font-medium">Node.js API</div>
                  <div className="text-white/60 text-xs mt-0.5">Backend</div>
                </motion.div>

                <motion.div
                  className="absolute bottom-6 left-6 bg-green-500/20 border border-green-500/30 rounded-xl px-4 py-3 backdrop-blur-sm"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                >
                  <div className="text-green-300 text-xs font-medium">AWS Deploy</div>
                  <div className="text-white/60 text-xs mt-0.5">Cloud</div>
                </motion.div>

                <motion.div
                  className="absolute bottom-6 right-6 bg-cyan-500/20 border border-cyan-500/30 rounded-xl px-4 py-3 backdrop-blur-sm"
                  animate={{ y: [0, -7, 0] }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                >
                  <div className="text-cyan-300 text-xs font-medium">PostgreSQL</div>
                  <div className="text-white/60 text-xs mt-0.5">Database</div>
                </motion.div>

                {/* Center glow */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    className="w-24 h-24 rounded-full"
                    style={{
                      background: "radial-gradient(circle, rgba(59,130,246,0.3) 0%, transparent 70%)",
                      boxShadow: "0 0 60px rgba(59,130,246,0.3)",
                    }}
                    animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                  <div className="absolute w-12 h-12 rounded-full flex items-center justify-center"
                    style={{ background: "linear-gradient(135deg, #3b82f6, #7c3aed)" }}>
                    <span className="text-white font-bold text-xs">NG</span>
                  </div>
                </div>
              </div>

              {/* Mission/Vision tabs */}
              <div className="space-y-3">
                {[
                  { label: "Our Mission", text: "Empower businesses with cutting-edge technology solutions that drive measurable growth and lasting competitive advantage." },
                  { label: "Our Vision", text: "To become the world's most trusted technology partner, enabling enterprises to thrive in the digital-first era." },
                ].map((item) => (
                  <div key={item.label} className="p-4 rounded-xl bg-white/3 border border-white/5 hover:border-white/10 transition-colors">
                    <div className="text-blue-400 text-xs font-medium uppercase tracking-wide mb-1.5">{item.label}</div>
                    <p className="text-white/50 text-sm leading-relaxed">{item.text}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Decorative elements */}
            <div className="absolute -top-6 -right-6 w-48 h-48 bg-blue-500/5 rounded-full blur-3xl" />
            <div className="absolute -bottom-6 -left-6 w-40 h-40 bg-violet-500/5 rounded-full blur-3xl" />
          </div>
        </div>

        {/* Stats Row */}
        <div
          ref={ref as React.RefObject<HTMLDivElement>}
          className="mt-20 grid grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {stats.map((stat) => (
            <StatCounter key={stat.label} {...stat} trigger={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}
