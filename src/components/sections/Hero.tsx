"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring, MotionValue } from "framer-motion";
import { ArrowRight, Play, Star, TrendingUp, Users, Globe, Zap, Shield, Code2, Cpu, Database, Cloud } from "lucide-react";
import GlowButton from "@/components/ui/GlowButton";

function SpotlightLayer({ x, y }: { x: MotionValue<number>; y: MotionValue<number> }) {
  const bg = useTransform(
    [x, y],
    (values: number[]) =>
      `radial-gradient(600px circle at ${values[0]}% ${values[1]}%, rgba(59,130,246,0.06), transparent 50%)`
  );
  return (
    <motion.div
      className="absolute inset-0 pointer-events-none"
      style={{ background: bg as MotionValue<string> }}
    />
  );
}

const floatingTags = [
  { icon: Code2, label: "Next.js 15", color: "text-blue-400", bg: "bg-blue-500/10", delay: 0 },
  { icon: Cpu, label: "AI / ML", color: "text-violet-400", bg: "bg-violet-500/10", delay: 0.5 },
  { icon: Shield, label: "Enterprise", color: "text-green-400", bg: "bg-green-500/10", delay: 1 },
  { icon: Database, label: "Supabase", color: "text-cyan-400", bg: "bg-cyan-500/10", delay: 1.5 },
  { icon: Cloud, label: "AWS / Azure", color: "text-orange-400", bg: "bg-orange-500/10", delay: 0.8 },
  { icon: Zap, label: "Performance", color: "text-yellow-400", bg: "bg-yellow-500/10", delay: 1.2 },
];

