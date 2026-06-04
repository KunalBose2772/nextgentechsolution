"use client";

import { motion } from "framer-motion";

const companies = [
  "Medtronic", "unicef", "CIRCLE", "Razorpay", "lenskart", "agoda", "Leafly",
];

function LogoItem({ name }: { name: string }) {
  // Map specific style or typography to make them look like professional logotypes
  const isCircle = name === "CIRCLE";
  const isLenskart = name === "lenskart";
  const isAgoda = name === "agoda";

  return (
    <div className="flex items-center justify-center px-8 py-4 mx-4 flex-shrink-0 transition-colors duration-300">
      <span
        className="font-bold text-[18px] md:text-[22px] tracking-tight opacity-40 hover:opacity-75 transition-opacity"
        style={{
          color: "#475569",
          fontFamily: isCircle ? "Inter, sans-serif" : "Sora, sans-serif",
          textTransform: isCircle ? "uppercase" : "none",
          letterSpacing: isCircle ? "0.08em" : "-0.02em",
        }}
      >
        {name === "unicef" ? (
          <span className="flex items-center gap-1">
            <span className="text-[12px] font-normal leading-none">🇺🇳</span> unicef
          </span>
        ) : isLenskart ? (
          <span className="flex items-center gap-1.5">
            <span>👓</span> lenskart
          </span>
        ) : isAgoda ? (
          <span className="flex items-center gap-1">
            agoda<span className="text-[#2563EB] text-[26px] leading-none">.</span>
          </span>
        ) : (
          name
        )}
      </span>
    </div>
  );
}

export default function TrustedBy() {
  return (
    <section
      className="relative overflow-hidden pb-14"
      style={{
        background: "#F8FAFC",
        paddingTop: "90px", // space for the white stats card overlapping from Hero
        borderBottom: "1px solid #E2E8F0",
      }}
    >
      <div className="ng-container relative mb-4">
        <motion.p
          className="text-center text-[11px] font-bold tracking-[0.15em] uppercase"
          style={{ color: "#94A3B8" }}
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Trusted by Innovative Companies
        </motion.p>
      </div>

      {/* Single continuous scrolling marquee */}
      <div className="relative overflow-hidden flex items-center h-20">
        <div
          className="absolute left-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to right, #F8FAFC, transparent)" }}
        />
        <div
          className="absolute right-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to left, #F8FAFC, transparent)" }}
        />
        <div
          className="flex w-max"
          style={{ animation: "ng-marquee 24s linear infinite" }}
        >
          {[...companies, ...companies, ...companies].map((name, i) => (
            <LogoItem key={`${name}-${i}`} name={name} />
          ))}
        </div>
      </div>
    </section>
  );
}
