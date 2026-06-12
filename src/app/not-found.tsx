"use client";

import { ArrowLeft, Home, HelpCircle } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="bg-slate-950 min-h-screen text-slate-300 flex flex-col justify-center items-center py-20 px-6">
      
      {/* Main Center Content Container */}
      <div className="text-center max-w-xl mx-auto flex flex-col items-center">
        
        {/* Badge */}
        <div className="flex justify-center mb-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-cyan-500/20 bg-cyan-950/10 text-cyan-400 text-[10px] font-bold uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5" />
            Page Not Found
          </span>
        </div>

        {/* Large 404 Heading */}
        <div className="relative mb-6">
          <h1 className="text-[100px] sm:text-[120px] font-extrabold tracking-tighter leading-none text-white select-none">
            404
          </h1>
          <div className="w-24 h-[2px] bg-cyan-500 mx-auto mt-2 opacity-50" />
        </div>

        <h2 className="text-white font-bold text-lg sm:text-xl mb-4 tracking-tight">
          Lost in Cloud Routing
        </h2>

        <p className="text-slate-400 text-xs leading-relaxed mb-10 max-w-sm">
          The resource endpoint you requested does not exist or has been dynamically migrated.
        </p>

        {/* CTA Back to Home */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center w-full">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 h-11 px-6 rounded-full text-xs font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-500 transition-all cursor-pointer"
          >
            <Home className="w-3.5 h-3.5" />
            Back to Homepage
          </Link>
          <Link
            href="/services"
            className="inline-flex items-center justify-center gap-2 h-11 px-6 rounded-full border border-slate-800 bg-slate-900 hover:bg-slate-800 hover:text-white transition-all text-xs font-semibold text-slate-400 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Explore Services
          </Link>
        </div>
      </div>

    </div>
  );
}
