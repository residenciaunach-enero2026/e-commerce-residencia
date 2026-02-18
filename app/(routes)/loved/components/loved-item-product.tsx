"use client";

/* eslint-disable @next/next/no-img-element */
import { ProductType } from "@/types/product";
import { useLovedProducts } from "@/hooks/use-loved-products";
import { useCart } from "@/hooks/use-cart";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";

interface LovedItemProductProps {
  product: ProductType;
}

const LovedItemProduct = ({ product }: LovedItemProductProps) => {
  const router = useRouter();
  const { toggleLoveItem } = useLovedProducts();
  const { addItem } = useCart();

  const addToCheckout = () => {
    addItem(product);
    toggleLoveItem(product); // quita de favoritos
  };

  const imageUrl =
    product.images && product.images.length > 0
      ? `${process.env.NEXT_PUBLIC_BACKEND_URL}${product.images[0].url}`
      : "";

  return (
    <li className="flex items-center justify-between gap-4 p-6 border-b">
      <div
        className="flex items-center gap-4 cursor-pointer"
        onClick={() => router.push(`/product/${product.slug}`)}
      >
        <div className="w-24 h-24 bg-gray-50 rounded-md flex items-center justify-center overflow-hidden">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={product.productName}
              className="w-full h-full object-contain"
            />
          ) : (
            <span className="text-xs text-gray-400">Sin imagen</span>
          )}
        </div>

        <div>
          <p className="font-semibold text-lg">{product.productName}</p>
          
          {/* AQUÍ ESTÁ EL CAMBIO: Reemplazamos el texto simple por los Badges */}
          <div className="flex gap-2 mt-1 mb-2 items-center">
             <p className="px-2 py-1 text-xs text-white bg-black rounded-full dark:bg-white dark:text-black w-fit">
                {product.Taste}
             </p>
             <p className="px-2 py-1 text-xs text-white bg-yellow-900 rounded-full w-fit">
                {product.Origin}
             </p>
          </div>

          <p className="font-bold">{product.price.toFixed(2)} €</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Button onClick={addToCheckout}>Añadir al carrito</Button>

        <button
          type="button"
          onClick={() => toggleLoveItem(product)}
          className="p-2 rounded-md border hover:bg-gray-50 transition"
          aria-label="Quitar de favoritos"
        >
          <X size={18} />
        </button>
      </div>
    </li>
  );
};

export default LovedItemProduct;