import { cn } from "@/lib/cn";

export function SectionLabel({
  children,
  className,
  number,
}: {
  children: React.ReactNode;
  className?: string;
  number?: string;
}) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <span className="w-8 h-px bg-[var(--color-brand-bright)]" />
      <span className="eyebrow">{children}</span>
      {number && (
        <span className="font-mono text-[10px] text-[var(--color-ink-tertiary)] tracking-wider">
          / {number}
        </span>
      )}
    </div>
  );
}
