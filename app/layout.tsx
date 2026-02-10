import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { AnalyticsProvider } from "@/components/features/ga4/analytics-provider";
import { OrganizationJsonLd } from "@/components/features/seo/json-ld";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: "Watauga County Economic Development | Where Mountains Meet Innovation",
    template: "%s | Watauga County EDC",
  },
  description:
    "Discover economic opportunities in Watauga County, NC. Home to Appalachian State University, the Blue Ridge Mountains, and a thriving community where innovation meets mountain living.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? "https://wataugaedc.org"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Watauga County Economic Development Commission",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <body>
        <a href="#main-content" className="skip-to-content">
          Skip to content
        </a>
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
        <OrganizationJsonLd />
        <AnalyticsProvider />
      </body>
    </html>
  );
}
