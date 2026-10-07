/** Shared class recipes for the editorial system. */
export const container = "mx-auto w-full max-w-site px-5 sm:px-8 lg:px-14";
export const label = "font-sans text-[11px] font-semibold uppercase tracking-[0.2em]";
export const section = "py-[clamp(5rem,10vw,9rem)]";

/**
 * Type scale. The serif (DM Serif Display) carries headings only; everything that is read
 * rather than seen — body, labels, forms, navigation — is set in Manrope.
 */
export const type = {
  /** One or two per page: the major editorial statement. */
  display: "font-display text-[clamp(2.6rem,6vw,5.5rem)] leading-[1.02] tracking-[-0.015em]",
  /** Section headings. */
  h2: "font-display text-[clamp(2.1rem,4vw,3.6rem)] leading-[1.06] tracking-[-0.01em]",
  /** Service titles and editorial sub-headings. */
  h3: "font-display text-[clamp(1.65rem,2.5vw,2.3rem)] leading-[1.12]",
  /** Small serif titles: list items, tiles. */
  h4: "font-display text-[clamp(1.35rem,1.8vw,1.65rem)] leading-[1.18]",
  lede: "font-sans text-[clamp(1.05rem,1.35vw,1.2rem)] leading-[1.7]",
  body: "font-sans text-[15px] leading-[1.75] sm:text-[16px]",
  small: "font-sans text-[14px] leading-[1.7]",
};

/** Solid buttons: black on light sections, white on dark ones. */
export const buttonClass = (tone: "light" | "dark") =>
  `inline-flex min-h-[52px] items-center justify-center gap-3 border px-8 py-4 font-sans text-[12px] font-semibold uppercase tracking-[0.18em] transition-colors duration-500 ease-luxe disabled:cursor-wait ${
    tone === "dark"
      ? "border-white bg-white text-black hover:bg-black hover:text-white"
      : "border-black bg-black text-white hover:bg-white hover:text-black"
  }`;

/** Outlined companion to `buttonClass`. */
export const ghostButtonClass = (tone: "light" | "dark") =>
  `inline-flex min-h-[52px] items-center justify-center gap-3 border px-8 py-4 font-sans text-[12px] font-semibold uppercase tracking-[0.18em] transition-colors duration-500 ease-luxe ${
    tone === "dark" ? "border-white text-white hover:bg-white hover:text-black" : "border-black text-black hover:bg-black hover:text-white"
  }`;
