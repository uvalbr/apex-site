import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import {
  RESOURCES,
  type Resource,
} from "@/lib/resources-data";

export function RelatedResources({
  currentSlug,
  relatedSlugs,
}: {
  currentSlug: string;
  relatedSlugs?: string[];
}) {
  // Build the related list: prefer explicit slugs, fall back to "other 3"
  let related: Resource[] = [];
  if (relatedSlugs && relatedSlugs.length > 0) {
    related = relatedSlugs
      .map((s) => RESOURCES.find((r) => r.slug === s))
      .filter((r): r is Resource => Boolean(r));
  }
  if (related.length === 0) {
    related = RESOURCES.filter((r) => r.slug !== currentSlug).slice(0, 3);
  }

  if (related.length === 0) return null;

  return (
    <section className="relative py-20 md:py-28 border-t border-[var(--color-border-subtle)]">
      <div className="container-app">
        <Reveal>
          <SectionLabel>Keep reading</SectionLabel>
          <h2 className="mt-4 font-display text-2xl md:text-4xl tracking-[-0.025em] max-w-2xl">
            Related resources
          </h2>
        </Reveal>

        <Reveal delay={120}>
          <ul className="mt-10 grid md:grid-cols-3 gap-5">
            {related.map((r) => {
              const href = r.externalAnchor ?? `/resources/${r.slug}`;
              return (
                <li key={r.slug}>
                  <Link
                    href={href}
                    className="block h-full rounded-2xl border border-[var(--color-border-subtle)] bg-[var(--color-bg-elevated)]/70 backdrop-blur-md p-6 transition-all hover:border-[var(--color-brand-blue)]/60 hover:-translate-y-1 hover:shadow-[0_12px_36px_-12px_rgba(63,160,255,0.3)]"
                  >
                    <div className="text-[10px] uppercase tracking-[0.22em] font-semibold text-[var(--color-brand-bright)]">
                      {r.category}
                    </div>
                    <div className="mt-3 font-display text-lg md:text-xl leading-snug tracking-tight text-[var(--color-ink-primary)]">
                      {r.title}
                    </div>
                    <div className="mt-3 text-xs text-[var(--color-ink-tertiary)]">
                      {r.readMinutes} min read
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
