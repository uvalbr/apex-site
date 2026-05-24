"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

const navLinks = [
  { href: "/services", label: "Services" },
  { href: "/industries", label: "Industries" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "backdrop-blur-xl bg-[var(--color-bg-deep)]/75 border-b border-[var(--color-border-subtle)]"
          : "bg-transparent"
      )}
    >
      <div className="container-app flex items-center justify-between h-16 md:h-20">
        <Link href="/" className="flex items-center gap-3 group" aria-label="APEX home">
          <span className="relative w-8 h-8 md:w-9 md:h-9">
            <span className="absolute inset-0 rounded-full bg-[var(--color-brand-bright)]/30 blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/logo-mark.png" alt="" className="relative w-full h-full" />
          </span>
          <span className="hidden sm:flex flex-col leading-none">
            <span className="font-display text-lg tracking-tight">APEX</span>
            <span className="text-[9px] uppercase tracking-[0.32em] text-[var(--color-ink-tertiary)] mt-0.5">
              Revenue Operations
            </span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="px-3 py-2 text-sm text-[var(--color-ink-secondary)] hover:text-[var(--color-ink-primary)] transition-colors relative group"
            >
              {l.label}
              <span className="absolute inset-x-3 bottom-1 h-px bg-[var(--color-brand-bright)] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
            </Link>
          ))}
        </nav>

        <Link
          href="/contact"
          className="hidden md:inline-flex items-center gap-2 h-10 px-5 rounded-[10px] bg-[var(--color-brand-blue)] hover:bg-[var(--color-brand-bright)] text-white font-semibold text-sm transition-all hover:shadow-[0_0_24px_rgba(63,160,255,0.45)]"
        >
          Book a diagnostic
          <span aria-hidden>→</span>
        </Link>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
          className="md:hidden w-10 h-10 grid place-items-center rounded-lg border border-[var(--color-border-strong)]"
        >
          <span className="relative w-5 h-3 flex flex-col justify-between">
            <span
              className={cn(
                "block h-0.5 bg-[var(--color-ink-primary)] transition-transform origin-center",
                open && "translate-y-[5px] rotate-45"
              )}
            />
            <span
              className={cn(
                "block h-0.5 bg-[var(--color-ink-primary)] transition-transform origin-center",
                open && "-translate-y-[5px] -rotate-45"
              )}
            />
          </span>
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "md:hidden overflow-hidden border-b border-[var(--color-border-subtle)] bg-[var(--color-bg-deep)]/95 backdrop-blur-xl transition-[max-height,opacity] duration-400",
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <nav className="container-app py-4 flex flex-col gap-1">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="py-3 text-base text-[var(--color-ink-primary)] border-b border-[var(--color-border-subtle)] last:border-none"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="mt-3 inline-flex items-center justify-center h-12 rounded-[10px] bg-[var(--color-brand-blue)] text-white font-semibold"
          >
            Book a diagnostic →
          </Link>
        </nav>
      </div>
    </header>
  );
}
