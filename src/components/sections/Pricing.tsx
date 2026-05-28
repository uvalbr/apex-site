"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ease } from "@/lib/motion";
import { cn } from "@/lib/cn";

type Tier = {
  id: string;
  name: string;
  tagline: string;
  monthly: number;
  agents: number;
  managers: number;
  confirmers: number;
  features: string[];
};

const TIERS: Tier[] = [
  {
    id: "pilot",
    name: "Pilot Deployment",
    tagline: "60-day proof program",
    monthly: 8500,
    agents: 2,
    managers: 1,
    confirmers: 1,
    features: [
      "Full onboarding & implementation",
      "CRM workflow integration",
      "KPI tracking setup",
      "60-day initial deployment",
      "Performance review at day 30 & 60",
    ],
  },
  {
    id: "growth",
    name: "Growth Revenue Team",
    tagline: "Dedicated revenue ops department",
    monthly: 17500,
    agents: 5,
    managers: 1,
    confirmers: 1,
    features: [
      "Dedicated team manager",
      "CRM integration & maintenance",
      "Reporting dashboard",
      "KPI oversight & weekly reviews",
      "HR, accounting & legal support",
      "+$150–200 per qualified appointment",
      "10–15% revenue share on closed projects",
    ],
  },
  {
    id: "expansion",
    name: "Expansion Revenue Department",
    tagline: "Multi-channel revenue engine",
    monthly: 27500,
    agents: 10,
    managers: 1,
    confirmers: 2,
    features: [
      "Advanced KPI oversight",
      "Multi-source revenue ops management",
      "Full operational infrastructure",
      "Dedicated reporting analyst",
      "HR, accounting & legal support",
      "+$150–200 per qualified appointment",
      "10–15% revenue share on closed projects",
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise Revenue Division",
    tagline: "Full scale, multi-market",
    monthly: 33500,
    agents: 15,
    managers: 1,
    confirmers: 3,
    features: [
      "Enterprise operational management",
      "Advanced reporting systems",
      "Scalable staffing infrastructure",
      "Full revenue operations division",
      "HR, accounting & legal support",
      "+$150–200 per qualified appointment",
      "10–15% revenue share on closed projects",
    ],
  },
];

export function Pricing() {
  const [activeIdx, setActiveIdx] = useState(1); // Growth as default
  const active = TIERS[activeIdx];

  return (
    <section id="pricing" className="relative py-24 md:py-40">
      <div className="container-app">
        <Reveal>
          <SectionLabel number="04">Investment</SectionLabel>
          <h2 className="mt-4 font-display text-3xl sm:text-5xl md:text-6xl tracking-[-0.035em] max-w-3xl leading-[1.05]">
            Four tiers.{" "}
            <span className="text-[var(--color-ink-tertiary)]">One math.</span>
          </h2>
          <p className="mt-5 max-w-2xl text-base md:text-lg text-[var(--color-ink-secondary)]">
            Drag the slider. Watch the team, the deliverables, and the math reshape in real time.
          </p>
        </Reveal>

        {/* Tier slider */}
        <Reveal delay={120}>
          <div className="mt-14 md:mt-16 max-w-3xl mx-auto">
            <div className="grid grid-cols-4 gap-2 mb-5">
              {TIERS.map((t, i) => (
                <button
                  key={t.id}
                  onClick={() => setActiveIdx(i)}
                  className={cn(
                    "text-xs font-semibold py-2 transition-colors text-center",
                    activeIdx === i
                      ? "text-[var(--color-brand-bright)]"
                      : "text-[var(--color-ink-tertiary)] hover:text-[var(--color-ink-secondary)]"
                  )}
                >
                  {t.name.split(" ")[0]}
                </button>
              ))}
            </div>
            <div className="relative h-2 rounded-full bg-[var(--color-bg-surface)] overflow-hidden">
              <motion.div
                className="absolute h-full"
                style={{
                  background: "linear-gradient(90deg, #1E5FD8, #3FA0FF)",
                  boxShadow: "0 0 16px rgba(63,160,255,0.6)",
                }}
                initial={false}
                animate={{ width: `${((activeIdx + 1) / TIERS.length) * 100}%` }}
                transition={{ duration: 0.5, ease: ease.outQuart }}
              />
            </div>
            <input
              type="range"
              min={0}
              max={TIERS.length - 1}
              step={1}
              value={activeIdx}
              onChange={(e) => setActiveIdx(Number(e.target.value))}
              aria-label="Pricing tier"
              className="w-full h-6 -mt-4 appearance-none bg-transparent cursor-pointer
                [&::-webkit-slider-thumb]:appearance-none
                [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6
                [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white
                [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-[var(--color-brand-blue)]
                [&::-webkit-slider-thumb]:cursor-grab
                [&::-webkit-slider-thumb]:shadow-[0_0_0_6px_rgba(30,95,216,0.16),0_4px_12px_rgba(0,0,0,0.5)]
                [&::-moz-range-thumb]:w-6 [&::-moz-range-thumb]:h-6
                [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white
                [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-[var(--color-brand-blue)]"
            />
          </div>
        </Reveal>

        {/* Active tier card */}
        <Reveal delay={220}>
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: ease.outQuart }}
            className="mt-12 max-w-5xl mx-auto rounded-3xl border border-[var(--color-brand-blue)]/40 bg-gradient-to-br from-[var(--color-bg-elevated)] to-[var(--color-brand-navy)] overflow-hidden"
          >
            <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr]">
              <div className="p-6 md:p-10 border-b md:border-b-0 md:border-r border-[var(--color-border-subtle)]">
                <div className="eyebrow">{active.tagline}</div>
                <h3 className="mt-3 font-display text-3xl md:text-4xl tracking-tight">
                  {active.name}
                </h3>

                {/* Team viz */}
                <div className="mt-6">
                  <div className="eyebrow mb-3 text-[var(--color-ink-tertiary)]">Your team</div>
                  <TeamGrid
                    agents={active.agents}
                    managers={active.managers}
                    confirmers={active.confirmers}
                  />
                </div>

                <ul className="mt-7 space-y-2.5">
                  {active.features.map((f, i) => (
                    <motion.li
                      key={f}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + i * 0.04, duration: 0.4 }}
                      className="flex items-start gap-2.5 text-sm text-[var(--color-ink-primary)]"
                    >
                      <CheckIcon />
                      <span>{f}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              <div className="p-6 md:p-10 flex flex-col justify-between bg-[var(--color-bg-deep)]/40">
                <div>
                  <div className="eyebrow text-[var(--color-ink-tertiary)]">Monthly base</div>
                  <div className="mt-2 font-mono tabular text-4xl md:text-5xl font-bold leading-none">
                    $<AnimatedInt value={active.monthly} />
                  </div>
                  <div className="mt-1 text-xs text-[var(--color-ink-tertiary)]">USD / month · billed monthly</div>

                  {activeIdx > 0 && (
                    <div className="mt-7 space-y-3">
                      <Row label="Per qualified appointment" value="$150–200" />
                      <Row label="Revenue share on closed projects" value="10–15%" />
                    </div>
                  )}
                </div>

                <div className="mt-8">
                  <a
                    href="#contact"
                    className="inline-flex w-full items-center justify-center gap-2 h-14 rounded-xl bg-[var(--color-brand-blue)] hover:bg-[var(--color-brand-bright)] text-white font-semibold transition-all hover:shadow-[0_0_28px_rgba(63,160,255,0.45)]"
                  >
                    Discuss {active.name.split(" ")[0]} terms →
                  </a>
                  <p className="mt-3 text-[11px] text-[var(--color-ink-tertiary)] text-center">
                    Custom terms based on lead source, market & sales involvement.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}

function TeamGrid({
  agents,
  managers,
  confirmers,
}: {
  agents: number;
  managers: number;
  confirmers: number;
}) {
  const dots = [
    ...Array.from({ length: agents }, (_, i) => ({ key: `a${i}`, color: "#3FA0FF", role: "Agent" })),
    ...Array.from({ length: managers }, (_, i) => ({ key: `m${i}`, color: "#22C55E", role: "Mgr" })),
    ...Array.from({ length: confirmers }, (_, i) => ({ key: `c${i}`, color: "#F59E0B", role: "Conf" })),
  ];
  return (
    <div>
      <div className="flex flex-wrap gap-2 max-w-md">
        {dots.map((d, i) => (
          <motion.span
            key={d.key}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: i * 0.025, type: "spring", stiffness: 200, damping: 18 }}
            className="grid place-items-center w-9 h-9 rounded-full text-[10px] font-bold text-white"
            style={{
              background: `${d.color}22`,
              border: `1.5px solid ${d.color}`,
              color: d.color,
            }}
            title={d.role}
          >
            {d.role === "Agent" ? "A" : d.role === "Mgr" ? "M" : "C"}
          </motion.span>
        ))}
      </div>
      <div className="flex gap-4 mt-3 text-[11px] text-[var(--color-ink-tertiary)]">
        <span><span className="text-[#3FA0FF]">●</span> {agents} agents</span>
        <span><span className="text-[#22C55E]">●</span> {managers} mgr</span>
        <span><span className="text-[#F59E0B]">●</span> {confirmers} conf</span>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-3 py-2 border-b border-[var(--color-border-subtle)] last:border-0">
      <span className="text-xs text-[var(--color-ink-secondary)]">{label}</span>
      <span className="font-mono tabular text-sm font-semibold text-[var(--color-brand-bright)]">
        {value}
      </span>
    </div>
  );
}

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="mt-0.5 flex-shrink-0">
      <circle cx="12" cy="12" r="10" stroke="#3FA0FF" strokeWidth="1.5" opacity="0.4" />
      <path d="M8 12.5l2.5 2.5L16 9.5" stroke="#3FA0FF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function AnimatedInt({ value }: { value: number }) {
  return <span>{value.toLocaleString()}</span>;
}
