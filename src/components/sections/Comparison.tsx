"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ease } from "@/lib/motion";
import { cn } from "@/lib/cn";

/* ───────────────────────────────────────────────────────────────
 * Data — 4 columns x 11 rows of real B2B buyer concerns
 * ─────────────────────────────────────────────────────────────── */

type Mark = "yes" | "no" | "partial";

type Cell = {
  mark: Mark;
  note: string; // 3–6 word qualifier
};

type Row = {
  axis: string;
  detail: string; // tiny helper under axis
  apex: Cell;
  internal: Cell;
  bpo: Cell;
  va: Cell;
};

const COLS = [
  { id: "apex", label: "APEX", sub: "Revenue ops infrastructure" },
  { id: "internal", label: "Internal hire", sub: "1–3 CSRs in-house" },
  { id: "bpo", label: "Traditional BPO", sub: "Generic offshore call center" },
  { id: "va", label: "Generic VA", sub: "Single overseas freelancer" },
] as const;

const ROWS: Row[] = [
  {
    axis: "Fully-loaded monthly cost",
    detail: "All-in: salary, tax, benefits, software, mgmt",
    apex:     { mark: "yes",     note: "$8.5K–$33.5K flat" },
    internal: { mark: "no",      note: "$22K+/mo (3 CSRs)" },
    bpo:      { mark: "partial", note: "Cheap but per-minute" },
    va:       { mark: "partial", note: "Cheap, single point" },
  },
  {
    axis: "Time to live coverage",
    detail: "From signed agreement to first answered call",
    apex:     { mark: "yes",     note: "5 business days" },
    internal: { mark: "no",      note: "60–90 days, often longer" },
    bpo:      { mark: "partial", note: "2–4 weeks, scripted" },
    va:       { mark: "partial", note: "Days, but solo + raw" },
  },
  {
    axis: "Construction-vertical training",
    detail: "Knows your CRM, scope language, pricing logic",
    apex:     { mark: "yes",     note: "Built only for construction" },
    internal: { mark: "partial", note: "If you train them" },
    bpo:      { mark: "no",      note: "Generic, any industry" },
    va:       { mark: "no",      note: "Self-taught, inconsistent" },
  },
  {
    axis: "CRM-native integration",
    detail: "ServiceTitan, AccuLynx, JobTread, Buildertrend, etc.",
    apex:     { mark: "yes",     note: "Native two-way sync" },
    internal: { mark: "partial", note: "Manual data entry" },
    bpo:      { mark: "no",      note: "Email handoffs at best" },
    va:       { mark: "no",      note: "Copy-paste from notes" },
  },
  {
    axis: "24/7 + peak-surge coverage",
    detail: "Nights, weekends, hailstorm Saturday",
    apex:     { mark: "yes",     note: "24/7 + 2× surge ready" },
    internal: { mark: "no",      note: "Office hours only" },
    bpo:      { mark: "partial", note: "24/7 but generic script" },
    va:       { mark: "no",      note: "One person, one timezone" },
  },
  {
    axis: "No-show recovery system",
    detail: "Two-touch confirmation + redeployment",
    apex:     { mark: "yes",     note: "Built-in, 50%+ no-show cut" },
    internal: { mark: "partial", note: "If someone owns it" },
    bpo:      { mark: "no",      note: "Not in scope" },
    va:       { mark: "partial", note: "Manual, inconsistent" },
  },
  {
    axis: "Transparent KPI dashboard",
    detail: "Live: pickup time, conversion, no-shows, revenue",
    apex:     { mark: "yes",     note: "Live client portal" },
    internal: { mark: "partial", note: "Whatever you build" },
    bpo:      { mark: "partial", note: "Lagging monthly PDF" },
    va:       { mark: "no",      note: "Their word for it" },
  },
  {
    axis: "Pipeline nurture beyond first call",
    detail: "Re-engage stalled leads at week 2, 6, 12",
    apex:     { mark: "yes",     note: "9-touch sequences per vertical" },
    internal: { mark: "partial", note: "If staffed for it" },
    bpo:      { mark: "no",      note: "Inbound-only model" },
    va:       { mark: "no",      note: "Not scoped, not staffed" },
  },
  {
    axis: "Ownership of the process",
    detail: "Who designs the playbook, scripts, decision trees",
    apex:     { mark: "yes",     note: "We own + iterate it" },
    internal: { mark: "partial", note: "You build from scratch" },
    bpo:      { mark: "no",      note: "Their generic script wins" },
    va:       { mark: "no",      note: "Ad-hoc, undocumented" },
  },
  {
    axis: "Accountability model",
    detail: "Whose neck is on the line for the number",
    apex:     { mark: "yes",     note: "Revenue share on outcomes" },
    internal: { mark: "partial", note: "Performance review quarterly" },
    bpo:      { mark: "no",      note: "Billed per minute, period" },
    va:       { mark: "no",      note: "Hourly, no outcome tie" },
  },
  {
    axis: "Scalable from 1× to 5× volume",
    detail: "Hurricane Monday, Black Friday HVAC, spring rush",
    apex:     { mark: "yes",     note: "Pre-staged surge capacity" },
    internal: { mark: "no",      note: "Hire+train cycle = months" },
    bpo:      { mark: "partial", note: "Volume yes, quality no" },
    va:       { mark: "no",      note: "One person, hard ceiling" },
  },
];

