import type { CSSProperties } from "react";
import { cn } from "@/utils/cn";
import { featuredRelease, type Track } from "@/lib/data";
import { images } from "@/lib/images";
import { formatTime, type AudioEngine } from "@/lib/useAudioEngine";
import { Reveal } from "./ui/Reveal";
import {
  IconNext,
  IconPause,
  IconPlay,
  IconPrev,
  IconVolume,
  IconVolumeMute,
} from "./ui/Icons";

/* ============================================================
   FEATURED PLAYER
   ============================================================ */

export function MusicPlayer({
  track,
  engine,
  onNext,
  onPrev,
}: {
  track: Track;
  engine: AudioEngine;
  onNext: () => void;
  onPrev: () => void;
}) {
  const progressPercent = engine.duration
    ? (engine.currentTime / engine.duration) * 100
    : 0;

  return (
    <Reveal
      variant="up"
      className="group relative overflow-hidden border border-gold/20 bg-gradient-to-br from-espresso-800/90 via-espresso/95 to-espresso shadow-[0_50px_120px_-60px_rgba(0,0,0,0.9)]"
    >
      {/* warm corner glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-gold/10 blur-3xl"
      />

      <div className="relative grid gap-0 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
        {/* ---------- Artwork ---------- */}
        <div className="relative overflow-hidden">
          <div className="relative aspect-square w-full lg:h-full lg:aspect-auto lg:min-h-[26rem]">
            <img
              src={images.album}
              alt={`Placeholder artwork for ${featuredRelease.title}`}
              loading="lazy"
              decoding="async"
              className={cn(
                "h-full w-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)]",
                engine.isPlaying && "scale-[1.04]",
              )}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-espresso via-espresso/10 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-espresso/80" />

            {/* spinning vinyl */}
            <div
              aria-hidden="true"
              className={cn(
                "absolute bottom-6 right-6 hidden h-28 w-28 rounded-full border border-gold/25 bg-[radial-gradient(circle_at_center,#1b1512_18%,#0e0b09_19%,#0e0b09_60%,#1b1512_61%)] shadow-2xl lg:block",
                engine.isPlaying && "spin-slow",
              )}
            >
              <div className="absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/70" />
              <div className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-espresso" />
            </div>

            <span className="absolute left-5 top-5 border border-gold/40 bg-espresso/70 px-3 py-1.5 font-sans text-[9px] uppercase tracking-[0.28em] text-gold backdrop-blur-sm">
              {engine.isPlaying ? "Now Playing" : featuredRelease.label}
            </span>
          </div>
        </div>

        {/* ---------- Info + controls ---------- */}
        <div className="relative flex flex-col justify-between gap-8 p-6 sm:p-9 lg:p-11">
          <div>
            <p className="u-label text-gold">{featuredRelease.label}</p>
            <h3 className="u-display mt-4 text-[clamp(2rem,3.4vw,3.1rem)] leading-[1.02] text-ivory">
              {track.title === "Featured Recording" ? featuredRelease.title : track.title}
            </h3>
            <p className="u-italic mt-2 text-[1.15rem] text-ivory/55">{featuredRelease.subtitle}</p>

            <p className="mt-6 max-w-[46ch] font-sans text-[0.94rem] font-light leading-[1.85] text-ivory/60">
              {featuredRelease.description}
            </p>

            <dl className="mt-7 flex flex-wrap gap-x-9 gap-y-4">
              {featuredRelease.facts.map((fact) => (
                <div key={fact.label}>
                  <dt className="u-label text-ivory/35">{fact.label}</dt>
                  <dd className="mt-2 font-sans text-[0.85rem] tracking-[0.04em] text-ivory/85">
                    {fact.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* ---------- Transport ---------- */}
          <div>
            {/* progress */}
            <div className="flex items-center gap-4">
              <span className="w-10 shrink-0 font-sans text-[11px] tabular-nums tracking-[0.08em] text-ivory/55">
                {formatTime(engine.currentTime)}
              </span>
              <div className="relative flex-1">
                <input
                  type="range"
                  min={0}
                  max={engine.duration}
                  step={1}
                  value={Math.floor(engine.currentTime)}
                  onChange={(event) => engine.seek(Number(event.target.value))}
                  aria-label="Seek within track"
                  aria-valuetext={`${formatTime(engine.currentTime)} of ${formatTime(engine.duration)}`}
                  className="range-gold"
                  style={{ "--range-progress": `${progressPercent}%` } as CSSProperties}
                />
              </div>
              <span className="w-10 shrink-0 text-right font-sans text-[11px] tabular-nums tracking-[0.08em] text-ivory/55">
                {formatTime(engine.duration)}
              </span>
            </div>

            {/* buttons */}
            <div className="mt-5 flex flex-wrap items-center gap-5 sm:gap-7">
              <button
                type="button"
                onClick={onPrev}
                aria-label="Previous track"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-ivory/20 text-ivory/75 transition-all duration-400 hover:border-gold hover:text-gold"
              >
                <IconPrev size={18} />
              </button>

              <button
                type="button"
                onClick={engine.toggle}
                aria-label={engine.isPlaying ? `Pause ${track.title}` : `Play ${track.title}`}
                aria-pressed={engine.isPlaying}
                className="pulse-ring relative flex h-16 w-16 items-center justify-center rounded-full bg-gold text-espresso shadow-[0_16px_44px_-14px_rgba(198,161,91,0.8)] transition-all duration-500 hover:scale-105 hover:bg-gold-200 active:scale-95"
              >
                {engine.isPlaying ? <IconPause size={24} /> : <IconPlay size={24} />}
              </button>

              <button
                type="button"
                onClick={onNext}
                aria-label="Next track"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-ivory/20 text-ivory/75 transition-all duration-400 hover:border-gold hover:text-gold"
              >
                <IconNext size={18} />
              </button>

              {/* volume */}
              <div className="ml-auto flex items-center gap-3">
                <button
                  type="button"
                  onClick={engine.toggleMute}
                  aria-label={engine.muted ? "Unmute" : "Mute"}
                  aria-pressed={engine.muted}
                  className="flex h-10 w-10 items-center justify-center text-ivory/70 transition-colors duration-300 hover:text-gold"
                >
                  {engine.muted || engine.volume === 0 ? (
                    <IconVolumeMute size={18} />
                  ) : (
                    <IconVolume size={18} />
                  )}
                </button>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={engine.muted ? 0 : Math.round(engine.volume * 100)}
                  onChange={(event) => engine.setVolumeLevel(Number(event.target.value) / 100)}
                  aria-label="Volume"
                  className="range-gold range-thin w-20 sm:w-28"
                  style={
                    {
                      "--range-progress": `${engine.muted ? 0 : engine.volume * 100}%`,
                    } as CSSProperties
                  }
                />
              </div>
            </div>

            <p className="mt-6 font-sans text-[10.5px] leading-relaxed tracking-[0.06em] text-ivory/35">
              {engine.usingRealAudio
                ? `Now playing — ${track.title}. ${track.note}.`
                : `Preview mode — ${track.title}. Connect an audio file to hear the full recording.`}
            </p>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

/* ============================================================
   TRACK ROW
   ============================================================ */

export function TrackCard({
  track,
  index,
  isActive,
  isPlaying,
  onPlay,
}: {
  track: Track;
  index: number;
  isActive: boolean;
  isPlaying: boolean;
  onPlay: () => void;
}) {
  return (
    <Reveal
      as="li"
      variant="up"
      delay={index * 70}
      className="group relative border-b border-ivory/10"
    >
      <div
        className={cn(
          "flex items-center gap-4 py-5 transition-all duration-500 sm:gap-6 sm:py-6",
          isActive && "pl-3",
        )}
      >
        {/* index / equaliser */}
        <div className="flex w-8 shrink-0 items-center justify-center">
          {isActive && isPlaying ? (
            <span className="flex h-4 items-end gap-[2px]" aria-hidden="true">
              {[0, 1, 2, 3].map((bar) => (
                <span
                  key={bar}
                  className="eq-bar w-[2px] rounded-full bg-gold"
                  style={{
                    height: "100%",
                    animationDelay: `${bar * 140}ms`,
                    animationDuration: `${820 + bar * 90}ms`,
                  }}
                />
              ))}
            </span>
          ) : (
            <span
              className={cn(
                "font-sans text-[11px] tabular-nums tracking-[0.16em] transition-colors duration-400",
                isActive ? "text-gold" : "text-ivory/30 group-hover:text-gold/80",
              )}
            >
              {String(index + 1).padStart(2, "0")}
            </span>
          )}
        </div>

        {/* play button */}
        <button
          type="button"
          onClick={onPlay}
          aria-label={`${isActive && isPlaying ? "Pause" : "Play"} ${track.title}`}
          className={cn(
            "flex h-12 w-12 shrink-0 items-center justify-center rounded-full border transition-all duration-500 group-hover:scale-105",
            isActive
              ? "border-gold bg-gold text-espresso"
              : "border-ivory/25 text-ivory/80 group-hover:border-gold group-hover:bg-gold group-hover:text-espresso",
          )}
        >
          {isActive && isPlaying ? <IconPause size={17} /> : <IconPlay size={17} />}
        </button>

        {/* text */}
        <div className="min-w-0 flex-1">
          <h4
            className={cn(
              "u-display truncate text-[1.35rem] leading-tight transition-colors duration-400 sm:text-[1.6rem]",
              isActive ? "text-gold" : "text-ivory group-hover:text-gold-200",
            )}
          >
            {track.title}
          </h4>
          <p className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 font-sans text-[10px] uppercase tracking-[0.22em] text-ivory/40">
            <span>{track.note}</span>
            <span className="h-1 w-1 rounded-full bg-gold/60" />
            <span>{track.meta}</span>
          </p>
        </div>

        {/* duration */}
        <span className="shrink-0 font-sans text-[11px] tabular-nums tracking-[0.1em] text-ivory/45">
          {formatTime(track.duration)}
        </span>
      </div>

      {/* active indicator line */}
      <span
        aria-hidden="true"
        className={cn(
          "absolute bottom-0 left-0 h-px bg-gold transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
          isActive ? "w-full" : "w-0",
        )}
      />
    </Reveal>
  );
}
