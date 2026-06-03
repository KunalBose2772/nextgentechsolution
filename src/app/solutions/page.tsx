import type { Metadata } from "next";
import SolutionsPage from "./SolutionsPage";

export const metadata: Metadata = {
  title: "Solutions",
  description: "Industry-specific digital transformation solutions for fintech, healthcare, edtech, e-commerce, and enterprise businesses.",
};

export default function Page() {
  return <SolutionsPage />;
}
