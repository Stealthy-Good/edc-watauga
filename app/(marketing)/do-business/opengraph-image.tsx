import { generateOGImage, ogSize } from "@/lib/og-image";

export const runtime = "edge";
export const alt = "Do Business in Watauga County - Watauga County EDC";
export const size = ogSize;
export const contentType = "image/png";

export default function OGImage() {
  return generateOGImage(
    "Grow Your Business in the High Country",
    "Educated workforce, outdoor industry expertise, and a community that values entrepreneurship."
  );
}
