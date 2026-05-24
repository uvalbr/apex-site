import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/ui/Reveal";
import { ArticleHero } from "@/components/resources-page/ArticleHero";
import { ArticleContent } from "@/components/resources-page/ArticleContent";
import { Toc } from "@/components/resources-page/Toc";
import { RelatedResources } from "@/components/resources-page/RelatedResources";
import {
  ARTICLE_SLUGS,
  getResourceBySlug,
} from "@/lib/resources-data";

// ──────────────────────────────────────────────────────────────────
// Static generation — required for `output: "export"`
// ──────────────────────────────────────────────────────────────────
export function generateStaticParams() {
  // Only generate pages for resources that have a body (articles).
  // Calculator-type resources link to an external anchor; no [slug] page needed.
  return ARTICLE_SLUGS.map((slug) => ({ slug }));
}

export const dynamicParams = false;

// Per-article metadata
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const resource = getResourceBySlug(slug);
  if (!resource) return {};
  return {
    title: `${resource.title} — APEX Resources`,
    description: resource.dek,
    alternates: { canonical: `/resources/${resource.slug}` },
  };
}

// ──────────────────────────────────────────────────────────────────
// Page
// ──────────────────────────────────────────────────────────────────
export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const resource = getResourceBySlug(slug);
  if (!resource) notFound();
  if (!resource.sections) notFound();

  const tocItems = resource.sections.map((s) => ({
    id: s.id,
    heading: s.heading,
  }));

  return (
    <>
      <ArticleHero resource={resource} />

      {/* ─────────── Body + TOC ─────────── */}
      <section className="relative py-12 md:py-20">
        <div className="container-app">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2.4fr] gap-12 lg:gap-16">
            <Toc items={tocItems} />

            <div>
              <Reveal>
                <ArticleContent sections={resource.sections} />
              </Reveal>

              {/* In-article CTA */}
              <Reveal delay={120}>
                <div className="mt-16 md:mt-20 rounded-3xl border border-[var(--color-brand-blue)]/40 bg-gradient-to-br from-[var(--color-bg-elevated)] to-[var(--color-brand-navy)] p-8 md:p-10 max-w-2xl">
                  <div className="eyebrow text-[var(--color-ink-tertiary)]">
                    Want this run on your business?
                  </div>
                  <h3 className="mt-3 font-display text-2xl md:text-3xl tracking-tight">
                    We&rsquo;ll do the audit on a 30-minute call.
                  </h3>
                  <p className="mt-3 text-sm md:text-base text-[var(--color-ink-secondary)] leading-relaxed">
                    Bring 90 days of CRM data. We&rsquo;ll surface the
                    revenue leak, name the three highest-ROI moves, and tell
                    you whether you should fix it internally or rent the
                    infrastructure from us.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <Link
                      href="/contact"
                      className="inline-flex items-center justify-center h-12 px-6 rounded-xl bg-[var(--color-brand-blue)] hover:bg-[var(--color-brand-bright)] text-white font-semibold transition-all hover:shadow-[0_0_28px_rgba(63,160,255,0.45)]"
                    >
                      Book the call →
                    </Link>
                    <Link
                      href="/pricing"
                      className="inline-flex items-center justify-center h-12 px-6 rounded-xl border border-[var(--color-border-strong)] text-[var(--color-ink-primary)] font-semibold transition-colors hover:bg-[var(--color-bg-elevated)]"
                    >
                      See pricing
                    </Link>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <RelatedResources
        currentSlug={resource.slug}
        relatedSlugs={resource.related}
      />
    </>
  );
}
