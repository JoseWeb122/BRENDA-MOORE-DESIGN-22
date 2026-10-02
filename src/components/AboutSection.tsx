import { bio, gallery } from "@/lib/data";
import { SectionHeading, SectionLabel, SectionShell } from "./ui/Section";
import { Reveal } from "./ui/Reveal";
import { Monogram } from "./ui/Monogram";
import { IconArrowRight } from "./ui/Icons";

export function AboutSection() {
  return (
    <SectionShell id="about" className="bg-espresso-800">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_40%_at_85%_10%,rgba(198,161,91,0.1),transparent_65%)]"
      />

      <div className="relative">
        {/* ---------------- Header ---------------- */}
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] lg:gap-20">
          <div>
            <SectionLabel>About Brenda</SectionLabel>
            <SectionHeading className="mt-6" size="lg">
              Songs Built
              <br />
              to <span className="u-italic text-gold">Last.</span>
            </SectionHeading>
          </div>

          <Reveal variant="up" delay={140} className="flex flex-col gap-6">
            {bio.intro.map((paragraph, index) => (
              <p
                key={index}
                className="font-sans text-[0.98rem] font-light leading-[1.95] text-ivory/60"
              >
                {paragraph}
              </p>
            ))}
          </Reveal>
        </div>

        {/* ---------------- Chapters ---------------- */}
        <div className="mt-16 grid gap-px overflow-hidden border border-ivory/10 bg-ivory/10 sm:grid-cols-2 md:mt-24 lg:grid-cols-4">
          {bio.chapters.map((chapter, index) => (
            <Reveal
              variant="up"
              delay={index * 90}
              key={chapter.title}
              className="group flex flex-col gap-4 bg-espresso-800 p-7 transition-colors duration-600 hover:bg-espresso sm:p-9"
            >
              <div className="flex items-center justify-between gap-4">
                <span className="font-sans text-[10px] tabular-nums tracking-[0.3em] text-gold/70">
                  0{index + 1}
                </span>
                <span className="h-px w-8 bg-ivory/15 transition-all duration-600 group-hover:w-12 group-hover:bg-gold/60" />
              </div>
              <h3 className="u-display text-[1.75rem] leading-tight text-ivory">
                {chapter.title}
              </h3>
              <p className="font-sans text-[0.88rem] font-light leading-[1.9] text-ivory/55">
                {chapter.body}
              </p>
            </Reveal>
          ))}
        </div>

        {/* ---------------- Press-kit gallery ---------------- */}
        <div className="mt-16 md:mt-24">
          <Reveal variant="fade" className="mb-8 flex flex-wrap items-center justify-between gap-4">
            <h3 className="u-label text-ivory/45">Press Kit Gallery</h3>
            <span className="h-px flex-1 bg-ivory/10" />
            <span className="font-sans text-[10px] uppercase tracking-[0.28em] text-ivory/30">
              Placeholder Imagery
            </span>
          </Reveal>

          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
            {gallery.map((item, index) => (
              <Reveal
                as="li"
                variant="up"
                delay={index * 80}
                key={item.id}
                className={index === 0 ? "sm:row-span-2" : undefined}
              >
                <figure className="group relative h-full overflow-hidden border border-ivory/10">
                  <div className={`relative w-full ${index === 0 ? "h-full min-h-[18rem]" : item.ratio}`}>
                    <img
                      src={item.image}
                      alt={`${item.caption} — placeholder image for Brenda Moore-Frazier`}
                      loading="lazy"
                      decoding="async"
                      className="img-zoom absolute inset-0 h-full w-full object-cover"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-espresso/80 via-transparent to-transparent opacity-70 transition-opacity duration-600 group-hover:opacity-95" />
                    <figcaption className="absolute bottom-4 left-4 flex items-center gap-2.5">
                      <span className="h-px w-6 bg-gold" />
                      <span className="font-sans text-[9.5px] uppercase tracking-[0.26em] text-ivory/75">
                        {item.caption}
                      </span>
                    </figcaption>
                  </div>
                </figure>
              </Reveal>
            ))}
          </ul>
        </div>

        {/* ---------------- Signature strip ---------------- */}
        <Reveal
          variant="fade"
          delay={120}
          className="mt-16 flex flex-col items-center gap-6 border-t border-ivory/10 pt-12 text-center md:mt-24"
        >
          <Monogram size={72} />
          <p className="max-w-[46ch] font-sans text-[0.9rem] font-light leading-[1.9] text-ivory/50">
            Singer, songwriter, recording artist and live performer — Brenda
            Moore-Frazier writes and performs music that stays with you.
          </p>
          <a
            href="#music"
            className="group inline-flex items-center gap-3 font-sans text-[10px] uppercase tracking-[0.26em] text-gold transition-colors duration-300 hover:text-gold-200"
          >
            Hear the recordings
            <span className="transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1.5">
              <IconArrowRight size={16} />
            </span>
          </a>
        </Reveal>
      </div>
    </SectionShell>
  );
}
