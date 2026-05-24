"use client";

import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";

const SIGNALS = [
  {
    label: "Operational coverage",
    value: "M–F · 9–7 EST",
    body: "Standard operating hours match U.S. business hours. Extended hours (7am–9pm EST, weekends) available on Expansion and Enterprise tiers.",
  },
  {
    label: "Service area",
    value: "All 50 U.S. states",
    body: "We work with construction operators across the continental U.S., Alaska, and Hawaii. No geographic limitations — every market is supported.",
  },
  {
    label: "Compliance & insurance",
    value: "U.S.-aligned",
    body: "TCPA-compliant calling protocols, SOC-aligned data handling, U.S.-equivalent E&O coverage, U.S.-jurisdiction contracts standard.",
  },
  {
    label: "Back-office included",
    value: "HR · Payroll · Legal",
    body: "All employment infrastructure for your agent team is handled by APEX. Zero W-2 management overhead on your side.",
  },
  {
    label: "Tech stack flexibility",
    value: "20+ CRMs supported",
    body: "Native experience with HubSpot, Salesforce, ServiceTitan, JobNimbus, Acculynx, Pipedrive, GoHighLevel, and most major construction CRMs.",
  },
  {
    label: "Scalability",
    value: "Headcount ±3 per cycle",
    body: "Add or reduce headcount on 30-day notice. Standard agent ramp is 10–14 days. Seasonal flex without contract changes on Enterprise tier.",
  },
];

export function TrustSignals() {
  return (
    <section
      id="trust"
      className="relative py-20 md:py-32 border-t border-[var(--color-border-subtle)]"
    >
      <div className="container-app">
        <Reveal>
          <SectionLabel number="07">The infrastructure underneath</SectionLabel>
          <h2 className="mt-4 font-display text-3xl sm:text-5xl md:text-6xl tracking-[-0.035em] max-w-3xl leading-[1.05]">
            Everything you'd build internally.{" "}
            <span className="text-[var(--color-ink-tertiary)]">Already built.</span>
          </h2>
        </Reveal>

        <Reveal delay={120}>
          <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-3">
            {SIGNALS.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl border border-[var(--color-border-subtle)] bg-[var(--color-bg-elevated)]/60 backdrop-blur-md p-6"
              >
                <div className="text-[10px] uppercase tracking-[0.18em] font-semibold text-[var(--color-ink-tertiary)]">
                  {s.label}
                </div>
                <div className="mt-2 font-mono tabular text-lg md:text-xl font-bold text-[var(--color-brand-bright)]">
                  {s.value}
                </div>
                <p className="mt-3 text-sm text-[var(--color-ink-secondary)] leading-relaxed">
                  {s.body}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
