export function getMediaUrl(url?: string | null) {
  if (!url) return "";
  
  // Si la URL ya viene completa (como las de Cloudinary), la devuelve tal cual sin modificarla
  if (url.startsWith("http")) return url; 
  
  
  return `${process.env.NEXT_PUBLIC_BACKEND_URL}${url}`; 
}