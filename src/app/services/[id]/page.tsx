import { Metadata } from "next";
import { notFound } from "next/navigation";
import { SERVICES_MAP } from "@/lib/services-data";
import ServiceDetailClient from "./ServiceDetailClient";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const service = SERVICES_MAP[id];
  if (!service) return {};
  return {
    title: service.metaTitle,
    description: service.metaDesc,
    openGraph: {
      title: service.metaTitle,
      description: service.metaDesc,
      type: "website",
    }
  };
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { id } = await params;
  const service = SERVICES_MAP[id];
  if (!service) {
    notFound();
  }
  return <ServiceDetailClient service={service} />;
}