/* ───────────────────────────────────────────────────────────────
 * Beats — short "how we beat each one" copy
 * ─────────────────────────────────────────────────────────────── */

const BEATS: Record<
  "internal" | "bpo" | "va",
  { title: string; body: string }
> = {
  internal: {
    title: "vs. Internal hire",
    body:
      "Three CSRs cost you $135–165K all-in per year, plus 40% turnover, plus no nights/weekends, plus no surge capacity. You get 60-hour weekday coverage for $35K more than our Growth tier — and you still own recruiting, training, ramp, performance management, and the playbook. We deliver 24/7 + surge + a battle-tested playbook on day 5.",
  },
  bpo: {
    title: "vs. Traditional BPO",
    body:
      "BPO call centers run on per-minute economics across hundreds of clients in unrelated industries. The agent on your call this morning was doing insurance claims yesterday. They use a generic script, they don't touch your CRM, they don't follow up at week 6. We are vertical-only — every operator has trained exclusively on construction CRMs, scope language, and your specific playbook.",
  },
  va: {
    title: "vs. Generic VA",
    body:
      "A single virtual assistant is a single point of failure. They get sick, they take vacation, they answer one channel at a time, they don't have backup. They are also raw labor — you supply the playbook, the training, the QA, the escalation rules, the dashboards. We are an operating department, not an extra pair of hands.",
  },
};

/* ───────────────────────────────────────────────────────────────
 * Component
 * ─────────────────────────────────────────────────────────────── */

