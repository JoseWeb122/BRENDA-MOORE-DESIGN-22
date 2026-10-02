/**
 * ============================================================
 * SITE CONTENT — Brenda Moore-Frazier
 * ------------------------------------------------------------
 * All copy and structured content lives here so the site can be
 * updated without touching component code.
 *
 * NOTE ON PLACEHOLDERS: song titles, release details, products,
 * press quotes and social links are intentionally left as
 * placeholders. No titles, products, quotes, awards, clients or
 * performance history have been invented.
 * ============================================================
 */

import { images } from "./images";

export const artist = {
  name: "Brenda Moore-Frazier",
  first: "Brenda",
  last: "Moore-Frazier",
  monogram: "BMF",
  roles: ["Singer", "Songwriter", "Recording Artist", "Live Performer"],
  eyebrow: "Singer • Songwriter • Recording Artist",
  headlineTop: "BRENDA",
  headlineBottom: "MOORE-FRAZIER",
  tagline: "A soulful voice. Timeless stories. Music that stays with you.",
  heroBody:
    "Brenda Moore-Frazier is a singer, songwriter and recording artist with a warm, soulful sound shaped by vintage records and honest storytelling. On stage and in the studio, she performs the same way — close to the song, and close to the room.",
};

export const nav = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Music", href: "#music" },
  { label: "Videos", href: "#videos" },
  { label: "Live", href: "#live" },
  { label: "Shop", href: "#shop" },
  { label: "Press", href: "#press" },
  { label: "Contact", href: "#contact" },
] as const;

/* ------------------------------------------------------------
   MUSIC
   ------------------------------------------------------------ */

export type Track = {
  id: string;
  /** Placeholder title — replace with the real title when confirmed. */
  title: string;
  /** Release context, e.g. "Featured Recording". */
  note: string;
  meta: string;
  /** Length in seconds. */
  duration: number;
  /** Drop a real audio URL in here to stream actual audio. */
  src?: string;
};

export const tracks: Track[] = [
  {
    id: "t1",
    title: "Featured Recording",
    note: "New Release",
    meta: "Original Recording",
    duration: 224,
  },
  {
    id: "t2",
    title: "Track Title",
    note: "Album Track",
    meta: "Original Recording",
    duration: 253,
  },
  {
    id: "t3",
    title: "Track Title",
    note: "Album Track",
    meta: "Original Recording",
    duration: 198,
  },
  {
    id: "t4",
    title: "Track Title",
    note: "Album Track",
    meta: "Original Recording",
    duration: 271,
  },
  {
    id: "t5",
    title: "Track Title",
    note: "Album Track",
    meta: "Original Recording",
    duration: 236,
  },
];

export const featuredRelease = {
  label: "The Featured Release",
  title: "New Release",
  subtitle: "A collection of original recordings",
  description:
    "Recorded with a small band and a lot of patience, this release gathers Brenda's original songs in one place — voice, piano, guitar and rhythm section, captured live in the room. Every track is built around the lyric first.",
  facts: [
    { label: "Format", value: "Vinyl · CD · Digital" },
    { label: "Style", value: "Soul / Singer-Songwriter" },
    { label: "Status", value: "Details to be confirmed" },
  ],
  note: "Album artwork, track titles and release date are placeholders and will be replaced with Brenda's confirmed release information.",
};

export const musicNote =
  "Track titles and durations shown here are placeholders. Final titles, running order and release dates will be confirmed with Brenda before this section goes live.";

/* ------------------------------------------------------------
   VIDEOS  (labels only — no invented titles)
   ------------------------------------------------------------ */

export type Video = {
  id: string;
  label: string;
  caption: string;
  image: string;
  runtime: string;
};

export const videos: Video[] = [
  {
    id: "v1",
    label: "Live Performance",
    caption:
      "A full-length live set captured on stage — the room, the band and the audience in one take.",
    image: images.performance,
    runtime: "Feature",
  },
  {
    id: "v2",
    label: "Music Video",
    caption:
      "The official visual companion to a featured recording, shot on location.",
    image: images.galleryBw,
    runtime: "Short Film",
  },
  {
    id: "v3",
    label: "Studio Session",
    caption:
      "Behind the glass: vocals, piano and rhythm section tracked live in the studio.",
    image: images.studio,
    runtime: "Session",
  },
  {
    id: "v4",
    label: "Special Performance",
    caption:
      "A one-off performance prepared for a special occasion or invited audience.",
    image: images.story,
    runtime: "Feature",
  },
];

