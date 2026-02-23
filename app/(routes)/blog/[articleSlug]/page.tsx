// archivo: app/(routes)/blog/[articleSlug]/page.tsx
"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

export default function ArticlePage() {
  const params = useParams();
  const { articleSlug } = params;

  // Nota: Más adelante aquí usaremos un hook como useGetArticleBySlug(articleSlug)

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-8">
      <Link href="/blog" className="inline-flex items-center text-gray-500 hover:text-black mb-8 transition-colors">
        <ChevronLeft size={20} className="mr-1" />
        Volver al blog
      </Link>

      <div className="mb-10 border-b pb-8">
        <span className="text-sm font-bold text-gray-500 uppercase tracking-wider">Mantenimiento Preventivo</span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mt-3 mb-4 leading-tight">
          Cargando artículo: {articleSlug}
        </h1>
        <p className="text-gray-500">Publicado el 22 de Febrero de 2026</p>
      </div>
      
      <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
        <p>
          Esta es la plantilla base para tus 20 artículos obligatorios. 
          Aquí procesaremos el contenido "Rich Text" o "Blocks" que redactarás en Strapi sobre afinaciones, frenos y ahorro de gasolina.
        </p>
        <p>
          Al usar esta estructura, evitamos el error 404 y dejamos el lienzo listo para inyectar los datos reales.
        </p>
      </div>

      <div className="mt-16 pt-8 border-t flex justify-center">
        <Link href="/servicios" className={buttonVariants({ size: "lg" })}>
          Agendar revisión para mi auto
        </Link>
      </div>
    </div>
  );
}