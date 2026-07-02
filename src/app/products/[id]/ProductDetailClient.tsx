"use client";

import { ProductDetail } from "@/lib/products-data";
import GenericProductDetail from "@/components/sections/products/GenericProductDetail";

export default function ProductDetailClient({ product }: { product: ProductDetail }) {
  return <GenericProductDetail product={product} />;
}