const stats = [
  { value: "150+", label: "Projects Delivered", icon: TrendingUp },
  { value: "50+", label: "Global Clients", icon: Globe },
  { value: "30+", label: "Expert Engineers", icon: Users },
  { value: "4.9★", label: "Client Rating", icon: Star },
];

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const spotlightX = useSpring(mouseX, { stiffness: 100, damping: 30 });
  const spotlightY = useSpring(mouseY, { stiffness: 100, damping: 30 });

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (rect) {
        mouseX.set(((e.clientX - rect.left) / rect.width) * 100);
        mouseY.set(((e.clientY - rect.top) / rect.height) * 100);
      }
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, [mouseX, mouseY]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#050505]"
    >
      {/* Background layers */}
      <div className="absolute inset-0">
        {/* Grid */}
        <div className="absolute inset-0 bg-grid opacity-40" />
        {/* Radial gradient mask */}
        <div className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(59,130,246,0.07) 0%, transparent 70%)",
          }}
        />

        {/* Animated orbs */}
        <div
          className="absolute w-[600px] h-[600px] rounded-full blur-[120px] opacity-20 animate-orb"
          style={{
            background: "radial-gradient(circle, #3b82f6 0%, transparent 70%)",
            top: "-100px",
            left: "20%",
          }}
        />
        <div
          className="absolute w-[500px] h-[500px] rounded-full blur-[120px] opacity-15 animate-orb"
          style={{
            background: "radial-gradient(circle, #7c3aed 0%, transparent 70%)",
            top: "100px",
            right: "15%",
            animationDelay: "3s",
          }}
        />
        <div
          className="absolute w-[400px] h-[400px] rounded-full blur-[100px] opacity-10 animate-orb"
          style={{
            background: "radial-gradient(circle, #06b6d4 0%, transparent 70%)",
            bottom: "100px",
            left: "30%",
            animationDelay: "5s",
          }}
        />
      </div>

      {/* Mouse spotlight */}
      <SpotlightLayer x={spotlightX} y={spotlightY} />

      {/* Content */}
      <motion.div
        className="relative z-10 container-xl text-center pt-32 pb-20"
        style={{ y, opacity }}
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0, 0, 0.2, 1] }}
          className="flex justify-center mb-8"
        >
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass border border-blue-500/20 text-sm">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-400" />
            </span>
            <span className="text-white/60">Trusted by 50+ global enterprises</span>
            <span className="flex items-center gap-1 text-blue-400 font-medium">
              Learn more <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </motion.div>

        {/* Headline */}
        <div className="max-w-6xl mx-auto mb-8">
          <motion.h1
            className="hero-headline text-white"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0, 0, 0.2, 1] }}
          >
            <span className="block">Transforming Ideas Into</span>
            <span className="block mt-2">
              <span className="relative inline-block">
                <span
                  className="gradient-text animate-gradient"
                  style={{
                    background: "linear-gradient(135deg, #60a5fa, #a78bfa, #38bdf8, #60a5fa)",
                    backgroundSize: "300% 300%",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Intelligent Digital
                </span>
              </span>{" "}
              Solutions
            </span>
          </motion.h1>
        </div>

        {/* Subheadline */}
        <motion.p
          className="text-white/50 text-xl max-w-2xl mx-auto leading-relaxed mb-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0, 0, 0.2, 1] }}
        >
          We build world-class software — from AI-powered SaaS platforms to enterprise apps — that drives real growth for ambitious companies.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <GlowButton href="/contact" size="lg" icon={<ArrowRight className="w-5 h-5" />}>
            Start Your Project
          </GlowButton>

          <GlowButton href="/portfolio" variant="secondary" size="lg" icon={<Play className="w-4 h-4" />} iconPosition="left">
            View Our Work
          </GlowButton>
        </motion.div>

        {/* Floating tech tags */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-3 mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          {floatingTags.map((tag, i) => (
            <motion.div
              key={tag.label}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-full glass border border-white/5 ${tag.bg}`}
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.08, duration: 0.5, ease: [0, 0, 0.2, 1] }}
              whileHover={{ scale: 1.05, y: -3 }}
            >
              <tag.icon className={`w-3.5 h-3.5 ${tag.color}`} />
              <span className="text-white/60 text-xs font-medium">{tag.label}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/5 rounded-2xl overflow-hidden max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="bg-[#080808] p-6 flex flex-col items-center gap-1.5 hover:bg-white/3 transition-colors group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + i * 0.1 }}
            >
              <stat.icon className="w-4 h-4 text-white/20 group-hover:text-blue-400 transition-colors mb-1" />
              <span className="text-white font-bold text-2xl tracking-tight">{stat.value}</span>
              <span className="text-white/40 text-xs font-medium">{stat.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Dashboard Mockup */}
      <motion.div
        className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-0"
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 1, ease: [0, 0, 0.2, 1] }}
      >
        <div className="relative">
          {/* Glow under mockup */}
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-3/4 h-20 bg-blue-500/20 blur-3xl rounded-full" />

          {/* Dashboard frame */}
          <div className="glass-card rounded-2xl overflow-hidden border border-white/8 shadow-2xl">
            {/* Window controls */}
            <div className="flex items-center gap-2 px-5 py-3.5 border-b border-white/5 bg-white/2">
              <div className="w-3 h-3 rounded-full bg-red-500/60" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
              <div className="w-3 h-3 rounded-full bg-green-500/60" />
              <div className="flex-1 mx-4">
                <div className="bg-white/5 rounded-lg px-4 py-1.5 text-white/30 text-xs text-center max-w-xs mx-auto">
                  app.nextgentechsolution.org
                </div>
              </div>
            </div>

            {/* Dashboard content */}
            <div className="p-6 grid grid-cols-12 gap-4 min-h-[280px]">
              {/* Sidebar */}
              <div className="col-span-2 space-y-2">
                {["Dashboard", "Analytics", "Projects", "Team", "Settings"].map((item, i) => (
                  <div
                    key={item}
                    className={`px-3 py-2 rounded-lg text-xs font-medium ${i === 0 ? "bg-blue-500/20 text-blue-400" : "text-white/30 hover:bg-white/5"}`}
                  >
                    {item}
                  </div>
                ))}
              </div>

              {/* Main area */}
              <div className="col-span-7 space-y-4">
                {/* Chart area */}
                <div className="bg-white/2 rounded-xl p-4 border border-white/5">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="text-white/80 text-sm font-medium">Revenue Growth</div>
                      <div className="text-white/30 text-xs">Last 12 months</div>
                    </div>
                    <div className="text-green-400 text-sm font-medium flex items-center gap-1">
                      <TrendingUp className="w-3.5 h-3.5" /> +127%
                    </div>
                  </div>
                  {/* Fake chart bars */}
                  <div className="flex items-end gap-2 h-16">
                    {[40, 55, 45, 70, 60, 85, 75, 90, 80, 95, 88, 100].map((h, i) => (
                      <motion.div
                        key={i}
                        initial={{ scaleY: 0 }}
                        animate={{ scaleY: 1 }}
                        transition={{ delay: 1 + i * 0.04, duration: 0.4, ease: "easeOut" }}
                        style={{
                          originY: 1,
                          height: `${h}%`,
                          background: i === 11 ? "linear-gradient(to top, #3b82f6, #7c3aed)" : "rgba(255,255,255,0.08)",
                          borderRadius: "2px",
                          flex: 1,
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Metric cards row */}
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: "Active Users", value: "12.4K", change: "+18%" },
                    { label: "Conversion", value: "3.8%", change: "+0.5%" },
                    { label: "Revenue", value: "$84K", change: "+32%" },
                  ].map((m) => (
                    <div key={m.label} className="bg-white/2 rounded-xl p-3 border border-white/5">
                      <div className="text-white/30 text-xs mb-1">{m.label}</div>
                      <div className="text-white font-bold text-base">{m.value}</div>
                      <div className="text-green-400 text-xs">{m.change}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right panel */}
              <div className="col-span-3 space-y-3">
                <div className="bg-white/2 rounded-xl p-3 border border-white/5">
                  <div className="text-white/50 text-xs mb-2 font-medium">Recent Activity</div>
                  {["Deploy completed", "New user signup", "API call spike", "Alert resolved"].map((a, i) => (
                    <div key={a} className="flex items-center gap-2 py-1.5">
                      <div className={`w-1.5 h-1.5 rounded-full ${i === 0 ? "bg-green-400" : i === 2 ? "bg-yellow-400" : "bg-blue-400"}`} />
                      <span className="text-white/30 text-xs">{a}</span>
                    </div>
                  ))}
                </div>
                <div className="bg-gradient-to-br from-blue-500/10 to-violet-500/10 rounded-xl p-3 border border-blue-500/20">
                  <div className="text-blue-400 text-xs font-medium mb-1">AI Insight</div>
                  <div className="text-white/50 text-xs leading-relaxed">Traffic peak predicted at 3PM. Auto-scaling enabled.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <span className="text-white/20 text-xs tracking-widest uppercase">Scroll</span>
        <motion.div
          className="w-5 h-8 rounded-full border border-white/10 flex items-start justify-center p-1"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            className="w-1 h-2 rounded-full bg-white/40"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
