"use client";

import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function PricingHero() {
  return (
    <section className="relative pt-32 md:pt-44 pb-16 md:pb-24 overflow-hidden">
      <div aria-hidden className="absolute inset-0 bg-hero-spine opacity-90" />
      <div aria-hidden className="absolute inset-0 bg-grid opacity-40" />
      <div className="relative container-app">
        <Reveal>
          <SectionLabel number="01">Pricing</SectionLabel>
          <h1 className="mt-5 font-display text-5xl sm:text-6xl md:text-8xl tracking-[-0.035em] leading-[0.98] max-w-5xl">
            Four tiers.{" "}
            <span className="text-[var(--color-ink-tertiary)]">One transparent math.</span>
          </h1>
        </Reveal>
        <Reveal delay={140}>
          <p className="mt-7 max-w-2xl text-base md:text-xl text-[var(--color-ink-secondary)] leading-relaxed">
            Fixed monthly base. Per-appointment performance fee. Revenue share on closed deals.
            No retainers without deliverables. No long-term lock-ins. No setup fees.
          </p>
        </Reveal>
        <Reveal delay={240}>
          <div className="mt-10 flex flex-wrap items-center gap-3 text-xs font-mono tabular text-[var(--color-ink-tertiary)]">
            <span className="px-3 py-1.5 rounded-full border border-[var(--color-border-subtle)] bg-[var(--color-bg-elevated)]/60">
              60-day pilot available
            </span>
            <span className="px-3 py-1.5 rounded-full border border-[var(--color-border-subtle)] bg-[var(--color-bg-elevated)]/60">
              Month-to-month after pilot
            </span>
            <span className="px-3 py-1.5 rounded-full border border-[var(--color-border-subtle)] bg-[var(--color-bg-elevated)]/60">
              No setup fee
            </span>
            <span className="px-3 py-1.5 rounded-full border border-[var(--color-border-subtle)] bg-[var(--color-bg-elevated)]/60">
              USD · billed monthly
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
