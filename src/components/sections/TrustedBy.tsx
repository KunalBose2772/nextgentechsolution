"use client";

const companies = [
  "Medtronic",
  "UNICEF",
  "CIRCLE",
  "Razorpay",
  "Lenskart",
  "Agoda",
  "Leafly",
  "Stripe",
  "Figma",
  "Notion",
];

// Duplicate for seamless infinite scroll
const track = [...companies, ...companies];

export default function TrustedBy() {
  return (
    <section className="py-10 bg-white border-b border-slate-100 overflow-hidden">
      {/* Label */}
      <p className="text-center text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400 mb-7 select-none">
        Trusted by innovative companies worldwide
      </p>

      {/* Marquee track */}
      <div
        className="relative"
        style={{
          maskImage:
            "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)",
        }}
      >
        <div
          className="flex items-center gap-16 w-max"
          style={{
            animation: "ng-marquee 28s linear infinite",
            willChange: "transform",
          }}
        >
          {track.map((name, i) => (
            <span
              key={`${name}-${i}`}
              className="text-base font-bold tracking-tight text-slate-300 hover:text-slate-600 transition-colors duration-200 cursor-default select-none whitespace-nowrap"
              style={{ fontFamily: "'Sora', sans-serif" }}
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
