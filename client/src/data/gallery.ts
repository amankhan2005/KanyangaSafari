import { photo } from "./images";
import type { GalleryPlate } from "./types";

/**
 * The Gallery, in display order. The homepage shows the first six.
 * Captions describe the photograph only. To add an image, put it in /public/images/gallery/ and add
 * `{ slot: { kind: "image", src: "/images/gallery/<file>.jpg", alt: "…" }, caption: "…" }`.
 */
export const gallery: GalleryPlate[] = [
  { slot: photo.lionsPride, caption: "Lions, Maasai Mara" },
  { slot: photo.giraffePlains, caption: "Masai giraffe" },
  { slot: photo.flamingosNakuru, caption: "Flamingos, Lake Nakuru" },
  { slot: photo.leopardPath, caption: "Leopard, Maasai Mara" },
  { slot: photo.zebrasPair, caption: "Zebras" },
  { slot: photo.kilimanjaroElephants, caption: "Amboseli and Kilimanjaro" },
  { slot: photo.samburuSong, caption: "Samburu song" },
  { slot: photo.cheetah, caption: "Cheetah, Maasai Mara" },
  { slot: photo.lionPair, caption: "Lions" },
  { slot: photo.elephantAmboseli, caption: "Elephant, Amboseli" },
  { slot: photo.dianiSunrise, caption: "Sunrise, Diani" },
  { slot: photo.leopardGrass, caption: "Leopard" },
  { slot: photo.maasaiJump, caption: "Adumu, the Maasai jumping dance" },
  { slot: photo.dianiBoat, caption: "Diani Beach" },
  { slot: photo.lioness, caption: "Young lion" },
];
