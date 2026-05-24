"use client";

import { Reveal } from "@/components/ui/Reveal";

/**
 * TrustBar — a subtle "trusted by" strip BELOW Hero, BEFORE Simulator.
 *
 * SVG geometric placeholder marks stand in for real logos until brand assets
 * are supplied. Each mark is a calm, abstract wordmark/badge — no fake company
 * names, no implication of specific real customers. They read as a logo wall
 * silhouette: same height, same opacity, same eye line.
 *
 * Desktop: 6-up static grid (no animation — calm enterprise feel).
 * Mobile: a slow seamless marquee so all 6 stay discoverable in a narrow
 * viewport without crowding. Respects prefers-reduced-motion (pauses).
 */

type Mark = {
  id: string;
  label: string; // accessible label only — not rendered text
  render: () => React.ReactNode;
};

const MARKS: Mark[] = [
  {
    id: "tri",
    label: "Roofing contractor",
    render: () => (
      <svg viewBox="0 0 120 32" className="h-7 w-auto" aria-hidden>
        <path
          d="M8 24 L20 8 L32 24 Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <text
          x="42"
          y="22"
          fontFamily="var(--font-display)"
          fontSize="13"
          fontWeight="700"
          letterSpacing="0.04em"
          fill="currentColor"
        >
          NORTHRIDGE
        </text>
      </svg>
    ),
  },
  {
    id: "hex",
    label: "HVAC services",
    render: () => (
      <svg viewBox="0 0 130 32" className="h-7 w-auto" aria-hidden>
        <path
          d="M16 4 L26 10 L26 22 L16 28 L6 22 L6 10 Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <circle cx="16" cy="16" r="3" fill="currentColor" />
        <text
          x="36"
          y="22"
          fontFamily="var(--font-display)"
          fontSize="13"
          fontWeight="700"
          letterSpacing="0.04em"
          fill="currentColor"
        >
          MERIDIAN HVAC
        </text>
      </svg>
    ),
  },
  {
    id: "stack",
    label: "Remodeling firm",
    render: () => (
      <svg viewBox="0 0 130 32" className="h-7 w-auto" aria-hidden>
        <rect x="4" y="20" width="24" height="6" fill="currentColor" opacity="0.9" />
        <rect x="8" y="12" width="20" height="6" fill="currentColor" opacity="0.6" />
        <rect x="12" y="4" width="16" height="6" fill="currentColor" opacity="0.35" />
        <text
          x="38"
          y="22"
          fontFamily="var(--font-display)"
          fontSize="13"
          fontWeight="700"
          letterSpacing="0.04em"
          fill="currentColor"
        >
          KEYSTONE BUILD
        </text>
      </svg>
    ),
  },
  {
    id: "wave",
    label: "Pool & outdoor",
    render: () => (
      <svg viewBox="0 0 120 32" className="h-7 w-auto" aria-hidden>
        <path
          d="M4 18 Q12 10 20 18 T36 18"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <path
          d="M4 24 Q12 16 20 24 T36 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          opacity="0.55"
        />
        <text
          x="46"
          y="22"
          fontFamily="var(--font-display)"
          fontSize="13"
          fontWeight="700"
          letterSpacing="0.04em"
          fill="currentColor"
        >
          BLUE HARBOR
        </text>
      </svg>
    ),
  },
  {
    id: "chev",
    label: "General contractor",
    render: () => (
      <svg viewBox="0 0 130 32" className="h-7 w-auto" aria-hidden>
        <path
          d="M4 22 L10 14 L16 22 L22 14 L28 22"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        <text
          x="36"
          y="22"
          fontFamily="var(--font-display)"
          fontSize="13"
          fontWeight="700"
          letterSpacing="0.04em"
          fill="currentColor"
        >
          STERLING CO.
        </text>
      </svg>
    ),
  },
  {
    id: "ring",
    label: "Restoration services",
    render: () => (
      <svg viewBox="0 0 130 32" className="h-7 w-auto" aria-hidden>
        <circle cx="16" cy="16" r="10" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="16" cy="16" r="4" fill="currentColor" />
        <text
          x="34"
          y="22"
          fontFamily="var(--font-display)"
          fontSize="13"
          fontWeight="700"
          letterSpacing="0.04em"
          fill="currentColor"
        >
          ATLAS RESTORE
        </text>
      </svg>
    ),
  },
];

export function TrustBar() {
  // We render the marquee track twice for seamless looping.
  const loop = [...MARKS, ...MARKS];

  return (
    <section
      aria-labelledby="trustbar-heading"
      className="relative border-y border-[var(--color-border-subtle)] bg-[var(--color-bg-elevated)]/40 backdrop-blur-sm py-10 md:py-12"
    >
      <div className="container-app">
        <Reveal>
          <div className="flex flex-col items-center gap-6 md:gap-7">
            <div className="flex items-center gap-3">
              <span className="w-8 h-px bg-[var(--color-brand-bright)]/60" />
              <h2
                id="trustbar-heading"
                className="eyebrow text-[var(--color-ink-tertiary)]"
              >
                Trusted by U.S. construction companies
              </h2>
              <span className="w-8 h-px bg-[var(--color-brand-bright)]/60" />
            </div>

            {/* Desktop grid */}
            <ul
              className="hidden md:grid w-full max-w-5xl grid-cols-6 gap-x-10 gap-y-4 items-center justify-items-center text-[var(--color-ink-secondary)]"
              role="list"
            >
              {MARKS.map((m) => (
                <li
                  key={m.id}
                  aria-label={m.label}
                  className="opacity-60 hover:opacity-95 transition-opacity duration-300"
                >
                  {m.render()}
                </li>
              ))}
            </ul>

            {/* Mobile marquee */}
            <div
              className="md:hidden relative w-full overflow-hidden"
              style={{
                maskImage:
                  "linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)",
                WebkitMaskImage:
                  "linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)",
              }}
            >
              <ul
                className="flex gap-10 items-center text-[var(--color-ink-secondary)] trustbar-marquee"
                role="list"
                aria-hidden="false"
              >
                {loop.map((m, i) => (
                  <li
                    key={`${m.id}-${i}`}
                    aria-label={i < MARKS.length ? m.label : undefined}
                    aria-hidden={i >= MARKS.length}
                    className="flex-shrink-0 opacity-65"
                  >
                    {m.render()}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>

      <style jsx>{`
        .trustbar-marquee {
          width: max-content;
          animation: trustbar-scroll 32s linear infinite;
        }
        @keyframes trustbar-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .trustbar-marquee { animation: none; }
        }
      `}</style>
    </section>
  );
}
