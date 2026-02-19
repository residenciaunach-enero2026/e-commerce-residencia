export function getMediaUrl(url?: string | null) {
  if (!url) return "";
  if (url.startsWith("http")) return url; // Cloudinary o URL absoluta
  const base = process.env.NEXT_PUBLIC_BACKEND_URL || "";
  return `${base}${url}`; // /uploads/...
}
