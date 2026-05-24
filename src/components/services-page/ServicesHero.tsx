"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ease } from "@/lib/motion";

export function ServicesHero() {
  return (
    <section className="relative isolate overflow-hidden border-b border-[var(--color-border-subtle)]">
      {/* Spine gradient */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(30,95,216,0.28), transparent 70%), radial-gradient(circle at 80% 100%, rgba(63,160,255,0.10), transparent 50%), linear-gradient(180deg, #050B1A 0%, #0A1428 70%, #050B1A 100%)",
        }}
      />
      <div aria-hidden className="absolute inset-0 bg-grid pointer-events-none" />

      <div className="relative container-app pt-32 md:pt-44 pb-20 md:pb-28">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: ease.outQuart }}
          className="flex items-center gap-3"
        >
          <span className="w-8 h-px bg-[var(--color-brand-bright)]" />
          <span className="eyebrow">Services</span>
          <span className="font-mono text-[10px] text-[var(--color-ink-tertiary)] tracking-wider">
            / 05 systems
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.1, ease: ease.outExpo }}
          className="mt-6 md:mt-8 font-display text-[40px] sm:text-6xl md:text-[80px] leading-[0.98] tracking-[-0.035em] max-w-4xl"
        >
          The five systems that run your{" "}
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage:
                "linear-gradient(120deg, #3FA0FF 0%, #1E5FD8 50%, #D9E6FF 100%)",
            }}
          >
            revenue operation.
          </span>
        </motion.h1>

        {/* Sub */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35, ease: ease.outQuart }}
          className="mt-6 md:mt-8 max-w-3xl text-base md:text-xl text-[var(--color-ink-secondary)] leading-relaxed"
        >
          Inbound answering. Outbound revenue generation. Confirmation. CRM discipline. KPI oversight.{" "}
          <span className="text-[var(--color-ink-primary)] font-medium">
            Built as one connected backbone
          </span>{" "}
          — not five disconnected vendors you have to coordinate yourself.
        </motion.p>

        {/* Index strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55, ease: ease.outQuart }}
          className="mt-10 md:mt-14 grid grid-cols-2 md:grid-cols-5 gap-2 md:gap-3 max-w-5xl"
        >
          {INDEX.map((item) => (
            <Link
              key={item.id}
              href={`#${item.id}`}
              className="group relative rounded-xl border border-[var(--color-border-subtle)] bg-[var(--color-bg-elevated)]/50 backdrop-blur-md p-4 hover:border-[var(--color-brand-bright)] hover:bg-[var(--color-bg-elevated)] transition-all"
            >
              <div className="font-mono text-[10px] font-bold tabular text-[var(--color-brand-bright)] tracking-wider">
                {item.number}
              </div>
              <div className="mt-2 text-sm font-semibold text-[var(--color-ink-primary)] leading-tight">
                {item.label}
              </div>
              <div
                aria-hidden
                className="absolute right-3 bottom-3 text-[var(--color-ink-tertiary)] group-hover:text-[var(--color-brand-bright)] group-hover:translate-x-0.5 transition-all text-sm"
              >
                ↓
              </div>
            </Link>
          ))}
        </motion.div>
      </div>

      {/* Bottom chevron */}
      <div aria-hidden className="absolute bottom-0 inset-x-0 h-6 overflow-hidden">
        <svg
          viewBox="0 0 1440 24"
          className="w-full h-full"
          preserveAspectRatio="none"
          fill="var(--color-bg-deep)"
        >
          <path d="M0 24 L60 0 L120 24 L180 0 L240 24 L300 0 L360 24 L420 0 L480 24 L540 0 L600 24 L660 0 L720 24 L780 0 L840 24 L900 0 L960 24 L1020 0 L1080 24 L1140 0 L1200 24 L1260 0 L1320 24 L1380 0 L1440 24 Z" />
        </svg>
      </div>
    </section>
  );
}

const INDEX = [
  { id: "inbound", number: "01", label: "Inbound revenue ops" },
  { id: "outbound", number: "02", label: "Outbound revenue gen" },
  { id: "confirmation", number: "03", label: "Confirmation" },
  { id: "crm", number: "04", label: "CRM & pipeline" },
  { id: "reporting", number: "05", label: "KPI reporting" },
];
