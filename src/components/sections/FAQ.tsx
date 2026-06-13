"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import Link from "next/link";
import SectionHeader from "@/components/ui/SectionHeader";

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

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section
      className="relative overflow-hidden py-16 md:py-20"
      id="faq"
      style={{ background: "linear-gradient(160deg, #020209 0%, #060612 50%, #020209 100%)" }}
    >
      {/* Grid backdrop */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
      <div className="absolute top-0 right-0 w-[400px] h-[300px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 items-start">

          {/* Left Block */}
          <div className="lg:col-span-5">
            <SectionHeader
              badge="FAQ"
              title="Answers to Your"
              titleHighlight="Questions"
              description="Everything you need to know before starting your project with us."
              align="left"
              theme="dark"
              className="mb-8"
            />

            <div className="p-6 rounded-2xl border border-white/[0.07]" style={{ background: "rgba(255,255,255,0.025)" }}>
              <h4 className="text-base font-bold text-white mb-2">Still have questions?</h4>
              <p className="text-xs text-slate-400 mb-6 leading-relaxed">
                Book a free 30-minute consultation. We&apos;ll answer everything and help figure out the best path forward.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs px-5 py-2.5 rounded-full transition-all shadow-[0_4px_16px_rgba(6,182,212,0.25)] cursor-pointer"
              >
                Book Free Consultation
              </Link>
            </div>
          </div>

          {/* Right Block */}
          <div className="lg:col-span-7 rounded-2xl border border-white/[0.07] overflow-hidden" style={{ background: "rgba(255,255,255,0.02)" }}>
            <div className="divide-y divide-white/[0.05]">
              {faqs.map((item, i) => {
                const isOpen = openIndex === i;
                return (
                  <div key={i} className="px-6 py-4">
                    <button
                      className="w-full flex items-center justify-between gap-4 text-left font-bold text-sm text-slate-200 hover:text-white transition-colors duration-200 cursor-pointer"
                      onClick={() => toggle(i)}
                      aria-expanded={isOpen}
                    >
                      <span>{item.q}</span>
                      <span
                        className="shrink-0 transition-transform duration-300 text-cyan-400"
                        style={{ transform: isOpen ? "rotate(45deg)" : "rotate(0deg)" }}
                      >
                        <Plus className="w-4 h-4" />
                      </span>
                    </button>
                    <div
                      className="overflow-hidden transition-all duration-300 ease-in-out"
                      style={{ maxHeight: isOpen ? "200px" : "0px", opacity: isOpen ? 1 : 0 }}
                    >
                      <p className="mt-3 text-xs text-slate-400 leading-relaxed pl-1 pb-1">
                        {item.a}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
