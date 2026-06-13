"use client";

import PageHero from "@/components/common/PageHero";
import Contact from "@/components/sections/Contact";
import FAQ from "@/components/sections/FAQ";

export default function ContactPage() {
  return (
    <div className="bg-white">
      <PageHero
        badge="Contact Us"
        title="Let's Start a"
        titleHighlight="Conversation"
        description="Whether you have a project in mind, a question, or just want to say hello — we'd love to hear from you."
        breadcrumbs={[{ label: "Contact" }]}
      />
      <Contact />
      <FAQ />
    </div>
  );
}
