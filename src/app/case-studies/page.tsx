import type { Metadata } from "next";
import CaseStudiesPage from "./CaseStudiesPage";

export const metadata: Metadata = {
  title: "Case Studies",
  description: "Deep dives into how NextGen Tech Solution has helped enterprises overcome complex technical challenges and achieve measurable results.",
};

export default function Page() {
  return <CaseStudiesPage />;
}
