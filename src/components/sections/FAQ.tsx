"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import Link from "next/link";

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
    <section className="py-16 bg-slate-950 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-cyan-950/20 via-slate-950 to-slate-950 text-white border-t border-slate-900/50" id="faq">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Block */}
          <div className="lg:col-span-5">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 mb-2 block">
              FAQ
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4 tracking-tight leading-tight">
              Answers to Your Questions
            </h2>
            <p className="text-slate-400 mb-8 max-w-lg leading-relaxed text-sm">
              Everything you need to know before starting your project with us.
            </p>

            <div className="p-6 bg-slate-900/40 border border-slate-800/60 rounded-2xl backdrop-blur-md">
              <h4 className="text-base font-bold text-white mb-2">Still have questions?</h4>
              <p className="text-xs text-slate-400 mb-6 leading-relaxed">
                Book a free 30-minute consultation. We'll answer everything and help figure out the best path forward.
              </p>
              <Link href="/contact" className="inline-flex items-center justify-center bg-cyan-400 hover:bg-cyan-500 text-slate-950 font-bold text-xs px-5 py-2.5 rounded-full transition-all">
                Book Free Consultation
              </Link>
            </div>
          </div>

          {/* Right Block */}
          <div className="lg:col-span-7 border border-slate-800/60 rounded-2xl bg-slate-900/40 p-6 backdrop-blur-md">
            <div className="divide-y divide-slate-800/60">
              {faqs.map((item, i) => {
                const isOpen = openIndex === i;
                return (
                  <div key={i} className="py-4 first:pt-0 last:pb-0">
                    <button
                      className="w-full flex items-center justify-between gap-4 text-left font-bold text-sm text-slate-200 hover:text-white transition-colors duration-200"
                      onClick={() => toggle(i)}
                    >
                      <span>{item.q}</span>
                      <span className="text-cyan-400 shrink-0">
                        {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                      </span>
                    </button>
                    {isOpen && (
                      <p className="mt-3 text-xs text-slate-400 leading-relaxed pl-1">
                        {item.a}
                      </p>
                    )}
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
