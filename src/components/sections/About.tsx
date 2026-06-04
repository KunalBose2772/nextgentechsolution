"use client";

import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";
import SectionHeader from "@/components/ui/SectionHeader";
import { useInView } from "@/hooks/useInView";
import { useCounter } from "@/hooks/useCounter";

const stats = [
  { end: 150, suffix: "+", label: "Projects Delivered" },
  { end: 50,  suffix: "+", label: "Global Clients" },
  { end: 30,  suffix: "+", label: "Expert Engineers" },
  { end: 5,   suffix: "yr", label: "Industry Experience" },
];

const values = [
  "Innovation-first engineering culture",
  "Enterprise-grade security standards",
  "Agile & transparent processes",
  "24/7 dedicated support",
  "Long-term partnership mindset",
  "Cutting-edge technology stack",
];

function StatCounter({
  end, suffix, label, trigger,
}: { end: number; suffix: string; label: string; trigger: boolean }) {
  const count = useCounter(end, 2000, 0, trigger);
  return (
    <div className="ng-card text-center">
      <div
        className="text-[36px] font-semibold leading-none mb-1 text-white"
        style={{ fontFamily: "Sora, sans-serif", letterSpacing: "-0.03em" }}
      >
        {count}{suffix}
      </div>
      <div className="text-[13px]" style={{ color: "#64748B" }}>{label}</div>
    </div>
  );
}

export default function About() {
  const { ref, inView } = useInView(0.2, true);

  return (
    <section className="ng-section relative overflow-hidden" id="about" style={{ background: "#0A0F1C" }}>
      <div className="ng-container">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Left: Content */}
          <div>
            <SectionHeader
              badge="About Us"
              title="Building the Future of"
              titleHighlight="Digital Innovation"
              description="We are a premium technology company crafting intelligent, scalable, and reliable digital products that transform businesses worldwide."
              align="left"
            />

            <div
              ref={ref as React.RefObject<HTMLDivElement>}
              className="mt-8 space-y-3"
            >
              {values.map((value, i) => (
                <motion.div
                  key={value}
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, x: -16 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: i * 0.07, duration: 0.4 }}
                >
                  <CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: "#2563EB" }} />
                  <span className="text-[15px] font-medium" style={{ color: "#94A3B8" }}>{value}</span>
                </motion.div>
              ))}
            </div>

            <motion.div
              className="mt-10 flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              <Link href="/about" className="ng-btn-primary">
                Our Story
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/careers" className="ng-btn-ghost">
                Join Our Team
              </Link>
            </motion.div>
          </div>

          {/* Right: Mission / Vision */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
          >
            {[
              {
                label: "Our Mission",
                text: "Empower businesses with cutting-edge technology solutions that drive measurable growth and lasting competitive advantage.",
              },
              {
                label: "Our Vision",
                text: "To become the world's most trusted technology partner, enabling enterprises to thrive in the digital-first era.",
              },
              {
                label: "Our Approach",
                text: "Engineering-led execution with a product mindset — we focus on precision, scalability, and long-term value in every solution we build.",
              },
            ].map((item) => (
              <div key={item.label} className="ng-card hover:border-[rgba(37,99,235,0.20)]">
                <div className="ng-label mb-2">{item.label}</div>
                <p className="text-[15px] leading-[1.7]" style={{ color: "#94A3B8" }}>
                  {item.text}
                </p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Stats Row */}
        <div
          ref={ref as React.RefObject<HTMLDivElement>}
          className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {stats.map((stat) => (
            <StatCounter key={stat.label} {...stat} trigger={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}