/* ------------------------------------------------------------
   LIVE / EXPERIENCES
   ------------------------------------------------------------ */

export const eventTypes = [
  {
    id: "e1",
    title: "Live Performance",
    description:
      "Full-length vocal sets for concerts, showcases, festivals and theatre stages — solo or with a band.",
    image: images.performance,
    span: "lg:col-span-7",
  },
  {
    id: "e2",
    title: "Vocal Performance",
    description:
      "Featured vocal appearances for ceremonies, galas, conferences and formal programmes.",
    image: images.artist,
    span: "lg:col-span-5",
  },
  {
    id: "e3",
    title: "Special Events",
    description:
      "Anniversaries, milestone birthdays and celebrations that deserve a real moment.",
    image: images.gallerySongwriting,
    span: "lg:col-span-5",
  },
  {
    id: "e4",
    title: "Private Events",
    description:
      "Intimate dinners, receptions and private gatherings, performed up close and unamplified where the room allows.",
    image: images.story,
    span: "lg:col-span-7",
  },
  {
    id: "e5",
    title: "Community & Cultural Events",
    description:
      "Civic celebrations, cultural programmes and community gatherings that bring people together.",
    image: images.studio,
    span: "lg:col-span-12",
  },
];

/* ------------------------------------------------------------
   SHOP  (placeholder products — no real products invented)
   ------------------------------------------------------------ */

export type Product = {
  id: string;
  title: string;
  category: string;
  description: string;
  details: string[];
  price: string;
  image?: string;
  /** Fallback art direction for products with no photography yet. */
  art?: "vinyl" | "digital" | "merch";
};

export const products: Product[] = [
  {
    id: "p1",
    title: "New Release — Vinyl",
    category: "Music / Recordings",
    description:
      "The featured release pressed to vinyl, presented in a printed sleeve with full credits.",
    details: [
      "180g vinyl pressing with printed inner sleeve",
      "Full lyric sheet and credits insert",
      "Artwork and tracklist to be confirmed",
    ],
    price: "Price TBA",
    image: images.productVinyl,
  },
  {
    id: "p2",
    title: "New Release — CD",
    category: "CDs / Recordings",
    description:
      "The standard physical CD edition, packaged in a printed digipak with artwork and credits.",
    details: [
      "Printed digipak CD edition",
      "Full lyric sheet and credits",
      "Artwork and tracklist to be confirmed",
    ],
    price: "Price TBA",
    image: images.productCd,
  },
  {
    id: "p3",
    title: "Digital Release",
    category: "Digital Music",
    description:
      "The complete release as high-quality digital downloads and on all major streaming platforms.",
    details: [
      "High-resolution WAV downloads",
      "Streaming on all major platforms",
      "Release date to be confirmed",
    ],
    price: "Price TBA",
    art: "digital",
  },
  {
    id: "p4",
    title: "Artist Merchandise",
    category: "Artist Merch",
    description:
      "A small, considered merchandise range designed alongside the release artwork.",
    details: [
      "Designs to be confirmed with Brenda",
      "Produced in limited runs",
      "Available at live performances",
    ],
    price: "Price TBA",
    art: "merch",
  },
];

/* ------------------------------------------------------------
   ABOUT
   ------------------------------------------------------------ */

