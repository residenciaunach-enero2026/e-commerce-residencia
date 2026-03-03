"use client";

import { useParams } from "next/navigation";
import { useGetProductBySlug } from "@/api/getProductBySlug";
import CarouselProduct from "./components/carousel-product";
import InfoProduct from "./components/info-product";
import SkeletonProduct from "./components/skeleton-product";

export default function Page() {
  const params = useParams() as { productSlug?: string | string[] };
  const productSlug = Array.isArray(params.productSlug)
    ? params.productSlug[0]
    : params.productSlug;

  const { result, loading } = useGetProductBySlug(productSlug as string);

  if (loading) return <SkeletonProduct />;

  if (result === null) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-10 sm:py-24 text-center">
        No se encontró el servicio.
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-10 sm:py-24">
      <div className="grid sm:grid-cols-2 gap-x-16 gap-y-12 items-start">

        {/* IZQUIERDA — sin borde ni padding, solo rounded */}
        <div className="overflow-hidden rounded-2xl">
          <CarouselProduct images={result.images} />
        </div>

        {/* DERECHA — info compacta alineada arriba */}
        <div className="sm:pt-2">
          <InfoProduct product={result} />
        </div>

      </div>
    </div>
  );
}