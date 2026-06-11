"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Home, HelpCircle } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="bg-[#030303] min-h-screen text-slate-300 relative overflow-hidden flex flex-col justify-center items-center py-20 px-6">
      
      {/* 1. Backdrop Grid Layer */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
          maskImage: "radial-gradient(circle at center, black 40%, transparent 95%)",
          WebkitMaskImage: "radial-gradient(circle at center, black 40%, transparent 95%)",
        }}
      />

      {/* 2. Glow Orbs */}
      <motion.div
        className="absolute w-96 h-96 rounded-full blur-[120px] opacity-[0.10] pointer-events-none"
        style={{
          background: "radial-gradient(circle, #06B6D4, transparent)",
          top: "20%",
          left: "25%",
        }}
        animate={{
          scale: [1, 1.15, 0.9, 1],
          opacity: [0.10, 0.15, 0.08, 0.10],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <motion.div
        className="absolute w-96 h-96 rounded-full blur-[120px] opacity-[0.08] pointer-events-none"
        style={{
          background: "radial-gradient(circle, #7c3aed, transparent)",
          bottom: "15%",
          right: "20%",
        }}
        animate={{
          scale: [1, 0.85, 1.1, 1],
          opacity: [0.08, 0.12, 0.05, 0.08],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* 3. Main Center Content Container */}
      <div className="relative z-10 text-center max-w-xl mx-auto flex flex-col items-center">
        
        {/* Animated Badge */}
        <motion.div
          className="flex justify-center mb-6"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-cyan-500/20 bg-cyan-950/10 text-cyan-400 text-[10px] font-bold uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5" />
            Page Not Found
          </span>
        </motion.div>

        {/* Large Glowing 404 Heading */}
        <div className="relative mb-6">
          <motion.h1
            className="text-[120px] sm:text-[150px] font-extrabold tracking-tighter leading-none bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-slate-700 font-sora select-none"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
          >
            404
          </motion.h1>
          
          {/* Accent glow line under the number */}
          <div className="w-24 h-[2px] bg-gradient-to-r from-transparent via-[#06B6D4] to-transparent mx-auto mt-2 opacity-50" />
        </div>

        <motion.h2
          className="text-white font-bold text-lg sm:text-xl md:text-2xl mb-4 font-sora tracking-tight"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          Lost in Cloud Routing
        </motion.h2>

        <motion.p
          className="text-slate-450 text-[13.5px] leading-relaxed mb-10 max-w-sm"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
        >
          The resource endpoint you requested does not exist or has been dynamically migrated.
        </motion.p>

        {/* CTA Back to Home */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="flex flex-col sm:flex-row gap-4 justify-center w-full"
        >
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 h-11 px-6 rounded-full text-xs font-bold text-white transition-all shadow-lg shadow-cyan-950/20 hover:scale-[1.02] cursor-pointer"
            style={{
              background: "linear-gradient(135deg, #06b6d4, #3b82f6)",
            }}
          >
            <Home className="w-3.5 h-3.5" />
            Back to Homepage
          </Link>
          <Link
            href="/services"
            className="inline-flex items-center justify-center gap-2 h-11 px-6 rounded-full border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:text-white transition-all text-xs font-semibold text-slate-400 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Explore Services
          </Link>
        </motion.div>
      </div>

    </div>
  );
}
