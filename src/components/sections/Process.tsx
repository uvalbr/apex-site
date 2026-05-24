"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ease } from "@/lib/motion";
import { cn } from "@/lib/cn";

type Step = {
  id: string;
  eyebrow: string;
  title: string;
  bullets: string[];
};

const STEPS: Step[] = [
  {
    id: "discovery",
    eyebrow: "Week 1",
    title: "Discovery & diagnostic",
    bullets: [
      "Audit current lead flow and CRM",
      "Map every leak in the funnel",
      "Lock KPI baselines and targets",
    ],
  },
  {
    id: "integration",
    eyebrow: "Week 2",
    title: "CRM & telephony integration",
    bullets: [
      "Connect your CRM, dialer, and calendar",
      "Build the routing and reporting backbone",
      "Document the workflow your team will run",
    ],
  },
  {
    id: "scripts",
    eyebrow: "Week 3",
    title: "Scripts & agent training",
    bullets: [
      "Industry-specific call frameworks built",
      "Agents trained on your service catalog",
      "Calibration calls with your sales lead",
    ],
  },
  {
    id: "softlaunch",
    eyebrow: "Week 4",
    title: "Soft launch",
    bullets: [
      "Live on a controlled slice of lead flow",
      "Daily QA review of every interaction",
      "Tighten scripts based on real objections",
    ],
  },
  {
    id: "ramp",
    eyebrow: "Weeks 5–8",
    title: "Full ramp",
    bullets: [
      "Scale to full inbound + outbound volume",
      "Weekly KPI review with ops manager",
      "Tune speed-to-lead and confirmation cadence",
    ],
  },
  {
    id: "review",
    eyebrow: "Day 60",
    title: "Performance review",
    bullets: [
      "Baseline vs. actual KPIs delivered",
      "Recovered revenue quantified",
      "Roadmap for the next 90 days",
    ],
  },
];

export function Process() {
  return (
    <section id="process" className="relative py-24 md:py-40">
      <div className="container-app">
        <Reveal>
          <SectionLabel number="03">Deployment</SectionLabel>
          <h2 className="mt-4 font-display text-3xl sm:text-5xl md:text-6xl tracking-[-0.035em] max-w-4xl leading-[1.05]">
            60 days from kickoff to{" "}
            <span className="text-[var(--color-ink-tertiary)]">measured revenue.</span>
          </h2>
          <p className="mt-5 max-w-2xl text-base md:text-lg text-[var(--color-ink-secondary)]">
            No vague onboarding. A defined eight-week deployment with named milestones,
            a real go-live, and a numbered performance review on day 60.
          </p>
        </Reveal>

        <div className="mt-14 md:mt-20">
          <Timeline />
        </div>
      </div>
    </section>
  );
}

