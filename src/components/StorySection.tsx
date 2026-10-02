import { images } from "@/lib/images";
import { Reveal } from "./ui/Reveal";
import { SectionLabel } from "./ui/Section";
import { Monogram } from "./ui/Monogram";

export function StorySection() {
  return (
    <section
      aria-label="The feeling behind the music"
      className="relative overflow-hidden bg-espresso-800 py-24 md:py-36 lg:py-44"
    >
      {/* warm ambient wash */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_60%_at_78%_30%,rgba(198,161,91,0.13),transparent_65%)]"
      />

      <div className="relative mx-auto grid w-full max-w-[1440px] items-center gap-14 px-5 sm:px-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-24 lg:px-14 xl:px-20">
        {/* ---------------- Statement ---------------- */}
        <div>
          <SectionLabel>The Feeling</SectionLabel>

          <Reveal variant="up" delay={100} as="blockquote" className="mt-8">
            <p className="u-display text-[clamp(2.1rem,4.9vw,4.1rem)] leading-[1.08] text-ivory">
              “Music is not simply
              <br />
              something you hear.
              <br />
              <span className="u-italic text-gold">It is something you experience.”</span>
            </p>
          </Reveal>

          <Reveal variant="up" delay={220} className="mt-10 max-w-[42ch]">
            <p className="font-sans text-[0.98rem] font-light leading-[1.95] text-ivory/60">
              That idea sits underneath everything Brenda records and performs. A song
              is not finished when it is written — it is finished when someone in the
              room feels it.
            </p>
          </Reveal>

          <Reveal variant="fade" delay={320} className="mt-10 flex items-center gap-5">
            <span className="h-px w-12 bg-gold/60" />
            <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-ivory/40">
              Design statement — not a quoted remark
            </span>
          </Reveal>
        </div>

        {/* ---------------- Artistic image stack ---------------- */}
        <Reveal variant="left" delay={140} className="relative">
          <div className="group relative overflow-hidden">
            <img
              src={images.story}
              alt="Close-up of a vintage microphone in warm stage light — placeholder image"
              loading="lazy"
              decoding="async"
              className="img-zoom aspect-[4/5] w-full object-cover"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-espresso-700/70 via-transparent to-transparent" />
          </div>

          {/* offset secondary plate */}
          <div
            aria-hidden="true"
            className="absolute -bottom-8 -left-6 hidden w-40 border border-gold/25 bg-espresso p-5 lg:block"
          >
            <Monogram size={44} spin />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
