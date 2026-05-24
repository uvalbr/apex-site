import Link from "next/link";

export function Footer() {
  return (
    <footer className="relative mt-32 border-t border-[var(--color-border-subtle)] bg-[var(--color-bg-elevated)]">
      <div className="container-app py-16 grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3 mb-5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/logo-mark-real.png" alt="" className="w-9 h-9" />
            <div className="leading-none">
              <div className="font-display text-lg tracking-tight">APEX</div>
              <div className="text-[9px] uppercase tracking-[0.32em] text-[var(--color-ink-tertiary)] mt-1">
                Revenue Operations
              </div>
            </div>
          </div>
          <p className="text-sm text-[var(--color-ink-secondary)] max-w-xs leading-relaxed">
            We build and manage dedicated revenue operations departments for U.S. construction companies.
          </p>
          <p className="mt-4 text-xs text-[var(--color-ink-tertiary)]">
            Built to convert. Driven to scale.
          </p>
        </div>

        <FooterCol
          title="Services"
          links={[
            { href: "/services#inbound", label: "Inbound revenue ops" },
            { href: "/services#outbound", label: "Outbound generation" },
            { href: "/services#confirmation", label: "Appointment confirmation" },
            { href: "/services#crm", label: "CRM & pipeline" },
            { href: "/services#reporting", label: "KPI reporting" },
          ]}
        />

        <FooterCol
          title="Industries"
          links={[
            { href: "/industries/roofing", label: "Roofing" },
            { href: "/industries/hvac", label: "HVAC" },
            { href: "/industries/remodeling", label: "Remodeling" },
            { href: "/industries/pool", label: "Pool & outdoor" },
            { href: "/industries/general-contractors", label: "General contractors" },
          ]}
        />

        <FooterCol
          title="Company"
          links={[
            { href: "/about", label: "About" },
            { href: "/pricing", label: "Pricing" },
            { href: "/contact", label: "Contact" },
          ]}
        />
      </div>

      <div className="border-t border-[var(--color-border-subtle)]">
        <div className="container-app py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs text-[var(--color-ink-tertiary)]">
          <div>© {new Date().getFullYear()} APEX Revenue Operations. All rights reserved.</div>
          <div className="flex gap-5">
            <Link href="/privacy" className="hover:text-[var(--color-ink-primary)]">Privacy</Link>
            <Link href="/terms" className="hover:text-[var(--color-ink-primary)]">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: { href: string; label: string }[] }) {
  return (
    <div>
      <div className="eyebrow mb-4">{title}</div>
      <ul className="flex flex-col gap-2.5 text-sm">
        {links.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              className="text-[var(--color-ink-secondary)] hover:text-[var(--color-ink-primary)] transition-colors"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
