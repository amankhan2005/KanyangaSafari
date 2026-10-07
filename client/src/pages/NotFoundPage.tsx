import { LineLink } from "@/components/LineLink";
import { container, label, type } from "@/components/ui";
import { routes } from "@/data/navigation";
import { usePageMeta } from "@/hooks/usePageMeta";

export default function NotFoundPage() {
  usePageMeta("Page not found", "This page does not exist.");
  return (
    <section className={`${container} pb-[clamp(6rem,12vw,10rem)] pt-[calc(72px+clamp(4rem,9vw,7.5rem))]`}>
      <p className={label}>404</p>
      <h1 className={`mt-6 ${type.display}`}>This page doesn’t exist.</h1>
      <div className="mt-12">
        <LineLink to={routes.home}>Return home</LineLink>
      </div>
    </section>
  );
}
