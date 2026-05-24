import { ServicesHero } from "@/components/services-page/ServicesHero";
import { ServiceSection } from "@/components/services-page/ServiceSection";
import { StickyNav } from "@/components/services-page/StickyNav";
import { ServicesCta } from "@/components/services-page/ServicesCta";
import { SERVICES_DEEP } from "@/components/services-page/data";

export default function ServicesPage() {
  return (
    <>
      <ServicesHero />
      <StickyNav />
      <div className="relative">
        {SERVICES_DEEP.map((service, i) => (
          <ServiceSection key={service.id} service={service} index={i} />
        ))}
      </div>
      <ServicesCta />
    </>
  );
}
