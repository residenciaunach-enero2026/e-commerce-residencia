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
  useEffect(() => setMounted(true), []);

  const lovedCount = lovedItems.length;
  const lovedHasItems = mounted && lovedCount > 0;

  return (
    <div className="flex items-center justify-between p-4 mx-auto cursor-pointer sm:max-w-4xl md:max-w-6xl">
      <h1 className="text-3xl dark:text-white" onClick={() => router.push("/")}>
        Juan<span className="font-bold">Dev</span>
      </h1>

      <div className="items-center justify-between hidden sm:flex">
        <MenuList />
      </div>

      <div className="flex sm:hidden">
        <ItemsMenuMobile />
      </div>

      <div className="flex items-center justify-between gap-2 sm:gap-7">
        
        {/* Favoritos */}
        <div className="relative" onClick={() => router.push("/loved")}>
          <Heart
            strokeWidth="1"
            className={lovedHasItems ? "text-black fill-black dark:text-white dark:fill-white" : "text-black dark:text-white"}
            fill={lovedHasItems ? "currentColor" : "none"}
          />
          {lovedHasItems && (
            <span className="absolute -top-2 -right-2 min-w-[18px] h-[18px] px-1 rounded-full bg-black text-white dark:bg-white dark:text-black text-[11px] flex items-center justify-center">
              {lovedCount}
            </span>
          )}
        </div>

        <User
          strokeWidth="1"
          className="cursor-pointer text-black dark:text-white"
          onClick={() => router.push("/profile")}
        />

        <ToggleTheme />
      </div>
    </div>
  );
};

export default Navbar;