"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ease } from "@/lib/motion";
import { cn } from "@/lib/cn";

type Service = {
  id: string;
  number: string;
  title: string;
  pitch: string;
  bullets: string[];
  outcome: string;
};

const SERVICES: Service[] = [
  {
    id: "inbound",
    number: "01",
    title: "Inbound revenue ops",
    pitch: "We answer every lead within seconds — not minutes — during operational hours.",
    bullets: [
      "Inbound call answering",
      "Web lead response",
      "Lead qualification",
      "Appointment booking",
      "Calendar coordination",
      "Missed call recovery",
    ],
    outcome: "Convert inbound demand into booked opportunities as quickly as possible.",
  },
  {
    id: "outbound",
    number: "02",
    title: "Outbound revenue generation",
    pitch: "Your CRM is full of leads that didn't close the first time. We reactivate them.",
    bullets: [
      "Lead reactivation campaigns",
      "Missed estimate follow-up",
      "Old lead recovery",
      "Re-engagement sequences",
      "Pipeline follow-up",
      "Targeted outbound prospecting",
    ],
    outcome: "Monetize leads that would otherwise sit dormant inside your CRM.",
  },
  {
    id: "confirmation",
    number: "03",
    title: "Appointment confirmation",
    pitch: "Cut your no-show rate in half. Sales reps stop driving to ghost appointments.",
    bullets: [
      "SMS confirmation workflows",
      "Phone confirmation workflows",
      "Attendance verification",
      "Appointment reminders",
      "Rebooking support",
      "Same-day confirmations",
    ],
    outcome: "Increase completed appointments while reducing wasted calendar time.",
  },
  {
    id: "crm",
    number: "04",
    title: "CRM & pipeline management",
    pitch: "Pipeline you can actually trust. Every lead tracked, every stage updated.",
    bullets: [
      "CRM maintenance",
      "Lead tracking",
      "Pipeline status updates",
      "Appointment tracking",
      "Reporting dashboards",
      "Revenue opportunity tracking",
    ],
    outcome: "Operational visibility across the entire lead lifecycle.",
  },
  {
    id: "reporting",
    number: "05",
    title: "KPI reporting & oversight",
    pitch: "Numbers that matter, not vanity metrics. Built on revenue outcomes, not call counts.",
    bullets: [
      "Speed-to-lead",
      "Lead contact rate",
      "Appointment booking rate",
      "Appointment confirmation rate",
      "No-show reduction",
      "Pipeline activity",
    ],
    outcome: "We measure what produces revenue, not what looks busy.",
  },
];

export function Services() {
  const [active, setActive] = useState<string>("inbound");
  const current = SERVICES.find((s) => s.id === active) ?? SERVICES[0];

  return (
    <section id="services" className="relative py-24 md:py-40">
      <div className="container-app">
        <Reveal>
          <SectionLabel number="02">Core services</SectionLabel>
          <h2 className="mt-4 font-display text-3xl sm:text-5xl md:text-6xl tracking-[-0.035em] max-w-3xl leading-[1.05]">
            Five systems.{" "}
            <span className="text-[var(--color-ink-tertiary)]">One operational backbone.</span>
          </h2>
          <p className="mt-5 max-w-2xl text-base md:text-lg text-[var(--color-ink-secondary)]">
            We don&rsquo;t sell agents. We build and run the revenue operations infrastructure that turns lead investment into closed projects.
          </p>
        </Reveal>

        <div className="mt-14 md:mt-20 grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8 lg:gap-14">
          {/* Service tabs */}
          <Reveal delay={120}>
            <div className="flex lg:flex-col gap-1 overflow-x-auto lg:overflow-visible no-scrollbar -mx-6 px-6 lg:mx-0 lg:px-0">
              {SERVICES.map((s) => {
                const isActive = s.id === active;
                return (
                  <button
                    key={s.id}
                    onClick={() => setActive(s.id)}
                    className={cn(
                      "relative flex-shrink-0 lg:flex-shrink text-left rounded-xl px-4 py-4 transition-colors",
                      "border lg:border-0 lg:border-l-2",
                      isActive
                        ? "lg:border-[var(--color-brand-bright)] bg-[var(--color-bg-elevated)] border-[var(--color-brand-bright)]"
                        : "lg:border-[var(--color-border-subtle)] border-[var(--color-border-subtle)] hover:bg-[var(--color-bg-elevated)]/60"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={cn(
                          "font-mono text-[11px] font-bold tabular",
                          isActive ? "text-[var(--color-brand-bright)]" : "text-[var(--color-ink-tertiary)]"
                        )}
                      >
                        {s.number}
                      </span>
                      <span
                        className={cn(
                          "text-sm font-semibold whitespace-nowrap lg:whitespace-normal",
                          isActive ? "text-[var(--color-ink-primary)]" : "text-[var(--color-ink-secondary)]"
                        )}
                      >
                        {s.title}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </Reveal>

          {/* Active content */}
          <Reveal delay={240}>
            <div className="relative rounded-3xl border border-[var(--color-border-subtle)] bg-[var(--color-bg-elevated)]/60 backdrop-blur-md p-6 md:p-10 min-h-[420px]">
              {/* Decorative chevron stripe */}
              <div
                aria-hidden
                className="absolute -top-px right-10 w-20 h-1 bg-[var(--color-brand-bright)]"
                style={{
                  clipPath: "polygon(0 0, 100% 0, 90% 100%, 10% 100%)",
                }}
              />
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.45, ease: ease.outQuart }}
                >
                  <div className="font-mono text-xs text-[var(--color-brand-bright)] tracking-[0.18em]">
                    {current.number} · Service
                  </div>
                  <h3 className="mt-3 font-display text-2xl md:text-4xl tracking-[-0.025em] text-[var(--color-ink-primary)]">
                    {current.title}
                  </h3>
                  <p className="mt-3 text-base md:text-lg text-[var(--color-ink-secondary)] max-w-2xl">
                    {current.pitch}
                  </p>

                  <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {current.bullets.map((b, i) => (
                      <motion.div
                        key={b}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.08 + i * 0.035, duration: 0.4, ease: ease.outQuart }}
                        className="flex items-start gap-2.5 text-sm text-[var(--color-ink-primary)]"
                      >
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-[var(--color-brand-bright)] flex-shrink-0" />
                        <span>{b}</span>
                      </motion.div>
                    ))}
                  </div>

                  <div className="mt-8 pt-6 border-t border-[var(--color-border-subtle)]">
                    <div className="eyebrow mb-2">Outcome</div>
                    <p className="text-sm md:text-base text-[var(--color-ink-primary)] max-w-xl">
                      {current.outcome}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
