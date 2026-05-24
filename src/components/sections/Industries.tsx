"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ease } from "@/lib/motion";
import { cn } from "@/lib/cn";

type Industry = {
  id: string;
  label: string;
  icon: string;
  projectValueLow: number;
  projectValueHigh: number;
  monthlyBookedLow: number;
  monthlyBookedHigh: number;
  insight: string;
  pain: string;
  shape: "house" | "fan" | "hammer" | "wave" | "building";
};

const INDUSTRIES: Industry[] = [
  {
    id: "roofing",
    label: "Roofing",
    icon: "▲",
    projectValueLow: 10000,
    projectValueHigh: 30000,
    monthlyBookedLow: 50,
    monthlyBookedHigh: 180,
    insight: "Storm season spikes mean speed-to-lead is everything. A 2-minute response window can 4x your contact rate vs. 5-minute.",
    pain: "Missed first-call peak window during weather events = revenue evaporates within 48 hours.",
    shape: "house",
  },
  {
    id: "hvac",
    label: "HVAC",
    icon: "◆",
    projectValueLow: 8000,
    projectValueHigh: 20000,
    monthlyBookedLow: 80,
    monthlyBookedHigh: 220,
    insight: "Same-day emergency calls + seasonal maintenance turnover. Confirmation systems alone recover 25-35% of lost revenue.",
    pain: "Service techs driving to no-shows in peak summer is the single largest hidden cost.",
    shape: "fan",
  },
  {
    id: "remodeling",
    label: "Remodeling",
    icon: "◈",
    projectValueLow: 20000,
    projectValueHigh: 100000,
    monthlyBookedLow: 30,
    monthlyBookedHigh: 120,
    insight: "Long sales cycle (8-12 weeks). Pipeline follow-up discipline = 2-3x close rate over 'set & forget'.",
    pain: "60% of remodel leads die in 'maybe next month' purgatory. They never get re-contacted.",
    shape: "hammer",
  },
  {
    id: "pool",
    label: "Pool & outdoor",
    icon: "◉",
    projectValueLow: 35000,
    projectValueHigh: 120000,
    monthlyBookedLow: 20,
    monthlyBookedHigh: 90,
    insight: "High-ticket, long consideration. Every lead deserves white-glove follow-up across 6-10 touches.",
    pain: "Generic 'we'll call you back' responses lose buyers to competitors with structured nurture.",
    shape: "wave",
  },
  {
    id: "gc",
    label: "General contractors",
    icon: "▣",
    projectValueLow: 15000,
    projectValueHigh: 250000,
    monthlyBookedLow: 25,
    monthlyBookedHigh: 150,
    insight: "Mixed-ticket portfolio. Lead scoring + intelligent routing prevents senior estimators wasting time on small jobs.",
    pain: "Unscored leads dumped on one estimator = bottleneck + lost high-value opportunities.",
    shape: "building",
  },
];

export function Industries() {
  const [active, setActive] = useState("hvac");
  const current = INDUSTRIES.find((i) => i.id === active) ?? INDUSTRIES[0];

  return (
    <section id="industries" className="relative py-24 md:py-40 bg-[var(--color-bg-elevated)]/30">
      {/* Subtle grid */}
      <div aria-hidden className="absolute inset-0 bg-grid opacity-50" />

      <div className="relative container-app">
        <Reveal>
          <SectionLabel number="03">Industries</SectionLabel>
          <h2 className="mt-4 font-display text-3xl sm:text-5xl md:text-6xl tracking-[-0.035em] max-w-4xl leading-[1.05]">
            Built for the math of{" "}
            <span className="text-[var(--color-ink-tertiary)]">construction.</span>
          </h2>
          <p className="mt-5 max-w-2xl text-base md:text-lg text-[var(--color-ink-secondary)]">
            Every vertical has its own revenue model, its own choke points, its own seasonality. Click an industry to see exactly where the leak is.
          </p>
        </Reveal>

        {/* Industry tabs */}
        <Reveal delay={120}>
          <div className="mt-12 flex flex-wrap gap-2 justify-center md:justify-start">
            {INDUSTRIES.map((ind) => {
              const isActive = ind.id === active;
              return (
                <button
                  key={ind.id}
                  onClick={() => setActive(ind.id)}
                  className={cn(
                    "relative px-5 py-2.5 rounded-full text-sm font-semibold transition-all",
                    isActive
                      ? "text-white bg-[var(--color-brand-blue)] shadow-[0_0_20px_rgba(63,160,255,0.35)]"
                      : "text-[var(--color-ink-secondary)] bg-[var(--color-bg-elevated)] border border-[var(--color-border-strong)] hover:text-[var(--color-ink-primary)] hover:border-[var(--color-brand-blue)]"
                  )}
                >
                  <span className="mr-2 opacity-80">{ind.icon}</span>
                  {ind.label}
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* Active panel */}
        <div className="mt-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5, ease: ease.outQuart }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-4"
            >
              <StatCard
                label="Avg project value"
                value={`$${(current.projectValueLow / 1000).toFixed(0)}K–$${(current.projectValueHigh / 1000).toFixed(0)}K`}
                helper="Per closed deal"
              />
              <StatCard
                label="Booked appointments / mo"
                value={`${current.monthlyBookedLow}–${current.monthlyBookedHigh}`}
                helper="Typical APEX client range"
                accent
              />
              <StatCard
                label="Operational priority"
                value={
                  current.id === "roofing"
                    ? "Speed-to-lead"
                    : current.id === "hvac"
                    ? "Confirmation"
                    : current.id === "remodeling"
                    ? "Pipeline nurture"
                    : current.id === "pool"
                    ? "Multi-touch follow-up"
                    : "Lead scoring"
                }
                helper="Biggest lever in this vertical"
              />

              <div className="lg:col-span-3 rounded-3xl border border-[var(--color-border-subtle)] bg-[var(--color-bg-elevated)]/60 backdrop-blur-md p-6 md:p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <div className="eyebrow mb-3 text-[var(--color-danger)]">The hidden leak</div>
                    <p className="text-base md:text-lg text-[var(--color-ink-primary)] leading-relaxed">
                      {current.pain}
                    </p>
                  </div>
                  <div>
                    <div className="eyebrow mb-3">How APEX plays it</div>
                    <p className="text-base md:text-lg text-[var(--color-ink-primary)] leading-relaxed">
                      {current.insight}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function StatCard({
  label,
  value,
  helper,
  accent,
}: {
  label: string;
  value: string;
  helper?: string;
  accent?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border p-5 backdrop-blur-md",
        accent
          ? "border-[var(--color-brand-bright)]/40 bg-[var(--color-brand-blue)]/10"
          : "border-[var(--color-border-subtle)] bg-[var(--color-bg-elevated)]/60"
      )}
    >
      <div className="eyebrow mb-2">{label}</div>
      <div
        className={cn(
          "font-mono tabular text-2xl md:text-3xl font-bold leading-none",
          accent ? "text-[var(--color-brand-bright)]" : "text-[var(--color-ink-primary)]"
        )}
      >
        {value}
      </div>
      {helper && (
        <div className="mt-2 text-xs text-[var(--color-ink-tertiary)]">{helper}</div>
      )}
    </div>
  );
}
