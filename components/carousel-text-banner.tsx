"use client"
import { useRouter } from "next/navigation";
import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel";
import Autoplay from "embla-carousel-autoplay";

export const dataCarouselTop = [
    {
        id: 1,
        title: "Envío en 24/48 horas",
        description: "Como cliente VIP, tus envíos en 24/48 horas. Obtén más información y únete",
        link: "#",
    },
    {
        id: 2,
        title: "Consigue hasta un -25% en artículos seleccionados",
        description: "Aprovecha nuestros descuentos de temporada.",
        link: "#",
    },
    {
        id: 3,
        title: "Devoluciones gratuitas",
        description: "Si no te gusta, devuélvelo sin coste adicional.",
        link: "#",
    },
    {
        id: 4,
        title: "Comprar novedades",
        description: "Echa un vistazo a los últimos productos del catálogo.",
        link: "#",
    }
]

const CarouselTextBanner = () => {
    const router = useRouter()

    return (
        <div className="bg-gray-200 dark:bg-primary">
            <Carousel className="w-full max-w-4xl mx-auto"
                plugins={[
                    Autoplay({
                        delay: 2500
                    })
                ]}
            >
                <CarouselContent>
                    {dataCarouselTop.map(({ id, title, link, description }) => (
                        <CarouselItem key={id} onClick={() => router.push(link)} className="cursor-pointer">
                            <div className="p-2 text-center">
                                <p className="sm:text-lg text-wrap dark:text-secondary">{title}</p>
                                <p className="text-xs sm:text-sm text-wrap dark:text-secondary">{description}</p>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
        </div>
    );
}

export default CarouselTextBanner;