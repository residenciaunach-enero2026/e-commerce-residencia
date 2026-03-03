/* eslint-disable @next/next/no-img-element */
"use client";
import { getMediaUrl } from "@/lib/getMediaUrl";
import { useGetFeaturedProducts } from "@/api/useGetFeaturedProducts";
import { ResponseType } from "@/types/response";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import SkeletonSchema from "./skeletonSchema";
import { ProductType } from "@/types/product";
import { Card, CardContent } from "./ui/card";
import { Expand, MessageCircle } from "lucide-react"; // <-- 1. Cambiamos ShoppingCart por MessageCircle
import IconButton from "./icon-button";
import { useRouter } from "next/navigation";
// 2. Eliminamos la importación de useCart porque ya no lo necesitamos

const FeaturedProducts = () => {
  const { result, loading }: ResponseType = useGetFeaturedProducts();
  const router = useRouter();
  // 3. Eliminamos la inicialización de useCart()

  return (
    <div className="max-w-6xl py-4 mx-auto sm:py-16 sm:px-24">
      <h3 className="px-6 text-3xl sm:pb-8">Servicios destacados</h3>

      <Carousel opts={{ align: "start", loop: true }}>
        <CarouselContent className="-ml-2 md:-ml-4">
          {loading && <SkeletonSchema grid={3} />}

          {result !== null &&
            result.slice(0, 10).map((product: ProductType) => {
              const { id, slug, images, productName, subtitle } = product;

              return (
                <CarouselItem
                  key={id}
                  className="md:basis-1/2 lg:basis-1/3 group h-auto"
                >
                  <div className="p-1 h-full">
                    <Card className="py-4 border border-gray-200 shadow-none flex flex-col h-full">

                      <CardContent className="relative flex items-center justify-center px-6 py-2 min-h-[240px] flex-shrink-0">
                        {images && images.length > 0 ? (
                          <img
                            src={getMediaUrl(images[0].url)}
                            alt={productName}
                            className="max-h-[190px] w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                          />
                        ) : (
                          <div className="w-full h-[190px] bg-gray-100 flex items-center justify-center rounded-md">
                            <span className="text-gray-400 text-sm">Sin imagen</span>
                          </div>
                        )}

                        <div className="absolute w-full px-6 transition duration-200 opacity-0 group-hover:opacity-100 bottom-5">
                          <div className="flex justify-center gap-x-6">
                            <IconButton
                              onClick={() => router.push(`product/${slug}`)}
                              icon={<Expand size={20} className="text-gray-600" />}
                            />
                            {/* 4. Reemplazamos el botón del carrito por este que lleva a detalles */}
                            <IconButton
                              onClick={() => router.push(`product/${slug}`)}
                              icon={<MessageCircle size={20} className="text-gray-600" />}
                            />
                          </div>
                        </div>
                      </CardContent>

                      <div className="flex flex-col flex-grow px-8 space-y-2 pb-2">
                        <h3 className="text-base font-bold text-gray-900 line-clamp-2 min-h-[3rem]">
                          {productName}
                        </h3>

                        {subtitle && (
                          <p className="text-xs text-gray-500 font-medium line-clamp-1 mb-4">
                            {subtitle}
                          </p>
                        )}

                        <div className="mt-auto pt-2 pb-2">
                          <span className="inline-block w-full text-center bg-gray-900 text-white font-semibold py-2.5 px-4 rounded-lg text-sm transition-colors group-hover:bg-blue-600">
                            Ver más detalles
                          </span>
                        </div>
                      </div>

                    </Card>
                  </div>
                </CarouselItem>
              );
            })}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext className="hidden sm:flex" />
      </Carousel>
    </div>
  );
};

export default FeaturedProducts;