"use client";

import { motion } from "framer-motion";
import { Fragment } from "react";
import { ease } from "@/lib/motion";
import type { FlowStep } from "./data";

export function FlowDiagram({ steps, accent = "#3FA0FF" }: { steps: FlowStep[]; accent?: string }) {
  return (
    <div className="relative rounded-2xl border border-[var(--color-border-subtle)] bg-[var(--color-bg-deep)]/60 backdrop-blur-md p-5 md:p-7 overflow-hidden">
      {/* Decorative glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 -right-24 w-72 h-72 rounded-full opacity-30 blur-3xl"
        style={{ background: `radial-gradient(circle, ${accent}33, transparent 70%)` }}
      />
      <div className="relative flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <span className="relative flex w-1.5 h-1.5">
            <span
              className="absolute inset-0 rounded-full animate-ping opacity-75"
              style={{ background: "var(--color-success)" }}
            />
            <span
              className="relative w-1.5 h-1.5 rounded-full"
              style={{ background: "var(--color-success)" }}
            />
          </span>
          <span className="eyebrow">Live workflow</span>
        </div>
        <span className="hidden md:inline font-mono text-[10px] text-[var(--color-ink-tertiary)] tracking-wider">
          {steps.length} stages
        </span>
      </div>

      {/* Desktop: horizontal flow */}
      <div className="relative hidden md:flex items-stretch gap-0">
        {steps.map((step, i) => (
          <Fragment key={step.label}>
            <FlowNode step={step} index={i} accent={accent} />
            {i < steps.length - 1 && <FlowConnector index={i} accent={accent} />}
          </Fragment>
        ))}
      </div>

      {/* Mobile: vertical stacked */}
      <div className="md:hidden flex flex-col gap-0">
        {steps.map((step, i) => (
          <Fragment key={step.label}>
            <FlowNodeMobile step={step} index={i} accent={accent} />
            {i < steps.length - 1 && <FlowConnectorMobile accent={accent} />}
          </Fragment>
        ))}
      </div>
    </div>
  );
}

function FlowNode({ step, index, accent }: { step: FlowStep; index: number; accent: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.55, delay: 0.08 + index * 0.08, ease: ease.outQuart }}
      className="relative flex-1 min-w-0 flex flex-col items-center text-center px-2"
    >
      {/* Number dot */}
      <div
        className="relative z-10 w-9 h-9 rounded-full flex items-center justify-center font-mono text-[11px] font-bold tabular border"
        style={{
          background: "var(--color-bg-elevated)",
          borderColor: accent,
          color: accent,
          boxShadow: `0 0 16px ${accent}33`,
        }}
      >
        {String(index + 1).padStart(2, "0")}
      </div>
      <div className="mt-3 text-[13px] font-semibold text-[var(--color-ink-primary)] leading-tight">
        {step.label}
      </div>
      <div className="mt-1.5 text-[11px] text-[var(--color-ink-secondary)] leading-snug min-h-[32px]">
        {step.detail}
      </div>
      {step.time && (
        <div
          className="mt-2 inline-flex items-center gap-1 font-mono text-[10px] tabular tracking-wider"
          style={{ color: accent }}
        >
          <span className="w-1 h-1 rounded-full" style={{ background: accent }} />
          {step.time}
        </div>
      )}
    </motion.div>
  );
}

function FlowConnector({ index, accent }: { index: number; accent: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scaleX: 0 }}
      whileInView={{ opacity: 1, scaleX: 1 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.45, delay: 0.12 + index * 0.08, ease: ease.outQuart }}
      style={{ transformOrigin: "left center" }}
      className="relative flex-shrink-0 w-8 lg:w-12 self-start mt-[18px] flex items-center"
      aria-hidden
    >
      <div
        className="h-px w-full"
        style={{
          background: `linear-gradient(90deg, transparent 0%, ${accent}99 50%, transparent 100%)`,
        }}
      />
      <svg
        viewBox="0 0 8 8"
        className="absolute right-0 w-2 h-2"
        fill={accent}
        style={{ filter: `drop-shadow(0 0 4px ${accent}88)` }}
      >
        <path d="M 0 0 L 8 4 L 0 8 Z" />
      </svg>
    </motion.div>
  );
}

function FlowNodeMobile({
  step,
  index,
  accent,
}: {
  step: FlowStep;
  index: number;
  accent: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-5% 0px" }}
      transition={{ duration: 0.5, delay: index * 0.05, ease: ease.outQuart }}
      className="flex items-start gap-3"
    >
      <div
        className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-mono text-[10px] font-bold tabular border"
        style={{
          background: "var(--color-bg-elevated)",
          borderColor: accent,
          color: accent,
        }}
      >
        {String(index + 1).padStart(2, "0")}
      </div>
      <div className="flex-1 min-w-0 pb-1">
        <div className="flex items-baseline justify-between gap-3">
          <span className="text-sm font-semibold text-[var(--color-ink-primary)]">
            {step.label}
          </span>
          {step.time && (
            <span
              className="font-mono text-[10px] tabular tracking-wider flex-shrink-0"
              style={{ color: accent }}
            >
              {step.time}
            </span>
          )}
        </div>
        <div className="mt-1 text-xs text-[var(--color-ink-secondary)] leading-snug">
          {step.detail}
        </div>
      </div>
    </motion.div>
  );
}

function FlowConnectorMobile({ accent }: { accent: string }) {
  return (
    <div aria-hidden className="flex-shrink-0 ml-4 my-1 h-5 flex items-center">
      <div
        className="w-px h-full"
        style={{
          background: `linear-gradient(180deg, ${accent}99 0%, transparent 100%)`,
        }}
      />
    </div>
  );
}
