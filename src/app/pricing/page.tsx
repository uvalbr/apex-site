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
    "Fixed monthly base from $8.5K to $25K + per-appointment performance fee + revenue share on closed projects. Pilot, Growth, Expansion, and Enterprise tiers for U.S. construction operators.",
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
