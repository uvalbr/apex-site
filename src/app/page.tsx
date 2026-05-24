import { Hero } from "@/components/hero/Hero";
import { Simulator } from "@/components/sections/Simulator";
import { Services } from "@/components/sections/Services";
import { Industries } from "@/components/sections/Industries";
import { Pricing } from "@/components/sections/Pricing";
import { KpiDashboard } from "@/components/sections/KpiDashboard";
import { WhyPanama } from "@/components/sections/WhyPanama";
import { FinalCta } from "@/components/sections/FinalCta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Simulator />
      <Services />
      <Industries />
      <KpiDashboard />
      <Pricing />
      <WhyPanama />
      <FinalCta />
    </>
  );
}
