import { useEffect, useState } from "react";
import { TestimonialType } from "@/types/testimonial";

export function useGetTestimonials() {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/testimonials`;

    const [result, setResult] = useState<TestimonialType[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        (async () => {
            try {
                const res = await fetch(url);
                if (!res.ok) {
                    throw new Error("No se pudieron cargar los testimonios");
                }
                const json = await res.json();
                setResult(json.data);
            } catch (error: any) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        })();
    }, [url]);

    return { result, loading, error };
}
