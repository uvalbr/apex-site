import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { IndustryIcon } from "@/components/industries-page/IndustryIcon";
import { AnimatedCounter } from "@/components/industries-page/AnimatedCounter";
import { FaqAccordion } from "@/components/industries-page/FaqAccordion";
import {
  INDUSTRIES,
  INDUSTRY_SLUGS,
  getIndustryBySlug,
  type Industry,
} from "@/lib/industries-data";
import { cn } from "@/lib/cn";

// ──────────────────────────────────────────────────────────────────
// Static generation — required for `output: "export"`
// ──────────────────────────────────────────────────────────────────
export function generateStaticParams() {
  return INDUSTRY_SLUGS.map((slug) => ({ slug }));
}

export const dynamicParams = false;

// Per-vertical metadata
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const industry = getIndustryBySlug(slug);
  if (!industry) return {};
  return {
    title: `${industry.label} — Revenue Operations Built for ${industry.label}`,
    description: `${industry.heroHeadline} ${industry.heroHeadlineAccent} — APEX runs the revenue operations layer ${industry.label.toLowerCase()} companies need: speed-to-lead, qualified booking, confirmation systems, and disciplined pipeline nurture.`,
    alternates: { canonical: `/industries/${industry.slug}` },
  };
}

// ──────────────────────────────────────────────────────────────────
// Page
// ──────────────────────────────────────────────────────────────────
export default async function IndustryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const industry = getIndustryBySlug(slug);
  if (!industry) notFound();

  // Related industries (the other 4, in display order)
  const related = INDUSTRIES.filter((i) => i.slug !== industry.slug).slice(0, 3);

  return (
    <>
      <Hero industry={industry} />
      <VerticalMath industry={industry} />
      <RevenueLeaks industry={industry} />
      <ApexTactics industry={industry} />
      <RoiPanel industry={industry} />
      <FaqSection industry={industry} />
      <RelatedAndCta industry={industry} related={related} />
    </>
  );
}

