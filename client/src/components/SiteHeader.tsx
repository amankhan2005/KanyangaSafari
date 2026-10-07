import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { brand, contact, proposal } from "@/data/site";
import { nav, routes } from "@/data/navigation";
import { buttonClass, container } from "./ui";

export function SiteHeader() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // The bar is always solid black with white type — on every page, over every section, including the hero film.
  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 bg-black text-white" style={{ paddingTop: "env(safe-area-inset-top, 0px)" }}>
        <div className={`${container} flex h-[72px] items-center justify-between gap-6`}>
          <Link to={routes.home} className="font-display text-[23px] leading-none" aria-label={`${brand.name}, home`}>
            {brand.name}
          </Link>

          <nav aria-label="Main" className="hidden items-center gap-10 lg:flex">
            {nav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `font-sans text-[12px] font-semibold uppercase tracking-[0.18em] decoration-1 underline-offset-[10px] hover:underline ${
                    isActive ? "underline" : ""
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
            <Link
              to={routes.proposal}
              className="inline-flex min-h-[44px] items-center border border-white px-6 font-sans text-[12px] font-semibold uppercase tracking-[0.18em] transition-colors duration-500 ease-luxe hover:bg-white hover:text-black"
            >
              {proposal.cta}
            </Link>
          </nav>

          <button
            type="button"
            className="-mr-3 min-h-[44px] px-3 font-sans text-[12px] font-semibold uppercase tracking-[0.18em] lg:hidden"
            aria-expanded={open}
            aria-controls="site-menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </header>

      <div
        id="site-menu"
        className={`fixed inset-0 z-40 flex flex-col bg-black text-white transition-opacity duration-700 ease-luxe lg:hidden ${
          open ? "opacity-100" : "pointer-events-none invisible opacity-0"
        }`}
        style={{ paddingTop: "calc(72px + env(safe-area-inset-top, 0px))" }}
        aria-hidden={!open}
      >
        <nav aria-label="Mobile" className={`${container} flex flex-1 flex-col justify-center`}>
          {nav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              tabIndex={open ? 0 : -1}
              className={({ isActive }) =>
                `flex items-baseline justify-between border-b border-white py-4 font-display text-[clamp(2.2rem,9vw,3.4rem)] leading-[1.1] ${isActive ? "underline decoration-1 underline-offset-8" : ""}`
              }
            >
              {item.label}
            </NavLink>
          ))}
          <Link to={routes.proposal} tabIndex={open ? 0 : -1} className={`mt-10 w-full ${buttonClass("dark")}`}>
            {proposal.cta}
          </Link>
        </nav>
        <div
          className={`${container} flex flex-col gap-1 font-sans text-[14px]`}
          style={{ paddingBottom: "calc(2.5rem + env(safe-area-inset-bottom, 0px))" }}
        >
          <span>{contact.email}</span>
          <span>{contact.phone}</span>
          <span>{contact.location}</span>
        </div>
      </div>
    </>
  );
}
