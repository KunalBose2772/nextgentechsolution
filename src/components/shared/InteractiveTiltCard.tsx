"use client";

import React from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export default function InteractiveTiltCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = React.useRef<HTMLDivElement>(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const springCfg = { stiffness: 120, damping: 22, mass: 0.6 };
  const sx = useSpring(rawX, springCfg);
  const sy = useSpring(rawY, springCfg);
  const rotateY  = useTransform(sx, [-0.5, 0.5], [-12, 12]);
  const rotateX  = useTransform(sy, [-0.5, 0.5], [8, -8]);
  const translateX = useTransform(sx, [-0.5, 0.5], [-10, 10]);
  const translateY = useTransform(sy, [-0.5, 0.5], [-6, 6]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    rawX.set((e.clientX - r.left) / r.width - 0.5);
    rawY.set((e.clientY - r.top)  / r.height - 0.5);
  };

  const handleMouseLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative cursor-pointer group ${className}`}
      style={{ perspective: "1200px" }}
    >
      {/* 3D glow */}
      <div 
        className="absolute inset-0 rounded-[32px] bg-gradient-to-tr from-purple-500/10 via-transparent to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl pointer-events-none" 
      />
      <motion.div
        style={{
          rotateX,
          rotateY,
          translateX,
          translateY,
          transformStyle: "preserve-3d",
        }}
        className="w-full h-full flex flex-col justify-between"
      >
        {children}
      </motion.div>
    </div>
  );
}
