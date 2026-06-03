import type { Metadata } from "next";
import ServicesPage from "./ServicesPage";

export const metadata: Metadata = {
  title: "Services",
  description: "Explore our full range of technology services — web development, mobile apps, SaaS, AI, cloud, DevOps, and more.",
};

export default function Page() {
  return <ServicesPage />;
}
