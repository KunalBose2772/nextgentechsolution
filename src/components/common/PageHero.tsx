"use client";

import { motion } from "framer-motion";
import { ReactNode, useState } from "react";

interface PageHeroProps {
  badge?: string;
  title: string;
  titleHighlight?: string;
  titleOutline?: string;
  description?: string;
  children?: ReactNode;
  gradient?: string;
  accentColor?: string;
}

export default function PageHero({
  badge,
  title,
  titleHighlight,
  titleOutline,
  description,
  children,
  gradient = "rgba(6,182,212,0.08)",
  accentColor = "#06B6D4",
}: PageHeroProps) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <section 
      className="relative pt-48 pb-32 overflow-hidden bg-[#020203] border-b border-white/[0.02] cursor-default"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 1. Base ambient backdrop radial glow */}
      <div
        className="absolute inset-0 pointer-events-none transition-all duration-1000"
        style={{
          background: `radial-gradient(ellipse 70% 60% at 50% -10%, ${gradient}, transparent 80%)`
        }}
      />

      {/* 2. Dynamic Cursor-Tracking Spotlight */}
      {isHovered && (
        <div
          className="absolute w-[500px] h-[500px] rounded-full blur-[130px] pointer-events-none opacity-20 transition-all duration-300 ease-out"
          style={{
            background: `radial-gradient(circle, ${accentColor} 0%, transparent 70%)`,
            left: `${mousePos.x - 250}px`,
            top: `${mousePos.y - 250}px`,
            mixBlendMode: "screen",
          }}
        />
      )}

      {/* 3. High-fidelity SVG Grid with fading mask */}
      <div 
        className="absolute inset-0 opacity-40 pointer-events-none"
        style={{
          maskImage: "radial-gradient(ellipse 60% 50% at 50% 10%, black 50%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 60% 50% at 50% 10%, black 50%, transparent 100%)",
        }}
      >
        <svg className="w-full h-full stroke-white/[0.025]" fill="none">
          <defs>
            <pattern id="hero-grid-pattern" width="56" height="56" patternUnits="userSpaceOnUse" x="50%">
              <path d="M.5 56V.5H56" />
              {/* Dot intersection markers */}
              <circle cx="0.5" cy="0.5" r="1" className="fill-white/10" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-grid-pattern)" />
        </svg>
      </div>

      {/* 4. Animated Laser Beams gliding across lines */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.15]">
        {/* Horizontal Laser 1 */}
        <motion.div
          className="absolute h-[1px] left-0 right-0 bg-gradient-to-r from-transparent via-[#06B6D4] to-transparent"
          style={{ top: "30%" }}
          animate={{
            y: [-40, 160, -40],
            opacity: [0.3, 0.9, 0.3]
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        {/* Horizontal Laser 2 */}
        <motion.div
          className="absolute h-[1px] left-0 right-0 bg-gradient-to-r from-transparent via-[#7c3aed] to-transparent"
          style={{ top: "70%" }}
          animate={{
            y: [80, -120, 80],
            opacity: [0.2, 0.7, 0.2]
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        {/* Vertical laser beam sweep */}
        <motion.div
          className="absolute w-[1px] top-0 bottom-0 bg-gradient-to-b from-transparent via-[#00ffcc] to-transparent"
          style={{ left: "45%" }}
          animate={{
            x: [-200, 200, -200],
            opacity: [0.1, 0.5, 0.1]
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* 5. Main content container */}
      <div className="ng-container relative z-10 text-center flex flex-col items-center">
        {badge && (
          <motion.div
            className="flex justify-center mb-8"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <span 
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-[10.5px] font-bold uppercase tracking-widest transition-all"
              style={{
                borderColor: `${accentColor}30`,
                backgroundColor: `${accentColor}0a`,
                color: accentColor,
                boxShadow: `0 0 25px ${accentColor}10, inset 0 1px 0 rgba(255,255,255,0.05)`
              }}
            >
              <span 
                className="w-1.5 h-1.5 rounded-full animate-ping" 
                style={{ backgroundColor: accentColor }}
              />
              {badge}
            </span>
          </motion.div>
        )}

        <motion.h1
          className="text-white font-extrabold tracking-tight mb-8 max-w-5xl mx-auto font-sora"
          style={{
            fontSize: "clamp(36px, 6vw, 68px)",
            lineHeight: 1.12,
            letterSpacing: "-0.04em"
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {title}
          {titleHighlight && (
            <>
              {" "}
              <span 
                className="bg-clip-text text-transparent bg-gradient-to-r filter drop-shadow-[0_0_30px_rgba(6,182,212,0.15)]"
                style={{
                  backgroundImage: `linear-gradient(135deg, ${accentColor}, ${accentColor}cc, #c084fc)`
                }}
              >
                {titleHighlight}
              </span>
            </>
          )}
          {titleOutline && (
            <>
              {" "}
              <span 
                className="text-transparent block sm:inline font-light"
                style={{
                  WebkitTextStroke: "1px rgba(255, 255, 255, 0.12)",
                }}
              >
                {titleOutline}
              </span>
            </>
          )}
        </motion.h1>

        {description && (
          <motion.p
            className="text-slate-400 text-sm sm:text-base md:text-[17px] max-w-2xl mx-auto leading-relaxed mb-12"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
          >
            {description}
          </motion.p>
        )}

        {children && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25, ease: "easeOut" }}
          >
            {children}
          </motion.div>
        )}
      </div>

      {/* 6. Base border gradient accent line */}
      <div 
        className="absolute bottom-0 left-0 w-full h-[1px]" 
        style={{
          background: `linear-gradient(90deg, transparent, ${accentColor}1a, transparent)`
        }}
      />
    </section>
  );
}
