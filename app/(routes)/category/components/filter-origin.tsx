"use client";

import { useMemo } from "react";
import { useParams } from "next/navigation";
import { useGetCategoryProduct } from "@/api/getCategoryProduct";
import { ResponseType } from "@/types/response";
import { ProductType } from "@/types/product";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

type FilterOriginProps = {
  setFilterOrigin: (origin: string) => void;
};

const FilterOrigin = ({ setFilterOrigin }: FilterOriginProps) => {
  const params = useParams();
  const { categorySlug } = params;

  const { result }: ResponseType = useGetCategoryProduct(categorySlug as string);

  const origins: string[] = useMemo(() => {
    if (!result) return [];

    const values = result
      .map((product: ProductType) => product.Origin)
      .filter((origin: string) => origin && origin.length > 0);

    return Array.from(new Set(values));
  }, [result]);

  return (
    <div className="my-5">
      <p className="mb-3 font-bold">Origen</p>

      <RadioGroup onValueChange={(value) => setFilterOrigin(value)}>
        {origins.map((origin) => (
          <div key={origin} className="flex items-center space-x-2">
            <RadioGroupItem value={origin} id={origin} />
            <Label htmlFor={origin}>{origin}</Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default FilterOrigin;
