"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { CheckCircle2 } from "lucide-react";

export default function Page() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
      <CheckCircle2 size={80} className="text-green-600 mb-6" strokeWidth={1.5} />
      
      <h1 className="mb-4 text-3xl font-bold text-center">¡Solicitud enviada!</h1>
      <p className="max-w-md mb-8 text-lg text-center text-gray-500">
        Hemos recibido tu solicitud de información. Nos pondremos en contacto contigo lo antes posible para confirmar los detalles de tu servicio.
      </p>
      
      <Button onClick={() => router.push("/")} size="lg">
        Volver al catálogo
      </Button>
    </div>
  );
}