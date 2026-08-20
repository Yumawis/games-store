# games-store frontend

## Development

Run from `frontend/`:

| Command        | Action                    |
| -------------- | ------------------------- |
| `pnpm dev`     | Vite dev server (port 3000) |
| `pnpm build`   | Production build          |
| `pnpm check`   | Lint + format check       |
| `pnpm check:fix` | Apply safe Biome fixes  |

## Constraints

- **React Compiler** enabled (via `babel-plugin-react-compiler` in `vite.config.js`)
- **Biome** for linting/formatting (not ESLint/Prettier); config in `biome.json`
- **JavaScript/JSX only** — no TypeScript on frontend
- **No tests** configured — cannot run test suite
- Game images stored as **base64 strings** in MongoDB (rendered as `data:image/png;base64,...`)
- API URL configured via `src/config/app.config.json` (not `.env`)

## Architecture

- **Entry**: `src/main.jsx` → `src/App.jsx` (Redux Provider + BrowserRouter)
- **Routing**: Single route (`/`) wrapped in `MainLayout` via `src/routes/AppRoutes.jsx`
  - `ROUTES.CREATE_GAME` defined in constants but not used as a route
  - Game creation happens via modal (`AddGameModal`), not a separate route
- **State**: Redux Toolkit with RTK Query (`src/store/`)
  - `src/store/baseApi.js` — base API slice with `fetchBaseQuery({ baseUrl: API_URL })`
  - `src/store/index.js` — configureStore with `baseApi.middleware`
- **API Services**: Injected endpoints pattern
  - `src/services/gameService.js` — `createGame` (mutation), `getAllGames` (query)
  - Response format: `response?.data?.result`
  - Error format: `response?.data`
- **Components**: Feature-based structure under `src/components/`
  - `cards/CardGame.jsx` — renders game card with base64 image
  - `common/AppHeader.jsx` — header with "Agregar juego" button
  - `layouts/MainLayout.jsx` — wraps routes, manages modal state
  - `modals/AddGameModal.jsx` — Formik form for creating games
- **Forms**: Formik (not React Hook Form); fields: `name`, `creationDate`, `categoryType`
- **Constants**:
  - `src/constants/category.js` — `CATEGORY` enum: `Deportes`, `Terror`, `Aventura`
  - `src/constants/routes.js` — `ROUTES` object: `GAMES: '/'`, `CREATE_GAME: '/create-game'` (unused)

## Conventions

- Biome: 2-space indent, single quotes, semicolons as needed, line width 80
- MUI styled components pattern: `styled(Box)(({ theme }) => ({...}))`
- RTK Query hooks: `useGetAllGamesQuery`, `useCreateGameMutation`
- Error handling: `alert(error?.data?.message)` on mutation failure
