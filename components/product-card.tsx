/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import { ProductType } from "@/types/product";
import { Expand, ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";
import IconButton from "./icon-button";
import { useCart } from "@/hooks/use-cart";
import { Card, CardContent } from "./ui/card";

type ProductCardProps = {
  product: ProductType;
};

const ProductCard = (props: ProductCardProps) => {
  const { product } = props;
  const router = useRouter();
  const { addItem } = useCart();

  return (
    <Link
      href={`/product/${product.slug}`}
      className="relative transition-all duration-100 hover:shadow-md group"
    >
      <Card className="border border-gray-200 shadow-none">
        <CardContent className="relative flex items-center justify-center px-6 py-2 min-h-[250px]">
          {/* Badges (como en el video) */}
          <div className="absolute top-4 left-4 z-10 flex gap-2">
            {product.Taste && (
              <span className="px-2 py-1 text-xs font-medium text-white bg-black rounded-full">
                {product.Taste}
              </span>
            )}

            {product.Origin && (
              <span className="px-2 py-1 text-xs font-medium text-white rounded-full bg-[#A46A2C]">
                {product.Origin}
              </span>
            )}
          </div>

          {product.images && product.images.length > 0 ? (
            <img
              src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${product.images[0].url}`}
              alt={product.productName}
              className="max-h-[200px] w-auto object-contain"
            />
          ) : (
            <div className="w-full h-[200px] bg-gray-100 flex items-center justify-center rounded-md">
              <span className="text-gray-400">Sin imagen</span>
            </div>
          )}

          <div className="absolute w-full px-6 transition duration-200 opacity-0 group-hover:opacity-100 bottom-5">
            <div className="flex justify-center gap-x-6">
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
                  addItem(product);
                }}
                icon={<ShoppingCart size={20} className="text-gray-600" />}
              />
            </div>
          </div>
        </CardContent>

<div className="text-center px-8 py-4"> {/* Cambiado de flex-between a text-center */}
          <h3 className="text-lg font-bold line-clamp-1">{product.productName}</h3>
          <p className="text-gray-500 font-semibold text-lg">{product.price} $</p>
        </div>
      </Card>
    </Link>
  );
};

export default ProductCard;
