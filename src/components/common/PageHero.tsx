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
  theme?: "light" | "dark";
}

export default function PageHero({
  badge,
  title,
  titleHighlight,
  description,
  children,
  breadcrumbs,
  theme = "light",
}: PageHeroProps) {
  const isDark = theme === "dark";

  return (
    <section
      className={`relative overflow-hidden ${!isDark ? "border-b border-slate-200/50" : ""}`}
      style={{
        background: isDark
          ? "radial-gradient(circle at 80% 20%, #9333ea 0%, #7C3AED 55%, #5b21b6 100%)"
          : "radial-gradient(circle at 80% 20%, rgba(124, 58, 237, 0.05) 0%, rgba(124, 58, 237, 0.01) 50%, transparent 100%), #f8fafc",
        paddingTop: "clamp(96px, 10vw, 124px)",
        paddingBottom: "40px"
      }}
    >
      {/* Soft overlay gradient for depth */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: isDark 
            ? "linear-gradient(to right, rgba(0,0,0,0.1) 0%, transparent 100%)"
            : "linear-gradient(to right, rgba(0,0,0,0.01) 0%, transparent 100%)"
        }}
      />

      {/* Subtle dot grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.05]"
        style={{
          backgroundImage: isDark
            ? "radial-gradient(white 1px, transparent 1px)"
            : "radial-gradient(#7c3aed 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 relative z-10">

        {/* Breadcrumbs */}
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="flex items-center gap-1 mb-4 flex-wrap">
            <Link
              href="/"
              className={`flex items-center gap-1 text-[11px] font-semibold transition-colors duration-150 ${
                isDark 
                  ? "text-purple-200 hover:text-white" 
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              <Home className="w-3 h-3" />
              Home
            </Link>
            {breadcrumbs.map((crumb, idx) => (
              <span key={idx} className="flex items-center gap-1">
                <ChevronRight className={`w-3 h-3 shrink-0 ${isDark ? "text-purple-300" : "text-slate-300"}`} />
                {crumb.href && idx < breadcrumbs.length - 1 ? (
                  <Link
                    href={crumb.href}
                    className={`text-[11px] font-semibold transition-colors duration-150 ${
                      isDark 
                        ? "text-purple-200 hover:text-white" 
                        : "text-slate-500 hover:text-slate-900"
                    }`}
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span className={`text-[11px] font-bold ${isDark ? "text-white" : "text-slate-800"}`}>
                    {crumb.label}
                  </span>
                )}
              </span>
            ))}
          </nav>
        )}

        {/* Badge */}
        {badge && (
          <div className="mb-3">
            <span
              className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.14em] px-2.5 py-1 rounded-md"
              style={{
                color: isDark ? "#white" : "var(--accent-global)",
                background: isDark ? "rgba(255, 255, 255, 0.15)" : "var(--accent-global-dim)",
                border: isDark ? "1px solid rgba(255, 255, 255, 0.25)" : "1px solid rgba(var(--accent-global-rgb), 0.15)",
              }}
            >
              <span className={`w-1.5 h-1.5 rounded-full inline-block animate-pulse ${isDark ? "bg-white" : "bg-[var(--accent-global)]"}`} />
              <span>{badge}</span>
            </span>
          </div>
        )}

        {/* Title */}
        <h1
          className={`font-extrabold tracking-tight leading-tight mb-3 ${isDark ? "text-white" : "text-slate-900"}`}
          style={{ fontSize: "clamp(26px, 3.5vw, 42px)", fontFamily: "Sora, sans-serif" }}
        >
          {title}
          {titleHighlight && (
            <>
              {" "}
              <span className={isDark ? "text-purple-100" : "text-[var(--accent-global)]"}>{titleHighlight}</span>
            </>
          )}
        </h1>

        {/* Description */}
        {description && (
          <p
            className={`leading-relaxed max-w-2xl ${isDark ? "text-purple-100 text-opacity-90" : "text-slate-600"}`}
            style={{ fontSize: "clamp(13px, 1.3vw, 15px)" }}
          >
            {description}
          </p>
        )}

        {/* Optional slot */}
        {children && <div className="mt-5">{children}</div>}
      </div>
    </section>
  );
}
