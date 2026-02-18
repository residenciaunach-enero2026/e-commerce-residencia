import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { ProductType } from "@/types/product";
import { toast } from "@/components/ui/use-toast";

interface CartStore {
  items: ProductType[];
  addItem: (data: ProductType) => void;
  removeItem: (id: number) => void;
  removeAll: () => void;
  updateItemQuantity: (id: number, quantity: number) => void;
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (data: ProductType) => {
        const currentItems = get().items;
        const existingItem = currentItems.find((item) => item.id === data.id);

        if (existingItem) {
          // si ya existe, sube cantidad
          set({
            items: currentItems.map((item) =>
              item.id === data.id
                ? { ...item, quantity: (item.quantity ?? 1) + 1 }
                : item
            ),
          });

          toast({
            title: "Cantidad actualizada",
            description: `${data.productName} +1`,
          });

          return;
        }

        // si no existe, agrega con quantity = 1
        set({
          items: [...currentItems, { ...data, quantity: 1 }],
        });

        toast({
          title: "Producto añadido al carrito 🛒",
          description: data.productName,
        });
      },

      removeItem: (id: number) => {
        set({ items: get().items.filter((item) => item.id !== id) });

        toast({
          title: "Producto eliminado del carrito",
        });
      },

      removeAll: () => {
        set({ items: [] });

        toast({
          title: "Carrito vaciado",
        });
      },

      updateItemQuantity: (id: number, quantity: number) => {
        if (quantity <= 0) {
          set({ items: get().items.filter((item) => item.id !== id) });
          toast({ title: "Producto eliminado del carrito" });
          return;
        }

        set({
          items: get().items.map((item) =>
            item.id === id ? { ...item, quantity } : item
          ),
        });
      },
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
