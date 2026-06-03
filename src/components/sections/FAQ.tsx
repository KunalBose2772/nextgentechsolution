"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";

const faqs = [
  {
    q: "How long does it typically take to build a web application?",
    a: "Timeline depends on complexity. A simple web app takes 6-8 weeks; a feature-rich SaaS platform typically takes 4-6 months. We provide a detailed timeline during discovery. We never sacrifice quality for speed.",
  },
  {
    q: "Do you provide post-launch support and maintenance?",
    a: "Absolutely. We offer tiered maintenance plans — from basic monitoring to full dedicated support teams. We consider long-term partnerships core to our model. Every project includes 30 days of free post-launch support.",
  },
  {
    q: "What's your pricing model? Fixed or hourly?",
    a: "We offer both models depending on project nature. For well-defined projects, we prefer fixed-price contracts for predictability. For evolving products, a sprint-based retainer often makes more sense. We'll recommend the best fit during our consultation.",
  },
  {
    q: "Can you work with our existing codebase?",
    a: "Yes. We perform a thorough technical audit first, then devise a modernization strategy — whether that's refactoring, partial rebuilds, or gradual migration. We never recommend a full rewrite unless truly necessary.",
  },
  {
    q: "What technologies do you specialize in?",
    a: "Our core stack is Next.js, React, TypeScript, Node.js, Python, and PostgreSQL. For cloud, we work across AWS, Azure, and GCP. We also have deep expertise in AI/ML (OpenAI, custom models), DevOps (Kubernetes, Terraform), and mobile (React Native, Flutter).",
  },
  {
    q: "How do you handle project communication and transparency?",
    a: "Every project gets a dedicated Slack/Discord channel, weekly sprint demos, daily standup summaries, and access to our project management board (Linear or Jira). You're always in the loop with zero surprises.",
  },
  {
    q: "Is my intellectual property protected?",
    a: "100%. All code, designs, and intellectual property created during your project are fully owned by you upon project completion. We sign comprehensive NDAs and IP transfer agreements before any work begins.",
  },
  {
    q: "Do you work with startups or only enterprises?",
    a: "Both. We have packages tailored for early-stage startups (MVP development, fast iteration) and enterprise clients (complex systems, compliance requirements). We adapt our process to your stage and needs.",
  },
];

function FAQItem({ item, index }: { item: typeof faqs[0]; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      className="border-b border-white/5 last:border-0"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ delay: index * 0.06, duration: 0.5 }}
    >
      <button
        className="w-full flex items-center justify-between gap-4 py-6 text-left group"
        onClick={() => setOpen(!open)}
      >
        <span className={`font-medium text-base transition-colors ${open ? "text-white" : "text-white/70 group-hover:text-white/90"}`}>
          {item.q}
        </span>
        <motion.div
          className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${
            open ? "bg-blue-500/20 text-blue-400" : "bg-white/5 text-white/40 group-hover:bg-white/10"
          }`}
          animate={{ rotate: open ? 0 : 0 }}
        >
          {open ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
        </motion.div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <p className="text-white/50 text-sm leading-relaxed pb-6 pr-12">
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
    <section className="section-padding relative overflow-hidden bg-[#060609]" id="faq">
      <div className="absolute inset-0 bg-grid opacity-20" />

      <div className="container-xl relative">
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
              className="mt-10 p-6 glass-card rounded-2xl border border-white/5"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <h4 className="text-white font-semibold mb-2">Still have questions?</h4>
              <p className="text-white/50 text-sm leading-relaxed mb-4">
                Book a free 30-minute consultation with our team. We&apos;ll answer all your questions and help you figure out the best path forward.
              </p>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm font-semibold"
                style={{ background: "linear-gradient(135deg, #3b82f6, #7c3aed)" }}
              >
                Book Free Consultation
              </a>
            </motion.div>
          </div>

          {/* Right: FAQ items */}
          <div className="glass-card rounded-2xl border border-white/5 p-2 divide-y-0">
            <div className="px-4">
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
