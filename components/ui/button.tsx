import { cn } from "@/lib/utils/cn";
import Link from "next/link";

type ButtonVariant = "primary" | "secondary" | "outline" | "accent";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: React.ReactNode;
  href?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-primary text-white hover:bg-primary-dark hover:-translate-y-px hover:shadow-medium active:translate-y-0",
  secondary:
    "bg-primary-light text-primary border-2 border-transparent hover:bg-primary-medium hover:border-primary",
  outline:
    "bg-transparent text-primary border-2 border-primary hover:bg-primary hover:text-white",
  accent:
    "bg-accent text-white hover:bg-accent-dark hover:-translate-y-px hover:shadow-medium active:translate-y-0",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  href,
  type = "button",
  disabled,
  onClick,
}: ButtonProps) {
  const baseStyles = cn(
    "inline-flex items-center justify-center font-medium rounded-card",
    "transition-all duration-fast",
    "focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2",
    variantStyles[variant],
    sizeStyles[size],
    disabled && "opacity-50 cursor-not-allowed",
    className,
  );

  if (href) {
    return (
      <Link href={href} className={baseStyles}>
        {children}
      </Link>
    );
  }

  return (
    <button className={baseStyles} type={type} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
}
