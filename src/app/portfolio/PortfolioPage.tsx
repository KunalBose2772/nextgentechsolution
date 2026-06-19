"use client";

import PageHero from "@/components/common/PageHero";
import Portfolio from "@/components/sections/Portfolio";
import CaseStudies from "@/components/sections/CaseStudies";
import Contact from "@/components/sections/Contact";

export default function PortfolioPage() {
  return (
    <div className="min-h-screen" style={{ background: "var(--bg-primary)" }}>
      <PageHero
        badge="Our Portfolio"
        title="150+ Projects,"
        titleHighlight="Proven"
        titleOutline="Results"
        description="A showcase of our best work — from early-stage startups to Fortune 500 enterprises across 10+ industries."
        breadcrumbs={[{ label: "Portfolio" }]}
      />
      <Portfolio />
      <CaseStudies theme="dark" />
      <Contact />
    </div>
  );
}
