# Games Store Backend

REST API for the Games Store application, built with NestJS and MongoDB
(Mongoose). It exposes user authentication (JWT) and a protected game catalog,
along with an interactive API reference served through Scalar.

## Features

- User registration and login with JWT-based authentication.
- Passwords hashed with bcrypt (10 salt rounds).
- Protected game catalog: create and list games.
- Request validation via `class-validator` with whitelist properties and rejection of non-whitelist fields.
- Uniform error responses through a global exception filter.
- CORS support configurable via environment variables.
- Interactive API documentation (Swagger/OpenAPI + Scalar).

## Requirements

- Node.js 20+
- pnpm 10+
- A running MongoDB instance (local or remote)

## Installation

```bash
pnpm install
```

Copy the environment template and adjust the values:

```bash
cp .env.example .env
```

## Environment Variables

| Variable         | Default                                | Description                              |
| ---------------- | -------------------------------------- | ---------------------------------------- |
| `PORT`           | `4000`                                 | HTTP port the server listens on          |
| `DATA_BASE_URL`  | `mongodb://localhost:27017/games-store`| MongoDB connection URI                   |
| `JWT_SECRET`     | *(set your own)*                       | Secret used to sign JWT tokens           |
| `JWT_EXPIRES_IN` | `7d`                                   | JWT token lifetime                       |
| `ALLOWED_CORS`   | `http://localhost:3000`                | Comma-separated list of allowed origins  |

## Running the Application

| Command            | Action                                   |
| ------------------ | ---------------------------------------- |
| `pnpm start`       | Run the application from source          |
| `pnpm start:dev`   | Run in watch mode (development)          |
| `pnpm start:debug` | Run in watch mode with debugger          |
| `pnpm start:prod`  | Run the compiled output in `dist/`       |
| `pnpm build`       | Compile the project to `dist/`           |

Once running, the server is available at `http://localhost:4000`.

## API Documentation

Swagger generates the OpenAPI specification of the API, and Scalar renders it
as the interactive API reference:

- Documentation: `http://localhost:4000/docs`
- API base URL: `http://localhost:4000/api/v1/games-store`

All routes are grouped under tags in the reference UI. Scalar contains the
complete API reference, including the full endpoint list, request/response
schemas, and an `Authorize` button for the JWT bearer token.

## API Overview

| Resource       | Method | Endpoint        | Authentication |
| -------------- | ------ | --------------- | -------------- |
| Registration   | POST   | `/auth/register`| None           |
| Login          | POST   | `/auth/login`   | None           |
| Create game    | POST   | `/games/create` | Bearer token   |
| List games     | GET    | `/games`        | Bearer token   |

For detailed request and response schemas and endpoint details, refer to the
interactive documentation in Scalar.

## Authentication

The API authenticates users with JWT bearer tokens. Successful login returns a
token that must be sent on protected routes as an `Authorization: Bearer
<token>` header. Passwords are stored hashed with bcrypt and never returned by
the API. The token payload carries the user `id` and `email`.

## Development and Code Quality

Code quality and formatting are managed with Biome, and Git hooks are set up
with Husky and lint-staged:

| Command              | Action                                     |
| -------------------- | ------------------------------------------ |
| `pnpm format`        | Format the source with Biome               |
| `pnpm format:check`  | Verify formatting without modifying files  |
| `pnpm lint`          | Lint the source with Biome                 |
| `pnpm lint:fix`      | Lint and apply safe fixes                  |
| `pnpm check`         | Lint + format check                        |
| `pnpm check:fix`     | Apply safe Biome fixes                     |

A `pre-commit` hook (Husky) runs `lint-staged`, which lints and formats only
the staged files before each commit.