export const bio = {
  intro: [
    "Brenda Moore-Frazier writes songs about the things people actually live through — love, leaving, holding on, and the quiet moments in between. She sings them the way she writes them: plainly, warmly, and without hurry.",
    "Her sound is rooted in vintage soul and gospel-shaped phrasing, with a songwriter's ear for a good line. The band stays out of the way of the lyric, and the lyric stays out of the way of the voice.",
  ],
  chapters: [
    {
      title: "The Singer",
      body: "A warm, expressive alto with a natural soulful grain. Brenda's phrasing is unhurried — she lets a line land before she moves on, the way the singers she grew up on did.",
    },
    {
      title: "The Songwriter",
      body: "Songs start at the piano or with a notebook and a single line that will not leave her alone. Lyrics come first; the arrangement follows whatever the words need.",
    },
    {
      title: "The Performer",
      body: "Live, Brenda reads the room. A set can move from a full-band soul shuffle to a single voice and piano without ever feeling like a show — it feels like a conversation.",
    },
    {
      title: "The Journey",
      body: "Years of writing, recording and performing have shaped a catalogue built to last rather than to chase a moment. New material is recorded carefully, with the same small team, in the same room.",
    },
  ],
};

export const gallery = [
  { id: "g1", image: images.artist, caption: "Portrait", ratio: "aspect-[3/4]" },
  { id: "g2", image: images.performance, caption: "Live", ratio: "aspect-[4/3]" },
  { id: "g3", image: images.studio, caption: "Studio", ratio: "aspect-[4/3]" },
  { id: "g4", image: images.galleryBw, caption: "Editorial", ratio: "aspect-[3/4]" },
  { id: "g5", image: images.gallerySongwriting, caption: "Songwriting", ratio: "aspect-[4/3]" },
  { id: "g6", image: images.story, caption: "Detail", ratio: "aspect-[4/3]" },
];

/* ------------------------------------------------------------
   PRESS  (neutral placeholders — no fabricated quotes)
   ------------------------------------------------------------ */

export type PressItem = {
  id: string;
  kind: string;
  quote: string;
  source: string;
  context: string;
};

export const press: PressItem[] = [
  {
    id: "pr1",
    kind: "Performance Review",
    quote:
      "This space is reserved for a published review of a Brenda Moore-Frazier performance. Verified press quotes will appear here with full attribution and written permission.",
    source: "Publication / Outlet",
    context: "Performance Review",
  },
  {
    id: "pr2",
    kind: "Audience Feedback",
    quote:
      "This space is reserved for audience feedback collected after a live performance. Comments will only be published once the contributor has agreed to be named.",
    source: "Audience Member",
    context: "Audience Feedback",
  },
  {
    id: "pr3",
    kind: "Event Testimonial",
    quote:
      "This space is reserved for a testimonial from an event host or venue. Nothing will be published here until it has been confirmed in writing.",
    source: "Event Host / Venue",
    context: "Event Testimonial",
  },
];

/* ------------------------------------------------------------
   SOCIAL  (no live links configured yet)
   ------------------------------------------------------------ */

export type SocialLink = {
  id: string;
  platform: string;
  href: string | null;
};

export const socials: SocialLink[] = [
  { id: "s1", platform: "Facebook", href: null },
  { id: "s2", platform: "Instagram", href: null },
  { id: "s3", platform: "YouTube", href: null },
  { id: "s4", platform: "TikTok", href: null },
  { id: "s5", platform: "Spotify", href: null },
];

export const socialGallery = [
  { id: "sg1", image: images.hero, ratio: "aspect-[4/5]" },
  { id: "sg2", image: images.performance, ratio: "aspect-square" },
  { id: "sg3", image: images.galleryBw, ratio: "aspect-[4/5]" },
  { id: "sg4", image: images.story, ratio: "aspect-square" },
  { id: "sg5", image: images.artist, ratio: "aspect-[4/5]" },
  { id: "sg6", image: images.album, ratio: "aspect-square" },
];

/* ------------------------------------------------------------
   CONTACT
   ------------------------------------------------------------ */

export const bookingInfo = [
  {
    icon: "mail" as const,
    label: "Booking Enquiries",
    value: "Enquiries via the form",
    note: "Every message is read personally.",
  },
  {
    icon: "calendar" as const,
    label: "Advance Notice",
    value: "As early as possible",
    note: "Dates are confirmed on a case-by-case basis.",
  },
  {
    icon: "map" as const,
    label: "Performance Settings",
    value: "Stages, studios & private rooms",
    note: "Solo vocal, piano and vocal, or full band.",
  },
];

export const eventTypeOptions = [
  "Live performance",
  "Private event",
  "Community or cultural event",
  "Special celebration",
  "Recording / studio session",
  "Other",
];
