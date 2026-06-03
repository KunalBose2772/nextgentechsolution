"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";

const testimonials = [
  {
    id: "1",
    name: "Sarah Mitchell",
    role: "CTO",
    company: "FinanceIQ",
    content: "NextGen Tech Solution transformed our entire fintech platform in just 4 months. The quality of engineering, attention to detail, and proactive communication was exceptional. We saw a 127% increase in user engagement post-launch.",
    avatar: "SM",
    rating: 5,
    gradient: "from-blue-500/20 to-violet-500/20",
    accent: "#3b82f6",
  },
  {
    id: "2",
    name: "Rajesh Kumar",
    role: "Founder & CEO",
    company: "MediConnect",
    content: "Working with NextGen felt like having an extension of our in-house team. They built our entire healthcare platform from scratch — backend, mobile apps, and AI features — with world-class execution. Highly recommended.",
    avatar: "RK",
    rating: 5,
    gradient: "from-green-500/20 to-cyan-500/20",
    accent: "#22c55e",
  },
  {
    id: "3",
    name: "Emma Thompson",
    role: "VP Engineering",
    company: "RetailMax",
    content: "We needed a complete e-commerce overhaul in a tight timeline. NextGen delivered a next-gen platform that handles 2M+ users seamlessly. Their DevOps expertise alone saved us $200K/year in infrastructure costs.",
    avatar: "ET",
    rating: 5,
    gradient: "from-orange-500/20 to-pink-500/20",
    accent: "#f97316",
  },
  {
    id: "4",
    name: "David Chen",
    role: "Product Director",
    company: "LogiTech Solutions",
    content: "The team built our complex ERP system with impressive accuracy and speed. What would have taken 18 months internally was delivered in 6 months with superior code quality and documentation.",
    avatar: "DC",
    rating: 5,
    gradient: "from-violet-500/20 to-blue-500/20",
    accent: "#7c3aed",
  },
  {
    id: "5",
    name: "Priya Sharma",
    role: "CEO",
    company: "EduLearn",
    content: "Our edtech platform now serves 25,000+ students globally, thanks to NextGen's brilliant engineering. The real-time video infrastructure they built is flawlessly reliable. A true technology partner.",
    avatar: "PS",
    rating: 5,
    gradient: "from-pink-500/20 to-violet-500/20",
    accent: "#ec4899",
  },
];

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
    const interval = setInterval(next, 5000);
    return () => clearInterval(interval);
  }, [next]);

  const t = testimonials[current];

  return (
    <section className="section-padding relative overflow-hidden bg-[#060609]">
      <div className="absolute inset-0 bg-dot opacity-20" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-blue-500/4 rounded-full blur-3xl" />

      <div className="container-xl relative">
        <div className="mb-16">
          <SectionHeader
            badge="Testimonials"
            title="Trusted by Industry"
            titleHighlight="Leaders"
            description="Don't take our word for it — here's what our clients say about working with NextGen Tech Solution."
          />
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Main testimonial card */}
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                variants={{
                  enter: (d: number) => ({ opacity: 0, x: d * 60, scale: 0.97 }),
                  center: { opacity: 1, x: 0, scale: 1 },
                  exit: (d: number) => ({ opacity: 0, x: d * -60, scale: 0.97 }),
                }}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                className="glass-card rounded-3xl p-8 md:p-12 border border-white/8 relative overflow-hidden"
              >
                {/* Background gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${t.gradient} opacity-40 rounded-3xl`} />
                <div
                  className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl opacity-20"
                  style={{ background: t.accent }}
                />

                <div className="relative z-10">
                  {/* Quote icon */}
                  <Quote className="w-10 h-10 text-white/10 mb-6" style={{ color: `${t.accent}40` }} />

                  {/* Rating */}
                  <div className="flex gap-1 mb-6">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>

                  {/* Content */}
                  <blockquote className="text-white/75 text-lg md:text-xl leading-relaxed font-light mb-8">
                    &ldquo;{t.content}&rdquo;
                  </blockquote>

                  {/* Author */}
                  <div className="flex items-center gap-4">
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                      style={{ background: `linear-gradient(135deg, ${t.accent}60, ${t.accent}30)`, border: `1px solid ${t.accent}30` }}
                    >
                      {t.avatar}
                    </div>
                    <div>
                      <div className="text-white font-semibold">{t.name}</div>
                      <div className="text-white/40 text-sm">{t.role} at {t.company}</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex items-center justify-center gap-6 mt-8">
              <motion.button
                onClick={prev}
                className="p-3 rounded-xl glass border border-white/8 text-white/50 hover:text-white hover:border-white/20 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ChevronLeft className="w-5 h-5" />
              </motion.button>

              {/* Dots */}
              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
                    className={`rounded-full transition-all duration-300 ${
                      i === current
                        ? "w-8 h-2 bg-blue-400"
                        : "w-2 h-2 bg-white/20 hover:bg-white/40"
                    }`}
                  />
                ))}
              </div>

              <motion.button
                onClick={next}
                className="p-3 rounded-xl glass border border-white/8 text-white/50 hover:text-white hover:border-white/20 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ChevronRight className="w-5 h-5" />
              </motion.button>
            </div>
          </div>

          {/* Trust indicators */}
          <motion.div
            className="mt-16 grid grid-cols-3 gap-6 pt-8 border-t border-white/5"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            {[
              { value: "4.9/5", label: "Average Rating" },
              { value: "50+", label: "Happy Clients" },
              { value: "100%", label: "Project Success Rate" },
            ].map((item) => (
              <div key={item.label} className="text-center">
                <div className="text-2xl font-extrabold text-white mb-1">{item.value}</div>
                <div className="text-white/40 text-sm">{item.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
