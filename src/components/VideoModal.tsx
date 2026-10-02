import { useEffect, useRef } from "react";
import type { Video } from "@/lib/data";
import { useEscapeKey, useFocusTrap, useLockBodyScroll } from "@/lib/hooks";
import { IconClose } from "./ui/Icons";

/**
 * Video lightbox. Plays back a designed placeholder state so the
 * interaction is complete; a real embed URL can be dropped into the
 * `embedUrl` field on a video record to stream actual footage.
 */
export function VideoModal({ video, onClose }: { video: Video | null; onClose: () => void }) {
  const panelRef = useRef<HTMLDivElement>(null);

  useLockBodyScroll(Boolean(video));
  useEscapeKey(onClose, Boolean(video));
  useFocusTrap(panelRef, Boolean(video));

  useEffect(() => {
    if (!video) return;
    const previousOverflow = document.body.style.overflow;
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [video]);

  if (!video) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-10"
      role="dialog"
      aria-modal="true"
      aria-label={`${video.label} — video player`}
    >
      <button
        type="button"
        aria-label="Close video"
        onClick={onClose}
        className="modal-backdrop absolute inset-0 h-full w-full cursor-default border-0 bg-espresso/92 backdrop-blur-md"
        tabIndex={-1}
      />

      <div
        ref={panelRef}
        className="modal-panel relative w-full max-w-5xl border border-gold/25 bg-espresso-800 shadow-[0_60px_140px_-50px_rgba(0,0,0,0.95)]"
      >
        <div className="flex items-center justify-between gap-4 border-b border-ivory/10 px-5 py-4 sm:px-7">
          <p className="u-label text-gold">{video.label}</p>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close video"
            className="flex h-10 w-10 items-center justify-center border border-ivory/20 text-ivory/70 transition-colors duration-300 hover:border-gold hover:text-gold"
          >
            <IconClose size={18} />
          </button>
        </div>

        {/* Player stage */}
        <div className="relative aspect-video w-full overflow-hidden bg-espresso">
          <img
            src={video.image}
            alt=""
            className="h-full w-full object-cover opacity-45"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-espresso via-espresso/40 to-espresso/30" />

          <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 px-6 text-center">
            <span className="pulse-ring relative flex h-20 w-20 items-center justify-center rounded-full border border-gold/60 bg-espresso/60 text-gold backdrop-blur-sm">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M8 5.5l11 6.5-11 6.5v-13z" />
              </svg>
            </span>
            <div>
              <p className="u-label text-ivory/50">Video Player</p>
              <p className="u-display mt-3 text-[clamp(1.4rem,3vw,2.2rem)] text-ivory">
                {video.label}
              </p>
              <p className="mx-auto mt-3 max-w-[46ch] font-sans text-[0.85rem] font-light leading-[1.85] text-ivory/55">
                This is a placeholder player state. Connect a video URL to this record
                and the real footage will play here.
              </p>
            </div>
            <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-ivory/30">
              {video.runtime}
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-ivory/10 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-7">
          <p className="max-w-[60ch] font-sans text-[0.85rem] font-light leading-[1.8] text-ivory/55">
            {video.caption}
          </p>
          <button
            type="button"
            onClick={onClose}
            className="shrink-0 border border-gold/45 px-6 py-3 font-sans text-[10px] uppercase tracking-[0.26em] text-gold transition-all duration-400 hover:bg-gold hover:text-espresso"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
