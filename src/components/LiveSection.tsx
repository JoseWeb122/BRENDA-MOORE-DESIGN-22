import { images } from "@/lib/images";
import { SectionHeading } from "./ui/Section";
import { Reveal } from "./ui/Reveal";
import { ButtonLink } from "./ui/Button";
import { useSmoothScrollTo } from "@/lib/hooks";

export function LiveSection() {
  const scrollTo = useSmoothScrollTo();

  return (
    <section
      id="live"
      aria-label="Bring Brenda to your stage"
      className="relative overflow-hidden bg-espresso-800"
    >
      <div className="mx-auto grid w-full max-w-[1440px] lg:grid-cols-2">
        {/* ---------------- Image ---------------- */}
        <Reveal variant="right" className="relative min-h-[22rem] overflow-hidden lg:min-h-[38rem]">
          <img
            src={images.performance}
            alt="Brenda Moore-Frazier performing live — placeholder image"
            loading="lazy"
            decoding="async"
            className="img-zoom absolute inset-0 h-full w-full object-cover"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-espresso/10 to-espresso-800 lg:to-espresso-800" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-espresso-800 via-transparent to-transparent lg:bg-none" />

          <div className="absolute bottom-6 left-6 flex items-center gap-4 lg:bottom-10 lg:left-10">
            <span className="h-px w-10 bg-gold" />
            <span className="u-label text-ivory/70">Live Performance</span>
          </div>
        </Reveal>

        {/* ---------------- Copy ---------------- */}
        <div className="flex flex-col justify-center px-5 py-24 sm:px-8 md:py-32 lg:px-16 lg:py-24 xl:px-24">
          <Reveal variant="fade" className="flex items-center gap-4">
            <span className="h-px w-10 bg-gold/70" />
            <span className="u-label text-gold">Live &amp; Bookings</span>
          </Reveal>

          <SectionHeading className="mt-7" size="lg">
            Bring Brenda
            <br />
            to Your <span className="u-italic text-gold">Stage.</span>
          </SectionHeading>

          <Reveal variant="up" delay={180} className="mt-8 max-w-[48ch]">
            <p className="font-sans text-[1rem] font-light leading-[1.95] text-ivory/65">
              Brenda performs for audiences who want a real musical moment — a set
              sung with intention, arranged around the room, and delivered with the
              same care she brings to a recording session.
            </p>
          </Reveal>

          <Reveal variant="up" delay={240} className="mt-8 max-w-[48ch]">
            <p className="font-sans text-[0.95rem] font-light leading-[1.95] text-ivory/50">
              Presentations can be tailored for live events, private events, community
              and cultural events, and special celebrations. Formats range from solo
              vocal performance to piano and vocal, or a full band. Dates are
              confirmed individually — please share the details of your event and
              Brenda will respond personally.
            </p>
          </Reveal>

          {/* format chips */}
          <Reveal variant="fade" delay={320} className="mt-10 flex flex-wrap gap-3">
            {["Solo Vocal", "Piano & Vocal", "Full Band", "Acoustic Trio"].map((format) => (
              <span
                key={format}
                className="border border-ivory/15 px-4 py-2 font-sans text-[9.5px] uppercase tracking-[0.22em] text-ivory/55 transition-colors duration-400 hover:border-gold/50 hover:text-gold"
              >
                {format}
              </span>
            ))}
          </Reveal>

          <Reveal variant="up" delay={380} className="mt-12">
            <ButtonLink
              href="#contact"
              size="lg"
              onClick={(event) => {
                event.preventDefault();
                scrollTo("#contact");
              }}
            >
              Inquire About a Performance
            </ButtonLink>
          </Reveal>

          <Reveal variant="fade" delay={440} className="mt-6">
            <p className="font-sans text-[10.5px] leading-relaxed tracking-[0.08em] text-ivory/35">
              Availability is confirmed on a case-by-case basis. No booking is
              committed until both parties agree in writing.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
