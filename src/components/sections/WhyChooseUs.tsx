"use client";

import { motion } from "framer-motion";
import {
  Zap, Shield, TrendingUp, Users, Award,
  CheckCircle, Globe, Headphones, Code2,
} from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";

const features = [
  {
    icon: Zap,
    title: "Lightning Fast Delivery",
    description: "We ship production-ready software in weeks, not months. Agile sprints, daily standups, zero excuses.",
    metric: "3x Faster",
    color: "text-yellow-400",
    bg: "bg-yellow-500/10",
    glow: "rgba(234,179,8,0.15)",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "Bank-grade security standards. SOC 2 Type II ready, GDPR compliant, and penetration tested.",
    metric: "99.9% Secure",
    color: "text-green-400",
    bg: "bg-green-500/10",
    glow: "rgba(34,197,94,0.15)",
  },
  {
    icon: TrendingUp,
    title: "Proven ROI",
    description: "Our clients see an average 3.5x return on technology investment within the first 18 months.",
    metric: "3.5x ROI",
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    glow: "rgba(59,130,246,0.15)",
  },
  {
    icon: Users,
    title: "Dedicated Teams",
    description: "You get a dedicated team of engineers, designers, and project managers exclusively focused on your project.",
    metric: "Full Team",
    color: "text-violet-400",
    bg: "bg-violet-500/10",
    glow: "rgba(124,58,237,0.15)",
  },
  {
    icon: Globe,
    title: "Global Scale",
    description: "Infrastructure and architecture designed to handle millions of users across any geography.",
    metric: "Infinite Scale",
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
    glow: "rgba(6,182,212,0.15)",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Round-the-clock monitoring, incident response, and dedicated support with guaranteed SLAs.",
    metric: "Always On",
    color: "text-pink-400",
    bg: "bg-pink-500/10",
    glow: "rgba(236,72,153,0.15)",
  },
  {
    icon: Code2,
    title: "Clean Code",
    description: "Thoroughly reviewed, documented, and tested code. Every pull request is production-quality.",
    metric: "A+ Quality",
    color: "text-orange-400",
    bg: "bg-orange-500/10",
    glow: "rgba(249,115,22,0.15)",
  },
  {
    icon: Award,
    title: "Award-Winning Design",
    description: "UI/UX that wins hearts and drives results. Every pixel is intentional, every interaction delightful.",
    metric: "5★ Design",
    color: "text-teal-400",
    bg: "bg-teal-500/10",
    glow: "rgba(20,184,166,0.15)",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="section-padding relative overflow-hidden bg-[#050505]">
      <div className="absolute inset-0 bg-grid opacity-25" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-blue-500/5 rounded-full blur-3xl" />

      <div className="container-xl relative">
        <div className="mb-16">
          <SectionHeader
            badge="Why Choose Us"
            title="The NextGen"
            titleHighlight="Advantage"
            description="What separates us from every other technology company — and why world-class brands trust us to build their most important products."
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              className="relative group p-6 glass-card rounded-2xl border border-white/5 hover:border-white/12 transition-all duration-300 overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.06, duration: 0.5 }}
              whileHover={{ y: -4 }}
            >
              {/* Background glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
                style={{ background: `radial-gradient(200px circle at 50% 0%, ${feature.glow}, transparent)` }}
              />

              {/* Metric badge */}
              <div className="absolute top-4 right-4">
                <span className={`text-xs font-bold ${feature.color} opacity-60 group-hover:opacity-100 transition-opacity`}>
                  {feature.metric}
                </span>
              </div>

              <div className="relative z-10">
                {/* Icon */}
                <div className={`w-12 h-12 rounded-xl ${feature.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className={`w-6 h-6 ${feature.color}`} />
                </div>

                <h3 className="text-white font-bold text-base mb-2 leading-tight">{feature.title}</h3>
                <p className="text-white/45 text-sm leading-relaxed">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom proof bar */}
        <motion.div
          className="mt-16 p-8 glass-card rounded-2xl border border-white/5"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 items-center">
            <div className="sm:col-span-2">
              <h3 className="text-white text-xl font-bold mb-2">Ready to build something extraordinary?</h3>
              <p className="text-white/50 text-sm">Join 50+ companies that have transformed their digital presence with NextGen Tech Solution.</p>
              <div className="flex flex-wrap gap-4 mt-4">
                {[
                  { icon: CheckCircle, text: "Free technical consultation" },
                  { icon: CheckCircle, text: "No commitment required" },
                  { icon: CheckCircle, text: "Response within 24 hours" },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-2 text-white/60 text-sm">
                    <Icon className="w-4 h-4 text-green-400 flex-shrink-0" />
                    {text}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-center sm:justify-end">
              <motion.a
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-white font-semibold text-sm"
                style={{ background: "linear-gradient(135deg, #3b82f6, #7c3aed)" }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Start a Project
                <Zap className="w-4 h-4" />
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
