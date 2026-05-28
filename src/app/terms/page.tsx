import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms governing use of apexrevenueoperations.com. B2B marketing site, U.S. jurisdiction, no purchases through the site, contact-only relationship until a signed agreement.",
  alternates: { canonical: "https://apexrevenueoperations.com/terms" },
  openGraph: {
    type: "website",
    title: "Terms of Service — APEX Revenue Operations",
    description:
      "Terms governing use of the APEX Revenue Operations website. B2B marketing only.",
    url: "https://apexrevenueoperations.com/terms",
    siteName: "APEX Revenue Operations",
  },
  robots: { index: true, follow: true },
};

const EFFECTIVE_DATE = "May 24, 2026";

const SECTIONS: Array<{ number: string; heading: string; body: React.ReactNode }> = [
  {
    number: "01",
    heading: "What this agreement covers",
    body: (
      <>
        <p>
          These Terms of Service (&ldquo;Terms&rdquo;) govern your use of{" "}
          <span className="text-[var(--color-ink-primary)] font-medium">
            apexrevenueoperations.com
          </span>{" "}
          (the &ldquo;Site&rdquo;), operated by APEX Revenue Operations (&ldquo;APEX,&rdquo;
          &ldquo;we,&rdquo; or &ldquo;us&rdquo;). By accessing the Site you agree to these Terms. If
          you do not agree, do not use the Site.
        </p>
        <p>
          These Terms apply only to use of the Site itself. Paid client relationships are governed
          by a separate written services agreement and any associated statements of work executed
          between APEX and the client.
        </p>
      </>
    ),
  },
  {
    number: "02",
    heading: "Business audience only",
    body: (
      <>
        <p>
          The Site is intended for business owners, executives, and operators at U.S. construction
          companies — roofing, HVAC, remodeling, pool, general contracting, and adjacent verticals.
          Nothing on the Site is intended for or directed to consumers, residents under 16, or
          parties outside a legitimate business-evaluation context.
        </p>
      </>
    ),
  },
  {
    number: "03",
    heading: "No purchases or commitments through the Site",
    body: (
      <>
        <p>
          The Site does not sell anything directly. Tier pricing, ROI estimates, and engagement
          descriptions published on the Site are illustrative and subject to change. No commercial
          relationship is formed by visiting the Site, downloading material from it, requesting a
          diagnostic call, or exchanging email with us. A binding relationship requires a separate
          written agreement signed by an authorized representative of both parties.
        </p>
      </>
    ),
  },
  {
    number: "04",
    heading: "Information accuracy and forward-looking statements",
    body: (
      <>
        <p>
          We work to keep the Site accurate, but content evolves. Statistics, benchmarks, and
          industry averages are drawn from a combination of published industry data and our own
          aggregated client experience and are presented for orientation, not as guarantees.
        </p>
        <p>
          Any forward-looking statements about results, recovered revenue, conversion lift,
          speed-to-lead improvements, or other outcomes are estimates based on typical client
          experience. Your actual results depend on your market, sales process, lead quality,
          internal team, and a number of other factors outside our control. Past performance does
          not predict future results.
        </p>
      </>
    ),
  },
  {
    number: "05",
    heading: "Intellectual property",
    body: (
      <>
        <p>
          The Site, including text, layout, code, graphics, and the APEX name and visual identity,
          is owned by APEX Revenue Operations or its licensors and is protected by U.S. and
          international intellectual-property law. You may view and link to the Site for legitimate
          business-evaluation purposes.
        </p>
        <p>
          You may not copy, scrape, mirror, frame, republish, sell, or use the Site or its content
          to train machine-learning models without prior written permission. You may not strip,
          alter, or obscure trademark notices.
        </p>
      </>
    ),
  },
  {
    number: "06",
    heading: "Acceptable use",
    body: (
      <>
        <p>You agree not to:</p>
        <ul className="list-disc pl-6 space-y-2 marker:text-[var(--color-brand-bright)]">
          <li>
            Attempt to gain unauthorized access to any system or non-public area of the Site.
          </li>
          <li>
            Probe, scan, or test the vulnerability of any system or network associated with the
            Site without explicit written permission.
          </li>
          <li>
            Use automated tools to crawl, scrape, or mass-download the Site at a rate that imposes
            an unreasonable load.
          </li>
          <li>
            Use the Site or its contact channels to send spam, phishing attempts, malware, or any
            unlawful or harassing content.
          </li>
          <li>Impersonate APEX or any APEX employee or contractor.</li>
        </ul>
      </>
    ),
  },
  {
    number: "07",
    heading: "Third-party links",
    body: (
      <>
        <p>
          The Site may link to third-party websites or resources. We do not control those sites and
          are not responsible for their content, accuracy, or privacy practices. Linking does not
          imply endorsement.
        </p>
      </>
    ),
  },
  {
    number: "08",
    heading: "Warranty disclaimer",
    body: (
      <>
        <p>
          The Site is provided <span className="text-[var(--color-ink-primary)] font-medium">&ldquo;as is&rdquo;</span>
          {" "}and{" "}
          <span className="text-[var(--color-ink-primary)] font-medium">&ldquo;as available.&rdquo;</span>{" "}
          To the maximum extent allowed by law, APEX disclaims all warranties, express or implied,
          including warranties of merchantability, fitness for a particular purpose, accuracy of
          information, and non-infringement. We do not warrant that the Site will be uninterrupted,
          error-free, or free of viruses or other harmful components.
        </p>
      </>
    ),
  },
  {
    number: "09",
    heading: "Limitation of liability",
    body: (
      <>
        <p>
          To the maximum extent permitted by law, APEX and its officers, employees, and contractors
          will not be liable for any indirect, incidental, special, consequential, exemplary, or
          punitive damages, or any loss of profits, revenue, data, goodwill, or business
          opportunity, arising out of or related to your use of the Site, even if advised of the
          possibility of such damages. Our total aggregate liability arising from or related to use
          of the Site will not exceed one hundred U.S. dollars (USD 100).
        </p>
        <p>
          Nothing in this section limits liability where limitation is prohibited by applicable
          law, including for gross negligence, willful misconduct, or fraud.
        </p>
      </>
    ),
  },
  {
    number: "10",
    heading: "Governing law and venue",
    body: (
      <>
        <p>
          These Terms are governed by the laws of the State of Texas, U.S.A., without regard to its
          conflict-of-laws principles. Any dispute arising out of or related to these Terms or your
          use of the Site will be brought exclusively in the state or federal courts located in
          Texas, and you consent to personal jurisdiction in those courts.
        </p>
      </>
    ),
  },
  {
    number: "11",
    heading: "Changes and contact",
    body: (
      <>
        <p>
          We may update these Terms at any time. The effective date below will move when that
          happens, and material changes will be flagged on the Site. Your continued use after the
          effective date of an update constitutes acceptance of the updated Terms.
        </p>
        <p>
          Questions:{" "}
          <a
            href="mailto:hello@apexrevenueoperations.com"
            className="text-[var(--color-brand-bright)] underline underline-offset-4 hover:text-[var(--color-brand-blue)] transition-colors"
          >
            hello@apexrevenueoperations.com
          </a>
          .
        </p>
      </>
    ),
  },
];

