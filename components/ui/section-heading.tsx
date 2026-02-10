import { cn } from "@/lib/utils/cn";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  badge?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  title,
  subtitle,
  badge,
  align = "center",
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("mb-12", align === "center" && "text-center", className)}>
      {badge && (
        <span className="mb-3 inline-block border-l-4 border-accent pl-3 text-sm font-semibold uppercase tracking-wider text-accent">
          {badge}
        </span>
      )}
      <h2 className="font-heading text-3xl font-bold text-text-primary sm:text-4xl">{title}</h2>
      {subtitle && (
        <p className="mt-4 text-lg text-text-secondary max-w-2xl mx-auto">{subtitle}</p>
      )}
    </div>
  );
}
