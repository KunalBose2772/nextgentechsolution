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
      className="relative overflow-hidden"
      style={{
        background: "radial-gradient(circle at 80% 20%, #9333ea 0%, #7C3AED 55%, #5b21b6 100%)",
        paddingTop: "clamp(96px, 10vw, 124px)",
        paddingBottom: "36px"
      }}
    >
      {/* Soft overlay gradient for depth */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(to right, rgba(0,0,0,0.1) 0%, transparent 100%)"
        }}
      />

      {/* Subtle dot grid in white overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.05]"
        style={{
          backgroundImage: "radial-gradient(white 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 relative z-10">

        {/* Breadcrumbs */}
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="flex items-center gap-1 mb-4 flex-wrap">
            <Link
              href="/"
              className="flex items-center gap-1 text-[11px] font-semibold text-purple-200 hover:text-white transition-colors duration-150"
            >
              <Home className="w-3 h-3" />
              Home
            </Link>
            {breadcrumbs.map((crumb, idx) => (
              <span key={idx} className="flex items-center gap-1">
                <ChevronRight className="w-3 h-3 text-purple-300 shrink-0" />
                {crumb.href && idx < breadcrumbs.length - 1 ? (
                  <Link
                    href={crumb.href}
                    className="text-[11px] font-semibold text-purple-200 hover:text-white transition-colors duration-150"
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-[11px] font-bold text-white">
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
                color: "#white",
                background: "rgba(255, 255, 255, 0.15)",
                border: "1px solid rgba(255, 255, 255, 0.25)",
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-white inline-block animate-pulse" />
              <span className="text-white">{badge}</span>
            </span>
          </div>
        )}

        {/* Title */}
        <h1
          className="font-extrabold tracking-tight text-white leading-tight mb-3"
          style={{ fontSize: "clamp(26px, 3.5vw, 42px)" }}
        >
          {title}
          {titleHighlight && (
            <>
              {" "}
              <span className="text-purple-100">{titleHighlight}</span>
            </>
          )}
        </h1>

        {/* Description */}
        {description && (
          <p
            className="text-purple-100 leading-relaxed max-w-2xl text-opacity-90"
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
