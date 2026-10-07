# Validation — 2026-10-04

## Engineering checks passed

- `npm run check`: strict TypeScript check.
- `npm run check:data`: 47 unique records/routes; all internal data relations resolve; six class floors and exact RL150 point totals; every published loadout meets requirements without temporary bonuses; maximum four talismans; no hidden DLC equipment dependency in a base-game build.
- `npm run build`: browser production bundle, server rendering bundle and static HTML generation completed.
- `node scripts/check-static.mjs`: 56 HTML routes (53 content and 3 private routes), 1,191 internal HTML links, single H1/description per page, local noindex behavior, direct HTTP route visits, 301 trailing-slash redirect and real HTTP 404 for unknown paths/record IDs.
- Configured-origin SEO was exercised with a temporary test origin: sitemap parsed as XML with 53 content URLs, detail canonical pointed at its path, saved page remained noindex. The final build was restored to **empty public origin**, has no sitemap/canonical, and disallows crawling. No test origin remains in the deliverable.

## Browser verification

Tested in the Codex in-app browser against the **prerendered production build** on loopback port 4180.

| Width | Representative pages | Horizontal overflow |
|---|---|---|
| 320 px | Home, armory, Carian Spellblade, Rellana | None |
| 390 px | Home, armory, Carian Spellblade, Rellana | None |
| 768 px | Home, armory, Carian Spellblade, Rellana | None |
| 1440 px | Home, armory, Carian Spellblade, Rellana | None |

All 16 page/viewport combinations had one H1 and one title. Checks compare document scroll width against **client width**, including the scrollbar allowance. The original minimum body width created a 15-pixel overflow at 320 px; it was removed and the matrix repeated successfully.

Visual screenshots inspected: desktop home, mobile home at 390, armory at 768 and Colossal Knight at 320. The mobile menu opens, provides all six primary navigation destinations and closes when navigating.

User scenarios exercised:

- Home → builds → DLC filter → Ensis Wanderer; filter reduces the catalogue to 1 of 6 builds.
- Save Ensis Wanderer → Saved → reload; saved record persists. Remove it; empty state returns. Test record removed before handoff.
- Global search for “Scadutree” returns five relevant records. Unknown text shows the empty-search state.
- `/` opens search with the input focused. Escape closes the dialog after typed search text (an input-clearing interaction was found and corrected).
- Armory type/search filtering works. With STR21/DEX12 and usable-only enabled, Greatsword is unavailable one-handed and becomes available with the two-hand option.
- Colossal Knight → Greatsword; its reverse links include Colossal Knight, Lion’s Claw and the affinity guide.
- Header patch link lands at `about/#patch` with the target heading in view.
- Unknown route shows the custom 404 page.
- Browser error/warning log query returned no entries during checked scenarios.

## Limits

These checks validate software behavior and layout, **not game balance or in-game performance**. Full wiki access was limited; source excerpts and official notes were used. Gameplay tests and a complete patch audit are pending and disclosed on every record. Exact armor weight/poise optimization is not claimed.

No public deployment, real-domain SEO verification, Search Console indexing check, analytics, advertising network, cross-browser/device-lab run or accessibility certification was performed. Reduced-motion handling is implemented in CSS; no browser-emulated reduced-motion session was recorded. Before publication, set the actual origin and verify status codes/canonicals on the selected host.

Ashen Archive remained clean in its existing Git checkout; no source files were edited in Ashen or ZZZ. The new app is in `D:\Bussiness\Elden-Ring-Archive`.


## Image edition checked on 2026-10-07

- 44 source images: 28 equipment icons, 9 boss views, 7 landscape / location screenshots. All 47 records have an assigned image; builds and guides reuse relevant equipment / location images.
- `npm.cmd run check:data` passed with image assignments and existing record, level, requirement, relation and DLC checks. `npm.cmd run build` passed, generating 53 content routes plus 3 private routes and 404.
- `npm.cmd run check:media` passed: 88 local WebP variants, SHA-256 integrity, dimensions, secure original/source links and 2.84 MB total.
- `node scripts/check-static.mjs` passed: 56 route HTML files, 1241 internal links, all 88 image HTTP responses returned 200 / image/webp and matched built bytes, direct routes, slash redirects, metadata and real 404. React-generated image preload links are handled as image assets, not routes.
- Browser geometry matrix: home, equipment catalogue, boss catalogue and Rellana detail at 320, 390, 768 and 1440 px (16 checks). No horizontal overflow, one H1, no visible failed images and no active fallback frames. Ensis build also checked at 390 px.
- Native image dialog: enlarged Rellana screenshot loaded, close button received focus, Escape closed the dialog, and focus returned to the triggering image button.
- Desktop home, mobile home, boss catalogue, enlarged Rellana and mobile Ensis build visually inspected. Browser console had no warnings/errors in this check.
- Browser viewport overrides were reset after responsive testing. Preview tab and loopback server are closed after work, as requested.

Image use is editorial identification; build images identify their primary weapon and do not establish in-game testing. Selected source icons are 200 px; existing resolution is preserved. Game images are excluded from the software MIT license and are not represented as freely licensed. See IMAGE_SOURCES.md. Public GitHub source publication is separate from a public website deployment.
