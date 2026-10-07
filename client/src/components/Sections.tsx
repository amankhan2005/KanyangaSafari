import { Link } from "react-router-dom";
import { contact, proposal, stats } from "@/data/site";
import { routes } from "@/data/navigation";
import { media } from "@/data/images";
import type { MediaSlot, Service } from "@/data/types";
import { Media } from "./Media";
import { LineLink } from "./LineLink";
import { buttonClass, container, ghostButtonClass, label, type } from "./ui";

/** Opening for inner pages: a small label, one serif title, an optional short introduction. */
export function PageTitle({ eyebrow, title, intro }: { eyebrow: string; title: string; intro?: string }) {
  return (
    <section className={`${container} pb-[clamp(3rem,6vw,5rem)] pt-[calc(72px+clamp(4rem,9vw,7.5rem))]`}>
      <p className={label} data-reveal>
        {eyebrow}
      </p>
      <h1 className={`mt-6 max-w-[16ch] ${type.display}`} data-reveal>
        {title}
      </h1>
      {intro && (
        <p className={`mt-8 max-w-xl ${type.lede}`} data-reveal>
          {intro}
        </p>
      )}
    </section>
  );
}

export function FullBleed({ slot, className = "h-[min(80svh,900px)] min-h-[420px]" }: { slot: MediaSlot; className?: string }) {
  return <Media slot={slot} className={`w-full ${className}`} />;
}

/** Image + serif title + short description + quiet action — the editorial unit of the Services page. */
export function ExperienceBlock({
  service,
  to,
  index,
  total,
  actionLabel = "Explore Safari",
  reverse = false,
}: {
  service: Service;
  to: string;
  index: number;
  total: number;
  actionLabel?: string;
  reverse?: boolean;
}) {
  return (
    <article id={service.slug} className="grid scroll-mt-28 items-center gap-8 lg:grid-cols-12 lg:gap-8">
      <div className={`-mx-5 sm:mx-0 lg:col-span-7 ${reverse ? "lg:order-2 lg:col-start-6" : ""}`}>
        <Media slot={service.media} className="aspect-[4/5] w-full sm:aspect-[4/3]" />
      </div>
      <div className={`lg:col-span-4 ${reverse ? "lg:order-1 lg:col-start-1" : "lg:col-start-9"}`}>
        <p className={label} data-reveal>
          {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </p>
        <h2 className={`mt-5 ${type.h3}`} data-reveal>
          {service.name}
        </h2>
        <p className={`mt-5 max-w-md ${type.body}`} data-reveal>
          {service.description}
        </p>
        <div className="mt-8" data-reveal>
          <LineLink to={to}>{actionLabel}</LineLink>
        </div>
      </div>
    </article>
  );
}

/** Image tile with its title set over the bottom edge, on a soft black scrim for legibility. */
export function TitledTile({ service, className }: { service: Service; className: string }) {
  return (
    <Link to={`${routes.services}#${service.slug}`} className={`group relative block overflow-hidden ${className}`}>
      <div className="h-full w-full transition-transform duration-[1800ms] ease-luxe group-hover:scale-[1.03]">
        <Media slot={service.media} className="h-full w-full" notePosition="top" parallax={false} />
      </div>
      <span aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />
      <span className="absolute inset-x-6 bottom-6 flex flex-col gap-4 text-white sm:inset-x-8 sm:bottom-8">
        <span className={type.h4}>{service.name}</span>
        <span className="inline-flex items-center gap-3 font-sans text-[11px] font-semibold uppercase tracking-[0.18em]">
          Explore
          <span aria-hidden className="transition-transform duration-500 ease-luxe group-hover:translate-x-1.5">
            →
          </span>
        </span>
      </span>
    </Link>
  );
}

/** The three trust figures, set as an editorial row rather than dashboard cards. */
export function Stats({ tone = "light" }: { tone?: "light" | "dark" }) {
  const line = tone === "dark" ? "border-white" : "border-black";
  return (
    <dl className={`grid grid-cols-3 border-y ${line}`}>
      {stats.map((s, i) => (
        <div key={s.label} className={`flex flex-col-reverse gap-3 px-2 py-8 text-center sm:py-12 ${i > 0 ? `border-l ${line}` : ""}`} data-reveal>
          <dt className="font-sans text-[10px] font-semibold uppercase tracking-[0.18em] sm:text-[11px]">{s.label}</dt>
          <dd className="font-display text-[clamp(2.2rem,5.5vw,4.6rem)] leading-none tracking-[-0.01em]">{s.value}</dd>
        </div>
      ))}
    </dl>
  );
}

/** The closing gesture of every page: a photograph, one serif invitation, two clear actions, contact details. */
export function ProposalCTA({ slot = media.home.proposal }: { slot?: MediaSlot }) {
  return (
    <section className="relative isolate overflow-hidden bg-black text-white" aria-labelledby="proposal-cta-title">
      <Media slot={slot} className="absolute inset-0 -z-10 h-full w-full" reveal={false} />
      <span aria-hidden className="absolute inset-0 -z-10 bg-black/55" />
      <div className={`${container} flex min-h-[min(88svh,860px)] flex-col items-center justify-center py-[clamp(6rem,12vw,10rem)] text-center`}>
        <p className={label} data-reveal>
          Plan your safari
        </p>
        <h2 id="proposal-cta-title" className={`mt-6 ${type.display}`} data-reveal>
          {proposal.title}
        </h2>
        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row" data-reveal>
          <Link to={routes.proposal} className={buttonClass("dark")}>
            {proposal.cta}
          </Link>
          <Link to={`${routes.contact}#enquiry`} className={ghostButtonClass("dark")}>
            {contact.enquire}
          </Link>
        </div>
        <div className="mt-12 flex flex-col items-center gap-2 font-sans text-[14px] sm:flex-row sm:gap-8" data-reveal>
          <a href={`mailto:${contact.email}`} className="hover:underline">
            {contact.email}
          </a>
          <a href={contact.phoneHref} className="hover:underline">
            {contact.phone}
          </a>
          <span>{contact.location}</span>
        </div>
      </div>
    </section>
  );
}
