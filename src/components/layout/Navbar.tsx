"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Code2, Smartphone, Layers, Brain, Cloud, Server,
  ChevronDown, Menu, X, ArrowRight,
  MessageSquare, FileText, Search, Share2, Users, Shield, Video, PenTool, Target, Layout,
  Phone, Mail, MapPin
} from "lucide-react";
import { FaFacebookF, FaLinkedinIn, FaInstagram, FaYoutube, FaWhatsapp } from "react-icons/fa";
import { cn } from "@/lib/utils";
import { COMPANY } from "@/lib/utils";

function LogoMark({ size = 52 }: { size?: number }) {
  return (
    <img
      src="/images/logo.png"
      alt="NextGen Tech Solutions"
      style={{
        height: `${size}px`,
        width: "auto",
        display: "block",
        objectFit: "contain",
        maxWidth: "220px",
        transition: "all 0.5s ease-in-out",
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
    color: "#7C3AED",
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
    icon: Target,
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
      { label: "Performance Marketing", href: "/services/performance-marketing", icon: Target, desc: "Data-driven creative validation & ROI growth" },
      { label: "Graphic Designing", href: "/services/graphic-designing", icon: PenTool, desc: "Modern marketing collateral & layouts" },
    ]
  }
};

// Custom Palette icon wrapper since we imported Lucide icons dynamically
function Palette(props: any) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 14.7255 3.09032 17.1962 4.85857 19C5.03444 19.1759 5.27557 19.2684 5.52552 19.25C6.73489 19.1611 7.8285 18.5822 8.5 17.6L9.5 16.1C9.8 15.6 10.4 15.3 11 15.3H12.5C13.9 15.3 15 14.2 15 12.8C15 12.2 14.8 11.7 14.4 11.3L13 9.9C12.6 9.5 12.4 9 12.4 8.4V7.5C12.4 6.1 13.5 5 14.9 5C16.3 5 17.4 6.1 17.4 7.5V8.5C17.4 9.1 17.9 9.6 18.5 9.6C19.1 9.6 19.6 9.1 19.6 8.5V7.5C19.6 4.5 17.1 2 14 2" />
    </svg>
  );
}

