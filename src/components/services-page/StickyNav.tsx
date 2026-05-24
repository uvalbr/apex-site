"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { SERVICES_DEEP } from "./data";

export function StickyNav() {
  const [activeId, setActiveId] = useState<string>(SERVICES_DEEP[0].id);
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const ids = SERVICES_DEEP.map((s) => s.id);
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);
    if (sections.length === 0) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visibleEntries[0]) {
          setActiveId(visibleEntries[0].target.id);
        }
      },
      { rootMargin: "-25% 0px -55% 0px", threshold: 0 }
    );
    sections.forEach((s) => io.observe(s));

    // Show nav once the user has scrolled into the first section
    const first = sections[0];
    let visIo: IntersectionObserver | null = null;
    if (first) {
      visIo = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.boundingClientRect.top < window.innerHeight * 0.55) {
              setVisible(true);
            } else {
              setVisible(false);
            }
          });
        },
        { rootMargin: "0px 0px -40% 0px", threshold: 0 }
      );
      visIo.observe(first);
    }

    return () => {
      io.disconnect();
      visIo?.disconnect();
    };
  }, []);

  return (
    <aside
      aria-label="Services navigation"
      className={cn(
        "hidden lg:block fixed left-4 xl:left-6 top-1/2 -translate-y-1/2 z-30 transition-all duration-500",
        visible
          ? "opacity-100 translate-x-0 pointer-events-auto"
          : "opacity-0 -translate-x-2 pointer-events-none"
      )}
      style={{ transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)" }}
    >
      <nav className="relative">
        {/* Vertical guide line */}
        <span
          aria-hidden
          className="absolute left-[14px] top-2 bottom-2 w-px bg-[var(--color-border-subtle)]"
        />
        <ul className="flex flex-col gap-1">
          {SERVICES_DEEP.map((s) => {
            const isActive = s.id === activeId;
            return (
              <li key={s.id}>
                <Link
                  href={`#${s.id}`}
                  className="group relative flex items-center gap-3 py-2 pr-2"
                  aria-label={s.eyebrow}
                >
                  {/* Dot */}
                  <span
                    aria-hidden
                    className={cn(
                      "relative z-10 w-[10px] h-[10px] rounded-full border-2 transition-all flex-shrink-0 ml-[10px]",
                      isActive
                        ? "bg-[var(--color-brand-bright)] border-[var(--color-brand-bright)] shadow-[0_0_12px_rgba(63,160,255,0.6)]"
                        : "bg-[var(--color-bg-deep)] border-[var(--color-border-strong)] group-hover:border-[var(--color-brand-blue)]"
                    )}
                  />
                  {/* Label — visible when active, on hover, or whole nav hovered */}
                  <span
                    className={cn(
                      "whitespace-nowrap text-xs font-semibold tracking-tight transition-all rounded-md px-2.5 py-1.5",
                      "bg-[var(--color-bg-elevated)]/90 backdrop-blur-md border border-[var(--color-border-subtle)]",
                      isActive
                        ? "opacity-100 translate-x-0 text-[var(--color-ink-primary)] border-[var(--color-brand-blue)]/60"
                        : "opacity-0 -translate-x-1 text-[var(--color-ink-secondary)] group-hover:opacity-100 group-hover:translate-x-0"
                    )}
                  >
                    <span className="font-mono text-[10px] tabular text-[var(--color-brand-bright)] mr-2">
                      {s.number}
                    </span>
                    {s.eyebrow}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
