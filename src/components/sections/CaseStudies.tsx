"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowRight, 
  TrendingUp, 
  Users, 
  Clock, 
  Zap, 
  Calendar, 
  MapPin, 
  Shield, 
  Activity,
  MessageSquare
} from "lucide-react";

// --- Mockup Screen 1: E-commerce Sales Overview Dashboard ---
const EcomDashboard = () => {
  return (
    <div className="w-full h-full flex bg-[#0A0E1A] text-white font-sans text-[9px] p-2.5 select-none overflow-hidden">
      {/* Sidebar */}
      <div className="w-[65px] border-r border-white/[0.04] pr-1.5 flex flex-col justify-between shrink-0">
        <div>
          {/* Logo */}
          <div className="flex items-center gap-1 mb-3.5 pl-0.5">
            <div className="w-3.5 h-3.5 rounded bg-cyan-500 flex items-center justify-center text-[7px] font-bold text-black">
              E
            </div>
            <span className="font-bold text-[7.5px] tracking-tight text-white/90">Commerce</span>
          </div>
          {/* Nav */}
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

      {/* Main Content */}
      <div className="flex-1 pl-2.5 flex flex-col justify-between overflow-hidden">
        {/* Header / Top Metrics */}
        <div className="flex items-center justify-between pb-1.5 border-b border-white/[0.04]">
          <div>
            <div className="text-[6.5px] text-white/40 uppercase tracking-wider font-semibold">Total Revenue</div>
            <div className="text-[11.5px] font-bold text-white tracking-tight flex items-baseline gap-1 mt-0.5" style={{ fontFamily: "Sora, sans-serif" }}>
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

        {/* Charts Body */}
        <div className="flex-1 grid grid-cols-12 gap-2 mt-2 items-stretch overflow-hidden">
          {/* Revenue Growth Line Chart */}
          <div className="col-span-8 bg-white/[0.01] border border-white/[0.04] rounded-lg p-1.5 flex flex-col justify-between overflow-hidden">
            <div className="text-[7px] text-white/60 font-semibold mb-1">Revenue Growth</div>
            <div className="flex-1 relative min-h-[40px] flex items-end">
              {/* Grid Lines */}
              <div className="absolute inset-0 flex flex-col justify-between opacity-[0.03]">
                <div className="border-b border-white" />
                <div className="border-b border-white" />
                <div className="border-b border-white" />
              </div>
              {/* Line Graph */}
              <svg className="w-full h-[35px]" viewBox="0 0 100 30" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="chartGlow" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                <path
                  d="M0,28 Q15,22 30,12 T60,18 T90,2 L100,5 L100,30 L0,30 Z"
                  fill="url(#chartGlow)"
                />
                <path
                  d="M0,28 Q15,22 30,12 T60,18 T90,2 L100,5"
                  fill="none"
                  stroke="#06B6D4"
                  strokeWidth="1.2"
                />
              </svg>
            </div>
          </div>

          {/* Top Channels Donut Chart */}
          <div className="col-span-4 bg-white/[0.01] border border-white/[0.04] rounded-lg p-1.5 flex flex-col justify-between overflow-hidden">
            <div className="text-[6.5px] text-white/60 font-semibold mb-1">Top Channels</div>
            <div className="flex items-center justify-between gap-1">
              {/* Donut circle SVG */}
              <div className="relative w-8 h-8 shrink-0 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 32 32">
                  <circle cx="16" cy="16" r="12" fill="transparent" stroke="rgba(255,255,255,0.06)" strokeWidth="3" />
                  {/* Segment 1: Cyan (50%) */}
                  <circle cx="16" cy="16" r="12" fill="transparent" stroke="#06B6D4" strokeWidth="3" strokeDasharray="37.7 75.4" strokeDashoffset="0" />
                  {/* Segment 2: Blue (30%) */}
                  <circle cx="16" cy="16" r="12" fill="transparent" stroke="#3B82F6" strokeWidth="3" strokeDasharray="22.6 75.4" strokeDashoffset="-37.7" />
                  {/* Segment 3: Purple (20%) */}
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
      {/* Top Header */}
      <div className="flex items-center justify-between pb-1 border-b border-white/[0.03]">
        <div>
          <span className="text-[5.5px] text-white/40 block">Good morning,</span>
          <span className="text-[7.5px] font-bold text-white" style={{ fontFamily: "Sora, sans-serif" }}>Alex Johnson</span>
        </div>
        <div className="w-3.5 h-3.5 rounded-full bg-white/10 flex items-center justify-center text-[6px]">
          🔔
        </div>
      </div>

      {/* Balance Card */}
      <div className="bg-gradient-to-r from-[#0C1B33] to-[#122A52] rounded-xl p-2 border border-white/[0.04] my-1">
        <span className="text-[5px] text-white/50 block uppercase tracking-wider">Total Balance</span>
        <div className="text-[11.5px] font-bold tracking-tight text-white mt-0.5" style={{ fontFamily: "Sora, sans-serif" }}>$24,750.50</div>
        <div className="text-[5px] text-white/30 font-mono mt-1">**** **** **** 8820</div>
      </div>

      {/* Quick Actions Grid */}
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

      {/* Recent Transactions */}
      <div className="flex-1 flex flex-col justify-between mt-1.5 overflow-hidden">
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
      {/* Video Call grid */}
      <div className="flex-1 flex gap-1 items-stretch relative min-h-[45px]">
        {/* Doctor Main View */}
        <div className="flex-1 bg-zinc-900 rounded-lg relative overflow-hidden flex items-center justify-center border border-white/5">
          {/* Bottom darken gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 z-10" />
          
          {/* doctor illustration */}
          <svg className="w-[50px] h-[50px] text-slate-400 mt-2 z-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
            <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="8.5" cy="7" r="4" />
            <path d="M19 16V10a3 3 0 0 0-6 0M13 16h6" strokeWidth="1.2" stroke="#06B6D4" />
            <circle cx="13" cy="16" r="1.5" strokeWidth="1.2" stroke="#06B6D4" />
          </svg>

          {/* overlay metadata */}
          <div className="absolute bottom-1 left-1.5 z-20 flex flex-col">
            <span className="text-[7px] font-bold text-white">Dr. James Carter</span>
            <span className="text-[5px] text-cyan-400">Chief Cardiologist</span>
          </div>

          <span className="absolute top-1 left-1.5 text-[5px] bg-cyan-400/20 border border-cyan-400/30 px-1 rounded text-cyan-400 font-semibold z-20 flex items-center gap-0.5">
            <span className="w-0.5 h-0.5 bg-cyan-400 rounded-full animate-ping" />
            HD 1080p
          </span>
        </div>

        {/* Small Patient Video Window top right overlay */}
        <div className="absolute top-1 right-1 w-[28px] h-[36px] bg-zinc-800 rounded border border-white/10 overflow-hidden flex items-center justify-center z-20">
          <svg className="w-5 h-5 text-slate-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
            <path d="M18 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="11" cy="7" r="4" />
          </svg>
        </div>
      </div>

      {/* Control bar */}
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
      {/* Map Graphics */}
      <div className="flex-1 relative rounded-lg overflow-hidden border border-white/5 bg-[#090D14]">
        {/* Grid dots */}
        <div className="absolute inset-0 opacity-15" style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)",
          backgroundSize: "8px 8px"
        }} />

        {/* Streets representation */}
        <svg className="absolute inset-0 w-full h-full opacity-35" viewBox="0 0 100 100" preserveAspectRatio="none">
          <line x1="15" y1="0" x2="15" y2="100" stroke="#475569" strokeWidth="1.2" />
          <line x1="45" y1="0" x2="45" y2="100" stroke="#475569" strokeWidth="1.2" />
          <line x1="80" y1="0" x2="80" y2="100" stroke="#475569" strokeWidth="1.2" />
          <line x1="0" y1="25" x2="100" y2="25" stroke="#475569" strokeWidth="1.2" />
          <line x1="0" y1="60" x2="100" y2="60" stroke="#475569" strokeWidth="1.2" />
        </svg>

        {/* Active Route path */}
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
          {/* Origin */}
          <circle cx="15" cy="25" r="1.5" fill="#3b82f6" />
          {/* Destination */}
          <circle cx="80" cy="60" r="2.5" fill="#ef4444" />
          <circle cx="80" cy="60" r="4" fill="none" stroke="#ef4444" strokeWidth="1" className="animate-ping" />
          {/* Truck Position */}
          <circle cx="45" cy="40" r="3" fill="#22c55e" />
          <circle cx="45" cy="40" r="1" fill="#ffffff" />
        </svg>

        {/* Floating status card */}
        <div className="absolute top-1 left-1.5 bg-black/85 border border-white/10 rounded p-1 backdrop-blur-sm z-10 text-[5px]">
          <span className="text-[#22c55e] font-bold block">🚚 TRK-982701 in transit</span>
          <span className="text-white/60 block mt-0.5">ETA: 14 mins</span>
        </div>
      </div>

      {/* Stats bar */}
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
      {/* Screen Shell */}
      <div className="relative w-full h-[93%] rounded-t-[18px] bg-[#0c0d0e] p-[2%] border-[2px] border-[#1e2022] shadow-[0_12px_36px_rgba(0,0,0,0.5)] overflow-hidden">
        {/* Inner Screen */}
        <div className="relative w-full h-full bg-[#030303] rounded-[3px] overflow-hidden border border-black/40">
          {children}
          {/* Glossy Reflective Highlight */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.02] to-white/[0.06] pointer-events-none" />
        </div>
      </div>
      {/* Base / Keyboard hinge */}
      <div className="absolute bottom-[2%] left-[-4%] right-[-4%] h-[5%] bg-gradient-to-b from-[#2d3135] to-[#151719] rounded-t-[4px] rounded-b-[10px] border-t border-[#464c52] shadow-[0_8px_16px_rgba(0,0,0,0.3)]" />
      {/* Lip notch */}
      <div className="absolute bottom-0 left-[45%] right-[45%] h-[2%] bg-[#151719] rounded-b-[4px]" />
    </div>
  );
};

