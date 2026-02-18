import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { ProductType } from "@/types/product";
import { toast } from "@/components/ui/use-toast";

interface LovedProductsStore {
  lovedItems: ProductType[];
  toggleLoveItem: (data: ProductType) => void;
}

export const useLovedProducts = create<LovedProductsStore>()(
  persist(
    (set, get) => ({
      lovedItems: [],

      toggleLoveItem: (data: ProductType) => {
        const currentItems = get().lovedItems;
        const exists = currentItems.some((item) => item.id === data.id);

        if (exists) {
          set({
            lovedItems: currentItems.filter((item) => item.id !== data.id),
          });

          toast({
            title: "Eliminaste el producto de favoritos",
            description: data.productName,
          });

          return;
        }

        set({ lovedItems: [...currentItems, data] });

        toast({
          title: "Agregaste el producto a favoritos ❤️",
          description: data.productName,
        });
      },
    }),
    {
      name: "loved-products-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
