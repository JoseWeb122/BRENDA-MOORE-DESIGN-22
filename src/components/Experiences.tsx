import { eventTypes } from "@/lib/data";
import { SectionHeading, SectionLabel, SectionShell } from "./ui/Section";
import { Reveal } from "./ui/Reveal";
import { IconArrowRight } from "./ui/Icons";

export function Experiences() {
  return (
    <SectionShell label="Performance experiences" className="bg-espresso">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <SectionLabel>Performance Experiences</SectionLabel>
          <SectionHeading className="mt-6" size="md">
            The Right Set
            <br />
            for the <span className="u-italic text-gold">Right Room.</span>
          </SectionHeading>
        </div>
        <Reveal variant="up" delay={160} className="max-w-[34ch]">
          <p className="font-sans text-[0.92rem] font-light leading-[1.9] text-ivory/50">
            Five ways Brenda can be part of your occasion — each one shaped around the
            audience, the space and the mood of the evening.
          </p>
        </Reveal>
      </div>

      <ul className="mt-14 grid gap-5 md:mt-20 md:grid-cols-2 lg:grid-cols-12 lg:gap-6">
        {eventTypes.map((event, index) => (
          <Reveal
            as="li"
            variant="up"
            delay={index * 90}
            key={event.id}
            className={event.span}
          >
            <article className="group relative h-full overflow-hidden border border-ivory/10 bg-espresso-800/50 transition-colors duration-600 hover:border-gold/35">
              <div className="relative h-56 overflow-hidden sm:h-64">
                <img
                  src={event.image}
                  alt={`${event.title} — placeholder image`}
                  loading="lazy"
                  decoding="async"
                  className="img-zoom h-full w-full object-cover"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-espresso-800 via-espresso-800/25 to-transparent" />

                <span className="absolute left-5 top-5 font-sans text-[9px] uppercase tracking-[0.3em] text-gold/80">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <span className="absolute bottom-5 right-5 flex h-10 w-10 translate-y-2 items-center justify-center rounded-full border border-ivory/25 text-ivory/70 opacity-0 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0 group-hover:border-gold group-hover:text-gold group-hover:opacity-100">
                  <IconArrowRight size={16} />
                </span>
              </div>

              <div className="flex flex-col gap-3 p-6 sm:p-7">
                <h3 className="u-display text-[1.6rem] leading-tight text-ivory transition-colors duration-400 group-hover:text-gold-200">
                  {event.title}
                </h3>
                <p className="font-sans text-[0.87rem] font-light leading-[1.85] text-ivory/55">
                  {event.description}
                </p>
              </div>
            </article>
          </Reveal>
        ))}
      </ul>
    </SectionShell>
  );
}
