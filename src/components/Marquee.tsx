import { artist } from "@/lib/data";

/** Elegant infinite marquee used as a section divider. */
export function Marquee({ reverse = false }: { reverse?: boolean }) {
  const items = [
    artist.roles[0],
    artist.roles[1],
    artist.roles[2],
    artist.roles[3],
    "Timeless Stories",
    "Soulful Sound",
  ];

  const row = [...items, ...items];

  return (
    <div
      aria-hidden="true"
      className="relative flex overflow-hidden border-y border-ivory/10 bg-espresso py-5 md:py-6"
    >
      <div
        className="marquee-track shrink-0"
        style={reverse ? { animationDirection: "reverse" } : undefined}
      >
        {row.map((item, index) => (
          <span key={`${item}-${index}`} className="flex items-center">
            <span className="u-label whitespace-nowrap px-7 text-ivory/30 md:px-10">
              {item}
            </span>
            <span className="h-1 w-1 shrink-0 rotate-45 bg-gold/60" />
          </span>
        ))}
      </div>
      <div className="marquee-track shrink-0" aria-hidden="true">
        {row.map((item, index) => (
          <span key={`dup-${item}-${index}`} className="flex items-center">
            <span className="u-label whitespace-nowrap px-7 text-ivory/30 md:px-10">
              {item}
            </span>
            <span className="h-1 w-1 shrink-0 rotate-45 bg-gold/60" />
          </span>
        ))}
      </div>
    </div>
  );
}
