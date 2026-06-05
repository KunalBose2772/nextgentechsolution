"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import SectionGlow from "@/components/ui/SectionGlow";

const testimonials = [
  {
    id: "1",
    name: "Sarah Mitchell", role: "CTO", company: "FinanceIQ",
    content: "NextGen Tech Solution transformed our entire fintech platform in just 4 months. The quality of engineering, attention to detail, and proactive communication was exceptional. We saw a 127% increase in user engagement post-launch.",
    avatar: "SM", rating: 5,
  },
  {
    id: "2",
    name: "Rajesh Kumar", role: "Founder & CEO", company: "MediConnect",
    content: "Working with NextGen felt like having an extension of our in-house team. They built our entire healthcare platform from scratch — backend, mobile apps, and AI features — with world-class execution.",
    avatar: "RK", rating: 5,
  },
  {
    id: "3",
    name: "Emma Thompson", role: "VP Engineering", company: "RetailMax",
    content: "We needed a complete e-commerce overhaul in a tight timeline. NextGen delivered a next-gen platform handling 2M+ users seamlessly. Their DevOps expertise alone saved us $200K/year in infrastructure costs.",
    avatar: "ET", rating: 5,
  },
  {
    id: "4",
    name: "David Chen", role: "Product Director", company: "LogiTech Solutions",
    content: "The team built our complex ERP system with impressive accuracy and speed. What would have taken 18 months internally was delivered in 6 months with superior code quality and documentation.",
    avatar: "DC", rating: 5,
  },
  {
    id: "5",
    name: "Priya Sharma", role: "CEO", company: "EduLearn",
    content: "Our edtech platform now serves 25,000+ students globally, thanks to NextGen's brilliant engineering. The real-time video infrastructure they built is flawlessly reliable. A true technology partner.",
    avatar: "PS", rating: 5,
  },
];

function Avatar({ initials }: { initials: string }) {
  return (
    <div
      className="w-11 h-11 rounded-xl flex items-center justify-center text-white font-semibold text-sm flex-shrink-0"
      style={{
        background: "var(--bg-surface)",
        border: "1px solid rgba(var(--accent-primary-rgb),0.30)",
        fontFamily: "Sora, sans-serif",
      }}
    >
      {initials}
    </div>
  );
}

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((c) => (c + 1) % testimonials.length);
  }, []);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  }, []);

  useEffect(() => {
    const interval = setInterval(next, 6000);
    return () => clearInterval(interval);
  }, [next]);

  const t = testimonials[current];

  return (
    <section
      className="ng-section relative"
      style={{ background: "#000000" }}
    >
      <SectionGlow />
      <div className="ng-container relative z-10">
        <div className="mb-14">
          <SectionHeader
            badge="Testimonials"
            title="Trusted by Industry"
            titleHighlight="Leaders"
            description="Don't take our word for it — here's what clients say about working with us."
          />
        </div>

        <div className="max-w-3xl mx-auto">
          {/* Card */}
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current}
              custom={direction}
              variants={{
                enter: (d: number) => ({ opacity: 0, x: d * 40 }),
                center: { opacity: 1, x: 0 },
                exit: (d: number) => ({ opacity: 0, x: d * -40 }),
              }}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
              className="rounded-[20px] p-8"
              style={{
                background: "var(--bg-surface)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4" style={{ fill: "var(--accent-primary)", color: "var(--accent-primary)" }} />
                ))}
              </div>

              {/* Quote */}
              <blockquote
                className="text-[17px] leading-[1.75] mb-8"
                style={{ color: "#94A3B8", fontStyle: "normal" }}
              >
                &ldquo;{t.content}&rdquo;
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-3">
                <Avatar initials={t.avatar} />
                <div>
                  <div
                    className="text-[14px] font-semibold text-white"
                    style={{ fontFamily: "Sora, sans-serif" }}
                  >
                    {t.name}
                  </div>
                  <div className="text-[12px]" style={{ color: "#64748B" }}>
                    {t.role} at {t.company}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-5 mt-8">
            <button
              onClick={prev}
              className="w-9 h-9 rounded-xl flex items-center justify-center transition-colors"
              style={{ background: "var(--bg-surface)", border: "1px solid rgba(255,255,255,0.08)", color: "#64748B" }}
              onMouseEnter={e => { e.currentTarget.style.color = "#ffffff"; }}
              onMouseLeave={e => { e.currentTarget.style.color = "#64748B"; }}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
                  className="rounded-full transition-all duration-300"
                  style={{
                    width: i === current ? "24px" : "6px",
                    height: "6px",
                    background: i === current ? "var(--accent-primary)" : "rgba(255,255,255,0.15)",
                  }}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-9 h-9 rounded-xl flex items-center justify-center transition-colors"
              style={{ background: "var(--bg-surface)", border: "1px solid rgba(255,255,255,0.08)", color: "#64748B" }}
              onMouseEnter={e => { e.currentTarget.style.color = "#ffffff"; }}
              onMouseLeave={e => { e.currentTarget.style.color = "#64748B"; }}
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Trust Metrics */}
          <motion.div
            className="mt-12 grid grid-cols-3 gap-6 pt-8 border-t"
            style={{ borderColor: "rgba(255,255,255,0.06)" }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            {[
              { value: "4.9/5", label: "Average Rating" },
              { value: "50+", label: "Happy Clients" },
              { value: "100%", label: "Success Rate" },
            ].map((item) => (
              <div key={item.label} className="text-center">
                <div
                  className="text-[24px] font-semibold text-white mb-0.5"
                  style={{ fontFamily: "Sora, sans-serif", letterSpacing: "-0.02em" }}
                >
                  {item.value}
                </div>
                <div className="text-[12px]" style={{ color: "#64748B" }}>{item.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
