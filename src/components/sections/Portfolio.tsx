"use client";

import { useRef, useState, useLayoutEffect } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ── Google Fonts for Syne + Playfair ─────────────────────────────── */
const FONT_IMPORT = `
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Playfair+Display:ital,wght@1,700&display=swap');
`;

const projects = [
  {
    id: "1",
    title: "SEO is a Cost-Effective Advertising.",
    tags: ["seo agency", "digital", "marketing"],
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=700&q=80",
  },
  {
    id: "2",
    title: "Brand Awareness via Influencer Collaboration.",
    tags: ["seo agency", "digital", "marketing"],
    image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=700&q=80",
  },
  {
    id: "3",
    title: "Lead Generation Campaign for Real Estate Agency.",
    tags: ["seo agency", "digital", "marketing"],
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=700&q=80",
  },
  {
    id: "4",
    title: "Google Ads Optimization for Online Retailer.",
    tags: ["seo agency", "digital", "marketing"],
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=700&q=80",
  },
  {
    id: "5",
    title: "Market Expansion Mastery: A Case Study in Global Growth.",
    tags: ["seo agency", "digital", "marketing"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=700&q=80",
  },
  {
    id: "6",
    title: "Brand Awareness Campaign for Tech Company.",
    tags: ["seo agency", "digital", "marketing"],
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=700&q=80",
  },
];

/* ── Gradient Arrow SVG (exact from Reliable theme) ─────────────────── */
function ArrowIcon({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 61 61" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="arr1" x1="0.546204" y1="30.5091" x2="60.4725" y2="30.5091" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FF4A68" /><stop offset="1" stopColor="#FC9C44" />
        </linearGradient>
        <linearGradient id="arr2" x1="36.2991" y1="12.6318" x2="60.4709" y2="12.6318" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FF4A68" /><stop offset="1" stopColor="#FC9C44" />
        </linearGradient>
        <clipPath id="arrclip">
          <rect width="59.9264" height="59.9264" fill="white" transform="translate(0.546021 0.545898)" />
        </clipPath>
      </defs>
      <g clipPath="url(#arrclip)">
        <path d="M1.8336 60.4724C1.50412 60.4724 1.17464 60.3467 0.923231 60.0953C0.420528 59.5925 0.420528 58.7773 0.923231 58.2744L58.2746 0.923013C58.7775 0.420194 59.5927 0.420194 60.0955 0.923013C60.5982 1.42583 60.5982 2.24104 60.0955 2.74386L2.74408 60.0953C2.49255 60.3468 2.16307 60.4724 1.8336 60.4724Z" fill="url(#arr1)" />
        <path d="M59.1834 24.7176C58.4724 24.7176 57.8959 24.1412 57.8959 23.4302V3.12086H37.5866C36.8756 3.12086 36.2991 2.54442 36.2991 1.83338C36.2991 1.12234 36.8756 0.545898 37.5866 0.545898H59.1834C59.8944 0.545898 60.4709 1.12234 60.4709 1.83338V23.4302C60.4709 24.1412 59.8944 24.7176 59.1834 24.7176Z" fill="url(#arr2)" />
      </g>
    </svg>
  );
}

/* ── Project Card ────────────────────────────────────────────────────── */
function ProjectCard({ project, cardRef }: {
  project: typeof projects[0];
  cardRef?: (el: HTMLDivElement | null) => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      ref={cardRef}
      className="ra-project3-item"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        flexShrink: 0,
        width: 520,
        height: 576,
        background: "#ffffff",
        borderRadius: 32,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        cursor: "pointer",
        boxShadow: hovered
          ? "0 32px 80px rgba(0,0,0,0.30)"
          : "0 8px 32px rgba(0,0,0,0.14)",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        transition: "box-shadow 0.4s ease, transform 0.4s ease",
        willChange: "transform",
      }}
    >
      {/* ── Text block ── */}
      <div style={{ padding: "40px 32px 24px 32px" }}>
        {/* Title + Arrow row */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16, marginBottom: 20 }}>
          <h3
            className="href-underline"
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: 24,
              fontWeight: 700,
              color: "#1c1c2d",
              lineHeight: 1.35,
              letterSpacing: "-0.01em",
              textDecoration: hovered ? "underline" : "none",
              textUnderlineOffset: 4,
              textDecorationColor: "rgba(28,28,45,0.3)",
              flex: 1,
            }}
          >
            {project.title}
          </h3>
          <div
            style={{
              flexShrink: 0,
              marginTop: 2,
              transform: hovered ? "translate(3px,-3px)" : "translate(0,0)",
              transition: "transform 0.3s ease",
            }}
          >
            <ArrowIcon size={36} />
          </div>
        </div>

        {/* Tags — exact style: bg #e9ebed, Inter 14px, #46505b */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {project.tags.map((tag) => (
            <span
              key={tag}
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 14,
                fontWeight: 400,
                color: "#46505b",
                background: "#e9ebed",
                padding: "6px 14px",
                borderRadius: 6,
                textTransform: "uppercase",
                letterSpacing: "0.04em",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* ── Image block (fills remaining space) ── */}
      <div
        style={{
          flex: 1,
          margin: "0 18px 18px 18px",
          borderRadius: 20,
          overflow: "hidden",
          minHeight: 0,
        }}
      >
        <img
          src={project.image}
          alt={project.title}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transform: hovered ? "scale(1.06)" : "scale(1)",
            transition: "transform 1.2s ease",
            display: "block",
          }}
          loading="lazy"
        />
      </div>
    </div>
  );
}

