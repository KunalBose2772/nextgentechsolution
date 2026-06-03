import type { Metadata } from "next";
import LoginPage from "@/components/crm/shared/LoginPage";

export const metadata: Metadata = { title: "Admin Login — NextGen CRM" };

export default function AdminLoginPage() {
  return (
    <LoginPage
      role="admin"
      title="Admin Portal"
      subtitle="Sign in to manage leads, quotations & team"
      defaultEmail="admin@nextgentech.com"
      accentColor="#5b5bd6"
      icon="shield"
    />
  );
}
