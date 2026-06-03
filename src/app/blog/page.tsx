import type { Metadata } from "next";
import BlogPage from "./BlogPage";

export const metadata: Metadata = {
  title: "Blog",
  description: "Engineering insights, product thinking, and technology deep-dives from the NextGen Tech Solution team.",
};

export default function Page() {
  return <BlogPage />;
}
