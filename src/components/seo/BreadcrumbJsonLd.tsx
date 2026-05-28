/**
 * BreadcrumbJsonLd — server component that emits a BreadcrumbList schema.
 *
 * Pass an ordered array of crumbs (root first, current page last). The
 * component absolute-resolves relative URLs against the canonical host.
 */

const SITE_URL = "https://apexrevenueoperations.com";

export type BreadcrumbItem = {
  name: string;
  /** Absolute URL or path (relative paths resolved against the canonical host). */
  url: string;
};

function toAbsolute(url: string): string {
  if (/^https?:\/\//i.test(url)) return url;
  const path = url.startsWith("/") ? url : `/${url}`;
  return `${SITE_URL}${path}`;
}

export function BreadcrumbJsonLd({ items }: { items: BreadcrumbItem[] }) {
  if (!items || items.length === 0) return null;

  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: toAbsolute(item.url),
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
