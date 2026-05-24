import { Hero } from "@/components/hero/Hero";
import { TrustBar } from "@/components/sections/TrustBar";
import { Simulator } from "@/components/sections/Simulator";
import { Services } from "@/components/sections/Services";
import { Industries } from "@/components/sections/Industries";
import { Process } from "@/components/sections/Process";
import { KpiDashboard } from "@/components/sections/KpiDashboard";
import { Testimonials } from "@/components/sections/Testimonials";
import { Pricing } from "@/components/sections/Pricing";
import { WhyPanama } from "@/components/sections/WhyPanama";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <Simulator />
      <Services />
      <Industries />
      <Process />
      <KpiDashboard />
      <Testimonials />
      <Pricing />
      <WhyPanama />
      <Faq />
      <FinalCta />
    </>
  );
}
