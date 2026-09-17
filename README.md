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
```

## Layout

- `apps/backend`: NestJS service on port 4000
- `apps/web`: Next.js frontend on port 3000
- `packages/tsconfig`: shared TypeScript compiler settings
