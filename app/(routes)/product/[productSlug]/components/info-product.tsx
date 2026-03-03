"use client";

import { useState } from "react";
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

const parseIncludesToList = (includes: any) => {
  const raw = parseStrapiText(includes).trim();
  if (!raw) return null;

  const lines = raw
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean)
    .map((l) => l.replace(/^•\s*/, ""));

  if (lines.length === 0) return null;

  let title = "¿Qué incluye?";
  let startIndex = 0;

  const first = lines[0].toLowerCase();
  if (first.includes("qué incluye")) {
    title = lines[0].replace(/[:：]\s*$/, "");
    startIndex = 1;
  }

  const items = lines
    .slice(startIndex)
    .map((x) => x.replace(/\s+\.$/, ".").trim())
    .filter(Boolean);

  if (items.length === 0 && startIndex === 0) {
    return { title, items: [raw.replace(/^(¿\s*)?qué incluye\??\s*[:：]\s*/i, "")] };
  }

  return { title, items };
};

const InfoProduct = (props: InfoProductProps) => {
  const { product } = props;
  const { toggleLoveItem, lovedItems } = useLovedProducts();

  const hasVariants = product.variants && product.variants.length > 0;
  const [selectedVariantId, setSelectedVariantId] = useState<number | null>(
    hasVariants ? product.variants[0].id : null
  );

  const isLoved = lovedItems.some((item) => item.id === product.id);

  const selectedVariant = hasVariants ? product.variants.find(v => v.id === selectedVariantId) : null;

  // En caso de que el producto no tenga variantes por alguna razón, podríamos tener un fallback.
  // Pero en el nuevo schema, todo debe venir en variantes.
  const displayPrice = selectedVariant?.Price || selectedVariant?.price || 0;
  const includes = selectedVariant?.includes ? parseIncludesToList(selectedVariant.includes) : null;

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

      <Separator className="my-4" />

      {/* Selector de Variantes */}
      {hasVariants && (
        <div className="my-6">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Elige tu variante:</h3>
          <div className="flex flex-wrap gap-3">
            {product.variants.map((variant) => (
              <button
                key={variant.id}
                onClick={() => setSelectedVariantId(variant.id)}
                className={`px-5 py-2.5 rounded-xl font-bold text-sm border-2 transition-all duration-200 ${selectedVariantId === variant.id
                  ? "bg-black text-white border-black shadow-md scale-[1.02]"
                  : "bg-white text-gray-600 border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                  }`}
              >
                {variant.name}
              </button>
            ))}
          </div>
        </div>
      )}

      <p className="my-4 text-3xl font-extrabold text-gray-900">
        ${displayPrice.toLocaleString("es-MX", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} <span className="text-lg font-medium text-gray-500">MXN</span>
      </p>

      {product.note && (
        <div className="mb-6 p-3 bg-blue-50 border border-blue-100 text-blue-800 rounded-lg text-sm flex items-start">
          <span className="mr-2">ℹ️</span>
          <p>{parseStrapiText(product.note)}</p>
        </div>
      )}

      {/* "¿Qué incluye?" - Integrado en el InfoProduct */}
      {includes && (
        <div className="my-6 p-5 bg-gray-50 rounded-xl border border-gray-100">
          <h4 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wider">{includes.title}</h4>
          <ul className="space-y-2">
            {includes.items.map((item, idx) => (
              <li key={idx} className="flex items-start text-sm text-gray-700">
                <span className="text-green-500 mr-2 mt-0.5">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex items-center gap-4 mt-8">
        {/* ✅ BOTÓN QUE ABRE MODAL Y ENVÍA A WHATSAPP */}
        <div className="flex-1">
          <WhatsAppModal
            product={product}
            selectedVariantName={selectedVariant?.name}
            buttonText="Agendar Servicio por WhatsApp"
            buttonClasses="w-full h-14 text-base font-bold !bg-[#25D366] hover:!bg-[#128C7E] !text-white rounded-xl shadow-lg transition-all hover:scale-[1.02]"
          />
        </div>

        {/* Favoritos */}
        <button
          type="button"
          onClick={() => toggleLoveItem(product)}
          className={`h-14 w-14 shrink-0 rounded-xl border-2 flex items-center justify-center transition-all ${isLoved ? "border-red-500 bg-red-50" : "border-gray-200 hover:bg-gray-50 hover:border-gray-300"
            }`}
          aria-label="Añadir a favoritos"
        >
          <Heart
            size={24}
            className={isLoved ? "fill-red-500 text-red-500" : "text-gray-400"}
          />
        </button>
      </div>
    </div>
  );
};

export default InfoProduct;