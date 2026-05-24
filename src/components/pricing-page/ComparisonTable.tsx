"use client";

import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";

type FeatureRow = {
  label: string;
  values: [string | boolean, string | boolean, string | boolean, string | boolean];
  group?: string;
};

type TierHeader = { name: string; price: number; sub: string; highlight?: boolean };

const TIERS: TierHeader[] = [
  { name: "Pilot", price: 8500, sub: "60-day proof" },
  { name: "Growth", price: 15000, sub: "Most popular", highlight: true },
  { name: "Expansion", price: 20000, sub: "Multi-source" },
  { name: "Enterprise", price: 25000, sub: "Multi-market" },
];

const ROWS: FeatureRow[] = [
  { group: "Team", label: "Dedicated agents", values: ["2", "5", "10", "15"] },
  { group: "Team", label: "Team manager", values: [true, true, true, true] },
  { group: "Team", label: "Appointment confirmers", values: ["1", "1", "2", "3"] },
  { group: "Team", label: "Dedicated reporting analyst", values: [false, false, true, true] },

  { group: "Operations", label: "CRM integration & workflow setup", values: [true, true, true, true] },
  { group: "Operations", label: "Custom scripts + objection library", values: [true, true, true, true] },
  { group: "Operations", label: "KPI dashboard & weekly reviews", values: [true, true, true, true] },
  { group: "Operations", label: "Multi-source lead routing", values: [false, false, true, true] },
  { group: "Operations", label: "Advanced reporting & call analytics", values: [false, true, true, true] },
  { group: "Operations", label: "Enterprise-grade ops management", values: [false, false, false, true] },

  { group: "Performance fees", label: "Per qualified appointment", values: ["—", "$100–200", "$100–200", "$100–200"] },
  { group: "Performance fees", label: "Revenue share on closed projects", values: ["—", "5–10%", "5–10%", "5–10%"] },

  { group: "Support", label: "HR / payroll / legal handled", values: [true, true, true, true] },
  { group: "Support", label: "Performance review cadence", values: ["Day 30 + 60", "Weekly", "Weekly", "Weekly + monthly executive"] },
  { group: "Support", label: "Slack / Teams direct channel", values: [true, true, true, true] },
  { group: "Support", label: "Quarterly strategy session", values: [false, true, true, true] },

  { group: "Commercial", label: "Contract length", values: ["60-day pilot", "Month-to-month", "Month-to-month", "Month-to-month"] },
  { group: "Commercial", label: "Setup fee", values: ["$0", "$0", "$0", "$0"] },
  { group: "Commercial", label: "Cancellation notice", values: ["End of pilot", "30 days", "30 days", "60 days"] },
];

// Group rows
const GROUPS = ["Team", "Operations", "Performance fees", "Support", "Commercial"];

export function ComparisonTable() {
  return (
    <section id="compare" className="relative py-20 md:py-32 border-t border-[var(--color-border-subtle)]">
      <div className="container-app">
        <Reveal>
          <SectionLabel number="02">Compare tiers</SectionLabel>
          <h2 className="mt-4 font-display text-3xl sm:text-5xl md:text-6xl tracking-[-0.035em] max-w-3xl leading-[1.05]">
            Every feature, side by side.
          </h2>
          <p className="mt-5 max-w-2xl text-base md:text-lg text-[var(--color-ink-secondary)]">
            What you actually get at every price point. No asterisks. No "starting at."
          </p>
        </Reveal>

        <Reveal delay={120}>
          <div className="mt-12 rounded-3xl border border-[var(--color-border-subtle)] bg-[var(--color-bg-elevated)]/40 backdrop-blur-md overflow-hidden">
            {/* Sticky header */}
            <div className="overflow-x-auto">
              <table className="w-full min-w-[860px] text-left">
                <thead>
                  <tr className="border-b border-[var(--color-border-strong)]">
                    <th className="sticky left-0 z-10 bg-[var(--color-bg-elevated)] p-5 md:p-6 align-bottom w-[28%]">
                      <span className="eyebrow text-[var(--color-ink-tertiary)]">Tier</span>
                    </th>
                    {TIERS.map((t) => (
                      <th
                        key={t.name}
                        className={`p-5 md:p-6 align-bottom w-[18%] ${
                          t.highlight ? "bg-[var(--color-brand-blue)]/10" : ""
                        }`}
                      >
                        <div className="flex flex-col gap-1">
                          {t.highlight && (
                            <span className="self-start text-[9px] font-mono font-bold tracking-wider text-[var(--color-brand-bright)] uppercase">
                              ◆ Recommended
                            </span>
                          )}
                          <span className="font-display text-xl md:text-2xl tracking-tight">
                            {t.name}
                          </span>
                          <span className="font-mono tabular text-2xl md:text-3xl font-bold mt-1">
                            ${(t.price / 1000).toFixed(1)}k
                            <span className="text-xs font-normal text-[var(--color-ink-tertiary)] ml-1">
                              /mo
                            </span>
                          </span>
                          <span className="text-[11px] text-[var(--color-ink-tertiary)] mt-1">
                            {t.sub}
                          </span>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {GROUPS.map((group) => (
                    <RowGroup key={group} group={group} rows={ROWS.filter((r) => r.group === group)} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Reveal>

        <Reveal delay={220}>
          <p className="mt-6 text-center text-xs text-[var(--color-ink-tertiary)]">
            All performance fees are paid only when the qualified appointment runs or the deal closes. Verified through your CRM, not ours.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function RowGroup({ group, rows }: { group: string; rows: FeatureRow[] }) {
  return (
    <>
      <tr>
        <td
          colSpan={5}
          className="sticky left-0 z-10 bg-[var(--color-bg-deep)] px-5 md:px-6 pt-7 pb-3"
        >
          <span className="eyebrow text-[var(--color-brand-bright)]">{group}</span>
        </td>
      </tr>
      {rows.map((row) => (
        <tr key={row.label} className="border-t border-[var(--color-border-subtle)]">
          <td className="sticky left-0 bg-[var(--color-bg-elevated)] px-5 md:px-6 py-4 text-sm text-[var(--color-ink-primary)]">
            {row.label}
          </td>
          {row.values.map((v, i) => (
            <td
              key={i}
              className={`px-5 md:px-6 py-4 text-sm ${
                i === 1 ? "bg-[var(--color-brand-blue)]/5" : ""
              }`}
            >
              <Cell value={v} />
            </td>
          ))}
        </tr>
      ))}
    </>
  );
}

function Cell({ value }: { value: string | boolean }) {
  if (value === true) {
    return (
      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[var(--color-brand-bright)]/12 text-[var(--color-brand-bright)]">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
          <path
            d="M5 12l5 5L20 7"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    );
  }
  if (value === false) {
    return (
      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[var(--color-bg-deep)] text-[var(--color-ink-faint)]">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
          <path
            d="M6 6l12 12M18 6L6 18"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </span>
    );
  }
  return <span className="font-mono tabular text-sm text-[var(--color-ink-primary)]">{value}</span>;
}
