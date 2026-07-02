"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, Phone, MapPin, CheckCircle2, ArrowRight } from "lucide-react";
import { FaTwitter, FaLinkedinIn, FaGithub, FaInstagram, FaFacebookF, FaYoutube } from "react-icons/fa";
import { COMPANY } from "@/lib/utils";

function LogoMark({ size = 32 }: { size?: number }) {
  return (
    <img
      src="/images/logo.png"
      alt="NextGen Tech Solution"
      style={{ height: `${size}px`, width: "auto", display: "block", objectFit: "contain" }}
      onError={(e) => { e.currentTarget.style.display = "none"; }}
    />
  );
}

const footerLinks = {
  Company: [
    { label: "About Us",     href: "/about" },
    { label: "Careers",      href: "/careers" },
    { label: "Blog",         href: "/blog" },
    { label: "Case Studies", href: "/case-studies" },
    { label: "Contact",      href: "/contact" },
  ],
  Services: [
    { label: "Web Development", href: "/services/web" },
    { label: "Mobile Apps",     href: "/services/mobile" },
    { label: "SaaS Platforms",  href: "/services/saas" },
    { label: "AI Solutions",    href: "/services/ai" },
    { label: "Cloud & DevOps",  href: "/services/cloud" },
    { label: "ERP & CRM",       href: "/services/erp" },
    { label: "UI/UX Design",    href: "/services/design" },
  ],
  Solutions: [
    { label: "Digital Transformation", href: "/solutions" },
    { label: "Enterprise Software",    href: "/solutions" },
    { label: "Startup MVPs",           href: "/solutions" },
    { label: "Technology Audit",       href: "/services/transform" },
  ],
  Resources: [
    { label: "Portfolio",        href: "/portfolio" },
    { label: "Technologies",     href: "/technologies" },
    { label: "Privacy Policy",   href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
  Locations: [
    { label: "Bangalore", href: "/locations/bangalore" },
    { label: "Mumbai",    href: "/locations/mumbai" },
    { label: "Delhi NCR", href: "/locations/delhi-ncr" },
    { label: "Hyderabad", href: "/locations/hyderabad" },
    { label: "Pune",      href: "/locations/pune" },
    { label: "Ranchi",    href: "/locations/ranchi" },
  ],
};

const socials = [
  { icon: FaLinkedinIn, href: COMPANY.social.linkedin,  label: "LinkedIn" },
  { icon: FaTwitter,    href: COMPANY.social.twitter,   label: "Twitter" },
  { icon: FaGithub,     href: COMPANY.social.github,    label: "GitHub" },
  { icon: FaInstagram,  href: COMPANY.social.instagram, label: "Instagram" },
  { icon: FaFacebookF,  href: COMPANY.social.facebook,  label: "Facebook" },
  { icon: FaYoutube,    href: COMPANY.social.youtube,   label: "YouTube" },
];

export default function Footer() {
  const [emailSent, setEmailSent] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setEmailSent(true);
    setEmail("");
  };

  return (
    <footer className="relative overflow-hidden bg-slate-950 border-t border-white/[0.06]">

      {/* ── Background: deep purple radial + grid pattern ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(139,92,246,0.18) 0%, rgba(109,40,217,0.08) 40%, transparent 75%)",
        }}
      />
      {/* Subtle secondary glow bottom-right */}
      <div
        className="absolute bottom-0 right-0 w-[500px] h-[400px] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at bottom right, rgba(139,92,246,0.10) 0%, transparent 70%)",
        }}
      />
      {/* Grid dot pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage: "radial-gradient(circle, #a78bfa 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
      {/* Top gradient border glow */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--accent-global)]/50 to-transparent" />

      {/* ── Main Content ── */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-16 relative z-10">

        {/* Top grid: brand (3 cols) + links (7 cols) + subscribe (2 cols) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-14 mb-14">

          {/* ── Brand Column ── */}
          <div className="lg:col-span-3 flex flex-col gap-8">
            <div>
              <Link href="/" className="inline-block mb-5">
                <LogoMark size={44} />
              </Link>
              <p className="text-[13px] leading-relaxed text-slate-400 max-w-[260px]">
                {COMPANY.description}
              </p>
              <span className="inline-flex items-center gap-1.5 mt-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest border border-white/[0.08] bg-white/[0.03] px-3 py-1 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-global)] inline-block" />
                Est. {COMPANY.founded} · Ranchi, India
              </span>
            </div>

            {/* Contact info */}
            <div className="space-y-3">
              {[
                { icon: Mail,   text: COMPANY.email,       href: `mailto:${COMPANY.email}` },
                { icon: Phone,  text: COMPANY.phone,       href: `tel:${COMPANY.phone}` },
                { icon: MapPin, text: COMPANY.fullAddress,  href: "#" },
              ].map(({ icon: Icon, text, href }) => (
                <a key={text} href={href}
                  className="flex items-start gap-2.5 text-[12px] text-slate-500 hover:text-[var(--accent-global)] transition-colors duration-200 group">
                  <Icon className="w-3.5 h-3.5 shrink-0 mt-0.5 text-[var(--accent-global)] opacity-70 group-hover:opacity-100 transition-opacity" />
                  {text}
                </a>
              ))}
            </div>

            {/* Socials */}
            <div className="flex flex-wrap gap-2">
              {socials.map(({ icon: Icon, href, label }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                  className="w-9 h-9 rounded-xl flex items-center justify-center border border-white/[0.08] bg-white/[0.04] text-slate-500 hover:text-[var(--accent-global)] hover:border-[var(--accent-global)]/40 hover:bg-[var(--accent-global-dim)] transition-all duration-200">
                  <Icon className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
          </div>

          {/* ── Link Columns ── */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-5 gap-8">
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <h4 className="text-white font-bold text-[11px] uppercase tracking-widest mb-4 flex items-center gap-1.5">
                  <span className="w-1 h-3 rounded-full bg-[var(--accent-global)] inline-block opacity-80" />
                  {category}
                </h4>
                <ul className="space-y-2.5">
                  {links.map((link) => (
                    <li key={link.label}>
                      <Link href={link.href}
                        className="text-[12px] text-slate-500 hover:text-[var(--accent-global)] transition-colors duration-200">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* ── Newsletter ── */}
          <div className="lg:col-span-2">
            <h4 className="text-white font-bold text-[11px] uppercase tracking-widest mb-1 flex items-center gap-1.5">
              <span className="w-1 h-3 rounded-full bg-[var(--accent-global)] inline-block opacity-80" />
              Subscribe
            </h4>
            <p className="text-[12px] leading-relaxed text-slate-500 mb-5 mt-3">
              Get the latest tech insights and engineering updates delivered to your inbox.
            </p>
            {emailSent ? (
              <div className="flex items-center gap-2 py-3 px-4 rounded-xl border border-emerald-800/50 bg-emerald-950/30 text-emerald-400 text-xs font-semibold">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>You&apos;re subscribed!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  aria-label="Email address for newsletter"
                  className="w-full h-11 px-4 rounded-xl border border-white/[0.08] bg-white/[0.04] text-sm text-white placeholder-slate-600 focus:outline-none focus:border-[var(--accent-global)]/60 focus:bg-white/[0.07] transition-all"
                />
                <button type="submit"
                  className="w-full h-11 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all hover:brightness-110 hover:-translate-y-0.5 cursor-pointer text-white shadow-lg shadow-purple-500/20"
                  style={{ background: "linear-gradient(135deg, var(--accent-global) 0%, #7c3aed 100%)" }}>
                  Subscribe
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>

        </div>

        {/* ── Divider ── */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/[0.08] to-transparent mb-8" />

        {/* ── Bottom Bar ── */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3 text-[12px] text-slate-500">
            <p>
              © {COMPANY.founded === new Date().getFullYear()
                ? COMPANY.founded
                : `${COMPANY.founded}–${new Date().getFullYear()}`}{" "}
              {COMPANY.name}. All rights reserved.
            </p>
            <span className="text-white/10">|</span>
            <div className="flex items-center gap-1.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span>All systems operational</span>
            </div>
          </div>

          <div className="flex items-center gap-5 text-[12px]">
            <Link href="/privacy" className="text-slate-500 hover:text-[var(--accent-global)] transition-colors duration-200">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-slate-500 hover:text-[var(--accent-global)] transition-colors duration-200">
              Terms of Service
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
