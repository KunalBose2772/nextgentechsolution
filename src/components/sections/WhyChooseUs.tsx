"use client";

import { motion } from "framer-motion";
import {
  Zap, Shield, TrendingUp, Users, Globe,
  Headphones, Code2, Award, CheckCircle,
} from "lucide-react";
import Link from "next/link";
import SectionHeader from "@/components/ui/SectionHeader";
import SectionGlow from "@/components/ui/SectionGlow";

const features = [
  {
    icon: Zap,
    title: "Lightning Fast Delivery",
    description: "We ship production-ready software in weeks, not months. Agile sprints, daily standups, zero excuses.",
    metric: "3× Faster",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "Bank-grade security standards. SOC 2 Type II ready, GDPR compliant, and penetration tested.",
    metric: "99.9% Secure",
  },
  {
    icon: TrendingUp,
    title: "Proven ROI",
    description: "Our clients see an average 3.5× return on technology investment within the first 18 months.",
    metric: "3.5× ROI",
  },
  {
    icon: Users,
    title: "Dedicated Teams",
    description: "A dedicated team of engineers, designers, and project managers exclusively focused on your project.",
    metric: "Full Team",
  },
  {
    icon: Globe,
    title: "Global Scale",
    description: "Infrastructure and architecture designed to handle millions of users across any geography.",
    metric: "∞ Scale",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Round-the-clock monitoring, incident response, and dedicated support with guaranteed SLAs.",
    metric: "Always On",
  },
  {
    icon: Code2,
    title: "Clean Code",
    description: "Thoroughly reviewed, documented, and tested code. Every pull request is production-quality.",
    metric: "A+ Quality",
  },
  {
    icon: Award,
    title: "Proven Track Record",
    description: "150+ projects delivered across 20+ industries. Five-star client satisfaction rating.",
    metric: "5★ Rated",
  },
];

export default function WhyChooseUs() {
  return (
    <section
      className="ng-section relative"
    >
      <SectionGlow />
      <div className="ng-container relative z-10">
        <div className="mb-14">
          <SectionHeader
            badge="Why Choose Us"
            title="The NextGen"
            titleHighlight="Advantage"
            description="What separates us — and why world-class brands trust us to build their most critical products."
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              className="group rounded-[20px] p-6 transition-all duration-300"
              style={{
                background: "var(--bg-surface)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
              whileHover={{ y: -4 }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(var(--accent-primary-rgb),0.22)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"; }}
            >
              {/* Metric */}
              <div className="flex items-start justify-between mb-5">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: "rgba(var(--accent-primary-rgb),0.10)" }}
                >
                  <motion.div>
                    <feature.icon className="w-5 h-5" style={{ color: "var(--accent-primary)" }} />
                  </motion.div>
                </div>
                <span
                  className="text-[11px] font-semibold"
                  style={{ color: "var(--accent-primary)", fontFamily: "Sora, sans-serif" }}
                >
                  {feature.metric}
                </span>
              </div>

              <h3
                className="text-[15px] font-semibold text-white mb-2"
                style={{ fontFamily: "Sora, sans-serif" }}
              >
                {feature.title}
              </h3>
              <p className="text-[13px] leading-[1.65]" style={{ color: "#94A3B8" }}>
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA Strip */}
        <motion.div
          className="mt-12 rounded-[20px] p-8 flex flex-col lg:flex-row items-center justify-between gap-6"
          style={{
            background: "var(--bg-surface)",
            border: "1px solid rgba(var(--accent-primary-rgb),0.15)",
          }}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.35 }}
        >
          <div>
            <h3
              className="text-white text-[20px] font-semibold mb-1"
              style={{ fontFamily: "Sora, sans-serif" }}
            >
              Ready to build something extraordinary?
            </h3>
            <div className="flex flex-wrap gap-5 mt-3">
              {[
                "Free technical consultation",
                "No commitment required",
                "Response within 24 hours",
              ].map((text) => (
                <div key={text} className="flex items-center gap-2 text-[13px]" style={{ color: "#94A3B8" }}>
                  <CheckCircle className="w-3.5 h-3.5 flex-shrink-0" style={{ color: "var(--accent-primary)" }} />
                  {text}
                </div>
              ))}
            </div>
          </div>
          <Link href="/contact" className="ng-btn-primary shrink-0">
            Start a Project
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