// ───────────────────── Hero ─────────────────────
function Hero({ industry }: { industry: Industry }) {
  return (
    <section className="relative isolate overflow-hidden bg-hero-spine pt-32 pb-20 md:pt-44 md:pb-28">
      <div aria-hidden className="absolute inset-0 bg-grid pointer-events-none" />
      <div
        aria-hidden
        className="absolute top-1/4 right-0 w-[480px] h-[480px] opacity-50 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(63,160,255,0.22), transparent 65%)",
        }}
      />

      <div className="relative container-wide">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 text-xs text-[var(--color-ink-tertiary)] uppercase tracking-[0.22em] font-semibold"
        >
          <Link href="/industries" className="hover:text-[var(--color-brand-bright)] transition-colors">
            Industries
          </Link>
          <span aria-hidden>/</span>
          <span className="text-[var(--color-brand-bright)]">{industry.navLabel}</span>
        </nav>

        <div className="mt-8 grid lg:grid-cols-[1.4fr_1fr] gap-10 lg:gap-16 items-start">
          {/* Left: copy */}
          <div>
            <Reveal>
              <div className="flex items-center gap-3">
                <span className="w-8 h-px bg-[var(--color-brand-bright)]" />
                <span className="eyebrow">{industry.heroEyebrow}</span>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <h1 className="mt-6 font-display text-4xl sm:text-6xl md:text-[80px] leading-[0.98] tracking-[-0.035em]">
                {industry.heroHeadline}
                <br />
                <span
                  className="bg-clip-text text-transparent"
                  style={{
                    backgroundImage:
                      "linear-gradient(120deg, #3FA0FF 0%, #1E5FD8 55%, #D9E6FF 100%)",
                  }}
                >
                  {industry.heroHeadlineAccent}
                </span>
              </h1>
            </Reveal>

            <Reveal delay={220}>
              <p className="mt-7 md:mt-9 max-w-2xl text-base md:text-xl text-[var(--color-ink-secondary)] leading-relaxed">
                {industry.heroSub}
              </p>
            </Reveal>

            <Reveal delay={320}>
              <div className="mt-8 md:mt-10 flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-2 h-12 md:h-14 px-6 md:px-7 rounded-xl bg-[var(--color-brand-blue)] hover:bg-[var(--color-brand-bright)] text-white font-semibold text-sm md:text-base transition-all hover:shadow-[0_0_32px_rgba(63,160,255,0.55)]"
                >
                  Book a {industry.shortLabel.toLowerCase()} diagnostic
                  <span
                    aria-hidden
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  >
                    →
                  </span>
                </Link>
                <Link
                  href="/#simulator"
                  className="inline-flex items-center gap-2 h-12 md:h-14 px-6 md:px-7 rounded-xl bg-transparent border border-[var(--color-border-strong)] text-[var(--color-ink-primary)] font-semibold text-sm md:text-base hover:bg-[var(--color-bg-elevated)] hover:border-[var(--color-brand-blue)] transition-all"
                >
                  Model your numbers
                </Link>
              </div>
            </Reveal>
          </div>

          {/* Right: stat block + glyph */}
          <Reveal delay={300}>
            <div className="relative">
              <div className="absolute -top-6 -right-6 w-32 h-32 rounded-full bg-[var(--color-brand-blue)]/10 blur-3xl" />
              <div className="relative rounded-3xl border border-[var(--color-border-subtle)] bg-[var(--color-bg-elevated)]/70 backdrop-blur-md p-7 md:p-8">
                <div className="flex items-start justify-between">
                  <span className="text-[var(--color-brand-bright)] scale-110">
                    <IndustryIcon slug={industry.slug} />
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--color-ink-tertiary)]">
                    {industry.personality.replace(/-/g, " ")}
                  </span>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-5">
                  <MiniStat
                    label="Avg project"
                    value={`$${industry.projectValueLow / 1000}K`}
                    suffix={` – $${industry.projectValueHigh / 1000 >= 1000 ? `${(industry.projectValueHigh / 1000000).toFixed(industry.projectValueHigh >= 1000000 ? 1 : 0)}M` : `${industry.projectValueHigh / 1000}K`}`}
                  />
                  <MiniStat
                    label="Monthly leads"
                    value={String(industry.monthlyLeadsLow)}
                    suffix={` – ${industry.monthlyLeadsHigh}`}
                  />
                  <MiniStat
                    label="Close rate"
                    value={`${(industry.baselineCloseRate * 100).toFixed(0)}%`}
                    helper="industry baseline"
                  />
                  <MiniStat
                    label="No-shows"
                    value={`${(industry.baselineNoShow * 100).toFixed(0)}%`}
                    helper="without confirmation"
                    accent="warn"
                  />
                </div>

                <div className="mt-7 pt-6 border-t border-[var(--color-border-subtle)]">
                  <div className="flex items-baseline justify-between">
                    <span className="text-xs uppercase tracking-[0.22em] font-semibold text-[var(--color-ink-tertiary)]">
                      Industry speed-to-lead
                    </span>
                    <span className="font-mono tabular text-lg font-bold text-[var(--color-danger)]">
                      {industry.baselineSpeedMinutes} min
                    </span>
                  </div>
                  <div className="mt-3 h-2 rounded-full bg-[var(--color-bg-deep)] overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[var(--color-warn)] to-[var(--color-danger)]"
                      style={{ width: `${Math.min(100, (industry.baselineSpeedMinutes / 60) * 100)}%` }}
                    />
                  </div>
                  <div className="mt-3 flex items-baseline justify-between">
                    <span className="text-xs uppercase tracking-[0.22em] font-semibold text-[var(--color-brand-bright)]">
                      APEX speed-to-lead
                    </span>
                    <span className="font-mono tabular text-lg font-bold text-[var(--color-success)]">
                      &lt; 90 sec
                    </span>
                  </div>
                  <div className="mt-3 h-2 rounded-full bg-[var(--color-bg-deep)] overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: "4%",
                        background:
                          "linear-gradient(90deg, var(--color-brand-blue), var(--color-brand-bright))",
                        boxShadow: "0 0 12px rgba(63,160,255,0.6)",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      <ChevronDivider />
    </section>
  );
}

function MiniStat({
  label,
  value,
  suffix,
  helper,
  accent,
}: {
  label: string;
  value: string;
  suffix?: string;
  helper?: string;
  accent?: "warn";
}) {
  const color = accent === "warn" ? "text-[var(--color-warn)]" : "text-[var(--color-ink-primary)]";
  return (
    <div>
      <div className="text-[10px] uppercase tracking-[0.22em] font-semibold text-[var(--color-ink-tertiary)]">
        {label}
      </div>
      <div className={cn("mt-1.5 font-mono tabular text-xl md:text-2xl font-bold leading-none", color)}>
        {value}
        {suffix && (
          <span className="text-sm md:text-base text-[var(--color-ink-secondary)] font-medium">
            {suffix}
          </span>
        )}
      </div>
      {helper && (
        <div className="mt-1 text-[10px] text-[var(--color-ink-tertiary)]">{helper}</div>
      )}
    </div>
  );
}

