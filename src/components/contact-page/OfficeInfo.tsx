"use client";

import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function OfficeInfo() {
  return (
    <section className="relative py-20 md:py-28 border-t border-[var(--color-border-subtle)]">
      <div className="container-app">
        <Reveal>
          <SectionLabel number="04">Where we operate</SectionLabel>
          <h2 className="mt-4 font-display text-3xl sm:text-5xl md:text-6xl tracking-[-0.035em] max-w-3xl leading-[1.05]">
            Panama City HQ.{" "}
            <span className="text-[var(--color-ink-tertiary)]">Continental U.S. service area.</span>
          </h2>
        </Reveal>

        <Reveal delay={140}>
          <div className="mt-12 grid md:grid-cols-2 gap-4">
            <InfoCard
              eyebrow="Headquarters"
              title="Panama City, Panama"
              lines={[
                "Operating on Eastern Standard Time, year-round (no DST)",
                "Standard hours: Monday–Friday, 9:00am – 7:00pm EST",
                "Extended hours: 7:00am – 9:00pm EST + weekend coverage available",
              ]}
              footer="USD-denominated · U.S.-jurisdiction contracts standard"
            />
            <InfoCard
              eyebrow="Service area"
              title="All 50 U.S. states"
              lines={[
                "Active engagements across the Sun Belt, Midwest, Northeast, and West Coast",
                "Industry concentration: roofing, HVAC, solar, pool construction, custom builds",
                "Multi-market and multi-brand operators supported on Expansion + Enterprise tiers",
              ]}
              footer="No geographic limits · Multi-state, multi-brand structures supported"
            />
          </div>
        </Reveal>

        <Reveal delay={240}>
          <div className="mt-6 grid md:grid-cols-3 gap-3">
            <ContactTile
              label="General inquiries"
              value="hello@apexrevenueoperations.com"
              href="mailto:hello@apexrevenueoperations.com"
            />
            <ContactTile
              label="Partnerships"
              value="partners@apexrevenueoperations.com"
              href="mailto:partners@apexrevenueoperations.com"
            />
            <ContactTile
              label="Press / media"
              value="press@apexrevenueoperations.com"
              href="mailto:press@apexrevenueoperations.com"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function InfoCard({
  eyebrow,
  title,
  lines,
  footer,
}: {
  eyebrow: string;
  title: string;
  lines: string[];
  footer: string;
}) {
  return (
    <div className="rounded-3xl border border-[var(--color-border-subtle)] bg-[var(--color-bg-elevated)]/60 backdrop-blur-md p-7 md:p-9">
      <div className="eyebrow mb-3">{eyebrow}</div>
      <h3 className="font-display text-2xl md:text-3xl tracking-tight text-[var(--color-ink-primary)]">
        {title}
      </h3>
      <ul className="mt-5 space-y-2.5">
        {lines.map((line) => (
          <li key={line} className="flex items-start gap-2.5 text-sm text-[var(--color-ink-secondary)] leading-relaxed">
            <span className="mt-2 w-1 h-1 rounded-full bg-[var(--color-brand-bright)] flex-shrink-0" />
            <span>{line}</span>
          </li>
        ))}
      </ul>
      <div className="mt-6 pt-5 border-t border-[var(--color-border-subtle)]">
        <span className="font-mono tabular text-[11px] text-[var(--color-ink-tertiary)] uppercase tracking-wider">
          {footer}
        </span>
      </div>
    </div>
  );
}

function ContactTile({ label, value, href }: { label: string; value: string; href: string }) {
  return (
    <a
      href={href}
      className="block rounded-2xl border border-[var(--color-border-subtle)] bg-[var(--color-bg-elevated)]/40 hover:border-[var(--color-brand-blue)]/60 hover:bg-[var(--color-bg-elevated)]/70 transition-colors p-5 group"
    >
      <div className="text-[10px] uppercase tracking-[0.18em] font-semibold text-[var(--color-ink-tertiary)]">
        {label}
      </div>
      <div className="mt-2 text-sm font-semibold text-[var(--color-brand-bright)] group-hover:underline break-all">
        {value}
      </div>
    </a>
  );
}
