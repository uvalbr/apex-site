import type { Metadata } from "next";
import { PricingHero } from "@/components/pricing-page/PricingHero";
import { ComparisonTable } from "@/components/pricing-page/ComparisonTable";
import { TierBreakdown } from "@/components/pricing-page/TierBreakdown";
import { PartnershipModel } from "@/components/pricing-page/PartnershipModel";
import { RoiCalculator } from "@/components/pricing-page/RoiCalculator";
import { PricingFaq } from "@/components/pricing-page/PricingFaq";
import { PricingCta } from "@/components/pricing-page/PricingCta";

export const metadata: Metadata = {
  title: "Pricing — Four tiers, transparent math",
  description:
    "Fixed monthly base $8.5K–$25K plus per-appointment fee plus revenue share. Pilot, Growth, Expansion, and Enterprise tiers for U.S. construction operators.",
  keywords: [
    "outsourced sales operations pricing",
    "appointment setting cost construction",
    "revenue operations pricing",
    "construction sales pilot program",
    "performance-based appointment fees",
  ],
  alternates: { canonical: "https://apex.texasserviceexperts.com/pricing" },
  openGraph: {
    type: "website",
    title: "Pricing — APEX Revenue Operations",
    description:
      "Four engagement tiers: Pilot ($8.5K), Growth ($15K), Expansion ($20K), Enterprise ($25K) monthly base + performance + revenue share.",
    url: "https://apex.texasserviceexperts.com/pricing",
    siteName: "APEX Revenue Operations",
  },
};

export default function PricingPage() {
  return (
    <>
      <PricingHero />
      <ComparisonTable />
      <TierBreakdown />
      <PartnershipModel />
      <RoiCalculator />
      <PricingFaq />
      <PricingCta />
    </>
  );
}
