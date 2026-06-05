"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Award, Target, ArrowRight, Layers, Compass } from "lucide-react";
import Link from "next/link";
import SectionGlow from "@/components/ui/SectionGlow";

export default function About() {
  const [activeTab, setActiveTab] = useState<"mission" | "vision">("mission");

  return (
    <section className="ng-section relative" id="about">
      <SectionGlow />
      <div className="ng-container relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Left Column: Overlapping Collage layout of Nionx */}
          <div className="relative w-full max-w-[540px] mx-auto h-[490px] lg:h-[510px] select-none">
            
            {/* Background Decorative Element (about-element.png) */}
            <motion.div
              className="absolute -left-[50px] bottom-[-40px] w-[160px] h-[160px] z-10 pointer-events-none"
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
            >
              <img 
                src="/images/about-element.png" 
                alt="Decorative background line pattern" 
                className="w-full h-full object-contain opacity-45"
              />
            </motion.div>

            {/* Main Image (about_office1.png) */}
            <motion.div 
              className="absolute top-0 left-0 w-[65%] h-[460px] z-20"
              initial={{ opacity: 0, y: -25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="w-full h-full overflow-hidden rounded-[40px] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                <img
                  src="/images/about_office1.png"
                  alt="Software engineers writing code"
                  className="w-full h-full object-cover grayscale-[15%] contrast-[105%]"
                />
              </div>
            </motion.div>

            {/* Sub Image (about_office2.png) - Overlapping cutout */}
            <motion.div 
              className="absolute bottom-[-20px] right-[40px] w-[45%] h-[350px] z-30"
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            >
              <div className="w-full h-full overflow-hidden rounded-[180px] border-[5px] border-black shadow-[0_20px_40px_rgba(0,0,0,0.6)]">
                <img
                  src="/images/about_office2.png"
                  alt="Product managers meeting"
                  className="w-full h-full object-cover grayscale-[15%] contrast-[105%]"
                />
              </div>
            </motion.div>

            {/* Award Badge (about-aword.png with dashed border) */}
            <motion.div 
              className="absolute top-0 right-0 w-[170px] h-[212px] z-40"
              initial={{ scale: 0.85, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 180, damping: 18, delay: 0.4 }}
            >
              <motion.div 
                className="w-full h-full rounded-[85px] p-[5px]"
                style={{
                  border: "1px dashed var(--accent-primary)"
                }}
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              >
                <div 
                  className="w-full h-full rounded-[80px] flex flex-col items-center justify-center text-center px-4"
                  style={{
                    background: "var(--accent-primary)",
                    boxShadow: "0 12px 30px rgba(var(--accent-primary-rgb), 0.35)"
                  }}
                >
                  <img 
                    src="/images/about-aword.png" 
                    alt="Trophy cup icon badge" 
                    className="w-[95px] h-[82px] object-contain mb-1.5"
                  />
                  <p 
                    className="text-[13px] font-bold text-white leading-tight"
                    style={{ fontFamily: "Sora, sans-serif" }}
                  >
                    Award Winning<br/>Agency
                  </p>
                </div>
              </motion.div>
            </motion.div>

          </div>

          {/* Right Column: Nionx content design with earlier content */}
          <div className="flex flex-col">
            
            {/* Tagline */}
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent-primary)] animate-pulse" />
              <span className="text-[11px] font-bold tracking-[0.22em] uppercase text-white/50">
                ABOUT COMPANY
              </span>
            </div>

            {/* Title */}
            <h2 
              className="text-[32px] md:text-[44px] font-bold leading-[1.15] mb-5 text-white tracking-tight"
              style={{ fontFamily: "Sora, sans-serif" }}
            >
              Innovating technology for your <span style={{ color: "var(--accent-primary)" }}>success</span>
            </h2>

            {/* Description paragraph */}
            <p className="text-[15px] md:text-[16px] leading-[1.75] text-[#94A3B8] mb-8">
              We specialize in delivering cutting-edge IT solutions that drive innovation, streamline operations, and empower businesses to achieve their goals.
            </p>

            {/* Tabs box */}
            <div className="mb-8">
              
              {/* Nionx Overlapping Pill Tabs Link buttons */}
              <div className="flex items-center relative h-[56px] mb-6 w-max select-none">
                
                {/* Mission button (Sits on top, z-index 3) */}
                <button
                  onClick={() => setActiveTab("mission")}
                  className={`px-8 py-3.5 rounded-[20px] text-[13px] font-bold tracking-wide transition-all duration-300 relative z-[3] cursor-pointer focus:outline-none ${
                    activeTab === "mission"
                      ? "bg-[var(--accent-primary)] text-white shadow-lg shadow-[rgba(var(--accent-primary-rgb),0.25)]"
                      : "bg-[var(--bg-surface)] border border-white/5 text-slate-300 hover:text-white"
                  }`}
                  style={{ height: "100%" }}
                >
                  Our Mission
                </button>

                {/* Vision button (Tucked below, z-index 2, offset on left) */}
                <button
                  onClick={() => setActiveTab("vision")}
                  className={`py-3.5 pr-8 pl-[68px] rounded-[0_20px_20px_0] text-[13px] font-bold tracking-wide transition-all duration-300 relative z-[2] -ml-[40px] cursor-pointer focus:outline-none ${
                    activeTab === "vision"
                      ? "bg-[var(--accent-primary)] text-white shadow-lg shadow-[rgba(var(--accent-primary-rgb),0.25)]"
                      : "bg-[var(--bg-surface)] border border-white/5 text-slate-300 hover:text-white"
                  }`}
                  style={{ height: "100%" }}
                >
                  Our Vision
                </button>
              </div>

              {/* Tab active content Panel */}
              <div className="min-h-[200px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                  >
                    <p className="text-[14px] md:text-[15px] leading-[1.75] text-[#94A3B8] mb-6">
                      {activeTab === "mission"
                        ? "Empowering growth with smart, reliable IT services that transform operations, boost scalability, and create a roadmap for long-term digital success."
                        : "Our vision is to lead the technological landscape with smart, scalable products that transform industry operations and set new standards in security, design, and usability."}
                    </p>

                    {/* Features row */}
                    <div className="grid sm:grid-cols-2 gap-5 mt-6">
                      
                      {/* Feature 1 */}
                      <div className="group flex items-center gap-4">
                        {/* Icon Container with expand on hover */}
                        <div 
                          className="w-[60px] h-[60px] rounded-full flex items-center justify-center shrink-0 transition-all duration-500 relative overflow-hidden z-[1]"
                          style={{
                            background: "rgba(var(--accent-primary-rgb), 0.12)",
                            border: "1px solid rgba(var(--accent-primary-rgb), 0.25)"
                          }}
                        >
                          <Layers className="w-6 h-6 text-[var(--accent-primary)] group-hover:text-white transition-colors duration-500 relative z-[2]" />
                          {/* Hover expand background shape */}
                          <div className="absolute inset-0 scale-0 group-hover:scale-100 rounded-full bg-[var(--accent-primary)] transition-transform duration-500 origin-center z-[1]" />
                        </div>
                        <div>
                          <h3 
                            className="text-[15px] font-bold text-white transition-colors duration-300 group-hover:text-[var(--accent-primary)]"
                            style={{ fontFamily: "Sora, sans-serif" }}
                          >
                            Smart IT Solutions
                          </h3>
                        </div>
                      </div>

                      {/* Feature 2 */}
                      <div className="group flex items-center gap-4">
                        {/* Icon Container with expand on hover */}
                        <div 
                          className="w-[60px] h-[60px] rounded-full flex items-center justify-center shrink-0 transition-all duration-500 relative overflow-hidden z-[1]"
                          style={{
                            background: "rgba(var(--accent-primary-rgb), 0.12)",
                            border: "1px solid rgba(var(--accent-primary-rgb), 0.25)"
                          }}
                        >
                          <Compass className="w-6 h-6 text-[var(--accent-primary)] group-hover:text-white transition-colors duration-500 relative z-[2]" />
                          {/* Hover expand background shape */}
                          <div className="absolute inset-0 scale-0 group-hover:scale-100 rounded-full bg-[var(--accent-primary)] transition-transform duration-500 origin-center z-[1]" />
                        </div>
                        <div>
                          <h3 
                            className="text-[15px] font-bold text-white transition-colors duration-300 group-hover:text-[var(--accent-primary)]"
                            style={{ fontFamily: "Sora, sans-serif" }}
                          >
                            Real-World Results
                          </h3>
                        </div>
                      </div>

                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

            </div>

            {/* Actions Row (More About Button + Stats Box) */}
            <div className="flex flex-wrap items-center gap-6 md:gap-8 pt-4 border-t border-white/5">
              {/* More About Button */}
              <Link
                href="/about"
                className="group inline-flex items-center gap-3 bg-[#111113] border border-white/10 hover:border-white/20 text-white font-semibold rounded-full pl-6 pr-2.5 py-2.5 transition-all duration-300 hover:bg-[#18181B] select-none"
              >
                <span className="text-[13px]">More About</span>
                <div className="w-8 h-8 rounded-full bg-[var(--accent-primary)] flex items-center justify-center text-black transition-transform duration-300 group-hover:translate-x-0.5">
                  <ArrowRight className="w-4 h-4 stroke-[2.5px]" />
                </div>
              </Link>

              {/* Stats Box */}
              <div className="flex items-center gap-6 px-6 py-4 bg-[#0A0A0B] border border-white/5 rounded-2xl">
                <div>
                  <div className="text-[20px] font-extrabold text-[var(--accent-primary)] leading-none mb-1">100%</div>
                  <div className="text-[10px] text-white/40 font-bold uppercase tracking-wider">Success Rate</div>
                </div>
                <div className="h-8 w-px bg-white/10" />
                <div>
                  <div className="text-[20px] font-extrabold text-[var(--accent-primary)] leading-none mb-1">536</div>
                  <div className="text-[10px] text-white/40 font-bold uppercase tracking-wider">Satisfied Clients</div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
