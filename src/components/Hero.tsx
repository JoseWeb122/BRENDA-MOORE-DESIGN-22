import { useEffect, useRef } from "react";
import { artist, featuredRelease } from "@/lib/data";
import { images } from "@/lib/images";
import { useReducedMotion, useSmoothScrollTo } from "@/lib/hooks";
import { ButtonLink } from "./ui/Button";
import { Reveal } from "./ui/Reveal";
import { IconPlay } from "./ui/Icons";

/** Decorative animated waveform. */
function SoundWave() {
  const bars = Array.from({ length: 40 });
  return (
    <div className="flex h-9 items-end gap-[3px]" aria-hidden="true">
      {bars.map((_, index) => {
        const height = 18 + Math.sin(index * 0.55) * 12 + Math.random() * 22;
        return (
          <span
            key={index}
            className="wave-bar w-[2px] rounded-full bg-gradient-to-t from-gold/35 to-gold"
            style={{
              height: `${Math.max(10, Math.min(100, height))}%`,
              animationDelay: `${(index % 12) * 90}ms`,
              animationDuration: `${1050 + (index % 5) * 130}ms`,
            }}
          />
        );
      })}
    </div>
  );
}

export function Hero() {
  const imageWrapRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const scrollTo = useSmoothScrollTo();

  /* Gentle parallax drift on the hero photograph. */
  useEffect(() => {
    if (reduced) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      if (imageWrapRef.current && y < window.innerHeight * 1.4) {
        imageWrapRef.current.style.transform = `translate3d(0, ${y * 0.18}px, 0) scale(1.06)`;
      }
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [reduced]);

  return (
    <section
      id="home"
      aria-label="Introduction"
      className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden bg-espresso pb-10 pt-32 sm:pb-14 md:justify-center md:pb-16"
    >
      {/* ---------------- Cinematic backdrop ---------------- */}
      <div className="absolute inset-0" aria-hidden="true">
        <div ref={imageWrapRef} className="absolute inset-0 will-change-transform">
          <img
            src={images.hero}
            alt=""
            className="h-full w-full scale-105 object-cover object-[70%_28%] opacity-[0.62] sm:opacity-[0.72] md:object-[74%_center] lg:opacity-[0.85]"
            fetchPriority="high"
            decoding="async"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-espresso via-espresso/88 to-espresso/10 md:to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-espresso via-espresso/25 to-espresso/75" />
        <div className="absolute inset-0 bg-[radial-gradient(85%_65%_at_20%_45%,rgba(22,17,14,0.92),transparent_70%)]" />
      </div>

      {/* ---------------- Content ---------------- */}
      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-14 xl:px-20">
        <div className="max-w-[46rem]">
          <Reveal variant="fade" className="mb-7 flex items-center gap-4 md:mb-9">
            <span className="h-px w-10 bg-gold md:w-16" />
            <span className="u-label text-gold">{artist.eyebrow}</span>
          </Reveal>

          <h1 className="u-display text-ivory">
            <Reveal variant="up" delay={90} as="span" className="block text-[clamp(3.4rem,12vw,9.5rem)]">
              {artist.headlineTop}
            </Reveal>
            <Reveal
              variant="up"
              delay={220}
              as="span"
              className="block text-[clamp(2.1rem,7.4vw,5.9rem)] text-gold/95"
            >
              {artist.headlineBottom}
            </Reveal>
          </h1>

          <Reveal variant="up" delay={340} className="mt-7 max-w-[34rem] md:mt-9">
            <p className="u-italic text-[clamp(1.35rem,3vw,2rem)] leading-[1.35] text-ivory/90">
              {artist.tagline}
            </p>
          </Reveal>

          <Reveal variant="up" delay={430} className="mt-6 max-w-[36rem]">
            <p className="font-sans text-[0.95rem] font-light leading-[1.85] text-ivory/65 md:text-[1.02rem]">
              {artist.heroBody}
            </p>
          </Reveal>

          {/* CTAs */}
          <Reveal variant="up" delay={520} className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <ButtonLink href="#music" size="lg" onClick={(e) => { e.preventDefault(); scrollTo("#music"); }}>
              <IconPlay size={14} />
              Listen to the Music
            </ButtonLink>
            <ButtonLink
              href="#contact"
              size="lg"
              variant="outline"
              onClick={(e) => { e.preventDefault(); scrollTo("#contact"); }}
            >
              Book a Performance
            </ButtonLink>
          </Reveal>

          {/* Waveform strip */}
          <Reveal variant="fade" delay={660} className="mt-11 flex items-center gap-5 md:mt-14">
            <SoundWave />
            <div className="flex flex-col gap-1">
              <span className="u-label text-ivory/45">Now Featured</span>
              <span className="font-sans text-[12px] tracking-[0.1em] text-ivory/80">
                {featuredRelease.title} — {featuredRelease.subtitle}
              </span>
            </div>
          </Reveal>
        </div>
      </div>

      {/* ---------------- Scroll indicator ---------------- */}
      <div className="pointer-events-none absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-3 md:flex">
        <span className="u-label text-ivory/40">Scroll to Explore</span>
        <span className="relative h-14 w-px overflow-hidden bg-ivory/15">
          <span className="scroll-hint-line absolute inset-x-0 top-0 h-1/2 bg-gold" />
        </span>
      </div>

      {/* Right-edge vertical meta */}
      <div className="pointer-events-none absolute bottom-8 right-6 z-10 hidden flex-col items-end gap-3 xl:flex">
        <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-ivory/30">
          Est. Vintage Soul
        </span>
        <span className="h-px w-16 bg-gold/40" />
      </div>
    </section>
  );
}

/** Small helper reused by other sections that want the same downward cue. */
export function ScrollCue({ label = "Explore" }: { label?: string }) {
  return (
    <span className="inline-flex items-center gap-3 font-sans text-[10px] uppercase tracking-[0.3em] text-ivory/40">
      <IconArrowDown size={14} className="text-gold" />
      {label}
    </span>
  );
}
