import { useCallback, useState } from "react";
import { musicNote, tracks } from "@/lib/data";
import { useAudioEngine } from "@/lib/useAudioEngine";
import { MusicPlayer, TrackCard } from "./MusicPlayer";
import { SectionHeading, SectionLabel, SectionShell } from "./ui/Section";
import { TextLink } from "./ui/Button";
import { Reveal } from "./ui/Reveal";
import { Monogram } from "./ui/Monogram";

export function MusicSection() {
  const [index, setIndex] = useState(0);
  const track = tracks[index];

  const goTo = useCallback((next: number) => {
    setIndex((next + tracks.length) % tracks.length);
  }, []);

  const engine = useAudioEngine({
    track,
    onEnded: useCallback(() => goTo(index + 1), [goTo, index]),
  });

  const handleTrackActivate = (target: number) => {
    if (target === index) {
      engine.toggle();
      return;
    }
    engine.requestAutoPlay();
    setIndex(target);
  };

  return (
    <SectionShell id="music" className="bg-espresso">
      {/* soft top separator */}
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-espresso-800/60 to-transparent" />

      <div className="relative">
        {/* ---------------- Header ---------------- */}
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <SectionLabel>The Music</SectionLabel>
            <SectionHeading className="mt-6">
              Listen.
              <br />
              Feel. <span className="u-italic text-gold">Remember.</span>
            </SectionHeading>
          </div>
          <Reveal variant="up" delay={200} className="max-w-[38ch]">
            <p className="font-sans text-[0.95rem] font-light leading-[1.9] text-ivory/55">
              Brenda's recordings are built the way her live sets are — voice first,
              band second, and nothing in the way of the song. Press play on the
              featured release, or choose a track below.
            </p>
          </Reveal>
        </div>

        {/* ---------------- Featured player ---------------- */}
        <div className="mt-14 md:mt-20">
          <MusicPlayer
            track={track}
            engine={engine}
            onNext={() => goTo(index + 1)}
            onPrev={() => goTo(index - 1)}
          />
        </div>

        {/* ---------------- Track list ---------------- */}
        <div className="mt-16 grid gap-12 md:mt-24 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.72fr)] lg:gap-20">
          <div>
            <Reveal variant="fade" className="mb-6 flex items-center justify-between gap-4">
              <h3 className="u-label text-ivory/45">More Recordings</h3>
              <span className="h-px flex-1 bg-ivory/10" />
              <span className="font-sans text-[10px] uppercase tracking-[0.28em] text-ivory/30">
                {tracks.length} Tracks
              </span>
            </Reveal>

            <ul className="border-t border-ivory/10">
              {tracks.map((item, itemIndex) => (
                <TrackCard
                  key={item.id}
                  track={item}
                  index={itemIndex}
                  isActive={itemIndex === index}
                  isPlaying={engine.isPlaying}
                  onPlay={() => handleTrackActivate(itemIndex)}
                />
              ))}
            </ul>
          </div>

          {/* ---------------- Aside ---------------- */}
          <Reveal variant="up" delay={140} className="flex flex-col gap-10">
            <div className="border border-gold/20 bg-espresso-800/40 p-7 sm:p-9">
              <Monogram size={62} />
              <h4 className="u-display mt-6 text-[1.7rem] leading-tight text-ivory">
                Recorded live, in the room
              </h4>
              <p className="mt-4 font-sans text-[0.9rem] font-light leading-[1.9] text-ivory/55">
                Each release is tracked with a small group of musicians playing
                together, so the record keeps the small imperfections that make a
                performance feel human.
              </p>
              <p className="mt-5 font-sans text-[10.5px] leading-relaxed tracking-[0.06em] text-ivory/35">
                {musicNote}
              </p>
            </div>

            <div className="flex flex-col gap-5">
              <TextLink href="#shop">Explore All Music</TextLink>
              <p className="max-w-[34ch] font-sans text-[0.85rem] font-light leading-[1.85] text-ivory/45">
                Physical and digital editions are listed in the shop. Availability
                will be confirmed alongside the release.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </SectionShell>
  );
}
