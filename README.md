# Clrposture — Web App

> NIST CSF 2.0 compliance assessments for SMEs — free, no account required.

This is the Phase 1 web application for [Clrposture](https://github.com/clrposture). It walks any SME through all 106 NIST CSF 2.0 subcategories and produces a prioritized gap report in under 30 minutes, entirely in the browser.

Assessment data is stored in `localStorage` — nothing is sent to any server.

---

## What it does

1. **Industry selection** — choose from fintech, healthcare, federal contractor, DIB, or MSSP to load the matching compliance target profile
2. **Six-function wizard** — step through Govern → Identify → Protect → Detect → Respond → Recover, answering each subcategory with a plain-language Tier 1–4 question
3. **Gap report** — see your tier score per function and a remediation plan bucketed by urgency (immediate / short-term / strategic)

The scoring and gap analysis are powered by [`@clrposture/core`](https://github.com/clrposture/clrposture-core), the open-source library published separately on npm.

---

## Tech stack

| Concern | Choice |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| Styling | Tailwind CSS 4 |
| Language | TypeScript 6 |
| Testing | Vitest 3 + Testing Library |
| Package manager | pnpm 9 |
| Node target | 22+ |
| Assessment engine | `@clrposture/core` (npm) |

---

## Getting started

**Prerequisites:** Node 22+, pnpm 9+

```bash
git clone https://github.com/clrposture/clrposture-app.git
cd clrposture-app
pnpm install
cp .env.local.example .env.local   # add your PostHog key (optional — analytics disabled without it)
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment variables

| Variable | Required | Description |
|---|---|---|
| `NEXT_PUBLIC_POSTHOG_KEY` | No | PostHog project API key — analytics disabled when absent |
| `NEXT_PUBLIC_POSTHOG_HOST` | No | PostHog ingest host (default: `https://us.i.posthog.com`) |

Get a free PostHog key at [posthog.com](https://posthog.com) (generous free tier, open source).

---

## Available scripts

| Command | Description |
|---|---|
| `pnpm dev` | Start development server with Turbopack |
| `pnpm build` | Production build |
| `pnpm start` | Start production server |
| `pnpm test` | Run all tests (Vitest) |
| `pnpm test:watch` | Run tests in watch mode |
| `pnpm lint` | Run ESLint |

---

## Project structure

```
src/
├── app/
│   ├── layout.tsx              Root layout — mounts AssessmentProvider
│   ├── page.tsx                Landing page
│   ├── assess/
│   │   ├── page.tsx            Industry selection (step 1)
│   │   └── [functionId]/
│   │       └── page.tsx        Question wizard — one page per CSF function
│   └── results/
│       └── page.tsx            Gap report and remediation plan
├── components/
│   ├── ProgressBar.tsx         Step indicator across 6 functions
│   └── TierRadio.tsx           Tier 1–4 radio group with descriptions
└── lib/
    ├── assessment-context.tsx  React context — wraps store, exposes actions
    ├── assessment-store.ts     Pure store type and helper functions
    ├── storage.ts              localStorage persistence utilities
    └── __tests__/              Vitest unit tests
```

---

## Architecture decisions

**Why localStorage and not a database?**
Phase 1 is intentionally zero-backend. No account, no server, no data retention. This lowers the barrier to first use and makes the privacy story trivial. Persistence moves to Supabase in Phase 2 when auth is added.

**Why a separate `@clrposture/core` package?**
The scoring engine, question bank, and gap analyzer are framework-agnostic. Publishing them separately as an MIT-licensed npm package means the CLI tool, the web app, and any future integrations all share one source of truth.

**Why one function per page?**
106 questions on a single page is overwhelming. One-function-per-page (Option B) breaks the work into six 10–20 minute segments with clear progress, matching how security reviews are actually done in practice.

**SSR safety**
`AssessmentProvider` defers `localStorage` reads to a `useEffect` so Next.js can statically generate all pages without hitting `localStorage is not defined` during build.

---

## Regulatory context

Clrposture is built on NIST CSF 2.0 (published February 2024). The framework and the compliance pressures it responds to include:

- **EO 14144** (Jan 2025) — Strengthening and Promoting Innovation in the Nation's Cybersecurity; directs federal contractors to align with NIST CSF
- **CMMC 2.0** — DoD Cybersecurity Maturity Model Certification; required for defense industrial base contractors handling CUI
- **HIPAA Security Rule** — HHS requirement for healthcare organizations handling electronic PHI
- **NIST SP 800-171** — Protecting CUI in non-federal systems; referenced by DFARS 252.204-7012

---

## Deploying to Vercel

1. Push this repo to GitHub (already done at `clrposture/clrposture-app`)
2. Go to [vercel.com/new](https://vercel.com/new), import the `clrposture/clrposture-app` repo
3. Vercel auto-detects Next.js — no framework settings to change
4. Add environment variables in the Vercel dashboard:
   - `NEXT_PUBLIC_POSTHOG_KEY` — your PostHog project key
5. Deploy

Every push to `main` redeploys automatically.

---

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md).

---

## License

MIT — see [LICENSE](LICENSE).

Part of the [Clrposture](https://github.com/clrposture) open-source project.
