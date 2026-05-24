"use client";

/**
 * MagneticButton — wraps a child element with a subtle magnetic pull on hover.
 *
 * Desktop only: the effect is auto-disabled on touch devices and when the user
 * has `prefers-reduced-motion: reduce`.
 *
 * Max pull distance is 8px, paired with a 1.02 hover scale. Spring-damped return
 * on mouse leave (handled by framer-motion's spring transition).
 *
 * Usage:
 *   <MagneticButton as="a" href="/contact" className="px-6 py-3 rounded-xl bg-...">
 *     Book a diagnostic
 *   </MagneticButton>
 *
 *   // or wrap an existing element
 *   <MagneticButton>
 *     <Link href="/x">Hello</Link>
 *   </MagneticButton>
 */

import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

const MAX_PULL = 8; // px
const HOVER_SCALE = 1.02;
const SPRING = { stiffness: 220, damping: 18, mass: 0.5 };

type MagneticButtonProps<T extends React.ElementType = "button"> = {
  as?: T;
  children: React.ReactNode;
  className?: string;
  /** Override the maximum pull distance in px. Default: 8. */
  strength?: number;
} & Omit<React.ComponentPropsWithoutRef<T>, "as" | "children" | "className">;

export function MagneticButton<T extends React.ElementType = "button">({
  as,
  children,
  className,
  strength = MAX_PULL,
  ...rest
}: MagneticButtonProps<T>) {
  const Tag = (as ?? "button") as React.ElementType;
  const ref = useRef<HTMLElement | null>(null);
  const reduceMotion = useReducedMotion();
  const [isTouch, setIsTouch] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const scale = useMotionValue(1);

  const springX = useSpring(x, SPRING);
  const springY = useSpring(y, SPRING);
  const springScale = useSpring(scale, SPRING);

  useEffect(() => {
    if (typeof window === "undefined") return;
    // Coarse pointers (touch) — disable effect.
    const mq = window.matchMedia("(hover: none), (pointer: coarse)");
    const update = () => setIsTouch(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const disabled = reduceMotion || isTouch;

  const onMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (disabled) return;
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const relX = e.clientX - (rect.left + rect.width / 2);
      const relY = e.clientY - (rect.top + rect.height / 2);
      // Clamp to strength using a soft falloff (linear within element bounds).
      const nx = Math.max(-1, Math.min(1, relX / (rect.width / 2)));
      const ny = Math.max(-1, Math.min(1, relY / (rect.height / 2)));
      x.set(nx * strength);
      y.set(ny * strength);
    },
    [disabled, strength, x, y]
  );

  const onEnter = useCallback(() => {
    if (disabled) return;
    scale.set(HOVER_SCALE);
  }, [disabled, scale]);

  const onLeave = useCallback(() => {
    x.set(0);
    y.set(0);
    scale.set(1);
  }, [scale, x, y]);

  if (disabled) {
    // Render the element without motion wrappers so it stays semantically clean.
    return (
      <Tag ref={ref as never} className={className} {...rest}>
        {children}
      </Tag>
    );
  }

  return (
    <motion.span
      style={{ display: "inline-block", x: springX, y: springY, scale: springScale }}
      onMouseMove={onMove}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className="will-change-transform"
    >
      <Tag ref={ref as never} className={cn(className)} {...rest}>
        {children}
      </Tag>
    </motion.span>
  );
}
