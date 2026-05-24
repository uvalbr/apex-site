"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";
import { ease } from "@/lib/motion";
import { cn } from "@/lib/cn";
import {
  formatPublishedDate,
  type Resource,
  type ResourceCategory,
} from "@/lib/resources-data";

type Filter = "All" | ResourceCategory;

export function ResourceFilters({
  allResources,
  categories,
}: {
  allResources: Resource[];
  categories: ResourceCategory[];
}) {
  const [filter, setFilter] = useState<Filter>("All");

  const filters: Filter[] = ["All", ...categories];

  const visible = useMemo(() => {
    if (filter === "All") return allResources;
    return allResources.filter((r) => r.category === filter);
  }, [allResources, filter]);

  return (
    <>
      <Reveal>
        <div className="flex flex-wrap gap-2">
          {filters.map((f) => {
            const isActive = f === filter;
            const count =
              f === "All"
                ? allResources.length
                : allResources.filter((r) => r.category === f).length;
            return (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={cn(
                  "inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all",
                  isActive
                    ? "bg-[var(--color-brand-blue)] text-white shadow-[0_0_20px_rgba(63,160,255,0.35)]"
                    : "bg-[var(--color-bg-elevated)] border border-[var(--color-border-strong)] text-[var(--color-ink-secondary)] hover:text-[var(--color-ink-primary)] hover:border-[var(--color-brand-blue)]"
                )}
              >
                <span>{f}</span>
                <span
                  className={cn(
                    "text-[10px] font-mono tabular",
                    isActive
                      ? "text-white/70"
                      : "text-[var(--color-ink-tertiary)]"
                  )}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </Reveal>

      <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
        <AnimatePresence mode="popLayout">
          {visible.map((r, i) => (
            <motion.div
              key={r.slug}
              layout
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{
                duration: 0.4,
                delay: i * 0.04,
                ease: ease.outQuart,
              }}
            >
              <ResourceCard resource={r} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {visible.length === 0 && (
        <p className="mt-8 text-sm text-[var(--color-ink-tertiary)]">
          No resources in this category yet.
        </p>
      )}
    </>
  );
}

function ResourceCard({ resource }: { resource: Resource }) {
  const href = resource.externalAnchor ?? `/resources/${resource.slug}`;
  return (
    <Link
      href={href}
      className="group block h-full rounded-2xl border border-[var(--color-border-subtle)] bg-[var(--color-bg-elevated)]/70 backdrop-blur-md p-6 md:p-7 transition-all hover:border-[var(--color-brand-blue)]/60 hover:-translate-y-1 hover:shadow-[0_12px_36px_-12px_rgba(63,160,255,0.32)]"
    >
      <div className="flex items-center justify-between gap-3">
        <span className="inline-flex items-center rounded-full border border-[var(--color-brand-blue)]/40 bg-[var(--color-brand-blue)]/10 px-2.5 py-1 text-[10px] font-semibold tracking-[0.2em] uppercase text-[var(--color-brand-bright)]">
          {resource.category}
        </span>
        <span className="text-[10px] font-mono tabular text-[var(--color-ink-tertiary)] tracking-wider">
          {resource.readMinutes} min
        </span>
      </div>

      <h3 className="mt-4 font-display text-xl md:text-2xl leading-snug tracking-tight text-[var(--color-ink-primary)] group-hover:text-white transition-colors">
        {resource.title}
      </h3>

      <p className="mt-3 text-sm leading-relaxed text-[var(--color-ink-secondary)]">
        {resource.preview}
      </p>

      <div className="mt-5 pt-4 border-t border-[var(--color-border-subtle)] flex items-center justify-between">
        <span className="text-[11px] text-[var(--color-ink-tertiary)]">
          {formatPublishedDate(resource.publishedISO)}
        </span>
        <span className="text-xs font-semibold text-[var(--color-brand-bright)] inline-flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
          {resource.externalAnchor ? "Open calculator" : "Read"}{" "}
          <span aria-hidden>→</span>
        </span>
      </div>
    </Link>
  );
}
