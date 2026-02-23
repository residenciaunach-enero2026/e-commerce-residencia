"use client"
import { useRouter } from "next/navigation";
import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel";
import Autoplay from "embla-carousel-autoplay";

export const dataCarouselTop = [
    {
        id: 1,
        title: "Especialistas en Volkswagen",
        description: "Mantenimiento preventivo y correctivo con refacciones de la mejor calidad.",
        link: "#",
    },
    {
        id: 2,
        title: "Diagnóstico por escáner gratis",
        description: "En la realización de cualquier paquete de afinación básica o plus.",
        link: "/category/afinacion",
    },
    {
        id: 3,
        title: "Garantía en mano de obra",
        description: "Todos nuestros servicios y refacciones cuentan con garantía por escrito en el taller.",
        link: "#",
    },
    {
        id: 4,
        title: "Cotizaciones rápidas",
        description: "Solicita información y agenda tu cita fácilmente a través de nuestro cotizador.",
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