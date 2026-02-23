import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import NextTopLoader from 'nextjs-toploader'; // Importación lista

const urbanist = Urbanist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "VW Motors",
  description: "Catálogo de servicios de mantenimiento para Volkswagen. Encuentra afinaciones, frenos y suspensión para tu vehículo. ¡Mantén tu Volkswagen en óptimas condiciones con nuestros servicios especializados!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={urbanist.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* AQUÍ AGREGAMOS LA BARRA DE CARGA */}
          <NextTopLoader
            color="#000" // Negro para que combine con tu diseño, o pon "#a16207" para tono café
            initialPosition={0.08}
            crawlSpeed={200}
            height={3}
            crawl={true}
            showSpinner={false} // Oculta el circulito de carga, solo deja la barra superior
            easing="ease"
            speed={200}
            shadow="0 0 10px #000,0 0 5px #000"
          />
          
          <Navbar />
          {children}
          <Footer />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}