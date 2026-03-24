# Changelog

All notable changes to this project will be documented here.

Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

---

## [Unreleased] — Phase 1 MVP

### Added

- **PostHog analytics** — privacy-friendly event tracking; four events instrumented: `assessment_started` (industry selected), `function_completed` (function wizard page advanced), `assessment_completed` (results page loaded, with gap counts and weakest function), `export_clicked` (CSV/Markdown/PDF downloaded). Analytics disabled when `NEXT_PUBLIC_POSTHOG_KEY` is absent. `$pageview` fired manually on every App Router navigation via `NavigationEvents` component.
- **Vercel deploy configuration** — `vercel.json` with pnpm build/install commands; `.env.local.example` documents required env vars.
- **Landing page** (`/`) — hero section with feature highlights and call-to-action
- **Industry selection** (`/assess`) — pick from fintech, healthcare, federal contractor, DIB, or MSSP to load the matching NIST CSF 2.0 target profile
- **Assessment wizard** (`/assess/[functionId]`) — one page per CSF function (GV → ID → PR → DE → RS → RC), 106 subcategories total, each with a plain-language Tier 1–4 radio question
- **Gap report** (`/results`) — tier scores by function and a remediation plan bucketed by urgency: immediate (gap ≥ 3), short-term (gap = 2), strategic (gap = 1)
- **ProgressBar component** — step indicator showing position across the 6 functions
- **TierRadio component** — accessible radio group rendering the four tier descriptions from `@clrposture/core`
- **AssessmentContext** — React context wrapping `AssessmentStore`; SSR-safe localStorage persistence via `useEffect` hydration
- **storage.ts** — `saveAssessment`, `loadAssessment`, `clearAssessment` with corrupt-JSON guard
- **20 unit tests** — covering storage round-trip, context state transitions, and localStorage persistence/reset behaviour
- **CI pipeline** — GitHub Actions: lint → test → build on every push/PR to `main`
- Initial project scaffold: Next.js 16, Tailwind CSS 4, TypeScript 6, Vitest 3, pnpm 9
