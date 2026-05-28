"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ease } from "@/lib/motion";

const FAQS = [
  {
    q: "What's included in the per-appointment fee?",
    a: "The $150–200 covers a qualified appointment that meets your CRM-defined criteria and actually runs (not just gets scheduled). It includes confirmation calls, reschedule handling, and pre-call data enrichment. You don't pay for no-shows, unqualified bookings, or wrong-numbers — only for appointments your sales team actually sat down with.",
  },
  {
    q: "Can I switch tiers mid-engagement?",
    a: "Yes. Tier moves happen at the end of any monthly billing cycle with 30 days' notice. Most clients upgrade from Growth to Expansion around month 4–6 as call volume scales. Downgrades are also supported — we'd rather right-size you than lose you.",
  },
  {
    q: "How does revenue share verification work?",
    a: "Every APEX-originated appointment is tagged in your CRM with a unique source ID. When a deal closes from that source, your CRM's standard close events trigger our reporting. We pull from your CRM, not ours — you're the source of truth. Monthly revenue share reports are reconciled against your reported revenue and disputed line-items are addressed before invoicing.",
  },
  {
    q: "What's the contract length?",
    a: "60-day pilots run as their own fixed agreement. After pilot, all engagements are month-to-month with 30-day notice (60-day for Enterprise tier due to staffing depth). No multi-year lock-ins. If we're not earning our keep, you should be able to walk.",
  },
  {
    q: "What happens after the 60-day pilot?",
    a: "Day-60 review compares actual results against the targets we set in week one. Three possible outcomes: (1) Results meet/exceed targets → you choose a tier and transition into ongoing engagement. (2) Results miss but the trajectory is right → we extend pilot 30 days at a discounted rate to validate the curve. (3) Results miss and the trajectory is wrong → we end cleanly, you keep all your data, scripts, and CRM workflows.",
  },
  {
    q: "Is there a setup fee?",
    a: "No. Setup, onboarding, CRM integration, script development, agent training, and KPI dashboard build are all included in the monthly base. The only one-time costs you'd ever see are third-party software licenses (e.g., specific CRM modules or dialer integrations) that we'd flag in writing before purchase.",
  },
  {
    q: "What if my lead volume is too low for these tiers?",
    a: "Below ~80 qualified leads/month, none of these tiers are right for you yet — you'd be paying for agent capacity you can't use. We'll tell you that on the diagnostic call. For lower volume, focus on tightening your existing speed-to-lead and conversion before adding outsourced ops.",
  },
  {
    q: "Can you work with my existing CRM, dialer, and stack?",
    a: "Yes — and when there's no native integration, we build custom API support so any system can plug in. Out of the box we support HubSpot, Salesforce, Pipedrive, GoHighLevel, ServiceTitan, JobNimbus, Housecall Pro, AccuLynx, monday.com, and most major construction CRMs. Dialer-wise we work with Aircall, JustCall, RingCentral, and CRM-native dialers. Exotic stack? We'll wire it via direct API, Zapier, or webhook — nothing is off-limits.",
  },
  {
    q: "Do you guarantee specific results?",
    a: "We commit to operational SLAs: speed-to-lead under 3 minutes during operating hours, appointment confirmation within 24 hours of booking, weekly KPI reviews, and 80%+ agent utilization. We do NOT guarantee specific close rates or revenue numbers — those depend on your lead quality, sales team, and market, all of which we don't control. The 60-day pilot is where we both validate the model against your specific reality.",
  },
  {
    q: "Who owns the data and scripts we build together?",
    a: "You do. All call recordings, transcripts, scripts, objection libraries, CRM configurations, and KPI dashboards are your property and exported to you in standard formats at the end of any engagement. We don't ransom your operations.",
  },
  {
    q: "How are agents managed and held accountable?",
    a: "Every agent reports to a dedicated team manager (one per tier). Manager runs daily standups, weekly 1:1s, and real-time call coaching. Agents have specific weekly KPIs (calls made, set rate, show rate, quality score). Underperformers go on a 30-day performance improvement plan; if no improvement, they're rotated off your account. You're never stuck with a bad seat.",
  },
  {
    q: "What if we want to scale headcount up or down?",
    a: "Headcount adjustments happen on 30-day notice. Adding agents follows our standard 2-week ramp (recruiting → training → live calls). Removing agents is immediate at the next billing cycle. Enterprise tier supports flex headcount of ±3 agents without contract changes for seasonal businesses.",
  },
];

export function PricingFaq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="relative py-20 md:py-32 border-t border-[var(--color-border-subtle)]"
    >
      <div className="container-app">
        <Reveal>
          <SectionLabel number="06">Pricing FAQ</SectionLabel>
          <h2 className="mt-4 font-display text-3xl sm:text-5xl md:text-6xl tracking-[-0.035em] max-w-3xl leading-[1.05]">
            Real answers.{" "}
            <span className="text-[var(--color-ink-tertiary)]">No "contact sales for pricing."</span>
          </h2>
        </Reveal>

        <Reveal delay={120}>
          <div className="mt-12 max-w-3xl mx-auto">
            <div className="rounded-3xl border border-[var(--color-border-subtle)] bg-[var(--color-bg-elevated)]/60 backdrop-blur-md overflow-hidden">
              {FAQS.map((faq, i) => (
                <FaqRow
                  key={faq.q}
                  faq={faq}
                  isOpen={open === i}
                  onToggle={() => setOpen(open === i ? null : i)}
                  last={i === FAQS.length - 1}
                />
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function FaqRow({
  faq,
  isOpen,
  onToggle,
  last,
}: {
  faq: { q: string; a: string };
  isOpen: boolean;
  onToggle: () => void;
  last: boolean;
}) {
  return (
    <div className={last ? "" : "border-b border-[var(--color-border-subtle)]"}>
      <button
        onClick={onToggle}
        className="w-full text-left p-5 md:p-7 flex items-start justify-between gap-4 hover:bg-[var(--color-brand-blue)]/5 transition-colors"
        aria-expanded={isOpen}
      >
        <span className="font-display text-lg md:text-xl tracking-tight text-[var(--color-ink-primary)] flex-1">
          {faq.q}
        </span>
        <span
          className={`mt-1 flex-shrink-0 w-7 h-7 rounded-full border flex items-center justify-center transition-all ${
            isOpen
              ? "border-[var(--color-brand-bright)] bg-[var(--color-brand-bright)]/12 rotate-45"
              : "border-[var(--color-border-strong)]"
          }`}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 5v14M5 12h14"
              stroke={isOpen ? "#3FA0FF" : "#9BA8C0"}
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: ease.outQuart }}
            className="overflow-hidden"
          >
            <div className="px-5 md:px-7 pb-6 md:pb-7 text-sm md:text-base text-[var(--color-ink-secondary)] leading-relaxed max-w-3xl">
              {faq.a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
