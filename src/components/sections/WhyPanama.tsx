"use client";

import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";

const ADVANTAGES = [
  { label: "U.S.-aligned time zones",         icon: "⏱" },
  { label: "Lower operational costs",         icon: "↓$" },
  { label: "Scalable workforce infrastructure", icon: "⇡" },
  { label: "Faster hiring capabilities",      icon: "⇢" },
  { label: "Bilingual talent pool",           icon: "EN/ES" },
  { label: "Stable business environment",     icon: "★" },
];

const HOURS = Array.from({ length: 24 }, (_, h) => h);

export function WhyPanama() {
  // U.S. business hours we serve: 9 AM – 7 PM EST
  // Panama: same time zone as EST (no DST)
  const usWorkRange: [number, number] = [9, 19];
  const panamaWorkRange: [number, number] = [9, 19];

  return (
    <section id="why-panama" className="relative py-24 md:py-40">
      <div className="container-app">
        <Reveal>
          <SectionLabel number="06">Why Panama</SectionLabel>
          <h2 className="mt-4 font-display text-3xl sm:text-5xl md:text-6xl tracking-[-0.035em] max-w-4xl leading-[1.05]">
            Aligned time zones.{" "}
            <span className="text-[var(--color-ink-tertiary)]">A fraction of the overhead.</span>
          </h2>
          <p className="mt-5 max-w-2xl text-base md:text-lg text-[var(--color-ink-secondary)]">
            Panama runs on Eastern Standard Time year-round (no DST). Our operators are available the same hours your customers are — without U.S. staffing costs.
          </p>
        </Reveal>

        {/* Timezone visualization */}
        <Reveal delay={160}>
          <div className="mt-12 md:mt-16 rounded-3xl border border-[var(--color-border-subtle)] bg-[var(--color-bg-elevated)]/60 backdrop-blur-md p-6 md:p-10">
            <div className="eyebrow mb-4">Working-hours overlap</div>
            <TimezoneRow label="United States (EST)" workRange={usWorkRange} accent="#3FA0FF" />
            <div className="h-3" />
            <TimezoneRow label="Panama City" workRange={panamaWorkRange} accent="#22C55E" />
            <div className="mt-6 pt-5 border-t border-[var(--color-border-subtle)] flex items-baseline gap-2">
              <div className="font-mono tabular text-3xl md:text-4xl font-bold text-[var(--color-brand-bright)]">
                100%
              </div>
              <div className="text-sm text-[var(--color-ink-secondary)]">overlap on business hours</div>
            </div>
          </div>
        </Reveal>

        {/* Cost comparison */}
        <Reveal delay={260}>
          <div className="mt-6 grid md:grid-cols-2 gap-4">
            <CostCard
              label="In-house U.S. revenue ops team"
              monthly={48000}
              detail="5 agents + 1 manager + 1 confirmer · loaded salary + benefits + overhead"
              tone="muted"
            />
            <CostCard
              label="APEX (Growth tier)"
              monthly={17500}
              detail="Same team composition · fully managed · zero recruiting / HR / payroll"
              tone="brand"
            />
          </div>
        </Reveal>

        {/* Advantages grid */}
        <Reveal delay={340}>
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {ADVANTAGES.map((a) => (
              <div
                key={a.label}
                className="rounded-xl border border-[var(--color-border-subtle)] bg-[var(--color-bg-elevated)]/60 p-4 flex items-center gap-3 hover:border-[var(--color-brand-blue)] transition-colors"
              >
                <span className="font-mono text-xs font-bold tabular text-[var(--color-brand-bright)] min-w-[36px] text-center">
                  {a.icon}
                </span>
                <span className="text-sm text-[var(--color-ink-primary)]">{a.label}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function TimezoneRow({
  label,
  workRange,
  accent,
}: {
  label: string;
  workRange: [number, number];
  accent: string;
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between mb-2">
        <span className="text-sm font-semibold text-[var(--color-ink-primary)]">{label}</span>
        <span className="font-mono tabular text-xs text-[var(--color-ink-tertiary)]">
          {String(workRange[0]).padStart(2, "0")}:00 – {String(workRange[1]).padStart(2, "0")}:00
        </span>
      </div>
      <div className="relative h-10 rounded-lg bg-[var(--color-bg-deep)] overflow-hidden border border-[var(--color-border-subtle)]">
        {/* Hour ticks */}
        {HOURS.map((h) => (
          <div
            key={h}
            className="absolute top-0 bottom-0 border-l border-[var(--color-border-subtle)]/40"
            style={{ left: `${(h / 24) * 100}%` }}
          />
        ))}
        {/* Working block */}
        <div
          className="absolute top-0 bottom-0 transition-all"
          style={{
            left: `${(workRange[0] / 24) * 100}%`,
            width: `${((workRange[1] - workRange[0]) / 24) * 100}%`,
            background: `linear-gradient(90deg, ${accent}55, ${accent}AA)`,
            boxShadow: `inset 0 0 0 1px ${accent}, 0 0 16px ${accent}33`,
          }}
        />
      </div>
      <div className="flex justify-between mt-1 text-[9px] font-mono text-[var(--color-ink-tertiary)]">
        <span>0</span>
        <span>6</span>
        <span>12</span>
        <span>18</span>
        <span>24</span>
      </div>
    </div>
  );
}

function CostCard({
  label,
  monthly,
  detail,
  tone,
}: {
  label: string;
  monthly: number;
  detail: string;
  tone: "muted" | "brand";
}) {
  const brand = tone === "brand";
  return (
    <div
      className={`rounded-2xl border p-6 backdrop-blur-md ${
        brand
          ? "border-[var(--color-brand-bright)]/40 bg-[var(--color-brand-blue)]/10"
          : "border-[var(--color-border-subtle)] bg-[var(--color-bg-elevated)]/60"
      }`}
    >
      <div
        className={`eyebrow mb-3 ${brand ? "text-[var(--color-brand-bright)]" : "text-[var(--color-ink-tertiary)]"}`}
      >
        {label}
      </div>
      <div className="font-mono tabular text-3xl md:text-4xl font-bold leading-none">
        ${monthly.toLocaleString()}
        <span className="text-sm font-normal text-[var(--color-ink-tertiary)] ml-1">/ mo</span>
      </div>
      <p className="mt-3 text-xs text-[var(--color-ink-secondary)] leading-relaxed">{detail}</p>
    </div>
  );
}
