import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SmoothScroll from "@/components/animations/SmoothScroll";
import ScrollProgress from "@/components/animations/ScrollProgress";
import ClientOnly from "@/components/animations/ClientOnly";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space", display: "swap" });

const CRM_PATHS = ["/dashboard", "/admin", "/telecallers", "/superadmin"];

export const metadata: Metadata = {
  title: {
    default: "NextGen Tech Solution — Premium IT Company",
    template: "%s | NextGen Tech Solution",
  },
  description: "World-class web development, mobile apps, SaaS, AI & enterprise software.",
  metadataBase: new URL("https://nextgentechsolution.org"),
};

export const viewport: Viewport = {
  themeColor: [{ media: "(prefers-color-scheme: dark)", color: "#030303" }],
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
      className={`${inter.variable} ${spaceGrotesk.variable}`}
      suppressHydrationWarning
    >
      <body
        className={isCRM ? "crm-shell antialiased overflow-x-hidden" : "antialiased overflow-x-hidden"}
        style={isCRM
          ? { background: "var(--crm-bg)", color: "var(--crm-text)" }
          : { background: "#030303", color: "#f0f0f0" }
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
                  background: "#111120",
                  color: "#f0f0f0",
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
            <ScrollProgress />
            <ClientOnly />
            <Navbar />
            <main className="relative">{children}</main>
            <Footer />
          </SmoothScroll>
        )}
      </body>
    </html>
  );
}
