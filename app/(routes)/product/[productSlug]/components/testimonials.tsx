import { useGetTestimonials } from "@/api/getTestimonials";
import { Star } from "lucide-react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";

export default function Testimonials() {
    const { result: testimonials, loading, error } = useGetTestimonials();

    // Si no hay datos, no renderizamos nada para no romper el aspecto de la página
    if (loading || error || !testimonials || testimonials.length === 0) {
        return null;
    }

    // Opcional: Mostrar solo los mejores testimonios o los más recientes
    const displayedTestimonials = testimonials.slice(0, 4);

    return (
        <div className="mt-16 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center mb-10 text-center">
                <h3 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">Lo que dicen nuestros clientes</h3>
                <div className="w-16 h-1 mt-3 bg-blue-600 rounded-full"></div>
            </div>

            <Carousel opts={{ align: "start", loop: true }} className="w-full max-w-5xl mx-auto">
                <CarouselContent className="">
                    {testimonials.map((testimonial) => (
                        <CarouselItem key={testimonial.id} className="md:basis-1/2 lg:basis-1/2 pl-4 px-2">
                            <div className="h-full p-1">
                                <div className="flex flex-col h-full bg-white border border-gray-100 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                                    <div className="flex gap-1 mb-3 shrink-0">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                size={18}
                                                className={i < (testimonial.rating || 5) ? "fill-yellow-400 text-yellow-400" : "fill-gray-100 text-gray-200"}
                                            />
                                        ))}
                                    </div>

                                    <blockquote className="flex-1 mt-2 text-gray-700 italic text-base leading-relaxed">
                                        "{testimonial.review}"
                                    </blockquote>

                                    <div className="flex flex-col shrink-0 mt-6 pt-6 border-t border-gray-50">
                                        <span className="font-bold text-gray-900">{testimonial.customerName}</span>
                                        <span className="text-sm text-gray-500 font-medium">Dueño de {testimonial.carModel}</span>
                                    </div>
                                </div>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>

                <CarouselPrevious className="hidden md:flex -left-12 h-12 w-12 hover:bg-gray-100 hover:text-black border-2 border-gray-200" />
                <CarouselNext className="hidden md:flex -right-12 h-12 w-12 hover:bg-gray-100 hover:text-black border-2 border-gray-200" />
            </Carousel>
        </div>
    );
}