const navLinks = [
  { label: "Home",      href: "/" },
  { label: "About",     href: "/about" },
  { label: "Services",  href: "/services", hasMenu: true },
  { label: "Solutions", href: "/solutions" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Blog",      href: "/blog" },
  { label: "Careers",   href: "/careers" },
];

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const [scrolled, setScrolled] = useState(!isHome); // inner pages start scrolled
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"development" | "marketing" | "branding">("development");
  const megaTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!isHome) {
      setScrolled(true);
      return;
    }
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome]);


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

  return (
    <>
      <header
        role="banner"
        className={cn(
          "fixed left-0 right-0 top-0 w-full z-50 transition-all duration-500 ease-in-out border-b",
          scrolled
            ? "bg-white border-slate-200/85 shadow-[0_4px_16px_-4px_rgba(0,0,0,0.06)]"
            : "bg-transparent border-transparent"
        )}
      >
        {/* Level 1: Premium Solid Purple Top Bar (Only visible when scrolled & on Desktop) */}
        {/* Compact layout with py-1.5, smaller contact badges and icons */}
        <div className={cn(
          "hidden lg:grid w-full bg-[#7C3AED] text-white transition-all duration-500 ease-in-out overflow-hidden",
          scrolled ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0 pointer-events-none"
        )}>
          <div className="overflow-hidden w-full">
            <div className="flex items-center justify-between gap-4 w-full px-6 py-1.5 mx-auto max-w-[1400px]">
              {/* Left Side: Circular Badges for Phone, Email & Location */}
              <div className="flex items-center gap-4 xl:gap-6 text-[11px] font-semibold text-white/95">
                <a href={`tel:${COMPANY.phone}`} className="flex items-center gap-2 hover:opacity-90 transition-opacity">
                  <div className="w-5.5 h-5.5 rounded-full bg-white text-[#7C3AED] flex items-center justify-center shrink-0 shadow-sm transition-transform hover:scale-105">
                    <Phone className="w-2.5 h-2.5 fill-current" />
                  </div>
                  <span>{COMPANY.phone}</span>
                </a>
                <a href={`mailto:${COMPANY.email}`} className="flex items-center gap-2 hover:opacity-90 transition-opacity">
                  <div className="w-5.5 h-5.5 rounded-full bg-white text-[#7C3AED] flex items-center justify-center shrink-0 shadow-sm transition-transform hover:scale-105">
                    <Mail className="w-2.5 h-2.5" />
                  </div>
                  <span>{COMPANY.email}</span>
                </a>
                <div className="hidden xl:flex items-center gap-2">
                  <div className="w-5.5 h-5.5 rounded-full bg-white text-[#7C3AED] flex items-center justify-center shrink-0 shadow-sm">
                    <MapPin className="w-2.5 h-2.5" />
                  </div>
                  <span>{COMPANY.city}, {COMPANY.state}</span>
                </div>
              </div>

              {/* Right Side: Working hours, Socials, Green WhatsApp */}
              <div className="flex items-center gap-3.5 xl:gap-5">
                {/* Working Hours */}
                <span className="text-[10px] text-white/80 font-bold font-sora hidden 2xl:inline-block">
                  Mon - Sat: 9:00 AM - 6:00 PM
                </span>

                {/* Premium Social Icons (White Circle with Purple Icons) */}
                <div className="flex items-center gap-1.5">
                  {/* LinkedIn */}
                  <a href={COMPANY.social.linkedin} target="_blank" rel="noopener noreferrer" className="w-5.5 h-5.5 rounded-full bg-white text-[#7C3AED] flex items-center justify-center hover:scale-110 hover:bg-slate-100 transition-all shadow-sm" aria-label="LinkedIn">
                    <FaLinkedinIn className="w-2.5 h-2.5" />
                  </a>
                  {/* Twitter/X */}
                  <a href={COMPANY.social.twitter} target="_blank" rel="noopener noreferrer" className="w-5.5 h-5.5 rounded-full bg-white text-[#7C3AED] flex items-center justify-center hover:scale-110 hover:bg-slate-100 transition-all shadow-sm" aria-label="Twitter">
                    <svg viewBox="0 0 24 24" className="w-2.5 h-2.5 fill-current"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                  </a>
                  {/* Instagram */}
                  <a href={COMPANY.social.instagram} target="_blank" rel="noopener noreferrer" className="w-5.5 h-5.5 rounded-full bg-white text-[#7C3AED] flex items-center justify-center hover:scale-110 hover:bg-slate-100 transition-all shadow-sm" aria-label="Instagram">
                    <FaInstagram className="w-2.5 h-2.5" />
                  </a>
                  {/* Facebook */}
                  <a href={COMPANY.social.facebook} target="_blank" rel="noopener noreferrer" className="w-5.5 h-5.5 rounded-full bg-white text-[#7C3AED] flex items-center justify-center hover:scale-110 hover:bg-slate-100 transition-all shadow-sm" aria-label="Facebook">
                    <FaFacebookF className="w-2 h-2" />
                  </a>
                  {/* YouTube */}
                  <a href={COMPANY.social.youtube} target="_blank" rel="noopener noreferrer" className="w-5.5 h-5.5 rounded-full bg-white text-[#7C3AED] flex items-center justify-center hover:scale-110 hover:bg-slate-100 transition-all shadow-sm" aria-label="YouTube">
                    <FaYoutube className="w-2.5 h-2.5" />
                  </a>
                </div>

                {/* WhatsApp green CTA */}
                <a
                  href={`https://wa.me/${COMPANY.whatsapp.replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#25D366] hover:bg-[#20ba5a] text-white px-3 py-1 rounded-full text-[10px] font-extrabold flex items-center gap-1 transition-all shadow-sm"
                >
                  <FaWhatsapp className="w-3 h-3" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Level 2: Navigation & Branding (Desktop Only) */}
        <div className={cn(
          "hidden lg:flex items-center justify-between w-full px-6 mx-auto max-w-[1400px] transition-all duration-500 ease-in-out",
          scrolled ? "py-3" : "py-6"
        )}>
          {/* Logo on Left */}
          <Link href="/" className="flex items-center shrink-0 group" aria-label="NextGen Tech Solutions — Home">
            <LogoMark size={scrolled ? 46 : 56} />
          </Link>

          {/* Centered Navigation Menu */}
          <nav
            className="flex items-center gap-1.5 xl:gap-3.5 relative"
            role="navigation"
            aria-label="Main navigation"
          >
            {navLinks.map((link) => {
              const isActive = link.hasMenu
                ? pathname.startsWith("/services")
                : pathname === link.href;

              return link.hasMenu ? (
                /* Wrapper div is now flex container so child is perfectly aligned vertically with other links */
                <div
                  key={link.label}
                  className="relative flex items-center h-full group"
                  onMouseEnter={onMegaEnter}
                  onMouseLeave={onMegaLeave}
                >
                  <Link
                    href={link.href}
                    className={cn(
                      "font-sora uppercase tracking-wider relative inline-flex items-center gap-1 text-[11.5px] font-extrabold transition-all duration-500 ease-in-out group/nav px-3 py-1.5",
                      scrolled
                        ? (isActive ? "text-[#7C3AED]" : "text-black hover:text-[#7C3AED]")
                        : (isActive ? "text-white" : "text-white/85 hover:text-white")
                    )}
                    aria-expanded={megaOpen}
                    aria-haspopup="true"
                  >
                    <span>{link.label}</span>
                    <ChevronDown
                      className={cn(
                        "w-3 h-3 transition-all duration-500 ease-in-out ml-0.5",
                        scrolled
                          ? (isActive ? "text-[#7C3AED]" : "text-slate-500 group-hover/nav:text-[#7C3AED]")
                          : (isActive ? "text-white" : "text-white/60 group-hover/nav:text-white"),
                        megaOpen && (scrolled ? "text-[#7C3AED] rotate-180" : "text-white rotate-180")
                      )}
                    />
                    {isActive && (
                      <span className={cn(
                        "absolute bottom-[-10px] left-3 right-3 h-[2.5px] rounded-full transition-all duration-500 ease-in-out",
                        scrolled ? "bg-[#7C3AED]" : "bg-white"
                      )} />
                    )}
                  </Link>

                  {/* Mega Menu with responsive width parameters to prevent clipping */}
                  <div
                    className={cn(
                      "absolute top-[calc(100%-2px)] left-1/2 -translate-x-1/2 mt-2.5 w-[95vw] lg:w-[800px] xl:w-[860px] overflow-hidden flex transition-all duration-500 ease-in-out origin-top z-50 backdrop-blur-xl rounded-2xl bg-white border border-slate-200 shadow-2xl text-slate-800",
                      megaOpen
                        ? "opacity-100 scale-100 pointer-events-auto translate-y-0"
                        : "opacity-0 scale-95 pointer-events-none -translate-y-2"
                    )}
                    onMouseEnter={onMegaEnter}
                    onMouseLeave={onMegaLeave}
                    role="menu"
                    aria-label="Services menu"
                  >
                    <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-violet-500/40 via-blue-500/20 to-transparent" />

                    {/* Left categories pane */}
                    <div className="w-[220px] xl:w-[260px] p-5 flex flex-col gap-2 shrink-0 relative z-10 pt-6 bg-slate-50 border-r border-slate-200/80">
                      <p className="text-[9.5px] font-bold uppercase tracking-[0.15em] px-2.5 mb-3 text-slate-400 select-none">
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
                                ? "bg-white border-slate-250 text-slate-900 shadow-sm"
                                : "bg-transparent border-transparent text-slate-500 hover:text-slate-900 hover:bg-slate-100"
                            )}
                          >
                            {isActiveTab && (
                              <span className="absolute left-0 top-3.5 bottom-3.5 w-[3px] bg-[#7C3AED] rounded-r" />
                            )}
                            <div
                              className="w-8.5 h-8.5 rounded-lg flex items-center justify-center shrink-0 border transition-all duration-300"
                              style={{
                                background: isActiveTab ? "rgba(124, 58, 237, 0.1)" : "rgba(0, 0, 0, 0.02)",
                                borderColor: isActiveTab ? "rgba(124, 58, 237, 0.2)" : "rgba(0, 0, 0, 0.06)",
                                color: isActiveTab ? "#7C3AED" : "#64748b",
                              }}
                            >
                              <TabIcon className="w-4 h-4 transition-transform duration-300 group-hover/btn:scale-110" />
                            </div>
                            <div className="min-w-0">
                              <p className="text-[12.5px] font-bold leading-tight font-sora truncate">{tab.label}</p>
                              <span className={cn(
                                "text-[10px] block mt-0.5 leading-none transition-colors",
                                isActiveTab ? "text-[#7C3AED] font-medium" : "text-slate-400"
                              )}>
                                {tab.items.length} services
                              </span>
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    {/* Right services grid */}
                    <div className="flex-1 p-6 flex flex-col justify-between relative z-10 pt-6 bg-white">
                      <div>
                        <div className="mb-4 pb-3 flex items-center justify-between px-1 border-b border-slate-100">
                          <div>
                            <h3 className="text-sm font-extrabold font-sora tracking-tight text-slate-900">
                              {megaMenuData[activeTab].label} Services
                            </h3>
                            <p className="text-[10.5px] text-slate-500 mt-0.5 leading-normal">
                              {megaMenuData[activeTab].desc}
                            </p>
                          </div>
                          <span className="text-[9.5px] font-bold px-2 py-0.5 rounded font-mono tracking-wider select-none uppercase border bg-slate-50 border-slate-200 text-slate-500">
                            {megaMenuData[activeTab].items.length} available
                          </span>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          {megaMenuData[activeTab].items.map((s) => {
                            const ItemIcon = s.icon;
                            return (
                              <Link
                                key={s.label}
                                href={s.href}
                                role="menuitem"
                                className="group/card flex items-center justify-between p-3.5 rounded-xl transition-all duration-300 hover:shadow-lg bg-slate-50 border border-slate-150 hover:bg-slate-100/50 hover:border-slate-300 hover:shadow-slate-100"
                              >
                                <div className="flex items-center gap-3.5 min-w-0">
                                  <div className="p-2 rounded-lg shrink-0 transition-all duration-300 bg-white border border-slate-200 text-slate-500 group-hover/card:bg-violet-50 group-hover/card:border-violet-200 group-hover/card:text-[#7C3AED]">
                                    <ItemIcon className="w-4 h-4" />
                                  </div>
                                  <div className="min-w-0">
                                    <h4 className="text-[12.5px] font-bold leading-tight font-sora flex items-center gap-1.5 truncate text-slate-850">
                                      {s.label}
                                      <span className="text-[10px] text-[#7C3AED] select-none opacity-40 group-hover/card:opacity-100 transition-opacity">★</span>
                                    </h4>
                                    <p className="text-[10px] text-slate-500 mt-1 leading-normal group-hover/card:text-slate-400 transition-colors truncate max-w-[200px]">
                                      {s.desc}
                                    </p>
                                  </div>
                                </div>
                                <div className="shrink-0 pl-2 opacity-30 group-hover/card:opacity-100 group-hover/card:translate-x-0.5 transition-all duration-300">
                                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover/card:text-[#7C3AED]" />
                                </div>
                              </Link>
                            );
                          })}
                        </div>
                      </div>

                      <div className="pt-4 mt-6 flex items-center justify-between border-t border-slate-100">
                        <span className="text-[9px] text-slate-400 font-medium font-mono uppercase tracking-wider">
                          Select a category to explore services
                        </span>
                        <Link
                          href="/services"
                          className="group/all flex items-center gap-1 text-xs font-bold text-[#7C3AED] hover:text-[#6D28D9] transition-colors font-sora"
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
                    "font-sora uppercase tracking-wider relative inline-flex items-center gap-1.5 rounded-lg text-[11.5px] font-extrabold transition-all duration-500 ease-in-out px-3 py-1.5",
                    scrolled
                      ? (isActive ? "text-[#7C3AED]" : "text-black hover:text-[#7C3AED]")
                      : (isActive ? "text-white" : "text-white/85 hover:text-white")
                  )}
                >
                  {link.label}
                  {isActive && (
                    <span className={cn(
                      "absolute bottom-[-10px] left-3 right-3 h-[2.5px] rounded-full transition-all duration-500 ease-in-out",
                      scrolled ? "bg-[#7C3AED]" : "bg-white"
                    )} />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2.5 xl:gap-3.5">
            {/* Phone outlined button - slide & fade transition */}
            <a
              href={`tel:${COMPANY.phone}`}
              className={cn(
                "border rounded-full text-xs font-extrabold flex items-center gap-2 transition-all duration-500 ease-in-out shadow-sm overflow-hidden",
                scrolled
                  ? "border-[#7C3AED] text-[#7C3AED] bg-white hover:bg-violet-50/50 opacity-100 max-w-[220px] px-4 py-2.5"
                  : "border-transparent text-transparent bg-transparent opacity-0 max-w-0 py-0 px-0 pointer-events-none"
              )}
            >
              <Phone className="w-3.5 h-3.5 fill-current" />
              <span>{COMPANY.phone}</span>
            </a>

            {/* Solid CTA Button */}
            <Link
              href="/contact"
              className={cn(
                "text-white px-5.5 py-3 rounded-full text-xs font-extrabold flex items-center gap-2 shadow-md hover:shadow-lg transition-all duration-500 ease-in-out hover:-translate-y-0.5 shrink-0",
                scrolled ? "bg-[#7C3AED] hover:bg-[#6D28D9]" : "bg-[#7C3AED]/95 hover:bg-[#7C3AED] backdrop-blur-sm"
              )}
            >
              Get A Quote <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Mobile Navbar (logo + hamburger) - visible below lg */}
        <div className={cn(
          "flex lg:hidden items-center justify-between w-full px-4 py-3.5 transition-colors duration-500 ease-in-out",
          scrolled ? "bg-white text-slate-900 border-b border-slate-200" : "bg-transparent text-white"
        )}>
          <Link href="/" className="flex items-center shrink-0" aria-label="NextGen Tech Solutions — Home">
            <LogoMark size={38} />
          </Link>
          <div className="flex items-center gap-3">
            <Link
              href="/contact"
              className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white px-4 py-2 rounded-full text-xs font-extrabold shadow-md transition-all shrink-0"
            >
              Get A Quote
            </Link>
            <button
              className={cn(
                "w-9.5 h-9.5 rounded-lg flex items-center justify-center transition-colors border",
                scrolled
                  ? "border-slate-200 bg-slate-50 text-slate-700 hover:text-slate-900"
                  : "border-white/20 bg-white/10 text-white hover:bg-white/20"
              )}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
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
            className="fixed top-0 right-0 bottom-0 z-50 w-72 bg-slate-900 border-l border-slate-800 p-6 lg:hidden overflow-y-auto"
            aria-label="Mobile navigation"
          >
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
              <LogoMark size={36} />
              <button
                onClick={() => setMobileOpen(false)}
                className="w-9.5 h-9.5 rounded-lg flex items-center justify-center bg-slate-800 text-slate-400 hover:text-white transition-colors"
                aria-label="Close navigation menu"
              >
                <X className="w-4 h-4" />
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
                      pathname === link.href ? "text-[#7C3AED] bg-violet-500/10" : "text-slate-400 hover:text-white hover:bg-slate-800"
                    )}
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                    <ArrowRight className="w-4 h-4 opacity-30" />
                  </Link>
                ))}
              </div>

              {/* Mobile Contact Info */}
              <div className="pt-6 mt-6 border-t border-slate-800 space-y-4">
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-4">Contact Info</p>
                <div className="space-y-3 px-4">
                  <a href={`tel:${COMPANY.phone}`} className="flex items-center gap-3 text-xs text-slate-300 hover:text-white transition-colors">
                    <div className="w-7 h-7 rounded-full bg-slate-800 flex items-center justify-center text-rose-400">
                      <Phone className="w-3.5 h-3.5 fill-current" />
                    </div>
                    {COMPANY.phone}
                  </a>
                  <a href={`mailto:${COMPANY.email}`} className="flex items-center gap-3 text-xs text-slate-300 hover:text-white transition-colors">
                    <div className="w-7 h-7 rounded-full bg-slate-800 flex items-center justify-center text-violet-400">
                      <Mail className="w-3.5 h-3.5" />
                    </div>
                    {COMPANY.email}
                  </a>
                  <div className="flex items-center gap-3 text-xs text-slate-300">
                    <div className="w-7 h-7 rounded-full bg-slate-800 flex items-center justify-center text-cyan-400">
                      <MapPin className="w-3.5 h-3.5" />
                    </div>
                    <span>{COMPANY.city}, {COMPANY.state}</span>
                  </div>
                </div>
              </div>

              {/* Mobile Socials */}
              <div className="pt-6 mt-6 border-t border-slate-800">
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-4 mb-3">Follow Us</p>
                <div className="flex items-center gap-2.5 px-4">
                  <a href={COMPANY.social.linkedin} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white text-[#7C3AED] flex items-center justify-center hover:bg-slate-100 transition-colors shadow">
                    <FaLinkedinIn className="w-4 h-4" />
                  </a>
                  <a href={COMPANY.social.twitter} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white text-[#7C3AED] flex items-center justify-center hover:bg-slate-100 transition-colors shadow">
                    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                  </a>
                  <a href={COMPANY.social.instagram} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white text-[#7C3AED] flex items-center justify-center hover:bg-slate-100 transition-colors shadow">
                    <FaInstagram className="w-4 h-4" />
                  </a>
                  <a href={COMPANY.social.facebook} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white text-[#7C3AED] flex items-center justify-center hover:bg-slate-100 transition-colors shadow">
                    <FaFacebookF className="w-3.5 h-3.5" />
                  </a>
                  <a href={COMPANY.social.youtube} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white text-[#7C3AED] flex items-center justify-center hover:bg-slate-100 transition-colors shadow font-bold">
                    <FaYoutube className="w-4 h-4" />
                  </a>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-800">
                <Link
                  href="/contact"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-3.5 rounded-lg text-sm font-bold text-white bg-[#7C3AED] hover:bg-[#6D28D9] transition-colors"
                >
                  Get A Quote
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
