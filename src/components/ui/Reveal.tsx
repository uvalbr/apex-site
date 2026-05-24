"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

type Props = {
  children: React.ReactNode;
  as?: "div" | "section" | "header" | "article" | "li";
  delay?: number;
  y?: number;
  className?: string;
  once?: boolean;
};

export function Reveal({
  children,
  as = "div",
  delay = 0,
  y = 24,
  className,
  once = true,
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setSeen(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setSeen(true);
            if (once) io.unobserve(e.target);
          } else if (!once) {
            setSeen(false);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.06 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [once]);

  const Tag = as as "div";
  return (
    <Tag
      ref={ref as React.RefObject<HTMLDivElement>}
      className={cn("transition-all duration-[750ms]", className)}
      style={{
        transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
        transitionDelay: `${delay}ms`,
        opacity: seen ? 1 : 0,
        transform: seen ? "translateY(0px)" : `translateY(${y}px)`,
        willChange: "transform, opacity",
      }}
    >
      {children}
    </Tag>
  );
}

export function RevealGroup({
  children,
  stagger = 80,
  className,
}: {
  children: React.ReactElement[];
  stagger?: number;
  className?: string;
}) {
  return (
    <div className={className}>
      {children.map((child, i) => (
        <Reveal key={i} delay={i * stagger}>
          {child}
        </Reveal>
      ))}
    </div>
  );
}
