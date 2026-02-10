import { siteConfig } from "@/lib/content/site-config";

export function OrganizationJsonLd() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteConfig.url}/#organization`,
        name: siteConfig.fullName,
        url: siteConfig.url,
        description: siteConfig.description,
        address: {
          "@type": "PostalAddress",
          streetAddress: siteConfig.contact.address,
          addressLocality: siteConfig.contact.city,
          addressRegion: siteConfig.contact.state,
          postalCode: siteConfig.contact.zip,
          addressCountry: "US",
        },
        contactPoint: {
          "@type": "ContactPoint",
          telephone: siteConfig.contact.phone,
          email: siteConfig.contact.email,
          contactType: "customer service",
          availableLanguage: "English",
        },
        sameAs: Object.values(siteConfig.social),
      },
      {
        "@type": "GovernmentOffice",
        "@id": `${siteConfig.url}/#localbusiness`,
        name: siteConfig.fullName,
        url: siteConfig.url,
        telephone: siteConfig.contact.phone,
        email: siteConfig.contact.email,
        address: {
          "@type": "PostalAddress",
          streetAddress: siteConfig.contact.address,
          addressLocality: siteConfig.contact.city,
          addressRegion: siteConfig.contact.state,
          postalCode: siteConfig.contact.zip,
          addressCountry: "US",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: 36.2168,
          longitude: -81.6746,
        },
        openingHoursSpecification: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "08:30",
          closes: "17:00",
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
