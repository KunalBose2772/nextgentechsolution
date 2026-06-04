"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, ArrowRight } from "lucide-react";
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
    { label: "UI/UX Design",     href: "/services#design" },
  ],
  Solutions: [
    { label: "Digital Transformation", href: "/solutions#digital" },
    { label: "Enterprise Software",    href: "/solutions#enterprise" },
    { label: "E-Commerce",             href: "/solutions#ecommerce" },
    { label: "FinTech",                href: "/solutions#fintech" },
    { label: "HealthTech",             href: "/solutions#health" },
    { label: "EdTech",                 href: "/solutions#education" },
  ],
  Resources: [
    { label: "Case Studies",    href: "/case-studies" },
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
        background: "#0A0F1C",
        borderTop: "1px solid rgba(255,255,255,0.05)",
      }}
    >
      <div className="ng-container py-16">
        {/* Top: Brand + Newsletter */}
        <div
          className="flex flex-col lg:flex-row items-start justify-between gap-12 mb-12 pb-12"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
        >
          {/* Brand */}
          <div className="lg:max-w-xs">
            <Link href="/" className="flex items-center mb-5 group">
              <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 400, damping: 20 }}>
                <LogoMark size={40} />
              </motion.div>
            </Link>

            <p className="text-[14px] leading-[1.7] mb-5" style={{ color: "#94A3B8" }}>
              Engineering Tomorrow&apos;s Digital Future. We build world-class software for forward-thinking enterprises and startups.
            </p>

            {/* Contact */}
            <div className="space-y-2.5">
              {[
                { icon: Mail,   text: COMPANY.email,               href: `mailto:${COMPANY.email}` },
                { icon: Phone,  text: COMPANY.phone,               href: `tel:${COMPANY.phone}` },
                { icon: MapPin, text: "India (Remote-First)",      href: "#" },
              ].map(({ icon: Icon, text, href }) => (
                <a
                  key={text}
                  href={href}
                  className="flex items-center gap-2.5 text-[13px] transition-colors"
                  style={{ color: "#64748B" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "#94A3B8")}
                  onMouseLeave={e => (e.currentTarget.style.color = "#64748B")}
                >
                  <Icon className="w-3.5 h-3.5 shrink-0" />
                  {text}
                </a>
              ))}
            </div>

            {/* Socials */}
            <div className="flex items-center gap-2 mt-5">
              {socials.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-xl flex items-center justify-center transition-all"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.06)",
                    color: "#64748B",
                  }}
                  whileHover={{ scale: 1.08, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onMouseEnter={e => { e.currentTarget.style.color = "#ffffff"; e.currentTarget.style.borderColor = "rgba(37,99,235,0.30)"; }}
                  onMouseLeave={e => { e.currentTarget.style.color = "#64748B"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"; }}
                >
                  <Icon className="w-3.5 h-3.5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div className="lg:max-w-md w-full">
            <div
              className="rounded-[20px] p-6"
              style={{
                background: "#121A2B",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <span className="ng-label mb-3 block">Newsletter</span>
              <h3
                className="text-white font-semibold text-[18px] mb-2"
                style={{ fontFamily: "Sora, sans-serif" }}
              >
                Stay ahead of the curve
              </h3>
              <p className="text-[13px] leading-[1.65] mb-5" style={{ color: "#94A3B8" }}>
                Get the latest insights on technology, innovation, and digital transformation delivered to your inbox.
              </p>
              <form className="flex gap-3" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="ng-input flex-1"
                  style={{ height: "44px" }}
                />
                <button
                  type="submit"
                  className="ng-btn-primary shrink-0"
                  style={{ height: "44px", padding: "0 18px" }}
                >
                  Subscribe
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
              <p className="text-[11px] mt-3" style={{ color: "#64748B" }}>
                No spam. Unsubscribe at any time.
              </p>
            </div>
          </div>
        </div>

        {/* Links Grid */}
        <div
          className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-12"
        >
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4
                className="text-white font-semibold text-[13px] mb-4"
                style={{ fontFamily: "Sora, sans-serif" }}
              >
                {category}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-[13px] transition-colors"
                      style={{ color: "#64748B" }}
                      onMouseEnter={e => (e.currentTarget.style.color = "#94A3B8")}
                      onMouseLeave={e => (e.currentTarget.style.color = "#64748B")}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8"
          style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
        >
          <p className="text-[13px]" style={{ color: "#64748B" }}>
            © {new Date().getFullYear()} NextGen Tech Solutions. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <Link href="/privacy" className="text-[13px] transition-colors" style={{ color: "#64748B" }}
              onMouseEnter={e => (e.currentTarget.style.color = "#94A3B8")}
              onMouseLeave={e => (e.currentTarget.style.color = "#64748B")}
            >
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-[13px] transition-colors" style={{ color: "#64748B" }}
              onMouseEnter={e => (e.currentTarget.style.color = "#94A3B8")}
              onMouseLeave={e => (e.currentTarget.style.color = "#64748B")}
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
