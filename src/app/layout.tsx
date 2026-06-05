import type { Metadata, Viewport } from "next";
import { Sora, Inter } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SmoothScroll from "@/components/animations/SmoothScroll";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { Toaster } from "react-hot-toast";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  weight: ["400", "500", "600"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500"],
  display: "swap",
});

const CRM_PATHS = ["/dashboard", "/admin", "/telecallers", "/superadmin"];

export const metadata: Metadata = {
  title: {
    default: "NextGen Tech Solutions — Engineering Tomorrow's Digital Future",
    template: "%s | NextGen Tech Solutions",
  },
  description:
    "Premium technology company specializing in AI, SaaS, Enterprise Software, Automation, Cloud Infrastructure, and Digital Transformation. 150+ projects delivered globally.",
  metadataBase: new URL("https://nextgentechsolution.org"),
  keywords: ["AI solutions", "SaaS development", "enterprise software", "digital transformation", "cloud infrastructure", "web development"],
  openGraph: {
    title: "NextGen Tech Solutions",
    description: "Engineering Tomorrow's Digital Future",
    type: "website",
  },
  icons: {
    icon: "/images/favicon.png",
    shortcut: "/images/favicon.png",
    apple: "/images/favicon.png",
  },
};

export const viewport: Viewport = {
  themeColor: [{ media: "(prefers-color-scheme: dark)", color: "#000000" }],
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const h = await headers();
  const pathname = h.get("x-pathname") ?? "";
  const isCRM = CRM_PATHS.some((p) => pathname.startsWith(p));

  return (
    <html
      lang="en"
      className={`${sora.variable} ${inter.variable}`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
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
          <SmoothScroll>
            <Navbar />
            <main className="relative">{children}</main>
            <Footer />
            <ThemeToggle />
          </SmoothScroll>
        )}
      </body>
    </html>
  );
}
