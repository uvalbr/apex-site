"use client";

import { Reveal } from "@/components/ui/Reveal";

export function FinalCta() {
  return (
    <section
      id="contact"
      className="relative py-24 md:py-40 overflow-hidden border-t border-[var(--color-border-subtle)]"
    >
      {/* Heavy glow */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(30, 95, 216, 0.25), transparent 65%)",
        }}
      />
      <div aria-hidden className="absolute inset-0 bg-grid opacity-40" />

      <div className="relative container-app">
        <Reveal>
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--color-bg-elevated)] border border-[var(--color-border-strong)] mb-6">
              <span className="relative flex w-1.5 h-1.5">
                <span className="absolute inset-0 rounded-full bg-[var(--color-success)] animate-ping opacity-75" />
                <span className="relative w-1.5 h-1.5 rounded-full bg-[var(--color-success)]" />
              </span>
              <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[var(--color-ink-secondary)]">
                Accepting 3 new clients · Q3 2026
              </span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl md:text-7xl tracking-[-0.035em] leading-[1.0]">
              The diagnostic call is{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: "linear-gradient(120deg, #3FA0FF 0%, #1E5FD8 60%, #D9E6FF 100%)" }}
              >
                free.
              </span>
              <br />
              The data is yours either way.
            </h2>
            <p className="mt-6 text-base md:text-lg text-[var(--color-ink-secondary)] max-w-2xl mx-auto">
              30 minutes. We audit your current lead flow, identify the three biggest revenue leaks, and tell you whether APEX is the right call — or whether you should just fix it internally.
            </p>
          </div>
        </Reveal>

        <Reveal delay={180}>
          <div className="mt-10 max-w-2xl mx-auto">
            <form
              className="rounded-3xl border border-[var(--color-border-subtle)] bg-[var(--color-bg-elevated)]/70 backdrop-blur-md p-6 md:p-8"
              onSubmit={(e) => {
                e.preventDefault();
                const fd = new FormData(e.currentTarget);
                const subject = encodeURIComponent("APEX diagnostic request — " + (fd.get("company") || ""));
                const body = encodeURIComponent(
                  `Name: ${fd.get("name")}\nCompany: ${fd.get("company")}\nRole: ${fd.get("role")}\nEmail: ${fd.get("email")}\nMonthly leads: ${fd.get("leads")}\n\nNotes:\n${fd.get("notes") || ""}`
                );
                window.location.href = `mailto:hello@apexrevenueoperations.com?subject=${subject}&body=${body}`;
              }}
            >
              <div className="grid sm:grid-cols-2 gap-3">
                <Field name="name" label="Your name" required />
                <Field name="company" label="Company" required />
                <Field name="role" label="Your role" placeholder="Owner / VP Ops / CRO" />
                <Field name="email" label="Email" type="email" required />
                <Field name="leads" label="Monthly leads (approx)" placeholder="e.g. 350" />
                <Field name="industry" label="Industry" placeholder="Roofing / HVAC / etc" />
              </div>
              <div className="mt-3">
                <Field name="notes" label="What's the #1 leak you suspect?" as="textarea" />
              </div>
              <button
                type="submit"
                className="mt-5 w-full inline-flex items-center justify-center gap-2 h-14 rounded-xl bg-[var(--color-brand-blue)] hover:bg-[var(--color-brand-bright)] text-white font-semibold transition-all hover:shadow-[0_0_28px_rgba(63,160,255,0.45)]"
              >
                Send diagnostic request
                <span>→</span>
              </button>
              <p className="mt-3 text-[11px] text-[var(--color-ink-tertiary)] text-center">
                We reply within one business hour. Calendly link sent with reply.
              </p>
            </form>
          </div>
        </Reveal>

        <Reveal delay={280}>
          <div className="mt-12 grid sm:grid-cols-3 gap-4 max-w-3xl mx-auto text-center">
            <Trust label="Average response" value="< 1 hr" />
            <Trust label="Diagnostic duration" value="30 min" />
            <Trust label="Cost to find out" value="$0" accent />
          </div>
        </Reveal>
      </div>
    </section>
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
          rows={3}
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

function Trust({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
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
    </div>
  );
}
