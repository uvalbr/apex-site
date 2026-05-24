# APEX Revenue Operations — Brand & Design System

> Source of truth for every design decision. Locked 2026-05-24.

---

## 1. Brand voice

**One-line:** Revenue Operations Infrastructure for construction companies.

**Tagline:** *Built to Convert. Driven to Scale.*

**Anti-positioning (use verbatim in hero sub):**
> We are not a call center. We are not a VA agency. We are not a BPO. We are the revenue operations department your business should already have.

**Voice rules:**
- Operator → operator. No marketing-speak, no superlatives, no "leverage / synergy".
- Every claim backed by a number or specific mechanism.
- Short, declarative sentences. Sentence fragments OK for emphasis.
- Never apologetic. Never overselling. Confident, technical, calm.

---

## 2. Color system

### Core palette (dark-first)
| Token | Hex | Use |
|-------|-----|-----|
| `--bg-deep` | `#050B1A` | Page background |
| `--bg-elevated` | `#0A1428` | Cards, sections |
| `--bg-surface` | `#0F1D38` | Inputs, raised |
| `--ink-primary` | `#F5F8FC` | Body text on dark |
| `--ink-secondary` | `#9BA8C0` | Muted text |
| `--ink-tertiary` | `#5A6B85` | Captions, labels |
| `--brand-navy` | `#0A1E3F` | Primary brand dark |
| `--brand-blue` | `#1E5FD8` | Primary brand action |
| `--brand-bright` | `#3FA0FF` | Accent, glows, links |
| `--brand-pale` | `#D9E6FF` | Subtle highlights |
| `--accent-success` | `#22C55E` | Positive deltas |
| `--accent-warn` | `#F59E0B` | Caution / pending |
| `--accent-danger` | `#EF4444` | Lost revenue, risk |
| `--border-subtle` | `#1A2842` | Hairlines |
| `--border-strong` | `#2A3E63` | Defined edges |

### Gradients
- **Hero spine:** `linear-gradient(135deg, #050B1A 0%, #0A1E3F 50%, #1E5FD8 100%)`
- **Glow burst:** `radial-gradient(circle at 30% 50%, rgba(63,160,255,0.15), transparent 60%)`
- **Pipeline arc:** `linear-gradient(90deg, #1E5FD8, #3FA0FF, #22C55E)` (matches lead-to-close flow)

---

## 3. Typography

### Stack
- **Display / Headlines:** `"Inter Tight"`, fallback `system-ui` — weights 600, 700, 800
- **Body:** `"Inter"`, fallback `system-ui` — weights 400, 500, 600
- **Mono / Numbers:** `"JetBrains Mono"`, fallback `ui-monospace` — weights 500, 700

### Scale (mobile → desktop)
| Token | Mobile | Desktop | Use |
|-------|--------|---------|-----|
| `--text-display-2xl` | 48px / 1.0 | 96px / 0.95 | Hero headline |
| `--text-display-xl` | 36px / 1.05 | 72px / 1.0 | Section headlines |
| `--text-display-lg` | 28px / 1.1 | 48px / 1.1 | Sub-section |
| `--text-display-md` | 22px / 1.2 | 32px / 1.2 | Card titles |
| `--text-body-lg` | 18px / 1.5 | 20px / 1.6 | Hero sub, body lead |
| `--text-body` | 16px / 1.6 | 17px / 1.7 | Body |
| `--text-body-sm` | 14px / 1.5 | 14px / 1.5 | Captions, labels |
| `--text-mono-num` | 24px / 1.0 | 56px / 0.95 | KPI counters |
| `--text-eyebrow` | 11px / 1 (tracked 0.18em) | 12px / 1 | Section labels |

### Rules
- Headlines: `letter-spacing: -0.03em` (Inter Tight tightens nicely)
- Body: `letter-spacing: -0.01em`
- Numbers (KPIs): `font-variant-numeric: tabular-nums` always — prevents counter jitter
- Eyebrows: ALL CAPS, `font-weight: 600`, `color: var(--brand-bright)`

---

## 4. Spacing scale (8pt grid)

`2 / 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96 / 128 / 192`

Section vertical rhythm: `--section-y` = `96px` mobile, `160px` desktop.

---

## 5. Motion system

