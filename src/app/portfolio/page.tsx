import type { Metadata } from "next";
import PortfolioPage from "./PortfolioPage";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Explore our portfolio of 150+ projects — from SaaS platforms and mobile apps to enterprise software and AI solutions.",
};

export default function Page() {
  return <PortfolioPage />;
}
