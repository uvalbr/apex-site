"use client";

import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function ContactHero() {
  return (
    <section className="relative pt-32 md:pt-44 pb-16 md:pb-20 overflow-hidden">
      <div aria-hidden className="absolute inset-0 bg-hero-spine opacity-90" />
      <div aria-hidden className="absolute inset-0 bg-grid opacity-40" />
      <div className="relative container-app">
        <Reveal>
          <SectionLabel number="01">Contact</SectionLabel>
          <h1 className="mt-5 font-display text-5xl sm:text-6xl md:text-8xl tracking-[-0.035em] leading-[0.98] max-w-5xl">
            Let's talk.{" "}
            <span className="text-[var(--color-ink-tertiary)]">
              30 minutes. Real diagnostic. No pitch deck.
            </span>
          </h1>
        </Reveal>
        <Reveal delay={140}>
          <p className="mt-7 max-w-2xl text-base md:text-xl text-[var(--color-ink-secondary)] leading-relaxed">
            We respond to every diagnostic request within{" "}
            <span className="text-[var(--color-brand-bright)] font-semibold">one business hour</span>{" "}
            during our EST operating window. If you're outside hours, expect a reply by 10:30am EST
            the next business day.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
