"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  Zap,
  ExternalLink,
} from "lucide-react";
import { FaTwitter, FaLinkedinIn, FaGithub, FaInstagram, FaYoutube } from "react-icons/fa";
import { COMPANY, cn } from "@/lib/utils";

const footerLinks = {
  Company: [
    { label: "About Us", href: "/about" },
    { label: "Our Team", href: "/about#team" },
    { label: "Careers", href: "/careers" },
    { label: "Blog", href: "/blog" },
    { label: "Press Kit", href: "/press" },
  ],
  Services: [
    { label: "Web Development", href: "/services#web" },
    { label: "Mobile Apps", href: "/services#mobile" },
    { label: "SaaS Platforms", href: "/services#saas" },
    { label: "AI Solutions", href: "/services#ai" },
    { label: "Cloud Computing", href: "/services#cloud" },
    { label: "UI/UX Design", href: "/services#design" },
  ],
  Solutions: [
    { label: "Digital Transformation", href: "/solutions#digital" },
    { label: "Enterprise Software", href: "/solutions#enterprise" },
    { label: "E-Commerce", href: "/solutions#ecommerce" },
    { label: "FinTech", href: "/solutions#fintech" },
    { label: "HealthTech", href: "/solutions#health" },
    { label: "EdTech", href: "/solutions#education" },
  ],
  Technologies: [
    { label: "React & Next.js", href: "/technologies#frontend" },
    { label: "Node.js & Python", href: "/technologies#backend" },
    { label: "AWS & Azure", href: "/technologies#cloud" },
    { label: "Docker & Kubernetes", href: "/technologies#devops" },
    { label: "AI & Machine Learning", href: "/technologies#ai" },
    { label: "Databases", href: "/technologies#database" },
  ],
  Resources: [
    { label: "Case Studies", href: "/case-studies" },
    { label: "Portfolio", href: "/portfolio" },
    { label: "Documentation", href: "/docs" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Contact", href: "/contact" },
  ],
};

const socials = [
  { icon: FaTwitter, href: COMPANY.social.twitter, label: "Twitter", color: "hover:text-blue-400" },
  { icon: FaLinkedinIn, href: COMPANY.social.linkedin, label: "LinkedIn", color: "hover:text-blue-500" },
  { icon: FaGithub, href: COMPANY.social.github, label: "GitHub", color: "hover:text-white" },
  { icon: FaInstagram, href: COMPANY.social.instagram, label: "Instagram", color: "hover:text-pink-400" },
  { icon: FaYoutube, href: COMPANY.social.youtube, label: "YouTube", color: "hover:text-red-500" },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[#030303]" />
      <div className="absolute inset-0 bg-dot opacity-30" />

      {/* Gradient glow */}
      <div className="absolute top-0 left-1/4 w-96 h-48 bg-blue-500/5 rounded-full blur-3xl" />
      <div className="absolute top-0 right-1/4 w-96 h-48 bg-violet-500/5 rounded-full blur-3xl" />

      <div className="relative container-xl py-20">
        {/* Top Section: Brand + Newsletter */}
        <div className="flex flex-col lg:flex-row items-start justify-between gap-12 mb-16 pb-16 border-b border-white/5">
          {/* Brand */}
          <div className="lg:max-w-sm">
            <Link href="/" className="flex items-center gap-3 group mb-6">
              <motion.div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, #3b82f6, #7c3aed)" }}
                whileHover={{ scale: 1.05, rotate: 5 }}
              >
                <Zap className="w-5 h-5 text-white" />
              </motion.div>
              <div>
                <span className="text-white font-bold text-lg leading-none block">NextGen Tech Solution</span>
                <span className="text-white/30 text-xs tracking-wider">nextgentechsolution.org</span>
              </div>
            </Link>

            <p className="text-white/50 text-sm leading-relaxed mb-6">
              Transforming ideas into intelligent digital solutions. We build world-class software for forward-thinking enterprises and startups.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              {[
                { icon: Mail, label: COMPANY.email, href: `mailto:${COMPANY.email}` },
                { icon: Phone, label: COMPANY.phone, href: `tel:${COMPANY.phone}` },
                { icon: MapPin, label: COMPANY.location, href: "#" },
              ].map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  className="flex items-center gap-3 text-white/40 hover:text-white/70 text-sm transition-colors"
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{label}</span>
                </a>
              ))}
            </div>

            {/* Socials */}
            <div className="flex items-center gap-3 mt-6">
              {socials.map(({ icon: Icon, href, label, color }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className={cn("p-2.5 rounded-xl bg-white/4 text-white/40 border border-white/5 transition-all duration-200", color)}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div className="lg:max-w-md w-full">
            <div className="glass-card p-8 rounded-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 mb-4">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                <span className="text-blue-400 text-xs font-medium">Newsletter</span>
              </div>
              <h3 className="text-white text-xl font-bold mb-2">Stay ahead of the curve</h3>
              <p className="text-white/50 text-sm mb-6">Get the latest insights on technology, innovation, and digital transformation delivered to your inbox.</p>
              <form
                className="flex gap-3"
                onSubmit={(e) => e.preventDefault()}
              >
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="premium-input flex-1 text-sm"
                />
                <motion.button
                  type="submit"
                  className="px-5 py-3 rounded-xl text-white font-semibold text-sm flex items-center gap-2 shrink-0"
                  style={{ background: "linear-gradient(135deg, #3b82f6, #7c3aed)" }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Subscribe
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </form>
              <p className="text-white/25 text-xs mt-3">No spam. Unsubscribe at any time.</p>
            </div>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 mb-16">
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-white/80 font-semibold text-sm mb-4 tracking-wide">{category}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-white/40 hover:text-white/70 text-sm transition-colors group flex items-center gap-1.5"
                    >
                      <span>{link.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-white/5">
          <p className="text-white/30 text-sm">
            © {new Date().getFullYear()} NextGen Tech Solution. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="text-white/30 hover:text-white/60 text-sm transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="text-white/30 hover:text-white/60 text-sm transition-colors">Terms of Service</Link>
            <a
              href={COMPANY.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/30 hover:text-white/60 text-sm transition-colors flex items-center gap-1.5"
            >
              nextgentechsolution.org
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}


