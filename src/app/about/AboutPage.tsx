"use client";

import { useEffect, useRef, useState } from "react";
import PageHero from "@/components/common/PageHero";
import Contact from "@/components/sections/Contact";
import Link from "next/link";
import {
  CheckCircle2, Users, Award, TrendingUp, Globe,
  Heart, Zap, Shield, ArrowRight, Code, Cpu, Star, Rocket,
} from "lucide-react";
import { FaLinkedinIn, FaTwitter } from "react-icons/fa";
import { COMPANY } from "@/lib/utils";

/* ─── Data ─────────────────────────────────────────────────────────── */

const team = [
  { name: "Kunal Bose",     role: "Founder & CEO",          expertise: "Strategy & Business Development", initials: "KB", color: "#7c3aed" },
  { name: "Rahul Kumar",    role: "Head of Engineering",     expertise: "Full-Stack & System Architecture",  initials: "RK", color: "#06b6d4" },
  { name: "Priya Singh",    role: "Head of Design",          expertise: "UI/UX & Brand Identity",           initials: "PS", color: "#ec4899" },
  { name: "Arjun Mehta",   role: "Head of AI & Cloud",      expertise: "Machine Learning & DevOps",        initials: "AM", color: "#22c55e" },
];

const values = [
  { icon: Zap,    color: "#7c3aed", bg: "rgba(124,58,237,0.08)",   title: "Innovation First",   desc: "We embrace emerging technologies and challenge conventions to build breakthrough solutions for every client." },
  { icon: Shield, color: "#06b6d4", bg: "rgba(6,182,212,0.08)",    title: "Integrity Always",   desc: "Transparent communication, honest timelines, and zero compromise on quality — every single project." },
  { icon: Heart,  color: "#ec4899", bg: "rgba(236,72,153,0.08)",   title: "Client Success",     desc: "Your success is our measure. We stay accountable from discovery through post-launch growth." },
  { icon: Users,  color: "#22c55e", bg: "rgba(34,197,94,0.08)",    title: "Team Excellence",    desc: "A team of passionate specialists who invest in continuous learning and genuinely love what they build." },
];

const stats = [
  { icon: TrendingUp, value: "150+", label: "Projects Delivered", color: "#7c3aed" },
  { icon: Globe,      value: "50+",  label: "Global Clients",     color: "#06b6d4" },
  { icon: Users,      value: "25+",  label: "Team Members",       color: "#22c55e" },
  { icon: Award,      value: "100%", label: "Client Retention",   color: "#f97316" },
];

const differentiators = [
  { icon: Code,   label: "Senior-only engineering teams — no juniors on critical delivery paths." },
  { icon: Star,   label: "Fixed-price & milestone-based contracts with no hidden surprises." },
  { icon: Cpu,    label: "AI-augmented workflows that accelerate delivery by 30–40%." },
  { icon: Globe,  label: "Multi-timezone coverage across India, Europe, and North America." },
  { icon: Rocket, label: "Launched in 2026 with a world-class team and enterprise-grade infrastructure." },
];

/* ─── Animated counter ─────────────────────────────────────────────── */
function useCounter(target: number, duration = 1400) {
  const [count, setCount] = useState(0);
  const raf = useRef<number | null>(null);
  const started = useRef(false);

  const start = () => {
    if (started.current) return;
    started.current = true;
    const startTime = performance.now();
    const step = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) raf.current = requestAnimationFrame(step);
    };
    raf.current = requestAnimationFrame(step);
  };

  useEffect(() => () => { if (raf.current) cancelAnimationFrame(raf.current); }, []);
  return { count, start };
}

function StatCard({ stat }: { stat: typeof stats[0] }) {
  const num = parseInt(stat.value.replace(/\D/g, "")) || 0;
  const suffix = stat.value.replace(/[0-9]/g, "");
  const { count, start } = useCounter(num);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) start(); }, { threshold: 0.4 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [start]);

  return (
    <div ref={ref} className="flex flex-col items-center text-center p-8 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
        style={{ background: `${stat.color}12`, border: `1.5px solid ${stat.color}28` }}>
        <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
      </div>
      <div className="text-4xl font-extrabold tracking-tight text-slate-900 mb-1">{count}{suffix}</div>
      <div className="text-xs font-bold uppercase tracking-widest text-slate-400">{stat.label}</div>
    </div>
  );
}

