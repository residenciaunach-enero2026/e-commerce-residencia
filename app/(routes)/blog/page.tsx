// archivo: app/(routes)/blog/page.tsx
"use client";

import SkeletonSchema from "@/components/skeletonSchema";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

// Más adelante conectaremos esto con useGetArticles de Strapi
const dummyArticles = [
  { id: 1, title: "¿Cada cuánto se debe hacer una afinación?", slug: "cada-cuanto-afinacion", excerpt: "Descubre el tiempo exacto y kilometraje para mantener tu Volkswagen al 100%." },
  { id: 2, title: "Diferencia entre afinación básica y mayor", slug: "diferencia-afinacion-basica-mayor", excerpt: "Conoce qué incluye cada servicio y cuál necesita tu auto hoy." },
  { id: 3, title: "Señales de que tus frenos están fallando", slug: "senales-frenos-fallando", excerpt: "No pongas en riesgo tu seguridad, atiende estos 5 ruidos en tus frenos." },
  { id: 4, title: "Cómo ahorrar gasolina con buen mantenimiento", slug: "ahorrar-gasolina-mantenimiento", excerpt: "Un motor bien afinado es tu mejor aliado para no gastar de más en combustible." }
];

export default function BlogPage() {
  const loading = false; // Cambiaremos esto al conectar Strapi

  return (
    <div className="max-w-7xl px-4 sm:px-8 mx-auto py-12">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-8">Blog Automotriz</h1>
      <p className="text-lg text-gray-600 mb-12">
        Consejos, guías y todo lo que necesitas saber para mantener tu Volkswagen en óptimas condiciones.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {loading ? (
          <SkeletonSchema grid={3} />
        ) : (
          dummyArticles.map((article) => (
            <div key={article.id} className="border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-all bg-white flex flex-col">
              <h2 className="text-xl font-bold mb-3 line-clamp-2">{article.title}</h2>
              <p className="text-gray-500 mb-6 flex-grow">{article.excerpt}</p>
              <Link 
                href={`/blog/${article.slug}`} 
                className={buttonVariants({ variant: "outline", className: "w-full" })}
              >
                Leer artículo completo
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
}