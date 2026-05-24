import { Hero } from "@/components/hero/Hero";

export default function HomePage() {
  return (
    <>
      <Hero />
      <section id="services" className="container-app py-32">
        <div className="eyebrow mb-4">Coming next</div>
        <h2 className="font-display text-3xl md:text-5xl tracking-tight max-w-3xl">
          Services, industries, pricing, simulator — being built next.
        </h2>
        <p className="mt-4 text-[var(--color-ink-secondary)] max-w-xl">
          You&rsquo;re looking at the Hero. The remaining sections render here as we build them out.
        </p>
      </section>
    </>
  );
}
