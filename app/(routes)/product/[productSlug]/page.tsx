"use client";

import { useParams } from "next/navigation";
import { useGetProductBySlug } from "@/api/getProductBySlug";
import CarouselProduct from "./components/carousel-product";
import InfoProduct from "./components/info-product";
import SkeletonProduct from "./components/skeleton-product";

export default function Page() {
  const params = useParams();
  const { productSlug } = params;
  
  // Obtenemos los datos de la API
  const { result, loading } = useGetProductBySlug(productSlug as string);

  // Si está cargando, mostramos el componente de esqueleto que acabamos de crear
  if (loading) {
    return <SkeletonProduct />;
  }

  // Si por alguna razón no hay resultado tras la carga
  if (result === null) {
    return <div className="max-w-6xl py-4 mx-auto sm:py-32 sm:px-24 text-center">No se encontró el producto.</div>;
  }

  return (
    <div className="max-w-6xl py-4 mx-auto sm:py-32 sm:px-24">
      <div className="grid sm:grid-cols-2">
        <div>
          {/* Ya no marcará error en images porque result es de tipo ProductType */}
          <CarouselProduct images={result.images} />
        </div>
        <div className="sm:px-12">
          <InfoProduct product={result} />
        </div>
      </div>
    </div>
  );
}