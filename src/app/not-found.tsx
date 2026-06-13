"use client";

import { ArrowLeft, Home } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="bg-slate-950 min-h-screen text-slate-300 flex flex-col justify-center items-center py-20 px-6">
      <div className="text-center max-w-xl mx-auto flex flex-col items-center">

        {/* Badge */}
        <div className="flex justify-center mb-6">
          <span className="ng-badge">
            404 — Page Not Found
          </span>
        </div>

        {/* Large 404 */}
        <div className="relative mb-6">
          <h1
            className="font-extrabold tracking-tighter leading-none text-white select-none ng-h1"
            style={{ fontSize: "clamp(80px, 15vw, 140px)" }}
          >
            404
          </h1>
          <div className="w-24 h-[2px] mx-auto mt-2 opacity-60" style={{ background: "var(--accent-primary)" }} />
        </div>

        <h2 className="text-white font-bold text-lg sm:text-xl mb-4 tracking-tight" style={{ fontFamily: "Sora, sans-serif" }}>
          Lost in Cloud Routing
        </h2>

        <p className="text-slate-400 text-sm leading-relaxed mb-10 max-w-sm">
          The page you&apos;re looking for doesn&apos;t exist or has been moved. Let&apos;s get you back on track.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center w-full">
          <Link
            href="/"
            className="ng-btn-primary"
          >
            <Home className="w-4 h-4" />
            Back to Homepage
          </Link>
          <Link
            href="/services"
            className="ng-btn-ghost"
          >
            <ArrowLeft className="w-4 h-4" />
            Explore Services
          </Link>
        </div>

      </div>
    </div>
  );
}
