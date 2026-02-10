import { generateOGImage, ogSize } from "@/lib/og-image";

export const runtime = "edge";
export const alt = "Live in Watauga County - Watauga County EDC";
export const size = ogSize;
export const contentType = "image/png";

export default function OGImage() {
  return generateOGImage(
    "Make the Mountains Your Home",
    "Mountain adventure, university culture, and modern amenities in a welcoming community."
  );
}
