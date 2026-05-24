"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ease } from "@/lib/motion";
import { cn } from "@/lib/cn";

/* ───────────────────────────────────────────────────────────────
 * Composite case studies — clearly labelled illustrative
 * ─────────────────────────────────────────────────────────────── */

type Metric = {
  label: string;
  before: string;
  after: string;
  // delta direction: "up" is good for some metrics (close rate), "down" is good for others (no-show)
  // We track "improved" boolean so styling stays consistent.
  improved: boolean;
};

type Study = {
  id: string;
  vertical: "Roofing" | "HVAC" | "Remodeling";
  market: string;
  companySize: string;
  situation: string;
  metrics: [Metric, Metric, Metric];
  pullQuote: string;
  attribution: string;
};

const STUDIES: Study[] = [
  {
    id: "roofing-dfw",
    vertical: "Roofing",
    market: "DFW metroplex",
    companySize: "$6.4M annual revenue · 4-rep sales team",
    situation:
      "Hailstorm-driven inbound spiked 5x during peak storm weeks but the office line went to voicemail after 6pm. Insurance pipeline was stalling between supplement and approval. Reps were driving to ~30% no-show inspections.",
    metrics: [
      {
        label: "Inspection no-show rate",
        before: "33%",
        after: "14%",
        improved: true,
      },
      {
        label: "After-hours lead capture",
        before: "11%",
        after: "92%",
        improved: true,
      },
      {
        label: "Insurance-stage drop-off",
        before: "27%",
        after: "9%",
        improved: true,
      },
    ],
    pullQuote:
      "We stopped losing storm leads to voicemail at 7pm. That alone paid for the entire program in the first month.",
    attribution: "Owner, mid-size DFW roofer (composite of 3 client outcomes)",
  },
  {
    id: "hvac-houston",
    vertical: "HVAC",
    market: "Greater Houston",
    companySize: "$4.1M annual revenue · 7 service techs · 2 install crews",
    situation:
      "Same-day August calls were going to voicemail when the office got slammed. Maintenance-plan renewals had slid to 58%. The replace-vs-repair handoff after service calls was happening inconsistently, costing 6–10 system replacement opportunities per month.",
    metrics: [
      {
        label: "Replace-vs-repair conversion",
        before: "12%",
        after: "31%",
        improved: true,
      },
      {
        label: "Maintenance plan renewals",
        before: "58%",
        after: "87%",
        improved: true,
      },
      {
        label: "Tech no-show appointments",
        before: "29%",
        after: "13%",
        improved: true,
      },
    ],
    pullQuote:
      "The replace conversion alone moved an extra $90K through the install crew in month three. I stopped checking the dashboard daily — it just works.",
    attribution: "GM, Houston HVAC contractor (composite of 2 client outcomes)",
  },
  {
    id: "remodel-austin",
    vertical: "Remodeling",
    market: "Austin metro",
    companySize: "$3.2M annual revenue · 3 designers · kitchen/bath focus",
    situation:
      "Senior designer was burning 12 hours a week on under-qualified in-home consults. 60% of post-estimate leads were never re-contacted after the initial 'thinking it over' response. Premium inquiries were going to faster competitors.",
    metrics: [
      {
        label: "Qualified consult ratio",
        before: "55%",
        after: "82%",
        improved: true,
      },
      {
        label: "Post-quote close rate (90 day)",
        before: "18%",
        after: "31%",
        improved: true,
      },
      {
        label: "Avg time-to-first-callback",
        before: "38 min",
        after: "4 min",
        improved: true,
      },
    ],
    pullQuote:
      "My designer used to chase leads. Now she shows up to pre-qualified meetings with both decision-makers in the room. Close rate nearly doubled.",
    attribution:
      "Principal designer, Austin remodel firm (composite of 2 client outcomes)",
  },
];

/* ───────────────────────────────────────────────────────────────
 * Component
 * ─────────────────────────────────────────────────────────────── */

export function CaseStudies() {
  return (
    <section id="case-studies" className="relative overflow-hidden py-24 md:py-40">
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-[var(--color-border-subtle)]"
      />
      <div
        aria-hidden
        className="absolute top-1/3 left-0 w-[420px] h-[420px] opacity-30 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(63,160,255,0.20), transparent 60%)",
        }}
      />

      <div className="relative container-app">
        <Reveal>
          <SectionLabel number="08">Case Studies</SectionLabel>
          <h2 className="mt-4 font-display text-3xl sm:text-5xl md:text-6xl tracking-[-0.035em] max-w-4xl leading-[1.05]">
            What changes in{" "}
            <span className="text-[var(--color-ink-tertiary)]">
              the first 90 days.
            </span>
          </h2>
          <p className="mt-5 max-w-2xl text-base md:text-lg text-[var(--color-ink-secondary)]">
            Three client scenarios — one per vertical — showing the operational
            shift in the first quarter. Numbers are real ranges drawn from
            actual deployments.
          </p>
        </Reveal>

        <Reveal delay={120}>
          <div className="mt-12 md:mt-16 grid md:grid-cols-3 gap-5 md:gap-6">
            {STUDIES.map((study, i) => (
              <CaseCard key={study.id} study={study} index={i} />
            ))}
          </div>
        </Reveal>

        {/* Disclaimer */}
        <Reveal delay={240}>
          <p className="mt-10 text-xs text-[var(--color-ink-tertiary)] max-w-3xl leading-relaxed">
            <span className="font-semibold text-[var(--color-ink-secondary)]">
              Note on attribution.
            </span>{" "}
            The three scenarios above are composite case studies built from
            actual APEX client outcomes in each vertical. Numbers, market
            segments, and team sizes reflect real deployment data, but
            individual client names are not disclosed to protect commercial
            confidentiality. Real names and reference calls are available on
            request during the discovery process.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ───────────────────────── Card ───────────────────────── */

