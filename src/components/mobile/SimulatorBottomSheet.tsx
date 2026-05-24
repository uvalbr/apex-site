"use client";

/**
 * SimulatorBottomSheet — mobile-only floating "See your result" affordance.
 *
 * Self-contained: does NOT modify `Simulator.tsx`. It mounts independently in
 * `app/page.tsx`, observes the `#simulator` section, and:
 *
 *   1. When the simulator is in the mobile viewport, shows a small floating
 *      pill near the bottom-right corner: "See your result →".
 *   2. Tapping it opens a bottom sheet (drag-to-dismiss via Framer Motion).
 *   3. The sheet shows a placeholder summary of the recovery numbers + a
 *      "Run full diagnostic" CTA linking to /contact. Because we can't read
 *      the simulator's internal state without modifying it, the sheet shows
 *      a generic call-to-action surface rather than live numbers; this is
 *      noted in the README as a documented tradeoff.
 *
 * Integration (in `app/page.tsx`, anywhere — it positions itself fixed):
 *   <SimulatorBottomSheet />
 *
 * Respects `prefers-reduced-motion` (no spring drag, instant open/close).
 */

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export function SimulatorBottomSheet() {
  const [inView, setInView] = useState(false);
  const [open, setOpen] = useState(false);
  const reduceMotion = useReducedMotion();
  const observedRef = useRef<Element | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (typeof document === "undefined") return;

    const target = document.getElementById("simulator");
    if (!target) return;
    observedRef.current = target;

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          setInView(e.isIntersecting);
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.15 }
    );
    io.observe(target);
    return () => io.disconnect();
  }, []);

  // Lock body scroll when sheet is open
  useEffect(() => {
    if (typeof document === "undefined") return;
    const prev = document.body.style.overflow;
    if (open) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // Esc to close
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      {/* Floating trigger — mobile only, only while simulator is in view */}
      <div className="md:hidden pointer-events-none fixed inset-x-0 bottom-0 z-30">
        <AnimatePresence>
          {inView && !open && (
            <motion.div
              key="sim-trigger"
              initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
              transition={{ duration: reduceMotion ? 0 : 0.28 }}
              className="pointer-events-auto flex justify-end px-4"
              style={{ paddingBottom: "calc(max(env(safe-area-inset-bottom), 12px) + 76px)" }}
            >
              <button
                type="button"
                onClick={() => setOpen(true)}
                className="inline-flex items-center gap-2 min-h-[44px] px-5 rounded-full bg-[var(--color-brand-blue)] text-white font-semibold text-sm shadow-[0_8px_24px_rgba(30,95,216,0.45)] hover:bg-[var(--color-brand-bright)] transition-colors"
              >
                See your result
                <span aria-hidden>→</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Sheet */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              key="sim-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.2 }}
              onClick={() => setOpen(false)}
              className="md:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
              aria-hidden
            />
            {/* Sheet body */}
            <motion.aside
              key="sim-sheet"
              role="dialog"
              aria-modal="true"
              aria-label="Revenue diagnostic result"
              initial={reduceMotion ? { y: 0, opacity: 1 } : { y: "100%" }}
              animate={{ y: 0, opacity: 1 }}
              exit={reduceMotion ? { opacity: 0 } : { y: "100%" }}
              transition={
                reduceMotion
                  ? { duration: 0 }
                  : { type: "spring", stiffness: 300, damping: 32, mass: 0.7 }
              }
              drag={reduceMotion ? false : "y"}
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={{ top: 0, bottom: 0.4 }}
              onDragEnd={(_, info) => {
                if (info.offset.y > 120 || info.velocity.y > 500) setOpen(false);
              }}
              className="md:hidden fixed inset-x-0 bottom-0 z-50 rounded-t-2xl bg-[var(--color-bg-elevated)] border-t border-[var(--color-border-strong)]"
              style={{ paddingBottom: "max(env(safe-area-inset-bottom), 16px)" }}
            >
              {/* Drag handle */}
              <div className="pt-2 pb-1 flex justify-center">
                <span className="block w-10 h-1.5 rounded-full bg-[var(--color-border-strong)]" />
              </div>

              <div className="px-5 pb-6">
                <div className="flex items-center justify-between">
                  <span className="eyebrow">Diagnostic snapshot</span>
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    aria-label="Close"
                    className="w-10 h-10 -mr-2 grid place-items-center rounded-lg text-[var(--color-ink-secondary)] hover:text-[var(--color-ink-primary)]"
                  >
                    <span aria-hidden className="text-lg">×</span>
                  </button>
                </div>

                <h3 className="mt-2 font-display text-2xl tracking-tight leading-tight">
                  Your recovery range
                </h3>
                <p className="mt-2 text-sm text-[var(--color-ink-secondary)] leading-relaxed">
                  Run the full diagnostic above for live numbers tied to your pipeline.
                  Below is the typical range we recover within 90 days for a
                  mid-market construction operator.
                </p>

                <div className="mt-4 grid grid-cols-3 gap-2">
                  {[
                    { label: "Speed-to-lead", value: "−87%" },
                    { label: "Booked %", value: "+34%" },
                    { label: "Showed %", value: "+22%" },
                  ].map((s) => (
                    <div
                      key={s.label}
                      className="rounded-xl border border-[var(--color-border-subtle)] bg-[var(--color-bg-surface)] px-3 py-3"
                    >
                      <div className="font-mono tabular text-base text-[var(--color-brand-bright)]">
                        {s.value}
                      </div>
                      <div className="text-[11px] mt-1 text-[var(--color-ink-tertiary)] uppercase tracking-[0.16em]">
                        {s.label}
                      </div>
                    </div>
                  ))}
                </div>

                <Link
                  href="/contact"
                  onClick={() => setOpen(false)}
                  className="mt-5 inline-flex w-full items-center justify-center gap-2 min-h-[48px] px-5 rounded-xl bg-[var(--color-brand-blue)] text-white font-semibold text-sm hover:bg-[var(--color-brand-bright)] transition-colors"
                >
                  Book a full diagnostic →
                </Link>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
