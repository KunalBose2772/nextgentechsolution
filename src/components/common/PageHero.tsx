"use client";

import { ReactNode } from "react";
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
  breadcrumbs?: BreadcrumbItem[];
}

export default function PageHero({
  badge,
  title,
  titleHighlight,
  titleOutline,
  description,
  children,
  breadcrumbs,
}: PageHeroProps) {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #faf5ff 0%, #f3e8ff 30%, #ede9fe 60%, #f8fafc 100%)",
        paddingTop: "clamp(110px, 13vw, 152px)",
        paddingBottom: "clamp(52px, 7vw, 88px)",
      }}
    >
      {/* Purple radial glow — top centre */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 70% at 50% -10%, rgba(139,92,246,0.22) 0%, rgba(109,40,217,0.08) 45%, transparent 75%)",
        }}
      />

      {/* Subtle dot grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.18]"
        style={{
          backgroundImage: "radial-gradient(circle, #7c3aed 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Left side accent blob */}
      <div
        className="absolute -left-40 top-1/2 -translate-y-1/2 w-[420px] h-[420px] rounded-full pointer-events-none blur-[100px]"
        style={{ background: "radial-gradient(circle, rgba(139,92,246,0.18) 0%, transparent 70%)" }}
      />

      {/* Right side accent blob */}
      <div
        className="absolute -right-32 top-1/4 w-[320px] h-[320px] rounded-full pointer-events-none blur-[80px]"
        style={{ background: "radial-gradient(circle, rgba(167,139,250,0.15) 0%, transparent 70%)" }}
      />

      {/* Bottom fade into page bg */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-b from-transparent to-white/60 pointer-events-none" />

      {/* Bottom accent line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px pointer-events-none"
        style={{
          background: "linear-gradient(90deg, transparent 0%, rgba(139,92,246,0.35) 50%, transparent 100%)",
        }}
      />

      {/* Main content */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 relative z-10 flex flex-col items-center text-center">

        {/* Breadcrumbs */}
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-1.5 mb-7 flex-wrap justify-center"
          >
            <Link
              href="/"
              className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-slate-400 hover:text-[#7c3aed] transition-colors duration-200"
            >
              <Home className="w-3 h-3" />
              Home
            </Link>
            {breadcrumbs.map((crumb, idx) => (
              <span key={idx} className="flex items-center gap-1.5">
                <ChevronRight className="w-3.5 h-3.5 text-slate-300 shrink-0" />
                {crumb.href && idx < breadcrumbs.length - 1 ? (
                  <Link
                    href={crumb.href}
                    className="text-[11px] font-bold uppercase tracking-widest text-slate-400 hover:text-[#7c3aed] transition-colors duration-200"
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span
                    className="text-[11px] font-bold uppercase tracking-widest px-3 py-1 rounded-full"
                    style={{
                      color: "#7c3aed",
                      background: "rgba(124,58,237,0.10)",
                      border: "1px solid rgba(124,58,237,0.20)",
                    }}
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
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10.5px] font-bold uppercase tracking-widest"
              style={{
                color: "#7c3aed",
                border: "1.5px solid rgba(124,58,237,0.25)",
                background: "rgba(124,58,237,0.07)",
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full animate-pulse"
                style={{ backgroundColor: "#7c3aed" }}
              />
              {badge}
            </span>
          </div>
        )}

        {/* Headline */}
        <h1
          className="font-extrabold tracking-tight mb-5 max-w-4xl mx-auto leading-[1.1]"
          style={{
            fontSize: "clamp(34px, 5vw, 62px)",
            color: "#0f172a",
          }}
        >
          {title}
          {titleHighlight && (
            <>
              {" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {titleHighlight}
              </span>
            </>
          )}
          {titleOutline && (
            <>
              {" "}
              <span className="text-slate-300 font-light">{titleOutline}</span>
            </>
          )}
        </h1>

        {/* Description */}
        {description && (
          <p className="text-slate-500 text-sm sm:text-[15px] max-w-2xl mx-auto leading-relaxed mb-8 font-normal">
            {description}
          </p>
        )}

        {/* Slot */}
        {children && <div className="mt-2">{children}</div>}
      </div>

      <style>{`
        @keyframes ph-float {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-14px); }
        }
      `}</style>
    </section>
  );
}
