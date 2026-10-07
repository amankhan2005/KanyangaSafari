import { useEffect, useRef, useState } from "react";
import { Media } from "@/components/Media";
import { PageTitle, ProposalCTA } from "@/components/Sections";
import { container, label, type } from "@/components/ui";
import { gallery as plates } from "@/data/gallery";
import { brand, meta } from "@/data/site";
import type { GalleryPlate as Plate } from "@/data/types";
import { usePageMeta } from "@/hooks/usePageMeta";

/** The exhibition rhythm, repeated for as many images as exist: full-bleed, pair, centred, pair, full-bleed, pair. */
const pattern = [
  { group: 0, cls: "h-[min(92svh,1040px)] w-full", bleed: true },
  { group: 1, cls: "aspect-[4/5] w-full md:col-span-7" },
  { group: 1, cls: "aspect-[3/4] w-full md:col-span-4 md:col-start-9 md:mt-[30%]" },
  { group: 2, cls: "aspect-[16/10] w-full md:col-span-8 md:col-start-3" },
  { group: 3, cls: "aspect-[3/4] w-full md:col-span-5" },
  { group: 3, cls: "aspect-[4/3] w-full md:col-span-6 md:col-start-7 md:self-end" },
  { group: 4, cls: "h-[min(86svh,960px)] w-full", bleed: true },
  { group: 5, cls: "aspect-[4/3] w-full md:col-span-6 md:mt-[18%]" },
  { group: 5, cls: "aspect-[4/5] w-full md:col-span-5 md:col-start-8" },
];

// Group plates into rows following the exhibition rhythm.
type Row = { key: number; bleed: boolean; items: { plate: Plate; index: number; cls: string }[] };
const rows: Row[] = [];
plates.forEach((plate, index) => {
  const step = pattern[index % pattern.length];
  const key = Math.floor(index / pattern.length) * 10 + step.group;
  let row = rows.find((r) => r.key === key);
  if (!row) {
    row = { key, bleed: !!step.bleed, items: [] };
    rows.push(row);
  }
  row.items.push({ plate, index, cls: step.cls });
});

export default function GalleryPage() {
  usePageMeta(meta.gallery.title, meta.gallery.description);
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="page-in">
      <PageTitle eyebrow={brand.name} title="Gallery" intro={brand.description} />

      <div className="flex flex-col gap-[clamp(3rem,7vw,6rem)] pb-[clamp(5rem,10vw,9rem)]">
        {rows.map((row) =>
          row.bleed ? (
            <PlateButton key={row.key} {...row.items[0]} bleed onOpen={setOpen} />
          ) : (
            <div key={row.key} className={`${container} grid items-start gap-x-6 gap-y-10 md:grid-cols-12`}>
              {row.items.map((it) => (
                <PlateButton key={it.index} {...it} onOpen={setOpen} />
              ))}
            </div>
          ),
        )}
      </div>

      {open !== null && (
        <Lightbox plates={plates} index={open} onChange={setOpen} onClose={() => setOpen(null)} />
      )}

      <ProposalCTA />
    </div>
  );
}

function PlateButton({
  plate,
  index,
  cls,
  bleed = false,
  onOpen,
}: {
  plate: Plate;
  index: number;
  cls: string;
  bleed?: boolean;
  onOpen: (i: number) => void;
}) {
  // Size classes split between the figure (grid placement) and the frame (proportions).
  const place = cls
    .split(" ")
    .filter((c) => /col-|mt-|self-/.test(c))
    .join(" ");
  const frame = cls
    .split(" ")
    .filter((c) => !/col-|mt-|self-/.test(c))
    .join(" ");
  return (
    <figure className={place}>
      <button
        type="button"
        onClick={() => onOpen(index)}
        className="group block w-full cursor-zoom-in overflow-hidden text-left"
        aria-label={`Open ${plate.slot.alt || `image ${index + 1}`}`}
      >
        <div className="transition-transform duration-[1800ms] ease-luxe group-hover:scale-[1.02]">
          <Media slot={plate.slot} className={frame} />
        </div>
      </button>
      {plate.caption && (
        <figcaption className={`mt-3 flex gap-4 ${bleed ? container : ""} font-sans text-[13px]`}>
          <span className="font-semibold">{String(index + 1).padStart(2, "0")}</span>
          <span>{plate.caption}</span>
        </figcaption>
      )}
    </figure>
  );
}

function Lightbox({ plates, index, onChange, onClose }: { plates: Plate[]; index: number; onChange: (i: number) => void; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const go = (d: number) => onChange((index + d + plates.length) % plates.length);

  useEffect(() => {
    closeRef.current?.focus();
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  });

  const plate = plates[index];
  return (
    <div role="dialog" aria-modal="true" aria-label="Gallery viewer" className="fixed inset-0 z-[70] flex flex-col bg-black text-white">
      <div className={`${container} flex h-[72px] items-center justify-between ${label}`}>
        <span>
          {String(index + 1).padStart(2, "0")} / {String(plates.length).padStart(2, "0")}
        </span>
        <div className="flex gap-8">
          <button type="button" onClick={() => go(-1)}>Previous</button>
          <button type="button" onClick={() => go(1)}>Next</button>
          <button type="button" ref={closeRef} onClick={onClose}>Close</button>
        </div>
      </div>
      <div className="flex flex-1 items-center justify-center px-5 pb-10">
        <figure className="flex h-full w-full max-w-[1400px] flex-col gap-4">
          <Media slot={plate.slot} className="w-full flex-1 bg-black" reveal={false} parallax={false} fit="contain" />
          {plate.caption && <figcaption className={type.h4}>{plate.caption}</figcaption>}
        </figure>
      </div>
    </div>
  );
}
