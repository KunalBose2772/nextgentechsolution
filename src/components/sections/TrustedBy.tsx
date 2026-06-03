"use client";

import { motion } from "framer-motion";

const companies = [
  "Stripe", "Vercel", "Linear", "Notion", "Figma",
  "OpenAI", "Supabase", "Raycast", "Framer", "Loom",
  "Plex", "Pitch", "Coda", "Retool", "Segment",
  "Amplitude", "Mixpanel", "Datadog", "Posthog", "Sentry",
];

function LogoItem({ name }: { name: string }) {
  return (
    <motion.div
      className="flex items-center justify-center px-8 py-4 mx-3 rounded-xl glass border border-white/5 group flex-shrink-0"
      whileHover={{ scale: 1.05 }}
    >
      <span className="text-white/25 group-hover:text-white/60 transition-colors duration-300 font-semibold text-sm whitespace-nowrap tracking-wide">
        {name}
      </span>
    </motion.div>
  );
}

export default function TrustedBy() {
  return (
    <section className="py-20 relative overflow-hidden border-y border-white/5">
      <div className="absolute inset-0 bg-[#080808]" />

      <div className="container-xl relative mb-10">
        <motion.p
          className="text-center text-white/30 text-sm font-medium tracking-widest uppercase"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Trusted by forward-thinking companies
        </motion.p>
      </div>

      {/* Marquee Row 1 */}
      <div className="relative overflow-hidden mb-4">
        {/* Fade masks */}
        <div className="absolute left-0 top-0 bottom-0 w-32 z-10"
          style={{ background: "linear-gradient(to right, #080808, transparent)" }} />
        <div className="absolute right-0 top-0 bottom-0 w-32 z-10"
          style={{ background: "linear-gradient(to left, #080808, transparent)" }} />

        <div className="flex animate-marquee w-max">
          {[...companies, ...companies].map((name, i) => (
            <LogoItem key={`${name}-${i}`} name={name} />
          ))}
        </div>
      </div>

      {/* Marquee Row 2 (reverse) */}
      <div className="relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-32 z-10"
          style={{ background: "linear-gradient(to right, #080808, transparent)" }} />
        <div className="absolute right-0 top-0 bottom-0 w-32 z-10"
          style={{ background: "linear-gradient(to left, #080808, transparent)" }} />

        <div className="flex animate-marquee-reverse w-max">
          {[...companies.slice(10), ...companies.slice(0, 10), ...companies.slice(10), ...companies.slice(0, 10)].map((name, i) => (
            <LogoItem key={`r-${name}-${i}`} name={name} />
          ))}
        </div>
      </div>
    </section>
  );
}
