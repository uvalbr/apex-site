/**
 * FaqJsonLd — server component that emits a FAQPage schema.
 *
 * Pass an array of { question, answer } objects. The component renders
 * a single <script type="application/ld+json"> with the FAQPage structured data,
 * stringified with no whitespace to keep payload tight.
 *
 * Used on:
 *   - homepage (wrapping the marketing FAQ via a small client → server bridge)
 *   - each /industries/[slug] page (vertical-specific FAQs)
 */

export type FaqItem = {
  question: string;
  answer: string;
};

export function FaqJsonLd({ items }: { items: FaqItem[] }) {
  if (!items || items.length === 0) return null;

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
