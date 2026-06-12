"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Code2, Smartphone, Layers, Brain, Cloud, Server,
  BarChart3, Palette, Settings2, TrendingUp,
  ChevronDown, Menu, X, ArrowRight,
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

const services = [
  { label: "Web Development",        href: "/services/web",       icon: Code2,     desc: "Modern full-stack applications" },
  { label: "Mobile App Development", href: "/services/mobile",    icon: Smartphone, desc: "iOS & Android native apps" },
  { label: "SaaS Platforms",         href: "/services/saas",      icon: Layers,    desc: "Scalable multi-tenant platforms" },
  { label: "AI & ML Solutions",      href: "/services/ai",        icon: Brain,     desc: "Intelligent automation & analytics" },
  { label: "Cloud Services",         href: "/services/cloud",     icon: Cloud,     desc: "AWS, Azure & GCP expertise" },
  { label: "ERP & CRM Systems",      href: "/services/erp",       icon: BarChart3, desc: "Enterprise resource planning" },
  { label: "DevOps & CI/CD",         href: "/services/devops",    icon: Server,    desc: "Infrastructure & deployment" },
  { label: "UI/UX Design",           href: "/services/design",    icon: Palette,   desc: "Premium digital experiences" },
  { label: "Digital Transformation", href: "/services/transform", icon: TrendingUp, desc: "Legacy modernization" },
  { label: "Maintenance & Support",  href: "/services/support",   icon: Settings2, desc: "24/7 dedicated support" },
];

const navLinks = [
  { label: "Home",         href: "/" },
  { label: "About",        href: "/about" },
  { label: "Services",     href: "/services", hasMenu: true },
  { label: "Portfolio",    href: "/portfolio" },
  { label: "Blog",         href: "/blog" },
  { label: "Careers",      href: "/careers" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const pathname = usePathname();
  const megaTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
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
    megaTimer.current = setTimeout(() => setMegaOpen(false), 140);
  };

  return (
    <>
      <header
        className={cn(
          "fixed left-0 right-0 z-50 mx-auto transition-all duration-300",
          scrolled 
            ? "w-[calc(100%-40px)] md:w-[calc(100%-64px)] max-w-[1400px] top-3 rounded-full bg-slate-900/95 border border-slate-800 shadow-xl backdrop-blur-md py-2.5" 
            : "w-full max-w-full top-0 bg-transparent py-5"
        )}
      >
        <div className={cn(
          "ng-container relative flex items-center justify-between gap-8 w-full"
        )}>
          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0 group">
            <LogoMark size={scrolled ? 34 : 42} />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-2 flex-1 justify-center">
            {navLinks.map((link) =>
              link.hasMenu ? (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={onMegaEnter}
                  onMouseLeave={onMegaLeave}
                >
                  <Link
                    href={link.href}
                    className={cn(
                      "relative inline-flex items-center gap-1 rounded-lg text-xs font-bold transition-all px-3 py-2",
                      pathname.startsWith("/services") ? "text-cyan-400" : "text-slate-400 hover:text-white"
                    )}
                  >
                    <span>{link.label}</span>
                    <ChevronDown className="w-3.5 h-3.5" />
                  </Link>

                  {megaOpen && (
                    <div
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[500px] bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-4 grid grid-cols-2 gap-2"
                      onMouseEnter={onMegaEnter}
                      onMouseLeave={onMegaLeave}
                    >
                      {services.map((s) => (
                        <Link
                          key={s.label}
                          href={s.href}
                          className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-950 transition-colors"
                        >
                          <div className="mt-0.5 p-1.5 rounded-lg shrink-0 bg-cyan-950/20 border border-cyan-900 text-cyan-400">
                            <s.icon className="w-3.5 h-3.5" />
                          </div>
                          <div>
                            <p className="text-xs font-bold text-white leading-tight">{s.label}</p>
                            <p className="text-[10px] text-slate-500 mt-1 leading-tight">{s.desc}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={link.label}
                  href={link.href}
                  className={cn(
                    "relative inline-flex items-center gap-1 rounded-lg text-xs font-bold transition-all px-3 py-2",
                    pathname === link.href ? "text-cyan-400 bg-cyan-950/10" : "text-slate-400 hover:text-white"
                  )}
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-3 shrink-0">
            <Link
               href="/contact"
               className="hidden sm:block text-xs font-bold text-slate-400 hover:text-white transition-colors"
            >
              Contact
            </Link>
            <Link
              href="/contact"
              className="hidden sm:inline-flex items-center gap-1 bg-cyan-400 hover:bg-cyan-500 text-slate-950 px-4 py-2 rounded-full text-xs font-bold shadow-lg"
            >
              Get Started
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            {/* Hamburger */}
            <button
              className="lg:hidden w-8 h-8 rounded-lg flex items-center justify-center border border-slate-800 bg-slate-900 text-slate-400 hover:text-white"
              onClick={() => setMobileOpen(!mobileOpen)}
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
          />
          <aside
            className="fixed top-0 right-0 bottom-0 z-50 w-64 bg-slate-900 border-l border-slate-800 p-6 lg:hidden"
          >
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <LogoMark size={36} />
              </div>
              <button
                onClick={() => setMobileOpen(false)}
                className="w-7 h-7 rounded-lg flex items-center justify-center bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2">
              {[...navLinks, { label: "Contact", href: "/contact" }].map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className={cn(
                    "flex items-center justify-between px-3 py-2 rounded-lg text-xs font-bold transition-all",
                    pathname === link.href ? "text-cyan-405 bg-cyan-950/20" : "text-slate-400 hover:text-white"
                  )}
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                  <ArrowRight className="w-3.5 h-3.5 opacity-30" />
                </Link>
              ))}

              <div className="pt-4 mt-4 border-t border-slate-800">
                <Link
                  href="/contact"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg text-xs font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-500"
                >
                  Start a Project
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </aside>
        </>
      )}
    </>
  );
}
