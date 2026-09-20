# NestJS + Next.js Monorepo Template

A small pnpm workspace managed by Turborepo, with a NestJS API and a Next.js App Router frontend.

## Requirements

- Node.js 20+
- pnpm 9+

## Getting started

```bash
pnpm install
cp .env.example .env
pnpm dev
```

The frontend runs at `http://localhost:3000` and the backend health endpoint runs at `http://localhost:4000/`.

Run the other workspace tasks with:

```bash
pnpm build
pnpm lint
pnpm type-check
pnpm test
pnpm test:e2e
pnpm format
pnpm format:check
```

Commits automatically run Prettier and ESLint on staged files, followed by a
workspace type-check. Pull requests and pushes run the same checks plus the
test suites and the production build through GitHub Actions.

## Environment

The workspace has one environment file, `.env` at the repo root — there are no
per-app env files. Copy the example and edit it:

```bash
cp .env.example .env
```

`scripts/with-env.mjs` loads that file before starting either app, so the same
values reach the Next.js frontend and the NestJS API. Variables already set in
the surrounding environment win over the file, so a one-off `PORT=5000 pnpm dev`
still works and CI keeps using the values it injects.

Add every new variable to `.env.example`, with a comment describing it and a
safe default. `.env` itself is gitignored. Remember that `NEXT_PUBLIC_*` values
are inlined into the frontend bundle at build time, so changing one means
rebuilding.

## Tests

The backend is covered by Jest. Unit specs live beside the code they cover in
`apps/backend/src`, and end-to-end specs live in `apps/backend/test`, where
supertest drives the running Nest application over HTTP.

```bash
pnpm --filter backend test          # unit specs
pnpm --filter backend test:watch    # unit specs, watch mode
pnpm --filter backend test:cov      # unit specs with coverage
pnpm --filter backend test:e2e      # end-to-end specs
```

## Layout

- `apps/backend`: NestJS service on port 4000
- `apps/web`: Next.js frontend on port 3000
- `packages/eslint-config`: shared ESLint flat config
- `packages/tsconfig`: shared TypeScript compiler settings
- `scripts/with-env.mjs`: loads the root `.env` for the app `dev`, `build` and `start` scripts
