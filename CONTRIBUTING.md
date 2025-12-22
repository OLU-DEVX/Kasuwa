# Contributing to Kasuwa

Welcome! Kasuwa is an open-source marketplace and we love community
contributions. This guide explains how to get a change merged with minimum
back-and-forth.

## Before you start

1. **Read the architecture overview** in `ARCHITECTURE.md` so you know which
   layer your change belongs in.
2. **Check existing issues** before opening a new one — duplicates are
   common for popular features.
3. **Open an issue first** for non-trivial work so we can agree on the
   approach before you spend time on it.

Please note we have a
[Code of Conduct](./CODE_OF_CONDUCT.md), please follow it in all
your interactions with the project.

## Local setup

```bash
nvm use            # picks up Node 20.x from .nvmrc
npm install
cp .env.example .env.local
npm run dev
```

Visit http://localhost:3000 and you should see the marketplace home page.

## Branch + commit conventions

- Branch off `main`. Use kebab-case branch names: `feat/cart-discount-codes`.
- Commit messages follow [Conventional Commits](https://www.conventionalcommits.org/).
  Common prefixes:

  | Prefix      | When to use                                          |
  |-------------|------------------------------------------------------|
  | `feat:`     | A user-visible feature or new helper                 |
  | `fix:`      | A bug fix                                            |
  | `refactor:` | Internal restructure without behaviour change        |
  | `perf:`     | Performance work                                     |
  | `docs:`     | README / inline / API docs                           |
  | `test:`     | Adding or fixing tests / type assertions             |
  | `chore:`    | Tooling, config, deps                                |
  | `style:`    | Formatting, whitespace, no logic                     |

- Keep commits **small and self-contained**. A reviewer should be able to
  reason about one commit at a time.
- Reference the issue (`Closes #123`) in the PR description, not in every
  commit subject.

## Code style

- TypeScript is `strict`, with `noUnusedLocals` and
  `exactOptionalPropertyTypes` on. Run `npx tsc --noEmit` before opening a
  PR.
- ESLint is configured via `next/core-web-vitals`. Run `npm run lint`.
- Prettier handles formatting — `npx prettier --write .` if your editor
  isn't already wired up.
- Don't introduce new `console.*` calls; use `lib/logger.ts` instead.
- Use the existing helpers in `lib/` for currency, dates, storage, and
  fetching. If you're tempted to copy a pattern, extract it into `lib/`
  first.

## Tests

We don't yet have a runtime test runner. Until we do, prefer **compile-time
assertions** in `lib/__tests__/*.test.ts` for helper behaviour — see
`lib/__tests__/format.test.ts` for a worked example.

## Pull request expectations

- CI must be green (`tsc`, `lint`, `build`).
- `CHANGELOG.md` is updated for anything a user can observe.
- New environment variables are documented in `.env.example`.
- Screenshots/GIFs in the PR description for UI changes.

## Reporting security issues

Please do **not** open public issues for security bugs. See `SECURITY.md`
for the responsible disclosure process.