export function Comparison() {
  const [openBeat, setOpenBeat] = useState<"internal" | "bpo" | "va" | null>(
    null
  );

  return (
    <section
      id="comparison"
      className="relative overflow-hidden py-24 md:py-40 bg-[var(--color-bg-elevated)]/30"
    >
      <div aria-hidden className="absolute inset-0 bg-grid opacity-50" />
      <div
        aria-hidden
        className="absolute top-1/4 right-0 w-[480px] h-[480px] opacity-40 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(63,160,255,0.18), transparent 65%)",
        }}
      />

      <div className="relative container-app">
        <Reveal>
          <SectionLabel number="07">Comparison</SectionLabel>
          <h2 className="mt-4 font-display text-3xl sm:text-5xl md:text-6xl tracking-[-0.035em] max-w-4xl leading-[1.05]">
            Stop comparing apples{" "}
            <span className="text-[var(--color-ink-tertiary)]">
              to call centers.
            </span>
          </h2>
          <p className="mt-5 max-w-2xl text-base md:text-lg text-[var(--color-ink-secondary)]">
            We get asked &ldquo;how are you different from a BPO / a VA / hiring
            two reps?&rdquo; constantly. Here is the honest answer, across the
            eleven axes that actually matter to a construction owner.
          </p>
        </Reveal>

        {/* ───────── Desktop / tablet table ───────── */}
        <Reveal delay={120}>
          <div className="hidden md:block mt-14">
            <div className="rounded-3xl border border-[var(--color-border-subtle)] bg-[var(--color-bg-elevated)]/60 backdrop-blur-md overflow-hidden">
              {/* Header row */}
              <div className="grid grid-cols-[1.5fr_repeat(4,1fr)] border-b border-[var(--color-border-subtle)]">
                <div className="p-5">
                  <div className="eyebrow text-[var(--color-ink-tertiary)]">
                    Axis of comparison
                  </div>
                </div>
                {COLS.map((c) => {
                  const isApex = c.id === "apex";
                  return (
                    <div
                      key={c.id}
                      className={cn(
                        "p-5 text-center border-l border-[var(--color-border-subtle)]",
                        isApex && "relative"
                      )}
                      style={
                        isApex
                          ? {
                              background:
                                "linear-gradient(180deg, rgba(30,95,216,0.18), rgba(30,95,216,0.04))",
                              boxShadow:
                                "inset 0 0 0 1px rgba(63,160,255,0.25)",
                            }
                          : undefined
                      }
                    >
                      <div
                        className={cn(
                          "font-display text-lg md:text-xl tracking-tight",
                          isApex
                            ? "text-[var(--color-brand-bright)]"
                            : "text-[var(--color-ink-primary)]"
                        )}
                      >
                        {c.label}
                      </div>
                      <div className="mt-1 text-[11px] text-[var(--color-ink-tertiary)] leading-snug">
                        {c.sub}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Data rows */}
              {ROWS.map((row, i) => (
                <div
                  key={row.axis}
                  className={cn(
                    "grid grid-cols-[1.5fr_repeat(4,1fr)] transition-colors",
                    i % 2 === 0
                      ? "bg-transparent"
                      : "bg-[var(--color-bg-deep)]/40",
                    "hover:bg-[var(--color-bg-surface)]/40"
                  )}
                >
                  <div className="p-5 border-t border-[var(--color-border-subtle)]">
                    <div className="text-sm md:text-base font-semibold text-[var(--color-ink-primary)]">
                      {row.axis}
                    </div>
                    <div className="mt-1 text-xs text-[var(--color-ink-tertiary)] leading-snug">
                      {row.detail}
                    </div>
                  </div>
                  <CellView cell={row.apex} isApex />
                  <CellView cell={row.internal} />
                  <CellView cell={row.bpo} />
                  <CellView cell={row.va} />
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* ───────── Mobile stack ───────── */}
        <Reveal delay={120}>
          <div className="md:hidden mt-10 space-y-5">
            {ROWS.map((row) => (
              <div
                key={row.axis}
                className="rounded-2xl border border-[var(--color-border-subtle)] bg-[var(--color-bg-elevated)]/60 backdrop-blur-md p-5"
              >
                <div className="text-sm font-semibold text-[var(--color-ink-primary)]">
                  {row.axis}
                </div>
                <div className="mt-1 text-[11px] text-[var(--color-ink-tertiary)] leading-snug">
                  {row.detail}
                </div>
                <div className="mt-4 space-y-2">
                  <MobileRow col="APEX" cell={row.apex} isApex />
                  <MobileRow col="Internal hire" cell={row.internal} />
                  <MobileRow col="Traditional BPO" cell={row.bpo} />
                  <MobileRow col="Generic VA" cell={row.va} />
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* ───────── How we beat each one (expandable) ───────── */}
        <Reveal delay={220}>
          <div className="mt-12 md:mt-16">
            <div className="eyebrow text-[var(--color-ink-tertiary)] mb-4">
              How we beat each one
            </div>
            <div className="grid md:grid-cols-3 gap-3">
              {(Object.keys(BEATS) as Array<keyof typeof BEATS>).map((key) => {
                const beat = BEATS[key];
                const isOpen = openBeat === key;
                return (
                  <button
                    key={key}
                    onClick={() => setOpenBeat(isOpen ? null : key)}
                    aria-expanded={isOpen}
                    className={cn(
                      "text-left rounded-2xl border p-5 transition-all",
                      "backdrop-blur-md",
                      isOpen
                        ? "border-[var(--color-brand-bright)]/50 bg-[var(--color-brand-blue)]/10"
                        : "border-[var(--color-border-subtle)] bg-[var(--color-bg-elevated)]/60 hover:border-[var(--color-brand-blue)]/40"
                    )}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="font-display text-base md:text-lg tracking-tight">
                        {beat.title}
                      </div>
                      <span
                        className={cn(
                          "text-[var(--color-brand-bright)] text-lg transition-transform",
                          isOpen ? "rotate-45" : "rotate-0"
                        )}
                        aria-hidden
                      >
                        +
                      </span>
                    </div>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease: ease.outQuart }}
                          className="overflow-hidden"
                        >
                          <p className="pt-3 text-sm leading-relaxed text-[var(--color-ink-secondary)]">
                            {beat.body}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </button>
                );
              })}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ───────────────────────── Sub-components ───────────────────────── */

function CellView({ cell, isApex }: { cell: Cell; isApex?: boolean }) {
  return (
    <div
      className={cn(
        "p-5 border-t border-l border-[var(--color-border-subtle)] flex flex-col items-center text-center gap-1.5"
      )}
      style={
        isApex
          ? {
              background:
                "linear-gradient(180deg, rgba(30,95,216,0.10), rgba(30,95,216,0.02))",
              boxShadow: "inset 1px 0 0 rgba(63,160,255,0.18), inset -1px 0 0 rgba(63,160,255,0.18)",
            }
          : undefined
      }
    >
      <MarkGlyph mark={cell.mark} highlight={isApex} />
      <div
        className={cn(
          "text-[11px] leading-snug",
          isApex
            ? "text-[var(--color-brand-bright)] font-semibold"
            : "text-[var(--color-ink-secondary)]"
        )}
      >
        {cell.note}
      </div>
    </div>
  );
}

function MobileRow({
  col,
  cell,
  isApex,
}: {
  col: string;
  cell: Cell;
  isApex?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex items-center justify-between gap-3 py-2.5 px-3 rounded-lg",
        isApex
          ? "bg-[var(--color-brand-blue)]/10 border border-[var(--color-brand-bright)]/30"
          : "bg-[var(--color-bg-deep)]/40"
      )}
    >
      <div className="flex items-center gap-2.5 min-w-0">
        <MarkGlyph mark={cell.mark} highlight={isApex} small />
        <div
          className={cn(
            "text-xs font-semibold flex-shrink-0",
            isApex
              ? "text-[var(--color-brand-bright)]"
              : "text-[var(--color-ink-primary)]"
          )}
        >
          {col}
        </div>
      </div>
      <div
        className={cn(
          "text-[11px] text-right leading-snug",
          isApex
            ? "text-[var(--color-brand-bright)]"
            : "text-[var(--color-ink-secondary)]"
        )}
      >
        {cell.note}
      </div>
    </div>
  );
}

function MarkGlyph({
  mark,
  highlight,
  small,
}: {
  mark: Mark;
  highlight?: boolean;
  small?: boolean;
}) {
  const size = small ? 16 : 22;
  const stroke = small ? 2 : 2.2;

  if (mark === "yes") {
    const color = highlight ? "#3FA0FF" : "#22C55E";
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        aria-label="Yes"
        style={
          highlight
            ? { filter: "drop-shadow(0 0 8px rgba(63,160,255,0.6))" }
            : undefined
        }
      >
        <circle
          cx="12"
          cy="12"
          r="10"
          stroke={color}
          strokeWidth="1.5"
          opacity={highlight ? 0.5 : 0.35}
        />
        <path
          d="M7.5 12.5l3 3L17 9"
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (mark === "no") {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-label="No">
        <circle cx="12" cy="12" r="10" stroke="#EF4444" strokeWidth="1.5" opacity="0.35" />
        <path
          d="M8.5 8.5l7 7M15.5 8.5l-7 7"
          stroke="#EF4444"
          strokeWidth={stroke}
          strokeLinecap="round"
        />
      </svg>
    );
  }

  // partial
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-label="Partial">
      <circle cx="12" cy="12" r="10" stroke="#F59E0B" strokeWidth="1.5" opacity="0.35" />
      <path
        d="M7 12h10"
        stroke="#F59E0B"
        strokeWidth={stroke}
        strokeLinecap="round"
      />
    </svg>
  );
}
