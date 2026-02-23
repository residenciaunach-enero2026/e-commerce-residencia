// archivo: app/(routes)/nosotros/page.tsx
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default function NosotrosPage() {
  return (
    <div className="max-w-6xl mx-auto py-16 px-4 sm:px-8">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">Nuestra Historia</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
        Especialistas dedicados a mantener el rendimiento, la seguridad y la potencia de tu vehículo con los más altos estándares.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
          <p>
            Comenzamos con una pasión compartida por los motores y la mecánica de precisión. A lo largo de los años, nos hemos especializado en el diagnóstico y reparación profunda, garantizando a nuestros clientes soluciones definitivas.
          </p>
          <p>
            Nuestro taller no es solo un centro de servicio; es un espacio donde la transparencia y la honestidad son nuestra principal herramienta. Utilizamos refacciones de la más alta calidad y te explicamos a detalle cada paso del mantenimiento de tu vehículo.
          </p>
          <div className="pt-4">
            <Link href="/servicios" className={buttonVariants()}>
              Conoce nuestros servicios
            </Link>
          </div>
        </div>
        
        {/* Espacio para una foto real de tu equipo o taller */}
        <div className="h-96 bg-gray-100 rounded-3xl border border-gray-200 flex items-center justify-center shadow-inner overflow-hidden">
          <span className="text-gray-400 font-medium"></span>
        </div>
      </div>
    </div>
  );
}