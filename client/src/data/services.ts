import options from "@shared/options.json";
import { photo } from "./images";
import type { Service } from "./types";

/**
 * The eight Kanyanga safari services, in display order. Names and descriptions are the existing copy.
 * Changing or adding a slug? Update `services` in shared/options.json too — the server accepts only those.
 */
export const services: Service[] = [
  {
    slug: "big-five-walks",
    name: "Custom-Made & Big Five Walks",
    description:
      "Custom safari experiences designed around your preferences with guided walks to encounter Africa's Big Five up close.",
    homePlacement: "pair",
    media: photo.lionMale,
  },
  {
    slug: "game-drives",
    name: "Game Drives Safaris in Kenya & East Africa",
    description: "Classic game drives across Kenya's premier national parks and reserves, extending to Tanzania and Uganda.",
    homePlacement: "feature",
    media: photo.gameDrive,
  },
  {
    slug: "bird-watching",
    name: "Bird Watching & Nature Tracking",
    description:
      "Specialized tours for bird enthusiasts and nature lovers, with expert guides tracking Kenya's diverse wildlife.",
    homePlacement: "story",
    media: photo.flamingoFlight,
  },
  {
    slug: "cultural-visits",
    name: "Cultural & Community Visits",
    description:
      "Authentic cultural immersion with local communities including Maasai, Samburu, and other indigenous groups.",
    homePlacement: "pair",
    media: photo.maasaiFire,
  },
  {
    slug: "photography",
    name: "Photography Safaris",
    description: "Professional photography tours with expert guides to capture Kenya's stunning landscapes and wildlife.",
    homePlacement: "visual",
    media: photo.kilimanjaroElephants,
  },
  {
    slug: "beach",
    name: "Beach Holidays & Bush-Beach Combos",
    description:
      "Coastal adventures and combined safari-beach experiences along Kenya's pristine Indian Ocean coastline.",
    homePlacement: "story",
    media: photo.dianiPalms,
  },
  {
    slug: "honeymoon",
    name: "Honeymoon & Romantic Getaways",
    description:
      "Intimate safari experiences and romantic retreats designed for couples seeking unforgettable moments.",
    homePlacement: "story",
    media: photo.acaciaSun,
  },
  {
    slug: "family",
    name: "Family-Friendly Safaris",
    description:
      "Safe, educational, and exciting safari adventures specially designed for families with children of all ages.",
    homePlacement: "story",
    media: photo.giraffesThree,
  },
];

export const servicesAt = (placement: Service["homePlacement"]) => services.filter((s) => s.homePlacement === placement);

export const serviceName = (slug: string) => services.find((s) => s.slug === slug)?.name ?? slug;

// Development guard: the server rejects form submissions with slugs it doesn't know.
if (import.meta.env.DEV) {
  const unknown = services.filter((s) => !options.services.includes(s.slug)).map((s) => s.slug);
  if (unknown.length) console.warn(`Add these service slugs to shared/options.json or the forms will reject them: ${unknown.join(", ")}`);
}
