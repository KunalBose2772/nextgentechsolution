"use client";

import { CheckCircle2, Users, Award, TrendingUp, Globe, Heart, Zap, Shield } from "lucide-react";
import { FaLinkedinIn, FaTwitter } from "react-icons/fa";

const team = [
  { name: "Aryan Kapoor", role: "CEO & Co-Founder", expertise: "Engineering & Strategy", avatar: "AK", color: "#3b82f6", linkedin: "#", twitter: "#" },
  { name: "Priya Singh", role: "CTO", expertise: "Cloud Architecture & AI", avatar: "PS", color: "#7c3aed", linkedin: "#", twitter: "#" },
  { name: "Rahul Dev", role: "Head of Engineering", expertise: "Full-Stack & DevOps", avatar: "RD", color: "#06b6d4", linkedin: "#", twitter: "#" },
  { name: "Ananya Mehta", role: "Head of Design", expertise: "UI/UX & Design Systems", avatar: "AM", color: "#ec4899", linkedin: "#", twitter: "#" },
  { name: "Vikram Shah", role: "Head of AI/ML", expertise: "Machine Learning & NLP", avatar: "VS", color: "#22c55e", linkedin: "#", twitter: "#" },
  { name: "Sneha Gupta", role: "Head of Delivery", expertise: "Project Management", avatar: "SG", color: "#f97316", linkedin: "#", twitter: "#" },
];

const values = [
  { icon: Zap, title: "Innovation First", desc: "We challenge the status quo and embrace emerging technologies to create breakthrough solutions." },
  { icon: Shield, title: "Trust & Integrity", desc: "Transparent communication, honest timelines, and zero compromise on quality standards." },
  { icon: Heart, title: "Client Success", desc: "Your success is our metric. We're not done until your project achieves its business goals." },
  { icon: Users, title: "Team Excellence", desc: "We hire the best, invest in their growth, and foster a culture of continuous learning." },
];

const milestones = [
  { year: "2019", event: "Founded in India with a team of 3 engineers" },
  { year: "2020", event: "First enterprise client — built an ERP system for a logistics firm" },
  { year: "2021", event: "Expanded to 15 team members, launched AI practice" },
  { year: "2022", event: "Delivered 50+ projects, opened remote offices" },
  { year: "2023", event: "100+ projects milestone, expanded to SaaS and cloud" },
  { year: "2024", event: "50+ global clients, 30+ team members, AI-first strategy" },
  { year: "2025", event: "150+ projects, international expansion underway" },
];export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white text-slate-800">
      
      {/* Header & Story (Light Theme) */}
      <div className="py-20 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-2 block">
              ABOUT NEXTGEN TECH
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              We Build Software That Changes Industries
            </h1>
            <p className="text-slate-550 mt-4 max-w-2xl mx-auto leading-relaxed text-sm">
              Founded in 2019, NextGen Tech Solution is a premium software development company on a mission to empower businesses with world-class digital solutions.
            </p>
          </div>

          {/* Story Section */}
          <div className="grid lg:grid-cols-12 gap-12 items-start pt-10">
            <div className="lg:col-span-6">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-2 block">
                OUR STORY
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-6 tracking-tight leading-tight">
                From a 3-person startup to a global technology partner
              </h2>
              <div className="space-y-4 text-slate-600 leading-relaxed text-xs">
                <p>NextGen Tech Solution was born from a simple belief: that every business deserves access to world-class software engineering — not just the Fortune 500.</p>
                <p>We started in 2019 as three engineers building side projects. Today, we are a team of 30+ specialists delivering enterprise-grade software for clients across India, North America, and Europe.</p>
                <p>Our secret? We treat every project as if it were our own startup. We care about outcomes, not just deliverables. We obsess over performance, design, and code quality in equal measure.</p>
              </div>
            </div>

            <div className="lg:col-span-6 border-l border-slate-200 pl-6 space-y-6">
              {milestones.map((m) => (
                <div key={m.year} className="relative">
                  <div className="absolute -left-[30px] top-1.5 w-2 h-2 rounded-full bg-blue-600" />
                  <div className="text-blue-600 text-xs font-bold mb-1">{m.year}</div>
                  <p className="text-slate-700 text-xs">{m.event}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Values Section (Dark Theme) */}
      <div className="py-20 bg-slate-950 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-cyan-950/20 via-slate-950 to-slate-950 text-white border-b border-slate-900/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 mb-2 block">
              OUR VALUES
            </span>
            <h2 className="text-3xl font-extrabold text-white tracking-tight leading-tight">What We Stand For</h2>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => (
              <div key={v.title} className="p-6 bg-slate-900/40 border border-slate-800/60 rounded-2xl backdrop-blur-md transition-all duration-200 hover:-translate-y-1">
                <div className="w-10 h-10 rounded-xl bg-cyan-950/30 border border-cyan-900/30 flex items-center justify-center mb-4 text-cyan-400">
                  <v.icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white mb-2">{v.title}</h3>
                <p className="text-slate-400 text-xs leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Section (Light Theme) */}
      <div className="py-20 bg-slate-50 border-b border-slate-200/50 text-slate-850">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: TrendingUp, value: "150+", label: "Projects Delivered" },
              { icon: Globe, value: "50+", label: "Global Clients" },
              { icon: Users, value: "30+", label: "Team Members" },
              { icon: Award, value: "5 Yrs", label: "Industry Experience" },
            ].map((stat) => (
              <div key={stat.label} className="text-center p-6 bg-white border border-slate-200/60 rounded-2xl flex flex-col items-center transition-all duration-200 hover:-translate-y-1 hover:shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center mb-3 text-blue-600">
                  <stat.icon className="w-5 h-5" />
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-1">{stat.value}</div>
                <div className="text-slate-500 text-[10px] font-bold uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Section (Dark Theme) */}
      <div className="py-20 bg-slate-950 bg-[radial-gradient(circle_at_bottom,_var(--tw-gradient-stops))] from-cyan-950/20 via-slate-950 to-slate-950 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 mb-2 block">
              THE TEAM
            </span>
            <h2 className="text-3xl font-extrabold text-white mb-4 tracking-tight leading-tight">Meet Our Leaders</h2>
            <p className="text-slate-400 text-sm max-w-xl mx-auto leading-relaxed">
              World-class engineers, designers, and strategists united by a passion for building extraordinary software.
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {team.map((member) => (
              <div key={member.name} className="p-6 bg-slate-900/40 border border-slate-800/60 rounded-2xl backdrop-blur-md transition-all duration-200 hover:-translate-y-1">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-cyan-950/30 border border-cyan-900/30 flex items-center justify-center text-cyan-400 font-bold text-lg">
                    {member.avatar}
                  </div>
                  <div>
                    <div className="text-white font-bold text-sm">{member.name}</div>
                    <div className="text-slate-500 text-xs">{member.role}</div>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-slate-800/60">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                    <span className="text-slate-400 text-xs">{member.expertise}</span>
                  </div>
                  <div className="flex gap-2">
                    <a href={member.linkedin} className="text-slate-550 hover:text-white transition-colors">
                      <FaLinkedinIn className="w-3.5 h-3.5" />
                    </a>
                    <a href={member.twitter} className="text-slate-550 hover:text-white transition-colors">
                      <FaTwitter className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
