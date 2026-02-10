import { cn } from "@/lib/utils/cn";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({ children, className, hover = true }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-card border border-border-light bg-white p-6",
        hover &&
          "transition-all duration-fast hover:-translate-y-0.5 hover:border-primary hover:shadow-medium",
        className,
      )}
    >
      {children}
    </div>
  );
}
