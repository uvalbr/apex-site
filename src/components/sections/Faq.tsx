"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ease } from "@/lib/motion";
import { cn } from "@/lib/cn";

type Qa = { q: string; a: string };

const FAQS: Qa[] = [
  {
    q: "How is this different from a call center?",
    a: "A call center sells you call volume. We sell you measured revenue outcomes. Our operators are dedicated to your account, trained on your service catalog, and integrated into your CRM — not pooled across hundreds of clients. You get a small team that knows your business, working defined KPIs, not a queue.",
  },
  {
    q: "Will your agents understand my industry?",
    a: "We only work with U.S. construction verticals — roofing, HVAC, remodeling, pool, and general contracting. Agents go through industry-specific training before they touch a live lead, and we build the call frameworks together with your sales lead during week 3 of the deployment. They will know the difference between a tear-off and an overlay.",
  },
  {
    q: "Can you integrate with my CRM?",
    a: "Yes. We integrate with the major construction CRMs — JobNimbus, ServiceTitan, AccuLynx, JobTread, HubSpot, Salesforce, Pipedrive, GoHighLevel, plus most homegrown stacks. If you use something obscure, we still find a clean way in via API, Zapier, or direct webhook. CRM integration is a named milestone in week 2.",
  },
  {
    q: "What if I already have an internal sales team?",
    a: "Most of our clients do. We don't replace your closers — we feed them. Our work ends where yours begins: a qualified, confirmed appointment on the right rep's calendar. Internal sales teams typically see their close rate rise because they spend their time on better-qualified opportunities instead of chasing dead leads.",
  },
  {
    q: "How fast until I see results?",
    a: "Speed-to-lead and confirmation impact show up in week 4 during soft launch. Recovered revenue from outbound reactivation typically lands inside the first 30–45 days. The formal performance review at day 60 quantifies baseline vs. actual KPIs and recovered revenue.",
  },
  {
    q: "What happens if it's not working?",
    a: "We run a documented day-30 checkpoint and a day-60 review. If KPIs aren't trending against the baseline we set in week 1, we adjust scripts, routing, or staffing before the engagement continues. If a deployment genuinely isn't a fit, we say so directly. We are not interested in running engagements that don't produce revenue for the client.",
  },
  {
    q: "Do you sign NDAs?",
    a: "Yes — mutual NDA before any discovery work. We also sign data-handling and CRM-access agreements as part of onboarding. Client identities and engagement specifics are never used in marketing without written consent.",
  },
  {
    q: "How are agents trained?",
    a: "Three layers: a baseline construction-industry curriculum, your specific service catalog and pricing logic, and live calibration calls with your sales lead. Agents are recorded and QA'd daily during soft launch and weekly thereafter. Underperforming agents are replaced — you are not stuck with whoever we assign.",
  },
  {
    q: "What about compliance and call recording laws?",
    a: "All calls are recorded with appropriate two-party-consent disclosure where required by state law. We follow TCPA guidelines for outbound dialing — no autodialers to mobile numbers without consent, no calls outside legal hours, DNC scrubbing on every outbound list. Your compliance posture is part of week 2 setup.",
  },
  {
    q: "Can I cancel?",
    a: "After the 60-day pilot deployment, engagements run month-to-month with 30 days' notice. We do not lock clients into long-term contracts. If the work produces measured revenue, you keep us; if it doesn't, you don't. That is the entire business model.",
  },
];

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const groupId = useId();

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="relative py-24 md:py-40"
    >
      <div className="container-app">
        <Reveal>
          <SectionLabel number="08">Questions</SectionLabel>
          <h2
            id="faq-heading"
            className="mt-4 font-display text-3xl sm:text-5xl md:text-6xl tracking-[-0.035em] max-w-4xl leading-[1.05]"
          >
            The questions{" "}
            <span className="text-[var(--color-ink-tertiary)]">owners actually ask.</span>
          </h2>
          <p className="mt-5 max-w-2xl text-base md:text-lg text-[var(--color-ink-secondary)]">
            Direct answers — no hedging, no marketing-speak. If your question isn&rsquo;t here,
            send it on the contact page and we&rsquo;ll add it.
          </p>
        </Reveal>

        <div className="mt-14 md:mt-16 max-w-3xl">
          <ul
            className="divide-y divide-[var(--color-border-subtle)] border-y border-[var(--color-border-subtle)]"
            role="list"
          >
            {FAQS.map((qa, i) => {
              const isOpen = openIndex === i;
              const panelId = `${groupId}-panel-${i}`;
              const buttonId = `${groupId}-button-${i}`;
              return (
                <li key={qa.q}>
                  <h3>
                    <button
                      id={buttonId}
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setOpenIndex(isOpen ? null : i)}
                      className={cn(
                        "group w-full flex items-start justify-between gap-6 text-left py-5 md:py-6 transition-colors",
                        "hover:text-[var(--color-brand-bright)]",
                        isOpen
                          ? "text-[var(--color-ink-primary)]"
                          : "text-[var(--color-ink-primary)]/95"
                      )}
                    >
                      <span className="flex items-baseline gap-4 md:gap-5">
                        <span
                          aria-hidden
                          className={cn(
                            "font-mono text-[11px] tabular tracking-[0.22em] mt-1 transition-colors",
                            isOpen
                              ? "text-[var(--color-brand-bright)]"
                              : "text-[var(--color-ink-tertiary)] group-hover:text-[var(--color-brand-bright)]"
                          )}
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="font-display text-lg md:text-xl tracking-[-0.02em] leading-snug">
                          {qa.q}
                        </span>
                      </span>

                      <Plus open={isOpen} />
                    </button>
                  </h3>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={panelId}
                        role="region"
                        aria-labelledby={buttonId}
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{
                          height: "auto",
                          opacity: 1,
                          transition: {
                            height: { duration: 0.4, ease: ease.outQuart },
                            opacity: { duration: 0.3, delay: 0.08 },
                          },
                        }}
                        exit={{
                          height: 0,
                          opacity: 0,
                          transition: {
                            height: { duration: 0.3, ease: ease.outQuart },
                            opacity: { duration: 0.15 },
                          },
                        }}
                        style={{ overflow: "hidden" }}
                      >
                        <div className="pb-6 md:pb-7 pr-10 pl-[34px] md:pl-[44px] text-[15px] md:text-base leading-relaxed text-[var(--color-ink-secondary)]">
                          {qa.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}

function Plus({ open }: { open: boolean }) {
  return (
    <span
      aria-hidden
      className={cn(
        "relative inline-grid place-items-center mt-1 w-7 h-7 rounded-full border transition-all duration-300 flex-shrink-0",
        open
          ? "border-[var(--color-brand-bright)] bg-[var(--color-brand-bright)]/10"
          : "border-[var(--color-border-strong)]"
      )}
    >
      <span
        className={cn(
          "block w-3 h-px transition-colors",
          open
            ? "bg-[var(--color-brand-bright)]"
            : "bg-[var(--color-ink-secondary)]"
        )}
      />
      <span
        className={cn(
          "absolute block w-3 h-px transition-all duration-300",
          open
            ? "bg-[var(--color-brand-bright)] rotate-0 opacity-0"
            : "bg-[var(--color-ink-secondary)] rotate-90 opacity-100"
        )}
      />
    </span>
  );
}
