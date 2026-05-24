"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ease } from "@/lib/motion";

const FAQS = [
  {
    q: "What happens after I submit the form?",
    a: "Within one business hour (EST operating window), you'll get a reply with two or three time slots for the diagnostic call and a short prep request — typically a CRM export or call recording sample so we can come prepared with specifics, not generic questions. If you submit outside EST hours, you'll hear back by 10:30am EST the next business day.",
  },
  {
    q: "How quickly can we actually start an engagement?",
    a: "From signed contract: 60 days to full live volume (see About → 60-day onboarding for the phase-by-phase breakdown). The first qualified appointments typically flow in week 4 during soft-launch. If you need faster, we offer expedited onboarding on Expansion and Enterprise tiers — 30 days to live volume at higher week-1 intensity.",
  },
  {
    q: "Do you sign NDAs before the diagnostic?",
    a: "Yes. Our standard mutual NDA covers any non-public business information shared during diagnostic or discovery sessions, including CRM data, call recordings, financial figures, and strategic plans. Happy to use your NDA template if you prefer. NDA is sent with the meeting invite by default for any session that includes data sharing.",
  },
  {
    q: "Can I tour your operations in Panama?",
    a: "Yes, for active and signed clients on Expansion or Enterprise tiers. We host quarterly client visit days at our Panama City facility — see the team running your account, sit in on live calls, meet your dedicated team manager and ops director in person. We don't run public-facing facility tours for prospects.",
  },
  {
    q: "What information should I prepare before the call?",
    a: "If possible: a 90-day export of leads-to-close from your CRM (with status, source, dates, and outcomes), 3–5 representative call recordings (good and bad), your current monthly marketing spend by channel, and a one-sentence answer to 'what are you trying to fix in the next 90 days?' If none of that is easy to pull, we still run the call — it just shifts more into discovery mode.",
  },
  {
    q: "Will the diagnostic call be a sales pitch?",
    a: "No. The call has a fixed structure: 5 min context, 15 min funnel audit on your real data, 5 min on the three biggest leaks we identify, 5 min on whether APEX fits or whether you should fix it internally first. We don't show pricing decks. We don't pitch tiers. If we're a fit, we book a follow-up. If we're not, you keep the audit findings.",
  },
  {
    q: "Who from APEX will I be talking to?",
    a: "First call is always with a senior ops lead, not a junior sales rep. They've personally onboarded between 8 and 30 client accounts in the last year and know construction operations in detail. If the engagement moves forward, you'll meet your assigned ops director and team manager during week 1 of onboarding.",
  },
  {
    q: "What if I'm not ready to make a decision in the next 90 days?",
    a: "That's fine. The diagnostic call is still free and the audit findings are still yours. We'd rather build the relationship six months early than pressure you into a timeline that doesn't match your business. Pick 'Just researching' on the timeline question — we'll calibrate accordingly.",
  },
];

export function ContactFaq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      id="contact-faq"
      className="relative py-20 md:py-32 border-t border-[var(--color-border-subtle)]"
    >
      <div className="container-app">
        <Reveal>
          <SectionLabel number="05">Common questions</SectionLabel>
          <h2 className="mt-4 font-display text-3xl sm:text-5xl md:text-6xl tracking-[-0.035em] max-w-3xl leading-[1.05]">
            Before you submit the form.
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
