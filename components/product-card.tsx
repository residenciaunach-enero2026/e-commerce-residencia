/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import { ProductType } from "@/types/product";
import { Expand, Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import { useLovedProducts } from "@/hooks/use-loved-products";
import IconButton from "./icon-button";
import { Card, CardContent } from "./ui/card";
import { getMediaUrl } from "@/lib/getMediaUrl";

type ProductCardProps = {
  product: ProductType;
};

const ProductCard = (props: ProductCardProps) => {
  const { product } = props;
  const router = useRouter();
  const { toggleLoveItem, lovedItems } = useLovedProducts();
  const isLoved = lovedItems.some((item) => item.id === product.id);

  return (
    <Link
      href={`/product/${product.slug}`}
      // 1. h-full garantiza que el enlace ocupe toda la altura disponible de la cuadrícula
      className="relative transition-all duration-200 hover:shadow-lg group block h-full"
    >
      {/* 2. flex flex-col h-full permite que la tarjeta estire sus elementos internos */}
      <Card className="border border-gray-100 shadow-none rounded-xl overflow-hidden bg-white flex flex-col h-full">

        {/* 3. Reducimos el height un poco, añadimos m-2 y rounded-xl para que no se vea cuadrado */}
        <CardContent className="relative flex items-center justify-center p-4 min-h-[220px] bg-gray-50/50 m-2 rounded-xl flex-shrink-0">

          {product.images && product.images.length > 0 ? (
            <img
              src={getMediaUrl(product?.images?.[0]?.url)}
              alt={product.productName}
              className="max-h-[190px] w-auto rounded-lg object-contain transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-[190px] bg-gray-100 flex items-center justify-center rounded-md">
              <span className="text-gray-400 text-sm">Sin imagen</span>
            </div>
          )}

          <div className="absolute w-full px-6 transition-opacity duration-300 opacity-0 group-hover:opacity-100 bottom-5">
            <div className="flex justify-center gap-x-4">
              <IconButton
                onClick={(e) => {
                  e.preventDefault();
                  router.push(`/product/${product.slug}`);
                }}
                icon={<Expand size={20} className="text-gray-600" />}
              />
              <IconButton
                onClick={(e) => {
                  e.preventDefault();
                  toggleLoveItem(product);
                }}
                icon={
                  <Heart
                    size={20}
                    className={isLoved ? "fill-red-500 text-red-500" : "text-gray-600"}
                  />
                }
              />
            </div>
          </div>
        </CardContent>

        {/* 4. flex-grow hace que este contenedor ocupe todo el espacio sobrante hacia abajo. Reducimos py a 4 para menor gap. */}
        <div className="px-5 py-4 space-y-2 flex flex-col flex-grow">

          {/* 5. text-base (más chico), min-h-[3rem] (fuerza la altura de 2 líneas) y line-clamp-2 */}
          <h3 className="text-base font-bold text-gray-900 line-clamp-2 min-h-[3rem]">
            {product.productName}
          </h3>

          {product.subtitle && (
            <p className="text-xs text-gray-500 font-medium line-clamp-1">
              {product.subtitle}
            </p>
          )}

          {/* 6. CTA button replaces the price for catalog view */}
          <div className="mt-auto pt-4 pb-1">
            <span className="inline-block w-full text-center bg-gray-900 text-white font-semibold py-2.5 px-4 rounded-lg text-sm transition-colors group-hover:bg-blue-600">
              Ver más detalles
            </span>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default ProductCard;