"use client";

import { motion } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";
import { ease } from "@/lib/motion";
import { FlowDiagram } from "./FlowDiagram";
import { KpiGrid } from "./KpiGrid";
import type { ServiceDeep } from "./data";

export function ServiceSection({ service, index }: { service: ServiceDeep; index: number }) {
  const isEven = index % 2 === 0;
  return (
    <section
      id={service.id}
      className="relative scroll-mt-28 py-20 md:py-32 border-b border-[var(--color-border-subtle)] last:border-b-0"
    >
      {/* Subtle side glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div
          className="absolute w-[600px] h-[600px] rounded-full opacity-25 blur-3xl"
          style={{
            top: "10%",
            [isEven ? "left" : "right"]: "-200px",
            background:
              "radial-gradient(circle, rgba(30,95,216,0.35), transparent 70%)",
          }}
        />
      </div>

      <div className="relative container-app">
        {/* Header row */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8 lg:gap-12 items-start">
          <Reveal>
            <div className="flex items-center gap-3">
              <span className="w-8 h-px bg-[var(--color-brand-bright)]" />
              <span className="eyebrow">{service.eyebrow}</span>
              <span className="font-mono text-[10px] text-[var(--color-ink-tertiary)] tracking-wider">
                / {service.number}
              </span>
            </div>
            <h2 className="mt-5 font-display text-3xl sm:text-5xl md:text-6xl tracking-[-0.035em] leading-[1.02] max-w-3xl">
              {service.title}
            </h2>
            <p className="mt-5 max-w-2xl text-base md:text-lg text-[var(--color-ink-secondary)] leading-relaxed">
              {service.sub}
            </p>
          </Reveal>

          {/* Giant number marker */}
          <Reveal delay={120}>
            <div className="hidden lg:flex justify-end">
              <motion.div
                initial={{ opacity: 0, scale: 0.92 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-15% 0px" }}
                transition={{ duration: 0.7, ease: ease.outExpo }}
                className="relative"
              >
                <div
                  aria-hidden
                  className="font-display tabular text-[180px] xl:text-[220px] leading-none font-extrabold select-none"
                  style={{
                    background:
                      "linear-gradient(160deg, rgba(63,160,255,0.18) 0%, rgba(30,95,216,0.05) 100%)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                    WebkitTextStroke: "1px rgba(63,160,255,0.18)",
                  }}
                >
                  {service.number}
                </div>
              </motion.div>
            </div>
          </Reveal>
        </div>

        {/* Flow diagram */}
        <Reveal delay={160}>
          <div className="mt-12 md:mt-16">
            <FlowDiagram steps={service.flow} />
          </div>
        </Reveal>

        {/* Deliverables + KPIs */}
        <div className="mt-10 md:mt-14 grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8 lg:gap-12 items-start">
          {/* Deliverables */}
          <Reveal delay={120}>
            <div>
              <div className="eyebrow mb-4">What we deliver</div>
              <ul className="space-y-3">
                {service.deliverables.map((d, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-5% 0px" }}
                    transition={{
                      duration: 0.45,
                      delay: 0.04 + i * 0.04,
                      ease: ease.outQuart,
                    }}
                    className="group relative flex items-start gap-3 rounded-xl border border-[var(--color-border-subtle)] bg-[var(--color-bg-elevated)]/40 backdrop-blur-md p-4 hover:border-[var(--color-brand-blue)] hover:bg-[var(--color-bg-elevated)]/70 transition-colors"
                  >
                    <span
                      aria-hidden
                      className="flex-shrink-0 mt-1 font-mono text-[10px] font-bold tabular text-[var(--color-brand-bright)] tracking-wider"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-sm md:text-[15px] text-[var(--color-ink-primary)] leading-relaxed">
                      {d}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* Right column: KPIs + anti-positioning */}
          <Reveal delay={200}>
            <div className="lg:sticky lg:top-28 space-y-6">
              <div>
                <div className="eyebrow mb-4">Outcome metrics</div>
                <KpiGrid kpis={service.kpis} />
              </div>

              <div className="relative rounded-2xl border border-[var(--color-border-subtle)] bg-[var(--color-bg-deep)]/70 backdrop-blur-md p-5">
                <div
                  aria-hidden
                  className="absolute -top-px right-6 w-16 h-1"
                  style={{
                    background: "var(--color-danger)",
                    clipPath: "polygon(0 0, 100% 0, 90% 100%, 10% 100%)",
                  }}
                />
                <div className="flex items-center gap-2 mb-3">
                  <span className="font-mono text-[10px] font-bold tabular text-[var(--color-danger)] tracking-[0.22em] uppercase">
                    What it isn&rsquo;t
                  </span>
                </div>
                <p className="text-sm text-[var(--color-ink-secondary)] leading-relaxed">
                  {service.notIt}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
