import Link from "next/link";
import { buttonVariants } from "./ui/button";

const BannerProduct = () => {
    return (
        <div className="mt-4 text-center">
            <p>Sumergete en una experiencia única</p>
            <h4 className="mt-2 text-5xl font-extrabold uppercase">Café de especialidad</h4>
            <p className="my-2 text-lg">Despierta tus sentidos con cada sorbo</p>
            <Link href="#" className={buttonVariants()}>Comprar</Link>
            
            {/* Imagen de fondo del banner */}
            <div className="h-[350px] md:h-[600px] bg-[url('/slider-image.jpg')] bg-center bg-no-repeat bg-cover mt-10 lg:mt-20" />
        </div>
    );
}

export default BannerProduct;