import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Wrench } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default function FAQPage() {
  return (
    <div className="max-w-4xl mx-auto py-16 px-4 sm:px-8 min-h-[70vh]">
      
      {/* Encabezado */}
      <div className="text-center mb-12">
        <div className="flex justify-center mb-4">
            <div className="bg-gray-100 p-4 rounded-full">
                <Wrench size={32} className="text-gray-900" />
            </div>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
          Preguntas Frecuentes
        </h1>
        <p className="text-lg text-gray-500 max-w-2xl mx-auto">
          Resolvemos tus dudas sobre nuestros servicios, garantías y el proceso de cotización para tu Volkswagen.
        </p>
      </div>

      {/* Acordeón de Preguntas */}
      <div className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-10 shadow-sm">
        <Accordion type="single" collapsible className="w-full">
          
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-left text-lg font-bold text-gray-800 hover:text-black">
              ¿Cómo agendo una cita o cotizo un servicio?
            </AccordionTrigger>
            <AccordionContent className="text-gray-600 text-base leading-relaxed">
              Todo nuestro proceso de cotización y agenda es directo y personalizado. Solo tienes que navegar por nuestro catálogo, elegir el servicio que necesita tu auto y presionar el botón "Cotizar por WhatsApp". Llenas un rápido formulario con el modelo y año de tu VW, y te responderemos de inmediato con la cotización exacta y disponibilidad.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger className="text-left text-lg font-bold text-gray-800 hover:text-black">
              ¿Atienden otras marcas además de Volkswagen?
            </AccordionTrigger>
            <AccordionContent className="text-gray-600 text-base leading-relaxed">
              Actualmente somos un taller <strong>100% especializado en la línea Volkswagen</strong>. Esto nos permite garantizar diagnósticos precisos, contar con la herramienta especializada necesaria y conocer a fondo los problemas comunes de modelos como Jetta, Vento, Taos, Tiguan, entre otros.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger className="text-left text-lg font-bold text-gray-800 hover:text-black">
              ¿Por qué los precios dicen "Sujeto a diagnóstico"?
            </AccordionTrigger>
            <AccordionContent className="text-gray-600 text-base leading-relaxed">
              Cada vehículo es único y su desgaste depende de sus hábitos de manejo e historial. Te damos un precio base competitivo, pero al ingresar al taller realizamos una revisión física para confirmar que no necesites refacciones adicionales (por ejemplo, si en un cambio de balatas descubrimos que los discos necesitan rectificación urgente). Nunca haremos un cobro extra sin tu previa autorización.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4">
            <AccordionTrigger className="text-left text-lg font-bold text-gray-800 hover:text-black">
              ¿Ofrecen garantía en sus reparaciones?
            </AccordionTrigger>
            <AccordionContent className="text-gray-600 text-base leading-relaxed">
              ¡Por supuesto! Todos nuestros servicios de afinación, frenos y suspensión cuentan con una garantía por escrito de <strong>30 días o 2,000 kilómetros</strong> (lo que ocurra primero) sobre la mano de obra, además de la garantía directa del fabricante en las refacciones instaladas.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-5">
            <AccordionTrigger className="text-left text-lg font-bold text-gray-800 hover:text-black">
              ¿El diagnóstico por escáner tiene costo?
            </AccordionTrigger>
            <AccordionContent className="text-gray-600 text-base leading-relaxed">
              El diagnóstico por escáner tiene un costo base si solo vienes a revisión. Sin embargo, <strong>es totalmente GRATIS</strong> en la contratación de cualquier paquete de Afinación Mayor.
            </AccordionContent>
          </AccordionItem>

        </Accordion>
      </div>

      {/* Botón de acción al final */}
      <div className="mt-12 text-center">
        <p className="text-gray-600 mb-4">¿Tienes alguna otra duda que no esté aquí?</p>
        <Link href="/servicios" className={buttonVariants({ size: "lg", className: "bg-black hover:bg-gray-800 text-white rounded-full px-8" })}>
          Explorar catálogo de servicios
        </Link>
      </div>

    </div>
  );
}