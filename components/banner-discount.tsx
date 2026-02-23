"use client";

import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { ProductType } from "@/types/product";
import WhatsAppModal from "./whatsapp-modal";

const BannerDiscount = () => {
    
    // El producto simulado para que WhatsApp sepa qué estamos cotizando
    const promoProduct: ProductType = {
        id: 0,
        documentId: "promo-001",
        productName: "Afinación Mayor + Diagnóstico por escáner gratis",
        slug: "promo-afinacion",
        subtitle: "Promoción Banner Principal",
        description: "Diagnóstico gratis en la contratación de afinación mayor",
        includes: [],
        note: "Precio sujeto a diagnóstico del vehículo.",
        active: true,
        isFeatured: false,
        price: 0, 
        images: [],
        category: { id: 0, documentId: "", categoryName: "Promociones", slug: "promociones" }
    };

    return (
        // 1. Contenedor principal: Ocupa todo el ancho de la pantalla (w-full) y tiene el fondo gris
        <div className="w-full bg-gray-100 dark:bg-slate-800 my-12 border-y border-gray-200 dark:border-slate-700">
            
            {/* 2. Contenedor interno: Mantiene el texto centrado y da muchísima amplitud vertical (py-20 sm:py-28) */}
            <div className="px-4 py-20 sm:py-28 text-center max-w-5xl mx-auto">
                
                <h2 className="uppercase font-black text-2xl sm:text-4xl text-primary">
                    Diagnóstico por escáner gratis
                </h2>
                
                <h3 className="mt-4 text-lg sm:text-xl font-medium text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
                    En la contratación de cualquier paquete de afinación mayor. Agenda tu cita hoy mismo y mantén tu motor al 100%.
                </h3>

                <div className="flex flex-col sm:flex-row justify-center gap-4 mt-10">
                    
                    {/* Reemplazamos el Link directamente por el Modal, pasando tus mismos estilos exactos */}
                    <WhatsAppModal 
                        product={promoProduct} 
                        buttonText="Agendar por Whatsapp"
                        buttonClasses={buttonVariants({ size: "lg" })}
                    />

                    <Link href="/faq" className={buttonVariants({ variant: "outline", size: "lg", className: "bg-white dark:bg-transparent" })}>
                        Más información
                    </Link>
                </div>
                
            </div>
        </div>
    );
}

export default BannerDiscount;