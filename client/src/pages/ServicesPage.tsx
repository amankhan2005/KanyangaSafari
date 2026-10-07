import { Fragment, type MouseEvent } from "react";
import { Link } from "react-router-dom";
import { Media } from "@/components/Media";
import { ExperienceBlock, FullBleed, PageTitle, ProposalCTA } from "@/components/Sections";
import { buttonClass, container, label, type } from "@/components/ui";
import { media } from "@/data/images";
import { routes } from "@/data/navigation";
import { services } from "@/data/services";
import { eta, meta, safariPage, whyChoose } from "@/data/site";
import { usePageMeta } from "@/hooks/usePageMeta";

const half = Math.ceil(services.length / 2);

export default function ServicesPage() {
  usePageMeta(meta.services.title, meta.services.description);

  return (
    <div className="page-in">
      <PageTitle eyebrow={safariPage.label} title={safariPage.title} intro={safariPage.intro} />
      <FullBleed slot={media.servicesHero} className="h-[min(70svh,780px)] min-h-[380px]" />

      {/* What we offer, with an index of every experience */}
      <section className={`${container} grid gap-12 py-[clamp(5rem,10vw,8rem)] lg:grid-cols-12 lg:gap-8`}>
        <div className="lg:col-span-5">
          <p className={label} data-reveal>
            {safariPage.offerLabel}
          </p>
          <h2 className={`mt-6 ${type.h2}`} data-reveal>
            {safariPage.offer}
          </h2>
        </div>
        <nav aria-label="Safari experiences" className="lg:col-span-6 lg:col-start-7 lg:pt-12">
          <ol className="border-t border-black">
            {services.map((s, i) => (
              <li key={s.slug} className="border-b border-black">
                <a href={`#${s.slug}`} onClick={(e) => jump(e, s.slug)} className="group flex items-baseline gap-5 py-4 sm:py-5">
                  <span className="w-6 shrink-0 font-sans text-[12px] font-semibold">{String(i + 1).padStart(2, "0")}</span>
                  <span className="flex-1 font-display text-[clamp(1.2rem,1.7vw,1.45rem)] leading-snug group-hover:underline group-hover:decoration-1 group-hover:underline-offset-4">
                    {s.name}
                  </span>
                  <span aria-hidden className="transition-transform duration-500 ease-luxe group-hover:translate-y-0.5">
                    ↓
                  </span>
                </a>
              </li>
            ))}
          </ol>
        </nav>
      </section>

      {/* The catalogue: alternating image / text, with a full-bleed pause halfway */}
      <section className="flex flex-col gap-[clamp(5rem,10vw,9rem)] pb-[clamp(5rem,10vw,9rem)]" aria-label="All safari experiences">
        {services.map((service, i) => (
          <Fragment key={service.slug}>
            {i === half && <FullBleed slot={media.servicesInterlude} className="h-[min(86svh,920px)] min-h-[420px]" />}
            <div className={container}>
              <ExperienceBlock
                service={service}
                index={i}
                total={services.length}
                to={`${routes.proposal}?service=${service.slug}`}
                actionLabel={safariPage.serviceAction}
                reverse={i % 2 === 1}
              />
            </div>
          </Fragment>
        ))}
      </section>

      {/* Why Kanyanga, briefly */}
      <section className="bg-black text-white" aria-labelledby="why-title">
        <div className={`${container} py-[clamp(5rem,10vw,8rem)]`}>
          <h2 id="why-title" className={type.h2} data-reveal>
            {whyChoose.title}
          </h2>
          <div className="mt-12 grid border-t border-white md:grid-cols-3">
            {whyChoose.items.map((item, i) => (
              <div key={item.title} className={`border-b border-white py-9 md:border-b-0 md:px-8 md:py-10 ${i > 0 ? "md:border-l" : "md:pl-0"}`} data-reveal>
                <h3 className={type.h4}>{item.title}</h3>
                <p className={`mt-4 max-w-sm ${type.body}`}>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Travel ETA */}
      <section className={`${container} grid items-center gap-12 py-[clamp(5rem,10vw,8rem)] lg:grid-cols-12 lg:gap-8`} aria-labelledby="eta-title">
        <div className="-mx-5 sm:mx-0 lg:col-span-6">
          <Media slot={media.eta} className="aspect-[4/3] w-full" />
        </div>
        <div className="lg:col-span-5 lg:col-start-8">
          <h2 id="eta-title" className={type.h2} data-reveal>
            {eta.title}
          </h2>
          <p className={`mt-6 max-w-md ${type.body}`} data-reveal>
            {eta.description}
          </p>
          <div className="mt-10" data-reveal>
            <Link to={routes.eta} className={buttonClass("light")}>
              {eta.cta}
            </Link>
          </div>
        </div>
      </section>

      <ProposalCTA />
    </div>
  );
}

/** In-page jump that works with both browser and hash routing. */
function jump(e: MouseEvent, id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  e.preventDefault();
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}
