"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Code2, Smartphone, Layers, Brain, Cloud, Server,
  BarChart3, Palette, Settings2, TrendingUp,
  ChevronDown, Menu, X, ArrowRight,
  MessageSquare, FileText, Search, Share2, Users, Shield, Video, PenTool, Target, Layout
} from "lucide-react";
import { cn } from "@/lib/utils";

function LogoMark({ size = 42 }: { size?: number }) {
  return (
    <img
      src="/images/logo.png"
      alt="NextGen Tech Solutions"
      style={{
        height: `${size}px`,
        width: "auto",
        display: "block",
        objectFit: "contain",
        maxWidth: "180px",
      }}
      onError={(e) => {
        e.currentTarget.style.display = "none";
      }}
    />
  );
}

const megaMenuData = {
  development: {
    label: "Development",
    desc: "Custom software & web engineering",
    icon: Code2,
    color: "#06B6D4",
    items: [
      { label: "Web Development", href: "/services/web", icon: Code2, desc: "Modern full-stack applications" },
      { label: "Mobile App Development", href: "/services/mobile", icon: Smartphone, desc: "iOS & Android native apps" },
      { label: "SaaS Platforms", href: "/services/saas", icon: Layers, desc: "Scalable multi-tenant platforms" },
      { label: "AI & ML Solutions", href: "/services/ai", icon: Brain, desc: "Intelligent automation & analytics" },
      { label: "Cloud Services", href: "/services/cloud", icon: Cloud, desc: "AWS, Azure & GCP expertise" },
      { label: "DevOps & CI/CD", href: "/services/devops", icon: Server, desc: "Infrastructure & deployment" },
    ]
  },
  marketing: {
    label: "Digital Marketing",
    desc: "Reach, engage & scale audience",
    icon: TrendingUp,
    color: "#22C55E",
    items: [
      { label: "WhatsApp Marketing", href: "/services/whatsapp-marketing", icon: MessageSquare, desc: "Automated broadcast & campaigns" },
      { label: "Content Marketing", href: "/services/content-marketing", icon: FileText, desc: "High-converting copy & strategic content" },
      { label: "Search Engine Optimization", href: "/services/seo", icon: Search, desc: "Rank page 1 on Google & search engines" },
      { label: "Social Media Marketing", href: "/services/social-media-marketing", icon: Share2, desc: "Engaging audience growth & content creation" },
      { label: "Paid Ads (PPC)", href: "/services/ppc", icon: Target, desc: "Targeted Meta & Google ad campaigns" },
      { label: "Influencer Marketing", href: "/services/influencer-marketing", icon: Users, desc: "Scale reach via trusted creators" },
      { label: "Digital Marketing Services", href: "/services/digital-marketing", icon: Layout, desc: "Full-scale growth optimization" },
    ]
  },
  branding: {
    label: "Branding",
    desc: "Visual identity & ORM positioning",
    icon: Palette,
    color: "#EC4899",
    items: [
      { label: "Online Reputation Management", href: "/services/orm", icon: Shield, desc: "Manage public image & brand reputation" },
      { label: "3D Video Editing", href: "/services/3d-video-editing", icon: Video, desc: "Premium 3D visuals & cinematic cuts" },
      { label: "Still Branding", href: "/services/still-branding", icon: Palette, desc: "Logo, design systems, and identity assets" },
      { label: "Performance Marketing", href: "/services/performance-marketing", icon: TrendingUp, desc: "Data-driven creative validation & ROI growth" },
      { label: "Graphic Designing", href: "/services/graphic-designing", icon: PenTool, desc: "Modern marketing collateral & layouts" },
    ]
  }
};

