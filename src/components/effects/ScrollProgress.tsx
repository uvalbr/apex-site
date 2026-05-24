"use client";

/**
 * ScrollProgress — 2px gradient bar that tracks scroll progress.
 *
 * Position decision: fixed at the very top of the viewport (top:0), z-index above
 * the header (z-50) so it remains visible on both desktop and mobile, including
 * when the sticky header is in its blurred state. The bar is only 2px tall, so
 * it sits over the header's top edge without occluding any content. This is the
 * simplest and most consistent placement across breakpoints.
 *
 * Behavior:
 *  - Width animates with scroll position 0% → 100%.
 *  - Hidden when at the very top of the page (scrollY < 4).
 *  - Driven by `scrollY` + `documentElement.scrollHeight`, so it works whether
 *    or not `prefers-reduced-motion` is set (no decorative animation — it's a
 *    position indicator).
 *  - `hidden` prop disables it entirely (use on /contact form pages).
 *
 * Usage in `app/layout.tsx`:
 *   <ScrollProgress />
 *
 * Or per-page conditional:
 *   <ScrollProgress hidden={pathname.startsWith("/contact")} />
 */

import { useEffect, useState } from "react";

type Props = {
  hidden?: boolean;
};

export function ScrollProgress({ hidden = false }: Props) {
  const [progress, setProgress] = useState(0);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (hidden) return;

    let raf = 0;
    const compute = () => {
      const doc = document.documentElement;
      const scrollTop = window.scrollY || doc.scrollTop;
      const max = (doc.scrollHeight - doc.clientHeight) || 1;
      const pct = Math.max(0, Math.min(1, scrollTop / max));
      setProgress(pct);
      setShow(scrollTop > 4);
    };

    const onScroll = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(() => {
        compute();
        raf = 0;
      });
    };

    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, [hidden]);

  if (hidden) return null;

  return (
    <div
      aria-hidden
      className="fixed inset-x-0 top-0 z-[60] h-[2px] pointer-events-none"
      style={{
        opacity: show ? 1 : 0,
        transition: "opacity 200ms cubic-bezier(0.22, 1, 0.36, 1)",
      }}
    >
      <div
        className="h-full origin-left"
        style={{
          width: "100%",
          transform: `scaleX(${progress})`,
          transformOrigin: "0% 50%",
          background:
            "linear-gradient(90deg, var(--color-brand-blue) 0%, var(--color-brand-bright) 100%)",
          willChange: "transform",
        }}
      />
    </div>
  );
}
