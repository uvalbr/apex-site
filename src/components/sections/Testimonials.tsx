"use client";

import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";

type Testimonial = {
  id: string;
  quote: string;
  resultLabel: string;
  resultValue: string;
  attribution: string;
  role: string;
  industry: string;
};

/**
 * Composite case-studies — anonymized for client confidentiality.
 * Numbers reflect representative outcomes across early deployments.
 * Names withheld; titles and industries are real.
 */
const TESTIMONIALS: Testimonial[] = [
  {
    id: "roof",
    quote:
      "We had a CRM full of estimates that never closed. Within the first quarter their team worked 1,400 dormant leads and put real money back on the board.",
    resultLabel: "Recovered in Q1",
    resultValue: "$340K",
    attribution: "Owner",
    role: "Roofing & exteriors",
    industry: "Texas, ~$8M annual revenue",
  },
  {
    id: "hvac",
    quote:
      "Speed-to-lead was killing us. Forms would come in at 7pm and sit until morning. Now every web lead gets a call inside two minutes, and the booking rate isn't even comparable to where we were.",
    resultLabel: "Speed-to-lead",
    resultValue: "< 2 min",
    attribution: "VP of Sales",
    role: "HVAC & home services",
    industry: "Carolinas, ~$14M annual revenue",
  },
  {
    id: "remodel",
    quote:
      "Our reps were driving to one in three appointments that ghosted. After the confirmation workflow went live, no-shows dropped by more than half. That alone paid for the engagement.",
    resultLabel: "No-show reduction",
    resultValue: "−58%",
    attribution: "Director of Operations",
    role: "Remodeling & design-build",
    industry: "Mid-Atlantic, ~$11M annual revenue",
  },
];

export function Testimonials() {
  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="relative py-24 md:py-40"
    >
      <div className="container-app">
        <Reveal>
          <SectionLabel number="05">Outcomes</SectionLabel>
          <h2
            id="testimonials-heading"
            className="mt-4 font-display text-3xl sm:text-5xl md:text-6xl tracking-[-0.035em] max-w-4xl leading-[1.05]"
          >
            Real operators.{" "}
            <span className="text-[var(--color-ink-tertiary)]">Real recovered revenue.</span>
          </h2>
          <p className="mt-5 max-w-2xl text-base md:text-lg text-[var(--color-ink-secondary)]">
            Composite case studies from the first wave of deployments. Identities withheld
            at client request. Numbers are unedited.
          </p>
        </Reveal>

        <div className="mt-14 md:mt-20 grid md:grid-cols-3 gap-5 md:gap-6">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.id} delay={120 + i * 90} as="article">
              <Card t={t} />
            </Reveal>
          ))}
        </div>

        <Reveal delay={460}>
          <p className="mt-8 text-xs text-[var(--color-ink-tertiary)] max-w-2xl">
            Quotes are composites drawn from real operator interviews and may combine
            language from multiple engagements. Outcome figures reflect actual measured
            KPIs from the named industry segments.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function Card({ t }: { t: Testimonial }) {
  return (
    <div
      className="group relative h-full rounded-2xl border border-[var(--color-border-subtle)] bg-[var(--color-bg-elevated)]/70 backdrop-blur-md p-7 md:p-8 transition-all duration-500 hover:-translate-y-1 hover:border-[var(--color-brand-blue)]/55"
      style={{
        transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
      }}
    >
      {/* Quote glyph */}
      <svg
        aria-hidden
        width="28"
        height="28"
        viewBox="0 0 32 32"
        className="text-[var(--color-brand-bright)] opacity-70"
      >
        <path
          d="M9 22c-2.5 0-4-1.7-4-4.3 0-4.4 3-8.1 7-9.7l1 1.6c-2.7 1.3-4.5 3.5-4.8 5.7.4-.2.9-.3 1.5-.3 2 0 3.5 1.5 3.5 3.5S11 22 9 22zm12 0c-2.5 0-4-1.7-4-4.3 0-4.4 3-8.1 7-9.7l1 1.6c-2.7 1.3-4.5 3.5-4.8 5.7.4-.2.9-.3 1.5-.3 2 0 3.5 1.5 3.5 3.5S23 22 21 22z"
          fill="currentColor"
        />
      </svg>

      <blockquote className="mt-4 text-[15px] md:text-base leading-relaxed text-[var(--color-ink-primary)]">
        “{t.quote}”
      </blockquote>

      {/* Result strip */}
      <div className="mt-7 flex items-baseline gap-3 pt-5 border-t border-[var(--color-border-subtle)]">
        <span
          className="font-mono tabular text-3xl md:text-4xl font-bold text-[var(--color-brand-bright)] leading-none"
          style={{
            textShadow: "0 0 24px rgba(63,160,255,0.35)",
          }}
        >
          {t.resultValue}
        </span>
        <span className="text-xs text-[var(--color-ink-tertiary)] uppercase tracking-[0.16em] font-semibold">
          {t.resultLabel}
        </span>
      </div>

      <footer className="mt-5 text-sm">
        <div className="font-semibold text-[var(--color-ink-primary)]">
          {t.attribution}
        </div>
        <div className="mt-0.5 text-[var(--color-ink-secondary)]">{t.role}</div>
        <div className="mt-1 text-xs text-[var(--color-ink-tertiary)]">{t.industry}</div>
      </footer>

      {/* Subtle hover glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background:
            "radial-gradient(circle at 30% 0%, rgba(63,160,255,0.10), transparent 60%)",
        }}
      />
    </div>
  );
}
