import type { Metadata } from "next";
import ServicesPage from "./ServicesPage";

export const metadata: Metadata = {
  title: "Services — Web, Mobile, AI, SaaS, Cloud & More",
  description:
    "End-to-end technology services for modern businesses: web development, mobile apps, SaaS platforms, AI & ML solutions, cloud infrastructure, DevOps, ERP/CRM, UI/UX design, and digital transformation.",
  alternates: { canonical: "https://nextgentechsolution.org/services" },
  openGraph: {
    title: "Services — Web, Mobile, AI, SaaS & Cloud | NextGen Tech Solution",
    description: "Full-spectrum technology services. From MVP to enterprise scale — we build everything modern businesses need to win.",
    url: "https://nextgentechsolution.org/services",
    images: [{ url: "/images/og-image.png", width: 1200, height: 630 }],
  },
};

export default function Page() {
  return <ServicesPage />;
}
