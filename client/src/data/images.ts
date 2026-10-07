import type { MediaSlot } from "./types";

/**
 * Every photograph on the site and the hero film, served from client/public.
 *
 * DEMO PHOTOGRAPHY — the files in /public/images are free-licensed images from Wikimedia Commons
 * (Creative Commons / public domain; authors and licences in /public/images/CREDITS.md). They stand in
 * until Kanyanga's own photography arrives.
 *
 * To replace an image: put the file in /public/images/<folder>/ and change its path below.
 * No component needs to change.
 */
const image = (path: string, alt: string, focus?: string): MediaSlot => ({ kind: "image", src: `/images/${path}.jpg`, alt, focus });

export const photo = {
  lionsPride: image("wildlife/lions-pride", "A pride of lions resting in the shade, Maasai Mara", "50% 35%"),
  lionMale: image("wildlife/lion-male", "A male lion yawning in the grass", "55% 50%"),
  lionPair: image("wildlife/lion-pair", "A lion and lioness in the savannah"),
  lioness: image("wildlife/lioness", "Close portrait of a young lion", "50% 30%"),
  elephantAmboseli: image("wildlife/elephant-amboseli", "An African elephant walking across Amboseli"),
  kilimanjaroElephants: image("wildlife/kilimanjaro-elephants", "Elephants grazing beneath Mount Kilimanjaro, Amboseli", "50% 60%"),
  amboseliMisty: image("wildlife/amboseli-misty", "Elephants in the Amboseli swamps under a clouded Kilimanjaro"),
  elephantMara: image("wildlife/elephant-mara", "A bull elephant in the Maasai Mara grassland"),
  giraffesThree: image("wildlife/giraffes-three", "Three giraffes against a blue sky", "35% 50%"),
  giraffePlains: image("wildlife/giraffe-plains", "A Masai giraffe crossing golden plains", "65% 50%"),
  zebrasHerd: image("wildlife/zebras-herd", "Zebras in front of the migration herds, Maasai Mara"),
  zebrasPair: image("wildlife/zebras-pair", "Two zebras in tall golden grass"),
  cheetah: image("wildlife/cheetah", "A cheetah moving through long grass, Maasai Mara"),
  leopardGrass: image("wildlife/leopard-grass", "A leopard walking through the grass, Maasai Mara"),
  leopardPath: image("wildlife/leopard-path", "A leopard walking head-on along a track, Maasai Mara", "50% 40%"),
  flamingoFlight: image("wildlife/flamingo-flight", "A lesser flamingo taking flight, Lake Nakuru"),
  flamingosNakuru: image("wildlife/flamingos-nakuru", "Flamingos across the shallows of Lake Nakuru"),

  gameDrive: image("safari/game-drive", "Safari vehicles on a game drive in Amboseli", "62% 55%"),
  vehiclesMara: image("safari/vehicles-mara", "Safari vehicles watching wildlife in the Maasai Mara"),
  samburuLandscape: image("safari/samburu-landscape", "Morning over Samburu National Reserve"),
  tentedCamp: image("safari/tented-camp", "A thatched safari tent among the trees"),
  guestsMara: image("safari/guests-mara", "Travellers with their guide on the Maasai Mara plains", "50% 60%"),

  maasaiJump: image("culture/maasai-jump", "Maasai men in red shúkà during the adumu jumping dance"),
  maasaiFire: image("culture/maasai-fire", "Maasai men lighting a fire by hand", "50% 40%"),
  samburuSong: image("culture/samburu-song", "Samburu women singing in beaded collars"),
  samburuWomen: image("culture/samburu-women", "Samburu women in traditional beaded dress", "50% 30%"),

  dianiSunrise: image("coast/diani-sunrise", "Sunrise over the Indian Ocean at Diani Beach"),
  dianiBoat: image("coast/diani-boat", "A wooden boat on the white sand of Diani Beach"),
  dianiPalms: image("coast/diani-palms", "Palm trees framing the Indian Ocean, Diani Beach"),

  tsavoPanorama: image("landscapes/tsavo-panorama", "Panorama of Tsavo East, red earth and acacia"),
  acaciaSunset: image("landscapes/acacia-sunset", "An acacia silhouetted against a red sunset, Maasai Mara", "50% 55%"),
  acaciaSun: image("landscapes/acacia-sun", "The sun setting behind an acacia tree, Maasai Mara", "50% 55%"),
  acaciaPlains: image("landscapes/acacia-plains", "A lone acacia above the Maasai Mara plains", "50% 55%"),
};

/** Page imagery. Service and gallery photographs are set in services.ts and gallery.ts. */
export const media = {
  /** The homepage film — public/hero.mp4, loaded directly. Nothing is laid over it. */
  heroFilm: { kind: "video", src: "/hero.mp4", alt: "" } as MediaSlot,

  home: {
    intro: [photo.leopardPath, photo.giraffesThree],
    walksDetail: photo.elephantMara,
    cultureDetail: photo.samburuWomen,
    story: photo.vehiclesMara,
    storyDetail: photo.lioness,
    why: photo.tentedCamp,
    build: photo.samburuLandscape,
    eta: photo.amboseliMisty,
    proposal: photo.acaciaPlains,
  },

  aboutHero: photo.acaciaPlains,
  aboutStory: photo.vehiclesMara,
  vision: photo.zebrasHerd,
  mission: photo.guestsMara,
  aboutInterlude: photo.amboseliMisty,

  servicesHero: photo.tsavoPanorama,
  servicesInterlude: photo.cheetah,

  eta: photo.vehiclesMara,
  contact: photo.acaciaSunset,
  proposal: photo.tentedCamp,
  itinerary: photo.samburuLandscape,
  notFound: photo.zebrasHerd,
};