export default function TermsPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 md:pt-44 pb-12 md:pb-20 overflow-hidden">
        <div aria-hidden className="absolute inset-0 bg-hero-spine opacity-90" />
        <div aria-hidden className="absolute inset-0 bg-grid opacity-40" />
        <div className="relative container-app">
          <Reveal>
            <SectionLabel number="02">Legal</SectionLabel>
            <h1 className="mt-5 font-display text-4xl sm:text-6xl md:text-7xl tracking-[-0.035em] leading-[0.98] max-w-4xl">
              Terms of Service{" "}
              <span className="text-[var(--color-ink-tertiary)]">
                — the rules for using this site.
              </span>
            </h1>
          </Reveal>
          <Reveal delay={140}>
            <p className="mt-7 max-w-3xl text-base md:text-xl text-[var(--color-ink-secondary)] leading-relaxed">
              This site is a B2B marketing site for U.S. construction operators. There&rsquo;s
              nothing to buy here. A commercial relationship requires a signed agreement — never
              just an email or a page visit.
            </p>
          </Reveal>
          <Reveal delay={220}>
            <div className="mt-8 inline-flex items-center gap-3 rounded-full border border-[var(--color-border-subtle)] bg-[var(--color-bg-elevated)]/60 backdrop-blur-md px-5 py-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-success)] shadow-[0_0_8px_#22C55E]" />
              <span className="text-xs uppercase tracking-[0.22em] font-semibold text-[var(--color-ink-tertiary)]">
                Effective {EFFECTIVE_DATE}
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Body */}
      <section className="relative py-16 md:py-24">
        <div className="container-app max-w-4xl">
          <div className="space-y-14 md:space-y-20">
            {SECTIONS.map((s) => (
              <Reveal key={s.number}>
                <article id={`section-${s.number}`} className="scroll-mt-32">
                  <div className="flex items-baseline gap-4 mb-5">
                    <span className="font-mono text-[11px] tracking-[0.22em] font-semibold text-[var(--color-brand-bright)]">
                      {s.number}
                    </span>
                    <span className="flex-1 h-px bg-[var(--color-border-subtle)]" />
                  </div>
                  <h2 className="font-display text-2xl md:text-4xl tracking-[-0.025em] leading-tight text-[var(--color-ink-primary)]">
                    {s.heading}
                  </h2>
                  <div className="mt-6 space-y-5 text-base md:text-lg leading-relaxed text-[var(--color-ink-secondary)]">
                    {s.body}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          {/* Footer nav */}
          <div className="mt-20 md:mt-28 pt-10 border-t border-[var(--color-border-subtle)] flex flex-wrap items-center justify-between gap-6">
            <p className="text-sm text-[var(--color-ink-tertiary)]">
              See also:{" "}
              <Link
                href="/privacy"
                className="text-[var(--color-brand-bright)] hover:text-[var(--color-brand-blue)] underline underline-offset-4 transition-colors"
              >
                Privacy Policy
              </Link>
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-brand-bright)] hover:gap-3 transition-all"
            >
              Contractual question? Contact us
              <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
