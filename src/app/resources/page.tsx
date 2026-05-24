import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import {
  RESOURCES,
  RESOURCE_CATEGORIES,
} from "@/lib/resources-data";
import { ResourceFilters } from "@/components/resources-page/ResourceFilters";

export const metadata: Metadata = {
  title: "Resources — Operator-Written Guides, Playbooks & Calculators",
  description:
    "Operator-written content for construction owners: real numbers, real tactics, no marketing fluff. Speed-to-lead math, no-show audits, revenue-leak calculator, and field-tested playbooks.",
  alternates: { canonical: "/resources" },
};

export default function ResourcesHubPage() {
  return (
    <>
      {/* ─────────────── Hero ─────────────── */}
      <section className="relative isolate overflow-hidden bg-hero-spine pt-32 pb-16 md:pt-44 md:pb-24">
        <div aria-hidden className="absolute inset-0 bg-grid pointer-events-none" />
        <div
          aria-hidden
          className="absolute inset-x-0 top-1/3 h-96 bg-glow-spot opacity-40 pointer-events-none"
        />
        <div className="relative container-wide">
          <Reveal>
            <SectionLabel number="01">Resources</SectionLabel>
            <h1 className="mt-5 font-display text-4xl sm:text-6xl md:text-[80px] leading-[0.98] tracking-[-0.035em] max-w-5xl">
              Operator-written.{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    "linear-gradient(120deg, #3FA0FF 0%, #1E5FD8 55%, #D9E6FF 100%)",
                }}
              >
                Not marketed.
              </span>
            </h1>
          </Reveal>
          <Reveal delay={120}>
            <p className="mt-6 md:mt-8 max-w-3xl text-base md:text-xl text-[var(--color-ink-secondary)] leading-relaxed">
              Field-tested guides, audit playbooks, and diagnostic calculators
              for construction owners who want the real math — not a 600-word
              listicle padded with stock photos.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ─────────────── Listing ─────────────── */}
      <section className="relative py-16 md:py-24">
        <div className="container-app">
          <ResourceFilters
            allResources={RESOURCES}
            categories={RESOURCE_CATEGORIES}
          />
        </div>
      </section>

      {/* ─────────────── Quiet CTA ─────────────── */}
      <section className="relative pt-4 pb-24 md:pb-40">
        <div className="container-app">
          <div className="rounded-3xl border border-[var(--color-border-subtle)] bg-[var(--color-bg-elevated)]/60 backdrop-blur-md p-8 md:p-12 flex flex-col md:flex-row gap-6 md:items-center md:justify-between">
            <div>
              <div className="eyebrow text-[var(--color-ink-tertiary)]">
                Want the diagnostic call instead?
              </div>
              <h2 className="mt-2 font-display text-2xl md:text-3xl tracking-tight">
                We&rsquo;ll run the leak audit on your business in 30 minutes.
              </h2>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center h-12 px-6 rounded-xl bg-[var(--color-brand-blue)] hover:bg-[var(--color-brand-bright)] text-white font-semibold transition-all hover:shadow-[0_0_28px_rgba(63,160,255,0.45)] whitespace-nowrap"
            >
              Book the call →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

