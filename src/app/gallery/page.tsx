import type { Metadata } from "next";
import GalleryPage from "./GalleryPage";

export const metadata: Metadata = {
  title: "Our Gallery — Life & Office at NextGen Tech Solution",
  description:
    "Explore the visual journey of NextGen Tech Solution. View our premium workspace, collaborative brainstorming sessions, and company culture events.",
  alternates: { canonical: "https://nextgentechsolution.org/gallery" },
};

export default function Page() {
  return <GalleryPage />;
}
