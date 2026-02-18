"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { useCart } from "@/hooks/use-cart"; // 1. Importamos el hook

export default function Page() {
  const router = useRouter();
  const { removeAll } = useCart(); // 2. Traemos la función de vaciar carrito

  // 3. Usamos useEffect para que se ejecute solo una vez cuando la página cargue
  useEffect(() => {
    removeAll();
  }, [removeAll]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
      {/* Icono de éxito */}
      <CheckCircle2 size={80} className="text-green-600 mb-6" strokeWidth={1.5} />
      
      {/* Mensaje principal */}
      <h1 className="mb-4 text-3xl font-bold text-center">¡Compra exitosa!</h1>
      <p className="max-w-md mb-8 text-lg text-center text-gray-500">
        Gracias por tu pedido. Hemos recibido tu pago correctamente y pronto comenzaremos a prepararlo.
      </p>
      
      {/* Botón para volver al inicio */}
      <Button onClick={() => router.push("/")} size="lg">
        Volver a la tienda
      </Button>
    </div>
  );
}