"use client";

/**
 * StickyBottomCta — mobile-only sticky bottom action bar.
 *
 * Behavior:
 *  - Renders only on mobile (`md:hidden`).
 *  - Hidden until the user scrolls past the hero (default: 80% of viewport height).
 *  - Slides up/down with a spring; respects `prefers-reduced-motion` (instant toggle).
 *  - Hides on routes where it would be redundant (default: `/contact`).
 *  - Includes safe-area-inset-bottom padding for notched iPhones.
 *
 * Drop into `app/layout.tsx` once, near the end of <body>:
 *   <StickyBottomCta />
 */

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ease } from "@/lib/motion";

type Props = {
  /** Routes (prefix match) where the bar should not render at all. Default: ["/contact"]. */
  hiddenOnRoutes?: string[];
  /** Scroll-Y threshold (px) at which the bar appears. Default: 0.8 * viewport height. */
  showAfterPx?: number;
};

export function StickyBottomCta({
  hiddenOnRoutes = ["/contact"],
  showAfterPx,
}: Props) {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  const isHiddenRoute = hiddenOnRoutes.some((r) =>
    pathname === r || pathname.startsWith(r + "/")
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduceMotion(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (isHiddenRoute) return;

    const threshold = showAfterPx ?? Math.round(window.innerHeight * 0.8);

    const onScroll = () => {
      setVisible(window.scrollY > threshold);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [showAfterPx, isHiddenRoute]);

  if (isHiddenRoute) return null;

  return (
    <div className="md:hidden pointer-events-none fixed inset-x-0 bottom-0 z-40">
      <AnimatePresence>
        {visible && (
          <motion.div
            key="sticky-cta"
            initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: reduceMotion ? 0 : 0.32, ease: ease.outQuart }}
            className="pointer-events-auto border-t border-[var(--color-border-subtle)] bg-[var(--color-bg-deep)]/85 backdrop-blur-xl"
            style={{
              paddingBottom: "max(env(safe-area-inset-bottom), 12px)",
            }}
          >
            <div className="container-app flex items-stretch gap-2 py-3">
              <Link
                href="/contact"
                className="inline-flex flex-1 items-center justify-center gap-2 min-h-[48px] px-4 rounded-xl bg-[var(--color-brand-blue)] text-white font-semibold text-sm hover:bg-[var(--color-brand-bright)] transition-colors"
              >
                Book diagnostic
                <span aria-hidden>→</span>
              </Link>
              <Link
                href="/#simulator"
                className="inline-flex items-center justify-center gap-2 min-h-[48px] px-4 rounded-xl border border-[var(--color-border-strong)] bg-transparent text-[var(--color-ink-primary)] font-semibold text-sm hover:border-[var(--color-brand-blue)] hover:bg-[var(--color-bg-elevated)] transition-colors"
              >
                Run simulator
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
