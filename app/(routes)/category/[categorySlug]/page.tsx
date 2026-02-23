"use client";

import { useParams, useRouter } from "next/navigation";
import { useGetCategoryProduct } from "@/api/getCategoryProduct";
import { ResponseType } from "@/types/response";
import SkeletonSchema from "@/components/skeletonSchema";
import { ProductType } from "@/types/product";
import ProductCard from "@/components/product-card";
import { ChevronLeft, Wrench } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export default function CategoryPage() {
  const params = useParams();
  const router = useRouter();
  const { categorySlug } = params;

  const { result, loading }: ResponseType = useGetCategoryProduct(
    categorySlug as string
  );

  const formatTitle = (slug: string) => {
    if (!slug) return "";
    return slug.replace(/-/g, " ").toUpperCase();
  };

  return (
    <div className="max-w-[1440px] mx-auto py-6 sm:py-8 px-4 sm:px-8 min-h-[60vh]">
      
      {/* 1. Botón de regreso discreto (Estilo Breadcrumb) */}
      <button 
        onClick={() => router.back()} 
        className="flex items-center text-sm text-gray-600 hover:text-black mb-6 transition-colors"
      >
        <ChevronLeft size={16} className="mr-1" />
        Volver a inicio
      </button>

      {/* 2. LAYOUT TIPO AMAZON: Sidebar + Contenido */}
      <div className="flex flex-col lg:flex-row gap-10">
        
        {/* SIDEBAR IZQUIERDO (Oculto en celular, visible en Desktop) */}
        <aside className="hidden lg:block w-64 flex-shrink-0">
          <div className="sticky top-24">
            <h3 className="font-bold text-lg mb-4 text-gray-900">Categorías de Servicio</h3>
            <ul className="space-y-3 text-sm text-gray-700">
              <li>
                <Link href="/category/afinaciones" className={`hover:text-black hover:underline transition-all ${categorySlug === 'afinaciones' ? 'font-bold text-black' : ''}`}>
                  Afinaciones Especializadas
                </Link>
              </li>
              <li>
                <Link href="/category/frenos" className={`hover:text-black hover:underline transition-all ${categorySlug === 'frenos' ? 'font-bold text-black' : ''}`}>
                  Sistema de Frenos
                </Link>
              </li>
              <li>
                <Link href="/category/suspension" className={`hover:text-black hover:underline transition-all ${categorySlug === 'suspension' ? 'font-bold text-black' : ''}`}>
                  Suspensión y Dirección
                </Link>
              </li>
            </ul>
            
            <Separator className="my-6" />
            
            <h3 className="font-bold text-lg mb-4 text-gray-900">Filtros</h3>
            <p className="text-sm text-gray-500 italic">Aquí agregaremos los filtros por año y modelo próximamente.</p>
          </div>
        </aside>

        {/* CONTENIDO PRINCIPAL DERECHO */}
        <div className="flex-1">
          
          {/* Encabezado Limpio (Sin contenedor gris) */}
          <div className="mb-6">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 capitalize tracking-tight">
              {loading 
                ? formatTitle(categorySlug as string) 
                : result?.[0]?.category?.categoryName || formatTitle(categorySlug as string)}
            </h1>
            <p className="text-gray-500 mt-2 text-base">
              Catálogo de servicios garantizados para tu vehículo.
            </p>
          </div>

          <Separator className="mb-8 hidden lg:block" />

          {/* Grid de Productos - Ajustado para no estirarse */}
          <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 items-start">
            {loading && <SkeletonSchema grid={4} />}

            {!loading && result && result.length > 0 &&
              result.map((product: ProductType) => (
                <ProductCard key={product.id} product={product} />
              ))}
          </div>

          {/* Estado vacío Limpio */}
          {!loading && (!result || result.length === 0) && (
            <div className="text-center py-20 bg-white">
              <Wrench size={48} className="mx-auto text-gray-300 mb-4" />
              <h3 className="text-xl font-bold text-gray-800 mb-2">Catálogo en actualización</h3>
              <p className="text-gray-500 max-w-md mx-auto text-base">
                Pronto agregaremos los servicios de <span className="font-semibold text-gray-700">{formatTitle(categorySlug as string)}</span> para nuestra lista de modelos.
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}