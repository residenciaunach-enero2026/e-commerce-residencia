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
  if (url.startsWith("http")) return url; // Cloudinary u otra URL absoluta
  const base = process.env.NEXT_PUBLIC_BACKEND_URL || "";
  return `${base}${url}`; // /uploads/...
};

const CarouselProduct = (props: CarouselProductProps) => {
  const { images } = props;

  return (
    <div className="sm:px-16">
      <Carousel className="w-full max-w-sm mx-auto">
        <CarouselContent>
          {images && images.length > 0 ? (
            images.map((image) => (
              <CarouselItem key={image.id}>
                <img
                  src={getMediaUrl(image.url)}
                  alt="Imagen de producto"
                  className="rounded-lg object-contain w-full"
                />
              </CarouselItem>
            ))
          ) : (
            <CarouselItem>
              <div className="flex items-center justify-center w-full h-[300px] bg-gray-100 rounded-lg">
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
