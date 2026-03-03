/* eslint-disable @next/next/no-img-element */
import { ProductType } from "@/types/product";
import { useLovedProducts } from "@/hooks/use-loved-products";
import { getMediaUrl } from "@/lib/getMediaUrl";
import WhatsAppModal from "@/components/whatsapp-modal";
import IconButton from "@/components/icon-button";
import { X } from "lucide-react";

interface LovedItemProductProps {
  product: ProductType;
}

const LovedItemProduct = ({ product }: LovedItemProductProps) => {
  // CORRECCIÓN: Usamos toggleLoveItem en lugar del inexistente removeItem
  const { toggleLoveItem } = useLovedProducts();

  return (
    <li className="flex py-6 border-b border-gray-200">

      <div className="relative h-24 w-24 rounded-md overflow-hidden sm:h-32 sm:w-32 bg-gray-50 flex items-center justify-center flex-shrink-0">
        {product.images && product.images.length > 0 ? (
          <img
            src={getMediaUrl(product.images[0].url)}
            alt={product.productName}
            className="object-contain object-center w-full h-full p-2"
          />
        ) : (
          <span className="text-xs text-gray-400">Sin imagen</span>
        )}
      </div>

      <div className="relative flex flex-1 flex-col justify-between ml-4 sm:ml-6">

        <div className="absolute z-10 right-0 top-0">
          {/* CORRECCIÓN: Pasamos 'product' completo a toggleLoveItem */}
          <IconButton onClick={() => toggleLoveItem(product)} icon={<X size={15} />} />
        </div>

        <div className="pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
          <div>
            <h3 className="text-lg font-bold text-gray-900 pr-4">{product.productName}</h3>
            {product.subtitle && (
              <p className="mt-1 text-sm text-gray-500">{product.subtitle}</p>
            )}
          </div>
        </div>

        <div className="mt-4 sm:mt-0 flex items-center w-full sm:w-auto">
          <WhatsAppModal
            product={product}
            buttonText="Cotizar por WhatsApp"
            buttonClasses="w-full sm:w-auto bg-black hover:bg-gray-800 text-white font-medium py-2 px-8 rounded-full shadow-sm transition-colors text-sm"
          />
        </div>

      </div>
    </li>
  );
};

export default LovedItemProduct;