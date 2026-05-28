import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "404 — Page not found",
  description:
    "That route doesn't exist on apexrevenueoperations.com. Try the main entry points: services, pricing, industries, or book a diagnostic call.",
  robots: { index: false, follow: true },
};

const QUICK_LINKS: Array<{ label: string; href: string; helper: string }> = [
  { label: "Home", href: "/", helper: "Overview, simulator, and pricing morph." },
  { label: "Services", href: "/services", helper: "Five systems that run your revenue ops." },
  {
    label: "Industries",
    href: "/industries",
    helper: "Roofing, HVAC, remodeling, pool, GC playbooks.",
  },
  { label: "Pricing", href: "/pricing", helper: "Four tiers with transparent math." },
  { label: "Contact", href: "/contact", helper: "Book a 30-minute diagnostic call." },
];

export default function NotFound() {
  return (
    <section className="relative min-h-[calc(100vh-160px)] pt-32 md:pt-44 pb-20 md:pb-28 overflow-hidden flex items-center">
      {/* Backdrop — same vocabulary as the Hero */}
      <div aria-hidden className="absolute inset-0 bg-hero-spine opacity-95" />
      <div aria-hidden className="absolute inset-0 bg-grid opacity-40 pointer-events-none" />
      <div
        aria-hidden
        className="absolute inset-x-0 top-1/3 h-[480px] bg-glow-spot opacity-50 pointer-events-none"
      />
      <div
        aria-hidden
        className="absolute top-1/4 right-0 w-[520px] h-[520px] opacity-50 pointer-events-none blur-2xl"
        style={{
          background:
            "radial-gradient(circle, rgba(63,160,255,0.28), transparent 65%)",
        }}
      />

      <div className="relative container-app w-full">
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-20 items-center">
          {/* Left: the big 404 + copy */}
          <div>
            <div className="flex items-center gap-3">
              <span className="w-8 h-px bg-[var(--color-danger)]" />
              <span className="text-xs uppercase tracking-[0.22em] font-semibold text-[var(--color-danger)]">
                Error · 404
              </span>
            </div>

            <h1
              className="mt-6 font-display font-bold leading-[0.85] tracking-[-0.045em] text-[clamp(7rem,22vw,16rem)] bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(125deg, #3FA0FF 0%, #1E5FD8 45%, #5A6B85 100%)",
              }}
              aria-label="404"
            >
              404
            </h1>

            <p className="mt-6 font-display text-3xl sm:text-5xl md:text-6xl tracking-[-0.035em] leading-[1.04] max-w-3xl">
              Page not found.{" "}
              <span className="text-[var(--color-ink-tertiary)]">
                Either the URL is wrong, or we moved something and didn&rsquo;t leave a redirect.
                That&rsquo;s on us.
              </span>
            </p>

            <p className="mt-7 max-w-2xl text-base md:text-lg text-[var(--color-ink-secondary)] leading-relaxed">
              Try one of the main routes on the right. If you got here from a link inside the site,
              we&rsquo;d like to know — email{" "}
              <a
                href="mailto:hello@apexrevenueoperations.com"
                className="text-[var(--color-brand-bright)] underline underline-offset-4 hover:text-[var(--color-brand-blue)] transition-colors"
              >
                hello@apexrevenueoperations.com
              </a>{" "}
              with the broken URL.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                href="/"
                className="group inline-flex items-center gap-2 h-12 md:h-14 px-6 md:px-7 rounded-xl bg-[var(--color-brand-blue)] hover:bg-[var(--color-brand-bright)] text-white font-semibold text-sm md:text-base transition-all hover:shadow-[0_0_32px_rgba(63,160,255,0.55)]"
              >
                Back to home
                <span
                  aria-hidden
                  className="transition-transform duration-300 group-hover:translate-x-1"
                >
                  →
                </span>
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 h-12 md:h-14 px-6 md:px-7 rounded-xl bg-transparent border border-[var(--color-border-strong)] text-[var(--color-ink-primary)] font-semibold text-sm md:text-base hover:bg-[var(--color-bg-elevated)] hover:border-[var(--color-brand-blue)] transition-all"
              >
                Book a diagnostic instead
              </Link>
            </div>
          </div>

          {/* Right: quick-links panel */}
          <aside className="relative">
            <div className="absolute -top-8 -right-6 w-40 h-40 rounded-full bg-[var(--color-brand-blue)]/15 blur-3xl pointer-events-none" />
            <div className="relative rounded-3xl border border-[var(--color-border-subtle)] bg-[var(--color-bg-elevated)]/70 backdrop-blur-md p-7 md:p-8">
              <div className="flex items-baseline justify-between">
                <span className="text-xs uppercase tracking-[0.22em] font-semibold text-[var(--color-ink-tertiary)]">
                  Where you can go
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--color-ink-tertiary)]">
                  {QUICK_LINKS.length} routes
                </span>
              </div>

              <ul role="list" className="mt-6 divide-y divide-[var(--color-border-subtle)]">
                {QUICK_LINKS.map((link, i) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="group flex items-start gap-4 py-4 transition-colors"
                    >
                      <span
                        aria-hidden
                        className="font-mono text-[10px] tabular tracking-[0.22em] font-semibold text-[var(--color-ink-tertiary)] mt-1.5 group-hover:text-[var(--color-brand-bright)] transition-colors"
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="flex-1">
                        <span className="block font-display text-lg md:text-xl tracking-[-0.02em] text-[var(--color-ink-primary)] group-hover:text-[var(--color-brand-bright)] transition-colors">
                          {link.label}
                        </span>
                        <span className="mt-1 block text-sm text-[var(--color-ink-secondary)]">
                          {link.helper}
                        </span>
                      </span>
                      <span
                        aria-hidden
                        className="mt-2 text-[var(--color-ink-tertiary)] group-hover:text-[var(--color-brand-bright)] group-hover:translate-x-1 transition-all"
                      >
                        →
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
