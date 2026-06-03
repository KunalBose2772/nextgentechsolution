import type { Metadata } from "next";
import AboutPage from "./AboutPage";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about NextGen Tech Solution — our mission, vision, team, and the values that drive us to build extraordinary software.",
};

export default function Page() {
  return <AboutPage />;
}
