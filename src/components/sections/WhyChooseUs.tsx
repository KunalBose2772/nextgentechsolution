"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Zap, Shield, Target, ArrowRight, TrendingUp, DollarSign, Clock } from "lucide-react";

const features = [
  {
    title: "Custom SaaS Platforms",
    image: "/images/portfolio/saas.png",
    desc: "Multi-tenant platforms engineered for infinite scalability and security."
  },
  {
    title: "Mobile App Engineering",
    image: "/images/portfolio/mobile.png",
    desc: "High-performance native iOS and Android apps with beautiful UX."
  },
  {
    title: "AI & Machine Learning",
    image: "/images/portfolio/ai.png",
    desc: "Smart agent pipelines, automation models, and predictive analytics."
  },
  {
    title: "Cloud & DevOps Security",
    image: "/images/portfolio/security.png",
    desc: "Robust pipelines, automated monitoring, and 99.99% uptime."
  }
];

export default function WhyChooseUs() {
  // ROI Simulator state
  const [teamSize, setTeamSize] = useState(5);
  const [monthlySpend, setMonthlySpend] = useState(50);

  // Calculations
  const inHouseMonthlyCost = teamSize * 8500; // avg developer salary
  const offshoreWith = teamSize * 3200; // our rates
  const monthlySavings = inHouseMonthlyCost - offshoreWith;
  const annualSavings = monthlySavings * 12;
  const timeToMarketReduction = Math.min(60, Math.round(15 + teamSize * 3)); // percent
  const serverSavings = Math.round(monthlySpend * 0.38 * 12); // 38% cloud optimization

  const formatNum = (n: number) =>
    n >= 1000 ? `$${(n / 1000).toFixed(1)}k` : `$${n}`;

  return (
    <section
      className="py-16 bg-slate-950 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-950/20 via-slate-950 to-slate-950 text-white border-t border-slate-900/50"
      id="why-choose-us"
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Block */}
          <div className="lg:col-span-5 flex flex-col items-start">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 mb-2 block">
              WHY CHOOSE US
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4 tracking-tight leading-tight">
              Explore NextGen advantages
            </h2>
            <p className="text-slate-400 mb-8 leading-relaxed text-sm">
              We engineer custom, scalable technology platforms designed to secure your operations, accelerate deployment timelines, and drive clear returns on investment.
            </p>

            <div className="flex flex-col gap-6 w-full">
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
                <div key={idx} className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-cyan-950/30 text-cyan-400 border border-cyan-900/30 flex items-center justify-center shrink-0">
                    <item.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white mb-1">{item.title}</h4>
                    <p className="text-xs text-slate-405 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <Link href="#contact" className="inline-flex items-center gap-2 bg-cyan-400 hover:bg-cyan-500 text-slate-950 font-bold text-xs px-6 py-3 rounded-full shadow-lg transition-all">
                Start a Project <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right Block — ROI Simulator + Image Grid */}
          <div className="lg:col-span-7 space-y-6">

            {/* ROI Simulator Card */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 backdrop-blur-md">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-cyan-400 mb-1">
                    INFRASTRUCTURE ROI SIMULATOR
                  </div>
                  <h3 className="text-white font-bold text-base">
                    Calculate Your Engineering Savings
                  </h3>
                </div>
                <TrendingUp className="w-5 h-5 text-cyan-400 shrink-0" />
              </div>

              {/* Sliders */}
              <div className="space-y-5 mb-6">
                <div>
                  <div className="flex justify-between text-[10px] font-bold text-slate-400 mb-2">
                    <span>DEVELOPER TEAM SIZE</span>
                    <span className="text-white">{teamSize} engineers</span>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={20}
                    value={teamSize}
                    onChange={e => setTeamSize(Number(e.target.value))}
                    className="w-full h-1.5 rounded-full appearance-none cursor-pointer bg-slate-800 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-cyan-400 [&::-webkit-slider-thumb]:cursor-pointer"
                  />
                  <div className="flex justify-between text-[9px] text-slate-600 mt-1">
                    <span>1</span><span>20</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[10px] font-bold text-slate-400 mb-2">
                    <span>MONTHLY CLOUD SPEND</span>
                    <span className="text-white">${monthlySpend}k/mo</span>
                  </div>
                  <input
                    type="range"
                    min={5}
                    max={200}
                    step={5}
                    value={monthlySpend}
                    onChange={e => setMonthlySpend(Number(e.target.value))}
                    className="w-full h-1.5 rounded-full appearance-none cursor-pointer bg-slate-800 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-cyan-400 [&::-webkit-slider-thumb]:cursor-pointer"
                  />
                  <div className="flex justify-between text-[9px] text-slate-600 mt-1">
                    <span>$5k</span><span>$200k</span>
                  </div>
                </div>
              </div>

              {/* Results */}
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-3 text-center">
                  <DollarSign className="w-4 h-4 text-emerald-400 mx-auto mb-1.5" />
                  <div className="text-emerald-400 font-extrabold text-sm">{formatNum(annualSavings)}</div>
                  <div className="text-[9px] text-slate-500 font-bold uppercase tracking-wide mt-0.5">Annual Savings</div>
                </div>
                <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-3 text-center">
                  <Clock className="w-4 h-4 text-blue-400 mx-auto mb-1.5" />
                  <div className="text-blue-400 font-extrabold text-sm">{timeToMarketReduction}%</div>
                  <div className="text-[9px] text-slate-500 font-bold uppercase tracking-wide mt-0.5">Faster Launch</div>
                </div>
                <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-3 text-center">
                  <TrendingUp className="w-4 h-4 text-cyan-400 mx-auto mb-1.5" />
                  <div className="text-cyan-400 font-extrabold text-sm">{formatNum(serverSavings)}</div>
                  <div className="text-[9px] text-slate-500 font-bold uppercase tracking-wide mt-0.5">Cloud Saved/yr</div>
                </div>
              </div>

              <p className="text-[9px] text-slate-600 mt-3 text-center">
                * Estimates based on average US market rates vs. NextGen offshore engineering rates.
              </p>
            </div>

            {/* Image Grid */}
            <div className="grid sm:grid-cols-2 gap-4">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="group relative h-[200px] rounded-2xl overflow-hidden border border-slate-800/60 shadow-lg flex flex-col justify-end p-5"
                >
                  <Image 
                    src={feature.image} 
                    alt={feature.title} 
                    fill
                    sizes="(max-width: 768px) 100vw, 350px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent z-10" />
                  <div className="relative z-20">
                    <h3 className="text-sm font-bold text-white mb-0.5">{feature.title}</h3>
                    <p className="text-[11px] text-slate-300 leading-relaxed">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
