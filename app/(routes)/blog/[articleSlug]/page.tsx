"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { ChevronLeft, Calendar, User, Clock } from "lucide-react";
import { BlocksRenderer } from '@strapi/blocks-react-renderer';
import { ArticleType } from "@/types/article";
import WhatsAppModal from "@/components/whatsapp-modal";

export default function ArticlePage() {
  const params = useParams();
  const { articleSlug } = params;

  const [article, setArticle] = useState<ArticleType | null>(null);
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

  useEffect(() => {
    if (article) {
      const attributes = (article as any).attributes || article;
      const seo = attributes.seo;
      const title = seo?.metaTitle || attributes.Title || attributes.title;
      const description = seo?.metaDescription || attributes.excerpt || "";

      document.title = `${title} | Taller Especializado`;

      let metaDesc = document.querySelector('meta[name="description"]');
      if (!metaDesc) {
        metaDesc = document.createElement('meta');
        metaDesc.setAttribute('name', 'description');
        document.head.appendChild(metaDesc);
      }
      metaDesc.setAttribute('content', description);
    }
  }, [article]);

  if (loading) {
    return <div className="max-w-4xl mx-auto py-24 px-4 text-center text-xl font-bold text-gray-500">Cargando artículo...</div>;
  }

  if (!article) {
    return <div className="max-w-4xl mx-auto py-24 px-4 text-center text-xl font-bold text-red-500">Artículo no encontrado</div>;
  }

  const attributes = (article as any).attributes || article;
  const { Title, title, content, coverImage, author, readTime, publishedAt } = attributes;
  const tituloFinal = Title || title;

  const imageUrl = coverImage?.data?.attributes?.url || coverImage?.url || null;

  // Formatear Fecha
  const formattedDate = publishedAt ? new Date(publishedAt).toLocaleDateString("es-MX", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }) : "";

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen">
      {/* Hero Section Premium */}
      <div className="relative w-full h-[50vh] min-h-[400px] flex items-end justify-center bg-gray-900">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={tituloFinal}
            className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-overlay"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-black opacity-90"></div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent"></div>

        <div className="relative z-10 w-full mb-12 px-4 sm:px-8 max-w-3xl mx-auto">
          <Link href="/blog" className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors text-sm font-semibold">
            <ChevronLeft size={18} className="mr-1" />
            Volver al blog
          </Link>

          <div className="mb-4">
            <span className="inline-block py-1 px-3 rounded-full bg-blue-600/90 backdrop-blur-sm text-white text-xs font-bold uppercase tracking-wider">
              Consejos VW
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-5xl font-extrabold text-white leading-tight mb-6 text-balance">
            {tituloFinal}
          </h1>

          <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-white/80 text-sm font-medium">
            {author && (
              <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full backdrop-blur-sm">
                <User size={14} className="opacity-80" />
                <span>{author}</span>
              </div>
            )}
            {readTime && (
              <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full backdrop-blur-sm">
                <Clock size={14} className="opacity-80" />
                <span>{readTime} min lectura</span>
              </div>
            )}
            {formattedDate && (
              <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full backdrop-blur-sm">
                <Calendar size={14} className="opacity-80" />
                <span>{formattedDate}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Contenedor optimizado para lectura (Max-Width 3xl) */}
      <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8">

        <article className="prose prose-lg sm:prose-xl max-w-none text-gray-700 dark:text-gray-300 leading-relaxed prose-headings:font-bold prose-headings:text-gray-900 dark:prose-headings:text-white prose-a:text-blue-600 prose-img:rounded-2xl prose-img:shadow-lg marker:text-blue-600 focus-visible:outline-none">
          {Array.isArray(content) ? (
            <BlocksRenderer content={content} />
          ) : typeof content === "string" ? (
            <div dangerouslySetInnerHTML={{ __html: content }} />
          ) : (
            <p>{JSON.stringify(content)}</p>
          )}
        </article>

        {/* Dynamic CTA */}
        <div className="mt-16 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700 rounded-3xl p-8 sm:p-12 text-center shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-48 h-48">
              <path d="M21 16.5c0 .38-.21.71-.53.88l-7.9 4.44c-.16.12-.36.18-.57.18s-.41-.06-.57-.18l-7.9-4.44A.991.991 0 0 1 3 16.5v-9c0-.38.21-.71.53-.88l7.9-4.44c.16-.12.36-.18.57-.18s.41.06.57.18l7.9 4.44c.32.17.53.5.53.88v9M12 4.15 5.46 7.82l6.54 3.67 6.54-3.67L12 4.15M4.5 9.38v6.51l6.5 3.66v-6.51l-6.5-3.66m15 6.51-6.5 3.66v-6.51l6.5-3.66v6.51" />
            </svg>
          </div>

          <div className="relative z-10">
            <h3 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white mb-4">
              ¿Identificaste alguno de estos problemas en tu Auto?
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-lg mx-auto text-lg">
              No dejes el mantenimiento de tu Volkswagen para después. Alarga la vida de tu motor ahorrando dinero en reparaciones.
            </p>
            <WhatsAppModal
              buttonText="Agendar Revisión por WhatsApp"
              buttonClasses="w-full sm:w-auto bg-gray-900 hover:bg-black text-white px-8 py-3 rounded-full font-semibold transition-all shadow-md"
              selectedVariantName={tituloFinal}
            />
          </div>
        </div>

      </div>
    </div>
  );
}