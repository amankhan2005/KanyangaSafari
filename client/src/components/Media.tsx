import { useEffect, useRef, useState } from "react";
import type { MediaSlot } from "@/data/types";

type Props = {
  slot: MediaSlot;
  className?: string;
  /** Slow reveal as the frame scrolls into view. */
  reveal?: boolean;
  /** Gentle vertical drift while scrolling. */
  parallax?: boolean;
  /** White hairline around an empty slot (needed on black sections). */
  outline?: boolean;
  /** Where the placeholder note sits, so it never collides with overlaid titles. */
  notePosition?: "top" | "bottom";
  priority?: boolean;
  /** `contain` shows the whole frame (lightbox); `cover` crops to fill (everywhere else). */
  fit?: "cover" | "contain";
};

/** A photograph or film. Renders the media when `slot.src` is set; otherwise a black placeholder carrying the shot's art direction. */
export function Media({
  slot,
  className = "",
  reveal = true,
  parallax = true,
  outline = false,
  notePosition = "bottom",
  priority = false,
  fit = "cover",
}: Props) {
  const src = slot.src;
  const empty = !src;
  const position = slot.focus ? { objectPosition: slot.focus } : undefined;
  // Default to `relative`, but let callers position the frame themselves (e.g. `absolute inset-0` for a
  // section background) — with both classes present Tailwind's `relative` wins and the frame collapses to 0px.
  const positioned = /(^|\s)(absolute|fixed|sticky)(\s|$)/.test(className);
  return (
    <div className={`${positioned ? "" : "relative "}overflow-hidden bg-black ${className}`} data-reveal={reveal ? "media" : undefined}>
      <div className={`absolute inset-x-0 ${parallax ? "-inset-y-[8%]" : "inset-y-0"}`} data-parallax={parallax ? "" : undefined}>
        {!empty && slot.kind === "video" && <Film src={src} poster={slot.poster ?? ""} label={slot.alt} priority={priority} />}
        {!empty && slot.kind === "image" && (
          <img
            src={src}
            alt={slot.alt}
            className={`h-full w-full ${fit === "contain" ? "object-contain" : "object-cover"}`}
            style={position}
            loading={priority ? "eager" : "lazy"}
            decoding="async"
          />
        )}
      </div>
      {empty && outline && <span aria-hidden className="pointer-events-none absolute inset-0 border border-white" />}
      {empty && slot.note && (
        <span
          aria-hidden
          className={`absolute left-4 right-4 font-sans text-[10px] font-medium uppercase leading-relaxed tracking-[0.26em] text-white ${
            notePosition === "top" ? "top-4" : "bottom-4"
          }`}
        >
          {slot.note}
        </span>
      )}
    </div>
  );
}

/** Muted, looping background film that fades in once its first frame is ready. */
function Film({ src, poster, label, priority }: { src: string; poster: string; label: string; priority: boolean }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    // Some mobile browsers ignore the autoplay attribute until `muted` is set as a property.
    video.muted = true;
    if (video.readyState >= 2) setReady(true);
    video.play().catch(() => undefined);
  }, [src]);

  return (
    <video
      ref={ref}
      className={`h-full w-full object-cover transition-opacity duration-[1600ms] ease-luxe ${ready ? "opacity-100" : "opacity-0"}`}
      autoPlay
      muted
      loop
      playsInline
      preload={priority ? "auto" : "metadata"}
      poster={poster || undefined}
      onLoadedData={() => setReady(true)}
      aria-label={label || undefined}
      aria-hidden={label ? undefined : true}
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}
