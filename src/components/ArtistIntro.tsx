import { artist } from "@/lib/data";
import { images } from "@/lib/images";
import { SectionLabel } from "./ui/Section";
import { TextLink } from "./ui/Button";
import { Reveal } from "./ui/Reveal";
import { Signature } from "./ui/Monogram";

export function ArtistIntro() {
  return (
    <section
      aria-label="Meet Brenda"
      className="relative overflow-hidden bg-espresso px-5 pb-28 pt-4 sm:px-8 md:pb-36 lg:px-14 xl:px-20"
    >
      <div className="mx-auto grid w-full max-w-[1440px] items-center gap-12 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-20">
        {/* ---------------- Portrait ---------------- */}
        <Reveal variant="right" className="relative">
          <div className="group relative">
            {/* offset gold frame */}
            <div
              aria-hidden="true"
              className="absolute -bottom-4 -right-4 hidden h-full w-full border border-gold/30 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-bottom-6 group-hover:-right-6 lg:block"
            />
            <div className="relative overflow-hidden">
              <img
                src={images.artist}
                alt="Portrait of Brenda Moore-Frazier in the studio — placeholder image"
                loading="lazy"
                decoding="async"
                className="img-zoom aspect-[4/5] w-full object-cover object-[50%_35%]"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-espresso/55 via-transparent to-transparent" />
            </div>

            {/* floating caption plate */}
            <div className="absolute -bottom-6 left-4 border border-gold/25 bg-espresso/92 px-5 py-4 backdrop-blur-md sm:left-6">
              <p className="u-label text-gold">The Artist</p>
              <p className="mt-2 font-sans text-[11px] tracking-[0.14em] text-ivory/70">
                {artist.roles.join(" · ")}
              </p>
            </div>
          </div>
        </Reveal>

        {/* ---------------- Copy ---------------- */}
        <div>
          <SectionLabel>The Artist</SectionLabel>

          <Reveal variant="up" delay={90} as="h2" className="u-display mt-7 text-[clamp(2.4rem,5.6vw,4.6rem)] leading-[0.98] text-ivory">
            A Voice With
            <br />
            Something <span className="u-italic text-gold">to Say.</span>
          </Reveal>

          <Reveal variant="up" delay={170} className="mt-8 max-w-[46ch]">
            <p className="font-sans text-[1rem] font-light leading-[1.95] text-ivory/65">
              Brenda Moore-Frazier is a singer, songwriter and recording artist whose
              sound is rooted in vintage soul and shaped by honest storytelling. She
              writes about the things people actually live through, and she sings them
              without hurry.
            </p>
          </Reveal>

          <Reveal variant="up" delay={240} className="mt-6 max-w-[46ch]">
            <p className="font-sans text-[1rem] font-light leading-[1.95] text-ivory/55">
              In the studio and in front of a live audience she does the same thing:
              stays close to the song, stays close to the room, and lets the words
              land before moving on.
            </p>
          </Reveal>

          {/* signature */}
          <Reveal variant="fade" delay={320} className="mt-10 flex items-center gap-6">
            <Signature className="w-40 sm:w-52" />
            <span className="font-sans text-[10px] uppercase tracking-[0.28em] text-ivory/35">
              Brenda Moore-Frazier
            </span>
          </Reveal>

          <Reveal variant="up" delay={380} className="mt-10">
            <TextLink href="#about">Discover Brenda</TextLink>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
