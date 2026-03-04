"use client";

import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Hammer } from "lucide-react";

export default function NotFound() {
    return (
        <div className="min-h-[80vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-gray-50">
            <div className="max-w-max mx-auto text-center">
                <main className="sm:flex">
                    <p className="text-4xl font-extrabold text-blue-600 sm:text-5xl">404</p>
                    <div className="sm:ml-6 sm:border-l sm:border-gray-200 sm:pl-6">
                        <div className="flex flex-col items-center sm:items-start">
                            <div className="flex items-center gap-3 text-gray-900 mb-2">
                                <Hammer className="w-8 h-8 text-yellow-500" />
                                <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Página en construcción</h1>
                            </div>
                            <p className="mt-2 text-base text-gray-500 text-center sm:text-left">
                                Estamos trabajando duro para tener esta sección lista. ¡Vuelve pronto!
                            </p>
                        </div>
                        <div className="mt-8 flex justify-center sm:justify-start space-x-3 sm:border-l-transparent sm:pl-0">
                            <Link
                                href="/"
                                className={buttonVariants({
                                    className: "bg-gray-900 hover:bg-black text-white px-8 py-3 rounded-full font-semibold transition-all shadow-md",
                                })}
                            >
                                Volver al inicio
                            </Link>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
