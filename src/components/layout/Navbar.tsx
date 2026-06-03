"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import {
  Code2, Smartphone, Layers, Brain, Cloud, Server,
  BarChart3, Palette, Settings2, TrendingUp,
  ChevronDown, Menu, X, ArrowRight, Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";

/* ── data ──────────────────────────────────────────────────────────── */
const services = [
  { label: "Web Development",        href: "/services#web",     icon: Code2,     color: "text-blue-400",   desc: "Modern full-stack applications" },
  { label: "Mobile App Development", href: "/services#mobile",  icon: Smartphone, color: "text-violet-400", desc: "iOS & Android native apps" },
  { label: "SaaS Development",       href: "/services#saas",    icon: Layers,    color: "text-cyan-400",   desc: "Scalable SaaS platforms" },
  { label: "AI Solutions",           href: "/services#ai",      icon: Brain,     color: "text-emerald-400", desc: "Intelligent AI integrations" },
  { label: "Cloud Services",         href: "/services#cloud",   icon: Cloud,     color: "text-orange-400", desc: "AWS, Azure & GCP expertise" },
  { label: "CRM Development",        href: "/services#crm",     icon: BarChart3, color: "text-pink-400",   desc: "Customer relationship systems" },
  { label: "ERP Systems",            href: "/services#erp",     icon: Settings2, color: "text-yellow-400", desc: "Enterprise resource planning" },
  { label: "UI/UX Design",           href: "/services#design",  icon: Palette,   color: "text-rose-400",   desc: "Premium digital experiences" },
  { label: "DevOps",                 href: "/services#devops",  icon: Server,    color: "text-teal-400",   desc: "CI/CD & infrastructure" },
  { label: "Digital Marketing",      href: "/services#marketing", icon: TrendingUp, color: "text-indigo-400", desc: "Growth & digital presence" },
];

