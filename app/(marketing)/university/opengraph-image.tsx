import { generateOGImage, ogSize } from "@/lib/og-image";

export const runtime = "edge";
export const alt = "Appalachian State University - Watauga County EDC";
export const size = ogSize;
export const contentType = "image/png";

export default function OGImage() {
  return generateOGImage(
    "Appalachian State University",
    "20,000+ students, cutting-edge research, and a workforce pipeline driving the regional economy."
  );
}
