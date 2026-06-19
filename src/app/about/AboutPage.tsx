"use client";

import { useEffect, useRef, useState } from "react";
import PageHero from "@/components/common/PageHero";
import Contact from "@/components/sections/Contact";
import Link from "next/link";
import {
  CheckCircle2,
  Users,
  Award,
  TrendingUp,
  Globe,
  Heart,
  Zap,
  Shield,
  ArrowRight,
  MapPin,
  Code,
  Cpu,
  Star,
} from "lucide-react";
import { FaLinkedinIn, FaTwitter } from "react-icons/fa";

/* ─── Data ─────────────────────────────────────────────────────────── */

const team = [
  { name: "Aryan Kapoor",  role: "CEO & Co-Founder",    expertise: "Engineering & Strategy",       avatar: "/images/team/aryan.png", color: "#3b82f6", linkedin: "#", twitter: "#" },
  { name: "Priya Singh",   role: "CTO",                  expertise: "Cloud Architecture & AI",      avatar: "/images/team/priya.png", color: "#7c3aed", linkedin: "#", twitter: "#" },
  { name: "Rahul Dev",     role: "Head of Engineering",  expertise: "Full-Stack & DevOps",          avatar: "/images/team/rahul.png", color: "#06b6d4", linkedin: "#", twitter: "#" },
  { name: "Ananya Mehta",  role: "Head of Design",       expertise: "UI/UX & Design Systems",       avatar: "/images/team/ananya.png", color: "#ec4899", linkedin: "#", twitter: "#" },
  { name: "Vikram Shah",   role: "Head of AI/ML",        expertise: "Machine Learning & NLP",       avatar: "/images/team/vikram.png", color: "#22c55e", linkedin: "#", twitter: "#" },
  { name: "Sneha Gupta",   role: "Head of Delivery",     expertise: "Project Management",           avatar: "/images/team/sneha.png", color: "#f97316", linkedin: "#", twitter: "#" },
];

const values = [
  { icon: Zap,    color: "#06b6d4", title: "Innovation First",    desc: "We challenge the status quo and embrace emerging technologies to create breakthrough solutions." },
  { icon: Shield, color: "#7c3aed", title: "Trust & Integrity",   desc: "Transparent communication, honest timelines, and zero compromise on quality standards." },
  { icon: Heart,  color: "#ec4899", title: "Client Success",      desc: "Your success is our metric. We're not done until your project achieves its business goals." },
  { icon: Users,  color: "#22c55e", title: "Team Excellence",     desc: "We hire the best, invest in their growth, and foster a culture of continuous learning." },
];

const milestones = [
  { year: "2019", event: "Founded in India with a team of 3 engineers with a mission to democratize enterprise software." },
  { year: "2020", event: "First enterprise client — built a custom ERP system for a logistics firm in 90 days." },
  { year: "2021", event: "Scaled to 15 specialists, launched dedicated AI/ML practice, and shipped first SaaS product." },
  { year: "2022", event: "Delivered 50+ projects across 3 continents, opened distributed remote offices." },
  { year: "2023", event: "Hit the 100 project milestone, expanded into cloud-native and platform engineering." },
  { year: "2024", event: "50+ global clients, 30+ team members — went AI-first across all service lines." },
  { year: "2025", event: "150+ projects delivered, entering new international markets with a world-class team." },
];

const stats = [
  { icon: TrendingUp, value: "150+", label: "Projects Delivered", color: "#06b6d4" },
  { icon: Globe,      value: "50+",  label: "Global Clients",     color: "#7c3aed" },
  { icon: Users,      value: "30+",  label: "Team Members",       color: "#22c55e" },
  { icon: Award,      value: "6 Yrs",label: "Industry Experience",color: "#f97316" },
];

const offices = [
  { city: "Bangalore",   country: "India",         flag: "🇮🇳", role: "HQ & Engineering" },
  { city: "Remote",      country: "Global",        flag: "🌐", role: "Distributed Team" },
];

/* ─── Animated counter ─────────────────────────────────────────────── */
function useCounter(target: number, duration = 1600) {
  const [count, setCount] = useState(0);
  const raf = useRef<number | null>(null);
  const started = useRef(false);

  const start = () => {
    if (started.current) return;
    started.current = true;
    const startTime = performance.now();
    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) raf.current = requestAnimationFrame(step);
    };
    raf.current = requestAnimationFrame(step);
  };

  useEffect(() => () => { if (raf.current) cancelAnimationFrame(raf.current); }, []);
  return { count, start };
}

