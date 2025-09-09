# Architecture

This document describes how the Kasuwa codebase is organised and where each piece
of behaviour lives. It is intended for new contributors who want to find their
way around quickly.

## High-level

Kasuwa is a Next.js 13 application using the **pages router**. The marketplace
talks to a separate REST backend hosted on Render at
`https://kasuwa-b671.onrender.com`. Client state — cart contents, saved items,
the currently signed-in user — is persisted in the browser via `localStorage`.

```
┌────────────────────────┐         ┌───────────────────────────┐
│ Next.js (pages/)       │  HTTPS  │ kasuwa-b671.onrender.com  │
│ React + NextUI         │ ──────▶ │ products, users, orders   │
│ + Tailwind + Paystack  │         │                           │
└────────────────────────┘         └───────────────────────────┘
        │
        │ localStorage
        ▼
   cart, savedItems, user, farmer
```

## Folder layout

| Folder         | Purpose                                                |
|----------------|--------------------------------------------------------|
| `pages/`       | Route components — one file per route                  |
| `components/`  | Presentational + interactive React components          |
| `lib/`         | Framework-agnostic helpers (formatters, types, hooks)  |
| `utils/`       | Legacy helpers and React context provider              |
| `public/`      | Static SVG/PNG assets shipped to the browser           |
| `app/`         | Tailwind/global CSS only — not the App Router          |

## Data flow

1. `pages/_app.tsx` boots `AppContext.Provider` and immediately fetches the
   product catalogue from the backend.
2. Pages and components read from `AppContext` (`cartItems`, `savedItems`,
   `list`, `count`, etc.) and call into the provided action functions
   (`addToCart`, `removeFromCart`, `addToSavedItems`, …).
3. After every cart mutation, `_app` writes the new state to `localStorage`,
   so refreshes don't lose the user's basket.

## Payments

Checkout is handled client-side by `react-paystack`. The cart page builds a
Paystack config (`amount`, `email`, `reference`) and calls
`usePaystackPayment(...)`. The reference is generated locally and the public
key comes from `NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY`.

## Conventions

- Currency is always **NGN** (Nigerian Naira). Use the helpers in `lib/format`
  to render prices — don't hand-roll `toLocaleString` calls.
- Stock state is a single string field returned by the backend; parse it
  through `lib/stock.ts` to get a discriminated `StockStatus` value.
- All `localStorage` access must go through `lib/storage.ts` so SSR doesn't
  blow up on the missing `window` global.
