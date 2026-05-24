"use client";

import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";

const METHODS = [
  {
    n: "01",
    tag: "Fastest path",
    title: "Book a diagnostic call",
    body: "30-minute Zoom. We audit your funnel against your real CRM data and identify the three biggest revenue leaks. Free regardless of fit.",
    cta: "Use the form below",
    href: "#form",
    accent: true,
  },
  {
    n: "02",
    tag: "Async, response in 1 hr",
    title: "Email us directly",
    body: "Send a note with your company, role, monthly lead volume, and the #1 thing you're trying to solve. We reply with availability and a Calendly link.",
    cta: "hello@apex.texasserviceexperts.com",
    href: "mailto:hello@apex.texasserviceexperts.com?subject=APEX%20diagnostic%20request",
  },
  {
    n: "03",
    tag: "Deeper conversation",
    title: "Schedule a discovery session",
    body: "60-minute call for operators evaluating a structural change to their revenue function. We'll walk through your historical data together, not just talk hypotheticals.",
    cta: "Use the form below + select Discovery",
    href: "#form",
  },
];

export function ContactMethods() {
  return (
    <section className="relative py-16 md:py-24 border-t border-[var(--color-border-subtle)]">
      <div className="container-app">
        <Reveal>
          <SectionLabel number="02">Three ways in</SectionLabel>
          <h2 className="mt-4 font-display text-2xl sm:text-4xl md:text-5xl tracking-[-0.035em] max-w-3xl leading-[1.1]">
            Pick whichever fits how you work.
          </h2>
        </Reveal>

        <div className="mt-12 grid md:grid-cols-3 gap-4">
          {METHODS.map((m, i) => (
            <Reveal key={m.n} delay={i * 80}>
              <a
                href={m.href}
                className={`block h-full rounded-2xl border backdrop-blur-md p-6 md:p-7 transition-all hover:-translate-y-1 ${
                  m.accent
                    ? "border-[var(--color-brand-bright)]/40 bg-gradient-to-br from-[var(--color-bg-elevated)] to-[var(--color-brand-navy)]/50 hover:shadow-[0_0_36px_rgba(63,160,255,0.25)]"
                    : "border-[var(--color-border-subtle)] bg-[var(--color-bg-elevated)]/60 hover:border-[var(--color-brand-blue)]/60"
                }`}
              >
                <div className="flex items-baseline justify-between mb-5">
                  <span className="font-mono tabular text-2xl font-bold text-[var(--color-brand-bright)]">
                    {m.n}
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.18em] font-semibold text-[var(--color-ink-tertiary)]">
                    {m.tag}
                  </span>
                </div>
                <h3 className="font-display text-xl md:text-2xl tracking-tight text-[var(--color-ink-primary)]">
                  {m.title}
                </h3>
                <p className="mt-3 text-sm text-[var(--color-ink-secondary)] leading-relaxed">
                  {m.body}
                </p>
                <div className="mt-6 pt-5 border-t border-[var(--color-border-subtle)] flex items-center justify-between gap-3">
                  <span className="text-sm font-semibold text-[var(--color-brand-bright)] break-all">
                    {m.cta}
                  </span>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="flex-shrink-0 text-[var(--color-brand-bright)]"
                  >
                    <path
                      d="M5 12h14M13 5l7 7-7 7"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