function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeCount, setActiveCount] = useState(0);
  const stepRefs = useRef<Array<HTMLLIElement | null>>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setActiveCount(STEPS.length);
      return;
    }

    const observers: IntersectionObserver[] = [];
    const seen = new Set<number>();

    stepRefs.current.forEach((el, idx) => {
      if (!el) return;
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              seen.add(idx);
              setActiveCount((prev) => Math.max(prev, idx + 1));
            }
          });
        },
        { rootMargin: "0px 0px -25% 0px", threshold: 0.35 }
      );
      io.observe(el);
      observers.push(io);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const progress =
    STEPS.length <= 1 ? 0 : Math.min(activeCount, STEPS.length) / STEPS.length;

  return (
    <div ref={containerRef} className="relative">
      {/* ===== Desktop: horizontal connected timeline ===== */}
      <div className="hidden lg:block">
        {/* Connector track */}
        <div
          aria-hidden
          className="absolute top-[34px] left-0 right-0 h-px"
          style={{ background: "var(--color-border-subtle)" }}
        />
        <motion.div
          aria-hidden
          className="absolute top-[34px] left-0 h-px origin-left"
          style={{
            background:
              "linear-gradient(90deg, var(--color-brand-blue), var(--color-brand-bright))",
            boxShadow: "0 0 10px rgba(63,160,255,0.55)",
          }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: progress }}
          transition={{ duration: 0.8, ease: ease.outQuart }}
        />

        <ol className="relative grid grid-cols-6 gap-5">
          {STEPS.map((step, i) => {
            const active = i < activeCount;
            return (
              <li
                key={step.id}
                ref={(el) => {
                  stepRefs.current[i] = el;
                }}
              >
                <Node index={i} active={active} />
                <Card step={step} active={active} index={i} />
              </li>
            );
          })}
        </ol>
      </div>

      {/* ===== Mobile / tablet: vertical timeline ===== */}
      <div className="lg:hidden relative">
        {/* Vertical track */}
        <div
          aria-hidden
          className="absolute top-2 bottom-2 left-[14px] w-px"
          style={{ background: "var(--color-border-subtle)" }}
        />
        <motion.div
          aria-hidden
          className="absolute top-2 left-[14px] w-px origin-top"
          style={{
            background:
              "linear-gradient(180deg, var(--color-brand-blue), var(--color-brand-bright))",
            boxShadow: "0 0 10px rgba(63,160,255,0.55)",
            height: "calc(100% - 16px)",
          }}
          initial={{ scaleY: 0 }}
          animate={{ scaleY: progress }}
          transition={{ duration: 0.8, ease: ease.outQuart }}
        />

        <ol className="relative space-y-7">
          {STEPS.map((step, i) => {
            const active = i < activeCount;
            return (
              <li
                key={step.id}
                ref={(el) => {
                  stepRefs.current[i] = el;
                }}
                className="relative pl-12"
              >
                <span className="absolute left-0 top-1">
                  <Node index={i} active={active} compact />
                </span>
                <Card step={step} active={active} index={i} compact />
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}

function Node({
  index,
  active,
  compact = false,
}: {
  index: number;
  active: boolean;
  compact?: boolean;
}) {
  const size = compact ? 28 : 30;
  return (
    <div
      className={cn(
        "relative grid place-items-center rounded-full transition-colors duration-500",
        compact ? "" : "mx-auto mb-5"
      )}
      style={{
        width: size,
        height: size,
        background: active
          ? "var(--color-brand-bright)"
          : "var(--color-bg-surface)",
        border: `1.5px solid ${
          active ? "var(--color-brand-bright)" : "var(--color-border-strong)"
        }`,
        boxShadow: active
          ? "0 0 0 6px rgba(63,160,255,0.14), 0 0 22px rgba(63,160,255,0.45)"
          : "none",
      }}
    >
      <span
        className={cn(
          "font-mono text-[10px] font-bold tabular transition-colors",
          active
            ? "text-[var(--color-bg-deep)]"
            : "text-[var(--color-ink-tertiary)]"
        )}
      >
        {String(index + 1).padStart(2, "0")}
      </span>
    </div>
  );
}

function Card({
  step,
  active,
  index,
  compact = false,
}: {
  step: Step;
  active: boolean;
  index: number;
  compact?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={active ? { opacity: 1, y: 0 } : { opacity: 0.45, y: 0 }}
      transition={{ duration: 0.55, ease: ease.outQuart, delay: index * 0.04 }}
      className={cn(
        "rounded-2xl border bg-[var(--color-bg-elevated)]/70 backdrop-blur-sm transition-colors",
        active
          ? "border-[var(--color-brand-blue)]/55"
          : "border-[var(--color-border-subtle)]",
        compact ? "p-5" : "p-5"
      )}
    >
      <div
        className={cn(
          "font-mono text-[10px] font-bold tracking-[0.22em] uppercase transition-colors",
          active
            ? "text-[var(--color-brand-bright)]"
            : "text-[var(--color-ink-tertiary)]"
        )}
      >
        {step.eyebrow}
      </div>
      <h3
        className={cn(
          "mt-2 font-display tracking-[-0.02em] text-[var(--color-ink-primary)]",
          compact ? "text-lg" : "text-base xl:text-lg leading-snug"
        )}
      >
        {step.title}
      </h3>
      <ul className="mt-3 space-y-1.5">
        {step.bullets.map((b) => (
          <li
            key={b}
            className="flex items-start gap-2 text-[13px] leading-snug text-[var(--color-ink-secondary)]"
          >
            <span
              aria-hidden
              className={cn(
                "mt-[7px] w-1 h-1 rounded-full flex-shrink-0 transition-colors",
                active
                  ? "bg-[var(--color-brand-bright)]"
                  : "bg-[var(--color-ink-faint)]"
              )}
            />
            <span>{b}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
