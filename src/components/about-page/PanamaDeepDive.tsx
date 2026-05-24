"use client";

import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";

const ADVANTAGES = [
  {
    n: "01",
    title: "Eastern Standard Time, year-round",
    body: "Panama runs on EST and does NOT observe Daylight Saving Time. Six months of the year we match EST, six months we match CST. Either way, our operators work the same hours your customers are awake and your sales team is working. No 'we'll get back to you Monday' because the agent is in Mumbai sleeping.",
    metric: "100% overlap on U.S. business hours",
  },
  {
    n: "02",
    title: "Bilingual talent pool",
    body: "Panama's workforce is genuinely bilingual — English-medium private schools, U.S.-business-tourism economy, and decades of U.S. corporate presence have built a labor pool where neutral English and native Spanish coexist in the same agent. Critical for U.S. construction markets where 30–60% of homeowner contacts may be Spanish-preferring.",
    metric: "Native EN + ES at agent level",
  },
  {
    n: "03",
    title: "Operational cost structure",
    body: "Loaded cost per agent (salary + benefits + payroll tax + management overhead + facilities + software) runs roughly 40–55% of equivalent U.S. cost in major construction markets. We pass the structural saving through to your monthly base — same dedicated team, materially lower spend, no compromise on screening, training, or accountability.",
    metric: "~45% of comparable U.S. loaded cost",
  },
  {
    n: "04",
    title: "Hiring velocity",
    body: "Panama City's labor market lets us ramp a qualified agent through screening, training, certification, and live calls in 10–14 days. In comparable U.S. markets, the same ramp runs 30–60 days assuming you can find the candidate at all. When you need to scale capacity for a busy season, that velocity is the difference between catching the wave and missing it.",
    metric: "10–14 day full agent ramp",
  },
  {
    n: "05",
    title: "Political and currency stability",
    body: "Panama uses the U.S. dollar as legal tender. No FX exposure, no quarterly currency hedging, no surprise inflation drag. The Panama Canal economy keeps macroeconomic stability and U.S.-aligned business law a permanent priority of every government. Operationally and contractually, you're working with a jurisdiction that behaves predictably.",
    metric: "USD-denominated, no FX exposure",
  },
  {
    n: "06",
    title: "U.S.-aligned business infrastructure",
    body: "Banking, contracts, IP protection, data privacy, and labor compliance all run on frameworks compatible with U.S. business norms. We carry U.S.-equivalent E&O coverage, follow SOC-aligned data handling, and our client contracts are U.S.-jurisdiction by default. Nothing about working with APEX feels offshore — except the price.",
    metric: "U.S.-jurisdiction contracts standard",
  },
];

export function PanamaDeepDive() {
  return (
    <section
      id="why-panama"
      className="relative py-20 md:py-32 border-t border-[var(--color-border-subtle)]"
    >
      <div className="container-app">
        <Reveal>
          <SectionLabel number="03">Why Panama, specifically</SectionLabel>
          <h2 className="mt-4 font-display text-3xl sm:text-5xl md:text-6xl tracking-[-0.035em] max-w-4xl leading-[1.05]">
            The location is not incidental.{" "}
            <span className="text-[var(--color-ink-tertiary)]">It's the entire thesis.</span>
          </h2>
          <p className="mt-5 max-w-2xl text-base md:text-lg text-[var(--color-ink-secondary)]">
            Every operational choice we make starts here: time zone, language, cost structure,
            talent pool, stability, and contract law all pointing the same direction.
          </p>
        </Reveal>

        <div className="mt-14 grid md:grid-cols-2 gap-4">
          {ADVANTAGES.map((adv, i) => (
            <Reveal key={adv.n} delay={i * 60}>
              <div className="h-full rounded-2xl border border-[var(--color-border-subtle)] bg-[var(--color-bg-elevated)]/60 backdrop-blur-md p-6 md:p-7 hover:border-[var(--color-brand-blue)]/60 transition-colors">
                <div className="flex items-baseline justify-between mb-4">
                  <span className="font-mono tabular text-2xl font-bold text-[var(--color-brand-bright)]">
                    {adv.n}
                  </span>
                  <span className="font-mono tabular text-[10px] text-[var(--color-ink-tertiary)] uppercase tracking-wider">
                    {adv.metric}
                  </span>
                </div>
                <h3 className="font-display text-xl md:text-2xl tracking-tight text-[var(--color-ink-primary)]">
                  {adv.title}
                </h3>
                <p className="mt-3 text-sm md:text-[15px] text-[var(--color-ink-secondary)] leading-relaxed">
                  {adv.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
