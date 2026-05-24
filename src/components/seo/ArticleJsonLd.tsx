/**
 * ArticleJsonLd — server component that emits an Article schema.
 *
 * Designed for future blog/insight posts. Pass core metadata; authorName
 * defaults to "APEX Revenue Operations" if omitted.
 */

const SITE_URL = "https://apex.texasserviceexperts.com";

export type ArticleJsonLdProps = {
  headline: string;
  description: string;
  /** Canonical URL or path of the article. */
  url: string;
  /** ISO 8601 string, e.g. "2026-05-24T10:00:00Z". */
  datePublished: string;
  dateModified?: string;
  /** Absolute or relative image URL. */
  image?: string;
  authorName?: string;
  /** Optional article section / category for taxonomy. */
  articleSection?: string;
};

function toAbsolute(url: string): string {
  if (/^https?:\/\//i.test(url)) return url;
  const path = url.startsWith("/") ? url : `/${url}`;
  return `${SITE_URL}${path}`;
}

export function ArticleJsonLd({
  headline,
  description,
  url,
  datePublished,
  dateModified,
  image,
  authorName = "APEX Revenue Operations",
  articleSection,
}: ArticleJsonLdProps) {
  const absoluteUrl = toAbsolute(url);

  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    description,
    url: absoluteUrl,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": absoluteUrl,
    },
    datePublished,
    dateModified: dateModified ?? datePublished,
    author: {
      "@type": "Organization",
      name: authorName,
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "APEX Revenue Operations",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/brand/apex-logo.svg`,
      },
    },
  };

  if (image) {
    schema.image = toAbsolute(image);
  }

  if (articleSection) {
    schema.articleSection = articleSection;
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
