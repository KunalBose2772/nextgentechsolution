import type { Metadata } from "next";
import AboutPage from "./AboutPage";

export const metadata: Metadata = {
  title: "About Us — Our Story, Team & Values",
  description:
    "Founded in 2019, NextGen Tech Solution has grown from 3 engineers to a global team of 30+ specialists. Learn about our mission, company values, leadership team, and what makes us the right technology partner.",
  alternates: { canonical: "https://nextgentechsolution.org/about" },
  openGraph: {
    title: "About NextGen Tech Solution — Our Story, Team & Values",
    description: "From 3 engineers to a global technology partner. Meet our team and learn what drives us.",
    url: "https://nextgentechsolution.org/about",
    images: [{ url: "/images/og-image.png", width: 1200, height: 630 }],
  },
};

export default function Page() {
  return <AboutPage />;
}
