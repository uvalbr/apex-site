"use client";

import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function CompanyNarrative() {
  return (
    <section className="relative py-20 md:py-32 border-t border-[var(--color-border-subtle)]">
      <div className="container-app">
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-10 lg:gap-16">
          <Reveal>
            <div className="lg:sticky lg:top-32">
              <SectionLabel number="02">The category</SectionLabel>
              <h2 className="mt-4 font-display text-3xl md:text-4xl tracking-[-0.035em] leading-[1.1]">
                Revenue Operations Infrastructure.
              </h2>
              <p className="mt-4 text-sm text-[var(--color-ink-tertiary)] leading-relaxed">
                A category that didn't exist for construction until it did.
              </p>
            </div>
          </Reveal>

          <div className="space-y-7 text-base md:text-lg text-[var(--color-ink-secondary)] leading-relaxed max-w-3xl">
            <Reveal delay={80}>
              <p>
                Most construction companies sit on the same problem: they spend $20K–$100K/month on
                lead generation, then lose 40–60% of those leads to slow response time, weak
                qualification, missed appointments, and inconsistent follow-up. The marketing team
                points to the lead count. The sales team points to the lead quality. Nobody owns
                the middle.
              </p>
            </Reveal>
            <Reveal delay={140}>
              <p>
                Two existing options try to fill that gap, and both fail differently. Generic BPOs
                and call centers treat your leads as queue volume — they hit dial counts, not
                outcomes, and rotate agents constantly. Building it in-house works but requires
                hiring, training, managing, and retaining 5–15 people you don't have time to
                manage, plus the HR, payroll, software, and oversight infrastructure that goes
                with it.
              </p>
            </Reveal>
            <Reveal delay={200}>
              <p>
                APEX is the third option. We build and run a{" "}
                <span className="text-[var(--color-ink-primary)] font-semibold">
                  dedicated revenue operations function
                </span>{" "}
                for your business specifically — your scripts, your CRM workflows, your KPIs, your
                team — but we own the infrastructure, the hiring, the management, and the
                accountability. You pay a monthly base, a per-appointment fee, and a revenue share
                on closed work. We get paid when you get paid.
              </p>
            </Reveal>
            <Reveal delay={260}>
              <p>
                We chose construction on purpose. Long sales cycles. High average deal values.
                Geographic complexity. Heavy reliance on appointment-set sales motion. Industries
                where speed-to-lead, show rate, and qualification quality directly compound into
                six- and seven-figure revenue swings. Roofing, HVAC, solar, pool construction,
                custom builds — the operators who already know they're losing money in the funnel,
                they just don't have a clean way to fix it.
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
