# 🌾 Kasuwa — Open Source eFarm Marketplace

Kasuwa is an open-source eFarm web platform designed to empower farm
owners to sell their agricultural products directly to farmers, vendors,
and everyday users — fostering fresh-produce accessibility and supporting
local agriculture through digital innovation.

Built with **Next.js 13** (pages router), **NextUI**, and **Tailwind CSS**,
Kasuwa is a single-page marketplace that talks to a separate REST backend
and uses Paystack for checkout.

## 🚀 Features

- 🧑‍🌾 **Farm Owner Dashboard** — list, manage, and update agricultural
  products with ease.
- 🛒 **Product Marketplace** — browse and purchase fresh produce directly
  from farmers.
- 🔍 **Search & Filtering** — debounced product search with category and
  location-based filtering.
- 🧾 **Secure Checkout** — Paystack integration for order processing.
- 🎟️ **Discount Codes** — built-in promo codes (`WELCOME10`,
  `FREESHIP`, `BULK5`) with min-subtotal gating.
- ⏱️ **Persistent Countdowns** — flash-sale and special-offer timers that
  survive page refreshes.
- 📱 **Responsive Design** — optimised for mobile, tablet, and desktop.
- ♿ **Accessible** — keyboard-operable bookmarks, labelled controls, live
  region toasts.

## 🛠️ Tech Stack

| Layer        | Tooling                                                      |
|--------------|--------------------------------------------------------------|
| Framework    | Next.js 13 (pages router)                                    |
| Styling      | Tailwind CSS + NextUI                                        |
| State        | React Context (`utils/AppContext.tsx`), `localStorage`       |
| Networking   | `lib/api.ts` — typed `fetch` with timeout + retry            |
| Payments     | Paystack (`react-paystack`)                                  |
| Tooling      | ESLint, Prettier, `.editorconfig`, `.nvmrc` (Node 20)        |

## 🧑‍💻 Getting Started

### Prerequisites

- **Node.js v20+** (use `nvm use` to pick up `.nvmrc`)
- npm or Yarn
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/OLU-DEVX/Kasuwa.git
cd Kasuwa

# Install dependencies
npm install

# Copy env template
cp .env.example .env.local

# Start the dev server
npm run dev
```

Open http://localhost:3000 to see the marketplace home page.

### Available scripts

| Command                | What it does                                        |
|------------------------|-----------------------------------------------------|
| `npm run dev`          | Start the Next.js dev server with hot reload       |
| `npm run build`        | Production build                                    |
| `npm start`            | Run the production server (after `build`)           |
| `npm run lint`         | Lint the codebase with `next lint`                  |
| `npm run lint:fix`     | Auto-fix lint issues                                |
| `npm run typecheck`    | `tsc --noEmit`                                      |
| `npm run format`       | Format every file with Prettier                     |
| `npm run format:check` | Check formatting without writing                    |

## ⚙️ Environment variables

Copy `.env.example` to `.env.local` and set whatever overrides you need:

| Variable                          | Purpose                                |
|-----------------------------------|----------------------------------------|
| `NEXT_PUBLIC_API_URL`             | Base URL of the Kasuwa REST backend    |
| `NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY` | Paystack public key (safe in browser)  |
| `NEXT_PUBLIC_DELIVERY_FEE`        | Standard delivery fee in NGN           |

## 📁 Project Structure

```
kasuwa/
├── app/                  # Tailwind/global CSS only
├── components/           # Reusable React components
├── lib/                  # Framework-agnostic helpers
│   ├── api.ts            # Typed fetch wrapper
│   ├── constants.ts      # API URL, routes, limits
│   ├── format.ts         # NGN currency, duration
│   ├── pricing.ts        # Order totals
│   ├── discount.ts       # Promo code resolver
│   ├── storage.ts        # SSR-safe localStorage
│   ├── stock.ts          # Stock parser/labels
│   ├── useCountdown.ts   # Persistent countdown
│   ├── useDebounce.ts    # Search debounce
│   ├── useMediaQuery.ts  # Breakpoint hook
│   └── __tests__/        # Compile-time test assertions
├── pages/                # Next.js pages router
├── public/               # Static SVG/PNG assets
└── utils/                # Legacy helpers + AppContext
```

See `ARCHITECTURE.md` for a deeper walkthrough.

## 🤝 Contributing

We welcome contributions! Start with `CONTRIBUTING.md` for the commit
conventions, branch naming, and PR expectations. Bug reports and feature
requests have dedicated templates under `.github/ISSUE_TEMPLATE/`.

## 🔐 Security

Found a vulnerability? Please read `SECURITY.md` and email us privately
instead of opening a public issue.

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [NextUI Documentation](https://nextui.org/docs)
- [Paystack Inline Docs](https://paystack.com/docs/payments/accept-payments)

## 📄 License

Kasuwa is open source and licensed under the MIT License — see `LICENSE`.

👨‍🌾 Built with ❤️ for farmers. Let's grow the future of agriculture
together!
