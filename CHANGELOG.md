# Changelog

All notable changes to this project will be documented in this file. The
format roughly follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/)
and the project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html)
once we cut a `1.0.0` release.

## [Unreleased]

### Added

- `lib/api.ts` — typed `fetch` wrapper with timeout, retry, and structured
  `ApiError` exceptions.
- `lib/constants.ts` — single source of truth for API base URL, route paths,
  category list, and limits like `LOW_STOCK_THRESHOLD`.
- `lib/format.ts` — NGN currency, two-digit pad, and `HH:MM:SS` duration
  formatters.
- `lib/storage.ts` — SSR-safe typed wrapper around `localStorage` plus a
  shared `StorageKeys` registry.
- `lib/stock.ts` — discriminated stock status (`out` / `low` / `in`) with
  matching label and colour helpers.
- `lib/pricing.ts` — order totals calculator that handles subtotal, delivery
  fee, and discount in one place.
- `lib/discount.ts` — typed discount code resolver with three built-in
  promo codes (`WELCOME10`, `FREESHIP`, `BULK5`).
- `lib/useDebounce.ts` — debounce hook applied to the nav search input.
- `lib/types.ts` — shared `Product`, `CartItem`, `User`, `Farmer` types.
- `.env.example`, `.nvmrc`, `.editorconfig` for new-contributor onboarding.
- `ARCHITECTURE.md` and `SECURITY.md` documents.

### Changed

- `pages/_app.tsx` now uses the typed API client and storage helpers; cart
  state is typed as `CartItem[]`.
- `components/productCard.tsx` and `components/cartItem.tsx` share the new
  stock helpers and currency formatter.
- Nav search runs through `useDebounce` and `useMemo` to avoid re-filtering
  on every keystroke.

### Fixed

- `decreaseQuantity` in `_app.tsx` no longer lets cart quantities fall below
  one.
