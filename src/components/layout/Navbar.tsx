"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import {
  Code2, Smartphone, Layers, Brain, Cloud, Server,
  BarChart3, Palette, Settings2, TrendingUp,
  ChevronDown, Menu, X, ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

/* ── Logo Mark ────────────────────────────────────────────────────── */
function LogoMark({ size = 32 }: { size?: number }) {
  return (
    <img
      src="/images/logo.png"
      alt="NextGen Tech Solutions"
      style={{
        height: `${size}px`,
        width: "auto",
        display: "block",
        objectFit: "contain",
      }}
    />
  );
}

/* ── Data ─────────────────────────────────────────────────────────── */
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

/* ── Component ────────────────────────────────────────────────────── */
export default function Navbar() {
  const [scrolled,   setScrolled]   = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen,   setMegaOpen]   = useState(false);
  const [globalAccent, setGlobalAccent] = useState("#06B6D4");
  const [globalAccentHover, setGlobalAccentHover] = useState("#0891B2");
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const megaTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 50));

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

  // Sync strictly with the global brand color via ThemeToggle variable
  useEffect(() => {
    const sync = () => {
      const accent = getComputedStyle(document.documentElement)
        .getPropertyValue("--accent-primary").trim();
      const accentHover = getComputedStyle(document.documentElement)
        .getPropertyValue("--accent-primary-hover").trim();
      if (accent) setGlobalAccent(accent);
      if (accentHover) setGlobalAccentHover(accentHover);
    };
    sync();
    // Poll to catch theme changes
    const id = setInterval(sync, 300);
    return () => clearInterval(id);
  }, []);

  const onMegaEnter = () => {
    if (megaTimer.current) clearTimeout(megaTimer.current);
    setMegaOpen(true);
  };
  const onMegaLeave = () => {
    megaTimer.current = setTimeout(() => setMegaOpen(false), 140);
  };

  return (
    <>
      {/* ── Bar ──────────────────────────────────────────────────── */}
      <motion.header
        className={cn(
          "fixed left-0 right-0 z-50 mx-auto transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
          scrolled 
            ? "w-[calc(100%-40px)] md:w-[calc(100%-64px)] max-w-[1280px]" 
            : "w-full max-w-full"
        )}
        style={{
          top: scrolled ? "16px" : "0px",
          borderRadius: scrolled ? "9999px" : "0px",
          backgroundColor: scrolled ? "rgba(10, 15, 28, 0.82)" : "transparent",
          borderColor: scrolled ? `${globalAccent}33` : "transparent",
          borderWidth: "1px",
          borderStyle: "solid",
          boxShadow: scrolled ? `0 12px 40px rgba(0, 0, 0, 0.25), 0 0 20px ${globalAccent}15` : "none",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          paddingTop: scrolled ? "14px" : "24px",
          paddingBottom: scrolled ? "14px" : "24px",
        }}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className={cn(
          "relative flex items-center justify-between gap-8 transition-all duration-500",
          scrolled ? "px-6 w-full" : "ng-container"
        )}>
          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0 group">
            <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 400, damping: 20 }}>
              <LogoMark size={scrolled ? 40 : 44} />
            </motion.div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-0.5 flex-1 justify-center">
            {navLinks.map((link) =>
              link.hasMenu ? (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={onMegaEnter}
                  onMouseLeave={onMegaLeave}
                >
                  <NavItem
                    label={link.label}
                    href={link.href}
                    active={pathname.startsWith("/services")}
                    scrolled={scrolled}
                    globalAccent={globalAccent}
                  >
                    <motion.span
                      animate={{ rotate: megaOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="inline-flex ml-0.5"
                    >
                      <ChevronDown className="w-3.5 h-3.5" />
                    </motion.span>
                  </NavItem>

                  <AnimatePresence>
                    {megaOpen && (
                      <motion.div
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[560px]"
                        initial={{ opacity: 0, y: 8, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 6, scale: 0.97 }}
                        transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                        onMouseEnter={onMegaEnter}
                        onMouseLeave={onMegaLeave}
                      >
                        <div
                          className="rounded-[20px] overflow-hidden border"
                          style={{
                            background: "#121A2B",
                            borderColor: "rgba(255,255,255,0.08)",
                            boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
                          }}
                        >
                          <div className="p-2 grid grid-cols-2 gap-0.5">
                            {services.map((s) => (
                              <Link
                                key={s.label}
                                href={s.href}
                                className="group/item flex items-start gap-3 px-4 py-3 rounded-xl transition-colors duration-150"
                                style={{ "--hover-bg": `${globalAccent}08` } as React.CSSProperties}
                                onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.04)")}
                                onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
                              >
                                <div
                                  className="mt-0.5 p-1.5 rounded-lg shrink-0 transition-colors"
                                  style={{ background: `${globalAccent}18` }}
                                >
                                  <s.icon className="w-3.5 h-3.5" style={{ color: globalAccent }} />
                                </div>
                                <div>
                                  <p className="text-[13px] font-medium text-white leading-tight">{s.label}</p>
                                  <p className="text-[11px] text-[#64748B] mt-0.5 leading-tight">{s.desc}</p>
                                </div>
                              </Link>
                            ))}
                          </div>
                          <div className="px-4 py-3 border-t border-white/[0.06] flex items-center justify-between">
                            <span className="text-[11px] text-[#64748B]">All services</span>
                            <Link
                              href="/services"
                              className="flex items-center gap-1.5 text-[11px] font-medium transition-colors"
                              style={{ color: globalAccent }}
                              onMouseEnter={e => (e.currentTarget.style.color = globalAccentHover)}
                              onMouseLeave={e => (e.currentTarget.style.color = globalAccent)}
                            >
                              View all <ArrowRight className="w-3 h-3" />
                            </Link>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <NavItem
                  key={link.label}
                  label={link.label}
                  href={link.href}
                  active={pathname === link.href}
                  scrolled={scrolled}
                  globalAccent={globalAccent}
                />
              )
            )}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-3 shrink-0">
            <Link
               href="/contact"
               className="hidden sm:block text-[13px] font-medium transition-colors"
               style={{ color: "#94A3B8" }}
               onMouseEnter={e => (e.currentTarget.style.color = "#ffffff")}
               onMouseLeave={e => (e.currentTarget.style.color = "#94A3B8")}
            >
              Contact
            </Link>
            <div>
              <Link
                href="/contact"
                className="hidden sm:inline-flex items-center gap-2 text-[13px] font-medium text-white"
                style={{
                  background: globalAccent,
                  height: "38px",
                  padding: "0 18px",
                  borderRadius: "9999px",
                  transition: "all 0.5s ease, box-shadow 0.5s ease",
                  boxShadow: `0 4px 18px ${globalAccent}50`,
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = globalAccentHover;
                  e.currentTarget.style.boxShadow = `0 6px 24px ${globalAccent}65`;
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = globalAccent;
                  e.currentTarget.style.boxShadow = `0 4px 18px ${globalAccent}50`;
                }}
              >
                Get Started
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Hamburger */}
            <motion.button
              className="lg:hidden relative w-9 h-9 rounded-xl flex items-center justify-center transition-colors"
              style={{
                border: "1px solid rgba(255,255,255,0.08)",
                background: "rgba(255,255,255,0.04)",
                color: "rgba(255,255,255,0.6)",
              }}
              onClick={() => setMobileOpen(!mobileOpen)}
              whileTap={{ scale: 0.93 }}
            >
              <AnimatePresence mode="wait">
                {mobileOpen
                  ? <motion.span key="x"  initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}><X  className="w-4 h-4" /></motion.span>
                  : <motion.span key="hm" initial={{ rotate:  90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate:-90, opacity: 0 }} transition={{ duration: 0.15 }}><Menu className="w-4 h-4" /></motion.span>
                }
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* ── Mobile Drawer ─────────────────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-40 lg:hidden"
              style={{ background: "rgba(10,15,28,0.7)", backdropFilter: "blur(4px)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              className="fixed top-0 right-0 bottom-0 z-50 w-72 lg:hidden overflow-y-auto"
              style={{
                background: "#121A2B",
                borderLeft: "1px solid rgba(255,255,255,0.06)",
              }}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 32 }}
            >
              <div className="p-5 space-y-1">
                <div className="flex items-center justify-between mb-6 pb-4 border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
                  <div className="flex items-center gap-2.5">
                    <LogoMark size={26} />
                    <span className="text-[13px] font-semibold text-white" style={{ fontFamily: "Sora, sans-serif" }}>
                      NextGen Tech
                    </span>
                  </div>
                  <button
                    onClick={() => setMobileOpen(false)}
                    className="w-7 h-7 rounded-lg flex items-center justify-center transition-colors"
                    style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.5)" }}
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>

                {[...navLinks, { label: "Contact", href: "/contact" }].map((link, i) => (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04, duration: 0.25 }}
                  >
                    <Link
                      href={link.href}
                      className={cn(
                        "flex items-center justify-between px-3 py-2.5 rounded-xl text-[13px] font-medium transition-colors",
                        pathname === link.href ? "" : "text-[#94A3B8] hover:text-white"
                      )}
                      style={pathname === link.href ? { color: globalAccent, background: `${globalAccent}18` } : undefined}
                      onClick={() => setMobileOpen(false)}
                    >
                      {link.label}
                      <ArrowRight className="w-3.5 h-3.5 opacity-30" />
                    </Link>
                  </motion.div>
                ))}

                <motion.div
                  className="pt-4 mt-4 border-t"
                  style={{ borderColor: "rgba(255,255,255,0.06)" }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 }}
                >
                  <Link
                    href="/contact"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-[13px] font-medium text-white"
                    style={{
                      background: globalAccent,
                      boxShadow: `0 4px 18px ${globalAccent}40`
                    }}
                  >
                    Start a Project
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </motion.div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

/* ── NavItem ──────────────────────────────────────────────────────── */
function NavItem({
  label, href, active, children, scrolled, globalAccent
}: {
  label: string; href: string; active?: boolean; children?: React.ReactNode; scrolled?: boolean; globalAccent: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "relative inline-flex items-center gap-1 rounded-lg text-[13px] font-medium transition-all duration-150",
        scrolled ? "px-2.5 py-1.5" : "px-3 py-2",
        active ? "text-white" : "text-[#94A3B8] hover:text-white"
      )}
    >
      {active && (
        <motion.span
          className="absolute inset-0 rounded-lg"
          style={{ background: `${globalAccent}18` }}
          layoutId="nav-active"
          transition={{ type: "spring", stiffness: 380, damping: 32 }}
        />
      )}
      <span className="relative">{label}</span>
      {children && <span className="relative text-[#64748B]">{children}</span>}
    </Link>
  );
}
