import { generateOGImage, ogSize } from "@/lib/og-image";

export const runtime = "edge";
export const alt = "Data & Community Profiles - Watauga County EDC";
export const size = ogSize;
export const contentType = "image/png";

export default function OGImage() {
  return generateOGImage(
    "Data & Community Profiles",
    "Facts, figures, and reports for informed decisions about Watauga County."
  );
}