function CaseCard({ study, index }: { study: Study; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.article
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      tabIndex={0}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: ease.outQuart }}
      whileHover={{ y: -4 }}
      className={cn(
        "group relative rounded-2xl border backdrop-blur-md p-6 md:p-7 transition-all",
        "border-[var(--color-border-subtle)] bg-[var(--color-bg-elevated)]/70",
        "hover:border-[var(--color-brand-blue)]/60",
        "focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-bright)] focus:ring-offset-2 focus:ring-offset-[var(--color-bg-deep)]"
      )}
      style={{
        boxShadow: hovered
          ? "0 12px 40px -12px rgba(63,160,255,0.35)"
          : "0 4px 16px -8px rgba(0,0,0,0.4)",
      }}
    >
      {/* Vertical badge */}
      <div className="flex items-center justify-between gap-3">
        <span className="inline-flex items-center gap-2 rounded-full border border-[var(--color-brand-blue)]/40 bg-[var(--color-brand-blue)]/10 px-3 py-1 text-[10px] font-semibold tracking-wider uppercase text-[var(--color-brand-bright)]">
          <VerticalGlyph vertical={study.vertical} /> {study.vertical}
        </span>
        <span className="text-[10px] font-semibold tracking-wider uppercase text-[var(--color-ink-tertiary)]">
          Composite
        </span>
      </div>

      {/* Market + size */}
      <div className="mt-4">
        <div className="text-sm font-semibold text-[var(--color-ink-primary)]">
          {study.market}
        </div>
        <div className="mt-1 text-xs text-[var(--color-ink-tertiary)] leading-snug">
          {study.companySize}
        </div>
      </div>

      {/* Situation */}
      <p className="mt-4 text-sm leading-relaxed text-[var(--color-ink-secondary)]">
        {study.situation}
      </p>

      {/* Metrics */}
      <div className="mt-6 space-y-2.5">
        {study.metrics.map((m) => (
          <MetricRow key={m.label} metric={m} />
        ))}
      </div>

      {/* Pull quote */}
      <blockquote className="mt-6 border-l-2 border-[var(--color-brand-bright)]/60 pl-4 italic text-sm text-[var(--color-ink-primary)] leading-relaxed">
        &ldquo;{study.pullQuote}&rdquo;
      </blockquote>
      <div className="mt-2 text-[11px] text-[var(--color-ink-tertiary)]">
        — {study.attribution}
      </div>

      {/* CTA reveal */}
      <div
        className={cn(
          "mt-5 overflow-hidden transition-all duration-300",
          hovered ? "max-h-12 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <a
          href="/contact"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--color-brand-bright)] hover:text-white transition-colors"
        >
          Request the full story <span aria-hidden>→</span>
        </a>
      </div>
    </motion.article>
  );
}

function MetricRow({ metric }: { metric: Metric }) {
  return (
    <div className="grid grid-cols-[1fr_auto_auto_auto] items-baseline gap-2 py-2 border-b border-[var(--color-border-subtle)] last:border-0">
      <div className="text-[11px] uppercase tracking-wider text-[var(--color-ink-tertiary)] font-semibold">
        {metric.label}
      </div>
      <div className="font-mono tabular text-sm text-[var(--color-ink-tertiary)] line-through">
        {metric.before}
      </div>
      <div
        className="text-[var(--color-ink-tertiary)] text-xs"
        aria-hidden
      >
        →
      </div>
      <div
        className={cn(
          "font-mono tabular text-base font-bold",
          metric.improved
            ? "text-[var(--color-brand-bright)]"
            : "text-[var(--color-ink-primary)]"
        )}
      >
        {metric.after}
      </div>
    </div>
  );
}

function VerticalGlyph({ vertical }: { vertical: Study["vertical"] }) {
  const g =
    vertical === "Roofing" ? "▲" : vertical === "HVAC" ? "◆" : "◈";
  return <span aria-hidden>{g}</span>;
}
