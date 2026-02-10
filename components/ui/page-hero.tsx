import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/container";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageHeroProps {
  title: string;
  subtitle: string;
  badge?: string;
  backgroundImage?: string;
  backgroundAlt?: string;
  breadcrumbs?: BreadcrumbItem[];
}

export function PageHero({ title, subtitle, badge, backgroundImage, backgroundAlt, breadcrumbs }: PageHeroProps) {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://wataugaedc.org";

  const jsonLd = breadcrumbs
    ? {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: breadcrumbs.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.label,
          ...(item.href ? { item: `${baseUrl}${item.href}` } : {}),
        })),
      }
    : null;

  return (
    <section className="relative bg-gradient-to-br from-primary-dark via-primary to-primary/90 pt-32 pb-20">
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      {backgroundImage && (
        <Image
          src={backgroundImage}
          alt={backgroundAlt ?? ""}
          fill
          className="object-cover object-top"
          sizes="100vw"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/50" />
      <Container className="relative">
        {breadcrumbs && (
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-sm text-white/70">
              {breadcrumbs.map((item, index) => (
                <li key={item.label} className="flex items-center gap-2">
                  {index > 0 && (
                    <svg
                      className="h-3.5 w-3.5 text-white/40"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                  )}
                  {item.href ? (
                    <Link href={item.href} className="transition-colors hover:text-white">
                      {item.label}
                    </Link>
                  ) : (
                    <span className="text-white/90">{item.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}
        <div className="text-center">
          {badge && (
            <span className="mb-4 inline-block rounded-full bg-white/15 px-4 py-1.5 text-sm font-medium text-white/90">
              {badge}
            </span>
          )}
          <h1 className="font-display text-3xl font-bold text-white sm:text-4xl md:text-5xl">
            {title}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80">{subtitle}</p>
        </div>
      </Container>
    </section>
  );
}
