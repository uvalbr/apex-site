import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { IndustryCard } from "@/components/industries-page/IndustryCard";
import { INDUSTRIES } from "@/lib/industries-data";

export const metadata: Metadata = {
  title: "Industries — Roofing, HVAC, Remodeling, Pool, GC",
  description:
    "APEX builds dedicated revenue operations infrastructure for 5 construction verticals. Each playbook is tuned to the math of that industry — speed-to-lead for roofing, dispatch + confirmation for HVAC, long-cycle nurture for remodeling and pool, lead scoring for GCs.",
  alternates: { canonical: "/industries" },
};

export default function IndustriesHubPage() {
  return (
    <>
      {/* ───────────────── Hero strip ───────────────── */}
      <section className="relative isolate overflow-hidden bg-hero-spine pt-32 pb-16 md:pt-44 md:pb-24">
        <div aria-hidden className="absolute inset-0 bg-grid pointer-events-none" />
        <div
          aria-hidden
          className="absolute inset-x-0 top-1/3 h-96 bg-glow-spot opacity-40 pointer-events-none"
        />

        <div className="relative container-wide">
          <Reveal>
            <SectionLabel number="02">Industries</SectionLabel>
            <h1 className="mt-5 font-display text-4xl sm:text-6xl md:text-[80px] leading-[0.98] tracking-[-0.035em] max-w-5xl">
              Built for the math of{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    "linear-gradient(120deg, #3FA0FF 0%, #1E5FD8 55%, #D9E6FF 100%)",
                }}
              >
                construction.
              </span>
            </h1>
          </Reveal>

          <Reveal delay={120}>
            <p className="mt-6 md:mt-8 max-w-3xl text-base md:text-xl text-[var(--color-ink-secondary)] leading-relaxed">
              Every vertical has its own revenue model, its own choke points, its own seasonality. We don&rsquo;t
              run one generic playbook across all five — we run{" "}
              <span className="text-[var(--color-ink-primary)] font-medium">
                five separate playbooks
              </span>
              , each built around the specific math of how that industry actually sells and delivers work.
            </p>
          </Reveal>

          {/* Inline counters strip */}
          <Reveal delay={220}>
            <div className="mt-10 md:mt-14 flex flex-wrap items-center gap-x-8 gap-y-4 text-xs text-[var(--color-ink-tertiary)] uppercase tracking-[0.18em]">
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-brand-bright)]" />
                5 vertical playbooks
              </span>
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-success)]" />
                $8K–$1.5M project values
              </span>
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-warn)]" />
                CRM-native integrations
              </span>
            </div>
          </Reveal>
        </div>

        {/* Bottom chevron divider */}
        <div aria-hidden className="absolute bottom-0 inset-x-0 h-6 overflow-hidden">
          <svg
            viewBox="0 0 1440 24"
            className="w-full h-full"
            preserveAspectRatio="none"
            fill="var(--color-bg-deep)"
          >
            <path d="M0 24 L60 0 L120 24 L180 0 L240 24 L300 0 L360 24 L420 0 L480 24 L540 0 L600 24 L660 0 L720 24 L780 0 L840 24 L900 0 L960 24 L1020 0 L1080 24 L1140 0 L1200 24 L1260 0 L1320 24 L1380 0 L1440 24 Z" />
          </svg>
        </div>
      </section>

      {/* ───────────────── Card grid ───────────────── */}
      <section className="relative py-20 md:py-32">
        <div className="container-app">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {INDUSTRIES.map((ind, i) => (
              <Reveal key={ind.slug} delay={i * 80}>
                <IndustryCard industry={ind} />
              </Reveal>
            ))}

            {/* 6th tile: "Don't see your vertical?" */}
            <Reveal delay={INDUSTRIES.length * 80}>
              <Link
                href="/contact"
                className="group relative block h-full rounded-2xl border border-dashed border-[var(--color-border-strong)] bg-transparent p-7 md:p-8 transition-all duration-500 hover:border-[var(--color-brand-blue)] hover:bg-[var(--color-bg-elevated)]/40"
              >
                <div className="h-full flex flex-col">
                  <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--color-ink-tertiary)]">
                    / other
                  </span>
                  <h3 className="mt-6 font-display text-2xl md:text-3xl text-[var(--color-ink-primary)] tracking-[-0.03em]">
                    Don&rsquo;t see your vertical?
                  </h3>
                  <p className="mt-3 text-sm md:text-base text-[var(--color-ink-secondary)] leading-relaxed flex-1">
                    Solar, fence, flooring, concrete, garage door, foundation, electrical. If you sell projects
                    $5K+ and your ops are leaking, the math still works.
                  </p>
                  <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--color-brand-bright)] group-hover:gap-2.5 transition-all duration-300">
                    Talk to us
                    <span
                      aria-hidden
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </span>
                </div>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ───────────────── Why construction only ───────────────── */}
      <section className="relative py-20 md:py-32 bg-[var(--color-bg-elevated)]/30 border-t border-[var(--color-border-subtle)]">
        <div aria-hidden className="absolute inset-0 bg-grid opacity-30" />

        <div className="relative container-wide">
          <div className="grid lg:grid-cols-[1fr_1.15fr] gap-12 lg:gap-20 items-start">
            <Reveal>
              <SectionLabel number="03">Why only construction</SectionLabel>
              <h2 className="mt-4 font-display text-3xl sm:text-5xl md:text-6xl tracking-[-0.035em] leading-[1.02]">
                We turned down four other industries
                <br />
                <span className="text-[var(--color-ink-tertiary)]">to be better at this one.</span>
              </h2>
            </Reveal>

            <Reveal delay={140}>
              <div className="space-y-6 text-base md:text-lg text-[var(--color-ink-secondary)] leading-relaxed">
                <p>
                  Generic BPOs and call centers serve construction the same way they serve dental practices,
                  insurance agencies, and SaaS companies — with the same script, the same agent training, the
                  same metrics. That works for $80 dental cleanings. It does not work for{" "}
                  <span className="text-[var(--color-ink-primary)] font-medium">$22,000 HVAC installs</span> or{" "}
                  <span className="text-[var(--color-ink-primary)] font-medium">$120,000 pool builds</span>.
                </p>
                <p>
                  Construction sales has its own physics. Storm seasons. Insurance pipelines. Decision-maker
                  pairs that need both spouses in the room. Six-month consideration cycles for high-ticket
                  outdoor builds. Replace-vs-repair conversion windows that close in 72 hours after a service
                  call. None of this is in a generic playbook.
                </p>
                <p>
                  Every agent we hire goes through 80 hours of construction-specific training before they
                  touch your phone. Every playbook is built around vertical-specific math, not channel-agnostic
                  &ldquo;best practices.&rdquo; That&rsquo;s the only way the unit economics work.
                </p>

                {/* Pillar bullets */}
                <ul className="mt-8 grid sm:grid-cols-2 gap-3 pt-2">
                  {WHY_PILLARS.map((p) => (
                    <li
                      key={p.label}
                      className="flex items-start gap-3 rounded-xl border border-[var(--color-border-subtle)] bg-[var(--color-bg-elevated)]/60 p-4"
                    >
                      <span className="mt-0.5 shrink-0 w-5 h-5 rounded-full bg-[var(--color-brand-blue)]/20 border border-[var(--color-brand-bright)]/40 grid place-items-center text-[10px] font-mono text-[var(--color-brand-bright)]">
                        ✓
                      </span>
                      <div>
                        <div className="text-sm font-semibold text-[var(--color-ink-primary)]">{p.label}</div>
                        <div className="text-xs text-[var(--color-ink-tertiary)] mt-1">{p.detail}</div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ───────────────── Bottom CTA ───────────────── */}
      <section className="relative py-24 md:py-36 overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 opacity-60 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(30,95,216,0.22), transparent 70%)",
          }}
        />
        <div className="relative container-app text-center">
          <Reveal>
            <SectionLabel number="04" className="justify-center">
              Get started
            </SectionLabel>
            <h2 className="mt-5 font-display text-3xl sm:text-5xl md:text-6xl tracking-[-0.035em] max-w-3xl mx-auto leading-[1.02]">
              Pick your vertical.
              <br />
              <span className="text-[var(--color-ink-tertiary)]">See exactly where you&rsquo;re leaking.</span>
            </h2>
          </Reveal>

          <Reveal delay={140}>
            <p className="mt-6 max-w-xl mx-auto text-base md:text-lg text-[var(--color-ink-secondary)]">
              Or run the diagnostic calculator on the homepage — it&rsquo;ll model your specific lead volume,
              close rate, and project value against APEX baselines for your industry.
            </p>
          </Reveal>

          <Reveal delay={220}>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 h-12 md:h-14 px-6 md:px-8 rounded-xl bg-[var(--color-brand-blue)] hover:bg-[var(--color-brand-bright)] text-white font-semibold text-sm md:text-base transition-all hover:shadow-[0_0_32px_rgba(63,160,255,0.55)]"
              >
                Book a 30-min diagnostic
                <span
                  aria-hidden
                  className="transition-transform duration-300 group-hover:translate-x-1"
                >
                  →
                </span>
              </Link>
              <Link
                href="/#simulator"
                className="inline-flex items-center gap-2 h-12 md:h-14 px-6 md:px-8 rounded-xl bg-transparent border border-[var(--color-border-strong)] text-[var(--color-ink-primary)] font-semibold text-sm md:text-base hover:bg-[var(--color-bg-elevated)] hover:border-[var(--color-brand-blue)] transition-all"
              >
                Run the simulator
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

const WHY_PILLARS = [
  {
    label: "Construction-only training",
    detail: "80 hours of vertical-specific onboarding before any agent touches a client line.",
  },
  {
    label: "CRM-native integrations",
    detail: "ServiceTitan, AccuLynx, JobNimbus, Buildertrend, Procore, JobTread, Housecall Pro.",
  },
  {
    label: "Insurance + claims literacy",
    detail: "Adjuster meetings, supplements, scope revisions — our agents speak the language.",
  },
  {
    label: "Storm & seasonal surge ops",
    detail: "Pre-staged capacity for hail events, heat waves, freeze emergencies, hurricane recovery.",
  },
];
