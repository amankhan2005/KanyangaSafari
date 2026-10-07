import type { TeamMember } from "./types";

/**
 * The Kanyanga team, in display order.
 * Add a portrait by putting it in /public/images/team/ and setting `media.src` (e.g. "/images/team/thaddeaus-mwangi.jpg").
 * Profile URLs were not supplied; empty links are hidden.
 */
const portrait = (name: string) => ({ kind: "image" as const, src: "", alt: name, note: `Portrait · ${name}` });

export const team: TeamMember[] = [
  {
    name: "Thaddeaus Mwangi",
    role: "Lead Safari Guide",
    description: "8 years across Kenya's parks. Specialist in wildlife photography safaris.",
    linkedin: "",
    instagram: "",
    media: portrait("Thaddeaus Mwangi"),
  },
  {
    name: "Teresia Ndoti",
    role: "Cultural Expert",
    description: "Connects travelers with Maasai communities and Kenyan traditions.",
    linkedin: "",
    instagram: "",
    media: portrait("Teresia Ndoti"),
  },
  {
    name: "David Gitau",
    role: "Conservation Guide",
    description: "Leads conservation safaris, deep knowledge of protection efforts.",
    linkedin: "",
    instagram: "",
    media: portrait("David Gitau"),
  },
];