/* ─── Main page ─────────────────────────────────────────────────────── */
export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-50">

      {/* ── 1. Page Header ── */}
      <PageHero
        badge="About Us"
        title="Building World-Class"
        titleHighlight="Digital Products"
        description={`NextGen Tech Solution was launched in ${COMPANY.founded} with a singular mission: to make enterprise-grade software accessible to every ambitious business — not just the Fortune 500.`}
        breadcrumbs={[{ label: "About" }]}
      />

      {/* ── 2. Stats Strip ── */}
      <section className="py-16 bg-white border-b border-slate-100">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {stats.map((stat) => <StatCard key={stat.label} stat={stat} />)}
          </div>
        </div>
      </section>

      {/* ── 3. Mission + Who We Are ── */}
      <section className="py-20 bg-slate-50 border-b border-slate-100">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Left: copy */}
            <div>
              <span className="inline-block text-[10px] font-bold uppercase tracking-widest text-[#7c3aed] mb-4 px-2.5 py-1 rounded-md bg-purple-50 border border-purple-100">
                Our Story
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 mb-5 leading-tight">
                A new-generation tech company <span className="text-[#7c3aed]">built for speed</span>
              </h2>
              <div className="space-y-4 text-[15px] leading-relaxed text-slate-600">
                <p>
                  Founded in <strong className="text-slate-800">June 2026</strong>, NextGen Tech Solution was built from day one with a world-class team, modern infrastructure, and a client-first philosophy. We didn't grow slowly — we launched at full speed.
                </p>
                <p>
                  We operate as a <strong className="text-slate-800">premium technology partner</strong>, not a typical vendor. Our engineers embed deeply in your product, think strategically about your goals, and stay accountable from the first discovery call through post-launch growth.
                </p>
                <p>
                  Headquartered in Ranchi, India — with remote coverage across India, Europe, and North America — we serve startups, scale-ups, and enterprises looking for genuine engineering excellence.
                </p>
              </div>
              <Link href="/contact"
                className="mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-white bg-[#7c3aed] hover:bg-[#6d28d9] transition-all duration-200 hover:-translate-y-0.5 shadow-md shadow-purple-200">
                Start a Project <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Right: differentiators card */}
            <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
              <h3 className="text-base font-bold text-slate-900 mb-6 flex items-center gap-2">
                <span className="w-1 h-5 rounded-full bg-[#7c3aed] inline-block" />
                Why We&apos;re Different
              </h3>
              <div className="space-y-4">
                {differentiators.map((d) => (
                  <div key={d.label} className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5 bg-purple-50 border border-purple-100">
                      <d.icon className="w-3.5 h-3.5 text-[#7c3aed]" />
                    </div>
                    <p className="text-sm leading-relaxed text-slate-600">{d.label}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── 4. Values ── */}
      <section className="py-20 bg-white border-b border-slate-100">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <span className="inline-block text-[10px] font-bold uppercase tracking-widest text-[#7c3aed] mb-3 px-2.5 py-1 rounded-md bg-purple-50 border border-purple-100">
              Our Values
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 mb-4">What We Stand For</h2>
            <p className="text-slate-500 text-[15px] max-w-xl mx-auto leading-relaxed">
              Four principles that guide every line of code we write and every relationship we build.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map((v) => (
              <div key={v.title} className="p-7 bg-slate-50 border border-slate-100 rounded-2xl hover:border-slate-200 hover:shadow-sm transition-all duration-200">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
                  style={{ background: v.bg, border: `1.5px solid ${v.color}25` }}>
                  <v.icon className="w-5 h-5" style={{ color: v.color }} />
                </div>
                <h3 className="font-bold text-slate-900 mb-2 text-[15px]">{v.title}</h3>
                <p className="text-sm leading-relaxed text-slate-500">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. Team ── */}
      <section className="py-20 bg-slate-50 border-b border-slate-100">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
          <div className="mb-12">
            <span className="inline-block text-[10px] font-bold uppercase tracking-widest text-[#7c3aed] mb-3 px-2.5 py-1 rounded-md bg-purple-50 border border-purple-100">
              The Team
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 mb-4">Meet Our Leaders</h2>
            <p className="text-slate-500 text-[15px] max-w-xl leading-relaxed">
              A passionate group of engineers, designers, and strategists united by one goal — shipping excellent products.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {team.map((member) => (
              <div key={member.name} className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-md hover:border-slate-300 transition-all duration-200">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center font-extrabold text-lg mb-4"
                  style={{ background: `${member.color}12`, border: `1.5px solid ${member.color}30`, color: member.color }}>
                  {member.initials}
                </div>
                <div className="font-bold text-slate-900 text-sm mb-0.5">{member.name}</div>
                <div className="text-[11px] font-semibold text-[#7c3aed] mb-3">{member.role}</div>
                <div className="flex items-start gap-2 pt-3 border-t border-slate-100">
                  <CheckCircle2 className="w-3.5 h-3.5 mt-0.5 shrink-0 text-slate-300" />
                  <span className="text-xs text-slate-500 leading-relaxed">{member.expertise}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. Contact CTA ── */}
      <Contact />
    </div>
  );
}
