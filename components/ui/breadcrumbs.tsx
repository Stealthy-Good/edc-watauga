import Link from "next/link";
import { Container } from "@/components/ui/container";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://wataugaedc.org";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      ...(item.href ? { item: `${baseUrl}${item.href}` } : {}),
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav aria-label="Breadcrumb" className="bg-surface-muted border-b border-border-light">
        <Container className="py-3">
          <ol className="flex items-center gap-2 text-sm text-text-muted">
            {items.map((item, index) => (
              <li key={item.label} className="flex items-center gap-2">
                {index > 0 && (
                  <svg
                    className="h-3.5 w-3.5 text-text-muted/50"
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
                  <Link
                    href={item.href}
                    className="transition-colors hover:text-primary"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span className="text-text-secondary">{item.label}</span>
                )}
              </li>
            ))}
          </ol>
        </Container>
      </nav>
    </>
  );
}
