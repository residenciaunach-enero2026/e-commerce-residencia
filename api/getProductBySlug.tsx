import { useEffect, useState } from "react";
import { ProductType } from "@/types/product"; // Importamos el tipo

export function useGetProductBySlug(slug: string | string[]) {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products?filters[slug][$eq]=${slug}&populate=*`;
    
    // Le decimos a useState que el resultado será un ProductType o null
    const [result, setResult] = useState<ProductType | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        (async () => {
            try {
                const res = await fetch(url);
                const json = await res.json();
                setResult(json.data[0]); 
                setLoading(false);
            } catch (error: any) {
                setError(error);
                setLoading(false);
            }
        })();
    }, [url]);

    return { result, loading, error };
}