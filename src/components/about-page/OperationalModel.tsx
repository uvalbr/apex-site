"use client";

import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";

const PILLARS = [
  {
    title: "Dedicated, not pooled",
    body: "Every agent on your team works on your account only. They learn your CRM, your scripts, your objection patterns, your customer demographics, and your sales team's preferences. No shared queues, no rotating roster, no \"whoever picks up next.\"",
    metric: "1:1 agent-to-client mapping",
  },
  {
    title: "Layered management oversight",
    body: "Each account has a dedicated team manager running daily standups and weekly 1:1s with agents. Above them, a regional ops director who handles client escalations, KPI variance, and cross-account standards. Above that, executive oversight on monthly business reviews for Expansion and Enterprise tiers.",
    metric: "3-layer management stack per account",
  },
  {
    title: "Real-time call coaching",
    body: "Team managers listen to live calls during operating hours, drop coaching notes mid-shift, and run end-of-day reviews on flagged interactions. Recorded calls are tagged for objection type, sentiment, and outcome. Coaching is continuous, not quarterly.",
    metric: "~8 hours of coaching per agent per week",
  },
  {
    title: "QA scorecard, weekly cadence",
    body: "Every agent gets randomly sampled calls scored weekly against a 12-point QA rubric (greeting, qualification, objection handling, CRM accuracy, scheduling discipline, tone). Scores below threshold trigger immediate corrective action. Scores trend over time on a per-agent dashboard you can see.",
    metric: "5 sampled calls × 12 dimensions per agent / wk",
  },
  {
    title: "Structured escalation chain",
    body: "Customer escalations route to the agent's team manager within minutes, your account's ops director within the hour, and to executive ops if they're not resolved same-day. You have direct Slack/Teams channels to your team manager and ops director — not a ticketing portal, not a queue.",
    metric: "Direct human escalation under 60 minutes",
  },
  {
    title: "Training infrastructure built-in",
    body: "We run a permanent training cohort separate from live ops. New hires complete 7 days of core training (industry knowledge, objection handling, CRM hygiene, compliance) before touching your account. Existing agents get monthly refreshers on script updates, new objection patterns, and product launches.",
    metric: "7-day pre-account training mandatory",
  },
];

export function OperationalModel() {
  return (
    <section
      id="operational-model"
      className="relative py-20 md:py-32 border-t border-[var(--color-border-subtle)]"
    >
      <div className="container-app">
        <Reveal>
          <SectionLabel number="04">Operational model</SectionLabel>
          <h2 className="mt-4 font-display text-3xl sm:text-5xl md:text-6xl tracking-[-0.035em] max-w-3xl leading-[1.05]">
            How the team actually runs day to day.
          </h2>
          <p className="mt-5 max-w-2xl text-base md:text-lg text-[var(--color-ink-secondary)]">
            The difference between a dedicated revenue ops function and a generic call center isn't
            the sales pitch. It's the systems behind it.
          </p>
        </Reveal>

        <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {PILLARS.map((p, i) => (
            <Reveal key={p.title} delay={i * 70}>
              <div className="h-full rounded-2xl border border-[var(--color-border-subtle)] bg-[var(--color-bg-elevated)]/60 backdrop-blur-md p-6 hover:border-[var(--color-brand-blue)]/60 transition-colors">
                <h3 className="font-display text-lg md:text-xl tracking-tight text-[var(--color-ink-primary)]">
                  {p.title}
                </h3>
                <p className="mt-3 text-sm text-[var(--color-ink-secondary)] leading-relaxed">
                  {p.body}
                </p>
                <div className="mt-5 pt-4 border-t border-[var(--color-border-subtle)]">
                  <span className="font-mono tabular text-[11px] text-[var(--color-brand-bright)] uppercase tracking-wider">
                    {p.metric}
                  </span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
