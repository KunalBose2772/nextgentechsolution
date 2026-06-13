"use client";

import PageHero from "@/components/common/PageHero";
import TechStack from "@/components/sections/TechStack";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import Contact from "@/components/sections/Contact";

export default function TechnologiesPage() {
  return (
    <div className="bg-white">
      <PageHero
        badge="Technology Stack"
        title="Built with the Best"
        titleHighlight="Modern Technologies"
        description="We use the world's most powerful, battle-tested, and future-proof technology stack to build solutions that last."
        breadcrumbs={[{ label: "Technologies" }]}
      />
      <TechStack />
      <WhyChooseUs />
      <Contact />
    </div>
  );
}
