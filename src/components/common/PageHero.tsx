"use client";

import { ReactNode, useEffect, useState } from "react";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageHeroProps {
  badge?: string;
  title: string;
  titleHighlight?: string;
  titleOutline?: string;
  description?: string;
  children?: ReactNode;
  gradient?: string;
  accentColor?: string;
  breadcrumbs?: BreadcrumbItem[];
}

/* ── Deterministic random particle positions (avoids SSR hydration mismatch) ── */
const PARTICLES = [
  { left: 12, top: 18, size: 2.4, dur: 14, delay: 0 },
  { left: 28, top: 72, size: 1.6, dur: 18, delay: 2 },
  { left: 45, top: 35, size: 3.0, dur: 12, delay: 1 },
  { left: 63, top: 55, size: 1.8, dur: 16, delay: 3 },
  { left: 78, top: 22, size: 2.2, dur: 20, delay: 0.5 },
  { left: 88, top: 68, size: 1.5, dur: 15, delay: 2.5 },
  { left: 34, top: 88, size: 2.8, dur: 11, delay: 1.5 },
  { left: 55, top: 12, size: 1.9, dur: 17, delay: 0.8 },
  { left: 92, top: 45, size: 2.1, dur: 13, delay: 4 },
  { left: 7,  top: 55, size: 1.7, dur: 19, delay: 1.2 },
];

export default function PageHero({
  badge,
  title,
  titleHighlight,
  titleOutline,
  description,
  children,
  breadcrumbs,
}: PageHeroProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const raf = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section
      className="relative overflow-hidden"
      style={{
        background: "linear-gradient(160deg, #050507 0%, #0A0A0F 40%, #070710 100%)",
        paddingTop: "clamp(120px, 14vw, 160px)",
        paddingBottom: "clamp(60px, 8vw, 100px)",
      }}
    >
      {/* ── Layered Mesh Gradient Background ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 80% 60% at 50% -20%, rgba(var(--accent-primary-rgb, 6,182,212), 0.12) 0%, transparent 65%),
            radial-gradient(ellipse 50% 40% at 15% 80%, rgba(var(--accent-primary-rgb, 6,182,212), 0.06) 0%, transparent 60%),
            radial-gradient(ellipse 40% 30% at 85% 60%, rgba(99, 102, 241, 0.05) 0%, transparent 60%)
          `,
        }}
      />

      {/* ── Fine Grid Pattern ── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* ── Floating Particles (client-only to avoid hydration mismatch) ── */}
      {mounted && (
        <div className="absolute inset-0 pointer-events-none">
          {PARTICLES.map((p, i) => (
            <span
              key={i}
              className="absolute rounded-full"
              style={{
                left: `${p.left}%`,
                top: `${p.top}%`,
                width: p.size,
                height: p.size,
                backgroundColor: "var(--accent-primary)",
                opacity: 0.25,
                animation: `ph-float ${p.dur}s ease-in-out infinite`,
                animationDelay: `${p.delay}s`,
              }}
            />
          ))}
        </div>
      )}

      {/* ── Bottom Edge Gradient Fade ── */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-b from-transparent to-white/[0.02] pointer-events-none" />

      {/* ── Bottom divider line ── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(var(--accent-primary-rgb, 6,182,212), 0.3) 50%, transparent 100%)",
        }}
      />

      {/* ── Main Content ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 flex flex-col items-center text-center">
        
        {/* Breadcrumbs */}
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-1.5 mb-8 flex-wrap justify-center"
          >
            <Link
              href="/"
              className="flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wider text-slate-500 hover:text-slate-300 transition-colors"
            >
              <Home className="w-3 h-3" />
              Home
            </Link>
            {breadcrumbs.map((crumb, idx) => (
              <span key={idx} className="flex items-center gap-1.5">
                <ChevronRight className="w-3 h-3 text-slate-700 shrink-0" />
                {crumb.href && idx < breadcrumbs.length - 1 ? (
                  <Link
                    href={crumb.href}
                    className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 hover:text-slate-300 transition-colors"
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span
                    className="text-[11px] font-semibold uppercase tracking-wider"
                    style={{ color: "var(--accent-primary)" }}
                  >
                    {crumb.label}
                  </span>
                )}
              </span>
            ))}
          </nav>
        )}

        {/* Badge */}
        {badge && (
          <div className="flex justify-center mb-5">
            <span
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-[10.5px] font-bold uppercase tracking-widest backdrop-blur-sm"
              style={{
                borderColor: "rgba(var(--accent-primary-rgb, 6,182,212), 0.25)",
                backgroundColor: "rgba(var(--accent-primary-rgb, 6,182,212), 0.06)",
                color: "var(--accent-primary)",
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full animate-pulse"
                style={{ backgroundColor: "var(--accent-primary)" }}
              />
              {badge}
            </span>
          </div>
        )}

        {/* Headline */}
        <h1
          className="font-extrabold tracking-tight text-white mb-6 max-w-4xl mx-auto leading-[1.1]"
          style={{ fontSize: "clamp(36px, 5.5vw, 64px)" }}
        >
          {title}
          {titleHighlight && (
            <>
              {" "}
              <span style={{ color: "var(--accent-primary)" }}>
                {titleHighlight}
              </span>
            </>
          )}
          {titleOutline && (
            <>
              {" "}
              <span className="text-white/25 font-light">{titleOutline}</span>
            </>
          )}
        </h1>

        {/* Description */}
        {description && (
          <p className="text-slate-400 text-sm sm:text-[15px] max-w-2xl mx-auto leading-relaxed mb-8 font-normal">
            {description}
          </p>
        )}

        {/* Slot for extra CTAs / stats */}
        {children && <div className="mt-2">{children}</div>}
      </div>

      {/* ── Keyframes injected inline ── */}
      <style>{`
        @keyframes ph-float {
          0%, 100% { transform: translateY(0px) scale(1); opacity: 0.22; }
          50% { transform: translateY(-18px) scale(1.15); opacity: 0.45; }
        }
      `}</style>
    </section>
  );
}
