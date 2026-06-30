"use client";

import Link from "next/link";
import { Home, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface ServiceHeroProps {
  badge?: string;
  title: string;
  titleHighlight?: string;
  description: string;
  breadcrumbs: BreadcrumbItem[];
  satisfiedCount?: string;
  imageLeft?: string;
  imageRight?: string;
}

/* ── Hydration-Safe Loop Typewriter Hook with zero layout shift ── */
function useTypewriter(text: string, speed = 50, delayAfterDone = 3000) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!text) return;
    setCurrentIndex(0);

    let index = 0;
    let intervalId: any;
    let timeoutId: any;

    const startTyping = () => {
      intervalId = setInterval(() => {
        index++;
        setCurrentIndex(index);
        if (index >= text.length) {
          clearInterval(intervalId);
          timeoutId = setTimeout(() => {
            setCurrentIndex(0);
            index = 0;
            startTyping();
          }, delayAfterDone);
        }
      }, speed);
    };

    startTyping();

    return () => {
      clearInterval(intervalId);
      clearTimeout(timeoutId);
    };
  }, [text, speed, delayAfterDone]);

  return currentIndex;
}

export default function ServiceHero({
  title,
  titleHighlight = "",
  description,
  breadcrumbs,
  satisfiedCount = "200k+",
  imageLeft = "/images/about_office1.png",
  imageRight = "/images/about_office2.png",
}: ServiceHeroProps) {
  const typedCount = useTypewriter(titleHighlight, 50, 2500);
  const avatars = [
    "/images/team/ananya.png",
    "/images/team/aryan.png",
    "/images/team/priya.png",
  ];

  const scrollToContact = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const contactSection = document.getElementById("contact-project-form");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative overflow-hidden bg-white lg:h-screen lg:min-h-[640px] pt-[124px] pb-6 border-b border-slate-200/50 flex flex-col justify-between">
      {/* Premium subtle bottom radial ambient glow */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[220px] pointer-events-none"
        style={{ background: "radial-gradient(circle at bottom, rgba(var(--accent-global-rgb), 0.05) 0%, transparent 75%)" }}
      />
      <div
        className="absolute top-0 right-0 w-[300px] h-[300px] pointer-events-none"
        style={{ background: "radial-gradient(circle at top right, rgba(var(--accent-global-rgb), 0.02) 0%, transparent 70%)" }}
      />

      <div className="max-w-[1400px] mx-auto px-6 relative z-10 w-full flex-1 flex flex-col justify-between">

        {/* Top Content Block */}
        <div>
          {/* Breadcrumbs in an elegant pill */}
          <div className="inline-flex mb-5">
            <nav
              aria-label="Breadcrumb"
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[var(--accent-global-dim)] border shadow-sm"
              style={{ borderColor: "rgba(var(--accent-global-rgb), 0.15)" }}
            >
              <Link
                href="/"
                className="flex items-center gap-1 text-[10px] font-extrabold uppercase tracking-wider text-[var(--accent-global)] hover:text-[var(--accent-global-hover)] transition-colors"
              >
                <Home className="w-3.5 h-3.5 text-[var(--accent-global)]" />
                Home
              </Link>
              {breadcrumbs.map((crumb, idx) => (
                <span key={idx} className="flex items-center gap-1.5">
                  <span className="text-[10px] font-bold" style={{ color: "rgba(var(--accent-global-rgb), 0.25)" }}>/</span>
                  {crumb.href ? (
                    <Link
                      href={crumb.href}
                      className="text-[10px] font-extrabold uppercase tracking-wider text-[var(--accent-global)] hover:text-[var(--accent-global-hover)] transition-colors"
                    >
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="text-[10px] font-black uppercase tracking-wider text-[var(--accent-global)]">
                      {crumb.label}
                    </span>
                  )}
                </span>
              ))}
            </nav>
          </div>

          {/* Title and description grid - Vertically Centered */}
          <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-8 lg:gap-16 items-center">
            {/* Headline with Typewriter colored highlight */}
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-5xl lg:text-[52px] font-black text-slate-900 tracking-tight leading-[1.1] font-sora"
            >
              {title}{" "}
              {titleHighlight && (
                <span
                  className="text-[var(--accent-global)] relative inline"
                  style={{
                    textShadow: `0 0 32px rgba(var(--accent-global-rgb),0.15)`,
                  }}
                >
                  {Array.from(titleHighlight).map((char, idx) => (
                    <span
                      key={idx}
                      className="transition-opacity duration-75"
                      style={{ opacity: idx < typedCount ? 1 : 0 }}
                    >
                      {char}
                    </span>
                  ))}
                  {/* Blinking cursor */}
                  {typedCount < titleHighlight.length && (
                    <span
                      className="inline-block w-[3.5px] h-[0.85em] bg-[var(--accent-global)] ml-1 align-middle rounded-[2px]"
                      style={{
                        animation: "hero-cursor-blink 0.7s step-end infinite",
                      }}
                    />
                  )}
                </span>
              )}
            </motion.h1>

            {/* Description & Action */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="space-y-4"
            >
              <p className="text-[14px] sm:text-[15.5px] text-slate-600 leading-relaxed font-semibold">
                {description}
              </p>
              <div className="flex">
                <a
                  href="#contact-project-form"
                  onClick={scrollToContact}
                  className="inline-flex items-center gap-2 px-5.5 py-2.5 rounded-full bg-[var(--accent-global)] hover:bg-[var(--accent-global-hover)] text-white text-[11px] font-black uppercase tracking-wider transition-all duration-300 hover:-translate-y-0.5"
                  style={{
                    boxShadow: "0 4px 12px rgba(var(--accent-global-rgb), 0.15)",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 6px 18px rgba(var(--accent-global-rgb), 0.25)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "0 4px 12px rgba(var(--accent-global-rgb), 0.15)"; }}
                >
                  <span>Get Started</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom gallery cards row */}
        <div className="grid grid-cols-1 md:grid-cols-[1.2fr_0.8fr_1.2fr] gap-5 mt-6 lg:mt-0 items-stretch h-auto md:h-[180px] lg:h-[210px] mb-4">
          {/* Card 1: Left Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="rounded-[20px] overflow-hidden border border-slate-200/50 shadow-sm bg-white h-[140px] md:h-full relative group"
          >
            <img
              src={imageLeft}
              alt="Development collaboration"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
            />
          </motion.div>

          {/* Card 2: Center Satisfied Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="rounded-[20px] p-6 border bg-[var(--accent-global-dim)] shadow-sm flex flex-col justify-between h-[140px] md:h-full relative overflow-visible group"
            style={{ borderColor: "rgba(var(--accent-global-rgb), 0.1)" }}
          >
            <div
              className="absolute top-0 right-0 w-20 h-20 rounded-full blur-lg pointer-events-none -mr-3 -mt-3"
              style={{ background: "rgba(var(--accent-global-rgb), 0.05)" }}
            />

            {/* Technical Architect Portrait (Popping out of Card top) */}
            <img
              src="/images/architect_portrait.png"
              alt="Technical Supervisor"
              className="absolute right-[-5%] md:right-[-8%] lg:right-[-10%] bottom-0 h-[100%] md:h-[120%] w-auto object-contain object-right-bottom pointer-events-none z-10 transition-transform duration-500 group-hover:scale-105 origin-bottom"
            />

            <div className="relative z-20 max-w-[42%] md:max-w-[38%] text-left">
              <span className="text-slate-500 text-[11px] font-bold tracking-tight block uppercase">
                Satisfied Customers
              </span>
              <span className="text-4xl sm:text-[40px] font-black text-slate-900 tracking-tight font-sora mt-2 block leading-none whitespace-nowrap">
                {satisfiedCount}
              </span>
            </div>

            {/* Overlapping Avatars */}
            <div className="flex items-center gap-1.5 mt-2 relative z-20">
              <div className="flex -space-x-2">
                {avatars.map((src, i) => (
                  <div
                    key={i}
                    className="w-8.5 h-8.5 rounded-full border-2 border-white overflow-hidden bg-slate-100 shadow-sm"
                  >
                    <img src={src} alt="Client avatar" className="w-full h-full object-cover" />
                  </div>
                ))}
                <div className="w-8.5 h-8.5 rounded-full border-2 border-white bg-slate-950 flex items-center justify-center text-white text-[11px] font-bold shadow-sm">
                  +
                </div>
              </div>
            </div>
          </motion.div>

          {/* Card 3: Right Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="rounded-[20px] overflow-hidden border border-slate-200/50 shadow-sm bg-white h-[140px] md:h-full relative group"
          >
            <img
              src={imageRight}
              alt="Technical collaboration workspace"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
            />
          </motion.div>
        </div>

      </div>

      {/* Blink Cursor style */}
      <style>{`
        @keyframes hero-cursor-blink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }
      `}</style>
    </section>
  );
}
