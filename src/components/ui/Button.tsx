import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/utils/cn";

type Variant = "gold" | "outline" | "ghost" | "light";
type Size = "sm" | "md" | "lg";

const base =
  "group relative inline-flex items-center justify-center gap-3 overflow-hidden font-sans uppercase tracking-[0.22em] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] disabled:cursor-not-allowed disabled:opacity-45";

const variants: Record<Variant, string> = {
  gold: "bg-gold text-espresso hover:bg-gold-200 shadow-[0_10px_36px_-18px_rgba(198,161,91,0.85)]",
  outline:
    "border border-gold/45 text-ivory hover:border-gold hover:text-gold hover:bg-gold/[0.07]",
  ghost: "text-ivory/80 hover:text-gold",
  light: "bg-ivory text-espresso hover:bg-champagne",
};

const sizes: Record<Size, string> = {
  sm: "px-6 py-3 text-[10px]",
  md: "px-8 py-4 text-[11px]",
  lg: "px-10 py-5 text-[11px]",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  className?: string;
};

export function Button({
  variant = "gold",
  size = "md",
  className,
  children,
  ...props
}: CommonProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    >
      <span className="relative z-10 flex items-center gap-3">{children}</span>
      <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-full" />
    </button>
  );
}

export function ButtonLink({
  variant = "gold",
  size = "md",
  className,
  children,
  ...props
}: CommonProps & AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a className={cn(base, variants[variant], sizes[size], className)} {...props}>
      <span className="relative z-10 flex items-center gap-3">{children}</span>
      <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-full" />
    </a>
  );
}

/** Text link with an animated gold arrow. */
export function TextLink({
  children,
  className,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a
      className={cn(
        "group inline-flex items-center gap-3 font-sans text-[11px] uppercase tracking-[0.28em] text-gold transition-colors duration-300 hover:text-gold-200",
        className,
      )}
      {...props}
    >
      {children}
      <span className="transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1.5">
        <svg width="26" height="8" viewBox="0 0 26 8" fill="none" aria-hidden="true">
          <path d="M0 4h24M20 1l4 3-4 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      </span>
    </a>
  );
}
