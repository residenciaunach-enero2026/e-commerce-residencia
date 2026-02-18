/* eslint-disable @next/next/no-img-element */
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

interface CarouselProductProps {
    images: {
        id: number;
        url: string;
    }[]
}

const CarouselProduct = (props: CarouselProductProps) => {
    const { images } = props;

    return (
        /* Agregamos w-full y max-w para que las flechas se cierren sobre la imagen */
        <div className="sm:px-16"> 
            <Carousel className="w-full max-w-sm mx-auto"> 
                <CarouselContent>
                    {images.map((image) => (
                        <CarouselItem key={image.id}>
                            <img
                                src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${image.url}`}
                                alt="Imagen de producto"
                                className="rounded-lg"
                            />
                        </CarouselItem>
                    ))}
                </CarouselContent>
                {/* Las flechas ahora estarán pegadas gracias al max-w del Carousel */}
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>
    );
};

export default CarouselProduct;