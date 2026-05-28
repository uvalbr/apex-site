"use client";

import { useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";

const INDUSTRIES = [
  "Roofing",
  "HVAC",
  "Solar",
  "Pool construction",
  "Custom home building",
  "Remodeling",
  "Plumbing",
  "Electrical",
  "Other",
];

const SETUPS = [
  "In-house team only",
  "BPO / call center currently",
  "Mix of in-house + outsourced",
  "Owner / sales rep handling it personally",
  "No structured process yet",
];

const PAIN_POINTS = [
  "Slow speed-to-lead",
  "Low appointment set rate",
  "High no-show rate",
  "Poor lead qualification",
  "Inconsistent follow-up",
  "Sales team overwhelmed",
  "Don't know where leads are leaking",
  "Other",
];

const TIMELINES = [
  "Within 30 days",
  "60–90 days",
  "Exploring for next quarter",
  "Just researching",
];

const SESSIONS = ["Diagnostic call (30 min)", "Discovery session (60 min)"];

const CONTACT_PREFERENCES = ["Email", "Phone call", "Either"];

export function DiagnosticForm() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const subject = encodeURIComponent(
      `APEX ${fd.get("session") || "diagnostic"} request — ${fd.get("company") || ""}`
    );
    const lines = [
      `Name: ${fd.get("name")}`,
      `Role: ${fd.get("role")}`,
      `Company: ${fd.get("company")}`,
      `Email: ${fd.get("email")}`,
      `Phone: ${fd.get("phone") || "—"}`,
      `Industry: ${fd.get("industry")}`,
      `Monthly leads (approx): ${fd.get("leads")}`,
      `Current setup: ${fd.get("setup")}`,
      `Biggest pain point: ${fd.get("pain")}`,
      `Session type: ${fd.get("session")}`,
      `Timeline: ${fd.get("timeline")}`,
      `Preferred contact: ${fd.get("contactPref")}`,
      "",
      "Notes:",
      `${fd.get("notes") || "—"}`,
    ];
    const body = encodeURIComponent(lines.join("\n"));
    window.location.href = `mailto:hello@apexrevenueoperations.com?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  return (
    <section id="form" className="relative py-20 md:py-32 border-t border-[var(--color-border-subtle)]">
      <div className="container-app">
        <Reveal>
          <SectionLabel number="03">Diagnostic request</SectionLabel>
          <h2 className="mt-4 font-display text-3xl sm:text-5xl md:text-6xl tracking-[-0.035em] max-w-3xl leading-[1.05]">
            The more you share, the sharper our diagnostic.
          </h2>
          <p className="mt-5 max-w-2xl text-base md:text-lg text-[var(--color-ink-secondary)]">
            Takes about 3 minutes. We use this to come prepared with research on your specific
            situation — not to score a generic sales call.
          </p>
        </Reveal>

        <Reveal delay={140}>
          <div className="mt-12 max-w-4xl mx-auto">
            <form
              onSubmit={handleSubmit}
              className="rounded-3xl border border-[var(--color-border-subtle)] bg-[var(--color-bg-elevated)]/70 backdrop-blur-md p-6 md:p-10"
            >
              {/* Section: You */}
              <FormSection title="About you">
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field name="name" label="Your full name" required />
                  <Field name="role" label="Your role" placeholder="Owner / VP Sales / GM / CRO" required />
                  <Field name="email" label="Email" type="email" required />
                  <Field name="phone" label="Phone (optional)" type="tel" placeholder="+1 (555) 555-5555" />
                </div>
              </FormSection>

              {/* Section: Company */}
              <FormSection title="About your business">
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field name="company" label="Company name" required />
                  <Select name="industry" label="Industry" options={INDUSTRIES} required />
                  <Field
                    name="leads"
                    label="Monthly leads (approx)"
                    placeholder="e.g. 350"
                    required
                  />
                  <Select name="setup" label="Current setup" options={SETUPS} required />
                </div>
              </FormSection>

              {/* Section: Diagnostic */}
              <FormSection title="What you want to solve">
                <div className="grid sm:grid-cols-2 gap-4">
                  <Select name="pain" label="Biggest pain point" options={PAIN_POINTS} required />
                  <Select name="timeline" label="Timeline" options={TIMELINES} required />
                  <Select name="session" label="Preferred session" options={SESSIONS} required />
                  <Select
                    name="contactPref"
                    label="Preferred contact"
                    options={CONTACT_PREFERENCES}
                    required
                  />
                </div>
                <div className="mt-4">
                  <Field
                    name="notes"
                    label="Anything else we should know before the call"
                    as="textarea"
                    placeholder="Current CRM, dialer setup, sales team size, specific markets, seasonality, recent changes that prompted this conversation — anything that helps us come prepared."
                  />
                </div>
              </FormSection>

              <div className="mt-8 flex flex-col-reverse md:flex-row gap-4 md:items-center md:justify-between">
                <p className="text-[11px] text-[var(--color-ink-tertiary)] leading-relaxed max-w-md">
                  Submitting opens your mail client with the message pre-filled. You can edit
                  before sending. Prefer a different channel? Email us directly at{" "}
                  <a
                    href="mailto:hello@apexrevenueoperations.com"
                    className="text-[var(--color-brand-bright)] underline"
                  >
                    hello@apexrevenueoperations.com
                  </a>
                  .
                </p>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 h-14 px-8 rounded-xl bg-[var(--color-brand-blue)] hover:bg-[var(--color-brand-bright)] text-white font-semibold transition-all hover:shadow-[0_0_32px_rgba(63,160,255,0.5)] whitespace-nowrap"
                >
                  {submitted ? "Sent →" : "Send diagnostic request →"}
                </button>
              </div>
            </form>
          </div>
        </Reveal>

        <Reveal delay={260}>
          <div className="mt-10 max-w-4xl mx-auto grid sm:grid-cols-3 gap-4 text-center">
            <SmallStat label="Response time" value="< 1 hr" sub="During EST hours" />
            <SmallStat label="Diagnostic cost" value="$0" accent sub="No obligation" />
            <SmallStat label="Decision pressure" value="Zero" sub="We tell you if we're wrong fit" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function FormSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="pb-7 mb-7 border-b border-[var(--color-border-subtle)] last:border-0 last:mb-0 last:pb-0">
      <h3 className="eyebrow mb-5">{title}</h3>
      {children}
    </div>
  );
}

function Field({
  name,
  label,
  type = "text",
  required,
  placeholder,
  as,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  as?: "textarea";
}) {
  const baseClass =
    "w-full bg-[var(--color-bg-deep)] border border-[var(--color-border-strong)] rounded-lg px-4 py-3 text-sm text-[var(--color-ink-primary)] placeholder:text-[var(--color-ink-tertiary)] focus:border-[var(--color-brand-bright)] focus:ring-2 focus:ring-[var(--color-brand-bright)]/30 focus:outline-none transition-colors";
  return (
    <label className="block">
      <span className="block text-[11px] uppercase tracking-[0.18em] font-semibold text-[var(--color-ink-tertiary)] mb-1.5">
        {label}
        {required && <span className="text-[var(--color-brand-bright)] ml-1">*</span>}
      </span>
      {as === "textarea" ? (
        <textarea
          name={name}
          required={required}
          placeholder={placeholder}
          rows={4}
          className={baseClass}
        />
      ) : (
        <input
          name={name}
          type={type}
          required={required}
          placeholder={placeholder}
          className={baseClass}
        />
      )}
    </label>
  );
}

function Select({
  name,
  label,
  options,
  required,
}: {
  name: string;
  label: string;
  options: string[];
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="block text-[11px] uppercase tracking-[0.18em] font-semibold text-[var(--color-ink-tertiary)] mb-1.5">
        {label}
        {required && <span className="text-[var(--color-brand-bright)] ml-1">*</span>}
      </span>
      <div className="relative">
        <select
          name={name}
          required={required}
          defaultValue=""
          className="w-full appearance-none bg-[var(--color-bg-deep)] border border-[var(--color-border-strong)] rounded-lg px-4 pr-10 py-3 text-sm text-[var(--color-ink-primary)] focus:border-[var(--color-brand-bright)] focus:ring-2 focus:ring-[var(--color-brand-bright)]/30 focus:outline-none transition-colors cursor-pointer"
        >
          <option value="" disabled>
            Select…
          </option>
          {options.map((o) => (
            <option key={o} value={o} className="bg-[var(--color-bg-deep)]">
              {o}
            </option>
          ))}
        </select>
        <svg
          aria-hidden
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-ink-tertiary)] pointer-events-none"
        >
          <path
            d="M6 9l6 6 6-6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </label>
  );
}

function SmallStat({
  label,
  value,
  sub,
  accent,
}: {
  label: string;
  value: string;
  sub: string;
  accent?: boolean;
}) {
  return (
    <div className="rounded-2xl border border-[var(--color-border-subtle)] bg-[var(--color-bg-elevated)]/40 p-5">
      <div
        className={`font-mono tabular text-2xl md:text-3xl font-bold leading-none ${
          accent ? "text-[var(--color-brand-bright)]" : "text-[var(--color-ink-primary)]"
        }`}
      >
        {value}
      </div>
      <div className="mt-2 text-[10px] uppercase tracking-[0.22em] font-semibold text-[var(--color-ink-tertiary)]">
        {label}
      </div>
      <div className="mt-1 text-[11px] text-[var(--color-ink-secondary)]">{sub}</div>
    </div>
  );
}
