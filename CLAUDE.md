# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Critical: Next.js version

This project pins a Next.js version (`16.2.6`) that is newer than your training data and has breaking changes to APIs, conventions, and file structure. Before writing any Next.js-specific code (routing, data fetching, config, metadata, etc.), read the relevant guide under `node_modules/next/dist/docs/` (`01-app`, `02-pages`, `03-architecture`). Heed any deprecation notices found there. Do not assume prior Next.js knowledge is current.

## Commands

Package manager is Bun (`bun.lock` present).

- `bun run dev` — start dev server
- `bun run build` — production build
- `bun run typecheck` — `tsc --noEmit`
- `bun run lint` — ESLint
- `bun run format` / `bun run format:check` — Prettier
- `bun run check` — lint + typecheck (run before considering a task done)

No test suite is configured in this repo.

Husky + lint-staged run on commit: staged `.{js,jsx,ts,tsx}` get `eslint --fix` + `prettier --write`; staged `.{json,md,mdx,css,scss,yml,yaml}` get `prettier --write`.

## Architecture

Next.js App Router portfolio site using shadcn/ui (`style: radix-nova`, baseColor `zinc`, iconLibrary `lucide`) and Tailwind v4.

- `app/` — routes, root `layout.tsx`, global styles (`globals.css`)
- `components/ui/` — shadcn-generated primitives; add more via `npx shadcn@latest add <component>`, don't hand-roll
- `components/portfolio/` — page-specific sections (hero, etc.)
- `components/layout/` — chrome shared across pages (header, etc.)
- `components/animated/` — reusable GSAP-driven animation wrappers (e.g. `FadeIn`, `WordSequenceText`)
- `components/providers/app-provider.tsx` — single client-side provider composition root (theme, tooltip, etc.), mounted once in `app/layout.tsx`
- `lib/animations/` — shared animation layer: `gsap.ts` re-exports a `useGSAP`-registered `gsap` instance (always import gsap from here, not directly from `"gsap"`), `constants.ts` holds shared durations/eases/stagger values, `reduced-motion.ts` provides `prefersReducedMotion()`
- `lib/utils.ts` — `cn()` helper (clsx + tailwind-merge)
- Path alias `@/*` maps to repo root (see `tsconfig.json`, mirrored in `components.json` aliases)

### Animation conventions

Animation components are client components (`"use client"`) that use `useGSAP` with a `scope` ref rather than raw `useEffect`. They check `prefersReducedMotion()` and short-circuit to `gsap.set(..., { clearProps: "all" })` when true, rather than skipping the effect — this avoids animation-only inline styles persisting when motion is disabled. Reuse `animationDurations`, `animationEases`, and `animationStaggers` from `lib/animations/constants.ts` instead of hardcoding timing values.

## Formatting

Prettier config: no semicolons, double quotes, 2-space tabs, `es5` trailing commas, 80 print width, `prettier-plugin-tailwindcss` (also sorts classes inside `cn()` and `cva()` calls).
