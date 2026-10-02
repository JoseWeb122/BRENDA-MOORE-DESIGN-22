import { useCallback, useEffect, useRef, useState } from "react";
import type { Track } from "./data";

export type AudioEngine = {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  muted: boolean;
  /** True when a real audio file is attached to the current track. */
  usingRealAudio: boolean;
  toggle: () => void;
  play: () => void;
  pause: () => void;
  seek: (seconds: number) => void;
  setVolumeLevel: (value: number) => void;
  toggleMute: () => void;
  /** Flags the engine to start playback as soon as the next track is loaded. */
  requestAutoPlay: () => void;
};

/**
 * Front-end playback engine.
 *
 * If a track carries a real `src`, an HTMLAudioElement is created and drives
 * the timeline. When no source is present (the current prototype state) the
 * engine runs a simulated clock so every control — play, pause, seek,
 * previous, next, volume, mute, auto-advance — behaves exactly as it will
 * once real audio files are dropped into `src/lib/data.ts`.
 */
export function useAudioEngine({
  track,
  onEnded,
}: {
  track: Track;
  onEnded: () => void;
}): AudioEngine {
  const onEndedRef = useRef(onEnded);
  useEffect(() => {
    onEndedRef.current = onEnded;
  });

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const autoPlayRef = useRef(false);
  const latest = useRef<{ play: () => void; pause: () => void }>({
    play: () => {},
    pause: () => {},
  });
  const usingRealAudio = Boolean(track.src);
  const [isPlaying, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(0.75);
  const [muted, setMuted] = useState(false);
  const duration = track.duration;

  const requestAutoPlay = useCallback(() => {
    autoPlayRef.current = true;
  }, []);

  /* Attach a real audio element only when a source exists. */
  useEffect(() => {
    if (!track.src) {
      audioRef.current = null;
      return;
    }
    const audio = new Audio(track.src);
    audio.preload = "metadata";
    audioRef.current = audio;

    const onTimeUpdate = () => setCurrentTime(audio.currentTime);
    const onEndedEvent = () => {
      setPlaying(false);
      onEndedRef.current();
    };
    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("ended", onEndedEvent);

    return () => {
      audio.pause();
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("ended", onEndedEvent);
      audioRef.current = null;
    };
  }, [track.src]);

  /* Keep the element in sync with volume / mute. */
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = volume;
    audio.muted = muted;
  }, [volume, muted]);

  const play = useCallback(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = volume;
      audio.muted = muted;
      void audio
        .play()
        .then(() => setPlaying(true))
        .catch(() => setPlaying(false));
      return;
    }
    setPlaying(true);
  }, [volume, muted]);

  const pause = useCallback(() => {
    audioRef.current?.pause();
    setPlaying(false);
  }, []);

  latest.current = { play, pause };

  /* Reset whenever the selected track changes (optionally auto-playing). */
  useEffect(() => {
    setPlaying(false);
    setCurrentTime(0);
    if (autoPlayRef.current) {
      autoPlayRef.current = false;
      const id = window.setTimeout(() => latest.current.play(), 40);
      return () => window.clearTimeout(id);
    }
  }, [track.id]);

  const toggle = useCallback(() => {
    if (isPlaying) pause();
    else play();
  }, [isPlaying, play, pause]);

  /* Simulated clock for placeholder tracks. */
  useEffect(() => {
    if (!isPlaying || usingRealAudio) return;
    const step = 0.25;
    const id = window.setInterval(() => {
      setCurrentTime((time) => Math.min(duration, time + step));
    }, step * 1000);
    return () => window.clearInterval(id);
  }, [isPlaying, usingRealAudio, duration]);

  /* Auto-advance at the end of a track. */
  useEffect(() => {
    if (!isPlaying || usingRealAudio) return;
    if (currentTime >= duration) {
      setPlaying(false);
      onEndedRef.current();
    }
  }, [currentTime, duration, isPlaying, usingRealAudio]);

  const seek = useCallback(
    (seconds: number) => {
      const clamped = Math.max(0, Math.min(duration, seconds));
      setCurrentTime(clamped);
      if (audioRef.current) audioRef.current.currentTime = clamped;
    },
    [duration],
  );

  const setVolumeLevel = useCallback((value: number) => {
    setVolume(Math.max(0, Math.min(1, value)));
    setMuted(false);
  }, []);

  const toggleMute = useCallback(() => setMuted((value) => !value), []);

  return {
    isPlaying,
    currentTime,
    duration,
    volume,
    muted,
    usingRealAudio,
    toggle,
    play,
    pause,
    seek,
    setVolumeLevel,
    toggleMute,
    requestAutoPlay,
  };
}

export function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const total = Math.floor(seconds);
  const mins = Math.floor(total / 60);
  const secs = total % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}
