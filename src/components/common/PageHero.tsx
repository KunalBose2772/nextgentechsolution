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
  description,
  children,
  breadcrumbs,
}: PageHeroProps) {
  return (
    <section
      className="relative bg-white border-b border-slate-200 overflow-hidden"
      style={{ paddingTop: "clamp(96px, 10vw, 124px)", paddingBottom: "36px" }}
    >
      {/* Subtle right-side purple glow */}
      <div
        className="absolute top-0 right-0 w-[500px] h-full pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 100% at 100% 50%, rgba(139,92,246,0.07) 0%, transparent 70%)",
        }}
      />
      {/* Purple accent line at bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[3px] pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, #7c3aed 0%, #a855f7 40%, transparent 75%)",
        }}
      />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 relative z-10">

        {/* Breadcrumbs */}
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="flex items-center gap-1 mb-4 flex-wrap">
            <Link
              href="/"
              className="flex items-center gap-1 text-[11px] font-semibold text-slate-400 hover:text-[#7c3aed] transition-colors duration-150"
            >
              <Home className="w-3 h-3" />
              Home
            </Link>
            {breadcrumbs.map((crumb, idx) => (
              <span key={idx} className="flex items-center gap-1">
                <ChevronRight className="w-3 h-3 text-slate-300 shrink-0" />
                {crumb.href && idx < breadcrumbs.length - 1 ? (
                  <Link
                    href={crumb.href}
                    className="text-[11px] font-semibold text-slate-400 hover:text-[#7c3aed] transition-colors duration-150"
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-[11px] font-bold text-[#7c3aed]">
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
                color: "#7c3aed",
                background: "rgba(124,58,237,0.07)",
                border: "1px solid rgba(124,58,237,0.18)",
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#7c3aed] inline-block" />
              {badge}
            </span>
          </div>
        )}

        {/* Title */}
        <h1
          className="font-extrabold tracking-tight text-slate-900 leading-tight mb-3"
          style={{ fontSize: "clamp(26px, 3.5vw, 42px)" }}
        >
          {title}
          {titleHighlight && (
            <>
              {" "}
              <span className="text-[#7c3aed]">{titleHighlight}</span>
            </>
          )}
        </h1>

        {/* Description */}
        {description && (
          <p
            className="text-slate-500 leading-relaxed max-w-2xl"
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
