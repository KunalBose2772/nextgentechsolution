"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import { COMPANY } from "@/lib/utils";

export default function About() {
  const [activeTab, setActiveTab] = useState<"mission" | "vision">("mission");

  return (
    <section className="py-12 sm:py-24 bg-gradient-to-b from-[#020209] via-[#060612] to-[#020209] text-white relative overflow-hidden" id="about">
      {/* Decorative Grid Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.025)_1px,transparent_1px)] [background-size:20px_20px] opacity-80 pointer-events-none z-0" />
      
      {/* High-Energy Shiny Radial Orbs */}
      <div className="absolute top-[5%] left-[-10%] w-[45%] h-[45%] bg-[radial-gradient(circle,_rgba(59,130,246,0.06)_0%,_transparent_70%)] blur-[90px] pointer-events-none z-0" />
      <div className="absolute bottom-[5%] right-[-10%] w-[45%] h-[45%] bg-[radial-gradient(circle,_rgba(6,182,212,0.05)_0%,_transparent_70%)] blur-[90px] pointer-events-none z-0" />

      {/* Decorative Horizontal Dividers */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Column: Text Content */}
          <div className="lg:col-span-5 flex flex-col">
            <SectionHeader
              badge="ABOUT COMPANY"
              title="Innovating technology for your"
              titleHighlight="success"
              description={`${COMPANY.description} Founded in ${COMPANY.founded}, officially launched ${COMPANY.launchDate} — built from Day 1 to compete globally.`}
              align="left"
              theme="dark"
              className="mb-8"
            />

            {/* Premium Pill Tabs (Blue active state segment control) */}
            <div className="mb-6 flex">
              <div className="inline-flex p-1 bg-white/[0.03] rounded-full border border-white/[0.08] shadow-inner">
                <button
                  onClick={() => setActiveTab("mission")}
                  className={`px-5 py-2 text-xs font-bold rounded-full transition-all duration-200 cursor-pointer ${
                    activeTab === "mission" 
                      ? "bg-[var(--accent-blue)] text-white shadow-md" 
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  Our Mission
                </button>
                <button
                  onClick={() => setActiveTab("vision")}
                  className={`px-5 py-2 text-xs font-bold rounded-full transition-all duration-200 cursor-pointer ${
                    activeTab === "vision" 
                      ? "bg-[var(--accent-blue)] text-white shadow-md" 
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  Our Vision
                </button>
              </div>
            </div>

            {/* Tab Body */}
            <p className="text-slate-400 mb-8 leading-relaxed text-sm min-h-[56px] border-l-2 border-[var(--accent-blue)]/50 pl-4 italic">
              {activeTab === "mission"
                ? "Empowering growth with smart, reliable IT services that transform operations, boost scalability, and create a roadmap for long-term digital success — starting from Ranchi, reaching the world."
                : "To become the technology partner of choice for high-growth companies globally — delivering solutions that set new standards in performance, security, design, and long-term engineering excellence."}
            </p>

            {/* Stats & CTA Row (Perfect in-line integration) */}
            <div className="flex flex-wrap gap-6 items-center justify-between border-t border-white/[0.05] pt-8 mt-4">
              {/* Stats group */}
              <div className="flex gap-6 md:gap-10">
                {[
                  { value: COMPANY.stats.projectsDelivered, label: "Projects" },
                  { value: COMPANY.stats.globalClients, label: "Global Clients" },
                  { value: COMPANY.stats.countriesServed, label: "Countries" },
                ].map((stat, i) => (
                  <div key={i} className="text-left">
                    <div className="text-2xl md:text-3xl font-extrabold text-white tracking-tight leading-none mb-1.5" style={{ fontFamily: "Sora, sans-serif" }}>
                      {stat.value}
                    </div>
                    <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-normal">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Solid Blue Button with White Text */}
              <div className="shrink-0">
                <Link
                  href="/about"
                  className="hover:scale-102 active:scale-98 transition-all duration-200 shadow-lg shadow-blue-500/10 bg-[var(--accent-blue)] hover:opacity-90 text-white h-11 px-6 text-xs font-bold rounded-full inline-flex items-center gap-2 border border-blue-500/10"
                >
                  More About Us <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column: Premium Image Collage (Safari Mockup + Circular Overlapping Image) */}
          <div className="lg:col-span-7 relative pt-4 pb-8 lg:pb-0">
            {/* Background dynamic glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] bg-[radial-gradient(circle_at_center,_rgba(59,130,246,0.04)_0%,_transparent_75%)] pointer-events-none z-0" />
            
            {/* Safari Mockup Frame */}
            <div className="relative z-10 w-full rounded-2xl overflow-hidden border border-white/[0.08] shadow-2xl bg-[#0a0a14]">
              {/* Browser Header Top Bar */}
              <div className="flex items-center gap-1.5 px-4 py-3 bg-[#0d0d1a]/80 border-b border-white/[0.05]">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-400/80" />
                </div>
                <div className="mx-auto w-[55%] h-5 rounded bg-[#131326] border border-white/[0.05] text-[9px] text-slate-500 flex items-center justify-center font-mono select-none">
                  nextgentech.solutions/about
                </div>
              </div>
              
              {/* Main Image content */}
              <div className="relative aspect-[16/10] w-full bg-slate-50">
                <Image
                  src="/images/about_office1.png"
                  alt="NextGen Collaborative Teamwork"
                  fill
                  sizes="(max-width: 1024px) 100vw, 600px"
                  className="object-cover"
                  priority
                />
              </div>
            </div>
            
            {/* Circular Overlapping Secondary Image Card (Thin border & custom shadow) */}
            <div className="absolute bottom-[-32px] right-[-16px] w-[40%] aspect-square rounded-full overflow-hidden border border-white/[0.08] shadow-2xl bg-[#0a0a14] z-20 hidden sm:block animate-float-slow">
              <div className="relative w-full h-full bg-slate-50">
                <Image
                  src="/images/about_office2.png"
                  alt="NextGen Focused Software Engineering"
                  fill
                  sizes="240px"
                  className="object-cover"
                />
              </div>
            </div>

            {/* Premium Light-Blue Gradient Radial Experience Badge (Positioned to top-right to prevent window controls overlap) */}
            <div className="absolute top-[-20px] right-[32px] bg-gradient-to-br from-cyan-950/50 via-sky-950/40 to-blue-950/50 text-white rounded-2xl p-4 shadow-xl border border-cyan-500/20 backdrop-blur-md hidden sm:flex z-20">
              <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/20 text-[var(--accent-blue)] flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-4.5 h-4.5" />
              </div>
              <div>
                <p className="text-[9px] font-extrabold text-[var(--accent-blue)] uppercase tracking-widest leading-none mb-1">ESTABLISHED</p>
                <p className="text-xs font-bold text-white leading-none">Built for Global Scale</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
