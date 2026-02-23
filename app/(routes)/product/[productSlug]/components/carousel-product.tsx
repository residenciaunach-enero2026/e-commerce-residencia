/* eslint-disable @next/next/no-img-element */
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface CarouselProductProps {
  images:
    | {
        id: number;
        url: string;
      }[]
    | null;
}

const getMediaUrl = (url?: string | null) => {
  if (!url) return "";
  if (url.startsWith("http")) return url;
  const base = process.env.NEXT_PUBLIC_BACKEND_URL || "";
  return `${base}${url}`;
};

const CarouselProduct = (props: CarouselProductProps) => {
  const { images } = props;

  return (
    // px-10 solo para que las flechas de shadcn no queden tapadas
    <div className="w-full px-10">
      <Carousel className="w-full">
        <CarouselContent>
          {images && images.length > 0 ? (
            images.map((image) => (
              <CarouselItem key={image.id}>
                {/*
                  - h-[420px] fija la altura del contenedor (ajusta a tu gusto)
                  - object-contain muestra la imagen completa sin recortes
                  - bg-white + rounded-xl mantiene el look limpio
                */}
                <div className="w-full h-[420px] overflow-hidden rounded-xl border border-gray-100 bg-white flex items-center justify-center">
                  <img
                    src={getMediaUrl(image.url)}
                    alt="Imagen del servicio"
                    className="h-full w-full object-contain"
                  />
                </div>
              </CarouselItem>
            ))
          ) : (
            <CarouselItem>
              <div className="flex items-center justify-center w-full h-[420px] bg-gray-50 rounded-xl border border-gray-100">
                <span className="text-gray-400 font-medium">
                  Sin imagen disponible
                </span>
              </div>
            </CarouselItem>
          )}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default CarouselProduct;