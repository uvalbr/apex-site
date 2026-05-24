"use client";

/**
 * PageTransition — subtle fade + slide on Next.js App Router navigations.
 *
 * Wraps page children with `AnimatePresence mode="wait"`, keyed off
 * `usePathname()`. Duration 0.35s with our project's standard `outQuart` ease.
 *
 * Respects `prefers-reduced-motion`: when reduced, renders children directly
 * with no transition wrapper.
 *
 * Usage in `app/layout.tsx`:
 *   <body>
 *     <Header />
 *     <PageTransition>{children}</PageTransition>
 *     <Footer />
 *   </body>
 */

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { ease } from "@/lib/motion";

type Props = {
  children: ReactNode;
};

export function PageTransition({ children }: Props) {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <>{children}</>;
  }

  return (
    <AnimatePresence mode="wait" initial={false}>
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
