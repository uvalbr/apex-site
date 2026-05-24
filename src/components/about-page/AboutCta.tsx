"use client";

import { Reveal } from "@/components/ui/Reveal";

export function AboutCta() {
  return (
    <section className="relative py-24 md:py-32 border-t border-[var(--color-border-subtle)] overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(30, 95, 216, 0.22), transparent 70%)",
        }}
      />
      <div className="relative container-app">
        <Reveal>
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl tracking-[-0.035em] leading-[1.0]">
              Want to see if it fits?
            </h2>
            <p className="mt-6 text-base md:text-lg text-[var(--color-ink-secondary)] max-w-2xl mx-auto leading-relaxed">
              30-minute diagnostic call. We audit your funnel against your real CRM data and tell
              you whether APEX is the right call — or whether you should fix something internally
              before adding outsourced ops.
            </p>
            <div className="mt-9 flex flex-wrap gap-3 justify-center">
              <a
                href="/contact"
                className="inline-flex items-center justify-center gap-2 h-14 px-7 rounded-xl bg-[var(--color-brand-blue)] hover:bg-[var(--color-brand-bright)] text-white font-semibold transition-all hover:shadow-[0_0_32px_rgba(63,160,255,0.5)]"
              >
                Book a diagnostic call →
              </a>
              <a
                href="/pricing"
                className="inline-flex items-center justify-center gap-2 h-14 px-7 rounded-xl border border-[var(--color-border-strong)] hover:border-[var(--color-brand-bright)] hover:bg-[var(--color-bg-elevated)] text-[var(--color-ink-primary)] font-semibold transition-colors"
              >
                See pricing
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