### Easings (use these names everywhere)
| Name | Cubic-bezier | Use |
|------|--------------|-----|
| `ease-out-quart` | `cubic-bezier(0.22, 1, 0.36, 1)` | Most UI transitions (default) |
| `ease-out-expo` | `cubic-bezier(0.16, 1, 0.3, 1)` | Big hero reveals |
| `ease-in-out-quart` | `cubic-bezier(0.76, 0, 0.24, 1)` | Section transitions |
| `spring-soft` | (FM) `{ stiffness: 100, damping: 20, mass: 1 }` | Card hovers |
| `spring-snap` | (FM) `{ stiffness: 400, damping: 30, mass: 0.6 }` | Toggle, click feedback |

### Durations
- **Micro (≤200ms):** hover, focus, button press
- **Standard (300–500ms):** card mount, accordion, modal
- **Cinematic (600–900ms):** hero reveal, section enter
- **Never** over 900ms unless it's a scroll-driven scene

### Stagger
- Lists: 40ms between items
- Hero text: 60ms between words
- Pipeline nodes: 120ms between stages

### Rules
- ALWAYS respect `prefers-reduced-motion: reduce` → strip transforms, keep opacity
- ALWAYS use GPU-accelerated props (`transform`, `opacity`) — never `top/left/width/height` for animation
- 60fps required on mid-tier mobile. If a section drops frames, simplify.

---

## 6. Layout

- **Max container:** `1280px` (desktop), with `24px` mobile padding, `48px` desktop padding
- **Wide container:** `1440px` for hero + diagnostic simulator only
- **Grid:** 12-col desktop, 4-col mobile, gutter `24px`

---

## 7. Component primitives

### Button variants
| Variant | Background | Text | Border | Hover |
|---------|-----------|------|--------|-------|
| `primary` | `--brand-blue` | white | none | `--brand-bright` + glow |
| `secondary` | transparent | `--ink-primary` | `--border-strong` | `--bg-elevated` |
| `ghost` | transparent | `--brand-bright` | none | underline reveal |

All buttons: `48px` height, `16px 24px` padding, `10px` radius, `font-weight: 600`.

### Card
- `background: var(--bg-elevated)`
- `border: 1px solid var(--border-subtle)`
- `border-radius: 16px`
- `padding: 32px`
- On hover: `border-color: var(--brand-blue)`, lift `-4px translateY`, soft glow

### Pipeline node
- Hexagon or rounded-rect with chevron tail (matches brand mark)
- `border: 1px solid var(--brand-blue)`
- Active state: filled `--brand-bright`, soft pulse animation
- Inactive: `border-color: --border-strong`

---

## 8. Iconography

- **Style:** Outline, 1.5px stroke, rounded line caps
- **Library:** Lucide React (custom-tinted to `--brand-bright` on dark)
- **Custom marks:** APEX triangle, pipeline flow, stairstep chevron — hand-drawn SVG in `/public/brand/`

---

## 9. Imagery

- **Hero backdrop:** Subtle dark cityscape silhouette (Manhattan/Houston-ish), 8% opacity, no people
- **Industry icons:** Bespoke line drawings (roof, HVAC unit, pool, etc.)
- **NEVER:** Stock photos of smiling agents wearing headsets. NEVER cliché business handshakes.

---

## 10. Accessibility (non-negotiable)

- Contrast: AAA for body, AA for display
- All interactive elements: visible focus ring `2px solid var(--brand-bright)` with `2px` offset
- Skip-to-content link
- Reduced motion fallbacks (see Motion §5)
- All animations pausable / non-blocking
- Form fields: label always visible (no placeholder-only)

---

## 11. The signature stair-step chevron

Extract from brand mark. Use as:
- Section divider (full-width, 24px tall, gradient fill)
- Pipeline node connector
- CTA button hover indicator
- Loading state (animated chevron march)

SVG path (base unit):
```
M 0 24 L 12 0 L 24 24 L 36 0 L 48 24 L 60 0 L 72 24 Z
```

---

## 12. Anti-patterns (do NOT do these)

- ❌ Carousel/slider for testimonials (everyone scrolls past, never returns)
- ❌ Hero video with audio
- ❌ Cookie banner that blocks viewport
- ❌ Modal popups offering "10% off"
- ❌ Live chat bubble in corner (this is B2B enterprise, not Shopify)
- ❌ Animated gradients on text (looks like 2018)
- ❌ Parallax on every section (gives motion sickness)
- ❌ Loading spinners > 1 second (replace with skeleton or stream)

---

*Updated: 2026-05-24 by Claude session apex-site bootstrap.*
