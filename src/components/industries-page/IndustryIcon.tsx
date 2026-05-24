import { cn } from "@/lib/cn";
import type { IndustrySlug } from "@/lib/industries-data";

type Props = {
  slug: IndustrySlug;
  className?: string;
};

/**
 * Bespoke line-drawn icons for each vertical.
 * 1.5px stroke, rounded caps, currentColor — tinted via parent.
 */
export function IndustryIcon({ slug, className }: Props) {
  const common = {
    width: 48,
    height: 48,
    viewBox: "0 0 48 48",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className: cn("transition-transform duration-500", className),
    "aria-hidden": true,
  };

  switch (slug) {
    case "roofing":
      // House with peaked roof + lightning bolt (storm)
      return (
        <svg {...common}>
          <path d="M8 24 L24 10 L40 24" />
          <path d="M11 22 L11 38 L37 38 L37 22" />
          <path d="M21 38 L21 28 L27 28 L27 38" />
          <path d="M32 6 L29 13 L33 13 L30 20" opacity="0.55" />
        </svg>
      );

    case "hvac":
      // 4-blade fan / outdoor condenser
      return (
        <svg {...common}>
          <circle cx="24" cy="24" r="13" />
          <path d="M24 11 C 24 17, 30 21, 30 24" />
          <path d="M37 24 C 31 24, 27 30, 24 30" />
          <path d="M24 37 C 24 31, 18 27, 18 24" />
          <path d="M11 24 C 17 24, 21 18, 24 18" />
          <circle cx="24" cy="24" r="2.5" fill="currentColor" stroke="none" />
        </svg>
      );

    case "remodeling":
      // Hammer + paint roller combined (renovation)
      return (
        <svg {...common}>
          <path d="M9 14 L18 14 L18 22 L14 22 L14 38 L13 38 L13 22 L9 22 Z" />
          <path d="M20 28 L36 12" />
          <path d="M32 8 L40 16 L36 20 L28 12 Z" />
          <path d="M22 34 L34 22" opacity="0.5" />
        </svg>
      );

    case "pool":
      // Pool waves with sun
      return (
        <svg {...common}>
          <circle cx="36" cy="12" r="4" />
          <path d="M6 22 C 12 18, 18 26, 24 22 S 36 18, 42 22" />
          <path d="M6 30 C 12 26, 18 34, 24 30 S 36 26, 42 30" />
          <path d="M6 38 C 12 34, 18 42, 24 38 S 36 34, 42 38" opacity="0.6" />
        </svg>
      );

    case "general-contractors":
      // Building / multi-structure
      return (
        <svg {...common}>
          <path d="M6 38 L6 18 L18 18 L18 38" />
          <path d="M18 38 L18 10 L34 10 L34 38" />
          <path d="M34 38 L34 22 L42 22 L42 38" />
          <path d="M6 38 L42 38" />
          <path d="M22 18 L22 22 M26 18 L26 22 M30 18 L30 22" opacity="0.6" />
          <path d="M22 26 L22 30 M26 26 L26 30 M30 26 L30 30" opacity="0.6" />
          <path d="M10 24 L10 28 M14 24 L14 28" opacity="0.6" />
          <path d="M37 28 L37 32" opacity="0.6" />
        </svg>
      );

    default:
      return (
        <svg {...common}>
          <circle cx="24" cy="24" r="14" />
        </svg>
      );
  }
}
