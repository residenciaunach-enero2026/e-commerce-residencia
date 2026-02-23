"use client"

import * as React from "react"
import Link from "next/link"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Afinaciones",
    href: "/category/afinacion",
    description:
      "Servicios de afinación básica y plus para mantener el motor de tu Volkswagen en óptimas condiciones.",
  },
  {
    title: "Frenos",
    href: "/category/frenos",
    description:
      "Mantenimiento preventivo y correctivo, cambio de balatas y rectificado de discos.",
  },
  {
    title: "Suspensión",
    href: "/category/suspension",
    description:
      "Servicio de amortiguadores, rótulas, alineación y balanceo para un manejo seguro y suave.",
  },
]

const MenuList = () => {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Sobre nosotros</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href="/"
                  >
                    <div className="mb-2 mt-4 text-lg font-medium">
                      Especialistas VW
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      Tu taller de confianza especializado en vehículos Volkswagen. Calidad alemana garantizada.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <ListItem href="/about" title="Nuestra Historia">
                Conoce más sobre nuestro taller y nuestra pasión por los motores.
              </ListItem>
              <ListItem href="/faq" title="Preguntas Frecuentes">
                Resuelve tus dudas sobre garantías, tiempos y cotizaciones.
              </ListItem>
              <ListItem href="/testimonials" title="Testimonios">
                Descubre lo que dicen nuestros clientes satisfechos.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Servicios</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {components.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href="/blog">Blog</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

export default MenuList

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"