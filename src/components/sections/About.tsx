"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Layers, Compass, Zap, Globe } from "lucide-react";
import { COMPANY } from "@/lib/utils";

export default function About() {
  const [activeTab, setActiveTab] = useState<"mission" | "vision">("mission");

  return (
    <section className="py-16 bg-white text-slate-800" id="about">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          
          {/* Left Column: Text Content */}
          <div className="flex flex-col">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-2">
              ABOUT COMPANY
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-slate-900 tracking-tight leading-tight">
              Innovating technology for your{" "}
              <span className="text-blue-600">success</span>
            </h2>
            <p className="text-slate-550 mb-6 leading-relaxed text-sm">
              {COMPANY.description} Founded in {COMPANY.founded}, we launched June 2026 — built from Day 1 to compete globally.
            </p>

            {/* Simple Tabs */}
            <div className="mb-6 flex gap-4 border-b border-slate-200 pb-2">
              <button
                onClick={() => setActiveTab("mission")}
                className={`pb-2 text-sm font-bold border-b-2 transition-all ${
                  activeTab === "mission" ? "border-blue-600 text-slate-900" : "border-transparent text-slate-400"
                }`}
              >
                Our Mission
              </button>
              <button
                onClick={() => setActiveTab("vision")}
                className={`pb-2 text-sm font-bold border-b-2 transition-all ${
                  activeTab === "vision" ? "border-blue-600 text-slate-900" : "border-transparent text-slate-400"
                }`}
              >
                Our Vision
              </button>
            </div>

            <p className="text-slate-550 mb-8 leading-relaxed text-sm min-h-[48px]">
              {activeTab === "mission"
                ? "Empowering growth with smart, reliable IT services that transform operations, boost scalability, and create a roadmap for long-term digital success — starting from Ranchi, reaching the world."
                : "To become the technology partner of choice for high-growth companies globally — delivering solutions that set new standards in performance, security, design, and long-term engineering excellence."}
            </p>

            {/* Stats row */}
            <div className="flex flex-wrap gap-8 items-center border-t border-slate-200 pt-6">
              {[
                { value: COMPANY.stats.projectsDelivered, label: "Projects Delivered" },
                { value: COMPANY.stats.globalClients, label: "Global Clients" },
                { value: COMPANY.stats.countriesServed, label: "Countries Served" },
              ].map((stat, i) => (
                <div key={i} className="flex items-center gap-4">
                  {i > 0 && <div className="w-px h-8 bg-slate-200" />}
                  <div>
                    <div className="text-2xl font-extrabold text-blue-600">{stat.value}</div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{stat.label}</div>
                  </div>
                </div>
              ))}
              <div className="ml-auto">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 text-xs font-bold text-blue-600 hover:text-slate-900 transition-colors"
                >
                  More About Us <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column: Info Cards */}
          <div className="grid sm:grid-cols-2 gap-6">
            {[
              {
                icon: Layers,
                title: "Smart IT Solutions",
                desc: "Tailored architectures designed to scale as your enterprise grows and needs evolve.",
              },
              {
                icon: Compass,
                title: "Real-World Results",
                desc: "Focus on delivery, performance optimization, and tangible business value metrics.",
              },
              {
                icon: Zap,
                title: "Rapid Engineering",
                desc: "Agile sprints, fast turnarounds, and dedicated engineers from Day 1 of your project.",
              },
              {
                icon: Globe,
                title: "Global Standards",
                desc: `Based in ${COMPANY.city}, ${COMPANY.country} — engineered to meet international quality benchmarks.`,
              },
            ].map((card) => (
              <div
                key={card.title}
                className="p-6 bg-slate-50 border border-slate-200/60 rounded-2xl transition-all duration-200 hover:-translate-y-1 hover:shadow-sm"
              >
                <card.icon className="w-8 h-8 text-blue-600 mb-4" />
                <h3 className="text-base font-bold text-slate-900 mb-2">{card.title}</h3>
                <p className="text-xs text-slate-550 leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
