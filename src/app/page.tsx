import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import TrustedBy from "@/components/sections/TrustedBy";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import TechStack from "@/components/sections/TechStack";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import Portfolio from "@/components/sections/Portfolio";
import CaseStudies from "@/components/sections/CaseStudies";
import Testimonials from "@/components/sections/Testimonials";
import Process from "@/components/sections/Process";
import Careers from "@/components/sections/Careers";
import Blog from "@/components/sections/Blog";
import FAQ from "@/components/sections/FAQ";
import Contact from "@/components/sections/Contact";

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
      <TechStack />
      <WhyChooseUs />
      <Portfolio />
      <CaseStudies />
      <Testimonials />
      <Process />
      <Careers />
      <Blog />
      <FAQ />
      <Contact />
    </>
  );
}
