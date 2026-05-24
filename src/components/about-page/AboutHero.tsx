"use client";

import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function AboutHero() {
  return (
    <section className="relative pt-32 md:pt-44 pb-16 md:pb-24 overflow-hidden">
      <div aria-hidden className="absolute inset-0 bg-hero-spine opacity-90" />
      <div aria-hidden className="absolute inset-0 bg-grid opacity-40" />
      <div className="relative container-app">
        <Reveal>
          <SectionLabel number="01">About APEX</SectionLabel>
          <h1 className="mt-5 font-display text-5xl sm:text-6xl md:text-8xl tracking-[-0.035em] leading-[0.98] max-w-5xl">
            We are not a call center.{" "}
            <span className="text-[var(--color-ink-tertiary)]">
              We are the revenue operations department your business should already have.
            </span>
          </h1>
        </Reveal>
        <Reveal delay={160}>
          <p className="mt-8 max-w-3xl text-base md:text-xl text-[var(--color-ink-secondary)] leading-relaxed">
            APEX builds dedicated revenue operations infrastructure for U.S. construction
            companies. We sit between the BPOs that treat your business like a queue and the
            in-house hiring you don't have the bandwidth for. Built from Panama. Operating on EST.
            Aligned with how your customers actually buy.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
