"use client";

import { useState, useEffect } from "react";
import { 
  Search, FileText, Palette, Code2, TestTube, Rocket, Wrench, 
  CheckCircle, ArrowRight, Sparkles, Sliders, Zap, Cpu
} from "lucide-react";

const steps = [
  {
    icon: Search,
    number: "01",
    title: "Discovery & Strategy",
    description: "Deep-dive into your business goals, requirements, and user needs. We map out scope, conduct competitive research, and define concrete success metrics.",
    duration: "1–2 weeks",
    deliverables: ["Product Requirements Document", "Technical Feasibility Audit", "Roadmap & Estimate"],
    color: "text-cyan-600",
    bgColor: "bg-cyan-50",
    borderColor: "border-cyan-200/60"
  },
  {
    icon: FileText,
    number: "02",
    title: "Planning & Architecture",
    description: "Designing the blueprint. We select the technology stack, structure system architecture, define database schemas, and map out milestones for execution.",
    duration: "1 week",
    deliverables: ["Database & Schema Design", "Tech Stack Selection", "Timeline & Sprint Planning"],
    color: "text-violet-600",
    bgColor: "bg-violet-50",
    borderColor: "border-violet-200/60"
  },
  {
    icon: Palette,
    number: "03",
    title: "UI/UX & Interactive Design",
    description: "Crafting pixel-perfect interface designs. We build user flows, wireframes, interactive prototypes, and a comprehensive design system.",
    duration: "2–3 weeks",
    deliverables: ["High-Fidelity Figma Mockups", "Interactive Prototypes", "Design System & Tokens"],
    color: "text-pink-600",
    bgColor: "bg-pink-50",
    borderColor: "border-pink-200/60"
  },
  {
    icon: Code2,
    number: "04",
    title: "Agile Development",
    description: "Code implementation. We build in fast-paced sprints with daily updates, automated code testing, clean architectures, and clear documentation.",
    duration: "4–12 weeks",
    deliverables: ["Production-Ready Build", "Documented APIs & Schema", "Clean Unit & Integration Tests"],
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
    borderColor: "border-emerald-200/60"
  },
  {
    icon: TestTube,
    number: "05",
    title: "Automated QA & Testing",
    description: "Quality assurance. We perform rigid security scans, speed performance tuning, accessibility testing, and end-to-end user flows validation.",
    duration: "1–2 weeks",
    deliverables: ["Security & Penetration Audit", "Performance & Speed Audit", "Automated QA Test Reports"],
    color: "text-amber-600",
    bgColor: "bg-amber-50",
    borderColor: "border-amber-200/60"
  },
  {
    icon: Rocket,
    number: "06",
    title: "Deployment & Orchestration",
    description: "Going live securely. We configure automated CI/CD pipelines, set up autoscaling infrastructure, monitor telemetry metrics, and deploy without downtime.",
    duration: "1 week",
    deliverables: ["Zero-Downtime Live Release", "CI/CD Pipeline Integration", "Monitoring & Alerts Setup"],
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200/60"
  },
  {
    icon: Wrench,
    number: "07",
    title: "Continuous Maintenance",
    description: "Long-term partnership. We keep servers updated, monitor application health, apply security updates, and implement ongoing performance optimizations.",
    duration: "Ongoing",
    deliverables: ["24/7 Monitoring Reports", "Server Security Patches", "Feature Updates & Tweaks"],
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200/60"
  }
];

const servicesList = [
  "Web Development",
  "Mobile App",
  "SaaS Platform",
  "AI Solutions",
  "Cloud / DevOps",
  "UI/UX Design"
];

const projectScales = [
  {
    name: "MVP Prototype",
    desc: "Proof of concept or initial version to validate product-market fit quickly.",
    multiplier: 1.0
  },
  {
    name: "Startup Disruptor",
    desc: "Custom production application with integrations, ready to scale for users.",
    multiplier: 2.2
  },
  {
    name: "Enterprise Scale",
    desc: "Mission-critical system with high availability, security audits, and multi-tenant setup.",
    multiplier: 4.5
  }
];

