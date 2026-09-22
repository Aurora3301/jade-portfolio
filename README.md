# Jade L. / d.archivol

Static portfolio built with Vue 3, TypeScript, Vite, npm and GitHub Pages. The design follows the supplied `Portfo web sample` references: cream `#f5f4eb`, pink `#e5aeae`, brown `#503124`, large typography, three-column grids and editorial project layouts. Body copy uses bundled Lexend Medium. Headings use Arial/Helvetica as a fallback for the unsupplied Parabolica font.

## Setup and commands

Use Node.js 22.12+ (Node 22 LTS recommended) and npm. From this directory:

```sh
npm ci
npx playwright install chromium
npm run dev
```

`npm run setup` is an explicit alias for the reproducible `npm ci` installation. Use `npm install` only when intentionally updating dependencies; commit the updated lockfile.

| Command | Purpose |
| --- | --- |
| `npm run setup` | Install exact locked dependencies |
| `npm run dev` | Development server, normally http://127.0.0.1:5173 |
| `npm test` | End-to-end smoke test on desktop and mobile Chromium; starts a production build preview |
| `npm run build` | Type-check and generate `dist/` |
| `npm run preview` | Serve an existing `dist/`, normally http://127.0.0.1:4173 |
| `npm start` | Build and run a production-style local preview |
| `npm run media -- /absolute/path/to/jade_web` | Regenerate optimized media; requires ffmpeg |

Vite preview serves the built files for local review; GitHub Pages serves the production site. It is not a production Node server.

## Architecture and routes

`src/main.ts` configures Vue Router with hash URLs. Hash routing supports refreshes and shared project links on GitHub Pages without server rewrite rules. Vite uses relative asset paths, so the same build works at a domain root or a repository subpath. To override the deployment base, set `VITE_BASE_PATH` when building.

- `/#/`: full-screen home; six source clips rotate every 12 seconds, looping between transitions. Muted inline playback, pause button, reduced-motion support and a still-image fallback are included.
- `/#/branding`: eggy, 白夜製作 and gutter.
- `/#/entertainment`: Glimmera, The Unseen Marine and From the Ground.
- `/#/graphic-design`: separate Stay tuned page, as approved.
- `/#/project/:slug`: project hero, supplied context/idea/experience or equivalent sections, videos, images and details. Gutter has native expandable sections.
- `/#/projects`: all six projects, reached from Browse more projects / all projects.
- `/#/about`, `/#/awards`, `/#/blogs`: holding pages because no final content was supplied. Contact opens the email address shown in the reference.

The header lives in `src/App.vue`, page templates in `src/pages/`, design rules in `src/style.css`, and the six project records in `src/projects.ts`. There is no API, database, authentication, server or required secret. The download control opens the browser print dialog to save the displayed collection as a PDF; it is not a separately authored portfolio download.

## Data and media location

Project descriptions were transcribed from `/Users/timchan/jade_web/TEXTs.pdf`, preserving the supplied meaning and sections while normalizing PDF spacing and ligatures. Layout references and originals remain in `/Users/timchan/jade_web/`. The website does not require access to that directory to install, build or deploy.

`public/media/` contains self-contained web copies. `src/media-manifest.json` indexes them by project. `scripts/prepare-media.mjs` resizes images to at most 1920×1920 and converts them to WebP; videos become H.264 MP4 at up to 1280×720 with fast-start metadata. Landing clips have no audio. GIFs currently use their first frame; the supplied MP4 logo animation remains playable. Original filenames are sorted when generating indexes; after changing source files, review the explicit covers in `src/projects.ts` before publishing.

The original 156 MiB Gutter promo has a compressed local copy (approximately 11 MiB). Media total is approximately 21 MiB. No YouTube upload is needed for this build. Project films load only when requested (`preload="none"`), gallery images load lazily, and the homepage loads one active clip. All media is public when the website is published.

To add the licensed Parabolica font, put its web-font files in `public/fonts/`, add `@font-face` rules in `src/style.css`, and apply the family to headings and italic subtitles. Do not publish font files without web embedding rights.

## GitHub Pages deployment and permissions

1. Create or select your GitHub repository, then commit and push the contents of this directory to its `main` branch. Keep `package-lock.json`, `public/media/` and the workflow; exclude `node_modules/`, `dist/` and test reports.
2. In repository **Settings → Pages**, choose **GitHub Actions** as the publishing source.
3. `.github/workflows/deploy.yml` installs dependencies and Chromium, runs the smoke test, builds and deploys `dist/`. Each subsequent push to `main` repeats this.
4. Open the deployment URL from the Actions run. Verify home playback and direct project links at the repository URL.

The workflow requests `contents: read`, `pages: write`, and `id-token: write`; these are supplied by GitHub’s automatic workflow token. No personal token belongs in frontend code. Repository creation/pushing requires your GitHub account access. Local install requires access to the npm registry and browser downloads; media regeneration requires read access to the originals and write access to this project. Runtime visitors do not grant camera, microphone, location, storage or account permissions. Contact invokes their mail application.

## Backup and recovery

Keep the complete original `jade_web` directory, including `TEXTs.pdf` and layout references, backed up separately (external drive or private cloud backup). The optimized files are not archival originals. Back up this repository and lockfile with Git and a remote copy. To restore the site, clone the repository, run `npm ci`, then `npm run build`; the media is already included. To restore original-quality editing, restore the separate asset backup. Restore a prior release by reverting the relevant Git commit and pushing; Pages rebuilds automatically.

## Test coverage and limitations

One end-to-end smoke scenario runs in desktop and mobile Chromium against the production build. It exercises home video readiness/pause, both category grids, all six project routes, descriptions, Gutter disclosures, all-project navigation, direct project refresh, Graphic Design holding state, return home, console/network errors and mobile overflow.

From the Ground has no supplied imagery or description and intentionally shows Stay tuned, as approved. About/awards/blogs are also holding pages. The exact Parabolica typography awaits supplied licensed files. Embedded project videos have native controls, but no transcript or caption file was supplied. Hash routing and client rendering limit search-engine previews compared with prerendered pages. There is no CMS, form submission backend or visitor analytics. The homepage is deliberately darkened for text readability and respects reduced motion; autoplay may be blocked by device/browser preferences. Public deployment is prepared but requires a selected GitHub repository and account access; no repository URL was supplied during implementation.
