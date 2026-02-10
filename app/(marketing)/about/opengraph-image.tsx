import { generateOGImage, ogSize } from "@/lib/og-image";

export const runtime = "edge";
export const alt = "About the Watauga County Economic Development Commission";
export const size = ogSize;
export const contentType = "image/png";

export default function OGImage() {
  return generateOGImage(
    "About the EDC",
    "Fostering economic growth and opportunity in North Carolina's High Country."
  );
}
