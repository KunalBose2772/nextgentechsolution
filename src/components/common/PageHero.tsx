"use client";

import { ReactNode } from "react";

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
  accentColor = "#06B6D4",
}: PageHeroProps) {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden bg-slate-950 border-b border-slate-900">
      
      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-[0.02] bg-grid-white" />

      {/* Main content container */}
      <div className="max-w-7xl mx-auto px-4 text-center flex flex-col items-center relative z-10">
        {badge && (
          <div className="flex justify-center mb-6">
            <span 
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-[10.5px] font-bold uppercase tracking-widest"
              style={{
                borderColor: `${accentColor}30`,
                backgroundColor: `${accentColor}0a`,
                color: accentColor,
              }}
            >
              <span 
                className="w-1.5 h-1.5 rounded-full" 
                style={{ backgroundColor: accentColor }}
              />
              {badge}
            </span>
          </div>
        )}

        <h1
          className="text-white font-extrabold tracking-tight mb-6 max-w-4xl mx-auto leading-tight"
          style={{
            fontSize: "clamp(32px, 5vw, 56px)",
          }}
        >
          {title}
          {titleHighlight && (
            <>
              {" "}
              <span style={{ color: accentColor }}>
                {titleHighlight}
              </span>
            </>
          )}
          {titleOutline && (
            <>
              {" "}
              <span className="text-slate-500 font-light">
                {titleOutline}
              </span>
            </>
          )}
        </h1>

        {description && (
          <p className="text-slate-400 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed mb-8">
            {description}
          </p>
        )}

        {children && (
          <div>
            {children}
          </div>
        )}
      </div>

    </section>
  );
}
