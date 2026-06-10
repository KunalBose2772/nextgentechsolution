"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import Link from "next/link";
import SectionHeader from "@/components/ui/SectionHeader";
import SectionGlow from "@/components/ui/SectionGlow";

const faqs = [
  {
    q: "How long does it take to build a web application?",
    a: "Timeline depends on complexity. A simple web app takes 6–8 weeks; a feature-rich SaaS platform typically takes 4–6 months. We provide a detailed timeline during discovery and never sacrifice quality for speed.",
  },
  {
    q: "Do you provide post-launch support and maintenance?",
    a: "Absolutely. We offer tiered maintenance plans — from basic monitoring to dedicated support teams. Every project includes 30 days of free post-launch support, and we view long-term partnerships as core to our model.",
  },
  {
    q: "What's your pricing model — fixed or hourly?",
    a: "We offer both. For well-defined projects, we prefer fixed-price contracts for predictability. For evolving products, a sprint-based retainer often makes more sense. We'll recommend the best fit during consultation.",
  },
  {
    q: "Can you work with our existing codebase?",
    a: "Yes. We perform a thorough technical audit first, then devise a modernization strategy — whether refactoring, partial rebuilds, or gradual migration. We never recommend a full rewrite unless truly necessary.",
  },
  {
    q: "What technologies do you specialize in?",
    a: "Our core stack is Next.js, React, TypeScript, Node.js, Python, and PostgreSQL. For cloud: AWS, Azure, and GCP. We also have deep expertise in AI/ML, DevOps (Kubernetes, Terraform), and mobile (React Native, Flutter).",
  },
  {
    q: "How do you handle communication and transparency?",
    a: "Every project gets a dedicated Slack channel, weekly sprint demos, daily standup summaries, and access to our project management board. You're always in the loop with zero surprises.",
  },
  {
    q: "Is my intellectual property protected?",
    a: "100%. All code, designs, and IP created during your project are fully owned by you upon completion. We sign comprehensive NDAs and IP transfer agreements before any work begins.",
  },
  {
    q: "Do you work with startups or only enterprises?",
    a: "Both. We have packages for early-stage startups (MVP development, fast iteration) and enterprise clients (complex systems, compliance). We adapt our process to your stage and needs.",
  },
];

function FAQItem({ item, index }: { item: typeof faqs[0]; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      className="border-b transition-all duration-300 relative group px-4 py-1"
      style={{ 
        borderColor: "rgba(255,255,255,0.06)",
        background: open ? "rgba(255, 255, 255, 0.01)" : "transparent"
      }}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ delay: index * 0.05, duration: 0.35 }}
    >
      {/* Active neon left strip indicator */}
      {open && (
        <motion.div 
          className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#06B6D4] to-[#3B82F6]"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          exit={{ scaleY: 0 }}
          transition={{ duration: 0.2 }}
        />
      )}

      <button
        className="w-full flex items-center justify-between gap-4 py-5 text-left cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <span
          className="text-[14.5px] font-bold leading-[1.5] transition-colors"
          style={{ color: open ? "#ffffff" : "#94A3B8", fontFamily: "Sora, sans-serif" }}
        >
          {item.q}
        </span>
        <div
          className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300"
          style={{
            background: open ? "rgba(var(--accent-primary-rgb),0.12)" : "rgba(255,255,255,0.05)",
            color: open ? "var(--accent-primary)" : "#64748B",
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
          }}
        >
          {open ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
        </div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <p className="text-[13.5px] leading-[1.75] pb-5 pr-12 text-[#94A3B8]">
              {item.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  return (
    <section 
      className="relative overflow-hidden py-16 md:py-24 z-30" 
      id="faq"
      style={{
        background: "linear-gradient(180deg, #0A0A0B 0%, #030303 100%)",
      }}
    >
      <SectionGlow />

      {/* Technical Dotted Grid Background */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.03] z-0 ng-grid-bg" 
      />
      
      {/* Ambient Glows */}
      <div 
        className="absolute top-[20%] left-[-15%] w-[450px] h-[450px] rounded-full pointer-events-none opacity-[0.10] blur-[90px] z-0" 
        style={{ background: "radial-gradient(circle, #3B82F6 0%, transparent 70%)" }} 
      />
      <div 
        className="absolute bottom-[20%] right-[-15%] w-[500px] h-[500px] rounded-full pointer-events-none opacity-[0.08] blur-[100px] z-0" 
        style={{ background: "radial-gradient(circle, #06B6D4 0%, transparent 70%)" }} 
      />

      <div className="ng-container relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left */}
          <div className="lg:sticky lg:top-32">
            <SectionHeader
              badge="FAQ"
              title="Answers to Your"
              titleHighlight="Questions"
              description="Everything you need to know before starting your project with us."
              align="left"
            />

            <motion.div
              className="mt-10 rounded-2xl p-6"
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(var(--accent-primary-rgb),0.15)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
              }}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              whileHover={{
                y: -4,
                borderColor: "rgba(var(--accent-primary-rgb), 0.30)",
                background: "rgba(255, 255, 255, 0.04)",
                boxShadow: "0 12px 30px rgba(0, 0, 0, 0.3), 0 0 20px rgba(var(--accent-primary-rgb), 0.04)"
              }}
            >
              <h4
                className="text-white font-bold text-[16px] mb-2"
                style={{ fontFamily: "Sora, sans-serif" }}
              >
                Still have questions?
              </h4>
              <p className="text-[13.5px] leading-[1.65] mb-5 text-[#94A3B8]">
                Book a free 30-minute consultation. We&apos;ll answer everything and help figure out the best path forward.
              </p>
              <Link href="/contact" className="ng-btn-primary text-[14px]" style={{ height: "44px" }}>
                Book Free Consultation
              </Link>
            </motion.div>
          </div>

          {/* Right: FAQ items */}
          <div
            className="rounded-2xl p-2"
            style={{
              background: "rgba(255,255,255,0.01)",
              border: "1px solid rgba(255,255,255,0.05)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
            }}
          >
            <div>
              {faqs.map((item, i) => (
                <FAQItem key={i} item={item} index={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
