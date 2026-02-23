"use client";

import { useParams } from "next/navigation";
import { useGetProductBySlug } from "@/api/getProductBySlug";
import CarouselProduct from "./components/carousel-product";
import InfoProduct from "./components/info-product";
import SkeletonProduct from "./components/skeleton-product";

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

export default function Page() {
  const params = useParams() as { productSlug?: string | string[] };
  const productSlug = Array.isArray(params.productSlug)
    ? params.productSlug[0]
    : params.productSlug;

  const { result, loading } = useGetProductBySlug(productSlug as string);

  if (loading) return <SkeletonProduct />;

  if (result === null) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-10 sm:py-24 text-center">
        No se encontró el servicio.
      </div>
    );
  }

  const includes = result.includes ? parseIncludesToList(result.includes) : null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-10 sm:py-24">
      <div className="grid sm:grid-cols-2 gap-x-16 gap-y-12 items-start">

        {/* IZQUIERDA — sin borde ni padding, solo rounded */}
        <div className="overflow-hidden rounded-2xl">
          <CarouselProduct images={result.images} />
        </div>

        {/* DERECHA — info compacta alineada arriba */}
        <div className="sm:pt-2">
          <InfoProduct product={result} />
        </div>

        {/* ABAJO — sin scroll, sin "(desliza)", fluye libre */}
        {includes && (
          <section className="sm:col-span-2 rounded-2xl bg-gray-50 border border-gray-100 p-6 sm:p-8">
            <h3 className="text-base font-semibold text-gray-900 mb-4">
              {includes.title}
            </h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-700 text-sm leading-relaxed">
              {includes.items.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </section>
        )}

      </div>
    </div>
  );
}