const navLinks = [
  { label: "Home",         href: "/" },
  { label: "About",        href: "/about" },
  { label: "Services",     href: "/services", hasMenu: true },
  { label: "Solutions",    href: "/solutions" },
  { label: "Technologies", href: "/technologies" },
  { label: "Portfolio",    href: "/portfolio" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Careers",      href: "/careers" },
  { label: "Blog",         href: "/blog" },
];

/* ── component ─────────────────────────────────────────────────────── */
export default function Navbar() {
  const [scrolled,    setScrolled]    = useState(false);
  const [mobileOpen,  setMobileOpen]  = useState(false);
  const [megaOpen,    setMegaOpen]    = useState(false);
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const megaTimer   = useRef<ReturnType<typeof setTimeout> | null>(null);

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 24));

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMobileOpen(false);
    setMegaOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const onMegaEnter = () => { if (megaTimer.current) clearTimeout(megaTimer.current); setMegaOpen(true); };
  const onMegaLeave = () => { megaTimer.current = setTimeout(() => setMegaOpen(false), 120); };

  return (
    <>
      {/* ── bar ──────────────────────────────────────────────────── */}
      <motion.header
        className={cn(
          "fixed top-0 inset-x-0 z-50 transition-all duration-500",
          scrolled ? "py-2" : "py-4"
        )}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* backdrop */}
        <motion.div
          className="absolute inset-0 border-b border-white/6"
          style={{
            background: "linear-gradient(180deg,rgba(3,3,10,0.85) 0%,rgba(3,3,10,0.7) 100%)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
          }}
          animate={{ opacity: scrolled ? 1 : 0 }}
          transition={{ duration: 0.4 }}
        />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between gap-8">
          {/* logo */}
          <Link href="/" className="flex items-center gap-2.5 group shrink-0">
            <motion.div
              className="relative w-8 h-8 rounded-xl flex items-center justify-center overflow-hidden"
              style={{ background: "linear-gradient(135deg,#3b82f6,#7c3aed)" }}
              whileHover={{ scale: 1.08, rotate: 6 }}
              transition={{ type: "spring", stiffness: 500, damping: 22 }}
            >
              <Zap className="w-4 h-4 text-white relative z-10" />
              <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
            <div className="leading-none">
              <span className="block text-[13px] font-bold text-white tracking-tight">NextGen</span>
              <span className="block text-[9px] text-white/35 tracking-[0.2em] uppercase font-medium">Tech Solution</span>
            </div>
          </Link>

          {/* desktop nav */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {navLinks.map((link) =>
              link.hasMenu ? (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={onMegaEnter}
                  onMouseLeave={onMegaLeave}
                >
                  <NavItem label={link.label} href={link.href} active={pathname.startsWith(link.href)}>
                    <motion.span
                      animate={{ rotate: megaOpen ? 180 : 0 }}
                      transition={{ duration: 0.25 }}
                      className="inline-flex"
                    >
                      <ChevronDown className="w-3.5 h-3.5 opacity-50" />
                    </motion.span>
                  </NavItem>

                  {/* mega menu */}
                  <AnimatePresence>
                    {megaOpen && (
                      <motion.div
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-150"
                        initial={{ opacity: 0, y: 8, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 6, scale: 0.97 }}
                        transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                        onMouseEnter={onMegaEnter}
                        onMouseLeave={onMegaLeave}
                      >
                        <div
                          className="rounded-2xl border border-white/8 overflow-hidden shadow-2xl shadow-black/60"
                          style={{
                            background: "linear-gradient(160deg,rgba(10,10,20,0.98),rgba(5,5,15,0.98))",
                            backdropFilter: "blur(32px)",
                          }}
                        >
                          <div className="p-2 grid grid-cols-2 gap-0.5">
                            {services.map((s) => (
                              <Link
                                key={s.label}
                                href={s.href}
                                className="group/item flex items-start gap-3 px-4 py-3 rounded-xl hover:bg-white/5 transition-colors duration-150"
                              >
                                <div className="mt-0.5 p-1.5 rounded-lg bg-white/4 group-hover/item:bg-white/8 transition-colors shrink-0">
                                  <s.icon className={cn("w-3.5 h-3.5", s.color)} />
                                </div>
                                <div>
                                  <p className="text-[13px] font-medium text-white/80 group-hover/item:text-white transition-colors leading-tight">{s.label}</p>
                                  <p className="text-[11px] text-white/35 mt-0.5 leading-tight">{s.desc}</p>
                                </div>
                              </Link>
                            ))}
                          </div>
                          <div className="px-4 py-3 border-t border-white/6 flex items-center justify-between">
                            <span className="text-[11px] text-white/30">View all services</span>
                            <Link href="/services" className="flex items-center gap-1.5 text-[11px] text-blue-400 hover:text-blue-300 font-medium transition-colors">
                              Explore all <ArrowRight className="w-3 h-3" />
                            </Link>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <NavItem key={link.label} label={link.label} href={link.href} active={pathname === link.href} />
              )
            )}
          </nav>

          {/* right actions */}
          <div className="flex items-center gap-3">
            <Link
              href="/contact"
              className="hidden sm:block text-[13px] font-medium text-white/50 hover:text-white/90 transition-colors px-3 py-1.5"
            >
              Contact
            </Link>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/contact"
                className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-xl text-[13px] font-semibold text-white transition-all"
                style={{
                  background: "linear-gradient(135deg,#3b82f6 0%,#7c3aed 100%)",
                  boxShadow: "0 0 24px rgba(59,130,246,0.25)",
                }}
              >
                Get Started
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </motion.div>

            {/* hamburger */}
            <motion.button
              className="lg:hidden relative w-9 h-9 rounded-xl flex items-center justify-center border border-white/8 bg-white/3 text-white/60 hover:text-white hover:bg-white/[0.07] transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              whileTap={{ scale: 0.93 }}
            >
              <AnimatePresence mode="wait">
                {mobileOpen
                  ? <motion.span key="x"  initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}><X    className="w-4 h-4" /></motion.span>
                  : <motion.span key="hm" initial={{ rotate:  90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate:-90, opacity: 0 }} transition={{ duration: 0.15 }}><Menu className="w-4 h-4" /></motion.span>
                }
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* ── mobile drawer ─────────────────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              className="fixed top-0 right-0 bottom-0 z-50 w-75 lg:hidden overflow-y-auto"
              style={{
                background: "linear-gradient(160deg,#0a0a18,#050510)",
                borderLeft: "1px solid rgba(255,255,255,0.07)",
              }}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 340, damping: 34 }}
            >
              <div className="p-5 space-y-1">
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/6">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg,#3b82f6,#7c3aed)" }}>
                      <Zap className="w-3.5 h-3.5 text-white" />
                    </div>
                    <span className="text-[13px] font-bold text-white">NextGen Tech</span>
                  </div>
                  <button onClick={() => setMobileOpen(false)} className="w-7 h-7 rounded-lg flex items-center justify-center bg-white/5 text-white/40 hover:text-white transition-colors">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>

                {[...navLinks, { label: "Contact", href: "/contact" }].map((link, i) => (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04, duration: 0.28 }}
                  >
                    <Link
                      href={link.href}
                      className={cn(
                        "flex items-center justify-between px-3 py-2.5 rounded-xl text-[13px] font-medium transition-colors",
                        pathname === link.href
                          ? "bg-blue-500/10 text-blue-300"
                          : "text-white/55 hover:text-white hover:bg-white/5"
                      )}
                      onClick={() => setMobileOpen(false)}
                    >
                      {link.label}
                      <ArrowRight className="w-3.5 h-3.5 opacity-30" />
                    </Link>
                  </motion.div>
                ))}

                <motion.div
                  className="pt-4 mt-4 border-t border-white/6"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 }}
                >
                  <Link
                    href="/contact"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-[13px] font-semibold text-white"
                    style={{ background: "linear-gradient(135deg,#3b82f6,#7c3aed)" }}
                  >
                    Get Started Free
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

/* ── NavItem atom ───────────────────────────────────────────────────── */
function NavItem({ label, href, active, children }: {
  label: string; href: string; active?: boolean; children?: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "relative inline-flex items-center gap-1 px-3 py-2 rounded-lg text-[13px] font-medium transition-colors duration-150",
        active ? "text-white" : "text-white/50 hover:text-white/90"
      )}
    >
      {active && (
        <motion.span
          className="absolute inset-0 rounded-lg bg-white/[0.07]"
          layoutId="nav-active"
          transition={{ type: "spring", stiffness: 380, damping: 32 }}
        />
      )}
      <span className="relative">{label}</span>
      {children && <span className="relative">{children}</span>}
    </Link>
  );
}
