import { useEffect } from "react";

/**
 * Cinematic motion, kept subtle: slow reveals for text and imagery,
 * and a gentle parallax drift on media. Off entirely under reduced motion.
 * Watches the DOM for new content, so it keeps working across client-side navigation.
 */
export function ScrollEffects() {
  useEffect(() => {
    document.documentElement.classList.add("js");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const canObserve = "IntersectionObserver" in window;

    const io = canObserve
      ? new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                (entry.target as HTMLElement).dataset.shown = "";
                io?.unobserve(entry.target);
              }
            });
          },
          { rootMargin: "0px 0px -6% 0px", threshold: 0.06 },
        )
      : null;

    const arm = () => {
      document.querySelectorAll<HTMLElement>("[data-reveal]:not([data-shown]):not([data-armed])").forEach((el) => {
        if (reduce || !io) {
          el.dataset.shown = "";
        } else {
          el.dataset.armed = "";
          io.observe(el);
        }
      });
    };

    let raf = 0;
    const tick = () => {
      raf = 0;
      const vh = window.innerHeight;
      document.querySelectorAll<HTMLElement>("[data-parallax]").forEach((el) => {
        const box = el.parentElement?.getBoundingClientRect();
        if (!box || box.bottom < 0 || box.top > vh) return;
        const offset = (box.top + box.height / 2 - vh / 2) * -0.05;
        el.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`;
      });
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const mo = new MutationObserver(() => {
      arm();
      onScroll();
    });
    mo.observe(document.body, { childList: true, subtree: true });

    arm();
    if (!reduce) {
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll);
      onScroll();
    }

    return () => {
      mo.disconnect();
      io?.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return null;
}
