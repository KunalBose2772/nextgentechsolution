"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, Phone, MapPin, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { FaTwitter, FaLinkedinIn, FaGithub, FaInstagram, FaFacebookF, FaYoutube } from "react-icons/fa";
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
      onError={(e) => {
        e.currentTarget.style.display = "none";
      }}
    />
  );
}

const footerLinks = {
  Company: [
    { label: "About Us",       href: "/about" },
    { label: "Careers",        href: "/careers" },
    { label: "Blog",           href: "/blog" },
    { label: "Case Studies",   href: "/case-studies" },
    { label: "Contact",        href: "/contact" },
  ],
  Services: [
    { label: "Web Development",   href: "/services/web" },
    { label: "Mobile Apps",       href: "/services/mobile" },
    { label: "SaaS Platforms",    href: "/services/saas" },
    { label: "AI Solutions",      href: "/services/ai" },
    { label: "Cloud & DevOps",    href: "/services/cloud" },
    { label: "ERP & CRM",         href: "/services/erp" },
    { label: "UI/UX Design",      href: "/services/design" },
  ],
  Solutions: [
    { label: "Digital Transformation", href: "/solutions" },
    { label: "Enterprise Software",    href: "/solutions" },
    { label: "Startup MVPs",           href: "/solutions" },
    { label: "Technology Audit",       href: "/services/transform" },
  ],
  Resources: [
    { label: "Portfolio",         href: "/portfolio" },
    { label: "Technologies",      href: "/technologies" },
    { label: "Privacy Policy",    href: "/privacy" },
    { label: "Terms of Service",  href: "/terms" },
  ],
  Locations: [
    { label: "Bangalore", href: "/locations/bangalore" },
    { label: "Mumbai", href: "/locations/mumbai" },
    { label: "Delhi NCR", href: "/locations/delhi-ncr" },
    { label: "Hyderabad", href: "/locations/hyderabad" },
    { label: "Pune", href: "/locations/pune" },
    { label: "Ranchi", href: "/locations/ranchi" },
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
    // Optimistic UI — wire to API in production
    setEmailSent(true);
    setEmail("");
  };
  return (
    <footer
      className="relative overflow-hidden bg-slate-950 border-t border-slate-900"
    >
      <style>{`
        .footer-hover-link:hover {
          color: var(--accent-primary) !important;
        }
        .footer-social-icon:hover {
          color: var(--accent-primary) !important;
          border-color: var(--accent-primary) !important;
        }
        .footer-input:focus {
          border-color: var(--accent-primary) !important;
        }
        @keyframes footer-marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .footer-marquee-track {
          display: flex;
          width: max-content;
          animation: footer-marquee 25s linear infinite;
        }
        .footer-marquee-container:hover .footer-marquee-track {
          animation-play-state: paused;
        }
      `}</style>

      {/* 1. Pre-Footer High-Impact CTA Section */}
      <div 
        className="relative overflow-hidden py-16 bg-slate-950 border-b border-slate-900"
      >
        {/* Decorative background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none" />

        {/* Marquee Track */}
        <div 
          className="footer-marquee-container relative z-10 w-full overflow-hidden mb-12"
          style={{
            maskImage: "linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)",
          }}
        >
          <Link href="/contact" className="block">
            <div className="footer-marquee-track text-[50px] sm:text-[90px] md:text-[115px] font-black tracking-tighter uppercase select-none">
              {/* Set 1 */}
              {Array.from({ length: 4 }).map((_, idx) => (
                <span key={`s1-${idx}`} className="inline-flex items-center gap-8 px-6">
                  <span className="text-white">LET&apos;S MAKE IT</span>
                  <span style={{ color: "var(--accent-primary)" }}>LEGENDARY</span>
                  <span className="text-slate-800">·</span>
                </span>
              ))}
              {/* Set 2 */}
              {Array.from({ length: 4 }).map((_, idx) => (
                <span key={`s2-${idx}`} className="inline-flex items-center gap-8 px-6">
                  <span className="text-white">LET&apos;S MAKE IT</span>
                  <span style={{ color: "var(--accent-primary)" }}>LEGENDARY</span>
                  <span className="text-slate-800">·</span>
                </span>
              ))}
            </div>
          </Link>
        </div>

        {/* Subtitle & CTA button */}
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-xs sm:text-sm leading-relaxed text-slate-400 max-w-xl text-center md:text-left">
              Stop being just another website. Be the benchmark of digital engineering and design in your industry.
            </p>
            <Link 
              href="/contact"
              className="inline-flex items-center gap-2 bg-white text-slate-950 hover:bg-slate-100 px-6 py-3.5 rounded-full font-bold text-xs tracking-wider transition-all shadow-lg active:scale-95 shrink-0"
            >
              GET IN TOUCH
              <ArrowUpRight className="w-4 h-4 text-slate-950 stroke-[2.5px]" />
            </Link>
          </div>
        </div>
      </div>

      {/* 2. Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-16 relative z-10">
        
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 mb-12">
          
          {/* Brand Info */}
          <div className="lg:col-span-3 flex flex-col justify-between space-y-6">
            <div>
              <Link href="/" className="flex items-center mb-6 group w-max">
                <LogoMark size={48} />
              </Link>
              <p className="text-xs leading-relaxed text-slate-400 mb-3 max-w-xs">
                {COMPANY.description}
              </p>
              <span className="inline-block text-[10px] font-bold text-slate-600 uppercase tracking-widest border border-slate-800 px-2 py-0.5 rounded mb-3">
                Est. {COMPANY.founded} · Ranchi, India
              </span>
            </div>

            <div className="space-y-3">
              {[
                { icon: Mail,   text: COMPANY.email,               href: `mailto:${COMPANY.email}` },
                { icon: Phone,  text: COMPANY.phone,               href: `tel:${COMPANY.phone}` },
                { icon: MapPin, text: COMPANY.fullAddress,         href: "#" },
              ].map(({ icon: Icon, text, href }) => (
                <a
                  key={text}
                  href={href}
                  className="flex items-center gap-2.5 text-xs text-slate-500 transition-colors footer-hover-link"
                >
                  <Icon className="w-3.5 h-3.5 shrink-0" />
                  {text}
                </a>
              ))}
            </div>

            {/* Socials */}
            <div className="flex items-center gap-2 mt-4">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-8 h-8 rounded-lg flex items-center justify-center border border-slate-800 bg-slate-900 text-slate-400 transition-all footer-social-icon"
                >
                  <Icon className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Grid */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-5 gap-8">
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category} className="col-span-1">
                <h4 className="text-white font-bold text-[11px] uppercase tracking-wider mb-4">
                  {category}
                </h4>
                <ul className="space-y-3">
                  {links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-xs text-slate-400 transition-colors footer-hover-link"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-2">
            <h4 className="text-white font-bold text-[11px] uppercase tracking-wider mb-4">
              Subscribe
            </h4>
            <p className="text-xs leading-relaxed text-slate-400 mb-4">
              Get the latest tech updates and engineering insights delivered straight to your inbox.
            </p>
            {emailSent ? (
              <div className="flex items-center gap-2 py-3 px-3 rounded-lg border border-emerald-800 bg-emerald-950/30 text-emerald-400 text-xs font-semibold">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Thanks! You&apos;re subscribed.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <input
                  type="email"
                  placeholder="email@address.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-10 px-3 rounded-lg border border-slate-800 bg-slate-900 text-xs text-white placeholder-slate-600 focus:outline-none footer-input transition-colors"
                  required
                  aria-label="Email address for newsletter"
                />
                <button
                  type="submit"
                  className="w-full h-10 rounded-lg text-slate-950 font-bold text-xs flex items-center justify-center transition-colors hover:brightness-110 cursor-pointer"
                  style={{ backgroundColor: "var(--accent-primary)" }}
                >
                  SUBSCRIBE
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-8 border-t border-slate-900">
          <div className="flex flex-col sm:flex-row items-center gap-4 text-xs text-slate-500">
            <p>© {COMPANY.founded === new Date().getFullYear() ? COMPANY.founded : `${COMPANY.founded}–${new Date().getFullYear()}`} {COMPANY.name}. All rights reserved.</p>
            <span className="hidden sm:inline">•</span>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span>All systems operational</span>
            </div>
          </div>

          <div className="flex items-center gap-5 text-xs">
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
