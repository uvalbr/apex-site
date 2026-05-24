/**
 * ServiceJsonLd — server component that emits a Service schema.
 *
 * Use on a service-specific page to declare a single Service with provider
 * and optional Offer. Distinct from the org-wide service schema in JsonLd.tsx;
 * this one is meant to be wired into individual service detail routes.
 */

const SITE_URL = "https://apex.texasserviceexperts.com";

export type ServiceOffer = {
  name: string;
  description?: string;
  price?: string | number;
  priceCurrency?: string; // default "USD"
  unitCode?: string; // e.g. "MON"
};

export type ServiceJsonLdProps = {
  name: string;
  serviceType: string;
  description: string;
  url?: string; // canonical URL of the service page
  areaServed?: string; // default "United States"
  audience?: string; // free-form description
  offers?: ServiceOffer[];
};

export function ServiceJsonLd({
  name,
  serviceType,
  description,
  url,
  areaServed = "United States",
  audience,
  offers,
}: ServiceJsonLdProps) {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    serviceType,
    description,
    provider: {
      "@type": "Organization",
      name: "APEX Revenue Operations",
      url: SITE_URL,
    },
    areaServed: {
      "@type": "Country",
      name: areaServed,
    },
  };

  if (url) {
    schema.url = url;
  }

  if (audience) {
    schema.audience = {
      "@type": "BusinessAudience",
      audienceType: audience,
    };
  }

  if (offers && offers.length > 0) {
    schema.hasOfferCatalog = {
      "@type": "OfferCatalog",
      name: `${name} — engagement options`,
      itemListElement: offers.map((o) => {
        const currency = o.priceCurrency ?? "USD";
        const offer: Record<string, unknown> = {
          "@type": "Offer",
          name: o.name,
        };
        if (o.description) offer.description = o.description;
        if (o.price !== undefined) {
          offer.price = String(o.price);
          offer.priceCurrency = currency;
          if (o.unitCode) {
            offer.priceSpecification = {
              "@type": "UnitPriceSpecification",
              unitCode: o.unitCode,
              price: String(o.price),
              priceCurrency: currency,
            };
          }
        }
        return offer;
      }),
    };
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
