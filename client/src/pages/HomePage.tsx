import { Link } from "react-router-dom";
import { Media } from "@/components/Media";
import { LineLink } from "@/components/LineLink";
import { ProposalCTA, Stats, TitledTile } from "@/components/Sections";
import { buttonClass, container, label, section, type } from "@/components/ui";
import { media } from "@/data/images";
import { gallery } from "@/data/gallery";
import { routes } from "@/data/navigation";
import { servicesAt } from "@/data/services";
import { about, brand, eta, hero, itineraryBuilder, meta, safariPage, whyChoose } from "@/data/site";
import type { Service } from "@/data/types";
import options from "@shared/options.json";
import { usePageMeta } from "@/hooks/usePageMeta";

const explore = (s: Service) => `${routes.services}#${s.slug}`;

// All homepage content is static — nothing here waits on the server.
const featured = servicesAt("feature")[0];
const [walks, culture] = servicesAt("pair");
const visual = servicesAt("visual")[0];
const more = servicesAt("story").slice(0, 4);
const plates = gallery.slice(0, 6);

export default function HomePage() {
  usePageMeta(meta.home.title, meta.home.description, { absolute: true });

  return (
    <div className="page-in">
      {/* 01 — Full-screen film (/hero.mp4), no text over it. The section fills the screen; the film fills
          everything below the solid black navigation bar, so the bar never sits on the video. */}
      <section className="relative h-[100svh] min-h-[520px] w-full bg-black" aria-label="Kanyanga Safari film">
        <div className="absolute inset-x-0 bottom-0 top-[calc(72px+env(safe-area-inset-top,0px))]">
          <Media slot={media.heroFilm} className="h-full w-full" reveal={false} parallax={false} priority />
        </div>
        <span aria-hidden className="absolute bottom-0 left-1/2 h-14 w-px origin-top animate-[cue_2.8s_ease-in-out_infinite] bg-white" />
      </section>

      {/* 02 — Introduction and 03 — trust */}
      <section className={`${container} ${section}`}>
        <div className="mx-auto max-w-4xl text-center">
          <h1 className={label} data-reveal>
            {hero.srTitle}
          </h1>
          <h2 className={`mt-7 ${type.display}`} data-reveal>
            {brand.tagline}
          </h2>
          <p className={`mx-auto mt-8 max-w-2xl ${type.lede}`} data-reveal>
            {brand.description}
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-10 gap-y-5" data-reveal>
            <LineLink to={routes.services}>Explore Safaris</LineLink>
            <LineLink to={routes.itinerary}>{itineraryBuilder.title}</LineLink>
          </div>
        </div>
        <div className="mt-[clamp(4rem,8vw,6.5rem)] grid items-end gap-4 sm:grid-cols-12">
          <Media slot={media.home.intro[0]} className="hidden aspect-[3/4] sm:col-span-3 sm:block" />
          <div className="sm:col-span-6">
            <Stats />
            <p className={`mt-6 text-center ${type.small}`} data-reveal>
              {hero.srDescription}
            </p>
          </div>
          <Media slot={media.home.intro[1]} className="hidden aspect-[4/5] sm:col-span-3 sm:mb-24 sm:block" />
        </div>
      </section>

      {/* 04 — Featured experience, full-bleed */}
      {featured && (
        <section aria-labelledby="featured-title">
          <Media slot={featured.media} className="h-[min(88svh,960px)] min-h-[460px] w-full" />
          <div className={`${container} grid gap-6 pb-[clamp(5rem,10vw,9rem)] pt-[clamp(2.5rem,5vw,4rem)] lg:grid-cols-12 lg:gap-8`}>
            <p className={`${label} lg:col-span-3 lg:pt-3`} data-reveal>
              Featured Safari
            </p>
            <h2 id="featured-title" className={`${type.h2} lg:col-span-5`} data-reveal>
              {featured.name}
            </h2>
            <div className="lg:col-span-3 lg:col-start-10 lg:pt-3" data-reveal>
              <p className={type.body}>{featured.description}</p>
              <div className="mt-8">
                <LineLink to={explore(featured)}>Explore Safari</LineLink>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 05 — Second experience: large image left, text and a detail image right */}
      {walks && (
        <section className={`${container} pb-[clamp(5rem,10vw,9rem)]`} aria-labelledby="walks-title">
          <div className="grid items-end gap-10 lg:grid-cols-12 lg:gap-8">
            <div className="-mx-5 sm:mx-0 lg:col-span-7">
              <Media slot={walks.media} className="aspect-[4/5] w-full sm:aspect-[5/4]" />
            </div>
            <div className="lg:col-span-4 lg:col-start-9">
              <Media slot={media.home.walksDetail} className="mb-12 hidden aspect-[4/3] w-3/4 lg:block" />
              <h2 id="walks-title" className={type.h2} data-reveal>
                {walks.name}
              </h2>
              <p className={`mt-6 ${type.body}`} data-reveal>
                {walks.description}
              </p>
              <div className="mt-8" data-reveal>
                <LineLink to={explore(walks)}>Explore Safari</LineLink>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 06 — Culture and people, inverted */}
      {culture && (
        <section className="bg-black text-white" aria-labelledby="culture-title">
          <div className={`${container} grid items-center gap-10 ${section} lg:grid-cols-12 lg:gap-8`}>
            <div className="order-2 lg:order-1 lg:col-span-4">
              <p className={label} data-reveal>
                People &amp; Culture
              </p>
              <h2 id="culture-title" className={`mt-6 ${type.h2}`} data-reveal>
                {culture.name}
              </h2>
              <p className={`mt-6 max-w-md ${type.body}`} data-reveal>
                {culture.description}
              </p>
              <div className="mt-8" data-reveal>
                <LineLink to={explore(culture)}>Explore Safari</LineLink>
              </div>
            </div>
            <div className="relative order-1 -mx-5 mb-10 sm:mx-0 lg:order-2 lg:mb-0 lg:col-span-7 lg:col-start-6">
              <Media slot={culture.media} className="aspect-[4/5] w-full sm:aspect-[4/3]" />
              <div className="absolute -bottom-10 left-5 w-[42%] border-[6px] border-black sm:left-auto sm:right-6 lg:-bottom-16 lg:-left-16 lg:right-auto lg:w-[38%] lg:border-[10px]">
                <Media slot={media.home.cultureDetail} className="aspect-[4/5] w-full" parallax={false} />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 07 — Wildlife and photography: a full-screen photograph with its title over it */}
      {visual && (
        <section className="relative isolate overflow-hidden text-white" aria-labelledby="visual-title">
          <Media slot={visual.media} className="absolute inset-0 -z-10 h-full w-full" />
          <span aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-black/80 via-black/20 to-black/10" />
          <div className={`${container} flex min-h-[min(100svh,1000px)] flex-col justify-end pb-[clamp(3rem,7vw,6rem)] pt-40`}>
            <div className="max-w-2xl">
              <p className={label} data-reveal>
                Wildlife
              </p>
              <h2 id="visual-title" className={`mt-6 ${type.display}`} data-reveal>
                {visual.name}
              </h2>
              <p className={`mt-6 max-w-lg ${type.lede}`} data-reveal>
                {visual.description}
              </p>
              <div className="mt-8" data-reveal>
                <LineLink to={explore(visual)}>Explore Safari</LineLink>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 08 — The Kanyanga story */}
      <section className={`${container} ${section}`} aria-labelledby="story-title">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-8">
          <div className="relative pb-16 pr-[18%] sm:pb-24 lg:col-span-6">
            <Media slot={media.home.story} className="aspect-[4/5] w-full" />
            <div className="absolute bottom-0 right-0 w-[46%] border-[6px] border-white sm:border-[10px]">
              <Media slot={media.home.storyDetail} className="aspect-square w-full" parallax={false} />
            </div>
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <p className={label} data-reveal>
              Our Story
            </p>
            <h2 id="story-title" className={`mt-6 ${type.h2}`} data-reveal>
              About Kanyanga
            </h2>
            <p className={`mt-8 ${type.lede}`} data-reveal>
              {about.intro}
            </p>
            <p className={`mt-5 ${type.body}`} data-reveal>
              {about.specialty}
            </p>
            <div className="mt-10" data-reveal>
              <LineLink to={routes.about}>Discover Our Story</LineLink>
            </div>
          </div>
        </div>
      </section>

      {/* 09 — Why Kanyanga: a numbered editorial list beside a photograph */}
      <section className={`${container} pb-[clamp(5rem,10vw,9rem)]`} aria-labelledby="why-title">
        <div className="grid gap-12 border-t border-black pt-[clamp(3.5rem,7vw,6rem)] lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <h2 id="why-title" className={type.h2} data-reveal>
              {whyChoose.title}
            </h2>
            <Media slot={media.home.why} className="mt-10 hidden aspect-[4/3] w-full lg:block" />
          </div>
          <ol className="lg:col-span-6 lg:col-start-7">
            {whyChoose.items.map((item, i) => (
              <li key={item.title} className={`grid grid-cols-[3rem_1fr] gap-x-4 py-9 sm:grid-cols-[5rem_1fr] ${i > 0 ? "border-t border-black" : "lg:pt-0"}`} data-reveal>
                <span className="font-display text-[clamp(1.5rem,2vw,1.9rem)] leading-[1.15]">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className={type.h3}>{item.title}</h3>
                  <p className={`mt-4 max-w-md ${type.body}`}>{item.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 10 — More safari experiences: a staggered mosaic */}
      {more.length > 0 && (
        <section className="bg-black pb-[clamp(5rem,10vw,9rem)] text-white" aria-labelledby="more-title">
          <div className={`${container} grid gap-8 pb-[clamp(3rem,6vw,5rem)] pt-[clamp(5rem,10vw,9rem)] lg:grid-cols-12`}>
            <p className={`${label} lg:col-span-3 lg:pt-3`} data-reveal>
              {safariPage.offerLabel}
            </p>
            <h2 id="more-title" className={`${type.h2} lg:col-span-8`} data-reveal>
              {safariPage.offer}
            </h2>
          </div>
          <div className="grid gap-3 px-3 sm:grid-cols-12 sm:gap-4 sm:px-4">
            {more.map((s, i) => (
              <TitledTile
                key={s.slug}
                service={s}
                className={
                  [
                    "h-[115vw] sm:col-span-7 sm:h-[min(84svh,860px)]",
                    "h-[95vw] sm:col-span-5 sm:mt-24 sm:h-[min(64svh,640px)]",
                    "h-[95vw] sm:col-span-5 sm:h-[min(64svh,640px)]",
                    "h-[115vw] sm:col-span-7 sm:-mt-24 sm:h-[min(84svh,860px)]",
                  ][i]
                }
              />
            ))}
          </div>
          <div className={`${container} mt-12 flex justify-center`}>
            <LineLink to={routes.services}>All Safari Experiences</LineLink>
          </div>
        </section>
      )}

      {/* 11 — Gallery: an asymmetric exhibition, not a grid */}
      <section className={section} aria-labelledby="gallery-title">
        <div className={`${container} flex flex-wrap items-end justify-between gap-6`}>
          <h2 id="gallery-title" className={type.h2} data-reveal>
            Gallery
          </h2>
          <div data-reveal>
            <LineLink to={routes.gallery}>View the Gallery</LineLink>
          </div>
        </div>
        <div className={`${container} mt-12 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-12 md:gap-6`}>
          {plates.map((p, i) => (
            <Media
              key={i}
              slot={p.slot}
              className={
                [
                  "col-span-2 aspect-[4/3] md:col-span-8 md:aspect-[16/10]",
                  "aspect-[3/4] md:col-span-4 md:self-end",
                  "aspect-[3/4] md:col-span-4 md:col-start-2 md:aspect-[4/5]",
                  "col-span-2 aspect-[4/3] md:col-span-6 md:col-start-7 md:mt-24",
                  "aspect-square md:col-span-5 md:-mt-10",
                  "aspect-square md:col-span-6 md:col-start-7 md:aspect-[16/10] md:mt-8",
                ][i]
              }
            />
          ))}
        </div>
      </section>

      {/* 12 — Build your safari */}
      <section className="bg-black text-white" aria-labelledby="build-title">
        <div className="grid lg:grid-cols-2">
          <Media slot={media.home.build} className="h-[70vw] max-h-[600px] lg:h-auto lg:max-h-none lg:min-h-[92svh]" />
          <div className="flex flex-col justify-center px-5 py-[clamp(4.5rem,9vw,7rem)] sm:px-8 lg:px-16 xl:px-24">
            <p className={label} data-reveal>
              {itineraryBuilder.label}
            </p>
            <h2 id="build-title" className={`mt-6 ${type.h2}`} data-reveal>
              {itineraryBuilder.title}
            </h2>
            <p className={`mt-6 max-w-md ${type.body}`} data-reveal>
              {itineraryBuilder.description}
            </p>
            <dl className="mt-10 border-t border-white" data-reveal>
              {[
                { n: "01", t: "Destinations", v: options.regions.join(" · ") },
                { n: "02", t: "Activities", v: options.interests.join(" · ") },
                { n: "03", t: "Budget", v: options.budgets.map((b) => b.split(" ")[0]).join(" · ") },
              ].map((row) => (
                <div key={row.n} className="grid grid-cols-[2.5rem_1fr] items-baseline gap-x-4 border-b border-white py-5 sm:grid-cols-[3rem_9rem_1fr]">
                  <span className="font-sans text-[12px] font-semibold">{row.n}</span>
                  <dt className="font-display text-[22px] leading-tight">{row.t}</dt>
                  <dd className="col-start-2 mt-1 font-sans text-[14px] sm:col-start-3 sm:mt-0">{row.v}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-10" data-reveal>
              <Link to={routes.itinerary} className={buttonClass("dark")}>
                {itineraryBuilder.cta}
                <span aria-hidden>→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 13 — Travel ETA, deliberately secondary */}
      <section className={`${container} py-[clamp(4rem,8vw,6.5rem)]`} aria-labelledby="eta-title">
        <div className="grid items-center gap-8 border-y border-black py-10 sm:grid-cols-12 sm:gap-8">
          <Media slot={media.home.eta} className="aspect-[16/9] w-full sm:col-span-4 sm:aspect-[4/3]" parallax={false} />
          <div className="sm:col-span-7 sm:col-start-6">
            <h2 id="eta-title" className={type.h3} data-reveal>
              {eta.title}
            </h2>
            <p className={`mt-4 max-w-md ${type.body}`} data-reveal>
              {eta.description}
            </p>
            <div className="mt-7" data-reveal>
              <LineLink to={routes.eta}>{eta.cta}</LineLink>
            </div>
          </div>
        </div>
      </section>

      {/* 14 — Final proposal invitation */}
      <ProposalCTA />
    </div>
  );
}
