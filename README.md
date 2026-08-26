# Doomsday Daily

An unofficial, static React/TypeScript countdown, daily challenge and source-conscious fan-analysis site. It uses no backend, account system or visitor-facing content API.

## Structure

- `src/components`: countdown, atmosphere, AdSense, trivia, games and shared shell
- `src/lib`: deterministic IST dates, storage and milestone utilities
- `src/data`: typed, reviewed trivia/game banks and editorial articles
- `src/pages`: home and content routes
- `content/drafts`: unpublished supervised Markdown drafts only
- `scripts/validate-drafts.mjs`: structural and safety checks (not factual verification)
- `public`: `CNAME`, `ads.txt`, robots and sitemap

## Local development and QA

```sh
npm ci
npm run dev
npm run lint
npm run typecheck
npm test
npm run build
npm run preview
```

Vite uses relative asset URLs so the build works at the custom-domain root and the GitHub project path. The application normalizes `/doomsday-countdown/` when resolving a client route. For genuinely refreshable clean routes, the deployment host must serve the generated fallback or matching static route files; GitHub Pages otherwise returns its own 404 before the SPA loads. The current implementation keeps stable routes and includes a client 404 without adding an SSR backend.

## Content authoring

`TriviaQuestion` in `src/data/trivia.ts` requires an ID, four options, one correct index, an original explanation, difficulty, category, confirmation/context status, review date and preferably a direct source. Never infer a film plot from comic context.

Games in `src/data/games.ts` use one of four named modes, a prompt, clues, answer choices, correct index and explanation. `scoreGame` owns scoring. All ordinary rotation is computed in-browser from `YYYY-MM-DD` in `Asia/Kolkata`, hashed with a feature salt, and therefore changes at IST midnight without randomness, Actions or a server. Answers and scores use guarded localStorage only.

Articles are typed records in `src/data/articles.ts` with slug, title, description, byline, publish/update dates, category, reading time, label, spoiler state, sections and source list. Keep confirmation, historical context and analysis explicit. Update `public/sitemap.xml` for a new stable route and follow the correction process: reproduce the issue, inspect an authoritative direct source, amend the claim and sources, advance `updated`, then request human review.

Milestones are presentation-only records in `src/lib/milestones.ts`. In local development, `VITE_MILESTONE_OVERRIDE=7-days` previews a phase; it never changes countdown math.

## Environment and advertising

The AdSense Auto ads script loads on every route, allowing account-level Auto ads to operate without a manual ad slot. Copy `.env.example` to `.env.local` to configure optional manual units: `VITE_ADSENSE_SLOT` accepts the numeric responsive display slot created in the AdSense account. If the slot is absent or invalid, no manual unit is emitted in production; development displays a clearly labelled preview. The publisher ID remains `ca-pub-9395184812907805`, and `public/ads.txt` is authoritative. `VITE_CONTACT_URL` may be a reviewed HTTPS contact destination. Never put API keys in any `VITE_*` variable.

## Supervised drafting workflow

`.github/workflows/content-draft.yml` declares manual and Tuesday/Friday 01:17 UTC (06:47 IST) triggers, but generation is intentionally disabled: scheduled runs do not pass the opt-in condition, and the generation step stops before paid API use. Manually choose **Actions → Supervised content draft → Run workflow**, type `ENABLE`, and only enable the provider call after approving its implementation and cost. Required GitHub Secrets are `OPENAI_API_KEY` and `CONTENT_MODEL`; they are server-side only. GitHub may disable schedules after prolonged public-repository inactivity, while manual dispatch remains available.

The workflow may change only `content/drafts/`, opens a branch/PR (never merge or approval), and requests `content-draft` and `human-review-required` labels. Validation rejects missing frontmatter/sources, duplicate slugs, unsafe links/scripts, forbidden affiliation/ad-click phrases, and drafts below 300 words. Human review must still verify every fact and URL, originality, uncertainty, continuity labels, spoilers, dates, names and quotations before moving content into the published data file.

## Deployment

`public/CNAME` must remain `doomsday.cfd`; do not alter DNS here. GitHub Pages deploys `dist` through `.github/workflows/deploy-pages.yml`. Preserve `base: './'`, `ads.txt`, Pages permissions and HTTPS custom-domain enforcement in repository settings. Run the full QA sequence and inspect direct-route behaviour on both `https://doomsday.cfd` and the GitHub project URL before publication.
