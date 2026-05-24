"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ease } from "@/lib/motion";
import { cn } from "@/lib/cn";

// APEX recovery assumptions (conservative — taken from brochure ROI section)
// "Most companies don't need more leads. They need better lead monetization."
const APEX_GAINS = {
  speedToLeadLift: 0.18,      // 18% more contacts via instant response
  appointmentLift: 0.22,       // 22% more booked via qualification + follow-up
  noShowReduction: 0.55,       // 55% fewer no-shows via confirmation system
  reactivationOfOldLeads: 0.07, // 7% of inactive leads recovered/mo via outbound
};

const PRESETS = [
  { label: "Roofing",   leads: 320, close: 0.20, value: 16000, noShow: 0.35 },
  { label: "HVAC",      leads: 480, close: 0.28, value: 12000, noShow: 0.32 },
  { label: "Remodel",   leads: 180, close: 0.16, value: 48000, noShow: 0.28 },
  { label: "Pool",      leads: 95,  close: 0.22, value: 62000, noShow: 0.30 },
];

export function Simulator() {
  const reduced = useReducedMotion();
  const [leads,  setLeads]  = useState(480);
  const [close,  setClose]  = useState(0.28);
  const [value,  setValue]  = useState(12000);
  const [noShow, setNoShow] = useState(0.32);

  // Current state computations
  const current = useMemo(() => {
    // contacts = leads × baseline contact rate (assume 0.55 without speed-to-lead)
    const contacted = leads * 0.55;
    const attendedRate = 1 - noShow;
    const appointmentsHeld = contacted * 0.45 * attendedRate; // 45% book × attendance
    const closed = appointmentsHeld * close;
    const revenue = closed * value;
    return { contacted, appointmentsHeld, closed, revenue };
  }, [leads, close, value, noShow]);

  // APEX projected
  const apex = useMemo(() => {
    const newContactRate = 0.55 + APEX_GAINS.speedToLeadLift; // up to ~0.73
    const contacted = leads * Math.min(newContactRate, 0.92);
    const newAttendedRate = 1 - noShow * (1 - APEX_GAINS.noShowReduction);
    const newBookRate = 0.45 + APEX_GAINS.appointmentLift;
    const appointmentsHeld = contacted * Math.min(newBookRate, 0.78) * newAttendedRate;
    // close rate stays the same (sales is client's)
    const closed = appointmentsHeld * close;
    // + reactivated old leads
    const reactivated = leads * APEX_GAINS.reactivationOfOldLeads * close;
    const revenue = (closed + reactivated) * value;
    return { contacted, appointmentsHeld, closed: closed + reactivated, revenue };
  }, [leads, close, value, noShow]);

  const monthlyDelta = apex.revenue - current.revenue;
  const annualDelta = monthlyDelta * 12;

  return (
    <section id="simulator" className="relative py-24 md:py-40 overflow-hidden">
      {/* Top gradient backdrop */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-72 bg-glow-spot opacity-60 pointer-events-none"
      />

      <div className="relative container-wide">
        <Reveal>
          <SectionLabel number="01">Revenue Recovery Simulator</SectionLabel>
          <h2 className="mt-4 font-display text-3xl sm:text-5xl md:text-6xl tracking-[-0.035em] max-w-4xl leading-[1.05]">
            You don&rsquo;t have a lead problem.
            <br />
            <span className="text-[var(--color-ink-tertiary)]">You have a </span>
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(120deg, #EF4444 0%, #F59E0B 60%, #3FA0FF 100%)" }}
            >
              leak problem
            </span>
            <span className="text-[var(--color-ink-tertiary)]">.</span>
          </h2>
          <p className="mt-5 max-w-2xl text-base md:text-lg text-[var(--color-ink-secondary)]">
            Slide the four levers below to your reality. We&rsquo;ll show you exactly where revenue is leaking — and what APEX recovers in the first 90 days.
          </p>
        </Reveal>

        <div className="mt-12 md:mt-16 grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-6 lg:gap-10">
          {/* INPUTS */}
          <Reveal delay={120}>
            <div className="rounded-3xl border border-[var(--color-border-subtle)] bg-[var(--color-bg-elevated)]/70 backdrop-blur-md p-6 md:p-8">
              {/* Industry presets */}
              <div className="flex items-center justify-between mb-4">
                <span className="eyebrow">Your inputs</span>
                <div className="flex items-center gap-1 text-xs text-[var(--color-ink-tertiary)]">
                  <span>Preset:</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-1.5 mb-7">
                {PRESETS.map((p) => (
                  <button
                    key={p.label}
                    onClick={() => {
                      setLeads(p.leads);
                      setClose(p.close);
                      setValue(p.value);
                      setNoShow(p.noShow);
                    }}
                    className="px-3 py-1.5 rounded-full border border-[var(--color-border-strong)] text-xs text-[var(--color-ink-secondary)] hover:text-[var(--color-ink-primary)] hover:border-[var(--color-brand-blue)] transition-colors"
                  >
                    {p.label}
                  </button>
                ))}
              </div>

              <div className="space-y-7">
                <Slider
                  label="Monthly leads"
                  helper="Inbound calls + form submissions"
                  value={leads}
                  min={20}
                  max={1500}
                  step={5}
                  onChange={setLeads}
                  format={(v) => v.toLocaleString()}
                />
                <Slider
                  label="Current close rate"
                  helper="Closed deals ÷ appointments held"
                  value={close}
                  min={0.05}
                  max={0.65}
                  step={0.01}
                  onChange={setClose}
                  format={(v) => `${(v * 100).toFixed(0)}%`}
                />
                <Slider
                  label="Avg project value"
                  helper="Average $ per closed deal"
                  value={value}
                  min={1000}
                  max={150000}
                  step={500}
                  onChange={setValue}
                  format={(v) => `$${v.toLocaleString()}`}
                />
                <Slider
                  label="No-show rate"
                  helper="% of booked appts that don't happen"
                  value={noShow}
                  min={0}
                  max={0.6}
                  step={0.01}
                  onChange={setNoShow}
                  format={(v) => `${(v * 100).toFixed(0)}%`}
                  accent="warn"
                />
              </div>
            </div>
          </Reveal>

          {/* RESULTS */}
          <Reveal delay={220}>
            <div className="grid gap-4">
              {/* Headline: monthly delta */}
              <div className="relative overflow-hidden rounded-3xl border border-[var(--color-brand-blue)]/40 bg-gradient-to-br from-[var(--color-bg-elevated)] to-[var(--color-brand-navy)] p-6 md:p-8">
                <div
                  aria-hidden
                  className="absolute inset-0 opacity-70"
                  style={{
                    background:
                      "radial-gradient(circle at 90% 0%, rgba(63,160,255,0.25), transparent 55%)",
                  }}
                />
                <div className="relative">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-success)] shadow-[0_0_8px_#22C55E]" />
                    <span className="text-[10px] uppercase tracking-[0.22em] font-semibold text-[var(--color-success)]">
                      Estimated monthly recovery
                    </span>
                  </div>
                  <div className="mt-3 font-mono tabular text-[40px] sm:text-5xl md:text-6xl font-bold leading-[0.95] text-[var(--color-ink-primary)]">
                    +<AnimatedDollar value={monthlyDelta} />
                  </div>
                  <div className="mt-2 text-sm text-[var(--color-ink-secondary)]">
                    Annualized:&nbsp;
                    <span className="font-mono tabular font-semibold text-[var(--color-brand-bright)]">
                      +<AnimatedDollar value={annualDelta} />
                    </span>
                  </div>
                </div>
              </div>

              {/* Comparison grid */}
              <div className="grid grid-cols-2 gap-4">
                <CompareCard
                  label="Current"
                  closed={current.closed}
                  revenue={current.revenue}
                  tone="muted"
                />
                <CompareCard
                  label="With APEX"
                  closed={apex.closed}
                  revenue={apex.revenue}
                  tone="brand"
                />
              </div>

              {/* Flow visualization */}
              <FlowComparison
                currentClose={current.closed}
                apexClose={apex.closed}
                leads={leads}
                reduced={!!reduced}
              />

              {/* CTA */}
              <a
                href="#contact"
                className="group inline-flex items-center justify-center gap-2 h-14 rounded-xl bg-[var(--color-brand-blue)] hover:bg-[var(--color-brand-bright)] text-white font-semibold transition-all hover:shadow-[0_0_28px_rgba(63,160,255,0.45)]"
              >
                Book a 30-min diagnostic call
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </a>
            </div>
          </Reveal>
        </div>

        <p className="mt-6 text-xs text-[var(--color-ink-tertiary)] max-w-3xl">
          Model based on aggregated APEX client baselines. Actual results vary by market, sales process, and lead source. The simulator estimates what speed-to-lead lifts (+18%), structured appointment booking (+22%), confirmation systems (−55% no-shows), and reactivation of dormant leads (+7%/mo) typically produce against your current operations.
        </p>
      </div>
    </section>
  );
}

/* -------------------- Sub-components -------------------- */

function Slider({
  label,
  helper,
  value,
  min,
  max,
  step,
  onChange,
  format,
  accent,
}: {
  label: string;
  helper?: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  format: (v: number) => string;
  accent?: "warn";
}) {
  const accentColor = accent === "warn" ? "#F59E0B" : "#3FA0FF";
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div>
      <div className="flex items-baseline justify-between mb-2">
        <div>
          <div className="text-sm font-semibold text-[var(--color-ink-primary)]">{label}</div>
          {helper && (
            <div className="text-[11px] text-[var(--color-ink-tertiary)] mt-0.5">{helper}</div>
          )}
        </div>
        <div
          className="font-mono tabular text-base md:text-lg font-bold"
          style={{ color: accentColor }}
        >
          {format(value)}
        </div>
      </div>
      <div className="relative h-8 flex items-center">
        <div
          className="absolute inset-x-0 h-1.5 rounded-full bg-[var(--color-bg-surface)]"
        />
        <div
          className="absolute h-1.5 rounded-full transition-[width] duration-100"
          style={{
            width: `${pct}%`,
            background: `linear-gradient(90deg, ${accentColor}88, ${accentColor})`,
            boxShadow: `0 0 12px ${accentColor}66`,
          }}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          aria-label={label}
          className="relative w-full appearance-none bg-transparent h-8 cursor-pointer
            [&::-webkit-slider-thumb]:appearance-none
            [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5
            [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white
            [&::-webkit-slider-thumb]:border-2
            [&::-webkit-slider-thumb]:border-[var(--color-brand-blue)]
            [&::-webkit-slider-thumb]:cursor-grab
            [&::-webkit-slider-thumb]:shadow-[0_0_0_4px_rgba(30,95,216,0.18),0_2px_8px_rgba(0,0,0,0.45)]
            [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5
            [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white
            [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-[var(--color-brand-blue)]
            [&::-moz-range-thumb]:cursor-grab"
        />
      </div>
    </div>
  );
}

function CompareCard({
  label,
  closed,
  revenue,
  tone,
}: {
  label: string;
  closed: number;
  revenue: number;
  tone: "muted" | "brand";
}) {
  const brand = tone === "brand";
  return (
    <div
      className={cn(
        "rounded-2xl border p-5 backdrop-blur-md transition-colors",
        brand
          ? "border-[var(--color-brand-bright)]/35 bg-[var(--color-brand-blue)]/10"
          : "border-[var(--color-border-subtle)] bg-[var(--color-bg-elevated)]/60"
      )}
    >
      <div
        className={cn(
          "text-[10px] uppercase tracking-[0.22em] font-semibold",
          brand ? "text-[var(--color-brand-bright)]" : "text-[var(--color-ink-tertiary)]"
        )}
      >
        {label}
      </div>
      <div className="mt-2">
        <div className="text-[11px] text-[var(--color-ink-tertiary)] mb-1">Closed / mo</div>
        <div className="font-mono tabular text-2xl font-bold text-[var(--color-ink-primary)]">
          <AnimatedNumber value={closed} decimals={0} />
        </div>
      </div>
      <div className="mt-3">
        <div className="text-[11px] text-[var(--color-ink-tertiary)] mb-1">Revenue / mo</div>
        <div
          className={cn(
            "font-mono tabular text-lg font-bold",
            brand ? "text-[var(--color-brand-bright)]" : "text-[var(--color-ink-secondary)]"
          )}
        >
          $<AnimatedNumber value={revenue} decimals={0} />
        </div>
      </div>
    </div>
  );
}

function FlowComparison({
  currentClose,
  apexClose,
  leads,
  reduced,
}: {
  currentClose: number;
  apexClose: number;
  leads: number;
  reduced: boolean;
}) {
  const currentPct = leads > 0 ? Math.min(100, (currentClose / leads) * 100) : 0;
  const apexPct = leads > 0 ? Math.min(100, (apexClose / leads) * 100) : 0;
  return (
    <div className="rounded-2xl border border-[var(--color-border-subtle)] bg-[var(--color-bg-elevated)]/60 p-5">
      <div className="eyebrow mb-3">Throughput · % of leads closed</div>
      <FlowBar label="Now"      pct={currentPct} color="#5A6B85" reduced={reduced} />
      <div className="h-2" />
      <FlowBar label="With APEX" pct={apexPct}   color="#3FA0FF" reduced={reduced} glow />
      <div className="mt-3 flex items-center justify-between text-[11px] text-[var(--color-ink-tertiary)]">
        <span>0%</span>
        <span>{leads.toLocaleString()} leads/mo</span>
      </div>
    </div>
  );
}

function FlowBar({
  label,
  pct,
  color,
  reduced,
  glow,
}: {
  label: string;
  pct: number;
  color: string;
  reduced: boolean;
  glow?: boolean;
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between mb-1.5">
        <span className="text-xs text-[var(--color-ink-secondary)]">{label}</span>
        <span className="text-xs font-mono tabular font-semibold" style={{ color }}>
          {pct.toFixed(1)}%
        </span>
      </div>
      <div className="relative h-3 rounded-full overflow-hidden bg-[var(--color-bg-deep)]">
        <motion.div
          initial={false}
          animate={{ width: `${pct}%` }}
          transition={{ duration: reduced ? 0 : 0.55, ease: ease.outQuart }}
          className="h-full rounded-full"
          style={{
            background: `linear-gradient(90deg, ${color}55, ${color})`,
            boxShadow: glow ? `0 0 16px ${color}88` : undefined,
          }}
        />
      </div>
    </div>
  );
}

function AnimatedNumber({ value, decimals = 0 }: { value: number; decimals?: number }) {
  const [display, setDisplay] = useState(value);
  const rafRef = useRef<number | null>(null);
  useEffect(() => {
    const from = display;
    const to = value;
    if (Math.abs(from - to) < 0.001) return;
    const start = performance.now();
    const dur = 600;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - p, 4);
      setDisplay(from + (to - from) * eased);
      if (p < 1) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);
  return (
    <>
      {decimals > 0
        ? display.toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
        : Math.round(display).toLocaleString()}
    </>
  );
}

function AnimatedDollar({ value }: { value: number }) {
  return (
    <>
      $<AnimatedNumber value={Math.max(0, value)} />
    </>
  );
}
