import { Hero } from "@/components/hero/Hero";
import { TrustBar } from "@/components/sections/TrustBar";
import { Simulator } from "@/components/sections/Simulator";
import { Services } from "@/components/sections/Services";
import { Industries } from "@/components/sections/Industries";
import { Comparison } from "@/components/sections/Comparison";
import { Process } from "@/components/sections/Process";
import { KpiDashboard } from "@/components/sections/KpiDashboard";
import { CaseStudies } from "@/components/sections/CaseStudies";
import { Testimonials } from "@/components/sections/Testimonials";
import { Pricing } from "@/components/sections/Pricing";
import { WhyPanama } from "@/components/sections/WhyPanama";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";
import { SimulatorBottomSheet } from "@/components/mobile/SimulatorBottomSheet";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <Simulator />
      <Services />
      <Industries />
      <Comparison />
      <Process />
      <KpiDashboard />
      <CaseStudies />
      <Testimonials />
      <Pricing />
      <WhyPanama />
      <Faq />
      <FinalCta />
      <SimulatorBottomSheet />
    </>
  );
}
