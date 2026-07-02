import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollToTop from "@/components/ui/ScrollToTop";
import OnboardingModal from "@/components/shared/OnboardingModal";
import BookDemoModal from "@/components/shared/BookDemoModal";
import { Toaster } from "react-hot-toast";

const CRM_PATHS = ["/dashboard", "/admin", "/telecallers", "/superadmin"];

export const metadata: Metadata = {
  title: {
    default: "NextGen Tech Solution — Engineering Tomorrow's Digital Future",
    template: "%s | NextGen Tech Solution",
  },
  description:
    "Premium technology company specializing in AI, SaaS, Enterprise Software, Automation, Cloud Infrastructure, and Digital Transformation. 150+ projects delivered to 50+ global clients.",
  metadataBase: new URL("https://nextgentechsolution.org"),
  keywords: [
    "AI solutions", "SaaS development", "enterprise software", "digital transformation",
    "cloud infrastructure", "web development", "mobile app development",
    "software company India", "IT company Ranchi Jharkhand", "custom software development",
    "Next.js developer", "React developer", "machine learning solutions",
    "DevOps CI/CD", "ERP CRM development", "UI UX design", "full-stack development",
    "NextGen Tech Solution", "nextgentechsolution.org",
  ],
  authors: [{ name: "NextGen Tech Solution", url: "https://nextgentechsolution.org" }],
  creator: "NextGen Tech Solution",
  publisher: "NextGen Tech Solution",
  alternates: {
    canonical: "https://nextgentechsolution.org",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://nextgentechsolution.org",
    siteName: "NextGen Tech Solution",
    title: "NextGen Tech Solution — Engineering Tomorrow's Digital Future",
    description:
      "Premium technology company delivering AI, SaaS, Enterprise Software, and Digital Transformation. 150+ projects, 50+ global clients.",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "NextGen Tech Solution — Engineering Tomorrow's Digital Future",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@nextgentechsol",
    creator: "@nextgentechsol",
    title: "NextGen Tech Solution — Engineering Tomorrow's Digital Future",
    description:
      "AI, SaaS, and Enterprise Software for the modern world. 150+ projects, 50+ global clients.",
    images: ["/images/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/images/favicon.png",
    shortcut: "/images/favicon.png",
    apple: "/images/favicon.png",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
    { media: "(prefers-color-scheme: light)", color: "#000000" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

/* ── JSON-LD Structured Data ─────────────────────────────────────── */
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://nextgentechsolution.org/#organization",
      name: "NextGen Tech Solution",
      url: "https://nextgentechsolution.org",
      logo: {
        "@type": "ImageObject",
        url: "https://nextgentechsolution.org/images/logo.png",
        width: 400,
        height: 100,
      },
      sameAs: [
        "https://twitter.com/nextgentechsol",
        "https://linkedin.com/company/nextgentechsolution",
        "https://github.com/nextgentechsolution",
        "https://instagram.com/nextgentechsolution",
        "https://facebook.com/nextgentechsolution",
        "https://youtube.com/@nextgentechsolution",
      ],
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+91-90318-06381",
        contactType: "customer service",
        email: "info@nextgentechsolution.org",
        areaServed: "Worldwide",
        availableLanguage: ["English", "Hindi"],
      },
    },
    {
      "@type": "LocalBusiness",
      "@id": "https://nextgentechsolution.org/#localbusiness",
      name: "NextGen Tech Solution",
      image: "https://nextgentechsolution.org/images/og-image.png",
      url: "https://nextgentechsolution.org",
      telephone: "+91-90318-06381",
      email: "info@nextgentechsolution.org",
      description:
        "Premium technology company specializing in AI, SaaS, Enterprise Software, and Digital Transformation. Serving global clients from Ranchi, India.",
      address: {
        "@type": "PostalAddress",
        streetAddress: "509, RR Tower, Ratu Road",
        addressLocality: "Ranchi",
        addressRegion: "Jharkhand",
        postalCode: "834005",
        addressCountry: "IN",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 23.3441,
        longitude: 85.3096,
      },
      priceRange: "$$",
      openingHours: "Mo-Sa 09:00-18:00",
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        reviewCount: "60",
        bestRating: "5",
        worstRating: "1",
      },
      hasMap: "https://maps.google.com/?q=509,RR+Tower,Ratu+Road,Ranchi,Jharkhand,834005",
    },
    {
      "@type": "WebSite",
      "@id": "https://nextgentechsolution.org/#website",
      url: "https://nextgentechsolution.org",
      name: "NextGen Tech Solution",
      description: "Engineering Tomorrow's Digital Future",
      publisher: { "@id": "https://nextgentechsolution.org/#organization" },
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: "https://nextgentechsolution.org/blog?q={search_term_string}",
        },
        "query-input": "required name=search_term_string",
      },
    },
  ],
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const h = await headers();
  const pathname = h.get("x-pathname") ?? "";
  const isCRM = CRM_PATHS.some((p) => pathname.startsWith(p));

  return (
    <html
      lang="en"
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body
        className={isCRM ? "crm-shell antialiased overflow-x-hidden" : "antialiased overflow-x-hidden"}
        style={
          isCRM
            ? { background: "var(--crm-bg)", color: "var(--crm-text)" }
            : { background: "var(--bg-primary)", color: "var(--text-secondary)" }
        }
        suppressHydrationWarning
      >
        <Toaster
          position="top-right"
          toastOptions={{
            style: isCRM
              ? {
                  background: "#ffffff",
                  color: "#0a0a0c",
                  border: "1px solid #e6e8ed",
                  borderRadius: "12px",
                  fontSize: "13px",
                  boxShadow: "0 8px 24px -8px rgba(16,24,40,0.12)",
                }
              : {
                  background: "var(--bg-surface)",
                  color: "#ffffff",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "12px",
                  fontSize: "13px",
                },
          }}
        />

        {isCRM ? (
          children
        ) : (
          <>
            <Navbar />
            <main className="relative">{children}</main>
            <Footer />
            <ScrollToTop />
            <OnboardingModal />
            <BookDemoModal />
          </>
        )}
      </body>
    </html>
  );
}
