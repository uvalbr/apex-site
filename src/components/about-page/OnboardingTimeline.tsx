"use client";

import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";

const PHASES = [
  {
    week: "Week 1",
    title: "Discovery + KPI baseline",
    body: "Audit your current lead flow, CRM workflows, sales team handoff process, and existing KPIs. Pull 90 days of historical call recordings, CRM exports, and conversion data. Establish baseline metrics we'll measure improvement against.",
    deliverable: "Baseline KPI report + gap analysis",
  },
  {
    week: "Week 2",
    title: "CRM integration + tech setup",
    body: "Configure your CRM with APEX user accounts, custom fields for source tracking, routing rules for our agents, and reporting dashboards. Integrate dialer, call recording, and QA tools. Test end-to-end with 5–10 mock leads.",
    deliverable: "Live CRM workflow + agent access",
  },
  {
    week: "Week 3",
    title: "Script + training build",
    body: "Build your custom call scripts, objection library, and qualification rubric from historical recordings and your sales team's input. Hand-pick agents from our cohort, run 5 days of account-specific training, certify before live calls.",
    deliverable: "Certified agents + approved scripts",
  },
  {
    week: "Week 4",
    title: "Soft launch (10% volume)",
    body: "Route ~10% of inbound leads to APEX while your existing process handles the rest. Live coaching on every call. Daily KPI reviews with your sales leadership. Calibrate qualification thresholds and confirmation workflows.",
    deliverable: "First live appointments + daily KPI report",
  },
  {
    week: "Weeks 5–8",
    title: "Ramp to full volume",
    body: "Progressive volume increase from 10% → 30% → 60% → 100% over 4 weeks. Weekly performance reviews. Script iterations based on live data. Sales team training on receiving APEX-set appointments. By end of week 8: full volume, stable KPIs.",
    deliverable: "100% volume + first month of stable metrics",
  },
  {
    week: "Day 60",
    title: "Go/no-go review",
    body: "Formal comparison of day-60 KPIs against the baseline established in week 1. Three outcomes: validated (transition to ongoing tier), trajectory-positive (extend pilot 30 days at discount), or failed (clean exit, you keep all assets). No ambiguity.",
    deliverable: "Pilot completion review + decision",
  },
];

export function OnboardingTimeline() {
  return (
    <section
      id="onboarding"
      className="relative py-20 md:py-32 border-t border-[var(--color-border-subtle)]"
    >
      <div className="container-app">
        <Reveal>
          <SectionLabel number="05">60-day onboarding</SectionLabel>
          <h2 className="mt-4 font-display text-3xl sm:text-5xl md:text-6xl tracking-[-0.035em] max-w-3xl leading-[1.05]">
            From contract signed to full volume in 60 days.
          </h2>
          <p className="mt-5 max-w-2xl text-base md:text-lg text-[var(--color-ink-secondary)]">
            Every phase has a specific deliverable and a measurable exit criterion. We don't move
            to the next phase until the previous one is signed off.
          </p>
        </Reveal>

        <div className="mt-14 relative">
          {/* Spine */}
          <div
            aria-hidden
            className="absolute left-[18px] md:left-[28px] top-3 bottom-3 w-px bg-gradient-to-b from-[var(--color-brand-bright)] via-[var(--color-border-strong)] to-transparent"
          />
          <div className="space-y-5">
            {PHASES.map((phase, i) => (
              <Reveal key={phase.week} delay={i * 80}>
                <div className="relative pl-12 md:pl-20">
                  {/* Node */}
                  <div className="absolute left-0 top-2 flex items-center justify-center">
                    <div className="relative w-[37px] md:w-[57px] h-[37px] md:h-[57px] rounded-full bg-[var(--color-bg-deep)] border-2 border-[var(--color-brand-blue)] flex items-center justify-center font-mono tabular text-xs md:text-sm font-bold text-[var(--color-brand-bright)]">
                      {String(i + 1).padStart(2, "0")}
                    </div>
                  </div>
                  <div className="rounded-2xl border border-[var(--color-border-subtle)] bg-[var(--color-bg-elevated)]/60 backdrop-blur-md p-6 md:p-7 hover:border-[var(--color-brand-blue)]/60 transition-colors">
                    <div className="flex items-baseline gap-4 flex-wrap mb-2">
                      <span className="eyebrow">{phase.week}</span>
                    </div>
                    <h3 className="font-display text-xl md:text-2xl tracking-tight text-[var(--color-ink-primary)]">
                      {phase.title}
                    </h3>
                    <p className="mt-3 text-sm md:text-base text-[var(--color-ink-secondary)] leading-relaxed">
                      {phase.body}
                    </p>
                    <div className="mt-5 pt-4 border-t border-[var(--color-border-subtle)] flex items-baseline gap-3">
                      <span className="text-[10px] uppercase tracking-[0.18em] font-semibold text-[var(--color-ink-tertiary)]">
                        Deliverable
                      </span>
                      <span className="text-sm font-mono tabular text-[var(--color-brand-bright)]">
                        {phase.deliverable}
                      </span>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
