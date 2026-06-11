"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";
import { FaTwitter, FaLinkedinIn, FaGithub, FaInstagram } from "react-icons/fa";
import { COMPANY } from "@/lib/utils";

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

const footerLinks = {
  Company: [
    { label: "About Us",   href: "/about" },
    { label: "Careers",    href: "/careers" },
    { label: "Blog",       href: "/blog" },
    { label: "Contact",    href: "/contact" },
  ],
  Services: [
    { label: "Web Development",  href: "/services#web" },
    { label: "Mobile Apps",      href: "/services#mobile" },
    { label: "SaaS Platforms",   href: "/services#saas" },
    { label: "AI Solutions",     href: "/services#ai" },
    { label: "Cloud Computing",  href: "/services#cloud" },
  ],
  Solutions: [
    { label: "Digital Transformation", href: "/solutions#digital" },
    { label: "Enterprise Software",    href: "/solutions#enterprise" },
    { label: "E-Commerce",             href: "/solutions#ecommerce" },
    { label: "FinTech",                href: "/solutions#fintech" },
  ],
  Resources: [
    { label: "Portfolio",       href: "/portfolio" },
    { label: "Privacy Policy",  href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
};

const socials = [
  { icon: FaLinkedinIn, href: COMPANY.social.linkedin, label: "LinkedIn" },
  { icon: FaTwitter,    href: COMPANY.social.twitter,  label: "Twitter" },
  { icon: FaGithub,     href: COMPANY.social.github,   label: "GitHub" },
  { icon: FaInstagram,  href: COMPANY.social.instagram, label: "Instagram" },
];

export default function Footer() {
  return (
    <footer
      className="relative overflow-hidden"
      style={{
        background: "#000000",
        borderTop: "1px solid rgba(255, 255, 255, 0.05)",
      }}
    >
      {/* 1. Pre-Footer High-Impact CTA Section (LET'S MAKE IT LEGENDARY) */}
      <div 
        className="border-b border-white/5"
        style={{
          background: "linear-gradient(180deg, rgba(10, 10, 11, 0.6) 0%, rgba(0, 0, 0, 0) 100%)",
        }}
      >
        <div className="ng-container py-20 md:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center justify-between">
            {/* Left Big Text with Scroll-triggered Reveal & Loop Gradient Animation */}
            <div className="lg:col-span-8 overflow-hidden">
              <motion.h2 
                className="text-white font-extrabold text-[46px] sm:text-[76px] lg:text-[90px] xl:text-[104px] leading-[0.92] tracking-tighter uppercase font-sora"
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              >
                Let&apos;s Make It<br />
                <motion.span 
                  className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-650"
                  style={{
                    backgroundImage: "linear-gradient(90deg, #06B6D4, #3B82F6, #7c3aed, #06B6D4)",
                    backgroundSize: "300% auto",
                  }}
                  animate={{
                    backgroundPosition: ["0% center", "300% center"],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  Legendary.
                </motion.span>
              </motion.h2>
            </div>

            {/* Right Subtitle & Pill Button */}
            <div className="lg:col-span-4 flex flex-col items-start lg:items-end justify-center lg:text-right gap-6">
              <motion.p 
                className="text-[14px] sm:text-[15px] leading-[1.65] text-slate-450 max-w-sm"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                style={{ color: "#94a3b8" }}
              >
                Stop being just another website. Be the benchmark of digital engineering and design in your industry.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <Link 
                  href="/contact"
                  className="inline-flex items-center gap-2.5 bg-white text-black hover:bg-slate-100 px-8 py-4.5 rounded-full font-bold text-xs sm:text-sm tracking-wider transition-all duration-300 shadow-xl cursor-pointer hover:scale-[1.03] active:scale-[0.98]"
                  style={{ fontFamily: "Sora, sans-serif" }}
                >
                  GET IN TOUCH
                  <ArrowUpRight className="w-4.5 h-4.5 text-black stroke-[2.5px] rotate-90" />
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Footer Content */}
      <div className="ng-container py-20 relative z-10">
        
        {/* Top Section: Brand + Links Grid + Newsletter */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">
          
          {/* Brand Info (4 cols) */}
          <div className="lg:col-span-4 flex flex-col justify-between min-h-[280px]">
            <div>
              <Link href="/" className="flex items-center mb-6 group w-max">
                <motion.div whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 400, damping: 20 }}>
                  <LogoMark size={54} />
                </motion.div>
              </Link>
              <p className="text-[13.5px] leading-[1.7] text-slate-400 mb-6 max-w-xs">
                Engineering Tomorrow&apos;s Digital Future. We design and build high-performance software for startups and forward-thinking enterprises.
              </p>
            </div>

            <div className="space-y-3">
              {[
                { icon: Mail,   text: COMPANY.email,               href: `mailto:${COMPANY.email}` },
                { icon: Phone,  text: COMPANY.phone,               href: `tel:${COMPANY.phone}` },
                { icon: MapPin, text: COMPANY.location,            href: "#" },
              ].map(({ icon: Icon, text, href }) => (
                <a
                  key={text}
                  href={href}
                  className="flex items-center gap-2.5 text-[13px] text-slate-500 hover:text-cyan-400 transition-colors duration-200"
                >
                  <Icon className="w-3.5 h-3.5 shrink-0 text-slate-450" />
                  {text}
                </a>
              ))}
            </div>

            {/* Socials */}
            <div className="flex items-center gap-2.5 mt-6">
              {socials.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-xl flex items-center justify-center border border-white/[0.05] bg-white/[0.02] text-slate-500 hover:text-cyan-400 hover:border-cyan-500/20 hover:bg-cyan-950/10 transition-all duration-300"
                  whileHover={{ scale: 1.08, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon className="w-3.5 h-3.5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links Grid (5 cols) */}
          <div className="lg:col-span-5 grid grid-cols-2 sm:grid-cols-4 gap-8">
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category} className="col-span-1">
                <h4 
                  className="text-white font-bold text-[12px] uppercase tracking-wider mb-4 font-sora"
                >
                  {category}
                </h4>
                <ul className="space-y-3">
                  {links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-[13px] text-slate-400 hover:text-cyan-400 transition-colors duration-200"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Newsletter (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="text-white font-bold text-[12px] uppercase tracking-wider mb-4 font-sora">
              Subscribe
            </h4>
            <p className="text-[13px] leading-[1.65] text-slate-400 mb-4">
              Get the latest tech updates and engineering insights delivered straight to your inbox.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-2.5">
              <input
                type="email"
                placeholder="email@address.com"
                className="w-full h-11 px-4 rounded-xl border border-white/[0.06] bg-white/[0.02] text-[13px] text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/30 focus:bg-cyan-950/5 transition-all duration-300"
                required
              />
              <button
                type="submit"
                className="w-full h-11 rounded-xl bg-white text-black hover:bg-slate-100 font-bold text-xs flex items-center justify-center gap-1.5 shadow-lg transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              >
                SUBSCRIBE
              </button>
            </form>
          </div>

        </div>

        {/* Bottom Bar */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-8 border-t border-white/5"
        >
          <div className="flex flex-col sm:flex-row items-center gap-4 text-[13px] text-slate-500">
            <p>© {new Date().getFullYear()} NextGen Tech Solutions. All rights reserved.</p>
            <span className="hidden sm:inline text-slate-700">•</span>
            {/* System Status Vibe */}
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" style={{ backgroundColor: "#10b981" }} />
              <span>All systems operational</span>
            </div>
          </div>

          <div className="flex items-center gap-5 text-[13px]">
            <Link href="/privacy" className="text-slate-500 hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-slate-500 hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
