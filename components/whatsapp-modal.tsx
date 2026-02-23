"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ProductType } from "@/types/product";
import { Car, Calendar, User, Phone, Wrench } from "lucide-react";

interface WhatsAppModalProps {
  product?: ProductType;
  buttonText?: string;
  buttonClasses?: string;
}

export default function WhatsAppModal({
  product,
  buttonText = "Cotizar por WhatsApp",
  buttonClasses = "w-full bg-[#25D366] hover:bg-[#128C7E] text-white font-bold text-lg py-6 shadow-lg transition-all hover:scale-[1.02] mt-6",
}: WhatsAppModalProps) {
  const [formData, setFormData] = useState({
    nombre: "",
    telefono: "",
    modelo: "",
    anio: "",
    comentarios: "",
  });

  const nombreServicio = product?.productName || "este servicio";

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Limpia SOLO espacios/tabs (sin romper saltos de línea)
  const cleanInline = (value: string) => value.replace(/[ \t]+/g, " ").trim();

  const cleanMultiline = (value: string) =>
    value
      .split("\n")
      .map((line) => line.replace(/[ \t]+/g, " ").trimEnd())
      .join("\n")
      .trim();

  // Emojis en Unicode escape para evitar "�"
  const EMOJI = {
    wave: "\u{1F44B}",
    person: "\u{1F464}",
    phone: "\u{1F4F1}",
    car: "\u{1F697}",
    calendar: "\u{1F4C5}",
    speech: "\u{1F4AC}",
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const phoneNumber = "529651386865";

    const message = [
      `¡Hola JuanDev! ${EMOJI.wave}`,
      ``,
      `Me interesa cotizar el servicio de: *${cleanInline(nombreServicio)}*.`,
      ``,
      `*Datos del cliente y vehículo:*`,
      `${EMOJI.person} Nombre: ${cleanInline(formData.nombre)}`,
      `${EMOJI.phone} Teléfono: ${cleanInline(formData.telefono)}`,
      `${EMOJI.car} Modelo VW: ${cleanInline(formData.modelo)}`,
      `${EMOJI.calendar} Año: ${cleanInline(formData.anio)}`,
      ``,
      `${EMOJI.speech} *Descripción del problema:*`,
      `${cleanMultiline(formData.comentarios)}`,
      ``,
      `¿Podrían darme más información y agendar una revisión?`,
    ].join("\n");

    const encodedMessage = encodeURIComponent(message);

    // WhatsApp Web
    const url = `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`;
    window.open(url, "_blank");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className={buttonClasses}>{buttonText}</Button>
      </DialogTrigger>

      <DialogContent
        className="
          w-[calc(100vw-1rem)]
          max-w-[calc(100vw-1rem)]
          sm:max-w-[640px]
          max-h-[90vh]
          overflow-y-auto
          rounded-3xl
          border-0
          bg-white
          shadow-2xl
          p-4
          sm:p-6
          md:p-8
        "
      >
        <DialogHeader className="pr-8">
          <DialogTitle className="text-xl sm:text-2xl font-black flex items-center gap-2 text-gray-900 leading-tight">
            <Wrench className="text-gray-700 shrink-0" size={24} />
            <span className="break-words">Detalles del Vehículo</span>
          </DialogTitle>

          <DialogDescription className="text-gray-500 text-sm sm:text-base pt-2 leading-relaxed break-words">
            Ingresa los datos de tu auto. Te contactaremos de inmediato con una
            cotización para:{" "}
            <span className="font-bold text-gray-800 break-words">
              {nombreServicio}
            </span>
            .
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="grid gap-4 sm:gap-5 py-2 sm:py-4 mt-1 sm:mt-2 w-full min-w-0">
          <div className="grid gap-2 min-w-0">
            <Label
              htmlFor="nombre"
              className="text-gray-700 font-semibold flex items-center gap-1 text-sm sm:text-base"
            >
              <User size={16} className="shrink-0" /> Nombre completo
            </Label>
            <Input
              id="nombre"
              name="nombre"
              required
              placeholder="Ej. Carlos Mendoza"
              onChange={handleChange}
              className="w-full min-w-0 bg-gray-50 border-gray-200"
            />
          </div>

          <div className="grid gap-2 min-w-0">
            <Label
              htmlFor="telefono"
              className="text-gray-700 font-semibold flex items-center gap-1 text-sm sm:text-base"
            >
              <Phone size={16} className="shrink-0" /> Teléfono de contacto
            </Label>
            <Input
              id="telefono"
              name="telefono"
              type="tel"
              required
              placeholder="Ej. 55 1234 5678"
              onChange={handleChange}
              className="w-full min-w-0 bg-gray-50 border-gray-200"
            />
          </div>

          {/* ✅ En móvil una columna, en desktop 2 columnas */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 min-w-0">
            <div className="grid gap-2 min-w-0">
              <Label
                htmlFor="modelo"
                className="text-gray-700 font-semibold flex items-center gap-1 text-sm sm:text-base"
              >
                <Car size={16} className="shrink-0" /> Modelo (VW)
              </Label>
              <Input
                id="modelo"
                name="modelo"
                required
                placeholder="Ej. Jetta"
                onChange={handleChange}
                className="w-full min-w-0 bg-gray-50 border-gray-200"
              />
            </div>

            <div className="grid gap-2 min-w-0">
              <Label
                htmlFor="anio"
                className="text-gray-700 font-semibold flex items-center gap-1 text-sm sm:text-base"
              >
                <Calendar size={16} className="shrink-0" /> Año
              </Label>
              <Input
                id="anio"
                name="anio"
                required
                type="number"
                placeholder="Ej. 2018"
                onChange={handleChange}
                className="w-full min-w-0 bg-gray-50 border-gray-200"
              />
            </div>
          </div>

          <div className="grid gap-2 min-w-0">
            <Label
              htmlFor="comentarios"
              className="text-gray-700 font-semibold text-sm sm:text-base"
            >
              Describe tu problema o kilometraje
            </Label>
            <textarea
              id="comentarios"
              name="comentarios"
              required
              className="w-full min-w-0 flex min-h-[96px] sm:min-h-[110px] rounded-md border border-gray-200 bg-gray-50 px-3 py-3 text-sm placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 transition-shadow resize-none"
              placeholder="Ej. Necesito mi afinación de los 60,000 km, o siento que el freno rechina al pisarlo..."
              onChange={handleChange}
            />
          </div>

          {/* ✅ Botón responsive para que no se salga en móvil */}
          <Button
            type="submit"
            className="
              w-full
              !bg-[#25D366]
              hover:!bg-[#128C7E]
              !text-white
              text-sm sm:text-base
              leading-tight
              min-h-12 h-auto
              py-3 px-4
              mt-2
              shadow-md
              whitespace-normal
              break-words
            "
          >
            Enviar mi solicitud de cotización por WhatsApp
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}