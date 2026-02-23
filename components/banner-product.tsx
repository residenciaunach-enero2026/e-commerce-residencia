import Link from "next/link";
import { buttonVariants } from "./ui/button";

const BannerProduct = () => {
    return (
        <div className="mt-4 text-center">
            <p className="text-gray-500 font-medium">Potencia y seguridad para tu vehículo</p>
            <h4 className="mt-2 text-5xl font-extrabold uppercase text-gray-900">
                Mantenimiento de Especialidad
            </h4>
            <p className="my-2 text-lg text-gray-600">
                Asegura el rendimiento de tu motor con manos expertas
            </p>
            <Link href="/servicios" className={buttonVariants({ size: "lg" })}>
                Ver servicios
            </Link>
            
            {/* Aquí está la magia: h-[200px] para celular, md:h-[350px] para PC. Y conservamos tu .jpg */}
            <div className="h-[200px] md:h-[380px] bg-[url('/slider-image.jpg')] bg-center bg-no-repeat bg-cover mt-8 lg:mt-12 rounded-2xl shadow-inner border border-gray-100" />
        </div>
    );
}

export default BannerProduct;