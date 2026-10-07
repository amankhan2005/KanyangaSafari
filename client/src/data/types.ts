/** Shapes of the static site content in this folder. */

export type MediaSlot = {
  kind: "image" | "video";
  /** A path in /public (e.g. "/images/wildlife/lion-male.jpg"). Empty renders a labelled black placeholder. */
  src: string;
  poster?: string;
  alt: string;
  /** Art direction shown on an empty slot. */
  note?: string;
  /** CSS object-position for the crop, e.g. "50% 30%". */
  focus?: string;
};

/**
 * Where a service appears on the homepage: `feature` (full-bleed opener), `pair` (two editorial
 * image/text sections), `visual` (full-screen photograph with overlaid title), `story` (the
 * "more experiences" mosaic), or null (Services page only).
 */
export type HomePlacement = "feature" | "pair" | "visual" | "story" | null;

export type Service = {
  /** Also the value sent with proposal and itinerary forms; must match `services` in shared/options.json. */
  slug: string;
  name: string;
  description: string;
  homePlacement: HomePlacement;
  media: MediaSlot;
};

export type TeamMember = {
  name: string;
  role: string;
  description: string;
  linkedin: string;
  instagram: string;
  /** Portrait. Empty `src` shows a monogram — never a stand-in face for a real person. */
  media: MediaSlot;
};

export type GalleryPlate = { slot: MediaSlot; caption: string };
