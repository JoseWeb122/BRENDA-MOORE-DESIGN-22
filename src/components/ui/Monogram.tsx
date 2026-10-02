import { cn } from "@/utils/cn";

/**
 * Signature monogram used as a small brand mark throughout the site.
 * Purely decorative — the accessible name is always provided by
 * surrounding text.
 */
export function Monogram({
  className,
  size = 76,
  spin = false,
}: {
  className?: string;
  size?: number;
  spin?: boolean;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={cn("text-gold", spin && "spin-slow", className)}
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="0.9" opacity="0.55" />
      <circle cx="50" cy="50" r="42.5" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.35" />
      <text
        x="50"
        y="50"
        textAnchor="middle"
        dominantBaseline="central"
        fontFamily="Cormorant Garamond, Georgia, serif"
        fontSize="27"
        fontWeight="400"
        letterSpacing="1.5"
        fill="currentColor"
      >
        BMF
      </text>
      <path d="M50 8v6M50 86v6M8 50h6M86 50h6" stroke="currentColor" strokeWidth="0.9" opacity="0.7" />
    </svg>
  );
}

/** A small hand-drawn-feeling signature flourish. */
export function Signature({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 220 56"
      className={cn("text-gold", className)}
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M6 40c14-26 24 12 34-6s16 16 26-2 14 12 24-4 16 10 26-6 18 14 30-2 20 8 32-6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        opacity="0.85"
      />
      <path d="M186 14l6 8-11 1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" opacity="0.6" />
    </svg>
  );
}
