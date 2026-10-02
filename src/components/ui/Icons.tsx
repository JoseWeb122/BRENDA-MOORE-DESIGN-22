import type { JSX, SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function Base({ size = 20, children, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  );
}

export const IconMenu = (p: IconProps) => (
  <Base {...p}>
    <path d="M3 6h18M3 12h18M3 18h18" />
  </Base>
);

export const IconClose = (p: IconProps) => (
  <Base {...p}>
    <path d="M6 6l12 12M18 6L6 18" />
  </Base>
);

export const IconPlay = (p: IconProps) => (
  <Base {...p}>
    <path d="M8 5.5l11 6.5-11 6.5v-13z" fill="currentColor" stroke="none" />
  </Base>
);

export const IconPause = (p: IconProps) => (
  <Base {...p}>
    <rect x="7" y="5" width="3.4" height="14" rx="1" fill="currentColor" stroke="none" />
    <rect x="13.6" y="5" width="3.4" height="14" rx="1" fill="currentColor" stroke="none" />
  </Base>
);

export const IconPrev = (p: IconProps) => (
  <Base {...p}>
    <path d="M18 5v14L8 12l10-7z" fill="currentColor" stroke="none" />
    <path d="M5 5v14" />
  </Base>
);

export const IconNext = (p: IconProps) => (
  <Base {...p}>
    <path d="M6 5v14l10-7L6 5z" fill="currentColor" stroke="none" />
    <path d="M19 5v14" />
  </Base>
);

export const IconVolume = (p: IconProps) => (
  <Base {...p}>
    <path d="M4 9.5h3L11.5 6v12L7 14.5H4z" fill="currentColor" stroke="none" />
    <path d="M15.5 9.2a4 4 0 010 5.6" />
    <path d="M18.2 6.8a7.5 7.5 0 010 10.4" />
  </Base>
);

export const IconVolumeMute = (p: IconProps) => (
  <Base {...p}>
    <path d="M4 9.5h3L11.5 6v12L7 14.5H4z" fill="currentColor" stroke="none" />
    <path d="M16 9.5l5 5M21 9.5l-5 5" />
  </Base>
);

export const IconArrowRight = (p: IconProps) => (
  <Base {...p}>
    <path d="M4 12h16M14 6l6 6-6 6" />
  </Base>
);

export const IconArrowDown = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 4v16M6 14l6 6 6-6" />
  </Base>
);

export const IconChevronLeft = (p: IconProps) => (
  <Base {...p}>
    <path d="M14.5 5.5L8 12l6.5 6.5" />
  </Base>
);

export const IconChevronRight = (p: IconProps) => (
  <Base {...p}>
    <path d="M9.5 5.5L16 12l-6.5 6.5" />
  </Base>
);

export const IconChevronDown = (p: IconProps) => (
  <Base {...p}>
    <path d="M5.5 9.5L12 16l6.5-6.5" />
  </Base>
);

export const IconQuote = (p: IconProps) => (
  <Base {...p} strokeWidth={0}>
    <path
      d="M9.4 5.5c-3.2 1.5-5 4-5 7.4 0 3.1 1.8 5.1 4.3 5.1 2 0 3.5-1.4 3.5-3.4 0-1.9-1.3-3.2-3.1-3.2-.3 0-.6 0-.8.1.4-1.6 1.6-3 3.3-4L9.4 5.5zm9 0c-3.2 1.5-5 4-5 7.4 0 3.1 1.8 5.1 4.3 5.1 2 0 3.5-1.4 3.5-3.4 0-1.9-1.3-3.2-3.1-3.2-.3 0-.6 0-.8.1.4-1.6 1.6-3 3.3-4L18.4 5.5z"
      fill="currentColor"
    />
  </Base>
);

export const IconMail = (p: IconProps) => (
  <Base {...p}>
    <rect x="3" y="5.5" width="18" height="13" rx="2.5" />
    <path d="M3.8 7l8.2 6 8.2-6" />
  </Base>
);

export const IconPhone = (p: IconProps) => (
  <Base {...p}>
    <path d="M6.5 3.5h3l1.5 4-2 1.5a11 11 0 005.5 5.5l1.5-2 4 1.5v3a2 2 0 01-2.2 2A16.5 16.5 0 014.5 5.7 2 2 0 016.5 3.5z" />
  </Base>
);

