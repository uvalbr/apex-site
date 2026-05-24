"use client";

import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";

const STEPS = [
  {
    n: "01",
    title: "Fixed monthly base",
    body: "Covers your dedicated team, infrastructure, management overhead, training, HR, payroll, and ops support. Predictable. Billed monthly. No surprises.",
    accent: "Base layer",
  },
  {
    n: "02",
    title: "Per-qualified-appointment fee",
    body: "$100–200 per appointment that actually runs and meets your qualification criteria. Verified through your CRM, not ours. Paid monthly in arrears.",
    accent: "Activity layer",
  },
  {
    n: "03",
    title: "Revenue share on closed projects",
    body: "5–10% of project revenue on deals that close from APEX-originated appointments. Capped per-deal at a ceiling negotiated in your contract. Tracked through CRM-attributed close events.",
    accent: "Outcome layer",
  },
];

export function PartnershipModel() {
  return (
    <section
      id="partnership"
      className="relative py-20 md:py-32 border-t border-[var(--color-border-subtle)] overflow-hidden"
    >
      <div aria-hidden className="absolute inset-0 bg-glow-spot opacity-40" />
      <div className="relative container-app">
        <Reveal>
          <SectionLabel number="04">Performance Partnership Program</SectionLabel>
          <h2 className="mt-4 font-display text-3xl sm:text-5xl md:text-6xl tracking-[-0.035em] max-w-4xl leading-[1.05]">
            We get paid when you get paid.{" "}
            <span className="text-[var(--color-ink-tertiary)]">Not before.</span>
          </h2>
          <p className="mt-5 max-w-2xl text-base md:text-lg text-[var(--color-ink-secondary)]">
            Our pricing is structured in three layers. The base covers infrastructure. The
            per-appointment fee covers activity. The revenue share covers outcome. You only pay the
            outcome layer when an APEX-originated lead actually closes.
          </p>
        </Reveal>

        <Reveal delay={140}>
          <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-4">
            {STEPS.map((step) => (
              <div
                key={step.n}
                className="rounded-2xl border border-[var(--color-border-subtle)] bg-[var(--color-bg-elevated)]/60 backdrop-blur-md p-7 hover:border-[var(--color-brand-blue)]/60 transition-colors"
              >
                <div className="flex items-baseline justify-between mb-5">
                  <span className="font-mono tabular text-3xl font-bold text-[var(--color-brand-bright)]">
                    {step.n}
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.18em] font-semibold text-[var(--color-ink-tertiary)]">
                    {step.accent}
                  </span>
                </div>
                <h3 className="font-display text-xl tracking-tight text-[var(--color-ink-primary)]">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm text-[var(--color-ink-secondary)] leading-relaxed">
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={260}>
          <div className="mt-10 rounded-2xl border border-[var(--color-brand-blue)]/30 bg-[var(--color-brand-blue)]/8 p-7 md:p-9">
            <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-6 items-center">
              <div>
                <div className="eyebrow mb-3">Why this structure</div>
                <p className="text-base md:text-lg text-[var(--color-ink-primary)] leading-relaxed">
                  Pure retainer pricing rewards us for showing up. Pure performance pricing makes us
                  cut corners on quality to chase volume. The three-layer model aligns us on the only
                  thing that matters: closed revenue.
                </p>
              </div>
              <div className="flex flex-col gap-2 text-right">
                <span className="text-[10px] uppercase tracking-[0.18em] font-semibold text-[var(--color-ink-tertiary)]">
                  Typical client mix
                </span>
                <span className="font-mono tabular text-xs text-[var(--color-ink-secondary)]">
                  ~60% base · ~25% appointments · ~15% revenue share
                </span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
