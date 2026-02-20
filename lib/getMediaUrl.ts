export function getMediaUrl(url?: string | null) {
  if (!url) return "";
  
  // Si la URL ya viene completa (como las de Cloudinary), la devuelve tal cual sin modificarla
  if (url.startsWith("http")) return url; 
  
  // Solo le agrega el dominio de tu backend si la imagen viene como ruta local (/uploads/...)
  return `${process.env.NEXT_PUBLIC_BACKEND_URL}${url}`; 
}