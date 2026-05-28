"use client";

import { useMemo, useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";

const TIERS = [
  { id: "pilot", name: "Pilot", monthly: 8500 },
  { id: "growth", name: "Growth", monthly: 17500 },
  { id: "expansion", name: "Expansion", monthly: 27500 },
  { id: "enterprise", name: "Enterprise", monthly: 33500 },
] as const;

export function RoiCalculator() {
  const [tierIdx, setTierIdx] = useState(1);
  const [avgDeal, setAvgDeal] = useState(17500);
  const [margin, setMargin] = useState(35);
  const [appointments, setAppointments] = useState(60);
  const [closeRate, setCloseRate] = useState(25);

  const tier = TIERS[tierIdx];

  const math = useMemo(() => {
    const apptFee = 150;
    const revShare = 0.075;
    const closedDeals = Math.round((appointments * closeRate) / 100);
    const revenue = closedDeals * avgDeal;
    const grossProfit = revenue * (margin / 100);
    const monthlyAppointmentCost = tier.monthly > 8500 ? appointments * apptFee : 0;
    const monthlyRevShare = tier.monthly > 8500 ? revenue * revShare : 0;
    const totalApexCost = tier.monthly + monthlyAppointmentCost + monthlyRevShare;
    const netProfit = grossProfit - totalApexCost;
    const breakEvenDeals = Math.ceil(totalApexCost / (avgDeal * (margin / 100)));
    const roi = totalApexCost > 0 ? ((netProfit / totalApexCost) * 100).toFixed(0) : "0";
    return {
      closedDeals,
      revenue,
      grossProfit,
      monthlyAppointmentCost,
      monthlyRevShare,
      totalApexCost,
      netProfit,
      breakEvenDeals,
      roi,
    };
  }, [tier, avgDeal, margin, appointments, closeRate]);

  return (
    <section
      id="roi"
      className="relative py-20 md:py-32 border-t border-[var(--color-border-subtle)]"
    >
      <div className="container-app">
        <Reveal>
          <SectionLabel number="05">ROI calculator</SectionLabel>
          <h2 className="mt-4 font-display text-3xl sm:text-5xl md:text-6xl tracking-[-0.035em] max-w-3xl leading-[1.05]">
            How many closed deals to break even?{" "}
            <span className="text-[var(--color-ink-tertiary)]">Move the inputs.</span>
          </h2>
          <p className="mt-5 max-w-2xl text-base md:text-lg text-[var(--color-ink-secondary)]">
            Built on your numbers. Per-appointment fee modeled at $150 average. Revenue share at
            7.5% average. Adjust your real numbers below.
          </p>
        </Reveal>

        <Reveal delay={140}>
          <div className="mt-12 grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-6">
            {/* Inputs */}
            <div className="rounded-3xl border border-[var(--color-border-subtle)] bg-[var(--color-bg-elevated)]/60 backdrop-blur-md p-6 md:p-9">
              <div className="eyebrow mb-5">Your inputs</div>

              <div className="space-y-7">
                {/* Tier selector */}
                <div>
                  <div className="flex items-baseline justify-between mb-2">
                    <label className="text-sm font-semibold text-[var(--color-ink-primary)]">
                      Tier
                    </label>
                    <span className="font-mono tabular text-sm text-[var(--color-brand-bright)]">
                      ${tier.monthly.toLocaleString()}/mo base
                    </span>
                  </div>
                  <div className="grid grid-cols-4 gap-1 rounded-lg border border-[var(--color-border-subtle)] bg-[var(--color-bg-deep)]/60 p-1">
                    {TIERS.map((t, i) => (
                      <button
                        key={t.id}
                        onClick={() => setTierIdx(i)}
                        className={`text-xs font-semibold py-2 rounded-md transition-colors ${
                          tierIdx === i
                            ? "bg-[var(--color-brand-blue)] text-white"
                            : "text-[var(--color-ink-tertiary)] hover:text-[var(--color-ink-primary)]"
                        }`}
                      >
                        {t.name}
                      </button>
                    ))}
                  </div>
                </div>

                <SliderInput
                  label="Average closed deal value"
                  value={avgDeal}
                  onChange={setAvgDeal}
                  min={2000}
                  max={75000}
                  step={500}
                  format={(v) => `$${v.toLocaleString()}`}
                />

                <SliderInput
                  label="Gross margin on closed work"
                  value={margin}
                  onChange={setMargin}
                  min={10}
                  max={60}
                  step={1}
                  format={(v) => `${v}%`}
                />

                <SliderInput
                  label="Qualified appointments / month"
                  value={appointments}
                  onChange={setAppointments}
                  min={10}
                  max={400}
                  step={5}
                  format={(v) => `${v}`}
                />

                <SliderInput
                  label="Close rate on those appointments"
                  value={closeRate}
                  onChange={setCloseRate}
                  min={5}
                  max={60}
                  step={1}
                  format={(v) => `${v}%`}
                />
              </div>
            </div>

            {/* Output */}
            <div className="rounded-3xl border border-[var(--color-brand-blue)]/40 bg-gradient-to-br from-[var(--color-bg-elevated)] to-[var(--color-brand-navy)]/50 backdrop-blur-md p-6 md:p-9 flex flex-col">
              <div className="eyebrow mb-5">Monthly math</div>

              <div className="space-y-5">
                <BigStat
                  label="You need to close"
                  value={`${math.breakEvenDeals} deals`}
                  sub="to fully cover APEX cost at your margin"
                  accent
                />

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <Stat label="Closed deals modeled" value={`${math.closedDeals}`} />
                  <Stat label="Revenue generated" value={`$${math.revenue.toLocaleString()}`} />
                  <Stat label="Gross profit at margin" value={`$${Math.round(math.grossProfit).toLocaleString()}`} />
                  <Stat
                    label="Total APEX cost"
                    value={`$${Math.round(math.totalApexCost).toLocaleString()}`}
                    danger
                  />
                </div>

                <div className="pt-5 border-t border-[var(--color-border-subtle)]">
                  <div className="flex items-baseline justify-between">
                    <span className="text-sm text-[var(--color-ink-secondary)]">Net profit / mo</span>
                    <span
                      className={`font-mono tabular text-3xl font-bold ${
                        math.netProfit >= 0
                          ? "text-[var(--color-success)]"
                          : "text-[var(--color-danger)]"
                      }`}
                    >
                      {math.netProfit >= 0 ? "+" : "−"}$
                      {Math.abs(Math.round(math.netProfit)).toLocaleString()}
                    </span>
                  </div>
                  <div className="mt-2 flex items-baseline justify-between">
                    <span className="text-xs text-[var(--color-ink-tertiary)]">ROI on APEX spend</span>
                    <span className="font-mono tabular text-sm font-semibold text-[var(--color-brand-bright)]">
                      {math.roi}%
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-7 pt-5 border-t border-[var(--color-border-subtle)] text-[11px] text-[var(--color-ink-tertiary)] leading-relaxed">
                Inputs are simplified for modeling. Real engagements vary by lead source quality,
                seasonality, sales team capacity, and market. Diagnostic call models against your
                actual CRM data.
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function SliderInput({
  label,
  value,
  onChange,
  min,
  max,
  step,
  format,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  step: number;
  format: (v: number) => string;
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between mb-2">
        <label className="text-sm font-semibold text-[var(--color-ink-primary)]">{label}</label>
        <span className="font-mono tabular text-sm font-bold text-[var(--color-brand-bright)]">
          {format(value)}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 appearance-none rounded-full bg-[var(--color-bg-deep)] cursor-pointer
          [&::-webkit-slider-thumb]:appearance-none
          [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5
          [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white
          [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-[var(--color-brand-blue)]
          [&::-webkit-slider-thumb]:cursor-grab
          [&::-webkit-slider-thumb]:shadow-[0_0_0_4px_rgba(30,95,216,0.18)]
          [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5
          [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white
          [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-[var(--color-brand-blue)]"
      />
    </div>
  );
}

function Stat({ label, value, danger }: { label: string; value: string; danger?: boolean }) {
  return (
    <div className="rounded-lg border border-[var(--color-border-subtle)] bg-[var(--color-bg-deep)]/40 p-3">
      <div className="text-[10px] uppercase tracking-[0.16em] font-semibold text-[var(--color-ink-tertiary)]">
        {label}
      </div>
      <div
        className={`mt-1 font-mono tabular text-base font-bold ${
          danger ? "text-[var(--color-warn)]" : "text-[var(--color-ink-primary)]"
        }`}
      >
        {value}
      </div>
    </div>
  );
}

function BigStat({
  label,
  value,
  sub,
  accent,
}: {
  label: string;
  value: string;
  sub: string;
  accent?: boolean;
}) {
  return (
    <div className="rounded-2xl border border-[var(--color-border-subtle)] bg-[var(--color-bg-deep)]/50 p-5">
      <div className="text-[11px] uppercase tracking-[0.18em] font-semibold text-[var(--color-ink-tertiary)]">
        {label}
      </div>
      <div
        className={`mt-2 font-mono tabular text-4xl md:text-5xl font-bold leading-none ${
          accent ? "text-[var(--color-brand-bright)]" : "text-[var(--color-ink-primary)]"
        }`}
      >
        {value}
      </div>
      <div className="mt-2 text-xs text-[var(--color-ink-secondary)]">{sub}</div>
    </div>
  );
}