// ───────────────────── Vertical math panel ─────────────────────
function VerticalMath({ industry }: { industry: Industry }) {
  return (
    <section className="relative py-20 md:py-32">
      <div className="container-wide">
        <Reveal>
          <SectionLabel number="01">The {industry.shortLabel} math</SectionLabel>
          <h2 className="mt-4 font-display text-3xl sm:text-5xl md:text-6xl tracking-[-0.035em] max-w-3xl leading-[1.04]">
            What this vertical actually looks like
            <span className="text-[var(--color-ink-tertiary)]">,</span>
            <br />
            <span className="text-[var(--color-ink-tertiary)]">
              in numbers we trust.
            </span>
          </h2>
        </Reveal>

        <Reveal delay={120}>
          <p className="mt-5 max-w-2xl text-base md:text-lg text-[var(--color-ink-secondary)]">
            These are aggregated from our active {industry.label} clients plus published industry baselines.
            Your specific numbers will vary — that&rsquo;s what the diagnostic call is for.
          </p>
        </Reveal>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {industry.verticalMath.map((stat, i) => (
            <Reveal key={i} delay={i * 70}>
              <MathCard {...stat} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function MathCard({
  label,
  value,
  helper,
  accent,
}: {
  label: string;
  value: string;
  helper: string;
  accent?: "brand" | "warn" | "success" | "danger";
}) {
  const tone =
    accent === "brand"
      ? "border-[var(--color-brand-bright)]/35 bg-[var(--color-brand-blue)]/10"
      : accent === "warn"
      ? "border-[var(--color-warn)]/35 bg-[var(--color-warn)]/5"
      : accent === "danger"
      ? "border-[var(--color-danger)]/35 bg-[var(--color-danger)]/5"
      : accent === "success"
      ? "border-[var(--color-success)]/35 bg-[var(--color-success)]/5"
      : "border-[var(--color-border-subtle)] bg-[var(--color-bg-elevated)]/60";

  const valueColor =
    accent === "brand"
      ? "text-[var(--color-brand-bright)]"
      : accent === "warn"
      ? "text-[var(--color-warn)]"
      : accent === "danger"
      ? "text-[var(--color-danger)]"
      : accent === "success"
      ? "text-[var(--color-success)]"
      : "text-[var(--color-ink-primary)]";

  return (
    <div
      className={cn(
        "rounded-2xl border p-6 md:p-7 backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--color-brand-blue)]",
        tone
      )}
    >
      <div className="text-[10px] uppercase tracking-[0.22em] font-semibold text-[var(--color-ink-tertiary)]">
        {label}
      </div>
      <div className={cn("mt-3 font-mono tabular text-3xl md:text-4xl font-bold leading-none", valueColor)}>
        {value}
      </div>
      <div className="mt-3 text-xs md:text-sm text-[var(--color-ink-secondary)]">{helper}</div>
    </div>
  );
}

// ───────────────────── Revenue leaks ─────────────────────
function RevenueLeaks({ industry }: { industry: Industry }) {
  return (
    <section className="relative py-20 md:py-32 bg-[var(--color-bg-elevated)]/30 border-y border-[var(--color-border-subtle)]">
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-32 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(239,68,68,0.05), transparent 100%)",
        }}
      />

      <div className="relative container-wide">
        <div className="grid lg:grid-cols-[0.9fr_1.4fr] gap-12 lg:gap-16 items-start">
          <Reveal>
            <SectionLabel number="02" className="text-[var(--color-danger)]">
              <span className="text-[var(--color-danger)]">Where revenue leaks</span>
            </SectionLabel>
            <h2 className="mt-4 font-display text-3xl sm:text-5xl md:text-6xl tracking-[-0.035em] leading-[1.04]">
              The {industry.shortLabel.toLowerCase()} pipeline
              <br />
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    "linear-gradient(120deg, #EF4444 0%, #F59E0B 60%, #5A6B85 100%)",
                }}
              >
                breaks in 4 places.
              </span>
            </h2>
            <p className="mt-6 text-base md:text-lg text-[var(--color-ink-secondary)] leading-relaxed">
              Every leak below is something we&rsquo;ve diagnosed in a live {industry.label.toLowerCase()} client
              account. The numbers are real ranges. The fixes are operational, not magical.
            </p>
          </Reveal>

          <div className="space-y-4 md:space-y-5">
            {industry.leaks.map((leak, i) => (
              <Reveal key={i} delay={i * 100}>
                <LeakCard {...leak} index={i + 1} />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function LeakCard({
  title,
  detail,
  cost,
  index,
}: {
  title: string;
  detail: string;
  cost: string;
  index: number;
}) {
  return (
    <div className="group relative rounded-2xl border border-[var(--color-border-subtle)] bg-[var(--color-bg-elevated)]/60 backdrop-blur-md p-6 md:p-7 transition-all duration-300 hover:border-[var(--color-danger)]/40 hover:bg-[var(--color-bg-elevated)]">
      <div className="flex items-start gap-5">
        <div className="shrink-0 w-10 h-10 rounded-xl border border-[var(--color-danger)]/30 bg-[var(--color-danger)]/10 grid place-items-center font-mono text-sm font-bold text-[var(--color-danger)]">
          {String(index).padStart(2, "0")}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline justify-between gap-4 flex-wrap">
            <h3 className="font-display text-xl md:text-2xl text-[var(--color-ink-primary)] tracking-[-0.025em] leading-tight">
              {title}
            </h3>
            <span className="font-mono tabular text-sm md:text-base font-bold text-[var(--color-danger)] whitespace-nowrap">
              −{cost}
            </span>
          </div>
          <p className="mt-3 text-sm md:text-base text-[var(--color-ink-secondary)] leading-relaxed">
            {detail}
          </p>
        </div>
      </div>
    </div>
  );
}

// ───────────────────── APEX tactics ─────────────────────
function ApexTactics({ industry }: { industry: Industry }) {
  return (
    <section className="relative py-20 md:py-32">
      <div aria-hidden className="absolute inset-0 bg-grid opacity-30" />
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-72 bg-glow-spot opacity-40 pointer-events-none"
      />

      <div className="relative container-wide">
        <Reveal>
          <SectionLabel number="03">How APEX runs {industry.shortLabel.toLowerCase()}</SectionLabel>
          <h2 className="mt-4 font-display text-3xl sm:text-5xl md:text-6xl tracking-[-0.035em] max-w-4xl leading-[1.04]">
            The operational playbook
            <br />
            <span className="text-[var(--color-ink-tertiary)]">we run on your behalf.</span>
          </h2>
        </Reveal>

        <Reveal delay={120}>
          <p className="mt-5 max-w-2xl text-base md:text-lg text-[var(--color-ink-secondary)]">
            Not a script. Not a generic call-center playbook. A {industry.label.toLowerCase()}-specific
            operating system that plugs into your existing CRM, calendar, and sales team.
          </p>
        </Reveal>

        <div className="mt-12 grid lg:grid-cols-2 gap-4 md:gap-5">
          {industry.tactics.map((tactic, i) => (
            <Reveal key={i} delay={i * 90}>
              <TacticCard {...tactic} index={i + 1} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function TacticCard({
  title,
  detail,
  index,
}: {
  title: string;
  detail: string;
  index: number;
}) {
  return (
    <div className="group relative h-full rounded-2xl border border-[var(--color-border-subtle)] bg-[var(--color-bg-elevated)]/60 backdrop-blur-md p-6 md:p-7 transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--color-brand-blue)] hover:shadow-[0_0_32px_-12px_rgba(63,160,255,0.4)]">
      {/* Top accent line */}
      <span
        aria-hidden
        className="absolute inset-x-7 top-0 h-px bg-gradient-to-r from-transparent via-[var(--color-brand-bright)]/40 to-transparent"
      />

      <div className="flex items-start gap-5">
        <div className="shrink-0 w-10 h-10 rounded-xl border border-[var(--color-brand-blue)]/40 bg-[var(--color-brand-blue)]/15 grid place-items-center font-mono text-sm font-bold text-[var(--color-brand-bright)]">
          {String(index).padStart(2, "0")}
        </div>
        <div className="flex-1">
          <h3 className="font-display text-xl md:text-2xl text-[var(--color-ink-primary)] tracking-[-0.025em] leading-tight">
            {title}
          </h3>
          <p className="mt-3 text-sm md:text-base text-[var(--color-ink-secondary)] leading-relaxed">
            {detail}
          </p>
        </div>
      </div>
    </div>
  );
}

// ───────────────────── ROI panel ─────────────────────
function RoiPanel({ industry }: { industry: Industry }) {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      <div className="container-wide">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-[var(--color-brand-blue)]/40 bg-gradient-to-br from-[var(--color-bg-elevated)] via-[var(--color-bg-elevated)] to-[var(--color-brand-navy)] p-8 md:p-14">
            <div
              aria-hidden
              className="absolute inset-0 opacity-60 pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle at 85% 10%, rgba(63,160,255,0.28), transparent 55%)",
              }}
            />
            <div className="relative grid lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-16 items-center">
              <div>
                <SectionLabel number="04">The math, made personal</SectionLabel>
                <h2 className="mt-4 font-display text-3xl sm:text-5xl md:text-[56px] tracking-[-0.035em] leading-[1.04]">
                  A single {industry.shortLabel.toLowerCase()} project
                  <br />
                  <span className="text-[var(--color-ink-tertiary)]">closes at</span>{" "}
                  <span className="text-[var(--color-brand-bright)] font-mono tabular">
                    $
                    <AnimatedCounter value={industry.roiSnippet.avgProject} />
                  </span>
                  <span className="text-[var(--color-ink-tertiary)]">.</span>
                </h2>
                <p className="mt-6 text-base md:text-lg text-[var(--color-ink-secondary)] leading-relaxed max-w-2xl">
                  {industry.roiSnippet.sentence}
                </p>
              </div>

              <div className="relative">
                <div className="rounded-2xl border border-[var(--color-brand-bright)]/30 bg-[var(--color-bg-deep)]/50 backdrop-blur-md p-6 md:p-8">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-success)] shadow-[0_0_8px_#22C55E]" />
                    <span className="text-[10px] uppercase tracking-[0.22em] font-semibold text-[var(--color-success)]">
                      Annual recovery — typical year-one
                    </span>
                  </div>
                  <div className="mt-4 font-mono tabular text-5xl md:text-6xl font-bold leading-none text-[var(--color-ink-primary)]">
                    +$
                    <AnimatedCounter
                      value={industry.roiSnippet.annualImpact}
                      divisor={1000}
                      suffix="K"
                    />
                  </div>
                  <div className="mt-5 grid grid-cols-2 gap-4 pt-5 border-t border-[var(--color-border-subtle)]">
                    <div>
                      <div className="text-[10px] uppercase tracking-[0.22em] font-semibold text-[var(--color-ink-tertiary)]">
                        Per month
                      </div>
                      <div className="mt-1 font-mono tabular text-xl font-bold text-[var(--color-brand-bright)]">
                        +
                        <AnimatedCounter
                          value={Math.round(industry.roiSnippet.annualImpact / 12 / 1000)}
                          prefix="$"
                          suffix="K"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] uppercase tracking-[0.22em] font-semibold text-[var(--color-ink-tertiary)]">
                        Deals recovered/mo
                      </div>
                      <div className="mt-1 font-mono tabular text-xl font-bold text-[var(--color-brand-bright)]">
                        +<AnimatedCounter value={industry.roiSnippet.recoveredPerMonth} />
                      </div>
                    </div>
                  </div>
                </div>
                <p className="mt-4 text-xs text-[var(--color-ink-tertiary)]">
                  Model based on aggregated APEX {industry.label.toLowerCase()} client baselines. Real
                  results vary by market and sales process.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ───────────────────── FAQ ─────────────────────
function FaqSection({ industry }: { industry: Industry }) {
  return (
    <section className="relative py-20 md:py-32 bg-[var(--color-bg-elevated)]/30 border-t border-[var(--color-border-subtle)]">
      <div className="container-app">
        <div className="grid lg:grid-cols-[0.85fr_1.4fr] gap-12 lg:gap-16 items-start">
          <Reveal>
            <SectionLabel number="05">FAQ</SectionLabel>
            <h2 className="mt-4 font-display text-3xl sm:text-5xl md:text-6xl tracking-[-0.035em] leading-[1.04]">
              {industry.shortLabel} operators
              <br />
              <span className="text-[var(--color-ink-tertiary)]">ask us this most.</span>
            </h2>
            <p className="mt-6 text-base md:text-lg text-[var(--color-ink-secondary)] leading-relaxed">
              Answers below are real — pulled from actual discovery calls with {industry.label.toLowerCase()}{" "}
              owners and ops leaders.
            </p>
            <div className="mt-8 hidden lg:block">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-brand-bright)] hover:gap-3 transition-all"
              >
                Ask us yours
                <span aria-hidden>→</span>
              </Link>
            </div>
          </Reveal>

          <Reveal delay={140}>
            <FaqAccordion items={industry.faqs} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ───────────────────── Related + CTA ─────────────────────
function RelatedAndCta({
  industry,
  related,
}: {
  industry: Industry;
  related: Industry[];
}) {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 opacity-60 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 30%, rgba(30,95,216,0.18), transparent 70%)",
        }}
      />

      <div className="relative container-wide">
        <Reveal>
          <div className="rounded-3xl border border-[var(--color-border-subtle)] bg-[var(--color-bg-elevated)]/60 backdrop-blur-md p-8 md:p-14 text-center">
            <SectionLabel number="06" className="justify-center">
              Get started
            </SectionLabel>
            <h2 className="mt-5 font-display text-3xl sm:text-5xl md:text-6xl tracking-[-0.035em] max-w-3xl mx-auto leading-[1.04]">
              Ready to plug a revenue ops layer
              <br />
              <span className="text-[var(--color-ink-tertiary)]">
                into your {industry.label.toLowerCase()} business?
              </span>
            </h2>
            <p className="mt-6 max-w-xl mx-auto text-base md:text-lg text-[var(--color-ink-secondary)]">
              30-minute diagnostic call. We&rsquo;ll review your current numbers and show you exactly which
              levers move first.
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 h-12 md:h-14 px-6 md:px-8 rounded-xl bg-[var(--color-brand-blue)] hover:bg-[var(--color-brand-bright)] text-white font-semibold text-sm md:text-base transition-all hover:shadow-[0_0_32px_rgba(63,160,255,0.55)]"
              >
                Book the diagnostic
                <span
                  aria-hidden
                  className="transition-transform duration-300 group-hover:translate-x-1"
                >
                  →
                </span>
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center gap-2 h-12 md:h-14 px-6 md:px-8 rounded-xl bg-transparent border border-[var(--color-border-strong)] text-[var(--color-ink-primary)] font-semibold text-sm md:text-base hover:bg-[var(--color-bg-elevated)] hover:border-[var(--color-brand-blue)] transition-all"
              >
                See pricing
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 h-12 md:h-14 px-6 md:px-8 rounded-xl bg-transparent border border-[var(--color-border-strong)] text-[var(--color-ink-primary)] font-semibold text-sm md:text-base hover:bg-[var(--color-bg-elevated)] hover:border-[var(--color-brand-blue)] transition-all"
              >
                Services overview
              </Link>
            </div>
          </div>
        </Reveal>

        {/* Related verticals */}
        <div className="mt-20 md:mt-28">
          <Reveal>
            <div className="flex items-baseline justify-between mb-8 flex-wrap gap-4">
              <h3 className="font-display text-2xl md:text-3xl tracking-[-0.025em]">
                Other verticals we run
              </h3>
              <Link
                href="/industries"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-brand-bright)] hover:gap-3 transition-all"
              >
                All industries
                <span aria-hidden>→</span>
              </Link>
            </div>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {related.map((r, i) => (
              <Reveal key={r.slug} delay={i * 80}>
                <Link
                  href={`/industries/${r.slug}`}
                  className="group block rounded-2xl border border-[var(--color-border-subtle)] bg-[var(--color-bg-elevated)]/50 backdrop-blur-md p-6 transition-all duration-300 hover:border-[var(--color-brand-blue)] hover:-translate-y-1 hover:bg-[var(--color-bg-elevated)]"
                >
                  <div className="flex items-start justify-between">
                    <span className="text-[var(--color-brand-bright)]">
                      <IndustryIcon slug={r.slug} className="w-9 h-9" />
                    </span>
                    <span className="text-xs text-[var(--color-ink-tertiary)] uppercase tracking-[0.22em] mt-1">
                      {r.hubCardStat.value}
                    </span>
                  </div>
                  <div className="mt-5 font-display text-xl text-[var(--color-ink-primary)] tracking-[-0.025em]">
                    {r.label}
                  </div>
                  <div className="mt-2 text-sm text-[var(--color-ink-secondary)] line-clamp-2">
                    {r.hubCardHook}
                  </div>
                  <div className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--color-brand-bright)] group-hover:gap-2.5 transition-all">
                    View
                    <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
                      →
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ───────────────────── Helpers ─────────────────────
function ChevronDivider() {
  return (
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
  );
}
