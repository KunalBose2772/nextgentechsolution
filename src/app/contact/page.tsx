import type { Metadata } from "next";
import ContactPage from "./ContactPage";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with NextGen Tech Solution. Start your project, request a consultation, or just say hello.",
};

export default function Page() {
  return <ContactPage />;
}
