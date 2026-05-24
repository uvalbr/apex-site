"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

type TocItem = { id: string; heading: string };

export function Toc({ items }: { items: TocItem[] }) {
  const [activeId, setActiveId] = useState<string>(items[0]?.id ?? "");

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (items.length === 0) return;

    // Track which section's top is closest to viewport top (with offset for sticky header)
    const HEADER_OFFSET = 120;

    const onScroll = () => {
      let current = items[0].id;
      let closestDistance = Infinity;
      for (const it of items) {
        const el = document.getElementById(it.id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        const distance = Math.abs(rect.top - HEADER_OFFSET);
        // Pick the section whose top is at or above the offset and closest to it
        if (rect.top - HEADER_OFFSET <= 8 && distance < closestDistance) {
          current = it.id;
          closestDistance = distance;
        }
      }
      setActiveId(current);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [items]);

  if (items.length === 0) return null;

  return (
    <nav
      aria-label="Table of contents"
      className="hidden lg:block sticky top-32 self-start"
    >
      <div className="text-[10px] uppercase tracking-[0.22em] font-semibold text-[var(--color-brand-bright)] mb-4">
        On this page
      </div>
      <ul className="space-y-1.5 border-l border-[var(--color-border-subtle)]">
        {items.map((it) => {
          const isActive = it.id === activeId;
          return (
            <li key={it.id}>
              <a
                href={`#${it.id}`}
                className={cn(
                  "block -ml-px border-l-2 pl-4 py-1 text-sm transition-all leading-snug",
                  isActive
                    ? "border-[var(--color-brand-bright)] text-[var(--color-ink-primary)] font-medium"
                    : "border-transparent text-[var(--color-ink-tertiary)] hover:text-[var(--color-ink-secondary)] hover:border-[var(--color-border-strong)]"
                )}
              >
                {it.heading}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
