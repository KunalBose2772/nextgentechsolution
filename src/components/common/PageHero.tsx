"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface PageHeroProps {
  badge?: string;
  title: string;
  titleHighlight?: string;
  description?: string;
  children?: ReactNode;
  gradient?: string;
}

export default function PageHero({
  badge,
  title,
  titleHighlight,
  description,
  children,
  gradient = "rgba(59,130,246,0.08)",
}: PageHeroProps) {
  return (
    <section className="relative pt-40 pb-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[#050505]" />
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div
        className="absolute inset-0"
        style={{ background: `radial-gradient(ellipse 70% 50% at 50% 0%, ${gradient}, transparent 70%)` }}
      />

      {/* Orbs */}
      <div
        className="absolute w-96 h-96 rounded-full blur-[100px] opacity-15"
        style={{ background: "radial-gradient(circle, #3b82f6, transparent)", top: "-50px", left: "10%" }}
      />
      <div
        className="absolute w-80 h-80 rounded-full blur-[100px] opacity-10"
        style={{ background: "radial-gradient(circle, #7c3aed, transparent)", top: "0px", right: "15%" }}
      />

      <div className="container-xl relative text-center">
        {badge && (
          <motion.div
            className="flex justify-center mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium uppercase tracking-wide">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
              {badge}
            </span>
          </motion.div>
        )}

        <motion.h1
          className="section-headline text-white mb-6 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          {title}
          {titleHighlight && (
            <>
              {" "}
              <span className="gradient-text">{titleHighlight}</span>
            </>
          )}
        </motion.h1>

        {description && (
          <motion.p
            className="text-white/50 text-xl max-w-2xl mx-auto leading-relaxed mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {description}
          </motion.p>
        )}

        {children && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {children}
          </motion.div>
        )}
      </div>
    </section>
  );
}
