"use client";

/**
 * PageTransition — subtle fade + slide on Next.js App Router navigations.
 *
 * Wraps page children with `AnimatePresence mode="wait"`, keyed off
 * `usePathname()`. Duration 0.35s with our project's standard `outQuart` ease.
 *
 * On every pathname change we ALSO reset scroll to top of the page. Lenis
 * (our smooth-scroll provider) hijacks `window.scrollTo`, so we call
 * `window.__lenis.scrollTo(0, { immediate: true, force: true })` when Lenis is
 * present and fall back to native `window.scrollTo` otherwise. Without this,
 * route navigations leave the new page rendered at the previous page's scroll
 * position — which on a long page looks like "the button jumped me to the
 * bottom."
 *
 * In-page hash navigation (clicking an href like `#simulator`) is left alone —
 * Lenis's anchor handler takes care of those.
 *
 * Respects `prefers-reduced-motion`: when reduced, renders children directly
 * with no transition wrapper (but still scrolls to top on navigate).
 */

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, type ReactNode } from "react";
import { ease } from "@/lib/motion";

type Props = {
  children: ReactNode;
};

function scrollToTop() {
  if (typeof window === "undefined") return;
  // Don't fight in-page hash navigation — let Lenis/browser handle anchors.
  if (window.location.hash) return;

  const lenis = window.__lenis;
  if (lenis?.scrollTo) {
    lenis.scrollTo(0, { immediate: true, force: true });
    return;
  }
  window.scrollTo({ top: 0, left: 0, behavior: "instant" });
}

export function PageTransition({ children }: Props) {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();

  // Reset scroll on every route change. Runs after the new pathname's first
  // render is committed, so the DOM exists and Lenis can target it.
  useEffect(() => {
    scrollToTop();
  }, [pathname]);

  if (reduceMotion) {
    return <>{children}</>;
  }

  return (
    <AnimatePresence
      mode="wait"
      initial={false}
      onExitComplete={scrollToTop}
    >
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.35, ease: ease.outQuart }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
