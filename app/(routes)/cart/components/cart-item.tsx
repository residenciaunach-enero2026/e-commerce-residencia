"use client";

/* eslint-disable @next/next/no-img-element */
import { ProductType } from "@/types/product";
import { useCart } from "@/hooks/use-cart";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2 } from "lucide-react";

type CartItemProps = {
  item: ProductType;
};

const getMediaUrl = (url?: string | null) => {
  if (!url) return "";
  if (url.startsWith("http")) return url; // Cloudinary u otra URL absoluta
  const base = process.env.NEXT_PUBLIC_BACKEND_URL || "";
  return `${base}${url}`; // /uploads/...
};

export default function CartItem({ item }: CartItemProps) {
  const { removeItem, updateItemQuantity } = useCart();

  const qty = item.quantity ?? 1;

  const imageUrl =
    item.images && item.images.length > 0
      ? getMediaUrl(item.images[0].url)
      : "";

  return (
    <div className="flex gap-4 border rounded-lg p-4 bg-white shadow-sm">
      {/* Imagen del producto */}
      <div className="w-24 h-24 bg-gray-50 rounded-md flex items-center justify-center overflow-hidden shrink-0">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={item.productName}
            className="w-full h-full object-contain"
          />
        ) : (
          <span className="text-xs text-gray-400">Sin imagen</span>
        )}
      </div>

      <div className="flex-1">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="font-bold text-lg">{item.productName}</p>

            {/* Badges */}
            <div className="flex gap-2 mt-1 mb-2 items-center">
              <span className="px-2 py-1 text-xs font-medium text-white bg-black rounded-full dark:bg-white dark:text-black">
                {item.Taste}
              </span>
              <span className="px-2 py-1 text-xs font-medium text-white bg-yellow-900 rounded-full">
                {item.Origin}
              </span>
            </div>
          </div>

          <p className="font-bold whitespace-nowrap text-lg">
            {(item.price * qty).toFixed(2)} €
          </p>
        </div>

        <div className="flex items-center justify-between mt-4">
          {/* Controles de Cantidad */}
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => updateItemQuantity(item.id, qty - 1)}
            >
              <Minus size={14} />
            </Button>

            <span className="min-w-[28px] text-center font-semibold">{qty}</span>

            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => updateItemQuantity(item.id, qty + 1)}
            >
              <Plus size={14} />
            </Button>
          </div>

          {/* Eliminar */}
          <Button
            variant="ghost"
            size="icon"
            className="text-red-500 hover:text-red-700 hover:bg-red-50"
            onClick={() => removeItem(item.id)}
          >
            <Trash2 size={18} />
          </Button>
        </div>
      </div>
    </div>
  );
}
