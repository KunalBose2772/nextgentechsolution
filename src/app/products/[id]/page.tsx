import { notFound } from "next/navigation";
import { productsData } from "@/lib/products-data";
import ProductDetailClient from "./ProductDetailClient";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const product = productsData[id];
  if (!product) return { title: "Product Not Found" };

  return {
    title: product.metaTitle,
    description: product.metaDesc,
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { id } = await params;
  const product = productsData[id];

  if (!product) {
    notFound();
  }

  return <ProductDetailClient product={product} />;
}

