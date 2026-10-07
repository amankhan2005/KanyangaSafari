import { lazy, Suspense } from "react";
import { BrowserRouter, HashRouter, Route, Routes } from "react-router-dom";
import { SiteLayout } from "@/layouts/SiteLayout";
import { config } from "@/config/env";
import { routes } from "@/data/navigation";
import HomePage from "@/pages/HomePage";

// Home loads immediately; other pages are split into their own chunks.
const AboutPage = lazy(() => import("@/pages/AboutPage"));
const ServicesPage = lazy(() => import("@/pages/ServicesPage"));
const GalleryPage = lazy(() => import("@/pages/GalleryPage"));
const ContactPage = lazy(() => import("@/pages/ContactPage"));
const ProposalPage = lazy(() => import("@/pages/ProposalPage"));
const ItineraryPage = lazy(() => import("@/pages/ItineraryPage"));
const EtaPage = lazy(() => import("@/pages/EtaPage"));
const NotFoundPage = lazy(() => import("@/pages/NotFoundPage"));

// The single-file design preview runs without a server, so it routes by hash.
const Router = config.isPreview ? HashRouter : BrowserRouter;

export default function App() {
  return (
    <Router>
      <Suspense fallback={<div className="min-h-[100svh]" aria-busy="true" />}>
        <Routes>
          <Route element={<SiteLayout />}>
            <Route path={routes.home} element={<HomePage />} />
            <Route path={routes.about} element={<AboutPage />} />
            <Route path={routes.services} element={<ServicesPage />} />
            <Route path={routes.gallery} element={<GalleryPage />} />
            <Route path={routes.contact} element={<ContactPage />} />
            <Route path={routes.proposal} element={<ProposalPage />} />
            <Route path={routes.itinerary} element={<ItineraryPage />} />
            <Route path={routes.eta} element={<EtaPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
}
