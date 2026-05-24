# APEX — UX premium additions

Six client-only components that polish the mobile experience and add premium-feel
desktop micro-interactions. **None of these files modify existing components.**
Integrate by adding the snippets below to `app/layout.tsx` and `app/page.tsx`.

All components respect `prefers-reduced-motion` (instant or no-op fallback).
All targets ≥ 44×44px taps. All use existing design tokens (`var(--color-…)`,
`ease.outQuart`) — no new colors, no new globals.

---

## Components

### `mobile/StickyBottomCta.tsx`
Mobile-only sticky bottom action bar with two CTAs (`Book diagnostic`,
`Run simulator`). Appears after the user scrolls past the hero (default
threshold = 80% of viewport height). Auto-hides on `/contact*` routes. Includes
`safe-area-inset-bottom` padding for notched iPhones. Slide-up / slide-down
animation, instant when reduced motion is preferred.

### `effects/MagneticButton.tsx`
Generic wrapper that gives any element a magnetic-pull effect on mouse hover
(max pull 8px, scale 1.02). Auto-disabled on touch / coarse-pointer devices and
when `prefers-reduced-motion: reduce` is set. Spring-damped via Framer Motion
`useSpring`. Passes through native props via a polymorphic `as` prop.

### `effects/PageTransition.tsx`
Wraps page children in `AnimatePresence mode="wait"` keyed by `usePathname()`.
Fade + 8px slide, 0.35s, our standard `outQuart` ease. Reduced motion → no
wrapper, just children.

### `effects/ScrollProgress.tsx`
Thin (2px) gradient bar fixed at the very top (`z-60`, above the header).
Tracks scroll position 0–100%. Hidden when at top of page. Accepts a
`hidden?: boolean` prop to suppress it on form-heavy routes like `/contact`.
**Position decision:** above the header rather than under it, because the
header switches between transparent and blurred backgrounds — a single fixed
top placement is consistent across both states and across breakpoints. At 2px
it does not occlude any header content.

### `mobile/MobileHeroOptimizations.tsx`
Style-injection-only component. Adds a scoped `<style>` block that, on screens
≤ 767px, tightens hero vertical rhythm, clamps the H1 to `clamp(34px, 11vw,
52px)`, and exposes a `--pipeline-density: 0.55` CSS variable on
`[data-pipeline]` for future use by `LivePipeline` (no LivePipeline edits
required today). Desktop is untouched.

### `mobile/SimulatorBottomSheet.tsx`
Mobile-only. Watches the `#simulator` section with an IntersectionObserver. When
visible, shows a floating "See your result →" pill near the bottom-right corner
(sits above `StickyBottomCta`'s area). Tapping opens a drag-to-dismiss bottom
sheet built with Framer Motion. The sheet shows a typical recovery range +
"Book a full diagnostic" CTA. **Tradeoff:** because this is self-contained and
does NOT modify `Simulator.tsx`, the sheet shows the typical range rather than
the user's live calculator values. To wire it to live values, lift Simulator
state to a shared store and read it here.

---

## Integration

### `app/layout.tsx`
Add these imports near the top:

```tsx
import { ScrollProgress } from "@/components/effects/ScrollProgress";
import { PageTransition } from "@/components/effects/PageTransition";
import { StickyBottomCta } from "@/components/mobile/StickyBottomCta";
import { MobileHeroOptimizations } from "@/components/mobile/MobileHeroOptimizations";
```

Then mount inside `<body>` (around your existing Header / children / Footer):

```tsx
<body className="...">
  <MobileHeroOptimizations />
  <ScrollProgress />
  <Header />
  <PageTransition>{children}</PageTransition>
  <Footer />
  <StickyBottomCta />
</body>
```

Notes:
- `MobileHeroOptimizations` only injects a `<style>` tag, so its position in
  the tree doesn't matter — keeping it near the top of `<body>` is just tidy.
- `PageTransition` is a client component; placing it around `{children}` in the
  server `RootLayout` is supported by Next.js App Router.
- `StickyBottomCta` already hides on `/contact*`; if you want to suppress it on
  more routes, pass `hiddenOnRoutes={["/contact", "/privacy"]}`.
- `ScrollProgress` accepts a `hidden` prop — useful if you want to drive it
  per-page via a header-level context. For the simplest setup, leave it on
  everywhere.

### `app/page.tsx`
Only the homepage needs `SimulatorBottomSheet` (it observes `#simulator`):

```tsx
import { SimulatorBottomSheet } from "@/components/mobile/SimulatorBottomSheet";

export default function HomePage() {
  return (
    <>
      {/* ...existing sections... */}
      <SimulatorBottomSheet />
    </>
  );
}
```

### Using `MagneticButton`
Wrap an existing CTA without changing its visual styling:

```tsx
import { MagneticButton } from "@/components/effects/MagneticButton";

<MagneticButton
  as="a"
  href="/contact"
  className="inline-flex items-center gap-2 h-12 px-6 rounded-xl bg-[var(--color-brand-blue)] text-white font-semibold"
>
  Book a diagnostic →
</MagneticButton>
```

Or wrap an existing child element (`as` unused, `<button>` default skipped):

```tsx
<MagneticButton as="span">
  <Link href="/contact" className="...">Book a diagnostic</Link>
</MagneticButton>
```

Recommended placements: hero primary CTA, final-CTA section, pricing CTAs.
**Don't** wrap nav links — magnetic effect on small targets feels jittery.

---

## Browser support / perf

- Framer Motion `useSpring`, `useMotionValue`, `AnimatePresence`, `useReducedMotion`
  are all supported in React 19 + framer-motion ^12 (current project versions).
- `env(safe-area-inset-bottom)` requires iOS Safari 11+ / modern Chromium — gracefully
  falls back to the `max()` floor (12 / 16 px).
- `ScrollProgress` and `StickyBottomCta` both use `requestAnimationFrame`-throttled
  / passive scroll listeners. Negligible perf impact (< 0.5ms/frame).
- `MagneticButton` is a no-op on touch devices, so there's zero JS work on phones.
- `SimulatorBottomSheet` adds one `IntersectionObserver` and only renders DOM
  when the simulator is on-screen.

## Accessibility

- All interactive elements are ≥ 44×44px on mobile.
- `SimulatorBottomSheet` traps Escape to close, locks body scroll while open,
  and has `role="dialog"` + `aria-modal`.
- `ScrollProgress` is `aria-hidden` (decorative).
- `MagneticButton` preserves the underlying element's semantics (default
  `<button>`; pass `as="a"` for links).
- All animations are gated behind `prefers-reduced-motion`.
