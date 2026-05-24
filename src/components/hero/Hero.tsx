"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { LivePipeline } from "./LivePipeline";
import { ease, wordChild, wordStagger } from "@/lib/motion";

const HEADLINE_TOP = ["Built", "to", "Convert."];
const HEADLINE_BOT = ["Driven", "to", "Scale."];

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-hero-spine">
      {/* Grid backdrop */}
      <div aria-hidden className="absolute inset-0 bg-grid pointer-events-none" />

      {/* Skyline silhouette */}
      <SkylineSilhouette />

      <div className="relative container-wide pt-32 pb-20 md:pt-44 md:pb-32">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: ease.outQuart }}
          className="flex items-center gap-3"
        >
          <span className="w-8 h-px bg-[var(--color-brand-bright)]" />
          <span className="eyebrow">Revenue Operations Infrastructure</span>
        </motion.div>

        {/* Headline (word stagger) */}
        <h1 className="mt-6 md:mt-8 font-display text-[44px] sm:text-6xl md:text-[88px] leading-[0.98] tracking-[-0.035em] max-w-5xl">
          <motion.span variants={wordStagger} initial="hidden" animate="visible" className="block">
            {HEADLINE_TOP.map((w, i) => (
              <span key={i} className="inline-block overflow-hidden align-bottom mr-[0.22em] last:mr-0">
                <motion.span variants={wordChild} className="inline-block">
                  {w}
                </motion.span>
              </span>
            ))}
          </motion.span>
          <motion.span
            variants={wordStagger}
            initial="hidden"
            animate="visible"
            transition={{ delayChildren: 0.4 }}
            className="block bg-clip-text text-transparent"
            style={{
              backgroundImage:
                "linear-gradient(120deg, #3FA0FF 0%, #1E5FD8 45%, #D9E6FF 100%)",
            }}
          >
            {HEADLINE_BOT.map((w, i) => (
              <span key={i} className="inline-block overflow-hidden align-bottom mr-[0.22em] last:mr-0">
                <motion.span variants={wordChild} className="inline-block">
                  {w}
                </motion.span>
              </span>
            ))}
          </motion.span>
        </h1>

        {/* Sub */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.85, ease: ease.outQuart }}
          className="mt-6 md:mt-8 max-w-2xl text-base md:text-xl text-[var(--color-ink-secondary)] leading-relaxed"
        >
          We build and manage <span className="text-[var(--color-ink-primary)] font-medium">dedicated revenue operations departments</span> for U.S. construction companies. Not a call center. Not a VA agency. Not a BPO.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.0, ease: ease.outQuart }}
          className="mt-8 md:mt-10 flex flex-wrap gap-3"
        >
          <Link
            href="#simulator"
            className="group inline-flex items-center gap-2 h-12 md:h-14 px-6 md:px-7 rounded-xl bg-[var(--color-brand-blue)] text-white font-semibold text-sm md:text-base transition-all hover:bg-[var(--color-brand-bright)] hover:shadow-[0_0_32px_rgba(63,160,255,0.55)]"
          >
            Run your revenue diagnostic
            <span
              aria-hidden
              className="transition-transform duration-300 ease-out group-hover:translate-x-1"
            >
              →
            </span>
          </Link>
          <Link
            href="#services"
            className="inline-flex items-center gap-2 h-12 md:h-14 px-6 md:px-7 rounded-xl bg-transparent border border-[var(--color-border-strong)] text-[var(--color-ink-primary)] font-semibold text-sm md:text-base hover:bg-[var(--color-bg-elevated)] hover:border-[var(--color-brand-blue)] transition-all"
          >
            See how it works
          </Link>
        </motion.div>

        {/* Anti-positioning ticker */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          className="mt-10 md:mt-14 flex flex-wrap items-center gap-x-6 gap-y-2 text-[11px] md:text-xs text-[var(--color-ink-tertiary)] uppercase tracking-[0.18em]"
        >
          <span className="opacity-60 line-through decoration-[var(--color-danger)]/60">Call center</span>
          <span className="opacity-60 line-through decoration-[var(--color-danger)]/60">VA agency</span>
          <span className="opacity-60 line-through decoration-[var(--color-danger)]/60">BPO</span>
          <span className="text-[var(--color-brand-bright)]">→ Dedicated revenue ops department</span>
        </motion.div>

        {/* Live pipeline */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.9, ease: ease.outExpo }}
          className="mt-14 md:mt-20"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="relative flex w-2 h-2">
                <span className="absolute inset-0 rounded-full bg-[var(--color-success)] animate-ping opacity-75" />
                <span className="relative w-2 h-2 rounded-full bg-[var(--color-success)]" />
              </span>
              <span className="eyebrow">Live pipeline · sample client</span>
            </div>
            <span className="hidden md:inline text-[11px] text-[var(--color-ink-tertiary)] font-mono tabular">
              480 leads / mo · 34% close
            </span>
          </div>
          <LivePipeline />
          <p className="mt-4 text-xs text-[var(--color-ink-tertiary)] md:hidden">
            480 leads/mo · 34% close · representative client
          </p>
        </motion.div>
      </div>

      {/* Bottom chevron divider */}
      <ChevronDivider />
    </section>
  );
}

function SkylineSilhouette() {
  return (
    <svg
      aria-hidden
      className="absolute inset-x-0 bottom-24 md:bottom-32 w-full h-24 md:h-40 opacity-[0.08] pointer-events-none"
      viewBox="0 0 1440 200"
      preserveAspectRatio="none"
      fill="#F5F8FC"
    >
      <path d="M0 200 L0 120 L40 120 L40 90 L80 90 L80 130 L120 130 L120 70 L160 70 L160 110 L200 110 L200 50 L240 50 L240 95 L280 95 L280 130 L320 130 L320 80 L360 80 L360 120 L400 120 L400 60 L440 60 L440 100 L480 100 L480 140 L520 140 L520 90 L560 90 L560 40 L600 40 L600 110 L640 110 L640 70 L680 70 L680 130 L720 130 L720 95 L760 95 L760 60 L800 60 L800 120 L840 120 L840 80 L880 80 L880 140 L920 140 L920 100 L960 100 L960 50 L1000 50 L1000 110 L1040 110 L1040 70 L1080 70 L1080 130 L1120 130 L1120 90 L1160 90 L1160 40 L1200 40 L1200 110 L1240 110 L1240 75 L1280 75 L1280 125 L1320 125 L1320 90 L1360 90 L1360 55 L1400 55 L1400 110 L1440 110 L1440 200 Z" />
    </svg>
  );
}

function ChevronDivider() {
  return (
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
  );
}
