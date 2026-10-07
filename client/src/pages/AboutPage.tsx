import { Media } from "@/components/Media";
import { FullBleed, PageTitle, ProposalCTA, Stats } from "@/components/Sections";
import { container, label, section, type } from "@/components/ui";
import { media } from "@/data/images";
import { about, brand, meta } from "@/data/site";
import { team } from "@/data/team";
import type { TeamMember } from "@/data/types";
import { usePageMeta } from "@/hooks/usePageMeta";

export default function AboutPage() {
  usePageMeta(meta.about.title, meta.about.description);

  return (
    <div className="page-in">
      <PageTitle eyebrow={brand.name} title={about.title} intro={about.intro} />
      <FullBleed slot={media.aboutHero} />

      {/* Who we are: photograph beside the company story */}
      <section className={`${container} ${section}`}>
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="-mx-5 sm:mx-0 lg:col-span-6">
            <Media slot={media.aboutStory} className="aspect-[4/5] w-full sm:aspect-[5/4] lg:aspect-[4/5]" />
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <p className={label} data-reveal>
              Who We Are
            </p>
            <h2 className={`mt-6 ${type.h2}`} data-reveal>
              {brand.tagline}
            </h2>
            <p className={`mt-8 ${type.lede}`} data-reveal>
              {about.specialty}
            </p>
            <p className={`mt-5 ${type.body}`} data-reveal>
              {about.goal}
            </p>
          </div>
        </div>
        <div className="mt-[clamp(4rem,8vw,6.5rem)]">
          <Stats />
        </div>
      </section>

      {/* Vision — inverted, with a photograph */}
      <section className="bg-black text-white" aria-labelledby="vision-title">
        <div className={`${container} grid items-center gap-12 ${section} lg:grid-cols-12 lg:gap-8`}>
          <div className="lg:col-span-6">
            <p id="vision-title" className={label} data-reveal>
              {about.visionLabel}
            </p>
            <p className={`mt-8 ${type.h3}`} data-reveal>
              {about.vision}
            </p>
          </div>
          <div className="-mx-5 sm:mx-0 lg:col-span-5 lg:col-start-8">
            <Media slot={media.vision} className="aspect-[4/3] w-full lg:aspect-[4/5]" />
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className={`${container} ${section}`} aria-labelledby="mission-title">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="-mx-5 sm:mx-0 lg:col-span-5">
            <Media slot={media.mission} className="aspect-[4/5] w-full" />
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <p id="mission-title" className={label} data-reveal>
              {about.missionLabel}
            </p>
            <p className={`mt-8 ${type.h3}`} data-reveal>
              {about.mission}
            </p>
          </div>
        </div>
      </section>

      <FullBleed slot={media.aboutInterlude} className="h-[min(78svh,860px)] min-h-[400px]" />

      {/* Core values */}
      <section className={`${container} ${section}`} aria-labelledby="values-title">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-8">
          <h2 id="values-title" className={`${type.h2} lg:col-span-6`} data-reveal>
            {about.valuesTitle}
          </h2>
          <p className={`${type.body} max-w-sm lg:col-span-4 lg:col-start-9`} data-reveal>
            {about.valuesIntro}
          </p>
        </div>
        <ol className="mt-12 border-t border-black">
          {about.values.map((v, i) => (
            <li key={v.name} className="grid grid-cols-[2.5rem_1fr] items-baseline gap-x-4 gap-y-2 border-b border-black py-7 sm:py-8 lg:grid-cols-12 lg:gap-8" data-reveal>
              <span className="font-sans text-[12px] font-semibold lg:col-span-1">{String(i + 1).padStart(2, "0")}</span>
              <h3 className={`${type.h3} lg:col-span-5`}>{v.name}</h3>
              <p className={`col-start-2 ${type.body} lg:col-span-5 lg:col-start-8`}>{v.description}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Team */}
      <section className="bg-black text-white" aria-labelledby="team-title">
        <div className={`${container} ${section}`}>
          <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-8">
            <h2 id="team-title" className={`${type.h2} lg:col-span-6`} data-reveal>
              {about.teamTitle}
            </h2>
            <p className={`${type.body} max-w-sm lg:col-span-4 lg:col-start-9`} data-reveal>
              {about.teamIntro}
            </p>
          </div>
          <div className="mt-14 grid gap-14 sm:grid-cols-2 md:grid-cols-3 md:gap-8 lg:gap-12">
            {team.map((m, i) => (
              <TeamCard key={m.name} member={m} offset={i === 1} />
            ))}
          </div>
        </div>
      </section>

      <ProposalCTA />
    </div>
  );
}

function TeamCard({ member: m, offset }: { member: TeamMember; offset: boolean }) {
  const initials = m.name
    .split(/\s+/)
    .map((w) => w[0])
    .join("")
    .slice(0, 2);
  return (
    <article className={offset ? "md:mt-20" : ""}>
      {m.media?.src ? (
        <Media slot={m.media} className="aspect-[3/4] w-full" />
      ) : (
        // No portraits supplied yet: a monogram, never a stand-in face for a real person.
        <div className="flex aspect-[3/4] w-full items-center justify-center border border-white" aria-hidden>
          <span className="font-display text-[clamp(4rem,9vw,7rem)] leading-none">{initials}</span>
        </div>
      )}
      <p className={`${label} mt-7`}>{m.role}</p>
      <h3 className={`mt-3 ${type.h3}`}>{m.name}</h3>
      <p className={`mt-4 max-w-xs ${type.small}`}>{m.description}</p>
      {(m.linkedin || m.instagram) && (
        <div className={`${label} mt-6 flex gap-6`}>
          {m.linkedin && (
            <a href={m.linkedin} target="_blank" rel="noopener noreferrer" className="underline decoration-1 underline-offset-[6px]">
              LinkedIn
            </a>
          )}
          {m.instagram && (
            <a href={m.instagram} target="_blank" rel="noopener noreferrer" className="underline decoration-1 underline-offset-[6px]">
              Instagram
            </a>
          )}
        </div>
      )}
    </article>
  );
}
