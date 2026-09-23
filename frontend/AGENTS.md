# games-store frontend

## Development

Run from `frontend/`:

| Command | Action |
| ------- | ------ |
| `pnpm dev` | Next.js dev server (Turbopack, port 3000) |
| `pnpm build` | Production build |
| `pnpm start` | Serve production build |
| `pnpm check` | Lint + format check (Biome) |
| `pnpm check:fix` | Apply safe Biome fixes |
| `pnpm exec tsc --noEmit` | Type-check only (no dedicated script) |

Note: Biome scripts target `./app ./lib ./api ./types`; `./components` and
`./hooks` are not covered by them (use `lint-staged` via commit hooks for those).

## Constraints

- **Next.js App Router** — pages under `app/`, not React Router.
- **TypeScript strict** — no JavaScript/JSX; all source is `.ts`/`.tsx`.
- **React Compiler** enabled via `next.config.ts` (`reactCompiler: true`).
- **Biome** for linting/formatting (not ESLint/Prettier); config in `biome.json`.
- **No tests** configured — cannot run test suite.
- API URL via `NEXT_PUBLIC_GAMES_STORE_API_URL` in `.env.local`.
- Game images stored as **base64 strings** (rendered as `data:image/png;base64,...`).
- Do not introduce technologies or patterns from the previous architecture
  (Vite, Redux/RTK Query, MUI/Emotion, React Router, `src/`).

## Architecture

- **Entry**: `app/layout.tsx` → `app/page.tsx` (Providers + AppHeader).
- **Routing**: App Router — `/` (games list), `/login`, `/register`.
- **State**: TanStack Query for server state (`app/providers.tsx` wraps
  `QueryClientProvider` + `AuthProvider`).
- **API**: `lib/api-client.ts` (fetch wrapper with Bearer token + 401 handling);
  endpoint functions in `api/{auth,games}.ts`; query keys in `api/keys.ts`.
  Response shape: `ApiResponse<T>` (`.message`, `.result`).
- **Auth**: JWT in localStorage via `lib/auth-context.tsx`; route guard in
  `components/auth/protected-route.tsx`.
- **Components**: `components/{ui,common,game,auth}/`
  - `ui/` — shadcn/ui primitives (Button, Card, Dialog, Input, Label)
  - `common/app-header.tsx` — header with auth + "Agregar juego"
  - `game/game-card.tsx`, `game/add-game-dialog.tsx` — game UI
  - `auth/protected-route.tsx` — client-side auth guard
- **Hooks**: `hooks/use-games.ts`, `hooks/use-login.ts`, `hooks/use-register.ts`.
- **Schemas**: `lib/schemas/{auth,game}.ts` — Zod schemas.
- **Types**: `types/{api,auth,game,user}.ts` — TypeScript interfaces.
- **Path alias**: `@/*` maps to project root (configured in `tsconfig.json`).

## Conventions

- Biome: 2-space indent, single quotes, semicolons as needed, line width 80.
- **shadcn/ui + Tailwind CSS v4** for UI (not MUI/Emotion).
- Prefer arrow functions for new components and hooks, following the existing code style where applicable.
- React 19 `use()` hook for consuming context (not `useContext()`).
- TanStack Query hooks: `useGames`, `useCreateGame`, `useLogin`, `useRegister`.
- Error handling: inline error banners (`text-destructive`); **no `alert()`**.
- Auth forms use **Formik + Zod**; game form uses **React Hook Form + Zod**.
