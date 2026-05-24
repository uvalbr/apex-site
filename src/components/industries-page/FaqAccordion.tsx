"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ease } from "@/lib/motion";
import { cn } from "@/lib/cn";
import type { Faq } from "@/lib/industries-data";

type Props = {
  items: Faq[];
};

export function FaqAccordion({ items }: Props) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="divide-y divide-[var(--color-border-subtle)] rounded-2xl border border-[var(--color-border-subtle)] bg-[var(--color-bg-elevated)]/60 backdrop-blur-md overflow-hidden">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={i} className="">
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="w-full text-left px-5 md:px-7 py-5 md:py-6 flex items-start gap-4 group transition-colors hover:bg-[var(--color-bg-elevated)]"
            >
              <span
                className={cn(
                  "shrink-0 mt-1 w-6 h-6 rounded-full grid place-items-center border text-[10px] font-mono transition-all",
                  isOpen
                    ? "border-[var(--color-brand-bright)] bg-[var(--color-brand-blue)]/20 text-[var(--color-brand-bright)]"
                    : "border-[var(--color-border-strong)] text-[var(--color-ink-tertiary)] group-hover:border-[var(--color-brand-blue)] group-hover:text-[var(--color-brand-bright)]"
                )}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="flex-1 font-display text-base md:text-lg text-[var(--color-ink-primary)] leading-snug tracking-[-0.02em]">
                {item.q}
              </span>
              <span
                aria-hidden
                className={cn(
                  "shrink-0 w-6 h-6 grid place-items-center text-[var(--color-brand-bright)] transition-transform duration-300",
                  isOpen ? "rotate-45" : "rotate-0"
                )}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path
                    d="M7 1 V13 M1 7 H13"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: ease.outQuart }}
                  className="overflow-hidden"
                >
                  <div className="px-5 md:px-7 pb-6 md:pb-7 pl-[3.25rem] md:pl-[3.75rem]">
                    <p className="text-sm md:text-base text-[var(--color-ink-secondary)] leading-relaxed">
                      {item.a}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
