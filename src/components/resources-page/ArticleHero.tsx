import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { formatPublishedDate, type Resource } from "@/lib/resources-data";

export function ArticleHero({ resource }: { resource: Resource }) {
  return (
    <section className="relative isolate overflow-hidden bg-hero-spine pt-32 pb-16 md:pt-44 md:pb-24">
      <div aria-hidden className="absolute inset-0 bg-grid pointer-events-none" />
      <div
        aria-hidden
        className="absolute top-1/4 right-0 w-[480px] h-[480px] opacity-40 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(63,160,255,0.22), transparent 65%)",
        }}
      />

      <div className="relative container-app">
        <Reveal>
          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="mb-6 flex items-center gap-2 text-xs text-[var(--color-ink-tertiary)]"
          >
            <Link
              href="/resources"
              className="hover:text-[var(--color-brand-bright)] transition-colors"
            >
              Resources
            </Link>
            <span aria-hidden>/</span>
            <span className="text-[var(--color-ink-secondary)]">
              {resource.category}
            </span>
          </nav>

          <SectionLabel>{resource.category}</SectionLabel>

          <h1 className="mt-5 font-display text-3xl sm:text-5xl md:text-[64px] leading-[1.02] tracking-[-0.035em] max-w-4xl">
            {resource.title}
          </h1>
        </Reveal>

        <Reveal delay={120}>
          <p className="mt-6 max-w-3xl text-base md:text-xl text-[var(--color-ink-secondary)] leading-relaxed">
            {resource.dek}
          </p>
        </Reveal>

        <Reveal delay={200}>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs">
            <Byline name={resource.author.name} role={resource.author.role} />
            <Meta label="Published">
              {formatPublishedDate(resource.publishedISO)}
            </Meta>
            <Meta label="Read time">{resource.readMinutes} min</Meta>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Byline({ name, role }: { name: string; role: string }) {
  const initials = name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("");
  return (
    <div className="flex items-center gap-3">
      <div
        className="grid place-items-center w-9 h-9 rounded-full text-[11px] font-bold"
        style={{
          background: "rgba(30,95,216,0.18)",
          border: "1.5px solid rgba(63,160,255,0.45)",
          color: "#3FA0FF",
        }}
        aria-hidden
      >
        {initials}
      </div>
      <div className="leading-tight">
        <div className="text-sm font-semibold text-[var(--color-ink-primary)]">
          {name}
        </div>
        <div className="text-[11px] text-[var(--color-ink-tertiary)]">
          {role}
        </div>
      </div>
    </div>
  );
}

function Meta({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="leading-tight">
      <div className="text-[10px] uppercase tracking-wider text-[var(--color-ink-tertiary)] font-semibold">
        {label}
      </div>
      <div className="mt-0.5 text-sm font-mono tabular text-[var(--color-ink-primary)]">
        {children}
      </div>
    </div>
  );
}
