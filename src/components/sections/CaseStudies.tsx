"use client";

import { useState } from "react";
import { 
  ArrowRight, 
  TrendingUp, 
  Users, 
  Clock, 
  Zap, 
  Calendar, 
  Shield, 
  Activity,
  MessageSquare
} from "lucide-react";

// --- Mockup Screen 1: E-commerce Sales Overview Dashboard ---
const EcomDashboard = () => {
  return (
    <div className="w-full h-full flex bg-[#0A0E1A] text-white font-sans text-[9px] p-2.5 select-none overflow-hidden">
      <div className="w-[65px] border-r border-white/[0.04] pr-1.5 flex flex-col justify-between shrink-0">
        <div>
          <div className="flex items-center gap-1 mb-3.5 pl-0.5">
            <div className="w-3.5 h-3.5 rounded bg-cyan-500 flex items-center justify-center text-[7px] font-bold text-black">
              E
            </div>
            <span className="font-bold text-[7.5px] tracking-tight text-white/90">Commerce</span>
          </div>
          <div className="space-y-1">
            {[
              { label: "Dashboard", active: true },
              { label: "Analytics" },
              { label: "Orders" },
              { label: "Customers" },
              { label: "Products" },
              { label: "Reports" },
              { label: "Settings" }
            ].map((item, idx) => (
              <div
                key={idx}
                className={`flex items-center gap-1.5 py-1 px-1 rounded transition-colors ${
                  item.active ? "bg-white/[0.06] text-cyan-400 font-semibold" : "text-white/40"
                }`}
              >
                <div className={`w-1 h-1 rounded-full ${item.active ? "bg-cyan-400" : "bg-white/20"}`} />
                <span className="text-[7px]">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1 pl-2.5 flex flex-col justify-between overflow-hidden">
        <div className="flex items-center justify-between pb-1.5 border-b border-white/[0.04]">
          <div>
            <div className="text-[6.5px] text-white/40 uppercase tracking-wider font-semibold">Total Revenue</div>
            <div className="text-[11.5px] font-bold text-white tracking-tight flex items-baseline gap-1 mt-0.5">
              $4,32,10,000
              <span className="text-[6px] text-green-400 font-semibold">+12.5%</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div>
              <div className="text-[6px] text-white/40 uppercase tracking-wider font-semibold">Orders</div>
              <div className="text-[9px] font-bold text-white flex items-baseline gap-0.5 mt-0.5">
                24,891
                <span className="text-[6px] text-green-400 font-semibold">+18.2%</span>
              </div>
            </div>
            <div>
              <div className="text-[6px] text-white/40 uppercase tracking-wider font-semibold">Customers</div>
              <div className="text-[9px] font-bold text-white flex items-baseline gap-0.5 mt-0.5">
                6,521
                <span className="text-[6px] text-green-400 font-semibold">+10.1%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 grid grid-cols-12 gap-2 mt-2 items-stretch overflow-hidden">
          <div className="col-span-8 bg-white/[0.01] border border-white/[0.04] rounded-lg p-1.5 flex flex-col justify-between overflow-hidden">
            <div className="text-[7px] text-white/60 font-semibold mb-1">Revenue Growth</div>
            <div className="flex-1 relative min-h-[40px] flex items-end">
              <div className="absolute inset-0 flex flex-col justify-between opacity-[0.03]">
                <div className="border-b border-white" />
                <div className="border-b border-white" />
                <div className="border-b border-white" />
              </div>
              <svg className="w-full h-[35px]" viewBox="0 0 100 30" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="chartGlow" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                <path d="M0,28 Q15,22 30,12 T60,18 T90,2 L100,5 L100,30 L0,30 Z" fill="url(#chartGlow)" />
                <path d="M0,28 Q15,22 30,12 T60,18 T90,2 L100,5" fill="none" stroke="#06B6D4" strokeWidth="1.2" />
              </svg>
            </div>
          </div>

          <div className="col-span-4 bg-white/[0.01] border border-white/[0.04] rounded-lg p-1.5 flex flex-col justify-between overflow-hidden">
            <div className="text-[6.5px] text-white/60 font-semibold mb-1">Top Channels</div>
            <div className="flex items-center justify-between gap-1">
              <div className="relative w-8 h-8 shrink-0 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 32 32">
                  <circle cx="16" cy="16" r="12" fill="transparent" stroke="rgba(255,255,255,0.06)" strokeWidth="3" />
                  <circle cx="16" cy="16" r="12" fill="transparent" stroke="#06B6D4" strokeWidth="3" strokeDasharray="37.7 75.4" strokeDashoffset="0" />
                  <circle cx="16" cy="16" r="12" fill="transparent" stroke="#3B82F6" strokeWidth="3" strokeDasharray="22.6 75.4" strokeDashoffset="-37.7" />
                  <circle cx="16" cy="16" r="12" fill="transparent" stroke="#a855f7" strokeWidth="3" strokeDasharray="15.1 75.4" strokeDashoffset="-60.3" />
                </svg>
                <div className="absolute text-[5.5px] font-bold text-white/85">75%</div>
              </div>
              <div className="space-y-0.5 text-[5px]">
                <div className="flex items-center gap-0.5 text-white/70">
                  <span className="w-0.5 h-0.5 rounded-full bg-cyan-400" />
                  <span>Wireless</span>
                </div>
                <div className="flex items-center gap-0.5 text-white/70">
                  <span className="w-0.5 h-0.5 rounded-full bg-blue-500" />
                  <span>Watch</span>
                </div>
                <div className="flex items-center gap-0.5 text-white/70">
                  <span className="w-0.5 h-0.5 rounded-full bg-purple-500" />
                  <span>Speaker</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Mockup Screen 2: Fintech Digital Banking Platform ---
const BankingDashboard = () => {
  return (
    <div className="w-full h-full flex flex-col bg-[#070D19] text-white p-3 font-sans select-none justify-between overflow-hidden">
      <div className="flex items-center justify-between pb-1 border-b border-white/[0.03]">
        <div>
          <span className="text-[5.5px] text-white/40 block">Good morning,</span>
          <span className="text-[7.5px] font-bold text-white">Alex Johnson</span>
        </div>
        <div className="w-3.5 h-3.5 rounded-full bg-white/10 flex items-center justify-center text-[6px]">
          🔔
        </div>
      </div>

      <div className="bg-gradient-to-r from-[#0C1B33] to-[#122A52] rounded-xl p-2 border border-white/[0.04] my-1">
        <span className="text-[5px] text-white/50 block uppercase tracking-wider">Total Balance</span>
        <div className="text-[11.5px] font-bold tracking-tight text-white mt-0.5">$24,750.50</div>
        <div className="text-[5px] text-white/30 font-mono mt-1">**** **** **** 8820</div>
      </div>

      <div className="grid grid-cols-4 gap-1.5 my-1 text-center">
        {[
          { label: "Send", icon: "↗️" },
          { label: "Receive", icon: "↖️" },
          { label: "Pay", icon: "💳" },
          { label: "More", icon: "🌐" }
        ].map((act, i) => (
          <div key={i} className="flex flex-col items-center">
            <div className="w-4.5 h-4.5 rounded bg-white/5 flex items-center justify-center text-[7px] border border-white/[0.03]">
              {act.icon}
            </div>
            <span className="text-[5px] text-white/50 mt-0.5">{act.label}</span>
          </div>
        ))}
      </div>

      <div className="flex-grow flex flex-col justify-between mt-1.5 overflow-hidden">
        <span className="text-[6px] text-white/40 font-bold block mb-1 uppercase tracking-wider">Recent Transactions</span>
        <div className="space-y-1">
          {[
            { name: "Amazon", date: "Today, 2:14 PM", amt: "-$120.50" },
            { name: "Netflix", date: "Yesterday", amt: "-$15.99" },
            { name: "Spotify", date: "May 12", amt: "-$9.99" }
          ].map((tx, idx) => (
            <div key={idx} className="flex items-center justify-between py-1 border-b border-white/[0.02] last:border-0">
              <div className="flex items-center gap-1.5">
                <div className="w-3.5 h-3.5 rounded bg-white/5 flex items-center justify-center text-[6px] font-bold">
                  {tx.name[0]}
                </div>
                <div>
                  <div className="text-[6.5px] font-semibold text-white/90">{tx.name}</div>
                  <div className="text-[5px] text-white/40">{tx.date}</div>
                </div>
              </div>
              <span className="text-[6.5px] font-bold text-white/80">{tx.amt}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// --- Mockup Screen 3: Healthcare Telemedicine Video Session ---
const TelehealthScreen = () => {
  return (
    <div className="w-full h-full bg-[#050B12] text-white font-sans text-[8px] p-2 flex flex-col justify-between relative overflow-hidden select-none">
      <div className="flex-grow flex gap-1 items-stretch relative min-h-[45px]">
        <div className="flex-grow bg-zinc-900 rounded-lg relative overflow-hidden flex items-center justify-center border border-white/5">
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 z-10" />
          <svg className="w-[50px] h-[50px] text-slate-400 mt-2 z-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
            <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="8.5" cy="7" r="4" />
            <path d="M19 16V10a3 3 0 0 0-6 0M13 16h6" strokeWidth="1.2" stroke="#06B6D4" />
            <circle cx="13" cy="16" r="1.5" strokeWidth="1.2" stroke="#06B6D4" />
          </svg>
          <div className="absolute bottom-1 left-1.5 z-20 flex flex-col">
            <span className="text-[7px] font-bold text-white">Dr. James Carter</span>
            <span className="text-[5px] text-cyan-400">Chief Cardiologist</span>
          </div>
          <span className="absolute top-1 left-1.5 text-[5px] bg-cyan-400/20 border border-cyan-400/30 px-1 rounded text-cyan-400 font-semibold z-20 flex items-center gap-0.5">
            HD 1080p
          </span>
        </div>
        <div className="absolute top-1 right-1 w-[28px] h-[36px] bg-zinc-800 rounded border border-white/10 overflow-hidden flex items-center justify-center z-20">
          <svg className="w-5 h-5 text-slate-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
            <path d="M18 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="11" cy="7" r="4" />
          </svg>
        </div>
      </div>
      <div className="h-5 mt-1 flex items-center justify-between border-t border-white/[0.04] pt-1">
        <span className="text-[5px] text-white/40">Secure WebRTC Session</span>
        <div className="flex gap-1">
          <div className="w-4 h-4 rounded-full bg-white/5 flex items-center justify-center text-[6px]">🎤</div>
          <div className="w-4 h-4 rounded-full bg-white/5 flex items-center justify-center text-[6px]">📹</div>
          <div className="w-4 h-4 rounded-full bg-red-600 flex items-center justify-center text-[6px]">❌</div>
        </div>
      </div>
    </div>
  );
};

// --- Mockup Screen 4: Logistics Tracking Map ---
const LogisticsMap = () => {
  return (
    <div className="w-full h-full bg-[#060A10] text-white font-sans text-[8px] p-2 flex flex-col justify-between relative overflow-hidden select-none">
      <div className="flex-grow relative rounded-lg overflow-hidden border border-white/5 bg-[#090D14]">
        <div className="absolute inset-0 opacity-15" style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)",
          backgroundSize: "8px 8px"
        }} />
        <svg className="absolute inset-0 w-full h-full opacity-35" viewBox="0 0 100 100" preserveAspectRatio="none">
          <line x1="15" y1="0" x2="15" y2="100" stroke="#475569" strokeWidth="1.2" />
          <line x1="45" y1="0" x2="45" y2="100" stroke="#475569" strokeWidth="1.2" />
          <line x1="80" y1="0" x2="80" y2="100" stroke="#475569" strokeWidth="1.2" />
          <line x1="0" y1="25" x2="100" y2="25" stroke="#475569" strokeWidth="1.2" />
          <line x1="0" y1="60" x2="100" y2="60" stroke="#475569" strokeWidth="1.2" />
        </svg>
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path
            d="M 15 25 L 45 25 L 45 60 L 80 60"
            fill="none"
            stroke="#22c55e"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="3 1.5"
          />
          <circle cx="15" cy="25" r="1.5" fill="#3b82f6" />
          <circle cx="80" cy="60" r="2.5" fill="#ef4444" />
          <circle cx="45" cy="40" r="3" fill="#22c55e" />
          <circle cx="45" cy="40" r="1" fill="#ffffff" />
        </svg>
        <div className="absolute top-1 left-1.5 bg-black/85 border border-white/10 rounded p-1 backdrop-blur-sm z-10 text-[5px]">
          <span className="text-[#22c55e] font-bold block">🚚 TRK-982701 in transit</span>
          <span className="text-white/60 block mt-0.5">ETA: 14 mins</span>
        </div>
      </div>
      <div className="h-5 mt-1 flex items-center justify-between border-t border-white/[0.04] pt-1">
        <span className="text-[5px] text-white/40">Route: Hub A → Warehouse B</span>
        <span className="text-[5px] text-green-400 font-semibold font-mono">GPS Active</span>
      </div>
    </div>
  );
};

// --- Mockup Frame Wrappers ---
const LaptopMockup = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative mx-auto w-full max-w-[500px] aspect-[16/10] select-none">
      <div className="relative w-full h-[93%] rounded-t-[18px] bg-[#0c0d0e] p-[2%] border-[2px] border-[#1e2022] shadow-[0_12px_36px_rgba(0,0,0,0.5)] overflow-hidden">
        <div className="relative w-full h-full bg-[#030303] rounded-[3px] overflow-hidden border border-black/40">
          {children}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.02] to-white/[0.06] pointer-events-none" />
        </div>
      </div>
      <div className="absolute bottom-[2%] left-[-4%] right-[-4%] h-[5%] bg-gradient-to-b from-[#2d3135] to-[#151719] rounded-t-[4px] rounded-b-[10px] border-t border-[#464c52] shadow-[0_8px_16px_rgba(0,0,0,0.3)]" />
      <div className="absolute bottom-0 left-[45%] right-[45%] h-[2%] bg-[#151719] rounded-b-[4px]" />
    </div>
  );
};

const PhoneMockup = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative mx-auto w-[185px] h-[360px] rounded-[32px] bg-[#0b0c0d] p-[5px] border-[2px] border-[#1e2022] shadow-[0_12px_36px_rgba(0,0,0,0.35)] overflow-hidden shrink-0">
      <div className="relative w-full h-full bg-[#030303] rounded-[27px] overflow-hidden border border-black/60 flex flex-col">
        <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-[55px] h-[12px] bg-black rounded-full z-30" />
        {children}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.02] to-white/[0.05] pointer-events-none" />
      </div>
    </div>
  );
};

interface CaseStudiesProps {
  theme?: "light" | "dark";
}

export default function CaseStudies({ theme = "light" }: CaseStudiesProps) {
  const [activeCategory, setActiveCategory] = useState("All Case Studies");

  const categories = [
    "All Case Studies",
    "AI & Automation",
    "Fintech",
    "Healthcare",
    "E-commerce",
    "SaaS",
    "Logistics"
  ];

  const gridCases = [
    {
      id: "banking",
      category: "FINTECH",
      title: "AI-Powered Digital Banking Platform",
      description: "Modernizing core banking with AI automation and intelligent fraud detection.",
      metrics: [
        { value: "75%", label: "Manual Work Reduced", icon: TrendingUp },
        { value: "99.9%", label: "Uptime Achieved", icon: Activity },
        { value: "60%", label: "Faster Transactions", icon: Zap }
      ],
      mockupType: "phone",
      screen: <BankingDashboard />,
      categories: ["Fintech", "AI & Automation", "SaaS"]
    },
    {
      id: "telemedicine",
      category: "HEALTHCARE",
      title: "Telemedicine Platform Transformation",
      description: "Built a secure, HIPAA-compliant telehealth platform with real-time analytics.",
      metrics: [
        { value: "3X", label: "User Growth", icon: TrendingUp },
        { value: "50%", label: "Cost Reduction", icon: Shield },
        { value: "45%", label: "More Appointments", icon: Calendar }
      ],
      mockupType: "laptop",
      screen: <TelehealthScreen />,
      categories: ["Healthcare", "SaaS"]
    },
    {
      id: "logistics",
      category: "LOGISTICS",
      title: "Smart Logistics & Tracking System",
      description: "Developed an end-to-end logistics solution with real-time tracking and route optimization.",
      metrics: [
        { value: "30%", label: "Fuel Cost Saved", icon: TrendingUp },
        { value: "2M+", label: "Deliveries Tracked", icon: Users },
        { value: "40%", label: "Faster Deliveries", icon: Zap }
      ],
      mockupType: "laptop",
      screen: <LogisticsMap />,
      categories: ["Logistics", "AI & Automation", "SaaS"]
    }
  ];

  const filteredGrid = activeCategory === "All Case Studies"
    ? gridCases
    : gridCases.filter(c => c.categories.includes(activeCategory));

  const showFeatured = activeCategory === "All Case Studies" || activeCategory === "E-commerce" || activeCategory === "SaaS";

  const isDark = theme === "dark";

  return (
    <section className={`py-16 border-t ${
      isDark 
        ? "bg-slate-950 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-cyan-950/20 via-slate-950 to-slate-950 text-white border-slate-900/50" 
        : "bg-slate-50 text-slate-800 border-slate-200/50"
    }`} id="case-studies">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className={`text-xs font-bold uppercase tracking-wider mb-2 block ${
            isDark ? "text-cyan-400" : "text-blue-600"
          }`}>
            CASE STUDIES
          </span>
          <h2 className={`text-3xl md:text-4xl font-extrabold tracking-tight leading-tight ${
            isDark ? "text-white" : "text-slate-900"
          }`}>
            Proven Results. Real Impact.
          </h2>
          <p className={`mt-2 text-xs leading-relaxed ${
            isDark ? "text-slate-400" : "text-slate-550"
          }`}>
            Explore how we've helped businesses overcome challenges, accelerate growth, and achieve measurable results with innovative technology.
          </p>
        </div>

        {/* Categories / Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-[11px] font-bold px-4 py-2 rounded-full border transition-all ${
                  isActive
                    ? isDark
                      ? "bg-cyan-400 border-cyan-400 text-slate-950"
                      : "bg-slate-900 border-slate-900 text-white"
                    : isDark
                      ? "bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-white"
                      : "bg-white border-slate-200 text-slate-600 hover:border-slate-350"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Featured Case Study */}
        {showFeatured && (
          <div className={`mb-8 rounded-3xl overflow-hidden shadow-sm border ${
            isDark
              ? "bg-slate-900/40 border-slate-800/60"
              : "bg-slate-950 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-cyan-950/20 via-slate-950 to-slate-950 border-slate-900/50"
          }`}>
            <div className="grid lg:grid-cols-2 gap-10 items-center p-8 sm:p-12">
              <div className="w-full order-2 lg:order-1">
                <LaptopMockup>
                  <EcomDashboard />
                </LaptopMockup>
              </div>

              <div className="w-full order-1 lg:order-2 space-y-6 text-white">
                <span className="text-[9px] font-bold uppercase tracking-wider px-3.5 py-1 rounded bg-cyan-950/40 border border-cyan-800/30 text-cyan-400">
                  FEATURED CASE STUDY
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-tight">
                  Scaling an E-commerce Brand to 8-Figure Revenue
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  We built a robust, AI-powered analytics and automation platform that streamlined operations, improved customer experience, and drove exponential revenue growth.
                </p>

                <div className="grid grid-cols-3 gap-6 pt-4 border-t border-slate-900">
                  {[
                    { value: "240%", label: "Revenue Growth", icon: TrendingUp },
                    { value: "150K+", label: "Active Customers", icon: Users },
                    { value: "35%", label: "Increase in Retention", icon: Clock }
                  ].map((metric, i) => (
                    <div key={i} className="space-y-1">
                      <div className="flex items-center gap-1.5">
                        <metric.icon className="w-4 h-4 text-cyan-400" />
                        <span className="text-lg font-black text-white">{metric.value}</span>
                      </div>
                      <p className="text-[10px] text-slate-500 font-semibold">{metric.label}</p>
                    </div>
                  ))}
                </div>

                <div className="pt-2">
                  <a href="/case-studies/ecommerce" className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-400 hover:text-cyan-300 transition-colors">
                    View Full Case Study <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Lower Grid Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGrid.map((c) => (
            <div
              key={c.id}
              className={`rounded-3xl border shadow-sm overflow-hidden flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 hover:shadow-sm ${
                isDark
                  ? "bg-slate-900/40 border-slate-800/60"
                  : "bg-white border-slate-200/60"
              }`}
            >
              <div className={`p-6 border-b flex items-center justify-center min-h-[220px] ${
                isDark
                  ? "bg-slate-950 border-slate-850"
                  : "bg-slate-50 border-slate-100"
              }`}>
                {c.mockupType === "phone" ? (
                  <PhoneMockup>{c.screen}</PhoneMockup>
                ) : (
                  <LaptopMockup>{c.screen}</LaptopMockup>
                )}
              </div>

              <div className="p-6 flex-grow flex flex-col justify-between">
                <div>
                  <span className={`text-[9px] font-bold tracking-wider uppercase px-2.5 py-1 rounded border ${
                    isDark
                      ? "bg-cyan-950/40 border-cyan-800/30 text-cyan-400"
                      : "bg-blue-50 border-blue-100/30 text-blue-600"
                  }`}>
                    {c.category}
                  </span>
                  <h4 className={`text-base font-bold mt-4 mb-2 ${
                    isDark ? "text-white" : "text-slate-900"
                  }`}>
                    {c.title}
                  </h4>
                  <p className={`text-xs leading-relaxed ${
                    isDark ? "text-slate-400" : "text-slate-550"
                  }`}>
                    {c.description}
                  </p>
                </div>

                <div className={`space-y-3 pt-4 border-t mt-6 ${
                  isDark ? "border-slate-800/60" : "border-slate-105"
                }`}>
                  {c.metrics.map((metric, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <metric.icon className={`w-4 h-4 ${isDark ? "text-cyan-400" : "text-blue-600"}`} />
                      <div>
                        <span className={`text-xs font-bold block leading-none ${
                          isDark ? "text-white" : "text-slate-900"
                        }`}>{metric.value}</span>
                        <span className="text-[10px] text-slate-500 mt-0.5 block">{metric.label}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-4">
                  <a href={`/case-studies/${c.id}`} className={`inline-flex items-center gap-1 text-xs font-bold transition-colors ${
                    isDark
                      ? "text-cyan-400 hover:text-cyan-300"
                      : "text-blue-600 hover:text-slate-950"
                  }`}>
                    View Case Study <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA Block */}
        <div className={`mt-12 rounded-3xl p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 border ${
          isDark
            ? "bg-slate-900/50 border-slate-800/60"
            : "bg-slate-950 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-cyan-950/20 via-slate-950 to-slate-950 border-slate-900/50"
        }`}>
          <div className="flex items-start gap-4">
            <MessageSquare className="w-6 h-6 text-cyan-400 mt-1" />
            <div>
              <h4 className="text-base font-bold text-white">Ready to create your success story?</h4>
              <p className="text-xs text-slate-400 mt-1">Let's build something impactful together.</p>
            </div>
          </div>
          <a href="/contact" className="px-5 py-2.5 bg-white text-slate-950 hover:bg-slate-100 rounded-full font-bold text-xs transition-all shrink-0 shadow-sm">
            Discuss Your Project
          </a>
        </div>

      </div>
    </section>
  );
}
