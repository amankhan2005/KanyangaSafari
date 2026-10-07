import { Link } from "react-router-dom";
import { brand, contact, footer, proposal } from "@/data/site";
import { footerLinks, legalLinks, routes } from "@/data/navigation";
import { container, label } from "./ui";

export function SiteFooter() {
  const linkClass = "w-fit decoration-1 underline-offset-[6px] hover:underline";
  return (
    <footer className="bg-black text-white">
      <div className={`${container} pb-10 pt-[clamp(4rem,8vw,6.5rem)]`}>
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Link to={routes.home} className="font-display text-[28px] leading-none">
              {brand.name}
            </Link>
            <p className="mt-6 font-display text-[22px] leading-snug">{brand.tagline}</p>
            <p className="mt-4 max-w-sm font-sans text-[14px] leading-[1.75]">{brand.description}</p>
          </div>

          <nav className="lg:col-span-3 lg:col-start-7" aria-labelledby="footer-explore">
            <h2 id="footer-explore" className={label}>
              {footer.exploreLabel}
            </h2>
            <ul className="mt-6 flex flex-col gap-3 font-sans text-[15px]">
              {footerLinks.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className={linkClass}>
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link to={routes.proposal} className={linkClass}>
                  {proposal.cta}
                </Link>
              </li>
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <h2 className={label}>{footer.contactLabel}</h2>
            <address className="mt-6 flex flex-col gap-3 font-sans text-[15px] not-italic">
              <a href={`mailto:${contact.email}`} className={linkClass}>
                {contact.email}
              </a>
              <a href={contact.phoneHref} className={linkClass}>
                {contact.phone}
              </a>
              <span>{contact.location}</span>
            </address>
            <Link
              to={`${routes.contact}#enquiry`}
              className="mt-8 inline-flex min-h-[48px] items-center border border-white px-7 font-sans text-[12px] font-semibold uppercase tracking-[0.18em] transition-colors duration-500 hover:bg-white hover:text-black"
            >
              {contact.enquire}
            </Link>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-white pt-6 font-sans text-[12px] sm:flex-row sm:items-center sm:justify-between">
          <span>{footer.copyright}</span>
          <ul className="flex gap-6">
            {legalLinks.map((l) => (
              <li key={l.label}>
                {l.href ? (
                  <a href={l.href} className={linkClass}>
                    {l.label}
                  </a>
                ) : (
                  <span>{l.label}</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
