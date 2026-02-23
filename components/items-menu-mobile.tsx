"use client";

import { Menu } from "lucide-react";
import Link from "next/link";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

const ItemsMenuMobile = () => {
  return (
    <Popover>
      <PopoverTrigger>
        <Menu />
      </PopoverTrigger>
      <PopoverContent>
        <Link href="/category/afinacion" className="block mb-2">
          Afinación
        </Link>
        <Link href="/category/frenos" className="block mb-2">
          Frenos
        </Link>
        <Link href="/category/suspension" className="block">
          Suspensión
        </Link>
      </PopoverContent>
    </Popover>
  );
};

export default ItemsMenuMobile;