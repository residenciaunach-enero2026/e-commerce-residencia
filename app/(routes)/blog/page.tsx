"use client";

import { useEffect, useState } from "react";
import SkeletonSchema from "@/components/skeletonSchema";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { ArticleType } from "@/types/article";

export default function BlogPage() {
  const [articles, setArticles] = useState<ArticleType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/articles?populate=*`);
        const json = await res.json();

        setArticles(json.data || []);
      } catch (error) {
        console.error("Error al cargar el blog:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  return (
    <div className="max-w-7xl px-4 sm:px-8 mx-auto py-12">
      <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-8">Blog Automotriz</h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-12">
        Consejos, guías y todo lo que necesitas saber para mantener tu Volkswagen en óptimas condiciones.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {loading ? (
          <SkeletonSchema grid={3} />
        ) : articles.length === 0 ? (
          <p className="text-gray-500 text-lg">No hay artículos publicados aún.</p>
        ) : (
          articles.map((article: ArticleType) => {
            // Compatibilidad por si el backend devuelve con/sin wrap "attributes"
            const attributes = (article as any).attributes || article;
            const tituloFinal = attributes.Title || attributes.title;
            const excerpt = attributes.excerpt;
            const slug = attributes.slug;
            const author = attributes.author;
            const readTime = attributes.readTime;

            return (
              <div key={article.id} className="border border-gray-200 dark:border-gray-700 rounded-2xl p-6 hover:shadow-lg transition-all bg-white dark:bg-gray-800 flex flex-col">
                <div className="mb-3 text-xs font-semibold text-gray-500 flex items-center gap-2">
                  {author && <span className="text-gray-700 font-bold dark:text-gray-300">Por {author}</span>}
                  {author && readTime && <span>•</span>}
                  {readTime && <span>{readTime} min de lectura</span>}
                </div>
                <h2 className="text-xl font-bold mb-3 line-clamp-2 dark:text-white">{tituloFinal}</h2>
                <p className="text-gray-500 dark:text-gray-400 mb-6 flex-grow">{excerpt}</p>
                <Link
                  href={`/blog/${slug}`}
                  className={buttonVariants({ variant: "outline", className: "w-full dark:text-white dark:hover:text-black" })}
                >
                  Leer artículo completo
                </Link>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}