import { Link } from "react-router-dom";
import type { ReactNode } from "react";

const cls =
  "group inline-flex items-center gap-3 border-b border-current pb-1.5 font-sans text-[12px] font-semibold uppercase tracking-[0.18em]";

/** The site's quiet call to action: an underlined word and an arrow that steps forward on hover. */
export function LineLink({ to, className = "", children }: { to: string; className?: string; children: ReactNode }) {
  const content = (
    <>
      <span>{children}</span>
      <span aria-hidden className="transition-transform duration-500 ease-luxe group-hover:translate-x-1.5">
        →
      </span>
    </>
  );
  if (/^(mailto:|tel:|https?:)/.test(to)) {
    return (
      <a href={to} className={`${cls} ${className}`}>
        {content}
      </a>
    );
  }
  return (
    <Link to={to} className={`${cls} ${className}`}>
      {content}
    </Link>
  );
}
