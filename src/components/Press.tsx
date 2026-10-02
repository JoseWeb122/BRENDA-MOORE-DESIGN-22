import { useCallback, useEffect, useState } from "react";
import { cn } from "@/utils/cn";
import { press } from "@/lib/data";
import { SectionHeading, SectionLabel, SectionShell } from "./ui/Section";
import { Reveal } from "./ui/Reveal";
import { useReducedMotion } from "@/lib/hooks";
import { IconChevronLeft, IconChevronRight, IconQuote } from "./ui/Icons";

export function Press() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduced = useReducedMotion();
  const total = press.length;

  const go = useCallback(
    (next: number) => setIndex((next + total) % total),
    [total],
  );

  /* Gentle auto-advance — pauses on hover/focus and for reduced motion. */
  useEffect(() => {
    if (paused || reduced) return;
    const id = window.setInterval(() => setIndex((current) => (current + 1) % total), 8000);
    return () => window.clearInterval(id);
  }, [paused, reduced, total]);

  const active = press[index];

  return (
    <SectionShell id="press" className="bg-espresso">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <SectionLabel>Press &amp; Praise</SectionLabel>
          <SectionHeading className="mt-6" size="md">
            What People
            <br />
            Are <span className="u-italic text-gold">Saying.</span>
          </SectionHeading>
        </div>
        <Reveal variant="up" delay={160} className="max-w-[34ch]">
          <p className="font-sans text-[0.92rem] font-light leading-[1.9] text-ivory/50">
            Reviews, audience feedback and event testimonials will be collected here as
            they arrive — each one published only with permission.
          </p>
        </Reveal>
      </div>

      {/* ---------------- Carousel ---------------- */}
      <div
        className="relative mt-14 md:mt-20"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocusCapture={() => setPaused(true)}
        onBlurCapture={() => setPaused(false)}
        role="region"
        aria-roledescription="carousel"
        aria-label="Press and testimonials"
      >
        <Reveal
          variant="up"
          className="relative border border-gold/20 bg-gradient-to-br from-espresso-800/80 via-espresso/95 to-espresso px-6 py-12 sm:px-12 sm:py-16 lg:px-20"
        >
          <IconQuote size={54} className="text-gold/35" />

          <div
            className="mt-8 min-h-[13rem] sm:min-h-[11rem]"
            aria-live="polite"
            aria-atomic="true"
          >
            <p key={active.id} className="modal-panel">
              <span className="u-display block text-[clamp(1.5rem,3.1vw,2.5rem)] leading-[1.28] text-ivory/90">
                {active.quote}
              </span>
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3">
              <span className="h-px w-10 bg-gold" />
              <span className="font-sans text-[11px] uppercase tracking-[0.24em] text-gold">
                {active.kind}
              </span>
              <span className="font-sans text-[11px] tracking-[0.1em] text-ivory/45">
                {active.source}
              </span>
            </div>
          </div>

          {/* controls */}
          <div className="mt-10 flex items-center justify-between gap-6 border-t border-ivory/10 pt-7">
            <div className="flex items-center gap-3" aria-label="Choose testimonial">
              {press.map((item, itemIndex) => (
                <button
                  key={item.id}
                  type="button"
                  aria-current={itemIndex === index}
                  aria-label={`Show ${item.context}`}
                  onClick={() => go(itemIndex)}
                  className={cn(
                    "h-[3px] w-10 rounded-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                    itemIndex === index ? "bg-gold" : "bg-ivory/20 hover:bg-ivory/40",
                  )}
                />
              ))}
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => go(index - 1)}
                aria-label="Previous testimonial"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-ivory/20 text-ivory/70 transition-all duration-400 hover:border-gold hover:text-gold"
              >
                <IconChevronLeft size={17} />
              </button>
              <button
                type="button"
                onClick={() => go(index + 1)}
                aria-label="Next testimonial"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-ivory/20 text-ivory/70 transition-all duration-400 hover:border-gold hover:text-gold"
              >
                <IconChevronRight size={17} />
              </button>
            </div>
          </div>
        </Reveal>

        <Reveal variant="fade" delay={200} className="mt-6">
          <p className="font-sans text-[10.5px] leading-relaxed tracking-[0.06em] text-ivory/35">
            Placeholder entries. No quotes, names or publications have been invented —
            verified material will replace these cards.
          </p>
        </Reveal>
      </div>
    </SectionShell>
  );
}
