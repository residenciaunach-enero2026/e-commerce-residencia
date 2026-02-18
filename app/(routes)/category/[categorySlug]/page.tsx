"use client";

import { useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { useGetCategoryProduct } from "@/api/getCategoryProduct";
import { ResponseType } from "@/types/response";
import SkeletonSchema from "@/components/skeletonSchema";
import { ProductType } from "@/types/product";
import ProductCard from "@/components/product-card";
import FilterOrigin from "../components/filter-origin";

export default function CategoryPage() {
  const params = useParams();
  const { categorySlug } = params;

  const [filterOrigin, setFilterOrigin] = useState("");

  const { result, loading }: ResponseType = useGetCategoryProduct(
    categorySlug as string
  );

  const filteredProducts = useMemo(() => {
    if (!result) return [];
    if (!filterOrigin) return result;

    return result.filter((product: ProductType) => product.Origin === filterOrigin);
  }, [result, filterOrigin]);

  return (
    <div className="max-w-6xl py-4 mx-auto sm:py-16 sm:px-24">
      {result !== null && !loading && (
        <h1 className="text-3xl font-medium">
          Café {result[0]?.category?.categoryName}
        </h1>
      )}

      <div className="grid gap-8 mt-8 md:grid-cols-[220px_1fr]">
        <aside>
          <FilterOrigin setFilterOrigin={setFilterOrigin} />
        </aside>

        <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 md:gap-10">
          {loading && <SkeletonSchema grid={3} />}

          {!loading &&
            filteredProducts.map((product: ProductType) => (
              <ProductCard key={product.id} product={product} />
            ))}

          {!loading && filteredProducts.length === 0 && (
            <p className="col-span-3 text-center text-gray-500">
              No hay productos con ese filtro.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
