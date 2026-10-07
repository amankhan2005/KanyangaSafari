/**
 * Page copy, from the agreed Kanyanga content reference. All site content is static and lives in this folder:
 * services.ts, team.ts, gallery.ts, images.ts, navigation.ts.
 * Grammar fixes only: "a Kenyan-based" and "custom-made" in the About introduction.
 */
import options from "@shared/options.json";

export const brand = {
  name: "Kanyanga Safari",
  tagline: "Stepping into Adventure.",
  description:
    "Premium, ethical safaris across Kenya. We craft unforgettable journeys that respect wildlife, empower communities, and leave you in awe.",
};

export const contact = {
  email: "info@kanyangasafari.com",
  phone: "+254 700 757 129",
  phoneHref: "tel:+254700757129",
  location: "Nairobi, Kenya",
  enquire: "Enquire Now",
};

export const hero = {
  /** Visually hidden H1 for search engines — the hero carries no visible text. */
  srTitle: "Kenya Safari Packages & Big Five Wildlife Tours",
  srDescription:
    "Experience unforgettable safari adventures with expert guides through Kenya's most spectacular national parks and conservancies.",
};

export const about = {
  title: "About Us",
  intro:
    "Kanyanga Safari is a Kenyan-based safari and tour operator dedicated to delivering exceptional African adventures across East Africa.",
  specialty:
    "We specialize in custom-made safari experiences that combine wildlife exploration, cultural immersion, and relaxation.",
  goal: "Our goal is to create journeys that inspire, leaving our guests with unforgettable memories while promoting responsible tourism and wildlife conservation.",
  visionLabel: "Our Vision",
  vision:
    "To be recognized as the most trusted and innovative safari operator in East Africa, offering world-class experiences that celebrate the beauty and heritage of the African continent.",
  missionLabel: "Our Mission",
  mission:
    "To deliver authentic, safe, and unforgettable safari adventures that blend comfort, adventure, and sustainability, while supporting conservation and community development.",
  valuesTitle: "Our Core Values",
  valuesIntro: "The principles that shape who we are and how we operate.",
  values: [
    { name: "Adventure", description: "Designing unique and thrilling itineraries." },
    { name: "Excellence", description: "Upholding the highest standards in service delivery." },
    { name: "Sustainability", description: "Promoting eco-friendly and conservation-driven tourism." },
    { name: "Community", description: "Empowering and engaging with local communities." },
    { name: "Integrity", description: "Operating with transparency and professionalism." },
  ],
  teamTitle: "Meet Our Team",
  teamIntro: "Passionate professionals guiding you through Africa’s wonders.",
};

export const stats = [
  { value: "500+", label: "Happy travelers" },
  { value: "15", label: "Expert guides" },
  { value: "4.9/5", label: "Avg. rating" },
];

export const safariPage = {
  label: "Safari",
  title: "Our Safari Services",
  intro: "Discover Kenya's wilderness through our expertly crafted safari experiences",
  offerLabel: "What We Offer",
  offer: "Tailored adventures for individuals, families, groups, and corporate clients across Kenya and East Africa",
  serviceAction: "Book This Service",
};

export const whyChoose = {
  title: "Why Choose Kanyanga Safari?",
  items: [
    {
      title: "Expert Local Guides",
      description: "Our certified guides have decades of experience and deep knowledge of Kenya's wildlife and culture.",
    },
    {
      title: "Luxury Accommodations",
      description:
        "Stay in premium lodges and tented camps that offer comfort while maintaining authentic safari atmosphere.",
    },
    {
      title: "24/7 Support",
      description: "Round-the-clock assistance ensures your safari experience is seamless from start to finish.",
    },
  ],
};

export const itineraryBuilder = {
  label: "Build Your Safari",
  title: "Build Your Itinerary",
  description: "Customize your journey — destinations, activities, and pricing tailored to your group.",
  cta: "Launch Builder",
  regions: options.regions,
  budgets: options.budgets,
};

export const eta = {
  title: "Travel ETA Application",
  description: "Get your Electronic Travel Authorization in minutes — no hassle, no queues.",
  cta: "Open Full Application",
};

export const proposal = { title: "Make a Proposal", cta: "Make a Proposal" };

export const footer = {
  exploreLabel: "Explore",
  contactLabel: "Contact",
  copyright: "© 2026 Kanyanga Safari. All rights reserved.",
};

/** Unique title and description per page. */
export const meta = {
  home: {
    title: "Kanyanga Safari - Authentic Kenyan Safari Adventures",
    description:
      "Experience the wild beauty of Kenya with expertly curated safari packages. Explore Maasai Mara, Amboseli, Tsavo and more. Custom itineraries, Big Five encounters, and unforgettable wildlife adventures.",
  },
  about: { title: "About Us", description: about.intro },
  services: { title: "Our Safari Services", description: safariPage.offer },
  gallery: { title: "Gallery", description: brand.description },
  contact: { title: "Contact Us", description: `${contact.email} · ${contact.phone} · ${contact.location}` },
  proposal: { title: "Make a Proposal", description: brand.description },
  itinerary: { title: "Build Your Itinerary", description: itineraryBuilder.description },
  eta: { title: "Travel ETA Application", description: eta.description },
};
