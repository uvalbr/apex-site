import type { Metadata } from "next";
import { AboutHero } from "@/components/about-page/AboutHero";
import { CompanyNarrative } from "@/components/about-page/CompanyNarrative";
import { PanamaDeepDive } from "@/components/about-page/PanamaDeepDive";
import { OperationalModel } from "@/components/about-page/OperationalModel";
import { OnboardingTimeline } from "@/components/about-page/OnboardingTimeline";
import { Principles } from "@/components/about-page/Principles";
import { TrustSignals } from "@/components/about-page/TrustSignals";
import { AboutCta } from "@/components/about-page/AboutCta";

export const metadata: Metadata = {
  title: "About — Revenue Operations Infrastructure for construction",
  description:
    "Dedicated revenue operations teams for U.S. construction companies, operating from Panama on EST. Why Panama, how we run, and how we onboard you in 60 days.",
  keywords: [
    "APEX Revenue Operations",
    "Panama nearshore sales operations",
    "outsourced sales team construction",
    "construction sales operations company",
    "60 day sales onboarding",
  ],
  alternates: { canonical: "https://apexrevenueoperations.com/about" },
  openGraph: {
    type: "website",
    title: "About APEX Revenue Operations",
    description:
      "Dedicated revenue operations for U.S. construction. EST-aligned, Panama-based, 60-day onboarding, performance-aligned engagements.",
    url: "https://apexrevenueoperations.com/about",
    siteName: "APEX Revenue Operations",
  },
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <CompanyNarrative />
      <PanamaDeepDive />
      <OperationalModel />
      <OnboardingTimeline />
      <Principles />
      <TrustSignals />
      <AboutCta />
    </>
  );
}
