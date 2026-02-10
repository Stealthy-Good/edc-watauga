import { generateOGImage, ogSize } from "@/lib/og-image";

export const runtime = "edge";
export const alt = "Contact Us - Watauga County EDC";
export const size = ogSize;
export const contentType = "image/png";

export default function OGImage() {
  return generateOGImage(
    "Let's Talk",
    "Business inquiries, relocation questions, and partnership opportunities."
  );
}
