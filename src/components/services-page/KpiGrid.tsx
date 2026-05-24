"use client";

import { motion } from "framer-motion";
import { ease } from "@/lib/motion";
import type { Kpi } from "./data";

export function KpiGrid({ kpis }: { kpis: Kpi[] }) {
  return (
    <div className={`grid grid-cols-2 ${kpis.length === 4 ? "md:grid-cols-4" : "md:grid-cols-3"} gap-3`}>
      {kpis.map((k, i) => (
        <motion.div
          key={k.label}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.5, delay: i * 0.07, ease: ease.outQuart }}
          className="relative rounded-2xl border border-[var(--color-border-subtle)] bg-[var(--color-bg-elevated)]/60 backdrop-blur-md p-5 overflow-hidden group hover:border-[var(--color-brand-blue)] transition-colors"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -top-12 -right-12 w-28 h-28 rounded-full opacity-0 group-hover:opacity-100 blur-2xl transition-opacity"
            style={{
              background:
                k.tone === "success"
                  ? "radial-gradient(circle, rgba(34,197,94,0.35), transparent 70%)"
                  : k.tone === "danger"
                  ? "radial-gradient(circle, rgba(239,68,68,0.35), transparent 70%)"
                  : "radial-gradient(circle, rgba(63,160,255,0.35), transparent 70%)",
            }}
          />
          <div
            className="relative font-mono tabular text-2xl md:text-3xl font-bold leading-none"
            style={{
              color:
                k.tone === "success"
                  ? "var(--color-success)"
                  : k.tone === "danger"
                  ? "var(--color-danger)"
                  : "var(--color-ink-primary)",
            }}
          >
            {k.value}
          </div>
          <div className="relative mt-2 text-[10px] uppercase tracking-[0.22em] font-semibold text-[var(--color-ink-tertiary)] leading-tight">
            {k.label}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
