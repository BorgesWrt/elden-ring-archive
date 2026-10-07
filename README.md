# Elden Ring Archive

Independent English-language PvE companion, adapted from the visual and static-rendering patterns of Ashen Archive. Standalone React 19 / TypeScript / Vite / React Router application, no backend. Official game screenshots, locally served equipment icons, and original pixel emblem / fallback motifs. Local font reused under the Ashen Archive MIT license retained in `LICENSE`.

## Run locally

Requires a current Node.js LTS runtime compatible with Vite (tested with Node 24.12.0) and npm. On Windows use `npm.cmd` if PowerShell blocks `npm.ps1`.

```sh
npm install
npm run dev
```

Development: http://127.0.0.1:4180/. Bound to loopback only. Port 4180 must be free.

```sh
npm run check
npm run check:data
npm run check:media
npm run build
npm run preview
```

Preview serves the **prerendered production build** at http://127.0.0.1:4180/, with directory-index routes, slash redirects and real HTTP 404 responses. Stop the development server before starting preview. Stop preview with Ctrl+C when finished so the port is released. After the preview is running, `node scripts/check-static.mjs` checks rendered internal links, metadata and HTTP behavior.

## Coverage

47 individual records:

- 6 RL150 builds: Strength, Bloodhound’s Fang Dexterity, Intelligence spellblade, Faith/fire, Arcane twinblade, DLC Milady Dexterity.
- 11 armaments (7 melee weapons, a shield, a staff and 2 seals), 4 Ashes of War, 7 talismans, 6 sorceries/incantations.
- 8 encounters: Margit, Rennala, Starscourge Radahn, Mohg, Malenia, Radagon/Elden Beast, Rellana and Messmer.
- 5 practical guides: first route, affinities, survival/stance, upgrades/rebirth, DLC entry.

All builds include starting class, exact unbuffed attributes, equipment requirements, optional loadout slots, armor/load guidance, flask and Physick suggestions, early/middle/late progression, tactics, alternatives and appropriate encounter links. This is a focused initial catalogue, not an exhaustive wiki. Armor can be mixed to maintain medium load; no exact armor-set optimization or measured DPS claim is made.

Base game and Shadow of the Erdtree are explicitly labelled. None of the original five base-game builds requires DLC equipment. Ensis Wanderer requires Milady and Wing Stance from the expansion. No Nightreign content. Current research also identifies patch 1.17 and Tarnished Pack; this catalogue requires none of that separate pack’s new equipment/classes.

## Architecture

- `src/data.ts`: typed records, classes, statistics, requirements, source links and relation graph. Shared by browser and prerenderer.
- `src/App.tsx`: routes, catalogues, URL-based search/filter state, accessible native search dialog, saved-record context, articles, sources, privacy and 404.
- `src/Art.tsx`: original schematic SVG fallbacks and archive mark.
- `src/Media.tsx`: local responsive images, record visuals, complete-image figures, accessible enlargement dialog, and source credits.
- `src/media-assets.json`, `src/media-map.json`: image metadata and shared build / guide assignments.
- `public/media/`: optimized WebP images, thumbnail variants, rights notice and original-source inventory.
- `IMAGE_SOURCES.md`: original image URLs and attribution; game art is excluded from the software MIT license.
- `src/styles.css`: local pixel display font, responsive panels, clear focus styles and reduced-motion support.
- `src/main.tsx`: hydration for matching prerendered routes; clean client rendering for query-linked catalogues and fallback routes.
- `src/entry-server.tsx` and `scripts/prerender.mjs`: build-time HTML rendering; no server rendering is needed on the public host.
- `scripts/serve.mjs`: loopback-only static preview with HTTP 404 and trailing-slash redirects.
- `scripts/validate.ts`: unique records, relations, source URLs, class floors, exact levels, published requirements, talisman slot counts and DLC dependency checks.
- `scripts/check-static.mjs`: generated HTML links, metadata and preview HTTP checks.
- `scripts/check-media.mjs`: local image paths, WebP signatures, dimensions, provenance and SHA-256 integrity.
- `.github/workflows/check.yml`: clean-install data, media and production-build checks on pushes and pull requests.

