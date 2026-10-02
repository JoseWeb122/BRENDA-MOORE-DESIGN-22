/**
 * Central image registry.
 * ---------------------------------------------------------------
 * Every photograph on this site is a *placeholder* standing in for
 * Brenda Moore-Frazier's real photography. To swap in the real
 * images, replace the files in `src/assets/images/` (keeping the
 * same filenames) or update the import paths below. Nothing else
 * in the codebase needs to change.
 */

import heroPortrait from "../assets/images/hero-portrait.jpg";
import artistPortrait from "../assets/images/artist-portrait.jpg";
import albumCover from "../assets/images/album-cover.jpg";
import performance from "../assets/images/performance.jpg";
import studioSession from "../assets/images/studio-session.jpg";
import story from "../assets/images/story.jpg";
import galleryBw from "../assets/images/gallery-bw.jpg";
import gallerySongwriting from "../assets/images/gallery-songwriting.jpg";
import productVinyl from "../assets/images/product-vinyl.jpg";
import productCd from "../assets/images/product-cd.jpg";

export const images = {
  hero: heroPortrait,
  artist: artistPortrait,
  album: albumCover,
  performance: performance,
  studio: studioSession,
  story: story,
  galleryBw: galleryBw,
  gallerySongwriting: gallerySongwriting,
  productVinyl: productVinyl,
  productCd: productCd,
} as const;

export type ImageKey = keyof typeof images;
