/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import { ProductType } from "@/types/product";
import { Expand, MessageCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import IconButton from "./icon-button";
import { Card, CardContent } from "./ui/card";
import { getMediaUrl } from "@/lib/getMediaUrl";

type ProductCardProps = {
  product: ProductType;
};

const ProductCard = (props: ProductCardProps) => {
  const { product } = props;
  const router = useRouter();

  return (
    <Link
      href={`/product/${product.slug}`}
      // 1. h-full garantiza que el enlace ocupe toda la altura disponible de la cuadrícula
      className="relative transition-all duration-200 hover:shadow-lg group block h-full"
    >
      {/* 2. flex flex-col h-full permite que la tarjeta estire sus elementos internos */}
      <Card className="border border-gray-100 shadow-none rounded-xl overflow-hidden bg-white flex flex-col h-full">
        
        {/* 3. Aumentamos a min-h-[240px] para dar más verticalidad a la imagen */}
        <CardContent className="relative flex items-center justify-center p-4 min-h-[240px] bg-gray-50/50 flex-shrink-0">
          
          {product.images && product.images.length > 0 ? (
            <img
              src={getMediaUrl(product?.images?.[0]?.url)}
              alt={product.productName}
              className="max-h-[190px] w-auto object-contain transition-transform duration-300 group-hover:scale-105"
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
                  router.push(`/product/${product.slug}`);
                }}
                icon={<MessageCircle size={20} className="text-gray-600" />}
              />
            </div>
          </div>
        </CardContent>

        {/* 4. flex-grow hace que este contenedor ocupe todo el espacio sobrante hacia abajo */}
        <div className="px-5 py-6 space-y-2 flex flex-col flex-grow">
          
          {/* 5. text-base (más chico), min-h-[3rem] (fuerza la altura de 2 líneas) y line-clamp-2 */}
          <h3 className="text-base font-bold text-gray-900 line-clamp-2 min-h-[3rem]">
            {product.productName}
          </h3>
          
          {product.subtitle && (
            <p className="text-xs text-gray-500 font-medium line-clamp-1">
              {product.subtitle}
            </p>
          )}

          {/* 6. mt-auto empuja el precio hasta la base de la tarjeta para que todas se alineen */}
          <div className="mt-auto pt-2">
            <p className="text-xl font-black text-black">
              ${product.price.toFixed(2)} <span className="text-xs font-normal text-gray-500">MXN</span>
            </p>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default ProductCard;