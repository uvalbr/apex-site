"use client";

import { useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";

type Kpi = {
  label: string;
  before: number;
  after: number;
  unit: string;
  better: "lower" | "higher";
  hint: string;
};

const KPIS: Kpi[] = [
  { label: "Speed to lead",             before: 17.4, after: 1.8,  unit: "min",  better: "lower",  hint: "1st contact attempt" },
  { label: "Lead contact rate",         before: 54,   after: 88,   unit: "%",    better: "higher", hint: "Reached vs total leads" },
  { label: "Appointment booking rate",  before: 41,   after: 67,   unit: "%",    better: "higher", hint: "Booked vs reached" },
  { label: "Confirmation rate",         before: 38,   after: 91,   unit: "%",    better: "higher", hint: "Appts confirmed pre-visit" },
  { label: "No-show rate",              before: 32,   after: 9,    unit: "%",    better: "lower",  hint: "Booked but didn't show" },
  { label: "Pipeline reactivation",     before: 2,    after: 14,   unit: "%/mo", better: "higher", hint: "Old leads revived monthly" },
];

export function KpiDashboard() {
  return (
    <section className="relative py-24 md:py-40 bg-[var(--color-bg-elevated)]/30">
      <div aria-hidden className="absolute inset-0 bg-grid opacity-40" />
      <div className="relative container-app">
        <Reveal>
          <SectionLabel number="05">Performance metrics</SectionLabel>
          <h2 className="mt-4 font-display text-3xl sm:text-5xl md:text-6xl tracking-[-0.035em] max-w-3xl leading-[1.05]">
            We measure what produces revenue.{" "}
            <span className="text-[var(--color-ink-tertiary)]">Not what looks busy.</span>
          </h2>
          <p className="mt-5 max-w-2xl text-base md:text-lg text-[var(--color-ink-secondary)]">
            Average shifts across our active client portfolio after the first 90 operational days.
          </p>
        </Reveal>

        <div className="mt-14 md:mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {KPIS.map((k, i) => (
            <Reveal key={k.label} delay={i * 90}>
              <KpiCard kpi={k} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function KpiCard({ kpi }: { kpi: Kpi }) {
  const ref = useRef<HTMLDivElement>(null);
  const [animated, setAnimated] = useState(false);
  const [displayed, setDisplayed] = useState(kpi.before);
  const isImprovement = kpi.better === "higher" ? kpi.after > kpi.before : kpi.after < kpi.before;
  const deltaPct =
    kpi.before === 0
      ? 0
      : Math.round(((kpi.after - kpi.before) / kpi.before) * 100);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplayed(kpi.after);
      setAnimated(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !animated) {
            setAnimated(true);
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [animated, kpi.after]);

  useEffect(() => {
    if (!animated) return;
    const start = performance.now();
    const dur = 1100;
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplayed(kpi.before + (kpi.after - kpi.before) * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [animated, kpi.before, kpi.after]);

  // For sparkline-ish bar
  const sparkPct = Math.min(100, ((displayed - kpi.before) / (kpi.after - kpi.before)) * 100);

  return (
    <div
      ref={ref}
      className="group rounded-2xl border border-[var(--color-border-subtle)] bg-[var(--color-bg-elevated)]/60 backdrop-blur-md p-5 md:p-6 hover:border-[var(--color-brand-blue)] transition-colors"
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="eyebrow">{kpi.label}</div>
          <div className="text-[11px] text-[var(--color-ink-tertiary)] mt-0.5">{kpi.hint}</div>
        </div>
        <span
          className="font-mono text-[10px] font-bold tabular px-2 py-1 rounded-full"
          style={{
            color: isImprovement ? "#22C55E" : "#EF4444",
            background: isImprovement ? "rgba(34,197,94,0.1)" : "rgba(239,68,68,0.1)",
          }}
        >
          {isImprovement ? "↓" : "↑"} {Math.abs(deltaPct)}%
        </span>
      </div>

      <div className="flex items-baseline gap-2">
        <div className="font-mono tabular text-3xl md:text-4xl font-bold text-[var(--color-ink-primary)] leading-none">
          {kpi.unit === "%" || kpi.unit === "%/mo"
            ? Math.round(displayed)
            : displayed.toFixed(1)}
        </div>
        <div className="text-sm text-[var(--color-ink-secondary)]">{kpi.unit}</div>
      </div>

      {/* Progress bar from before → after */}
      <div className="mt-5">
        <div className="flex items-center justify-between text-[10px] text-[var(--color-ink-tertiary)] mb-1.5">
          <span className="font-mono">
            {kpi.unit === "%" || kpi.unit === "%/mo" ? Math.round(kpi.before) : kpi.before.toFixed(1)}
            {kpi.unit}
          </span>
          <span className="font-mono text-[var(--color-brand-bright)]">
            {kpi.unit === "%" || kpi.unit === "%/mo" ? Math.round(kpi.after) : kpi.after.toFixed(1)}
            {kpi.unit}
          </span>
        </div>
        <div className="relative h-1 rounded-full bg-[var(--color-bg-deep)] overflow-hidden">
          <div
            className="absolute inset-y-0 left-0 rounded-full transition-[width]"
            style={{
              width: `${Math.max(0, Math.min(100, sparkPct))}%`,
              background: "linear-gradient(90deg, #1E5FD8, #3FA0FF)",
              boxShadow: "0 0 8px rgba(63,160,255,0.6)",
              transitionDuration: "1100ms",
            }}
          />
        </div>
      </div>
    </div>
  );
}
