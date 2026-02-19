/* eslint-disable @next/next/no-img-element */
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

interface CarouselProductProps {
    images: {
        id: number;
        url: string;
    }[] | null; // Añadimos null para aceptar cuando no hay imagen
}

const CarouselProduct = (props: CarouselProductProps) => {
    const { images } = props;

    return (
        <div className="sm:px-16"> 
            <Carousel className="w-full max-w-sm mx-auto"> 
                <CarouselContent>
                    {/* Verificamos que images exista y tenga al menos un elemento ANTES de usar .map */}
                    {images && images.length > 0 ? (
                        images.map((image) => (
                            <CarouselItem key={image.id}>
                                <img
                                    src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${image.url}`}
                                    alt="Imagen de producto"
                                    className="rounded-lg object-contain w-full"
                                />
                            </CarouselItem>
                        ))
                    ) : (
                        // Si es null o está vacío, mostramos este recuadro en lugar de colapsar
                        <CarouselItem>
                            <div className="flex items-center justify-center w-full h-[300px] bg-gray-100 rounded-lg">
                                <span className="text-gray-400 font-medium">Sin imagen disponible</span>
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