"use client";

import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";

export function ServicesCta() {
  return (
    <section className="relative py-24 md:py-36 overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(30,95,216,0.22), transparent 65%)",
        }}
      />
      <div aria-hidden className="absolute inset-0 bg-grid opacity-40" />

      <div className="relative container-app">
        <Reveal>
          <div className="max-w-4xl">
            <div className="flex items-center gap-3">
              <span className="w-8 h-px bg-[var(--color-brand-bright)]" />
              <span className="eyebrow">Next step</span>
            </div>
            <h2 className="mt-5 font-display text-3xl sm:text-5xl md:text-6xl tracking-[-0.035em] leading-[1.02]">
              Want to see this running on{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    "linear-gradient(120deg, #3FA0FF 0%, #1E5FD8 50%, #D9E6FF 100%)",
                }}
              >
                your business?
              </span>
            </h2>
            <p className="mt-5 max-w-2xl text-base md:text-lg text-[var(--color-ink-secondary)] leading-relaxed">
              30 minutes. We audit your current lead flow, identify the three biggest revenue leaks, and tell you whether APEX is the right call — or whether you should just fix it internally.
            </p>
          </div>
        </Reveal>

        <Reveal delay={140}>
          <div className="mt-10 grid md:grid-cols-3 gap-3 max-w-4xl">
            <Stat label="Diagnostic duration" value="30 min" />
            <Stat label="Average response" value="< 1 hr" />
            <Stat label="Cost to find out" value="$0" accent />
          </div>
        </Reveal>

        <Reveal delay={220}>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href="/#contact"
              className="group inline-flex items-center gap-2 h-14 px-7 rounded-xl bg-[var(--color-brand-blue)] text-white font-semibold transition-all hover:bg-[var(--color-brand-bright)] hover:shadow-[0_0_32px_rgba(63,160,255,0.55)]"
            >
              Book a diagnostic
              <span
                aria-hidden
                className="transition-transform duration-300 ease-out group-hover:translate-x-1"
              >
                →
              </span>
            </Link>
            <Link
              href="/#simulator"
              className="inline-flex items-center gap-2 h-14 px-7 rounded-xl bg-transparent border border-[var(--color-border-strong)] text-[var(--color-ink-primary)] font-semibold hover:bg-[var(--color-bg-elevated)] hover:border-[var(--color-brand-blue)] transition-all"
            >
              Run the revenue simulator first
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Stat({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="rounded-2xl border border-[var(--color-border-subtle)] bg-[var(--color-bg-elevated)]/40 backdrop-blur-md p-5">
      <div
        className={`font-mono tabular text-2xl md:text-3xl font-bold leading-none ${
          accent ? "text-[var(--color-brand-bright)]" : "text-[var(--color-ink-primary)]"
        }`}
      >
        {value}
      </div>
      <div className="mt-2 text-[10px] uppercase tracking-[0.22em] font-semibold text-[var(--color-ink-tertiary)]">
        {label}
      </div>
    </div>
  );
}
