# Jade L. / d.archivol

Static Vue 3 portfolio hosted at https://aurora3301.github.io/jade-portfolio/.

## Local development

Use Node.js 22 and npm.

```sh
npm ci
npx playwright install chromium
npm run dev
```

Open the displayed URL followed by /jade-portfolio/. Run `npm test` for component and desktop/mobile browser tests. `npm run build` type-checks and creates dist; `npm run preview` serves that build.

## October 2026 layout refresh

- Full-screen landing playlist plays each clip once before advancing; the playlist repeats. No background playback button.
- Cream editorial project pages with pink titles, brown introductory subtitles and transparent, uncropped lead-media padding.
- Responsive Branding grid with equal outer and inner gaps.
- From the Ground card has a pink Stay tuned panel, original logo and birthday-dinner subtitle.
- Original project text and 59 bundled media assets retained.
- Circular logo links to the published homepage.
- Hash routing preserves old /#/project/:slug links as well as /#/projects/:slug.
- Static contact links work without an API or database.

Public pages live in src/views, reusable components in src/components, and styling in src/style.css. Static content lives in src/lib/publishedProjects.ts and publishedContent.ts. Media is bundled under public/media and indexed by src/lib/publishedManifest.json. No local source-media directory or secret is required.

About, Awards, Blogs and Graphic Design remain holding pages. From the Ground has no supplied project imagery. Download selected projects opens the browser print dialog. Autoplay remains subject to browser preferences; removing the pause control means the background does not offer an explicit user pause mechanism.

## Deployment

Pushes to main run .github/workflows/deploy.yml: install, test, build, deploy to GitHub Pages. The development branch for this release is feature/20261004/portfolio-layout-refresh.

## Restore the original deployment

The previous production commit is **2127d3f0db68dacaf7e28cde41746eb9c367d20f**, preserved as **deployment/original-20261004**.

1. Open GitHub → Actions → Verify and deploy portfolio.
2. Choose Run workflow, keeping the workflow branch as main.
3. Set deploy_ref to deployment/original-20261004 and run.
4. Wait for successful deployment, then refresh the public site.

This rebuilds the original version without deleting the redesign branch or rewriting history. To restore the redesign, run the same workflow with deploy_ref set to main. A later push to main automatically deploys main again, so pause development pushes while keeping a manual rollback live.

Keep original high-resolution artwork backed up separately; bundled web media is optimized, not archival.
