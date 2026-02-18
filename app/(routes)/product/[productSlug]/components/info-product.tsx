"use client";

import { ProductType } from "@/types/product";
import { useCart } from "@/hooks/use-cart";
import { useLovedProducts } from "@/hooks/use-loved-products";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Heart } from "lucide-react";

interface InfoProductProps {
  product: ProductType;
}

const InfoProduct = (props: InfoProductProps) => {
  const { product } = props;
  const { addItem } = useCart();
  const { toggleLoveItem, lovedItems } = useLovedProducts();

  const isLoved = lovedItems.some((item) => item.id === product.id);

  return (
    <div className="px-6">
      <div className="justify-between mb-3 sm:flex">
        <h1 className="text-2xl font-bold">{product.productName}</h1>

        <div className="flex items-center gap-2">
          {/* Badge de Sabor */}
          <p className="px-2 py-1 text-xs text-white bg-black rounded-full w-fit">
            {product.Taste}
          </p>

          {/* Badge de Origen */}
          <p className="px-2 py-1 text-xs text-white bg-yellow-900 rounded-full w-fit">
            {product.Origin}
          </p>
        </div>
      </div>

      <Separator className="my-4" />

      <p className="text-gray-500 text-justify">{product.description}</p>

      <Separator className="my-4" />

      <p className="my-4 text-2xl font-bold">{product.price.toFixed(2)} €</p>

      <div className="flex items-center gap-5">
        {/* Botón Comprar */}
        <Button className="w-full" onClick={() => addItem(product)}>
          Comprar
        </Button>

        {/* Botón Favoritos (corazón visible) */}
        <button
          type="button"
          onClick={() => toggleLoveItem(product)}
          className="p-2 rounded-md border hover:bg-gray-50 transition"
          aria-label="Añadir a favoritos"
        >
          <Heart
            size={22}
            className={isLoved ? "fill-black text-black" : "text-black"}
          />
        </button>
      </div>
    </div>
  );
};

export default InfoProduct;
