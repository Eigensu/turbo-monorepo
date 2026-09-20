<!-- Keep it short. Delete any section that does not apply. -->

## Summary

<!-- What changed, in a sentence or three. -->

## Motivation / context

<!-- Why this change exists. Link the issue it closes: "Closes #12" closes it on merge. -->

## Affected workspaces

- [ ] `apps/web`
- [ ] `apps/backend`
- [ ] `packages/*` (shared ESLint config, shared tsconfig)
- [ ] Root tooling (CI, Turborepo, Prettier, Husky, env)

## How to test

<!-- The exact steps a reviewer runs to verify this, for example:

pnpm install
pnpm dev     # web on http://localhost:3000, API on http://localhost:4000
-->

## Checklist

- [ ] Self-reviewed the diff
- [ ] `pnpm lint`, `pnpm type-check` and `pnpm test` pass locally
- [ ] Tests added or updated where behaviour changed
- [ ] README updated if setup or usage changed
- [ ] New environment variables added to the root `.env.example`