const PhoneMockup = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative mx-auto w-[185px] h-[360px] rounded-[32px] bg-[#0b0c0d] p-[5px] border-[2px] border-[#1e2022] shadow-[0_12px_36px_rgba(0,0,0,0.35)] overflow-hidden shrink-0">
      {/* Screen */}
      <div className="relative w-full h-full bg-[#030303] rounded-[27px] overflow-hidden border border-black/60 flex flex-col">
        {/* Dynamic Island */}
        <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-[55px] h-[12px] bg-black rounded-full z-30" />
        {children}
        {/* Glossy Shine */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.02] to-white/[0.05] pointer-events-none" />
      </div>
    </div>
  );
};

export default function CaseStudies() {
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

  // Cases Grid Data
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

  // Filter grid cases dynamically
  const filteredGrid = activeCategory === "All Case Studies"
    ? gridCases
    : gridCases.filter(c => c.categories.includes(activeCategory));

  // Determine if featured e-commerce is displayed
  const showFeatured = activeCategory === "All Case Studies" || activeCategory === "E-commerce" || activeCategory === "SaaS";

  return (
    <section className="relative overflow-hidden py-20 bg-[#F8FAFC] z-30" id="case-studies">
      {/* Light Mesh ambient background design */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-[10%] left-[10%] w-[500px] h-[500px] rounded-full bg-cyan-100/40 blur-[120px]" />
        <div className="absolute bottom-[10%] right-[10%] w-[600px] h-[600px] rounded-full bg-blue-100/30 blur-[130px]" />
      </div>

      <div className="ng-container relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          {/* Badge */}
          <div className="inline-flex mb-4">
            <span className="text-[11px] font-bold uppercase tracking-[0.15em] px-4 py-1.5 rounded-full border border-cyan-500/20 bg-cyan-50 text-[#0891B2] shadow-sm">
              CASE STUDIES
            </span>
          </div>
          
          <h2 className="text-[36px] md:text-[44px] font-extrabold text-[#0F172A] leading-tight mb-4" style={{ fontFamily: "Sora, sans-serif" }}>
            Proven Results. <span className="text-[#0891B2]">Real Impact.</span>
          </h2>
          
          <p className="text-[14px] md:text-[15px] leading-relaxed text-[#475569]">
            Explore how we've helped businesses overcome challenges, accelerate growth, and achieve measurable results with innovative technology.
          </p>
        </div>

        {/* Categories / Filters Stack */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-[12.5px] font-semibold px-4.5 py-2 rounded-full border transition-all duration-300 cursor-pointer ${
                  isActive
                    ? "bg-[#06B6D4] border-[#06B6D4] text-white shadow-md shadow-cyan-500/10 scale-102"
                    : "bg-white border-[#E2E8F0] text-[#475569] hover:border-[#06B6D4]/55 hover:text-[#0F172A]"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Featured Case Study (E-commerce) */}
        <AnimatePresence mode="wait">
          {showFeatured && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="mb-8"
            >
              <div 
                className="relative rounded-[32px] overflow-hidden border border-white/10 shadow-[0_24px_70px_rgba(0,0,0,0.4)]"
                style={{
                  background: "linear-gradient(135deg, #0A0F1D 0%, #070A13 100%)",
                }}
              >
                {/* Tech dotted overlay */}
                <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{
                  backgroundImage: "radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)",
                  backgroundSize: "20px 20px"
                }} />

                <div className="grid lg:grid-cols-2 gap-10 items-center p-8 sm:p-12 lg:p-16">
                  {/* Left Column: CSS Laptop Mockup */}
                  <div className="w-full order-2 lg:order-1">
                    <LaptopMockup>
                      <EcomDashboard />
                    </LaptopMockup>
                  </div>

                  {/* Right Column: Case study content */}
                  <div className="w-full order-1 lg:order-2 space-y-6 text-white">
                    <div className="inline-flex">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full border border-cyan-500/35 bg-cyan-950/40 text-cyan-400">
                        FEATURED CASE STUDY
                      </span>
                    </div>

                    <div className="space-y-2">
                      <span className="text-[11px] font-extrabold uppercase tracking-widest text-cyan-500 block">
                        E-COMMERCE
                      </span>
                      <h3 className="text-[26px] sm:text-[32px] font-extrabold text-white leading-tight tracking-tight" style={{ fontFamily: "Sora, sans-serif" }}>
                        Scaling an E-commerce Brand to 8-Figure Revenue
                      </h3>
                    </div>

                    <p className="text-[13.5px] leading-relaxed text-[#94A3B8]">
                      We built a robust, AI-powered analytics and automation platform that streamlined operations, improved customer experience, and drove exponential revenue growth.
                    </p>

                    {/* Metrics Row */}
                    <div className="grid grid-cols-3 gap-6 pt-4 border-t border-white/[0.06]">
                      {[
                        { value: "240%", label: "Revenue Growth", icon: TrendingUp },
                        { value: "150K+", label: "Active Customers", icon: Users },
                        { value: "35%", label: "Increase in Retention", icon: Clock }
                      ].map((metric, i) => (
                        <div key={i} className="space-y-1">
                          <div className="flex items-center gap-1.5">
                            <metric.icon className="w-4 h-4 text-cyan-400" />
                            <span className="text-[20px] font-black text-white" style={{ fontFamily: "Sora, sans-serif" }}>{metric.value}</span>
                          </div>
                          <p className="text-[11px] text-[#64748B] font-semibold">{metric.label}</p>
                        </div>
                      ))}
                    </div>

                    {/* Link */}
                    <div className="pt-2">
                      <a 
                        href="/case-studies/ecommerce" 
                        className="inline-flex items-center gap-2 group text-[13.5px] font-bold text-cyan-400 hover:text-cyan-300 transition-colors"
                      >
                        View Full Case Study
                        <div className="w-6 h-6 rounded-full border border-cyan-500/40 flex items-center justify-center transition-all group-hover:bg-cyan-500/10 group-hover:border-cyan-400">
                          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Lower Grid Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredGrid.map((c) => (
              <motion.div
                key={c.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-[28px] border border-[#E2E8F0] shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col justify-between"
              >
                {/* Mockup Preview Area */}
                <div className="bg-[#FAFBFD] p-6 border-b border-[#E2E8F0] flex items-center justify-center min-h-[220px]">
                  {c.mockupType === "phone" ? (
                    <PhoneMockup>{c.screen}</PhoneMockup>
                  ) : (
                    <LaptopMockup>{c.screen}</LaptopMockup>
                  )}
                </div>

                {/* Content Area */}
                <div className="p-7 flex-1 flex flex-col justify-between space-y-5">
                  <div className="space-y-3">
                    <div className="inline-flex">
                      <span className="text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full border border-cyan-500/15 bg-cyan-50/50 text-[#0891B2]">
                        {c.category}
                      </span>
                    </div>

                    <h4 className="text-[17px] font-bold text-[#0F172A] tracking-tight leading-snug" style={{ fontFamily: "Sora, sans-serif" }}>
                      {c.title}
                    </h4>

                    <p className="text-[13px] leading-relaxed text-[#475569]">
                      {c.description}
                    </p>
                  </div>

                  {/* Vertical Metrics Stack */}
                  <div className="space-y-3 pt-4 border-t border-[#E2E8F0]">
                    {c.metrics.map((metric, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="w-7 h-7 rounded-lg bg-cyan-50 flex items-center justify-center">
                          <metric.icon className="w-4 h-4 text-[#0891B2]" />
                        </div>
                        <div>
                          <span className="text-[13.5px] font-bold text-[#0F172A] block leading-none">{metric.value}</span>
                          <span className="text-[11px] text-[#64748B] mt-0.5 block font-medium">{metric.label}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Link */}
                  <div className="pt-2">
                    <a 
                      href={`/case-studies/${c.id}`} 
                      className="inline-flex items-center gap-1.5 text-[13px] font-bold text-[#0891B2] hover:text-[#06B6D4] transition-colors group"
                    >
                      View Case Study
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Bottom CTA Block inside Case Studies */}
        <div className="mt-12">
          <div 
            className="rounded-[24px] p-8 sm:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-6 border border-white/5 shadow-xl"
            style={{
              background: "linear-gradient(90deg, #070E1B 0%, #0C1930 100%)",
            }}
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 mt-1">
                <MessageSquare className="w-5 h-5 text-cyan-400" />
              </div>
              <div>
                <h4 className="text-[18px] font-bold text-white tracking-tight" style={{ fontFamily: "Sora, sans-serif" }}>
                  Ready to create your success story?
                </h4>
                <p className="text-[13.5px] text-[#94A3B8] mt-1">
                  Let's build something impactful together.
                </p>
              </div>
            </div>

            <a 
              href="/contact" 
              className="px-6 py-3 bg-white text-[#070E1B] hover:bg-cyan-50 rounded-full font-bold text-[13.5px] transition-all duration-300 inline-flex items-center gap-2 shadow-lg shadow-white/5 shrink-0 scale-100 hover:scale-102 cursor-pointer"
            >
              Discuss Your Project
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
