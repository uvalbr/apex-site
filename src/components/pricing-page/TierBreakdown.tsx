"use client";

import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";

type Tier = {
  id: string;
  name: string;
  tagline: string;
  monthly: number;
  forWho: string;
  team: string;
  included: string[];
  outcomes: { metric: string; value: string }[];
  highlight?: boolean;
};

const TIERS: Tier[] = [
  {
    id: "pilot",
    name: "Pilot Deployment",
    tagline: "60-day proof program",
    monthly: 8500,
    forWho:
      "Construction operators doing $5M–$15M/yr in revenue, generating 100+ leads/month, who want to validate the model before scaling.",
    team: "2 agents · 1 manager · 1 confirmer",
    included: [
      "Full discovery + CRM workflow integration in week 1",
      "Custom script + objection library built from your historical calls",
      "Live call coaching from day 1 through day 60",
      "KPI dashboard setup (speed-to-lead, set rate, show rate, close rate)",
      "Day-30 review with adjustments. Day-60 review with go/no-go decision",
      "Zero per-appointment or revenue-share fees during pilot",
    ],
    outcomes: [
      { metric: "Speed-to-lead target", value: "< 3 min" },
      { metric: "Appointment set rate", value: "30–40%" },
      { metric: "Show rate", value: "75–85%" },
      { metric: "Decision point", value: "Day 60" },
    ],
  },
  {
    id: "growth",
    name: "Growth Revenue Team",
    tagline: "Dedicated revenue ops department",
    monthly: 15000,
    forWho:
      "Established contractors doing $10M–$30M/yr, processing 300–700 leads/month from 2–4 sources, ready to commit to a full revenue ops function.",
    team: "5 agents · 1 manager · 1 confirmer",
    included: [
      "Everything in Pilot",
      "Dedicated team manager with daily standups + weekly client check-ins",
      "Multi-channel intake: form fills, calls, chat, paid ads, organic",
      "Quarterly strategy session with your sales leadership",
      "+$100–200 per qualified appointment (verified through your CRM)",
      "5–10% revenue share on closed projects originating from APEX-set appointments",
      "HR, payroll, legal, and benefits fully handled by APEX",
    ],
    outcomes: [
      { metric: "Monthly capacity", value: "~600 leads" },
      { metric: "Expected lift vs. internal", value: "+35–55%" },
      { metric: "Cost vs. in-house team", value: "~3x cheaper" },
      { metric: "Time to ramp", value: "30 days" },
    ],
    highlight: true,
  },
  {
    id: "expansion",
    name: "Expansion Revenue Department",
    tagline: "Multi-channel revenue engine",
    monthly: 20000,
    forWho:
      "Scaling contractors at $25M–$60M/yr running multiple service lines or geographic markets, needing dedicated analytics and multi-source orchestration.",
    team: "10 agents · 1 manager · 2 confirmers · 1 analyst",
    included: [
      "Everything in Growth",
      "Dedicated reporting analyst building custom dashboards weekly",
      "Multi-source revenue ops management (paid + organic + referral + repeat)",
      "Advanced call analytics: sentiment scoring, objection tagging, drop-off analysis",
      "A/B testing on scripts, hours of operation, and channel mix",
      "Dedicated training infrastructure for new agent ramp",
      "Same performance fee structure as Growth",
    ],
    outcomes: [
      { metric: "Monthly capacity", value: "~1,200 leads" },
      { metric: "Lead source channels", value: "Unlimited" },
      { metric: "Reporting depth", value: "Weekly custom" },
      { metric: "Time to ramp", value: "45 days" },
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise Revenue Division",
    tagline: "Full scale, multi-market",
    monthly: 25000,
    forWho:
      "Large operators at $60M+/yr running multiple regional brands, franchise networks, or roll-up portfolios who need a true revenue division.",
    team: "15 agents · 1 manager · 3 confirmers · 1 analyst · executive ops liaison",
    included: [
      "Everything in Expansion",
      "Enterprise operational management with dedicated executive liaison",
      "Multi-brand, multi-region staffing infrastructure",
      "Monthly executive review with your C-suite",
      "Scalable headcount adjustments (up or down) on 30-day notice",
      "Custom reporting integrated with your BI stack (Tableau, Looker, Domo)",
      "Same performance fee structure with volume discount triggers at 1,500+ appointments/quarter",
    ],
    outcomes: [
      { metric: "Monthly capacity", value: "2,000+ leads" },
      { metric: "Brands supported", value: "Multiple" },
      { metric: "Reporting", value: "Executive-grade" },
      { metric: "Time to ramp", value: "60 days" },
    ],
  },
];

export function TierBreakdown() {
  return (
    <section id="tiers" className="relative py-20 md:py-32 border-t border-[var(--color-border-subtle)]">
      <div className="container-app">
        <Reveal>
          <SectionLabel number="03">Each tier, in detail</SectionLabel>
          <h2 className="mt-4 font-display text-3xl sm:text-5xl md:text-6xl tracking-[-0.035em] max-w-3xl leading-[1.05]">
            Pick the one that fits your operation today.{" "}
            <span className="text-[var(--color-ink-tertiary)]">Move up when you outgrow it.</span>
          </h2>
        </Reveal>

        <div className="mt-14 space-y-8">
          {TIERS.map((tier, idx) => (
            <Reveal key={tier.id} delay={idx * 80}>
              <TierCard tier={tier} index={idx} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function TierCard({ tier, index }: { tier: Tier; index: number }) {
  return (
    <div
      id={tier.id}
      className={`scroll-mt-32 rounded-3xl border backdrop-blur-md overflow-hidden ${
        tier.highlight
          ? "border-[var(--color-brand-bright)]/40 bg-gradient-to-br from-[var(--color-bg-elevated)] to-[var(--color-brand-navy)]/60"
          : "border-[var(--color-border-subtle)] bg-[var(--color-bg-elevated)]/60"
      }`}
    >
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px]">
        {/* Left: detail */}
        <div className="p-7 md:p-12 border-b lg:border-b-0 lg:border-r border-[var(--color-border-subtle)]">
          <div className="flex items-baseline gap-4 flex-wrap">
            <span className="font-mono text-xs text-[var(--color-ink-tertiary)] tabular">
              0{index + 1}
            </span>
            <span className="eyebrow">{tier.tagline}</span>
            {tier.highlight && (
              <span className="text-[10px] font-mono font-bold tracking-wider text-[var(--color-brand-bright)] uppercase px-2 py-0.5 rounded-full bg-[var(--color-brand-bright)]/10">
                ◆ Most chosen
              </span>
            )}
          </div>
          <h3 className="mt-3 font-display text-3xl md:text-4xl tracking-tight">{tier.name}</h3>

          <div className="mt-6 rounded-xl border border-[var(--color-border-subtle)] bg-[var(--color-bg-deep)]/40 p-4">
            <div className="eyebrow mb-1.5 text-[var(--color-ink-tertiary)]">Built for</div>
            <p className="text-sm text-[var(--color-ink-primary)] leading-relaxed">{tier.forWho}</p>
          </div>

          <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="rounded-xl border border-[var(--color-border-subtle)] bg-[var(--color-bg-deep)]/40 p-4">
              <div className="eyebrow mb-1.5 text-[var(--color-ink-tertiary)]">Team composition</div>
              <p className="text-sm text-[var(--color-ink-primary)] font-mono tabular">{tier.team}</p>
            </div>
            <div className="rounded-xl border border-[var(--color-border-subtle)] bg-[var(--color-bg-deep)]/40 p-4">
              <div className="eyebrow mb-1.5 text-[var(--color-ink-tertiary)]">Monthly base</div>
              <p className="text-2xl font-mono tabular font-bold text-[var(--color-ink-primary)]">
                ${tier.monthly.toLocaleString()}
              </p>
            </div>
          </div>

          <div className="mt-7">
            <div className="eyebrow mb-3 text-[var(--color-ink-tertiary)]">What's included</div>
            <ul className="space-y-2.5">
              {tier.included.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-[var(--color-ink-primary)]">
                  <CheckIcon />
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right: outcomes */}
        <div className="p-7 md:p-10 bg-[var(--color-bg-deep)]/40 flex flex-col">
          <div className="eyebrow text-[var(--color-ink-tertiary)] mb-5">Expected outcomes</div>
          <div className="flex-1 space-y-4">
            {tier.outcomes.map((o) => (
              <div
                key={o.metric}
                className="pb-4 border-b border-[var(--color-border-subtle)] last:border-0"
              >
                <div className="text-[11px] uppercase tracking-[0.18em] font-semibold text-[var(--color-ink-tertiary)]">
                  {o.metric}
                </div>
                <div className="mt-1 font-mono tabular text-2xl md:text-3xl font-bold text-[var(--color-brand-bright)]">
                  {o.value}
                </div>
              </div>
            ))}
          </div>
          <a
            href="/contact"
            className="mt-6 inline-flex w-full items-center justify-center h-12 rounded-xl bg-[var(--color-brand-blue)] hover:bg-[var(--color-brand-bright)] text-white font-semibold text-sm transition-all hover:shadow-[0_0_28px_rgba(63,160,255,0.4)]"
          >
            Discuss {tier.name.split(" ")[0]} terms →
          </a>
        </div>
      </div>
    </div>
  );
}

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="mt-0.5 flex-shrink-0">
      <circle cx="12" cy="12" r="10" stroke="#3FA0FF" strokeWidth="1.5" opacity="0.4" />
      <path
        d="M8 12.5l2.5 2.5L16 9.5"
        stroke="#3FA0FF"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