export const IconMapPin = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 21s7-5.6 7-11a7 7 0 10-14 0c0 5.4 7 11 7 11z" />
    <circle cx="12" cy="10" r="2.6" />
  </Base>
);

export const IconCalendar = (p: IconProps) => (
  <Base {...p}>
    <rect x="3.5" y="5.5" width="17" height="15" rx="2.5" />
    <path d="M3.5 10h17M8.5 3.5v4M15.5 3.5v4" />
  </Base>
);

export const IconCheck = (p: IconProps) => (
  <Base {...p}>
    <path d="M4.5 12.5l5 5 10-11" />
  </Base>
);

export const IconBag = (p: IconProps) => (
  <Base {...p}>
    <path d="M5.5 8h13l-1 12.5h-11L5.5 8z" />
    <path d="M9 8V6.5a3 3 0 016 0V8" />
  </Base>
);

export const IconPlus = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 5v14M5 12h14" />
  </Base>
);

export const IconMinus = (p: IconProps) => (
  <Base {...p}>
    <path d="M5 12h14" />
  </Base>
);

export const IconTrash = (p: IconProps) => (
  <Base {...p}>
    <path d="M4.5 7h15M9.5 7V4.5h5V7M6.5 7l.8 13h9.4l.8-13" />
  </Base>
);

export const IconMusic = (p: IconProps) => (
  <Base {...p}>
    <path d="M9 18V6.5l10-2v11.5" />
    <circle cx="6.5" cy="18" r="2.5" />
    <circle cx="16.5" cy="16" r="2.5" />
  </Base>
);

export const IconSparkle = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 3.5l1.7 5.1 5.1 1.7-5.1 1.7L12 17.1l-1.7-5.1-5.1-1.7 5.1-1.7L12 3.5z" />
  </Base>
);

/* ---------------- Brand / social glyphs ---------------- */

export const IconFacebook = (p: IconProps) => (
  <Base {...p}>
    <path d="M13.4 21v-7.2h2.5l.4-2.9h-2.9V9c0-.8.2-1.4 1.4-1.4h1.6V5c-.3 0-1.3-.1-2.3-.1-2.3 0-3.8 1.4-3.8 3.9v2.1H8v2.9h2.5V21h2.9z" />
  </Base>
);

export const IconInstagram = (p: IconProps) => (
  <Base {...p}>
    <rect x="3.4" y="3.4" width="17.2" height="17.2" rx="5" />
    <circle cx="12" cy="12" r="3.9" />
    <circle cx="17.1" cy="6.9" r="1.05" fill="currentColor" stroke="none" />
  </Base>
);

export const IconYouTube = (p: IconProps) => (
  <Base {...p}>
    <path d="M21.4 8.2c-.2-1-1-1.8-2-2C17.6 5.8 12 5.8 12 5.8s-5.6 0-7.4.4c-1 .2-1.8 1-2 2C2.2 10 2.2 12 2.2 12s0 2 .4 3.8c.2 1 1 1.8 2 2 1.8.4 7.4.4 7.4.4s5.6 0 7.4-.4c1-.2 1.8-1 2-2 .4-1.8.4-3.8.4-3.8s0-2-.4-3.8z" />
    <path d="M10.2 15.1V8.9L15.6 12l-5.4 3.1z" fill="currentColor" stroke="none" />
  </Base>
);

export const IconTikTok = (p: IconProps) => (
  <Base {...p}>
    <path d="M16.4 3h-2.9v11.2a2.4 2.4 0 11-2.4-2.4c.2 0 .5 0 .7.1V8.9a5.3 5.3 0 00-.7-.1 5.4 5.4 0 105.4 5.4V8.6c1 .8 2.3 1.3 3.7 1.3V7a3.9 3.9 0 01-3.8-4z" />
  </Base>
);

export const IconSpotify = (p: IconProps) => (
  <Base {...p}>
    <circle cx="12" cy="12" r="9.2" />
    <path d="M7.5 9.3c3-.7 6.1-.4 8.9.9" />
    <path d="M8.2 12.2c2.4-.5 4.8-.3 7 .8" />
    <path d="M8.8 15c1.9-.4 3.7-.3 5.4.6" />
  </Base>
);

export const socialIcons: Record<string, (p: IconProps) => JSX.Element> = {
  Facebook: IconFacebook,
  Instagram: IconInstagram,
  YouTube: IconYouTube,
  TikTok: IconTikTok,
  Spotify: IconSpotify,
};
