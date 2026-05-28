/**
 * JsonLd — server component that renders structured-data <script> tags.
 *
 * Currently emits:
 *   1. Organization schema for APEX Revenue Operations
 *   2. Service schema describing the Revenue Operations Infrastructure offering
 *
 * Dropped into app/layout.tsx so every page inherits the org-level signals.
 */

const SITE_URL = "https://apexrevenueoperations.com";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "APEX Revenue Operations",
  alternateName: "APEX",
  url: SITE_URL,
  logo: `${SITE_URL}/brand/apex-logo.svg`,
  description:
    "Outsourced revenue operations infrastructure for U.S. construction companies. Faster speed-to-lead, higher appointment conversion, lower no-shows, scalable revenue.",
  slogan: "Built to Convert. Driven to Scale.",
  sameAs: [
    "https://www.linkedin.com/company/apex-revenue-operations",
    "https://texasserviceexperts.com",
  ],
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "sales",
      email: "hello@apexrevenueoperations.com",
      areaServed: "US",
      availableLanguage: ["English", "Spanish"],
    },
  ],
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Revenue Operations Infrastructure",
  name: "APEX Revenue Operations",
  description:
    "Dedicated outsourced revenue operations: inbound response, outbound reactivation, appointment confirmation, CRM management, and KPI oversight for construction companies.",
  provider: {
    "@type": "Organization",
    name: "APEX Revenue Operations",
    url: SITE_URL,
  },
  areaServed: {
    "@type": "Country",
    name: "United States",
  },
  audience: {
    "@type": "BusinessAudience",
    audienceType:
      "U.S. construction companies — roofing, HVAC, remodeling, pool, and general contractors",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Engagement tiers",
    itemListElement: [
      {
        "@type": "Offer",
        name: "Pilot Deployment",
        description: "60-day proof program",
        priceCurrency: "USD",
        price: "8500",
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          unitCode: "MON",
          price: "8500",
          priceCurrency: "USD",
        },
      },
      {
        "@type": "Offer",
        name: "Growth Revenue Team",
        description: "Dedicated revenue ops department",
        priceCurrency: "USD",
        price: "15000",
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          unitCode: "MON",
          price: "15000",
          priceCurrency: "USD",
        },
      },
      {
        "@type": "Offer",
        name: "Expansion Revenue Department",
        description: "Multi-channel revenue engine",
        priceCurrency: "USD",
        price: "20000",
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          unitCode: "MON",
          price: "20000",
          priceCurrency: "USD",
        },
      },
      {
        "@type": "Offer",
        name: "Enterprise Revenue Division",
        description: "Full scale, multi-market",
        priceCurrency: "USD",
        price: "25000",
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          unitCode: "MON",
          price: "25000",
          priceCurrency: "USD",
        },
      },
    ],
  },
};

export function JsonLd() {
  return (
    <>
      <script
        type="application/ld+json"
        // Stringify with no whitespace — smaller payload, no formatting surprises
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
    </>
  );
}
