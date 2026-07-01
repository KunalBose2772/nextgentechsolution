"use client";

import { ProductDetail } from "@/lib/products-data";
import DmsProductDetail from "@/components/sections/products/DmsProductDetail";

export default function ProductDetailClient({ product }: { product: ProductDetail }) {
  if (product.id === "dms") {
    return <DmsProductDetail product={product} />;
  }

  // Fallback for not-yet-implemented products
  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-slate-50">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-slate-800 mb-4">{product.title}</h1>
        <p className="text-slate-500">Landing page for this product is currently under construction.</p>
      </div>
    </div>
  );
}
