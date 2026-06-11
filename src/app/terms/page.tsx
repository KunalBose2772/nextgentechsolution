"use client";

import { motion } from "framer-motion";
import PageHero from "@/components/common/PageHero";
import { FileText, ShieldAlert, Award, FileSignature } from "lucide-react";
import { useState, useEffect } from "react";

const sections = [
  { id: "acceptance", title: "1. Acceptance of Terms" },
  { id: "services-scope", title: "2. Scope of Services" },
  { id: "intellectual-property", title: "3. Intellectual Property" },
  { id: "user-obligations", title: "4. User & Client Obligations" },
  { id: "payment-billing", title: "5. Invoicing & Payment Terms" },
  { id: "termination", title: "6. Agreement Termination" },
  { id: "liability-limits", title: "7. Limitations of Liability" },
  { id: "dispute-resolution", title: "8. Dispute Resolution" },
  { id: "contact-support", title: "9. Technical Support & Inquiries" },
];

export default function TermsPage() {
  const [activeSection, setActiveSection] = useState("acceptance");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      for (const section of sections) {
        const el = document.getElementById(section.id);
        if (el) {
          const { top, bottom } = el.getBoundingClientRect();
          const absoluteTop = top + window.scrollY;
          const absoluteBottom = bottom + window.scrollY;
          if (scrollPosition >= absoluteTop && scrollPosition <= absoluteBottom) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = el.getBoundingClientRect().top + window.scrollY - 120;
      window.scrollTo({ top: offset, behavior: "smooth" });
    }
  };

  return (
    <div className="bg-[#050505] min-h-screen text-slate-355 font-inter">
      <PageHero
        badge="Legal & compliance"
        title="Terms of Service &"
        titleHighlight="Agreements"
        description="Last Updated: June 11, 2026. Review our software development, billing policies, and client specifications."
        gradient="rgba(245, 158, 11, 0.08)"
        accentColor="#F59E0B"
      />

      <section className="py-20 border-t border-white/5 relative">
        <div className="absolute inset-0 pointer-events-none opacity-[0.01] ng-grid-bg" />
        <div className="ng-container relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Sidebar Table of Contents */}
            <div className="lg:col-span-4 lg:sticky lg:top-28 space-y-6">
              <div 
                className="rounded-2xl p-6 border border-white/5 bg-white/[0.01] backdrop-blur-md"
              >
                <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4 font-sora">
                  Table of Contents
                </h3>
                <div className="space-y-1">
                  {sections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => scrollToSection(section.id)}
                      className="w-full text-left py-2 px-3 rounded-lg text-xs font-semibold transition-all duration-200 flex items-center justify-between cursor-pointer"
                      style={{
                        backgroundColor: activeSection === section.id ? "rgba(245, 158, 11, 0.08)" : "transparent",
                        color: activeSection === section.id ? "#F59E0B" : "#64748B",
                      }}
                    >
                      {section.title}
                    </button>
                  ))}
                </div>
              </div>

              {/* Legal Signing Note */}
              <div className="rounded-2xl p-6 border border-white/5 bg-gradient-to-br from-white/[0.02] to-transparent">
                <div className="w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-3">
                  <FileSignature className="w-4 h-4 text-amber-400" />
                </div>
                <h4 className="text-white text-xs font-bold font-sora mb-1">Contract Execution</h4>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  Individual project development contracts are governed by additional explicit Statements of Work (SOWs).
                </p>
              </div>
            </div>

            {/* Right Side Content Body */}
            <div className="lg:col-span-8 space-y-12">
              <div 
                className="prose prose-invert max-w-none rounded-3xl p-8 md:p-10 border border-white/5 bg-white/[0.01] backdrop-blur-md space-y-10"
              >
                {/* 1. Acceptance of Terms */}
                <div id="acceptance" className="scroll-mt-32">
                  <div className="flex items-center gap-2 mb-3">
                    <ShieldAlert className="w-5 h-5 text-amber-400" />
                    <h2 className="text-white font-bold text-[19px] font-sora m-0">1. Acceptance of Terms</h2>
                  </div>
                  <p className="text-[13.5px] leading-relaxed text-slate-400">
                    By viewing or utilizing the website of NextGen Tech Solution, or signing quotation contracts generated by our team, you declare full compliance with these Terms of Service. If you disagree with any specific legal bounds, please exit our platform.
                  </p>
                </div>

                {/* 2. Scope of Services */}
                <div id="services-scope" className="scroll-mt-32 border-t border-white/[0.04] pt-8">
                  <div className="flex items-center gap-2 mb-3">
                    <FileText className="w-5 h-5 text-amber-400" />
                    <h2 className="text-white font-bold text-[19px] font-sora m-0">2. Scope of Services</h2>
                  </div>
                  <p className="text-[13.5px] leading-relaxed text-slate-400">
                    NextGen Tech Solution specializes in custom web development, mobile applications, SaaS platform development, data analytics architectures, cloud migration, and AI automation software. Scope definitions, targets, and delivery schedules will be formally managed in individual Statements of Work (SOWs).
                  </p>
                </div>

                {/* 3. Intellectual Property */}
                <div id="intellectual-property" className="scroll-mt-32 border-t border-white/[0.04] pt-8">
                  <div className="flex items-center gap-2 mb-3">
                    <Award className="w-5 h-5 text-amber-400" />
                    <h2 className="text-white font-bold text-[19px] font-sora m-0">3. Intellectual Property</h2>
                  </div>
                  <p className="text-[13.5px] leading-relaxed text-slate-400">
                    Unless stated otherwise in individual contracts, NextGen Tech Solution reserves all structural IP over our pre-existing code frameworks, library elements, and modules. Upon final project settlement, proprietary client code, custom layouts, and databases are assigned to the client.
                  </p>
                </div>

                {/* 4. User & Client Obligations */}
                <div id="user-obligations" className="scroll-mt-32 border-t border-white/[0.04] pt-8">
                  <h2 className="text-white font-bold text-[19px] font-sora mb-3">4. User & Client Obligations</h2>
                  <p className="text-[13.5px] leading-relaxed text-slate-400">
                    Clients must provide required API access keys, asset files, and text details promptly. Any delays caused by third-party vendor configurations outside our team&apos;s reach are not the responsibility of NextGen Tech Solution.
                  </p>
                </div>

                {/* 5. Invoicing & Payment Terms */}
                <div id="payment-billing" className="scroll-mt-32 border-t border-white/[0.04] pt-8">
                  <h2 className="text-white font-bold text-[19px] font-sora mb-3">5. Invoicing & Payment Terms</h2>
                  <p className="text-[13.5px] leading-relaxed text-slate-400">
                    Payment milestones are structured based on task checkpoints. Invoices are issued with a Net-15 payment term. Late payments will generate a 1.5% interest rate fee per month of default.
                  </p>
                </div>

                {/* 6. Agreement Termination */}
                <div id="termination" className="scroll-mt-32 border-t border-white/[0.04] pt-8">
                  <h2 className="text-white font-bold text-[19px] font-sora mb-3">6. Agreement Termination</h2>
                  <p className="text-[13.5px] leading-relaxed text-slate-400">
                    Either party may terminate active SOW agreements with a 30-day written notification window. Upon termination notice, all fees for development milestones reached up to the date of notice must be settled.
                  </p>
                </div>

                {/* 7. Limitations of Liability */}
                <div id="liability-limits" className="scroll-mt-32 border-t border-white/[0.04] pt-8">
                  <h2 className="text-white font-bold text-[19px] font-sora mb-3">7. Limitations of Liability</h2>
                  <p className="text-[13.5px] leading-relaxed text-slate-400">
                    NextGen Tech Solution is not liable for indirect, incidental, or special damages, including database loss, lost sales, or downtime incidents arising from server issues of hosting vendors like AWS or Azure.
                  </p>
                </div>

                {/* 8. Dispute Resolution */}
                <div id="dispute-resolution" className="scroll-mt-32 border-t border-white/[0.04] pt-8">
                  <h2 className="text-white font-bold text-[19px] font-sora mb-3">8. Dispute Resolution</h2>
                  <p className="text-[13.5px] leading-relaxed text-slate-400">
                    Disputes arising from this agreement will be settled through arbitration under the laws of Ranchi, Jharkhand.
                  </p>
                </div>

                {/* 9. Technical Support & Inquiries */}
                <div id="contact-support" className="scroll-mt-32 border-t border-white/[0.04] pt-8">
                  <h2 className="text-white font-bold text-[19px] font-sora mb-3">9. Technical Support & Inquiries</h2>
                  <p className="text-[13.5px] leading-relaxed text-slate-400">
                    If you have questions regarding our legal boundaries, please contact:
                  </p>
                  <p className="text-[13.5px] text-white font-bold font-sora mt-3">
                    Email: compliance@nextgentechsolutions.com<br />
                    Office Address: 509, RR Tower, Ratu Road, Ranchi, Jharkhand
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
