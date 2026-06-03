import type { Metadata } from "next";
import TechnologiesPage from "./TechnologiesPage";

export const metadata: Metadata = {
  title: "Technologies",
  description: "Explore the cutting-edge technology stack we use — Next.js, React, TypeScript, Node.js, AWS, Docker, Kubernetes, AI/ML, and more.",
};

export default function Page() {
  return <TechnologiesPage />;
}