const navLinks = [
  { label: "Home",      href: "/" },
  { label: "About",     href: "/about" },
  { label: "Services",  href: "/services", hasMenu: true },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Blog",      href: "/blog" },
  { label: "Careers",   href: "/careers" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"development" | "marketing" | "branding">("development");
  const pathname = usePathname();
  const megaTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [prevPathname, setPrevPathname] = useState(pathname);
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setMobileOpen(false);
    setMegaOpen(false);
  }

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const onMegaEnter = () => {
    if (megaTimer.current) clearTimeout(megaTimer.current);
    setMegaOpen(true);
  };
  const onMegaLeave = () => {
    megaTimer.current = setTimeout(() => setMegaOpen(false), 180);
  };

  const isHomepage = pathname === "/";
  const showScrolledNavbar = scrolled || !isHomepage;

  return (
    <>
      <header
        role="banner"
        className={cn(
          "fixed left-0 right-0 z-50 mx-auto transition-all duration-300",
          showScrolledNavbar
            ? "w-[calc(100%-40px)] md:w-[calc(100%-64px)] max-w-[1400px] top-3 rounded-full bg-slate-900/95 border border-slate-800 shadow-xl backdrop-blur-md py-2.5"
            : "w-full max-w-full top-0 bg-transparent py-5"
        )}
      >
        <div className={cn(
          "ng-container relative flex items-center justify-between gap-8 w-full"
        )}>
          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0 group" aria-label="NextGen Tech Solutions — Home">
            <LogoMark size={scrolled ? 34 : 42} />
          </Link>          {/* Desktop Nav */}
          <nav
            className="hidden lg:flex items-center gap-1.5 flex-1 justify-center relative"
            role="navigation"
            aria-label="Main navigation"
          >
            {navLinks.map((link) => {
              const isActive = link.hasMenu
                ? pathname.startsWith("/services")
                : pathname === link.href;

              return link.hasMenu ? (
                <div
                  key={link.label}
                  className="relative py-2"
                  onMouseEnter={onMegaEnter}
                  onMouseLeave={onMegaLeave}
                >
                  <Link
                    href={link.href}
                    className={cn(
                      "font-sora relative inline-flex items-center gap-1 rounded-lg text-[13.5px] font-semibold transition-all px-3 py-1.5 duration-200 group/nav",
                      isActive ? "text-cyan-400" : "text-slate-400 hover:text-white"
                    )}
                    aria-expanded={megaOpen}
                    aria-haspopup="true"
                  >
                    <span>{link.label}</span>
                    <ChevronDown
                      className={cn(
                        "w-3 h-3 text-slate-500 group-hover/nav:text-white transition-all duration-200 ml-0.5 mt-0.5",
                        megaOpen && "rotate-180 text-cyan-400"
                      )}
                    />
                    {isActive && (
                      <span className="absolute bottom-[-10px] left-3 right-3 h-[2px] bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
                    )}
                  </Link>

                  {/* Mega Menu with animation */}
                  <div
                    className={cn(
                      "absolute top-[calc(100%-4px)] left-1/2 -translate-x-1/2 mt-3 w-[860px] bg-[#08080c]/98 border border-slate-800/80 rounded-2xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] overflow-hidden flex transition-all duration-300 origin-top z-50 backdrop-blur-xl",
                      megaOpen
                        ? "opacity-100 scale-100 pointer-events-auto translate-y-0"
                        : "opacity-0 scale-95 pointer-events-none -translate-y-2"
                    )}
                    onMouseEnter={onMegaEnter}
                    onMouseLeave={onMegaLeave}
                    role="menu"
                    aria-label="Services menu"
                  >
                    {/* Top gradient highlight line */}
                    <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-cyan-500/40 via-blue-500/20 to-transparent" />

                    {/* Left Pane: Categories / Tabs */}
                    <div className="w-[260px] bg-[#050508] p-5 border-r border-slate-800/60 flex flex-col gap-2 shrink-0 relative z-10 pt-6">
                      <p className="text-[9.5px] font-bold text-slate-500 uppercase tracking-[0.15em] px-2.5 mb-3 select-none">
                        Categories
                      </p>
                      {Object.entries(megaMenuData).map(([key, tab]) => {
                        const TabIcon = tab.icon;
                        const isActiveTab = activeTab === key;
                        return (
                          <button
                            key={key}
                            type="button"
                            onMouseEnter={() => setActiveTab(key as any)}
                            onClick={() => setActiveTab(key as any)}
                            className={cn(
                              "flex items-center gap-3.5 w-full p-3 rounded-xl transition-all text-left cursor-pointer relative border outline-none group/btn",
                              isActiveTab
                                ? "bg-slate-900 border-slate-800/80 text-white shadow-lg shadow-black/40"
                                : "bg-transparent border-transparent text-slate-400 hover:text-white hover:bg-slate-900/30"
                            )}
                          >
                            {isActiveTab && (
                              <span className="absolute left-0 top-3.5 bottom-3.5 w-[3px] bg-cyan-400 rounded-r" />
                            )}
                            <div
                              className="w-8.5 h-8.5 rounded-lg flex items-center justify-center shrink-0 border transition-all duration-300"
                              style={{
                                background: isActiveTab ? "rgba(6, 182, 212, 0.08)" : "rgba(255, 255, 255, 0.02)",
                                borderColor: isActiveTab ? "rgba(6, 182, 212, 0.2)" : "rgba(255, 255, 255, 0.06)",
                                color: isActiveTab ? "#06B6D4" : "#64748b",
                              }}
                            >
                              <TabIcon className="w-4 h-4 transition-transform duration-300 group-hover/btn:scale-110" />
                            </div>
                            <div className="min-w-0">
                              <p className="text-[12.5px] font-bold leading-tight font-sora truncate">{tab.label}</p>
                              <span className={cn(
                                "text-[10px] block mt-0.5 leading-none transition-colors",
                                isActiveTab ? "text-cyan-400/80 font-medium" : "text-slate-555"
                              )}>
                                {tab.items.length} services
                              </span>
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    {/* Right Pane: Grid of items for the active tab */}
                    <div className="flex-1 p-6 bg-slate-900/40 flex flex-col justify-between relative z-10 pt-6">
                      <div>
                        {/* Header Area */}
                        <div className="mb-4 pb-3 border-b border-slate-850 flex items-center justify-between px-1">
                          <div>
                            <h3 className="text-sm font-extrabold text-white font-sora tracking-tight">
                              {megaMenuData[activeTab].label} Services
                            </h3>
                            <p className="text-[10.5px] text-slate-500 mt-0.5 leading-normal">
                              {megaMenuData[activeTab].desc}
                            </p>
                          </div>
                          <span className="text-[9.5px] font-bold px-2 py-0.5 rounded bg-slate-950/80 border border-slate-800 text-slate-400 font-mono tracking-wider select-none uppercase">
                            {megaMenuData[activeTab].items.length} available
                          </span>
                        </div>

                        {/* Services Card Grid */}
                        <div className="grid grid-cols-2 gap-3">
                          {megaMenuData[activeTab].items.map((s) => {
                            const ItemIcon = s.icon;
                            return (
                              <Link
                                key={s.label}
                                href={s.href}
                                role="menuitem"
                                className="group/card flex items-center justify-between p-3.5 rounded-xl bg-slate-950/30 border border-slate-800/50 hover:bg-slate-950/80 hover:border-slate-700/80 transition-all duration-300 hover:shadow-lg hover:shadow-black/20"
                              >
                                <div className="flex items-center gap-3.5 min-w-0">
                                  <div className="p-2 rounded-lg shrink-0 bg-slate-900 border border-slate-850 text-slate-400 group-hover/card:bg-cyan-950/30 group-hover/card:border-cyan-500/30 group-hover/card:text-cyan-400 transition-all duration-300">
                                    <ItemIcon className="w-4 h-4" />
                                  </div>
                                  <div className="min-w-0">
                                    <h4 className="text-[12.5px] font-bold text-white leading-tight font-sora flex items-center gap-1.5 truncate">
                                      {s.label}
                                      <span className="text-[10px] text-cyan-400 select-none opacity-40 group-hover/card:opacity-100 transition-opacity">★</span>
                                    </h4>
                                    <p className="text-[10px] text-slate-500 mt-1 leading-normal group-hover/card:text-slate-400 transition-colors truncate max-w-[200px]">
                                      {s.desc}
                                    </p>
                                  </div>
                                </div>
                                <div className="shrink-0 pl-2 opacity-30 group-hover/card:opacity-100 group-hover/card:translate-x-0.5 transition-all duration-300">
                                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover/card:text-cyan-400" />
                                </div>
                              </Link>
                            );
                          })}
                        </div>
                      </div>

                      {/* Footer Actions */}
                      <div className="pt-4 border-t border-slate-850 mt-6 flex items-center justify-between">
                        <span className="text-[9px] text-slate-555 font-medium font-mono uppercase tracking-wider">
                          Select a category to explore services
                        </span>
                        <Link
                          href="/services"
                          className="group/all flex items-center gap-1 text-xs font-bold text-cyan-400 hover:text-cyan-300 transition-colors font-sora"
                        >
                          View All Services
                          <ArrowRight className="w-3.5 h-3.5 group-hover/all:translate-x-0.5 transition-transform" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={link.label}
                  href={link.href}
                  className={cn(
                    "font-sora relative inline-flex items-center gap-1.5 rounded-lg text-[13.5px] font-semibold transition-all px-3 py-2 duration-200",
                    isActive ? "text-cyan-400" : "text-slate-400 hover:text-white"
                  )}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/contact"
              className="hidden sm:inline-flex items-center gap-1.5 bg-cyan-400 hover:bg-cyan-500 text-slate-950 px-5 py-2.5 rounded-full text-sm font-bold shadow-lg transition-all hover:-translate-y-0.5"
            >
              Get Started
              <ArrowRight className="w-4 h-4" />
            </Link>

            {/* Hamburger */}
            <button
              className="lg:hidden w-10 h-10 rounded-lg flex items-center justify-center border border-slate-800 bg-slate-900 text-slate-400 hover:text-white transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-slate-950/80 backdrop-blur-sm lg:hidden"
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
          />
          <aside
            id="mobile-menu"
            className="fixed top-0 right-0 bottom-0 z-50 w-72 bg-slate-900 border-l border-slate-800 p-6 lg:hidden"
            aria-label="Mobile navigation"
          >
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-800">
              <LogoMark size={36} />
              <button
                onClick={() => setMobileOpen(false)}
                className="w-9 h-9 rounded-lg flex items-center justify-center bg-slate-800 text-slate-400 hover:text-white transition-colors"
                aria-label="Close navigation menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav aria-label="Mobile navigation links">
              <div className="space-y-1">
                {[...navLinks, { label: "Contact", href: "/contact" }].map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className={cn(
                      "flex items-center justify-between px-4 py-3 rounded-lg text-sm font-bold transition-all",
                      pathname === link.href ? "text-cyan-400 bg-cyan-950/20" : "text-slate-400 hover:text-white hover:bg-slate-800"
                    )}
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                    <ArrowRight className="w-4 h-4 opacity-30" />
                  </Link>
                ))}
              </div>

              <div className="pt-4 mt-4 border-t border-slate-800">
                <Link
                  href="/contact"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-3.5 rounded-lg text-sm font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-500 transition-colors"
                >
                  Start a Project
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </nav>
          </aside>
        </>
      )}
    </>
  );
}
