# games-store backend

NestJS + Mongoose (TypeScript) REST API.

## Commands

Run from `backend/`:

| Command              | Action                         |
| -------------------- | ------------------------------ |
| `pnpm build`         | Compile to `dist/`             |
| `pnpm start`         | Run from source                |
| `pnpm start:dev`     | Watch mode (on port 4000)      |
| `pnpm start:prod`    | Run compiled `dist/main.js`    |
| `pnpm format`        | Format with Prettier           |

There are no tests or linter configured.

## API

Prefix (global): `/api/v1/games-store`

| Method | Path          | Auth | Action           |
| ------ | ------------- | ---- | ---------------- |
| POST   | `/auth/register` | no   | Register user    |
| POST   | `/auth/login`    | no   | Login, get JWT   |
| POST   | `/games/create`  | yes  | Create a game    |
| GET    | `/games`         | yes  | List all games   |

Assemble normally. Success responses use `{ message, result }`. Errors are raised as
NestJS HTTP exceptions and formatted by the global filter
(`src/common/filters/all-exceptions.filter.ts`) as
`{ data: { message, error?, errors? } }` with standard status codes
(400 invalid input, 401 unauthorized, 409 conflict, 500 internal).

The `games` routes are protected by `JwtAuthGuard`
(`src/common/guards/jwt-auth.guard.ts`); send `Authorization: Bearer <token>`.

## Configuration

Managed by `@nestjs/config` (`src/config/configuration.ts`) reading `.env`.

| Variable          | Default                              | Notes               |
| ----------------- | ------------------------------------ | ------------------- |
| `PORT`            | `4000`                               | HTTP port           |
| `DATA_BASE_URL`   | `mongodb://127.0.0.1:27017/games-store` | MongoDB URI        |
| `JWT_SECRET`      | `fallback-secret`                    | JWT signing secret  |
| `JWT_EXPIRES_IN`  | `7d`                                 | Token lifetime      |
| `ALLOWED_CORS`    | `http://localhost:3000`              | Comma-separated origins |

Entrypoint: `src/main.ts` (sets global prefix, CORS, global pipe & filter).
Root module: `src/app.module.ts`.

## Structure

Feature-based modules under `src/modules/`:

- `users/` — `User` schema, `UsersService` (also exports hashing)
- `auth/` — `AuthController`, `AuthService`, DTOs, JWT registration
- `games/` — `GamesController`, `GamesService`, DTO, schema

Shared infra in `src/common/`: guards, filters, pipes, decorators, constants,
services.

## Models

### Game (`src/modules/games/schemas/game.schema.ts`)

| Field          | Type   | Notes                                    |
| -------------- | ------ | ---------------------------------------- |
| `name`         | String | unique, required                         |
| `creationDate` | String | required                                 |
| `categoryType` | String | enum: `Deportes` / `Terror` / `Aventura` |
| `imageBase64`  | String | optional                                 |

### User (`src/modules/users/schemas/user.schema.ts`)

`names`, `lastNames`, `email` (unique, lowercased), `password` (select:false,
hashed with bcrypt).

Categories catalogue in `src/common/constants/category.ts`
(`CATEGORY`, `CATEGORY_VALUES`).