/* ── Circular "View All Services" button (last item, exact from theme) ── */
function CircleBtn() {
  const [hovered, setHovered] = useState(false);
  return (
    <Link
      href="/portfolio"
      style={{
        flexShrink: 0,
        width: 208,
        height: 208,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Gradient circle */}
      <svg
        width="208" height="208" viewBox="0 0 208 208" fill="none"
        style={{
          position: "absolute",
          inset: 0,
          transform: hovered ? "rotate(15deg)" : "rotate(0deg)",
          transition: "transform 0.5s ease",
        }}
      >
        <defs>
          <linearGradient id="circleg" x1="0.981598" y1="103.509" x2="208" y2="103.509" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FF4A68" /><stop offset="1" stopColor="#FC9C44" />
          </linearGradient>
        </defs>
        <circle cx="104.491" cy="103.509" r="102.509" stroke="url(#circleg)" strokeWidth="2" />
      </svg>
      {/* Inner arrow */}
      <div style={{
        transform: hovered ? "translate(5px,-5px)" : "translate(0,0)",
        transition: "transform 0.3s ease",
        position: "relative",
        zIndex: 1,
      }}>
        <ArrowIcon size={61} />
      </div>
    </Link>
  );
}

/* ── Section Title Component ─────────────────────────────────────────── */
function SectionTitle({ align = "left" }: { align?: "left" | "right" }) {
  return (
    <h2 style={{ lineHeight: 1.1, textAlign: align }}>
      <span style={{
        display: "block",
        fontFamily: "'Syne', sans-serif",
        fontSize: 55,
        fontWeight: 700,
        color: "#ffffff",
        letterSpacing: "-0.02em",
      }}>
        Recent
      </span>
      <span style={{
        display: "block",
        fontFamily: "'Playfair Display', serif",
        fontSize: 55,
        fontWeight: 700,
        fontStyle: "italic",
        color: "#ffffff",
        letterSpacing: "-0.01em",
      }}>
        Our Projects
      </span>
    </h2>
  );
}

/* ── Main Section ────────────────────────────────────────────────────── */
export default function Portfolio() {
  const sectionRef = useRef<HTMLElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const wrap = wrapRef.current;
    if (!section || !wrap) return;

    const ctx = gsap.context(() => {
      gsap.to(wrap, {
        x: () => -(wrap.scrollWidth - section.clientWidth),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${wrap.scrollWidth - section.clientWidth}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          anticipatePin: 1,
          pinSpacing: true,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* Inject Syne + Playfair fonts */}
      <style>{FONT_IMPORT}</style>

      {/* Portfolio section styles */}
      <style>{`
        #portfolio-section {
          position: relative;
          overflow: hidden;
          height: 100vh;
        }
        .ra-project3-wrap {
          display: flex;
          flex-direction: row;
          align-items: center;
          height: 100%;
          width: max-content;
          padding-top: 0;
          padding-bottom: 0;
          position: relative;
        }
        .ra-pro-bg {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          pointer-events: none;
          z-index: 0;
        }
        /* Left title panel */
        .ra-project3-title-2 {
          flex-shrink: 0;
          display: flex;
          align-items: center;
          padding: 0 60px 0 80px;
          min-width: 340px;
          position: relative;
          z-index: 2;
        }
        /* Cards row */
        .ra-project3-content {
          display: flex;
          flex-direction: row;
          align-items: center;
          gap: 36px;
          flex-shrink: 0;
          position: relative;
          z-index: 2;
          padding: 0 36px;
        }
        /* Right title panel */
        .ra-project3-title {
          flex-shrink: 0;
          display: flex;
          align-items: center;
          padding: 0 80px 0 60px;
          min-width: 340px;
          position: relative;
          z-index: 2;
        }
        @media (max-width: 1024px) {
          .ra-project3-title-2 { min-width: 260px; padding: 0 32px 0 40px; }
          .ra-project3-title { min-width: 260px; padding: 0 40px 0 32px; }
          .ra-project3-content { gap: 20px; padding: 0 20px; }
        }
      `}</style>

      <section
        ref={sectionRef}
        id="portfolio-section"
        className="relative"
        style={{ background: "#0d0d1a" }}
      >
        {/* ── Wide horizontal scroll container ── */}
        <div ref={wrapRef} className="ra-project3-wrap">

          {/* Background image layer */}
          <img
            className="ra-pro-bg"
            src="https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=2000&q=40"
            alt="background"
            style={{ opacity: 0.12, objectFit: "cover" }}
          />
          {/* Dark overlay */}
          <div style={{
            position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none",
            background: "linear-gradient(135deg, #0d0d1a 0%, #13111f 50%, #0f0d1a 100%)",
            opacity: 0.92,
          }} />

          {/* ── LEFT TITLE (ra-project3-title-2) ── */}
          <div className="ra-project3-title-2">
            <SectionTitle align="left" />
          </div>

          {/* ── CARDS ROW (ra-project3-content) ── */}
          <div className="ra-project3-content">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}

            {/* Last item: circular button */}
            <CircleBtn />
          </div>

          {/* ── RIGHT TITLE (ra-project3-title) ── */}
          <div className="ra-project3-title">
            <SectionTitle align="right" />
          </div>

        </div>
      </section>
    </>
  );
}
