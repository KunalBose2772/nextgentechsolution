"use client";

import { motion } from "framer-motion";
import { ArrowRight, Clock, Calendar, User, Cpu, BarChart3 } from "lucide-react";
import Link from "next/link";
import { posts } from "@/lib/blog-data";

export default function Blog() {
  // We use the first 3 posts for the homepage bento grid
  const featuredPost = posts[0]; // Next.js & Supabase
  const aiPost = posts[1];       // AI & ML
  const devopsPost = posts[2];   // DevOps

  return (
    <section 
      className="relative overflow-hidden py-20 md:py-28 z-30" 
      id="blog"
      style={{
        background: "linear-gradient(180deg, #0A0A0B 0%, #030303 100%)",
      }}
    >
      {/* Explicit style overrides to guarantee white backgrounds and dark text regardless of global styles */}
      <style>{`
        #blog-cards-container .bento-card {
          background-color: #ffffff !important;
          background: #ffffff !important;
          border: 1px solid #e2e8f0 !important;
        }
        #blog-cards-container .bento-card h3 {
          color: #0f172a !important;
        }
        #blog-cards-container .bento-card p {
          color: #475569 !important;
        }
        #blog-cards-container .bento-card .spec-label {
          color: #64748b !important;
        }
        #blog-cards-container .bento-card .spec-value {
          color: #1e293b !important;
        }
      `}</style>

      {/* Background Grid Accent */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02] z-0 ng-grid-bg" />

      {/* Background Radial Glows */}
      <div 
        className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] rounded-full pointer-events-none opacity-[0.05] blur-[110px] z-0" 
        style={{ background: "radial-gradient(circle, #3B82F6 0%, transparent 70%)" }} 
      />
      <div 
        className="absolute bottom-[20%] left-[-10%] w-[550px] h-[550px] rounded-full pointer-events-none opacity-[0.05] blur-[120px] z-0" 
        style={{ background: "radial-gradient(circle, #06B6D4 0%, transparent 70%)" }} 
      />

      <div className="ng-container relative z-10">
        
        {/* Bento Grid Container */}
        <div id="blog-cards-container" className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-7xl mx-auto items-stretch">
          
          {/* 1. Left Column of Top Row: Section Header & CTA (lg:col-span-4) */}
          <div className="lg:col-span-4 flex flex-col justify-between py-2">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-cyan-500/20 bg-cyan-950/10 text-cyan-400 text-[10px] font-bold uppercase tracking-wider mb-5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                Insights & Expertise
              </div>
              <h2 
                className="text-white font-extrabold text-3xl sm:text-4xl md:text-5xl leading-[1.15] mb-5 tracking-tight"
                style={{ fontFamily: "Sora, sans-serif" }}
              >
                Thoughts &<br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
                  Engineering
                </span>
              </h2>
              <p className="text-[13.5px] leading-[1.65] text-slate-400 max-w-sm">
                Behind every successful product is a solid engineering strategy. We share our technical learnings, architectural decisions, and design systems.
              </p>
            </div>

            <div className="mt-8 lg:mt-0">
              <Link 
                href="/blog" 
                className="inline-flex items-center gap-2 text-xs font-bold text-white bg-white/5 border border-white/5 hover:border-cyan-500/20 hover:bg-cyan-950/10 px-5 py-3.5 rounded-2xl shadow-lg transition-all group"
              >
                View All Articles
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 text-cyan-400" />
              </Link>
            </div>
          </div>

          {/* 2. Right Column of Top Row: Featured Post Card - White card with image on right (lg:col-span-8) */}
          <motion.div
            className="lg:col-span-8 bento-card group rounded-3xl transition-all duration-300 relative overflow-hidden flex flex-col justify-between shadow-xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5 }}
            whileHover={{
              y: -5,
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.4), 0 0 25px rgba(59, 130, 246, 0.15)"
            }}
          >
            <div className="grid md:grid-cols-12 items-stretch h-full">
              {/* Left Content Column */}
              <div className="p-6 sm:p-8 md:col-span-7 flex flex-col justify-between">
                <div>
                  <span 
                    className="inline-flex text-[9px] font-bold uppercase tracking-wider rounded-full px-2.5 py-0.5 mb-4"
                    style={{
                      color: "#2563eb",
                      backgroundColor: "#eff6ff",
                      border: "1px solid #dbeafe"
                    }}
                  >
                    Featured Story
                  </span>
                  <h3 
                    className="font-extrabold text-lg sm:text-xl md:text-2xl leading-snug mb-3 font-sora"
                  >
                    {featuredPost.title}
                  </h3>
                  <p 
                    className="text-[13px] leading-[1.6] line-clamp-3 mb-6"
                  >
                    {featuredPost.excerpt}
                  </p>
                </div>

                <div>
                  {/* Inline Specs */}
                  <div 
                    className="grid grid-cols-3 gap-2 py-4 border-t mb-5 text-[11.5px]"
                    style={{
                      borderColor: "#f1f5f9"
                    }}
                  >
                    <div className="flex flex-col">
                      <span className="spec-label text-[9px] mb-0.5 flex items-center gap-1">
                        <User className="w-3 h-3 text-slate-400" /> Author
                      </span>
                      <span className="spec-value font-semibold truncate">{featuredPost.author}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="spec-label text-[9px] mb-0.5 flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-slate-400" /> Published
                      </span>
                      <span className="spec-value font-semibold truncate">{featuredPost.date}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="spec-label text-[9px] mb-0.5 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-400" /> Read Time
                      </span>
                      <span className="spec-value font-semibold truncate">{featuredPost.readTime}</span>
                    </div>
                  </div>

                  <Link 
                    href={`/blog/${featuredPost.id}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold transition-colors group/link"
                    style={{ color: "#2563eb" }}
                  >
                    Read their journey
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-1" />
                  </Link>
                </div>
              </div>

              {/* Right Image Column (md:col-span-5) */}
              <div className="md:col-span-5 relative min-h-[220px] overflow-hidden md:border-l" style={{ borderColor: "#e2e8f0" }}>
                <img 
                  src="/images/saas_architecture.png" 
                  alt="SaaS Architecture" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Subtle dark gradient overlay on image */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
              </div>
            </div>
          </motion.div>

          {/* 3. Bottom Left Card: AI & ML Post - White card (lg:col-span-6) */}
          <motion.div
            className="lg:col-span-6 bento-card group rounded-3xl transition-all duration-300 relative overflow-hidden flex flex-col justify-between shadow-xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: 0.08 }}
            whileHover={{
              y: -5,
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.4), 0 0 25px rgba(124, 58, 237, 0.15)"
            }}
          >
            <div className="grid md:grid-cols-12 items-stretch h-full">
              {/* Left Content Column */}
              <div className="p-6 md:col-span-7 flex flex-col justify-between h-full">
                <div>
                  <span 
                    className="inline-flex text-[9px] font-bold uppercase tracking-wider rounded-full px-2.5 py-0.5 mb-3"
                    style={{
                      color: "#7c3aed",
                      backgroundColor: "#faf5ff",
                      border: "1px solid #f3e8ff"
                    }}
                  >
                    {aiPost.category}
                  </span>
                  <h3 
                    className="font-extrabold text-[16px] sm:text-[17px] leading-snug mb-2 font-sora line-clamp-2"
                  >
                    {aiPost.title}
                  </h3>
                  <p 
                    className="text-[12.5px] leading-[1.65] line-clamp-3 mb-5"
                  >
                    {aiPost.excerpt}
                  </p>
                </div>

                <div>
                  <Link 
                    href={`/blog/${aiPost.id}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold transition-colors group/link"
                    style={{ color: "#7c3aed" }}
                  >
                    Read their story
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-1" />
                  </Link>
                </div>
              </div>

              {/* Right Column: Image with Overlay Badge */}
              <div className="md:col-span-5 relative min-h-[160px] overflow-hidden md:border-l" style={{ borderColor: "#e2e8f0" }}>
                <img 
                  src="/images/ai_agent.png" 
                  alt="AI & ML Integration" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

                {/* Symmetrical Bottom Right Badge Overlay */}
                <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur border border-slate-100 rounded-xl px-3 py-1.5 shadow-lg flex items-center gap-1.5">
                  <div className="w-6 h-6 rounded-lg bg-purple-50 flex items-center justify-center">
                    <Cpu className="w-3.5 h-3.5" style={{ color: "#7c3aed" }} />
                  </div>
                  <div className="text-[10px] leading-tight">
                    <span className="font-bold text-slate-800 block">Smarter Tech</span>
                    <span className="spec-label text-[9px] block">AI Integration</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* 4. Bottom Right Card: DevOps Post - White card (lg:col-span-6) */}
          <motion.div
            className="lg:col-span-6 bento-card group rounded-3xl transition-all duration-300 relative overflow-hidden flex flex-col justify-between shadow-xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: 0.12 }}
            whileHover={{
              y: -5,
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.4), 0 0 25px rgba(34, 197, 94, 0.15)"
            }}
          >
            <div className="grid md:grid-cols-12 items-stretch h-full">
              {/* Left Content Column */}
              <div className="p-6 md:col-span-7 flex flex-col justify-between h-full">
                <div>
                  <span 
                    className="inline-flex text-[9px] font-bold uppercase tracking-wider rounded-full px-2.5 py-0.5 mb-3"
                    style={{
                      color: "#059669",
                      backgroundColor: "#ecfdf5",
                      border: "1px solid #d1fae5"
                    }}
                  >
                    {devopsPost.category}
                  </span>
                  <h3 
                    className="font-extrabold text-[16px] sm:text-[17px] leading-snug mb-2 font-sora line-clamp-2"
                  >
                    {devopsPost.title}
                  </h3>
                  <p 
                    className="text-[12.5px] leading-[1.65] line-clamp-3 mb-5"
                  >
                    {devopsPost.excerpt}
                  </p>
                </div>

                <div>
                  <Link 
                    href={`/blog/${devopsPost.id}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold transition-colors group/link"
                    style={{ color: "#059669" }}
                  >
                    Read their story
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-1" />
                  </Link>
                </div>
              </div>

              {/* Right Column: Image with Overlay Badge */}
              <div className="md:col-span-5 relative min-h-[160px] overflow-hidden md:border-l" style={{ borderColor: "#e2e8f0" }}>
                <img 
                  src="/images/cloud_devops.png" 
                  alt="DevOps & Cost Optimization" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

                {/* Symmetrical Bottom Right Badge Overlay */}
                <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur border border-slate-100 rounded-xl px-3 py-1.5 shadow-lg flex items-center gap-1.5">
                  <div className="w-6 h-6 rounded-lg bg-emerald-50 flex items-center justify-center">
                    <BarChart3 className="w-3.5 h-3.5" style={{ color: "#059669" }} />
                  </div>
                  <div className="text-[10px] leading-tight">
                    <span className="font-bold text-slate-800 block">Smarter Cloud</span>
                    <span className="spec-label text-[9px] block">Better Savings</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
