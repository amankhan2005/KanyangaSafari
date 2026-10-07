import { Outlet } from "react-router-dom";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ScrollEffects } from "@/components/ScrollEffects";
import { ScrollManager } from "@/components/ScrollManager";

export function SiteLayout() {
  return (
    <>
      <a
        href="#content"
        className="fixed left-4 top-4 z-[60] -translate-y-24 bg-black px-4 py-3 font-sans text-[12px] text-white focus:translate-y-0"
      >
        Skip to content
      </a>
      <ScrollManager />
      <SiteHeader />
      <main id="content">
        <Outlet />
      </main>
      <SiteFooter />
      <ScrollEffects />
    </>
  );
}
