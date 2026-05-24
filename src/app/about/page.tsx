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
    "APEX builds dedicated revenue operations functions for U.S. construction companies. Operating from Panama on EST. Why Panama, how we run, what we believe, and how we onboard you in 60 days.",
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
