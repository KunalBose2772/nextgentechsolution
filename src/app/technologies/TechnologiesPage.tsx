"use client";

import PageHero from "@/components/common/PageHero";
import TechStack from "@/components/sections/TechStack";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import Contact from "@/components/sections/Contact";

export default function TechnologiesPage() {
  return (
    <div className="bg-[#050505]">
      <PageHero
        badge="Technology Stack"
        title="Built with the Best"
        titleHighlight="Modern Technologies"
        description="We use the world's most powerful, battle-tested, and future-proof technology stack to build solutions that last."
        gradient="rgba(124,58,237,0.08)"
      />
      <TechStack />
      <WhyChooseUs />
      <Contact />
    </div>
  );
}
