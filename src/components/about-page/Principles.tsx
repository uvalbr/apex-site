"use client";

import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";

const PRINCIPLES = [
  {
    n: "01",
    title: "Dedicated teams, never pooled",
    body: "Pooled agent models optimize for utilization, not for your outcomes. We build a team that knows your business and stays there. The economics work because we recover the cost in conversion lift, not in operator time-slicing.",
  },
  {
    n: "02",
    title: "Outcomes over activity",
    body: "Call counts, dial volumes, talk time — vanity metrics that drive bad behavior. We report on speed-to-lead, qualified-set rate, show rate, and revenue per appointment. Those are the only numbers that move yours.",
  },
  {
    n: "03",
    title: "Transparent KPIs, no black boxes",
    body: "Every metric we report is reconcilable against your CRM. Every call is recorded. Every appointment is tagged. If you can't audit it, we don't report it. If you can audit it, you should — and we'll show you how.",
  },
  {
    n: "04",
    title: "Tight feedback loops",
    body: "Daily standups inside the team, weekly KPI reviews with the client, monthly business reviews with leadership, quarterly strategy sessions. The smaller the loop, the faster issues compound into fixes instead of into problems.",
  },
  {
    n: "05",
    title: "Own the infrastructure, not the credit",
    body: "Your CRM. Your scripts. Your data. Your customer relationships. We build, run, and continuously improve the operational layer underneath — and you keep all of it the moment we part ways. We win on results, not on lock-in.",
  },
  {
    n: "06",
    title: "Operator-to-operator honesty",
    body: "If a tier doesn't fit your volume, we'll tell you. If your lead source is the actual problem, we'll tell you. If you should fix something internally before hiring us, we'll tell you. Bad-fit engagements waste everyone's time.",
  },
];

export function Principles() {
  return (
    <section
      id="principles"
      className="relative py-20 md:py-32 border-t border-[var(--color-border-subtle)]"
    >
      <div className="container-app">
        <Reveal>
          <SectionLabel number="06">What we believe</SectionLabel>
          <h2 className="mt-4 font-display text-3xl sm:text-5xl md:text-6xl tracking-[-0.035em] max-w-3xl leading-[1.05]">
            Six operating principles.{" "}
            <span className="text-[var(--color-ink-tertiary)]">Every decision tracks back to one of them.</span>
          </h2>
        </Reveal>

        <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {PRINCIPLES.map((p, i) => (
            <Reveal key={p.n} delay={i * 60}>
              <div className="h-full rounded-2xl border border-[var(--color-border-subtle)] bg-[var(--color-bg-elevated)]/60 backdrop-blur-md p-6 md:p-7 hover:border-[var(--color-brand-blue)]/60 transition-colors">
                <div className="font-mono tabular text-2xl font-bold text-[var(--color-brand-bright)] mb-4">
                  {p.n}
                </div>
                <h3 className="font-display text-lg md:text-xl tracking-tight text-[var(--color-ink-primary)]">
                  {p.title}
                </h3>
                <p className="mt-3 text-sm text-[var(--color-ink-secondary)] leading-relaxed">
                  {p.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
