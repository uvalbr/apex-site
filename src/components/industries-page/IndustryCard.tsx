"use client";

import Link from "next/link";
import { IndustryIcon } from "./IndustryIcon";
import type { Industry } from "@/lib/industries-data";

type Props = {
  industry: Industry;
};

export function IndustryCard({ industry }: Props) {
  return (
    <Link
      href={`/industries/${industry.slug}`}
      className="group relative block rounded-2xl border border-[var(--color-border-subtle)] bg-[var(--color-bg-elevated)]/60 backdrop-blur-md p-7 md:p-8 overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:border-[var(--color-brand-blue)] hover:bg-[var(--color-bg-elevated)] hover:shadow-[0_0_40px_-8px_rgba(63,160,255,0.4)]"
    >
      {/* Glow burst on hover */}
      <span
        aria-hidden
        className="absolute -top-12 -right-12 w-44 h-44 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(63,160,255,0.22), transparent 65%)",
        }}
      />

      {/* Subtle hairline at top */}
      <span
        aria-hidden
        className="absolute inset-x-7 top-0 h-px bg-gradient-to-r from-transparent via-[var(--color-brand-bright)]/40 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
      />

      <div className="relative">
        <div className="flex items-start justify-between">
          <span className="text-[var(--color-brand-bright)] transition-transform duration-500 group-hover:scale-110">
            <IndustryIcon slug={industry.slug} />
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--color-ink-tertiary)] mt-2">
            / {industry.slug.padStart(4, "0").slice(0, 4)}
          </span>
        </div>

        <h3 className="mt-6 font-display text-2xl md:text-3xl text-[var(--color-ink-primary)] tracking-[-0.03em]">
          {industry.label}
        </h3>

        <p className="mt-3 text-sm md:text-base text-[var(--color-ink-secondary)] leading-relaxed">
          {industry.tagline}
        </p>

        <div className="mt-6 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-[0.22em] text-[var(--color-ink-tertiary)] font-semibold">
              {industry.hubCardStat.label}
            </span>
            <span className="font-mono tabular text-lg font-bold text-[var(--color-brand-bright)] mt-0.5">
              {industry.hubCardStat.value}
            </span>
          </div>

          <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--color-brand-bright)] group-hover:gap-2.5 transition-all duration-300">
            View {industry.shortLabel.toLowerCase()}
            <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </span>
        </div>
      </div>
    </Link>
  );
}