/* ─── Stat card with animated counter ─────────────────────────────── */
function StatCard({ stat }: { stat: (typeof stats)[0] }) {
  const numericVal = parseInt(stat.value.replace(/\D/g, "")) || 0;
  const suffix = stat.value.replace(/[0-9]/g, "");
  const { count, start } = useCounter(numericVal);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) start(); }, { threshold: 0.4 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [start]);

  return (
    <div
      ref={ref}
      className="group flex flex-col items-center text-center p-8 transition-all duration-300 hover:-translate-y-1 ng-card-dark"
    >
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
        style={{ background: `${stat.color}18`, border: `1px solid ${stat.color}28` }}
      >
        <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
      </div>
      <div
        className="text-4xl sm:text-5xl font-extrabold mb-2 tracking-tight"
        style={{ color: "var(--text-primary)" }}
      >
        {count}{suffix}
      </div>
      <div className="text-slate-500 text-[10.5px] font-bold uppercase tracking-widest">{stat.label}</div>
    </div>
  );
}

/* ─── Main page ─────────────────────────────────────────────────────── */
export default function AboutPage() {
  return (
    <div className="min-h-screen" style={{ background: "var(--bg-primary)" }}>

      {/* ── Page Header ── */}
      <PageHero
        badge="About Us"
        title="We Build Software That"
        titleHighlight="Changes Industries"
        description="Founded in 2019, NextGen Tech Solution is a premium software development company on a mission to empower every business with world-class digital solutions — not just the Fortune 500."
        breadcrumbs={[{ label: "About" }]}
      />

      {/* ── Story + Timeline ── */}
      <section className="py-24 border-b" style={{ borderColor: "var(--border-subtle)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-start">

            {/* Story */}
            <div>
              <span
                className="inline-block text-[10.5px] font-bold uppercase tracking-widest mb-4 px-3 py-1 rounded-full border"
                style={{
                  color: "var(--accent-primary)",
                  borderColor: "rgba(var(--accent-primary-rgb),0.25)",
                  backgroundColor: "rgba(var(--accent-primary-rgb),0.06)",
                }}
              >
                Our Story
              </span>
              <h2
                className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight mb-6"
                style={{ color: "var(--text-primary)" }}
              >
                From 3 engineers to a global technology partner
              </h2>
              <div className="space-y-4 text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                <p>
                  NextGen Tech Solution was born from a simple belief: that every business deserves access to world-class
                  software engineering — not just the Fortune 500.
                </p>
                <p>
                  We started in 2019 as three engineers building side projects. Today we are a team of 30+ specialists
                  delivering enterprise-grade software for clients across India, North America, and Europe.
                </p>
                <p>
                  Our secret? We treat every project as if it were our own startup. We care about outcomes, not just
                  deliverables. We obsess over performance, design, and code quality in equal measure.
                </p>
              </div>

              {/* Office chips */}
              <div className="flex flex-wrap gap-3 mt-8">
                {offices.map((o) => (
                  <div
                    key={o.city}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-medium"
                    style={{
                      borderColor: "rgba(255,255,255,0.08)",
                      backgroundColor: "rgba(255,255,255,0.04)",
                      color: "var(--text-secondary)",
                    }}
                  >
                    <MapPin className="w-3 h-3 text-cyan-400 shrink-0" />
                    <span className="font-bold" style={{ color: "var(--text-primary)" }}>{o.city}</span>
                    <span className="text-slate-500">—</span>
                    <span>{o.role}</span>
                  </div>
                ))}
              </div>

              <Link
                href="/contact"
                className="mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all duration-200 hover:brightness-110 hover:-translate-y-0.5"
                style={{
                  background: "var(--accent-primary)",
                  color: "#000",
                }}
              >
                Start a Project <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Timeline */}
            <div className="relative pl-6">
              {/* vertical line */}
              <div
                className="absolute left-0 top-1.5 bottom-0 w-px"
                style={{ background: "linear-gradient(to bottom, rgba(var(--accent-primary-rgb),0.4), transparent)" }}
              />
              <div className="space-y-8">
                {milestones.map((m, i) => (
                  <div key={m.year} className="relative">
                    {/* dot */}
                    <div
                      className="absolute -left-[29px] top-1.5 w-3 h-3 rounded-full border-2"
                      style={{
                        backgroundColor: i === milestones.length - 1 ? "var(--accent-primary)" : "var(--bg-elevated)",
                        borderColor: "var(--accent-primary)",
                      }}
                    />
                    <div
                      className="text-[10.5px] font-bold uppercase tracking-widest mb-1"
                      style={{ color: "var(--accent-primary)" }}
                    >
                      {m.year}
                    </div>
                    <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                      {m.event}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats Strip ── */}
      <section className="py-20 border-b" style={{ borderColor: "var(--border-subtle)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {stats.map((stat) => (
              <StatCard key={stat.label} stat={stat} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Values ── */}
      <section className="py-24 border-b" style={{ borderColor: "var(--border-subtle)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Section header */}
          <div className="text-center mb-16">
            <span
              className="inline-block text-[10.5px] font-bold uppercase tracking-widest mb-4 px-3 py-1 rounded-full border"
              style={{
                color: "var(--accent-primary)",
                borderColor: "rgba(var(--accent-primary-rgb),0.25)",
                backgroundColor: "rgba(var(--accent-primary-rgb),0.06)",
              }}
            >
              Our Values
            </span>
            <h2
              className="text-3xl sm:text-4xl font-extrabold tracking-tight"
              style={{ color: "var(--text-primary)" }}
            >
              What We Stand For
            </h2>
            <p className="text-sm max-w-xl mx-auto mt-4 leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              Four principles that guide every line of code we write and every relationship we build.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map((v) => (
              <div
                key={v.title}
                className="group p-7 transition-all duration-300 hover:-translate-y-1 ng-card-dark"
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-5 transition-all duration-300"
                  style={{ background: `${v.color}16`, border: `1px solid ${v.color}28` }}
                >
                  <v.icon className="w-5 h-5" style={{ color: v.color }} />
                </div>
                <h3 className="font-bold mb-3 text-base" style={{ color: "var(--text-primary)" }}>
                  {v.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── What Makes Us Different ── */}
      <section className="py-24 border-b" style={{ borderColor: "var(--border-subtle)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span
                className="inline-block text-[10.5px] font-bold uppercase tracking-widest mb-4 px-3 py-1 rounded-full border"
                style={{
                  color: "var(--accent-primary)",
                  borderColor: "rgba(var(--accent-primary-rgb),0.25)",
                  backgroundColor: "rgba(var(--accent-primary-rgb),0.06)",
                }}
              >
                Why We&apos;re Different
              </span>
              <h2
                className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight mb-6"
                style={{ color: "var(--text-primary)" }}
              >
                Not an agency. A{" "}
                <span style={{ color: "var(--accent-primary)" }}>technology partner</span>.
              </h2>
              <p className="text-sm leading-relaxed mb-8" style={{ color: "var(--text-secondary)" }}>
                Most agencies hand off projects. We embed deeply, think strategically, and stay accountable from
                discovery all the way through post-launch growth.
              </p>
              <div className="space-y-4">
                {[
                  { icon: Code,  label: "Senior-only engineering teams — no juniors on critical paths." },
                  { icon: Star,  label: "Fixed-price contracts with milestone-based delivery." },
                  { icon: Cpu,   label: "AI-augmented workflows that cut delivery time by 30–40%." },
                  { icon: Globe, label: "Cross-timezone coverage across India, Europe, and North America." },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-3">
                    <div
                      className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                      style={{ background: "rgba(var(--accent-primary-rgb),0.1)", border: "1px solid rgba(var(--accent-primary-rgb),0.2)" }}
                    >
                      <item.icon className="w-3.5 h-3.5" style={{ color: "var(--accent-primary)" }} />
                    </div>
                    <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Visual card stack */}
            <div className="relative h-96 hidden lg:block">
              {/* Background card */}
              <div
                className="absolute inset-x-8 top-8 bottom-0 rounded-2xl border"
                style={{ background: "rgba(99,102,241,0.08)", borderColor: "rgba(99,102,241,0.15)" }}
              />
              {/* Middle card */}
              <div
                className="absolute inset-x-4 top-4 bottom-4 rounded-2xl border"
                style={{ background: "rgba(6,182,212,0.08)", borderColor: "rgba(6,182,212,0.15)" }}
              />
              {/* Top card */}
              <div
                className="absolute inset-0 rounded-2xl border p-8 flex flex-col justify-between"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  borderColor: "rgba(255,255,255,0.1)",
                  backdropFilter: "blur(12px)",
                }}
              >
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-9 h-9 rounded-xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center">
                      <Star className="w-4 h-4 text-cyan-400" />
                    </div>
                    <div>
                      <div className="text-white font-bold text-sm">Client Satisfaction</div>
                      <div className="text-slate-500 text-xs">Based on 50+ reviews</div>
                    </div>
                  </div>
                  <div className="text-5xl font-extrabold text-white mb-1">98%</div>
                  <div className="text-slate-400 text-sm">clients re-engage for follow-on work</div>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {["On-Time", "On-Budget", "No Surprises"].map((l) => (
                    <div
                      key={l}
                      className="text-center py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-wider"
                      style={{ background: "rgba(var(--accent-primary-rgb),0.1)", color: "var(--accent-primary)" }}
                    >
                      {l}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Life & Culture Section ── */}
      <section className="py-24 border-b" style={{ borderColor: "var(--border-subtle)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-12 gap-16 items-center">
            
            {/* Image Grid Column (6 cols) */}
            <div className="lg:col-span-6 relative order-2 lg:order-1">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="relative rounded-2xl overflow-hidden border border-white/[0.08] shadow-2xl aspect-[4/5] group/img">
                    <img 
                      src="/images/about_office1.png" 
                      alt="NextGen Office Workspace" 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-end p-4">
                      <p className="text-white text-xs font-bold font-sora">HQ Collaboration Space</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4 pt-8">
                  <div className="relative rounded-2xl overflow-hidden border border-white/[0.08] shadow-2xl aspect-[4/5] group/img2">
                    <img 
                      src="/images/about_office2.png" 
                      alt="NextGen Collaborative Meeting" 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover/img2:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover/img2:opacity-100 transition-opacity duration-300 flex items-end p-4">
                      <p className="text-white text-xs font-bold font-sora">Engineering Lab</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-cyan-500/10 rounded-full blur-[80px] pointer-events-none z-0" />
            </div>

            {/* Content Column (6 cols) */}
            <div className="lg:col-span-6 order-1 lg:order-2">
              <span
                className="inline-block text-[10.5px] font-bold uppercase tracking-widest mb-4 px-3 py-1 rounded-full border"
                style={{
                  color: "var(--accent-primary)",
                  borderColor: "rgba(var(--accent-primary-rgb),0.25)",
                  backgroundColor: "rgba(var(--accent-primary-rgb),0.06)",
                }}
              >
                Our Environment
              </span>
              <h2
                className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight mb-6"
                style={{ color: "var(--text-primary)" }}
              >
                Life & Culture at NextGen
              </h2>
              <div className="space-y-6 text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                <p>
                  At NextGen Tech Solutions, we believe that extraordinary software is built by people who are inspired, 
                  empowered, and aligned. Our workspaces are designed to spark creativity, encourage spontaneous 
                  whiteboard sessions, and support deep, uninterrupted focus.
                </p>
                <p>
                  Whether working from our state-of-the-art office in Ranchi or collaborating remotely across different timezones, 
                  our team is united by a relentless pursuit of engineering perfection. We run weekly tech talks, invest in personal growth courses, 
                  and foster an open door culture where the best idea always wins.
                </p>
                <p>
                  We strive to maintain a healthy work-life integration. We celebrate launch milestones together, host community hackathons, 
                  and prioritize mental and physical well-being.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Team ── */}
      <section className="py-24 border-b" style={{ borderColor: "var(--border-subtle)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Section header */}
          <div className="text-center mb-16">
            <span
              className="inline-block text-[10.5px] font-bold uppercase tracking-widest mb-4 px-3 py-1 rounded-full border"
              style={{
                color: "var(--accent-primary)",
                borderColor: "rgba(var(--accent-primary-rgb),0.25)",
                backgroundColor: "rgba(var(--accent-primary-rgb),0.06)",
              }}
            >
              The Team
            </span>
            <h2
              className="text-3xl sm:text-4xl font-extrabold tracking-tight"
              style={{ color: "var(--text-primary)" }}
            >
              Meet Our Leaders
            </h2>
            <p className="text-sm max-w-xl mx-auto mt-4 leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              World-class engineers, designers, and strategists united by a shared passion for extraordinary software.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {team.map((member) => (
              <div
                key={member.name}
                className="group p-6 transition-all duration-300 hover:-translate-y-1 ng-card-dark"
              >
                <div className="flex items-center gap-4 mb-5">
                  {member.avatar.startsWith("/") ? (
                    <div className="w-14 h-14 rounded-2xl overflow-hidden shrink-0 border" style={{ borderColor: `${member.color}35` }}>
                      <img src={member.avatar} alt={member.name} className="w-full h-full object-cover" />
                    </div>
                  ) : (
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center font-extrabold text-lg shrink-0"
                      style={{
                        background: `${member.color}18`,
                        border: `1.5px solid ${member.color}35`,
                        color: member.color,
                      }}
                    >
                      {member.avatar}
                    </div>
                  )}
                  <div>
                    <div className="font-bold text-sm" style={{ color: "var(--text-primary)" }}>
                      {member.name}
                    </div>
                    <div className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
                      {member.role}
                    </div>
                  </div>
                </div>

                <div
                  className="flex items-center justify-between pt-4 border-t"
                  style={{ borderColor: "rgba(255,255,255,0.06)" }}
                >
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0" style={{ color: member.color }} />
                    <span className="text-xs" style={{ color: "var(--text-muted)" }}>
                      {member.expertise}
                    </span>
                  </div>
                  <div className="flex gap-3">
                    <a
                      href={member.linkedin}
                      className="transition-colors hover:opacity-80"
                      style={{ color: "var(--text-faint)" }}
                    >
                      <FaLinkedinIn className="w-3.5 h-3.5" />
                    </a>
                    <a
                      href={member.twitter}
                      className="transition-colors hover:opacity-80"
                      style={{ color: "var(--text-faint)" }}
                    >
                      <FaTwitter className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact CTA ── */}
      <Contact />
    </div>
  );
}
