"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { BlocksRenderer } from '@strapi/blocks-react-renderer';

export default function ArticlePage() {
  const params = useParams();
  const { articleSlug } = params;

  const [article, setArticle] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/articles?filters[slug][$eq]=${articleSlug}&populate=*`);
        const json = await res.json();

        if (json.data && json.data.length > 0) {
          setArticle(json.data[0]);
        }
      } catch (error) {
        console.error("Error al cargar el artículo:", error);
      } finally {
        setLoading(false);
      }
    };

    if (articleSlug) {
      fetchArticle();
    }
  }, [articleSlug]);

  if (loading) {
    return <div className="max-w-4xl mx-auto py-12 px-4 text-center text-xl font-bold">Cargando artículo...</div>;
  }

  if (!article) {
    return <div className="max-w-4xl mx-auto py-12 px-4 text-center text-xl font-bold text-red-500">Artículo no encontrado</div>;
  }

  // Corrección de mayúsculas/minúsculas también aplicada aquí
  const { Title, title, content, coverImage } = article.attributes || article;
  const tituloFinal = Title || title;
  
  const imageUrl = coverImage?.data?.attributes?.url || coverImage?.url || null;

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-8">
      <Link href="/blog" className="inline-flex items-center text-gray-500 hover:text-black dark:hover:text-white mb-8 transition-colors">
        <ChevronLeft size={20} className="mr-1" />
        Volver al blog
      </Link>

      <div className="mb-10 border-b pb-8">
        <span className="text-sm font-bold text-gray-500 uppercase tracking-wider">Tips Volkswagen</span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white mt-3 mb-4 leading-tight">
          {tituloFinal}
        </h1>
      </div>
      
      {imageUrl && (
        <div className="mb-10 rounded-2xl overflow-hidden shadow-lg border">
          <img src={imageUrl} alt={tituloFinal} className="w-full h-auto object-cover max-h-[500px]" />
        </div>
      )}
      
      <div className="prose prose-lg max-w-none text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
        {Array.isArray(content) ? (
          <BlocksRenderer content={content} />
        ) : (
          <p>{content}</p> 
        )}
      </div>

      <div className="mt-16 pt-8 border-t flex justify-center">
        <Link href="/servicios" className={buttonVariants({ size: "lg" })}>
          Agendar revisión para mi auto
        </Link>
      </div>
    </div>
  );
}