Search includes names, tags, article text and linked equipment. Filters use query parameters and canonicals point at the unfiltered catalogue. The armory includes a requirement checker with optional two-handed Strength calculation; it is not a damage calculator. Saved records use only `elden-ring-archive:saved:v1` local storage. Invalid or obsolete identifiers are discarded; unavailable storage has a visible warning. Cross-tab storage changes are observed.

## Sources and review status

Research session: **2026-10-04**. Latest official Elden Ring patch found: **1.17, 27 August 2026**.

- Official patch notes: https://en.bandainamcoent.eu/elden-ring/news/elden-ring-patch-notes-version-117
- Official patch 1.12, including Torrent in Elden Beast and Taker’s Flames changes: https://en.bandainamcoent.eu/elden-ring/news/elden-ring-patch-notes-version-112
- Official DLC blessing guidance: https://en.bandainamcoent.eu/elden-ring/news/elden-ring-how-strengthen-your-character-shadow-of-the-erdtree
- Community reference: https://eldenring.wiki.gg/wiki/Elden_Ring

Each article lists its own references. Publicly accessible indexed reference excerpts were reviewed; many full wiki pages blocked automated retrieval. This limitation is displayed in the sources section and methodology page. The original tactical recommendations have not been tested in-game. No fake author, testing date, damage ranking, win rate or comprehensive patch audit is represented. Mathematical data checks do not establish combat performance.

## Static SEO and future hosting

The build emits **53 content routes**, plus `/saved/`, `/privacy/`, `/search/` and `404.html`. Every detail page contains its complete text in HTML before JavaScript, a unique title, one H1 and a description. A route manifest and supporting `_redirects` / `_headers` files are included.

For a public release, set `VITE_SITE_URL` in an ignored `.env.local` to the **confirmed HTTPS origin**, then rebuild. Do not use Ashen’s origin, analytics ID or verification tokens. Without this setting the build is deliberately local: all pages have `noindex`, `robots.txt` disallows crawling, canonicals and sitemap are omitted. With an origin, canonicals, Open Graph URLs and a 53-URL sitemap are generated. Saved, privacy, search and 404 remain noindex. Final unknown-route status handling must be confirmed on the selected host.

Deploy only the contents of `dist/` to an origin-root static host that serves folder `index.html` files and `404.html`. `_redirects` and `_headers` are intended for compatible hosts such as Cloudflare Pages; another host may require equivalent configuration. Source publication to a separate public GitHub repository was requested. Public website hosting has not been configured. SEO preparation does not guarantee Google indexing/ranking.

## Privacy and monetization

No account, analytics, cookies for tracking, ad network, remote font or remotely loaded image. Game images are served from local static files. `AdSlot` is disabled centrally; its reserved-height layout exists for a future reviewed integration. No empty ad space appears while disabled. Update the privacy page and relevant consent behavior before enabling third-party services.

## Images

44 source images cover all 47 records through shared build and guide assignments: 28 equipment icons, 9 boss images (Radagon and Elden Beast have separate views), and 7 landscape / location screenshots. The homepage, catalogues, saved/search views, related records and build loadouts share those images. Detail figures show the complete image and open a keyboard-accessible enlarged view.

Images were retrieved on 2026-10-07 from FromSoftware’s official public gallery, the Elden Ring Fan API image archive, and linked community wiki reference pages. They are publicly accessible copyrighted game visuals, **not openly licensed photographs**; the repository software license does not cover them. Read `IMAGE_SOURCES.md` and `public/media/RIGHTS.md`. Some source icons are limited to 200 px; they are not artificially enlarged on disk. Build visuals identify the main weapon and are not gameplay captures of that build.

## Further work

1. Validate individual combat recommendations in-game on the intended version and platform; replace the pending status only with actual evidence.
2. Review full source pages where access was limited, including boss timing, spell/buff interactions and exact pickup routes.
3. Add carefully researched encounters and progression routes rather than duplicated template pages. Add DLC final-boss coverage separately; Starscourge Radahn is not that encounter.
4. If needed, add an exact armor/weight planner and more talisman/catalyst alternatives; keep class/requirement checks mandatory.
5. Confirm the public domain/host, rebuild with its origin, verify canonical/sitemap/404 on that host, then configure any approved analytics or advertising independently.

See `VALIDATION.md` for actual engineering/browser checks and their limits.
