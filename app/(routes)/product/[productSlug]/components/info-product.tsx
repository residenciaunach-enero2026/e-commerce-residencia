"use client";

import { ProductType } from "@/types/product";
import { useLovedProducts } from "@/hooks/use-loved-products";
import { Separator } from "@/components/ui/separator";
import { Heart } from "lucide-react";
import WhatsAppModal from "@/components/whatsapp-modal";

interface InfoProductProps {
  product: ProductType;
}

// Función traductora mejorada para detectar listas y poner viñetas (•)
const parseStrapiText = (textData: any) => {
  if (!textData) return "";
  if (typeof textData === "string") return textData;

  if (Array.isArray(textData)) {
    return textData
      .map((block: any) => {
        if (block.type === "list") {
          return block.children
            .map((item: any) => {
              const text = item.children
                ? item.children.map((c: any) => c.text).join("")
                : "";
              return `• ${text}`;
            })
            .join("\n");
        }

        if (block.children) {
          return block.children.map((child: any) => child.text).join("");
        }

        return "";
      })
      .join("\n\n");
  }

  return "";
};

const InfoProduct = (props: InfoProductProps) => {
  const { product } = props;
  const { toggleLoveItem, lovedItems } = useLovedProducts();

  const isLoved = lovedItems.some((item) => item.id === product.id);

  return (
    <div className="px-6">
      <div className="justify-between mb-3 sm:flex">
        <h1 className="text-2xl font-bold">{product.productName}</h1>
      </div>

      {product.subtitle && (
        <p className="text-sm font-semibold text-gray-500 mb-4">
          {product.subtitle}
        </p>
      )}

      <Separator className="my-4" />

      <p className="text-gray-500 text-justify whitespace-pre-line">
        {parseStrapiText(product.description)}
      </p>

      {/* Includes en móvil (si lo sigues usando así) */}
      {product.includes && (
        <div className="my-4 sm:hidden">
          <p className="text-gray-700 text-sm whitespace-pre-line">
            {parseStrapiText(product.includes)}
          </p>
        </div>
      )}

      <Separator className="my-4" />

      <p className="my-4 text-2xl font-bold">
        ${product.price.toFixed(2)} MXN
      </p>

      {product.note && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm">
          <p>*{parseStrapiText(product.note)}</p>
        </div>
      )}

      <div className="flex items-center gap-5 mt-6">
        {/* ✅ BOTÓN QUE ABRE MODAL Y ENVÍA A WHATSAPP (con productName correcto) */}
        <div className="w-full">
          <WhatsAppModal
            product={product}
            buttonText="Solicitar información"
            buttonClasses="w-full h-12 text-base !bg-[#111827] hover:!bg-[#0b1220] !text-white shadow-md"
          />
        </div>

        {/* Favoritos */}
        <button
          type="button"
          onClick={() => toggleLoveItem(product)}
          className="h-12 w-12 rounded-xl border flex items-center justify-center hover:bg-gray-50 transition"
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