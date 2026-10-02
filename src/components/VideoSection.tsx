import { useState } from "react";
import { cn } from "@/utils/cn";
import { videos, type Video } from "@/lib/data";
import { SectionHeading, SectionLabel, SectionShell } from "./ui/Section";
import { Reveal } from "./ui/Reveal";
import { VideoModal } from "./VideoModal";
import { IconPlay } from "./ui/Icons";

function PlayGlyph({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "relative flex h-16 w-16 items-center justify-center rounded-full border border-gold/60 bg-espresso/35 text-ivory backdrop-blur-sm transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110 group-hover:border-gold group-hover:bg-gold group-hover:text-espresso md:h-20 md:w-20",
        className,
      )}
    >
      <IconPlay size={22} />
    </span>
  );
}

export function VideoSection() {
  const [activeVideo, setActiveVideo] = useState<Video | null>(null);
  const featured = videos[0];
  const rest = videos.slice(1);

  return (
    <SectionShell id="videos" className="bg-espresso">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <SectionLabel>Watch &amp; Experience</SectionLabel>
          <SectionHeading className="mt-6">
            From the Studio
            <br />
            to the <span className="u-italic text-gold">Stage.</span>
          </SectionHeading>
        </div>
        <Reveal variant="up" delay={180} className="max-w-[36ch]">
          <p className="font-sans text-[0.95rem] font-light leading-[1.9] text-ivory/55">
            Performance footage, studio sessions and special appearances — all in one
            place. Select any card to open the player.
          </p>
        </Reveal>
      </div>

      {/* ---------------- Featured video ---------------- */}
      <Reveal variant="up" delay={120} className="mt-14 md:mt-20">
        <button
          type="button"
          onClick={() => setActiveVideo(featured)}
          aria-label={`Play ${featured.label} video`}
          className="group relative block w-full overflow-hidden text-left"
        >
          <div className="relative aspect-[16/10] w-full md:aspect-[16/8]">
            <img
              src={featured.image}
              alt={`${featured.label} — placeholder video still`}
              loading="lazy"
              decoding="async"
              className="img-zoom h-full w-full object-cover"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-espresso via-espresso/25 to-espresso/35" />
            <div className="pointer-events-none absolute inset-0 bg-espresso/20 transition-colors duration-700 group-hover:bg-espresso/0" />

            {/* corner meta */}
            <div className="absolute left-5 top-5 flex items-center gap-3 sm:left-7 sm:top-7">
              <span className="border border-gold/40 bg-espresso/70 px-3 py-1.5 font-sans text-[9px] uppercase tracking-[0.28em] text-gold backdrop-blur-sm">
                Featured
              </span>
              <span className="font-sans text-[9px] uppercase tracking-[0.28em] text-ivory/50">
                {featured.runtime}
              </span>
            </div>

            {/* centre play */}
            <div className="absolute inset-0 flex items-center justify-center">
              <PlayGlyph />
            </div>

            {/* bottom caption */}
            <div className="absolute inset-x-0 bottom-0 flex flex-col gap-3 p-5 sm:p-8">
              <span className="h-px w-14 bg-gold" />
              <h3 className="u-display text-[clamp(1.8rem,4vw,3.2rem)] leading-none text-ivory">
                {featured.label}
              </h3>
              <p className="max-w-[52ch] font-sans text-[0.88rem] font-light leading-[1.8] text-ivory/60">
                {featured.caption}
              </p>
            </div>
          </div>
        </button>
      </Reveal>

      {/* ---------------- Thumbnails ---------------- */}
      <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {rest.map((video, index) => (
          <Reveal as="li" variant="up" delay={index * 110} key={video.id}>
            <button
              type="button"
              onClick={() => setActiveVideo(video)}
              aria-label={`Play ${video.label} video`}
              className="group block w-full overflow-hidden border border-ivory/10 text-left transition-colors duration-500 hover:border-gold/40"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden">
                <img
                  src={video.image}
                  alt={`${video.label} — placeholder video still`}
                  loading="lazy"
                  decoding="async"
                  className="img-zoom h-full w-full object-cover"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-espresso/90 via-espresso/15 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <PlayGlyph className="h-13 w-13 md:h-14 md:w-14" />
                </div>
                <span className="absolute right-4 top-4 font-sans text-[9px] uppercase tracking-[0.24em] text-ivory/45">
                  {video.runtime}
                </span>
              </div>
              <div className="flex flex-col gap-2 p-5">
                <h4 className="u-display text-[1.4rem] leading-tight text-ivory transition-colors duration-400 group-hover:text-gold">
                  {video.label}
                </h4>
                <p className="font-sans text-[0.82rem] font-light leading-[1.75] text-ivory/50">
                  {video.caption}
                </p>
              </div>
            </button>
          </Reveal>
        ))}
      </ul>

      <VideoModal video={activeVideo} onClose={() => setActiveVideo(null)} />
    </SectionShell>
  );
}
