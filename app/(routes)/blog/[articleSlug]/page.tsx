"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

export default function ArticlePage() {
  const params = useParams();
  const { articleSlug } = params;

  const [article, setArticle] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        // Buscamos en Strapi el artículo que coincida exactamente con el slug de la URL
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/blogs?filters[slug][$eq]=${articleSlug}&populate=*`);
        const json = await res.json();

        // Strapi devuelve un arreglo al filtrar, así que tomamos el primer resultado [0]
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

  // Extraemos los datos (soportando diferentes versiones de Strapi)
  const { title, content, coverImage } = article.attributes || article;
  
  // Obtenemos la URL de la imagen de Cloudinary (si subiste una)
  const imageUrl = coverImage?.data?.attributes?.url || coverImage?.url || null;

  // Manejo básico del contenido para que no rompa la página
  const renderContent = typeof content === 'string' 
    ? content 
    : "El contenido está en formato de bloques de Strapi. Necesitamos un renderizador especial para verlo bien.";

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-8">
      <Link href="/blog" className="inline-flex items-center text-gray-500 hover:text-black dark:hover:text-white mb-8 transition-colors">
        <ChevronLeft size={20} className="mr-1" />
        Volver al blog
      </Link>

      <div className="mb-10 border-b pb-8">
        <span className="text-sm font-bold text-gray-500 uppercase tracking-wider">Tips Volkswagen</span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white mt-3 mb-4 leading-tight">
          {title}
        </h1>
      </div>
      
      {imageUrl && (
        <div className="mb-10 rounded-2xl overflow-hidden shadow-lg border">
          <img src={imageUrl} alt={title} className="w-full h-auto object-cover max-h-[500px]" />
        </div>
      )}
      
      <div className="prose prose-lg max-w-none text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
        {renderContent}
      </div>

      <div className="mt-16 pt-8 border-t flex justify-center">
        <Link href="/servicios" className={buttonVariants({ size: "lg" })}>
          Agendar revisión para mi auto
        </Link>
      </div>
    </div>
  );
}