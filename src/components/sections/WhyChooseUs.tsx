"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import SectionGlow from "@/components/ui/SectionGlow";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Zap, Shield, Target, ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    title: "Lightning Fast Delivery",
    image: "/images/portfolio/1.jpg"
  },
  {
    title: "Enterprise Security",
    image: "/images/portfolio/2.jpg"
  },
  {
    title: "Proven ROI",
    image: "/images/portfolio/3.jpg"
  },
  {
    title: "Dedicated Teams",
    image: "/images/portfolio/4.jpg"
  }
];

export default function WhyChooseUs() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const innerContainerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current || !innerContainerRef.current) return;
    
    const cards = cardsRef.current.filter(Boolean);
    if (cards.length === 0) return;

    // Set initial position for the incoming cards (except the first one)
    gsap.set(cards.slice(1), { yPercent: 100 });

    // Build timeline linked to the scroll pinning
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top", // Pin when the section reaches the top of viewport
        end: () => `+=${window.innerHeight * 2}`, // Lock for 2 viewports worth of scrolling
        pin: true,
        scrub: 1, // Smooth scrub matching scroll speed
        anticipatePin: 1
      }
    });

    // Morph the card to full-screen height (no corner radius) when locked, but keep side margins intact
    tl.to(innerContainerRef.current, {
      borderRadius: 0,
      minHeight: "100vh",
      duration: 0.3,
      ease: "power2.out"
    }, 0);

    // Create stacking animation for each card
    cards.forEach((card, i) => {
      if (i === 0) return;

      const label = `card-${i}`;

      // Animate current card sliding up (no scale changes to maintain perfect alignment)
      tl.to(card, {
        yPercent: 0,
        ease: "power2.out",
        duration: 1
      }, label);

      // Dim the previous card slightly without any scale or position offset
      const prevCard = cards[i - 1];
      if (prevCard) {
        tl.to(prevCard, {
          opacity: 0.85,
          filter: "brightness(0.65)",
          ease: "power2.out",
          duration: 1
        }, label);
      }

      // Dim older cards even further, keeping their scale and position identical
      const olderCard = cards[i - 2];
      if (olderCard) {
        tl.to(olderCard, {
          opacity: 0.6,
          filter: "brightness(0.45)",
          ease: "power2.out",
          duration: 1
        }, label);
      }
    });

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center py-0 overflow-hidden" id="why-choose-us">
      <SectionGlow />

      {/* Large Scroll Background Text */}
      <div className="absolute top-10 left-0 w-full overflow-hidden whitespace-nowrap opacity-5 pointer-events-none z-10 flex justify-center">
        <h3 className="text-[120px] sm:text-[180px] lg:text-[250px] font-black leading-none tracking-widest text-slate-900 uppercase">
          {"ADVANTAGES".split('').map((char, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.8 }}
              style={{ position: "relative", display: "inline-block" }}
            >
              {char}
            </motion.div>
          ))}
        </h3>
      </div>

      {/* Light Container */}
      <div 
        ref={innerContainerRef}
        className="relative w-[calc(100%-40px)] md:w-[calc(100%-60px)] mx-auto rounded-[32px] sm:rounded-[40px] lg:rounded-[48px] border border-slate-200/50 shadow-2xl py-[60px] md:py-[80px] lg:py-[100px] z-30 overflow-hidden flex items-center min-h-[85vh] transition-[padding]"
      >
        
        {/* Background Elements Wrapper (Isolated overflow-hidden so sticky/pin works!) */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0" style={{ background: "linear-gradient(180deg, #F8FAFC 0%, #EFF6FF 100%)" }}>
          {/* Technical Dotted Grid Background */}
          <div 
            className="absolute inset-0 opacity-[0.25]" 
            style={{
              backgroundImage: "radial-gradient(circle at 1px 1px, rgba(6, 182, 212, 0.15) 1.5px, transparent 0)",
              backgroundSize: "24px 24px"
            }}
          />
          {/* Ambient Glows */}
          <div className="absolute top-[10%] left-[10%] w-[450px] h-[450px] rounded-full opacity-[0.14] blur-[90px]" style={{ background: "radial-gradient(circle, #06B6D4 0%, transparent 70%)" }} />
          <div className="absolute bottom-[10%] right-[10%] w-[500px] h-[500px] rounded-full opacity-[0.10] blur-[100px]" style={{ background: "radial-gradient(circle, #3B82F6 0%, transparent 70%)" }} />
        </div>

        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-20 flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-14 w-full">
          
          {/* Left Text Block */}
          <div className="w-full lg:w-5/12 flex flex-col items-start text-left pt-2">
            {/* Tagline */}
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent-primary)] animate-pulse" />
              <span className="text-[11px] font-bold tracking-[0.22em] uppercase" style={{ color: "#64748b" }}>
                WHY CHOOSE US
              </span>
            </div>
            
            <h2 className="text-[32px] sm:text-[40px] lg:text-[44px] font-bold leading-[1.15] mb-5" style={{ color: "#0f172a", fontFamily: "Sora, sans-serif" }}>
              Explore NextGen <span className="text-[var(--accent-primary)] font-black">advantages</span>
            </h2>
            
            <p className="text-[14px] sm:text-[15px] leading-relaxed mb-6" style={{ color: "#475569" }}>
              We engineer custom, scalable technology platforms designed to secure your operations, accelerate deployment timelines, and drive clear returns on investment.
            </p>

            {/* Micro-features list */}
            <div className="flex flex-col gap-4 mb-7 w-full">
              {[
                {
                  icon: Zap,
                  title: "Lightning Fast Delivery",
                  desc: "Rapid agile development cycles designed to launch MVPs and key platform features quickly."
                },
                {
                  icon: Shield,
                  title: "Enterprise Grade Security",
                  desc: "Robust encryption standards, secure access control systems, and protected database schemas."
                },
                {
                  icon: Target,
                  title: "Proven ROI-Driven Strategy",
                  desc: "Custom feature engineering mapped to user needs to maximize conversions and platform adoption."
                }
              ].map((item, idx) => (
                <div key={idx} className="group flex items-start gap-4 p-3 rounded-2xl transition-all duration-300 hover:bg-white/60 hover:shadow-sm border border-transparent hover:border-slate-100">
                  <div 
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 bg-cyan-50 border border-cyan-100/50 group-hover:bg-[var(--accent-primary)] group-hover:border-[var(--accent-primary)]"
                  >
                    <item.icon className="w-5 h-5 text-[var(--accent-primary)] group-hover:text-white transition-colors duration-300" />
                  </div>
                  <div>
                    <h4 className="text-[14px] sm:text-[15px] font-bold leading-tight mb-1" style={{ color: "#0f172a", fontFamily: "Sora, sans-serif" }}>
                      {item.title}
                    </h4>
                    <p className="text-[12px] sm:text-[13px] leading-relaxed" style={{ color: "#475569" }}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-1">
              <Link href="#contact" className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-slate-900 hover:bg-[var(--accent-primary)] text-white rounded-full font-bold text-[13px] tracking-wide transition-all duration-300 hover:-translate-y-1 shadow-lg hover:shadow-cyan-900/10 hover:shadow-2xl">
                <span>Start a Project</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* Right Cards Stack (Stacked absolutely, animated via GSAP) */}
          <div className="w-full lg:w-[500px] xl:w-[540px] relative h-[260px] sm:h-[340px] lg:h-[400px] overflow-hidden rounded-[20px] sm:rounded-[28px]">
            {features.map((feature, i) => (
              <div
                key={feature.title}
                ref={(el) => { if (el) cardsRef.current[i] = el; }}
                className="absolute inset-0 rounded-[20px] sm:rounded-[28px] overflow-hidden shadow-2xl border border-white/20 group"
                style={{ zIndex: i + 1 }}
              >
                {/* Background Image */}
                <img 
                  src={feature.image} 
                  alt={feature.title} 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2s] ease-out group-hover:scale-105"
                  loading="lazy"
                />
                
                {/* Subtle Gradient Overlay for contrast */}
                <div className="absolute inset-0 bg-black/15 transition-opacity duration-700 group-hover:bg-black/0" />
                
                {/* Floating White Box */}
                <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 max-w-[90%] sm:max-w-[85%] bg-white rounded-xl p-4 sm:p-5 shadow-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 transition-transform duration-300 group-hover:-translate-y-1">
                  
                  <h3 className="text-lg sm:text-[20px] font-bold text-slate-900 leading-tight" style={{ fontFamily: "Sora, sans-serif" }}>
                    <span className="hover:text-[var(--accent-primary)] transition-colors duration-300 cursor-pointer">
                      {feature.title}
                    </span>
                  </h3>
                  
                  {/* Arrow Icon Button */}
                  <a href="#contact" className="shrink-0 transition-transform duration-300 hover:translate-x-1 cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="29" viewBox="0 0 38 37" fill="none">
                      <path d="M37.6549 0H0V7.47475H24.8522L0.376549 31.3939L6.02478 37L30.1239 13.0808V37H37.6549V0Z" fill="#141515"></path>
                    </svg>
                  </a>

                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
