# Kanyanga Safari — MERN

React + TypeScript + Tailwind + React Router (client) · Node + Express (server) · MongoDB (database).
A strict black-and-white editorial site: Bodoni Moda and Manrope, a full-screen hero film with nothing over it, and large photography.

```
client/   React app (Vite). All site content and imagery: src/data (copy, services, team, gallery, navigation, images) and public/ (hero.mp4, images/).
server/   Express API for form submissions + Mongoose models for the submitted data.
shared/   Form choice values used by both (shared/options.json): regions, budgets, interests, service slugs.
```

**Architecture.** Static content → frontend. Forms → backend. Submitted data → MongoDB.
The site renders entirely from `client/src/data` and `client/public`; no page waits on the server. The API exists only for form submissions, and MongoDB stores only those submissions — it is not a CMS.

## Setup

Requirements: Node 20+, a MongoDB database (Atlas or self-hosted).

```bash
npm install                      # installs client and server (npm workspaces)
cp server/.env.example server/.env
cp client/.env.example client/.env
# set MONGODB_URI (and CLIENT_ORIGIN for production) in server/.env
npm run dev                      # API on :4000, site on :5173 (Vite proxies /api)
```

## Deployment

Two deployments from one repository. Backend code never ships with the frontend.

**Frontend → Netlify** (configured in `netlify.toml`)

- Build command `npm run build -w client`, publish directory `client/dist`, Node 20. Netlify installs from the root lockfile.
- All routes (`/about`, `/services`, `/gallery`, `/contact`, `/travel-proposal`, `/itinerary`, `/eta`) are rewritten to `index.html`, so opening them directly works.
- Set `VITE_API_URL` in Netlify's environment variables to the API's public URL. Alternatively, enable the commented `/api/*` proxy in `netlify.toml` and leave `VITE_API_URL` empty.
- Images, `hero.mp4` and favicons are served from `client/public`. The site makes no external image requests; only the fonts load from Google Fonts.

**Backend → any Node host** (Render, Railway, Fly.io, a VPS…)

```bash
npm ci && npm run build -w server    # build
npm start                            # start (node server/dist/index.js)
```

Environment: `MONGODB_URI`, `PORT` (usually provided by the host), `NODE_ENV=production`, `CLIENT_ORIGIN` (the Netlify URL plus any custom domain, comma-separated) and `TRUST_PROXY=1` behind the host's proxy. The server reads `shared/options.json`, so deploy from the repository root, not from `server/` alone. Health check: `GET /api/health`.

**Database → MongoDB Atlas** (or self-hosted). Allow the API host's IP addresses in the network access list.

All variables are documented in `.env.example` (root, combined) and in `client/.env.example` / `server/.env.example`.

## Routes

| Route | Page | Server |
| --- | --- | --- |
| `/` | Home | — |
| `/about` | About Us | — |
| `/services` | Safari — all eight experiences | — |
| `/gallery` | Gallery | — |
| `/contact` | Contact Us + enquiry form | `POST /api/contact` |
| `/travel-proposal` | Make a Proposal (`?service=<slug>` preselects one) | `POST /api/proposals` |
| `/itinerary` | Itinerary Builder | `POST /api/itineraries` |
| `/eta` | Travel ETA Application | `POST /api/eta` |

There is no blog: no route, page, navigation or footer link, component, API or model.

## API

| Method | Path | Purpose |
| --- | --- | --- |
| GET | `/api/health` | Status and database connection (for monitoring) |
| POST | `/api/proposals` | Proposal request |
| POST | `/api/itineraries` | Itinerary builder request |
| POST | `/api/eta` | ETA application |
| POST | `/api/contact` | Contact enquiry |

POST endpoints validate input (Zod), return `422` with one message per field on failure, are rate-limited per IP, and include a hidden spam trap. Proposal and itinerary `services` must be slugs listed in `shared/options.json`. Submissions are stored with `status: "new"` for the team to work through. Helmet and a CORS allow-list (`CLIENT_ORIGIN`) are applied to every request.

No endpoint exposes submissions publicly. Read them in MongoDB (Atlas, Compass or mongosh) until an admin area is needed.

## Content and media

All content is static, in the frontend. Edit the file and redeploy the client; no database change is involved.

| What | Where |
| --- | --- |
| Page copy, stats, About (intro, vision, mission, values), footer text, page titles | `client/src/data/site.ts` |
| Routes, navigation, footer and legal links | `client/src/data/navigation.ts` |
| The eight services (name, description, homepage placement, photograph) | `client/src/data/services.ts` |
| Team | `client/src/data/team.ts` |
| Gallery | `client/src/data/gallery.ts` |
| Page photography and the hero film path | `client/src/data/images.ts` |
| Image files | `client/public/images/<wildlife, safari, culture, coast, landscapes>/` — add `gallery/`, `team/` etc. as needed |
| Hero film | `client/public/hero.mp4`, loaded directly as `/hero.mp4` |

`homePlacement` on a service decides where it appears on the homepage (`feature`, `pair`, `visual`, `story`, or `null`). If you add or rename a service slug, add it to `services` in `shared/options.json` so the forms accept it (the dev build warns when they differ).

**Demo photography.** Until Kanyanga's own photography arrives, the site uses free-licensed images from Wikimedia Commons (Creative Commons / public domain), listed with authors and licences in `client/public/images/CREDITS.md`. To replace one, drop the new file into `client/public/images/` and change its path in `client/src/data/images.ts`.

**Colour** is enforced in `client/tailwind.config.ts`: the palette contains only `#000000` and `#FFFFFF`. The navigation bar is solid black with white type on every page.

## MongoDB

Collections: `proposals`, `itineraryrequests`, `etaapplications`, `contactenquiries` — form submissions only. There are no content collections (services, team, gallery, pages, images) and no seed step.

## Still needed from Kanyanga

- Kanyanga's own photography to replace the demo images, gallery images, and team portraits. Until then, the demo images' Creative Commons licences require visible attribution: link `client/public/images/CREDITS.md` (or a credits page) from the site before launch.
- URLs for Privacy, Terms and Sustainability (`client/src/data/navigation.ts`) and the team's LinkedIn/Instagram (`client/src/data/team.ts`). Until set, they show as plain text or are hidden.
- Confirmation of the proposal, itinerary and ETA form fields against the old site's flows. The ETA form deliberately collects no passport or payment data.
- "Limited 2025 slots" was legacy text and is not shown.

## Design preview

`npm run build:preview -w client` builds one self-contained HTML file (`client/dist-preview/`) with hash routing, for design review without a server. Its forms validate but send nothing.
