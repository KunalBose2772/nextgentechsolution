"use client";

/* Trusted-by marquee — styled company name pills with subtle icons */

const companies = [
  { name: "Medtronic",  category: "Healthcare" },
  { name: "UNICEF",     category: "NGO" },
  { name: "Razorpay",   category: "Fintech" },
  { name: "Lenskart",   category: "E-Commerce" },
  { name: "Agoda",      category: "Travel" },
  { name: "Leafly",     category: "Tech" },
  { name: "Stripe",     category: "Payments" },
  { name: "Figma",      category: "Design" },
  { name: "Notion",     category: "Productivity" },
  { name: "Cloudflare", category: "Infrastructure" },
  { name: "Vercel",     category: "Cloud" },
  { name: "Linear",     category: "SaaS" },
];

// Duplicate for seamless infinite scroll
const track = [...companies, ...companies];

export default function TrustedBy() {
  return (
    <section
      className="relative py-10 overflow-hidden"
      style={{
        background: "#ffffff",
        borderBottom: "1px solid #f1f5f9",
      }}
    >
      {/* Label */}
      <p className="text-center text-[10px] font-bold uppercase tracking-[0.20em] text-slate-400 mb-7 select-none px-4">
        Trusted by innovative companies worldwide
      </p>

      {/* Marquee track */}
      <div
        className="relative"
        style={{
          maskImage:
            "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
        }}
      >
        <div
          className="flex items-center gap-4 w-max"
          style={{
            animation: "ng-marquee 32s linear infinite",
            willChange: "transform",
          }}
        >
          {track.map((company, i) => (
            <div
              key={`${company.name}-${i}`}
              className="flex items-center gap-2.5 px-5 py-2.5 rounded-full select-none cursor-default whitespace-nowrap transition-colors duration-200 group"
              style={{
                background: "#f8fafc",
                border: "1px solid #e2e8f0",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "var(--accent-global-dim)";
                e.currentTarget.style.borderColor = "rgba(124,58,237,0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#f8fafc";
                e.currentTarget.style.borderColor = "#e2e8f0";
              }}
            >
              {/* Dot */}
              <div
                className="w-1.5 h-1.5 rounded-full shrink-0"
                style={{ background: "var(--accent-global)" }}
              />
              <span
                className="text-sm font-bold tracking-tight text-slate-600"
                style={{ fontFamily: "'Sora', sans-serif" }}
              >
                {company.name}
              </span>
              <span
                className="text-[9px] font-bold uppercase tracking-widest text-slate-400 hidden sm:block"
              >
                {company.category}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
