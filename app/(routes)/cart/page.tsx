"use client";

import { useCart } from "@/hooks/use-cart";
import CartItem from "./components/cart-item";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { makePaymentRequest } from "@/api/payment";

export default function Page() {
  const { items } = useCart();

  const totalPrice = items.reduce((acc, item) => {
    const qty = item.quantity ?? 1;
    return acc + item.price * qty;
  }, 0);

  const buyStripe = async () => {
    try {
      const res = await makePaymentRequest.post("/orders", {
        products: items,
      });
      

      const url = res?.data?.stripeSession?.url;
      if (!url) {
        console.log("No llegó stripeSession.url en la respuesta:", res.data);
        return;
      }

      window.location.href = url;
    } catch (error) {
      console.log("Error al procesar el pago:", error);
    }
  };
  
  return (
    <div className="max-w-6xl py-4 mx-auto sm:py-16 sm:px-24">
      <h1 className="text-3xl font-medium">Shopping Cart</h1>

      <div className="grid gap-8 mt-8 md:grid-cols-[1fr_320px]">
        <div>
          {items.length === 0 && (
            <p className="text-gray-500">No hay productos en el carrito</p>
          )}

          <div className="space-y-6">
            {items.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>
        </div>

        <aside className="h-fit border rounded-lg p-4">
          <h2 className="text-xl font-semibold">Order Summary</h2>
          <Separator className="my-4" />

          <div className="flex items-center justify-between">
            <p className="text-gray-600">Order total</p>
            <p className="font-bold whitespace-nowrap">
              {totalPrice.toFixed(2)} €
            </p>
          </div>

          <Button
            className="w-full mt-5"
            disabled={items.length === 0}
            onClick={buyStripe}
          >
            Comprar
          </Button>
        </aside>
      </div>
    </div>
  );
}
