# NestJS + Next.js Monorepo Template

A small pnpm workspace managed by Turborepo, with a NestJS API and a Next.js App Router frontend.

## Requirements

- Node.js 20+
- pnpm 9+

## Getting started

```bash
pnpm install
pnpm dev
```

The frontend runs at `http://localhost:3000` and the backend health endpoint runs at `http://localhost:4000/`.

Run the other workspace tasks with:

```bash
pnpm build
pnpm lint
pnpm type-check
pnpm format
pnpm format:check
```

Commits automatically run Prettier and ESLint on staged files, followed by a
workspace type-check. Pull requests and pushes run the same checks plus the
production build through GitHub Actions.

## Layout

- `apps/backend`: NestJS service on port 4000
- `apps/web`: Next.js frontend on port 3000
- `packages/eslint-config`: shared ESLint flat config
- `packages/tsconfig`: shared TypeScript compiler settings
