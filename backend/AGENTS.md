# games-store backend

Express + Mongoose API (CommonJS).

## Commands

Run from `backend/`:

| Command    | Action                           |
| ---------- | -------------------------------- |
| `pnpm dev` | `nodemon server.js` on port 4000 |

No tests, typecheck, linter or formatter.

## API

Prefix: `/api/v1/games-store`

| Method | Path            | Action         |
| ------ | --------------- | -------------- |
| GET    | `/games`        | List all games |
| POST   | `/games/create` | Create a game  |

Errors return status 420 with `{ data: { message, error } }`.

## Setup

- Requires MongoDB at `DATA_BASE_URL` in `.env` (default `mongodb://127.0.0.1:27017/games-store`)
- Config: `src/config/app.config.json` — `PORT` (4000), `ALLOWED_CORS` (`["http://localhost:3000"]`)
- Entrypoint: `src/server.js`

## Model

`Game` (`src/models/Game.js`):

| Field          | Type   | Notes                                    |
| -------------- | ------ | ---------------------------------------- |
| `name`         | String | unique, required                         |
| `creationDate` | String | required                                 |
| `categoryType` | String | enum: `Deportes` / `Terror` / `Aventura` |
| `imageBase64`  | String | optional                                 |

Categories constant in `src/constants/category.js` (`CATEGORY.SPORTS`, `CATEGORY.TERROR`, `CATEGORY.ADVENTURE`).
