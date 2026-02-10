import { generateOGImage, ogSize } from "@/lib/og-image";

export const runtime = "edge";
export const alt = "Visit Watauga County - Watauga County EDC";
export const size = ogSize;
export const contentType = "image/png";

export default function OGImage() {
  return generateOGImage(
    "Experience the High Country",
    "Blue Ridge trails, downtown Boone, craft breweries, and four seasons of mountain adventure."
  );
}
