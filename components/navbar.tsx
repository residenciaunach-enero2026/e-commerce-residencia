"use client";

import { useEffect, useState } from "react";
import { Heart, User } from "lucide-react";
import { useRouter } from "next/navigation";
import MenuList from "./menu-list";
import ItemsMenuMobile from "./items-menu-mobile";
import ToggleTheme from "./toggle-theme";
import { useLovedProducts } from "@/hooks/use-loved-products";

const Navbar = () => {
  const router = useRouter();
  const { lovedItems } = useLovedProducts();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const lovedCount = lovedItems.length;
  const lovedHasItems = mounted && lovedCount > 0;

  return (
    <div className="flex items-center justify-between p-4 mx-auto cursor-pointer sm:max-w-4xl md:max-w-6xl">
      {/* Logo */}
      <h1
        className="text-3xl text-gray-900 dark:text-white"
        onClick={() => router.push("/")}
      >
        Juan<span className="font-bold">Dev</span>
      </h1>

      {/* Menú desktop */}
      <div className="items-center justify-between hidden sm:flex">
        <MenuList />
      </div>

      {/* Menú móvil */}
      <div className="flex sm:hidden">
        <ItemsMenuMobile />
      </div>

      {/* Iconos derecha */}
      <div className="flex items-center justify-between gap-2 sm:gap-7">
        {/* Favoritos */}
        <button
          type="button"
          onClick={() => router.push("/loved")}
          aria-label="Ir a favoritos"
          className="relative cursor-pointer text-gray-900 dark:text-white"
        >
          <Heart
            size={22}
            strokeWidth={1.75}
            stroke="currentColor"
            fill={lovedHasItems ? "currentColor" : "none"}
            className="transition-colors"
          />

          {lovedHasItems && (
            <span className="absolute -top-2 -right-2 min-w-[18px] h-[18px] px-1 rounded-full bg-black text-white dark:bg-white dark:text-black text-[11px] flex items-center justify-center leading-none">
              {lovedCount}
            </span>
          )}
        </button>

        {/* Perfil */}
        <button
          type="button"
          onClick={() => router.push("/profile")}
          aria-label="Ir al perfil"
          className="cursor-pointer text-gray-900 dark:text-white"
        >
          <User
            size={22}
            strokeWidth={1.75}
            stroke="currentColor"
            className="transition-colors"
          />
        </button>

        {/* Tema */}
       {/* <ToggleTheme /> */}
      </div>
    </div>
  );
};

export default Navbar;