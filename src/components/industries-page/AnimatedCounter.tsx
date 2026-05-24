"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  value: number;
  /** prefix (e.g. "$") */
  prefix?: string;
  /** suffix (e.g. "%", "K") */
  suffix?: string;
  /** display divisor — e.g. 1000 to show $48K from 48000 */
  divisor?: number;
  decimals?: number;
  duration?: number;
  className?: string;
};

/**
 * Counter that animates from 0 → value when scrolled into view.
 * Respects prefers-reduced-motion.
 */
export function AnimatedCounter({
  value,
  prefix = "",
  suffix = "",
  divisor = 1,
  decimals = 0,
  duration = 1100,
  className,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const rafRef = useRef<number | null>(null);
  const [display, setDisplay] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof window === "undefined") return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setDisplay(value);
      setStarted(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !started) {
            setStarted(true);
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [value, started]);

  useEffect(() => {
    if (!started) return;
    const start = performance.now();
    const from = 0;
    const to = value;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 4);
      setDisplay(from + (to - from) * eased);
      if (p < 1) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [started, value, duration]);

  const shown = display / divisor;
  const formatted =
    decimals > 0
      ? shown.toLocaleString(undefined, {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
        })
      : Math.round(shown).toLocaleString();

  return (
    <span ref={ref} className={className}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}
