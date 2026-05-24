"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";

type Stage = {
  id: string;
  label: string;
  // conversion rate from previous stage (1.0 for first)
  rate: number;
  accent?: string;
};

const STAGES: Stage[] = [
  { id: "inbound",    label: "Inbound",    rate: 1.0,   accent: "#3FA0FF" },
  { id: "qualified",  label: "Qualified",  rate: 0.78,  accent: "#3FA0FF" },
  { id: "booked",     label: "Booked",     rate: 0.62,  accent: "#1E5FD8" },
  { id: "confirmed",  label: "Confirmed",  rate: 0.55,  accent: "#1E5FD8" },
  { id: "closed",     label: "Closed",     rate: 0.34,  accent: "#22C55E" },
];

// Cumulative monthly throughput target (used to compute initial values)
const MONTHLY_BASE = 480;

export function LivePipeline() {
  const prefersReduced = useReducedMotion();
  const [counts, setCounts] = useState<number[]>(() =>
    STAGES.map((s, i) => Math.round(MONTHLY_BASE * cumulativeRate(STAGES, i)))
  );
  const rafRef = useRef<number | null>(null);
  const lastBumpRef = useRef<number>(performance.now());

  // Counter increment: every ~2.4s a new "month tick" advances all counters by their stage proportion
  useEffect(() => {
    if (prefersReduced) return;
    const tick = (now: number) => {
      if (now - lastBumpRef.current > 2400) {
        lastBumpRef.current = now;
        setCounts((prev) =>
          prev.map((c, i) => c + Math.max(1, Math.round(8 * cumulativeRate(STAGES, i))))
        );
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [prefersReduced]);

  return (
    <div className="relative w-full">
      {/* Mobile: stacked. Desktop: horizontal flow. */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3 md:gap-0">
        {STAGES.map((stage, i) => (
          <Fragment key={stage.id}>
            <PipelineNode
              stage={stage}
              count={counts[i]}
              isFirst={i === 0}
              isLast={i === STAGES.length - 1}
              index={i}
            />
            {i < STAGES.length - 1 && (
              <PipelineConnector
                accent={STAGES[i + 1].accent ?? "#3FA0FF"}
                index={i}
                reduced={!!prefersReduced}
              />
            )}
          </Fragment>
        ))}
      </div>
    </div>
  );
}

function cumulativeRate(stages: Stage[], upToIndex: number) {
  let r = 1;
  for (let k = 0; k <= upToIndex; k++) r *= stages[k].rate;
  return r;
}

function PipelineNode({
  stage,
  count,
  index,
}: {
  stage: Stage;
  count: number;
  isFirst: boolean;
  isLast: boolean;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.4 + index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "relative flex-shrink-0 flex-1 md:flex-initial",
        "rounded-2xl border bg-[var(--color-bg-elevated)]/80 backdrop-blur-md",
        "px-4 py-4 md:px-5 md:py-5 min-w-0 md:min-w-[148px] md:max-w-[170px]"
      )}
      style={{
        borderColor: `${stage.accent}55`,
        boxShadow: `0 0 0 1px ${stage.accent}20, 0 12px 32px -16px ${stage.accent}40`,
      }}
    >
      {/* Pulse halo */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 0%, ${stage.accent}25, transparent 70%)`,
          animation: "pulse-glow 3.6s ease-in-out infinite",
          animationDelay: `${index * 0.4}s`,
        }}
      />
      <div className="relative">
        <div className="flex items-center gap-2">
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{
              background: stage.accent,
              boxShadow: `0 0 8px ${stage.accent}`,
            }}
          />
          <span
            className="text-[10px] uppercase tracking-[0.18em] font-semibold"
            style={{ color: stage.accent }}
          >
            {stage.label}
          </span>
        </div>
        <div className="mt-2 font-mono text-2xl md:text-3xl font-bold tabular text-[var(--color-ink-primary)] leading-none">
          <NumberRoll value={count} />
        </div>
        <div className="mt-1 text-[10px] text-[var(--color-ink-tertiary)]">/ mo</div>
      </div>
    </motion.div>
  );
}

function PipelineConnector({
  accent,
  index,
  reduced,
}: {
  accent: string;
  index: number;
  reduced: boolean;
}) {
  return (
    <div className="relative flex-shrink-0 md:flex-1 md:min-w-[40px] md:max-w-[96px] h-8 md:h-12 self-center md:self-auto w-full md:w-auto">
      {/* Track */}
      <div
        className="absolute inset-x-2 top-1/2 -translate-y-1/2 h-px md:h-px md:inset-y-1/2 md:translate-y-0"
        style={{
          background: `linear-gradient(90deg, transparent, ${accent}66, transparent)`,
        }}
      />
      {/* Mobile: vertical track */}
      <div
        className="md:hidden absolute left-1/2 -translate-x-1/2 inset-y-1 w-px"
        style={{
          background: `linear-gradient(180deg, transparent, ${accent}66, transparent)`,
        }}
      />
      {/* Flowing dots */}
      {!reduced && (
        <>
          {[0, 0.6, 1.2].map((d, i) => (
            <span
              key={i}
              className="hidden md:block absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full"
              style={{
                background: accent,
                boxShadow: `0 0 8px ${accent}`,
                left: "0%",
                animation: `flow-h 2.2s linear infinite`,
                animationDelay: `${index * 0.18 + d}s`,
                willChange: "transform, opacity",
              }}
            />
          ))}
          {[0, 0.8].map((d, i) => (
            <span
              key={`m${i}`}
              className="md:hidden absolute left-1/2 -translate-x-1/2 top-0 w-1.5 h-1.5 rounded-full"
              style={{
                background: accent,
                boxShadow: `0 0 8px ${accent}`,
                animation: `flow-v 1.8s linear infinite`,
                animationDelay: `${index * 0.15 + d}s`,
                willChange: "transform, opacity",
              }}
            />
          ))}
        </>
      )}
      <style jsx>{`
        @keyframes flow-h {
          0%   { transform: translateY(-50%) translateX(0); opacity: 0; }
          12%  { opacity: 1; }
          88%  { opacity: 1; }
          100% { transform: translateY(-50%) translateX(calc(100% + 16px)); opacity: 0; }
        }
        @keyframes flow-v {
          0%   { transform: translateX(-50%) translateY(0); opacity: 0; }
          15%  { opacity: 1; }
          85%  { opacity: 1; }
          100% { transform: translateX(-50%) translateY(32px); opacity: 0; }
        }
      `}</style>
    </div>
  );
}

function NumberRoll({ value }: { value: number }) {
  // Animate count smoothly between values
  const [display, setDisplay] = useState(value);
  const rafRef = useRef<number | null>(null);
  useEffect(() => {
    const start = display;
    const end = value;
    if (start === end) return;
    const duration = 700;
    const t0 = performance.now();
    const step = (now: number) => {
      const p = Math.min(1, (now - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 4);
      setDisplay(Math.round(start + (end - start) * eased));
      if (p < 1) rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);
  return <span>{display.toLocaleString()}</span>;
}
