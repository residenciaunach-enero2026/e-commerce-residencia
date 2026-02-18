"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { XCircle } from "lucide-react"; // Usamos una X roja

export default function Page() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
      {/* Icono de Error */}
      <XCircle size={80} className="text-red-600 mb-6" strokeWidth={1.5} />
      
      {/* Mensaje principal */}
      <h1 className="mb-4 text-3xl font-bold text-center">Pago cancelado</h1>
      <p className="max-w-md mb-8 text-lg text-center text-gray-500">
        Tu pago no se pudo procesar o fue cancelado. No te preocupes, tus productos siguen guardados en el carrito.
      </p>
      
      {/* Botón para volver al carrito (NO vaciamos el carrito aquí) */}
      <Button onClick={() => router.push("/cart")} size="lg">
        Volver al carrito
      </Button>
    </div>
  );
}