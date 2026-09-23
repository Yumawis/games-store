# Games Store — Frontend

Client application for browsing, creating, and managing games in the
Games Store catalog.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| UI library | React 19 |
| Language | TypeScript 6 (strict mode) |
| Styling | Tailwind CSS v4 |
| Components | shadcn/ui (Button, Card, Dialog, Input, Label) |
| Data fetching | TanStack Query v5 |
| Forms | React Hook Form + Zod (game form), Formik + Zod (auth) |
| Linting/Formatting | Biome 2 |
| Package manager | pnpm 10 |

React Compiler is enabled via `next.config.ts` (`reactCompiler: true`).

## Prerequisites

- Node.js 20.19+
- pnpm 10.26+ (pinned via `packageManager` in `package.json`)

## Installation

```bash
cd frontend
pnpm install
```

## Environment Variables

Copy the example file and adjust values as needed:

```bash
cp .env.example .env.local
```

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_GAMES_STORE_API_URL` | Base URL of the Games Store API |

No other environment variables are required.

## Development

```bash
pnpm dev
```

Starts the Next.js dev server (default port 3000).

## Commands

| Command | Action |
|---------|--------|
| `pnpm dev` | Start dev server |
| `pnpm build` | Production build |
| `pnpm start` | Serve production build |
| `pnpm lint` | Lint with Biome |
| `pnpm lint:fix` | Lint and auto-fix |
| `pnpm format` | Format with Biome |
| `pnpm format:check` | Check formatting |
| `pnpm check` | Lint + format check |
| `pnpm check:fix` | Apply safe Biome fixes |
| `pnpm exec tsc --noEmit` | Type-check (no dedicated script) |

> **Note:** Biome scripts target `./app ./lib ./api ./types`.
> `./components` and `./hooks` are not covered by these scripts.

## Project Structure

```
frontend/
├── app/                  # Next.js App Router pages and layout
│   ├── layout.tsx        # Root layout (Providers + AppHeader)
│   ├── page.tsx          # Home page (games list)
│   ├── providers.tsx     # QueryClientProvider + AuthProvider
│   ├── login/page.tsx    # Login page
│   ├── register/page.tsx # Register page
│   └── globals.css       # Tailwind v4 + shadcn theme tokens
├── components/
│   ├── auth/             # ProtectedRoute guard
│   ├── common/           # AppHeader
│   ├── game/             # GameCard, AddGameDialog
│   └── ui/               # shadcn/ui primitives
├── hooks/                # TanStack Query hooks
├── lib/                  # Auth context, API client, Zod schemas, utils
├── api/                  # API endpoint functions and query keys
├── types/                # TypeScript interfaces
├── next.config.ts
├── tsconfig.json
├── biome.json
├── postcss.config.mjs
└── components.json       # shadcn/ui config
```
