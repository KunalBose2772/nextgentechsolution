"use client";

import PageHero from "@/components/common/PageHero";
import PortfolioGrid from "@/components/sections/PortfolioGrid";
import Contact from "@/components/sections/Contact";

export default function PortfolioPage() {
  return (
    <div className="min-h-screen bg-[#fafbfc]">
      <PageHero
        badge="Our Portfolio"
        title="150+ Projects,"
        titleHighlight="Proven"
        titleOutline="Results"
        description="A showcase of our best work — from early-stage startups to Fortune 500 enterprises across 10+ industries."
        breadcrumbs={[{ label: "Portfolio" }]}
      />
      
      {/* Light-themed filterable portfolio grid */}
      <PortfolioGrid />

      {/* Standard contact form & footer */}
      <Contact />
    </div>
  );
}
