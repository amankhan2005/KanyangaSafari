/** Routes, main navigation and footer links. */

export const routes = {
  home: "/",
  about: "/about",
  services: "/services",
  gallery: "/gallery",
  contact: "/contact",
  proposal: "/travel-proposal",
  itinerary: "/itinerary",
  eta: "/eta",
} as const;

export const nav = [
  { label: "About", to: routes.about },
  { label: "Safari", to: routes.services },
  { label: "Gallery", to: routes.gallery },
  { label: "Contact", to: routes.contact },
] as const;

export const footerLinks = [
  { label: "About", to: routes.about },
  { label: "Safari", to: routes.services },
  { label: "Gallery", to: routes.gallery },
  { label: "Contact", to: routes.contact },
  { label: "Build Your Itinerary", to: routes.itinerary },
];

/** Legal page URLs were not supplied — set them here. Empty hrefs render as plain text. */
export const legalLinks = [
  { label: "Privacy", href: "" },
  { label: "Terms", href: "" },
  { label: "Sustainability", href: "" },
];
