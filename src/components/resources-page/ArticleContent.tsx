import type { ArticleSection } from "@/lib/resources-data";

const PULLQUOTE_PREFIX = "PULLQUOTE::";

export function ArticleContent({ sections }: { sections: ArticleSection[] }) {
  return (
    <article className="max-w-2xl">
      {sections.map((s, i) => (
        <section
          key={s.id}
          id={s.id}
          className={i === 0 ? "scroll-mt-32" : "scroll-mt-32 mt-14 md:mt-20"}
        >
          <h2 className="font-display text-2xl md:text-[34px] leading-[1.15] tracking-[-0.025em] text-[var(--color-ink-primary)]">
            {s.heading}
          </h2>
          <div className="mt-5 space-y-5">
            {s.paragraphs.map((p, j) => {
              if (p.startsWith(PULLQUOTE_PREFIX)) {
                const body = p.slice(PULLQUOTE_PREFIX.length).trim();
                return (
                  <blockquote
                    key={j}
                    className="my-8 border-l-2 border-[var(--color-brand-bright)] pl-5 md:pl-6 py-2 italic font-display text-xl md:text-2xl leading-snug tracking-[-0.015em] text-[var(--color-brand-pale)]"
                  >
                    &ldquo;{body}&rdquo;
                  </blockquote>
                );
              }
              return (
                <p
                  key={j}
                  className="text-base md:text-[17px] leading-[1.75] text-[var(--color-ink-secondary)]"
                >
                  {p}
                </p>
              );
            })}
          </div>
        </section>
      ))}
    </article>
  );
}
