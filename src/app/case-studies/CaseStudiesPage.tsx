"use client";

import PageHero from "@/components/common/PageHero";
import CaseStudies from "@/components/sections/CaseStudies";
import Testimonials from "@/components/sections/Testimonials";
import Contact from "@/components/sections/Contact";

export default function CaseStudiesPage() {
  return (
    <div className="bg-[#050505]">
      <PageHero
        badge="Case Studies"
        title="Real Problems,"
        titleHighlight="Real Solutions"
        description="In-depth stories of how we've transformed businesses through technology — with the numbers to prove it."
        breadcrumbs={[{ label: "Case Studies" }]}
      />
      <CaseStudies />
      <Testimonials />
      <Contact />
    </div>
  );
}
