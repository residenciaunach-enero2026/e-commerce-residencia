/* eslint-disable @next/next/no-img-element */
"use client";
import { useGetCategories } from "@/api/getProducts";
import Link from "next/link";
import { ResponseType } from "@/types/response";
import { CategoryType } from "@/types/category";
import { getMediaUrl } from "@/lib/getMediaUrl";

const ChooseCategory = () => {
  const { result, loading }: ResponseType = useGetCategories();

  return (
    <div className="max-w-6xl py-4 mx-auto sm:py-16 sm:px-24">
      <h3 className="px-6 pb-4 text-3xl sm:pb-8">
        Elige tu categoría favorita
      </h3>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {!loading &&
          result !== null &&
          result.map((category: CategoryType) => (
            <Link
              key={category.id}
              href={`/category/${category.slug}`}
              className="relative w-full max-w-[270px] mx-auto overflow-hidden bg-no-repeat bg-cover rounded-lg group"
            >
              {category.mainImage?.url ? (
                <img
                  src={getMediaUrl(category.mainImage.url)}
                  alt={category.categoryName}
                  className="w-full h-[320px] object-cover transition duration-300 ease-in-out rounded-lg group-hover:scale-110"
                />
              ) : (
                <div className="w-full h-[320px] bg-gray-200 flex items-center justify-center text-gray-500 transition duration-300 ease-in-out rounded-lg group-hover:scale-110">
                  Sin imagen
                </div>
              )}
              <p className="absolute w-full py-2 text-lg font-bold text-center text-white bottom-5 backdrop-blur-lg">
                {category.categoryName}
              </p>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default ChooseCategory;