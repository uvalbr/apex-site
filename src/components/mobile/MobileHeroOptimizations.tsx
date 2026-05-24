"use client";

/**
 * MobileHeroOptimizations — additive mobile-first tweaks for the Hero.
 *
 * The existing `Hero.tsx` is left intact. This module ships two pieces:
 *
 *   1. `MobileHeroOptimizations` — a tiny client component that injects a
 *      scoped <style> block (no globals.css edits) which:
 *        - Shrinks the H1 to fit a single viewport on small screens.
 *        - Tightens vertical rhythm (less top/bottom padding on the hero block).
 *        - Reduces the LivePipeline particle density on mobile by
 *          opting-into a `[data-density="low"]` selector if/when the
 *          LivePipeline component starts honouring it.
 *
 *   2. `mobileHeroOptClasses` — string of utility class names you can spread
 *      onto Hero inner elements *if* you ever choose to wire them in. Default
 *      use is to just mount `<MobileHeroOptimizations />` once in layout.
 *
 * Integration (recommended — zero changes to Hero.tsx):
 *   // app/layout.tsx
 *   import { MobileHeroOptimizations } from "@/components/mobile/MobileHeroOptimizations";
 *   ...
 *   <body>
 *     <MobileHeroOptimizations />
 *     ...
 *   </body>
 *
 * The injected CSS is mobile-only (max-width: 767px) so desktop is untouched.
 */

export function MobileHeroOptimizations() {
  return (
    <style
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{
        __html: `
@media (max-width: 767px) {
  /* Tighter hero vertical rhythm so headline + sub + CTAs fit one viewport. */
  section.bg-hero-spine > div.container-wide {
    padding-top: 96px;
    padding-bottom: 56px;
  }

  /* Shrink the H1 just enough to keep both lines on one screen on phones <= 380px wide.
     Uses clamp so 360px–767px scales linearly between 34px and 52px. */
  section.bg-hero-spine h1 {
    font-size: clamp(34px, 11vw, 52px) !important;
    line-height: 1.02 !important;
    letter-spacing: -0.03em;
  }

  /* Slightly smaller sub so we don't push CTAs below the fold. */
  section.bg-hero-spine h1 + p,
  section.bg-hero-spine p.max-w-2xl {
    font-size: 15px;
    line-height: 1.55;
  }

  /* Make the LivePipeline lighter on mobile — opt-in selector that the
     LivePipeline implementation can read off the surrounding section. */
  section.bg-hero-spine [data-pipeline] {
    --pipeline-density: 0.55;
  }
}

@media (max-width: 767px) and (prefers-reduced-motion: reduce) {
  section.bg-hero-spine [data-pipeline] {
    --pipeline-density: 0;
  }
}
        `.trim(),
      }}
    />
  );
}

/**
 * Optional: utility class string you can spread onto an inner Hero wrapper if
 * you ever want explicit (rather than scoped CSS-driven) mobile control.
 *
 * Example (in Hero.tsx if you choose to integrate):
 *   <h1 className={cn("...", mobileHeroOptClasses.h1)}>
 */
export const mobileHeroOptClasses = {
  h1: "max-md:text-[clamp(34px,11vw,52px)] max-md:leading-[1.02]",
  sub: "max-md:text-[15px] max-md:leading-snug",
  section: "max-md:pt-24 max-md:pb-14",
} as const;