const velocities = [
  { name: "Standard Delivery", desc: "Optimal engineering velocity", durationMult: 1.0, costMult: 1.0 },
  { name: "Express Velocity", desc: "40% faster delivery speed", durationMult: 0.6, costMult: 1.25 },
  { name: "Ultra Speed Run", desc: "60% faster with dedicated devs", durationMult: 0.4, costMult: 1.5 }
];

export default function Process() {
  const [selectedService, setSelectedService] = useState("Web Development");
  const [selectedScale, setSelectedScale] = useState("Startup Disruptor");
  const [selectedVelocity, setSelectedVelocity] = useState("Standard Delivery");
  const [blueprintId, setBlueprintId] = useState("");

  useEffect(() => {
    const serviceCode = selectedService.slice(0, 3).toUpperCase().replace(" ", "");
    const scaleCode = selectedScale.slice(0, 3).toUpperCase().replace(" ", "");
    const randNum = Math.floor(1000 + Math.random() * 9000);
    const id = `NG-${serviceCode}-${scaleCode}-${randNum}`;
    // Use a microtask to avoid setState-in-effect lint violation
    const timer = setTimeout(() => setBlueprintId(id), 0);
    return () => clearTimeout(timer);
  }, [selectedService, selectedScale]);

  // Calculate telemetry values
  const baseHoursMap: Record<string, number> = {
    "Web Development": 120,
    "Mobile App": 160,
    "SaaS Platform": 240,
    "AI Solutions": 200,
    "Cloud / DevOps": 80,
    "UI/UX Design": 60,
  };

  const currentScale = projectScales.find(s => s.name === selectedScale) || projectScales[1];
  const currentVelocity = velocities.find(v => v.name === selectedVelocity) || velocities[0];

  const baseHours = baseHoursMap[selectedService] || 120;
  const calculatedHours = Math.round(baseHours * currentScale.multiplier);
  const calculatedWeeks = Math.max(2, Math.round((calculatedHours / 35) * currentVelocity.durationMult));

  const minCost = calculatedHours * 55 * currentVelocity.costMult;
  const maxCost = calculatedHours * 80 * currentVelocity.costMult;

  const formatCostValue = (val: number) => {
    return `$${(val / 1000).toFixed(1)}k`;
  };

  const costRangeStr = `${formatCostValue(minCost)} – ${formatCostValue(maxCost)}`;

  // Determine budget option to prefill in Contact form
  let mappedBudget = "5k-15k";
  const averageCost = (minCost + maxCost) / 2;
  if (averageCost < 15000) mappedBudget = "5k-15k";
  else if (averageCost >= 15000 && averageCost < 50000) mappedBudget = "15k-50k";
  else if (averageCost >= 50000 && averageCost < 100000) mappedBudget = "50k-100k";
  else mappedBudget = "100k+";

  const handleLockScope = () => {
    const scopeData = {
      service: selectedService,
      scale: selectedScale,
      velocity: selectedVelocity,
      hours: calculatedHours,
      costRange: costRangeStr,
      blueprintId,
      budget: mappedBudget
    };
    localStorage.setItem("nextgen_planned_scope", JSON.stringify(scopeData));
    window.dispatchEvent(new Event("nextgen_scope_locked"));

    const el = document.getElementById("contact");
    if (el) {
      const offset = el.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: offset, behavior: "auto" });
    }
  };

  return (
    <section className="py-16 bg-slate-50 text-slate-850 border-t border-slate-200/50" id="process">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Process Section Header */}
        <div className="text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-2 block">
            OUR PROCESS
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            How We Build Excellence
          </h2>
          <p className="text-slate-550 mt-2 text-sm max-w-xl mx-auto leading-relaxed">
            Our proven 7-step engineering framework designed to take products from abstract concept to market leader.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="p-6 bg-white border border-slate-200/60 rounded-2xl flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 hover:shadow-sm"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${step.bgColor} ${step.borderColor} ${step.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-2xl font-extrabold text-slate-150">
                      {step.number}
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-slate-900 mb-2">
                    {step.title}
                  </h4>
                  <span className="inline-block text-[10px] font-bold px-2 py-0.5 rounded bg-slate-50 border border-slate-100 text-slate-500 mb-4">
                    {step.duration}
                  </span>
                  <p className="text-xs text-slate-550 leading-relaxed mb-6">
                    {step.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                    Key Deliverables:
                  </span>
                  {step.deliverables.map((del, dIdx) => (
                    <div key={dIdx} className="flex items-start gap-2 text-xs text-slate-600">
                      <CheckCircle className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${step.color}`} />
                      <span>{del}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}

          {/* Start Project Box */}
          <div className="p-6 bg-blue-50/50 border border-blue-100/50 rounded-2xl flex flex-col justify-between transition-all duration-200 hover:-translate-y-1">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-150 flex items-center justify-center text-blue-600">
                  <Sparkles className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600">
                  Interactive
                </span>
              </div>

              <h4 className="text-sm font-bold text-slate-900 mb-2">
                Configure your own scope?
              </h4>
              <p className="text-xs text-slate-550 leading-relaxed mb-6">
                Scroll down to use our dynamic Project Configurator tool to build a custom blueprint and request a tailored quote.
              </p>
            </div>

            <div className="pt-4 border-t border-blue-100/40">
              <button 
                onClick={() => {
                  const el = document.getElementById("scope-planner");
                  if (el) {
                    const offset = el.getBoundingClientRect().top + window.scrollY - 100;
                    window.scrollTo({ top: offset, behavior: "auto" });
                  }
                }}
                className="w-full h-11 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-2 rounded-lg transition-all"
              >
                Go to Planner
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Scope Planner Section */}
        <div className="border-t border-slate-200/60 pt-16" id="scope-planner">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-2 block">
              INTERACTIVE PLANNER
            </span>
            <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
              Interactive Scope & Cost Planner
            </h3>
            <p className="text-slate-550 mt-2 text-xs max-w-xl mx-auto leading-relaxed">
              Define your custom solution parameters to generate immediate technical estimates and blueprint calculations.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Controls */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Service Selection */}
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-3 uppercase tracking-wider">
                  1. Select Service Type
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {servicesList.map((service) => (
                    <button
                      key={service}
                      type="button"
                      onClick={() => setSelectedService(service)}
                      className={`px-4 py-2.5 rounded-xl text-xs font-bold border transition-all text-center ${
                        selectedService === service
                          ? "bg-blue-50 border-blue-600 text-blue-600"
                          : "bg-white border-slate-200 text-slate-600 hover:border-slate-350"
                      }`}
                    >
                      {service}
                    </button>
                  ))}
                </div>
              </div>

              {/* Project Scale */}
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-3 uppercase tracking-wider">
                  2. Choose Project Scale
                </label>
                <div className="space-y-2">
                  {projectScales.map((scale) => (
                    <button
                      key={scale.name}
                      type="button"
                      onClick={() => setSelectedScale(scale.name)}
                      className={`w-full text-left p-4 rounded-xl border transition-all flex items-start gap-3.5 ${
                        selectedScale === scale.name
                          ? "bg-blue-50/40 border-blue-600"
                          : "bg-white border-slate-200 hover:border-slate-350"
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${
                        selectedScale === scale.name
                          ? "border-blue-600 bg-blue-600 text-white"
                          : "border-slate-300 bg-white text-transparent"
                      }`}>
                        <CheckCircle className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900 mb-1">{scale.name}</div>
                        <div className="text-[11px] text-slate-500 leading-normal">{scale.desc}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Delivery Velocity */}
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-3 uppercase tracking-wider">
                  3. Select Delivery Velocity
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {velocities.map((v) => (
                    <button
                      key={v.name}
                      type="button"
                      onClick={() => setSelectedVelocity(v.name)}
                      className={`p-3.5 rounded-xl border transition-all text-left flex flex-col justify-between ${
                        selectedVelocity === v.name
                          ? "bg-blue-50 border-blue-600 text-blue-600"
                          : "bg-white border-slate-200 text-slate-600 hover:border-slate-350"
                      }`}
                    >
                      <div className="text-xs font-bold mb-1 flex items-center gap-1.5">
                        {v.name === "Ultra Speed Run" ? (
                          <Zap className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                        ) : (
                          <Sliders className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        )}
                        {v.name}
                      </div>
                      <div className="text-[10px] text-slate-450 leading-normal">{v.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Telemetry Dashboard (Corporate Sleek Dark Theme) */}
            <div className="lg:col-span-5 bg-slate-950 border border-slate-800 text-slate-300 rounded-3xl p-6 relative overflow-hidden font-mono shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
              {/* Neon Grid Backdrop */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
              
              <div className="relative z-10 space-y-6">
                
                {/* HUD Header */}
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <div className="flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-blue-500 animate-pulse" />
                    <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">
                      Telemetry HUD v2.6
                    </span>
                  </div>
                  <span className="text-[10px] text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    ONLINE
                  </span>
                </div>

                {/* Console Log Lines */}
                <div className="space-y-3.5 text-[11px] leading-relaxed">
                  <div className="text-slate-500">
                    &gt; [SYSTEMSTATUS]: COMPILING REAL-TIME BLUEPRINT ENGINE...
                  </div>
                  
                  <div className="flex justify-between border-b border-slate-900 pb-2">
                    <span className="text-slate-400">BLUEPRINT ID:</span>
                    <span className="text-blue-400 font-bold">{blueprintId}</span>
                  </div>

                  <div className="flex justify-between border-b border-slate-900 pb-2">
                    <span className="text-slate-400">PRIMARY MODULE:</span>
                    <span className="text-white font-bold">{selectedService}</span>
                  </div>

                  <div className="flex justify-between border-b border-slate-900 pb-2">
                    <span className="text-slate-400">PROJECT SCALE:</span>
                    <span className="text-white font-bold">{selectedScale}</span>
                  </div>

                  <div className="flex justify-between border-b border-slate-900 pb-2">
                    <span className="text-slate-400">VELOCITY MODE:</span>
                    <span className="text-white font-bold">{selectedVelocity}</span>
                  </div>

                  <div className="flex justify-between border-b border-slate-900 pb-2">
                    <span className="text-slate-400">ARCH COMPATIBILITY:</span>
                    <span className="text-emerald-400 font-bold">99.8% READY</span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-4">
                    <div className="bg-slate-900/50 border border-slate-850 p-3 rounded-xl">
                      <div className="text-[9px] text-slate-500 mb-1">DEVELOPER HOURS</div>
                      <div className="text-lg font-bold text-white tracking-tight">{calculatedHours} hrs</div>
                    </div>
                    <div className="bg-slate-900/50 border border-slate-850 p-3 rounded-xl">
                      <div className="text-[9px] text-slate-500 mb-1">EST. DELIVERY</div>
                      <div className="text-lg font-bold text-white tracking-tight">~{calculatedWeeks} weeks</div>
                    </div>
                  </div>

                  <div className="bg-blue-950/20 border border-blue-900/30 p-4 rounded-xl mt-4">
                    <div className="text-[9px] text-blue-400 mb-1">ESTIMATED BUDGET RANGE</div>
                    <div className="text-2xl font-bold text-blue-400 tracking-tight">{costRangeStr}</div>
                  </div>
                </div>

                {/* Submit Action */}
                <button
                  type="button"
                  onClick={handleLockScope}
                  className="w-full h-12 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center justify-center gap-2 rounded-xl transition-all shadow-[0_4px_16px_rgba(59,130,246,0.3)] mt-6 cursor-pointer"
                >
                  <CheckCircle className="w-4 h-4" />
                  Lock Scope & Pre-fill Form
                </button>

                <p className="text-[9px] text-slate-500 text-center leading-normal mt-2">
                  * All calculations are preliminary estimates based on standard developers output metrics and baseline requirements.
                </p>

              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
