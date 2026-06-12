import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Hero from "@/components/sections/Hero";

// Dynamic imports to code-split and lazy-load all sections below the fold.
// This significantly reduces the initial JS bundle size and improves the page load performance.
const TrustedBy = dynamic(() => import("@/components/sections/TrustedBy"));
const About = dynamic(() => import("@/components/sections/About"));
const Services = dynamic(() => import("@/components/sections/Services"));
const Process = dynamic(() => import("@/components/sections/Process"));
const TechStack = dynamic(() => import("@/components/sections/TechStack"));
const WhyChooseUs = dynamic(() => import("@/components/sections/WhyChooseUs"));
const Portfolio = dynamic(() => import("@/components/sections/Portfolio"));
const Testimonials = dynamic(() => import("@/components/sections/Testimonials"));
const Blog = dynamic(() => import("@/components/sections/Blog"));
const FAQ = dynamic(() => import("@/components/sections/FAQ"));
const Contact = dynamic(() => import("@/components/sections/Contact"));

export const metadata: Metadata = {
  title: "NextGen Tech Solution — Premium IT Company | Web, Mobile, AI & SaaS",
  description:
    "Build world-class web apps, mobile apps, SaaS platforms, and AI solutions with NextGen Tech Solution. 150+ projects delivered. 50+ global clients. India's premium tech partner.",
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustedBy />
      <About />
      <Services />
      <Process />
      <TechStack />
      <WhyChooseUs />
      <Portfolio />
      <Testimonials />
      <Blog />
      <FAQ />
      <Contact />
    </>
  );
}
