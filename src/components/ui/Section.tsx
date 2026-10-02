import type { ReactNode } from "react";
import { cn } from "@/utils/cn";
import { Reveal } from "./Reveal";

/** Small uppercase eyebrow with a gold rule. */
export function SectionLabel({
  children,
  className,
  align = "left",
}: {
  children: ReactNode;
  className?: string;
  align?: "left" | "center";
}) {
  return (
    <Reveal
      variant="fade"
      className={cn(
        "flex items-center gap-4",
        align === "center" && "justify-center",
        className,
      )}
    >
      <span className="h-px w-8 shrink-0 bg-gold/70 md:w-12" />
      <span className="u-label text-gold">{children}</span>
      {align === "center" && <span className="h-px w-8 shrink-0 bg-gold/70 md:w-12" />}
    </Reveal>
  );
}

/** Editorial section heading — display serif, generous leading. */
export function SectionHeading({
  children,
  className,
  size = "lg",
  align = "left",
}: {
  children: ReactNode;
  className?: string;
  size?: "md" | "lg" | "xl";
  align?: "left" | "center";
}) {
  const sizes = {
    md: "text-[clamp(2rem,4.6vw,3.4rem)]",
    lg: "text-[clamp(2.5rem,6vw,5rem)]",
    xl: "text-[clamp(3rem,8.4vw,7rem)]",
  };
  return (
    <Reveal
      variant="up"
      delay={80}
      className={cn("u-display text-ivory", sizes[size], align === "center" && "text-center", className)}
    >
      {children}
    </Reveal>
  );
}

export function SectionShell({
  id,
  children,
  className,
  label,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  label?: string;
}) {
  return (
    <section
      id={id}
      aria-label={label}
      className={cn("relative px-5 py-24 sm:px-8 md:py-32 lg:px-14 xl:px-20", className)}
    >
      <div className="mx-auto w-full max-w-[1440px]">{children}</div>
    </section>
  );
}
