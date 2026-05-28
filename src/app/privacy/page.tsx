import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How APEX Revenue Operations handles information on this site: no third-party tracking, no cookies, hosting-level access logs only, and direct-to-email contact.",
  alternates: { canonical: "https://apexrevenueoperations.com/privacy" },
  openGraph: {
    type: "website",
    title: "Privacy Policy — APEX Revenue Operations",
    description:
      "How APEX Revenue Operations handles information on this site. GDPR and CCPA aware.",
    url: "https://apexrevenueoperations.com/privacy",
    siteName: "APEX Revenue Operations",
  },
  robots: { index: true, follow: true },
};

const EFFECTIVE_DATE = "May 24, 2026";

const SECTIONS: Array<{ number: string; heading: string; body: React.ReactNode }> = [
  {
    number: "01",
    heading: "Who this policy covers",
    body: (
      <>
        <p>
          This policy describes how APEX Revenue Operations (&ldquo;APEX,&rdquo; &ldquo;we,&rdquo; or
          &ldquo;us&rdquo;) handles information collected through{" "}
          <span className="text-[var(--color-ink-primary)] font-medium">
            apexrevenueoperations.com
          </span>
          . It applies to anyone who visits this website or contacts us via the email address
          published on it.
        </p>
        <p>
          It does <span className="text-[var(--color-ink-primary)] font-medium">not</span> describe
          the data-handling practices inside paid client engagements — those are governed by the
          signed services agreement and data-processing addendum executed at the start of each
          engagement.
        </p>
      </>
    ),
  },
  {
    number: "02",
    heading: "What this website collects",
    body: (
      <>
        <p>
          This site is a static marketing site. It does not run analytics scripts, advertising
          pixels, social-media trackers, or third-party tag managers. There is no JavaScript that
          identifies you, follows you, or builds a profile of your visit.
        </p>
        <p>
          What does get recorded automatically:
        </p>
        <ul className="list-disc pl-6 space-y-2 marker:text-[var(--color-brand-bright)]">
          <li>
            <span className="text-[var(--color-ink-primary)] font-medium">Hosting access logs.</span>{" "}
            The site is hosted on Cloudflare Pages. Cloudflare records standard HTTP access data
            (IP address, user agent, URL, timestamp, response code) for security, abuse mitigation,
            and operational diagnostics. Cloudflare&rsquo;s privacy practices govern these logs.
          </li>
          <li>
            <span className="text-[var(--color-ink-primary)] font-medium">Email you send us.</span>{" "}
            If you email{" "}
            <a
              href="mailto:hello@apexrevenueoperations.com"
              className="text-[var(--color-brand-bright)] underline underline-offset-4 hover:text-[var(--color-brand-blue)] transition-colors"
            >
              hello@apexrevenueoperations.com
            </a>
            , the contents of your message and any attachments are received and stored in our
            inbox. We retain that correspondence for the lifetime of the business relationship plus
            a reasonable record-keeping period.
          </li>
          <li>
            <span className="text-[var(--color-ink-primary)] font-medium">
              Form submissions, if any.
            </span>{" "}
            The contact form is a mailto-based link — it opens your local email client rather than
            submitting to a backend we operate. We do not store form data in a database.
          </li>
        </ul>
      </>
    ),
  },
  {
    number: "03",
    heading: "Cookies and similar technologies",
    body: (
      <>
        <p>
          This website does not set cookies for analytics, advertising, personalization, or any
          other purpose under our control. The only headers that touch your browser come from
          Cloudflare&rsquo;s edge platform for security and performance (for example, anti-bot
          tokens) and are not used by us to identify you.
        </p>
        <p>
          We do not have a cookie banner because there is nothing meaningful to consent to. If that
          changes — for example, if we add an analytics tool — this policy will be updated and
          consent UI will appear before any tracking activates.
        </p>
      </>
    ),
  },
  {
    number: "04",
    heading: "How we use information",
    body: (
      <>
        <p>We use information you send us only to:</p>
        <ul className="list-disc pl-6 space-y-2 marker:text-[var(--color-brand-bright)]">
          <li>Respond to your inquiry and schedule a diagnostic call.</li>
          <li>
            Build a proposal, statement of work, or onboarding plan if we move toward an
            engagement.
          </li>
          <li>Operate and improve the business — billing, compliance, internal reporting.</li>
        </ul>
        <p>
          We do not sell your information. We do not share it with advertisers. We do not use it to
          train third-party AI models. We do not use it for any purpose unrelated to the reason you
          contacted us.
        </p>
      </>
    ),
  },
  {
    number: "05",
    heading: "Service providers we rely on",
    body: (
      <>
        <p>
          Running a business requires a small number of vendors. The ones that may incidentally
          process information you send to this site or to{" "}
          <a
            href="mailto:hello@apexrevenueoperations.com"
            className="text-[var(--color-brand-bright)] underline underline-offset-4 hover:text-[var(--color-brand-blue)] transition-colors"
          >
            hello@apexrevenueoperations.com
          </a>{" "}
          include:
        </p>
        <ul className="list-disc pl-6 space-y-2 marker:text-[var(--color-brand-bright)]">
          <li>
            <span className="text-[var(--color-ink-primary)] font-medium">Cloudflare</span> — site
            hosting, edge CDN, DDoS protection. May process IP-level access logs.
          </li>
          <li>
            <span className="text-[var(--color-ink-primary)] font-medium">
              Email infrastructure
            </span>{" "}
            — the inbox you reach when you write to us is hosted by a mainstream business email
            provider with industry-standard security and compliance posture.
          </li>
        </ul>
        <p>
          We choose vendors with credible privacy and security commitments and review them
          periodically.
        </p>
      </>
    ),
  },
  {
    number: "06",
    heading: "Your rights (GDPR, CCPA, and similar laws)",
    body: (
      <>
        <p>
          Depending on where you live, you may have rights under data-protection laws including the
          EU General Data Protection Regulation (GDPR), the UK GDPR, and the California Consumer
          Privacy Act (CCPA) as amended by the CPRA. Those rights typically include:
        </p>
        <ul className="list-disc pl-6 space-y-2 marker:text-[var(--color-brand-bright)]">
          <li>Access — request a copy of the personal information we hold about you.</li>
          <li>Correction — ask us to fix inaccurate information.</li>
          <li>
            Deletion — ask us to delete information we hold about you, subject to legal record-keeping
            requirements.
          </li>
          <li>Objection — object to specific uses of your information.</li>
          <li>
            Non-discrimination — exercise these rights without us treating you differently as a
            result.
          </li>
        </ul>
        <p>
          To exercise any of these rights, email{" "}
          <a
            href="mailto:hello@apexrevenueoperations.com"
            className="text-[var(--color-brand-bright)] underline underline-offset-4 hover:text-[var(--color-brand-blue)] transition-colors"
          >
            hello@apexrevenueoperations.com
          </a>{" "}
          with a clear description of what you&rsquo;re asking for. We&rsquo;ll respond within the
          window required by the applicable law (typically 30 days).
        </p>
      </>
    ),
  },
  {
    number: "07",
    heading: "Data retention and security",
    body: (
      <>
        <p>
          Email correspondence and proposal materials are retained for the duration of the business
          relationship plus a record-keeping window appropriate to the tax, accounting, and
          contractual obligations that apply. Hosting access logs follow Cloudflare&rsquo;s default
          retention.
        </p>
        <p>
          We apply reasonable, industry-standard administrative and technical safeguards to protect
          information in our custody — including access controls, encrypted transport, and limited
          internal access on a need-to-know basis. No system is perfectly secure, and we will notify
          affected parties promptly if a material breach occurs.
        </p>
      </>
    ),
  },
  {
    number: "08",
    heading: "Children",
    body: (
      <>
        <p>
          This is a business-to-business site marketed to construction company owners and operators.
          It is not directed at children under 16, and we do not knowingly collect information from
          children. If you believe a child has sent us information, contact us and we will delete it.
        </p>
      </>
    ),
  },
  {
    number: "09",
    heading: "Changes and contact",
    body: (
      <>
        <p>
          This policy may be updated to reflect changes in our practices, in the tools we use, or
          in applicable law. The effective date below will move when that happens. Material changes
          will be flagged on the site.
        </p>
        <p>
          Privacy questions, requests, or complaints:{" "}
          <a
            href="mailto:hello@apexrevenueoperations.com"
            className="text-[var(--color-brand-bright)] underline underline-offset-4 hover:text-[var(--color-brand-blue)] transition-colors"
          >
            hello@apexrevenueoperations.com
          </a>
          . APEX Revenue Operations is a U.S.-contact business; correspondence is handled from a
          U.S. business contact and routed to operations in Panama.
        </p>
      </>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 md:pt-44 pb-12 md:pb-20 overflow-hidden">
        <div aria-hidden className="absolute inset-0 bg-hero-spine opacity-90" />
        <div aria-hidden className="absolute inset-0 bg-grid opacity-40" />
        <div className="relative container-app">
          <Reveal>
            <SectionLabel number="01">Legal</SectionLabel>
            <h1 className="mt-5 font-display text-4xl sm:text-6xl md:text-7xl tracking-[-0.035em] leading-[0.98] max-w-4xl">
              Privacy Policy{" "}
              <span className="text-[var(--color-ink-tertiary)]">
                — short, honest, and exactly as long as it needs to be.
              </span>
            </h1>
          </Reveal>
          <Reveal delay={140}>
            <p className="mt-7 max-w-3xl text-base md:text-xl text-[var(--color-ink-secondary)] leading-relaxed">
              We don&rsquo;t run analytics, advertising pixels, or third-party trackers on this
              site. The only contact channel is email. This page explains exactly what that means
              for you.
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
                href="/terms"
                className="text-[var(--color-brand-bright)] hover:text-[var(--color-brand-blue)] underline underline-offset-4 transition-colors"
              >
                Terms of Service
              </Link>
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-brand-bright)] hover:gap-3 transition-all"
            >
              Privacy question? Contact us
              <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
