// Centralised, framework-agnostic constants shared across the app.
//
// Values that should be configurable per-environment read from
// `process.env.NEXT_PUBLIC_*` and fall back to the production defaults so
// that pulling the repo and running `npm run dev` Just Works without a
// custom `.env.local`.

export const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "https://kasuwa-b671.onrender.com";

export const PAYSTACK_PUBLIC_KEY =
  process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY ??
  "pk_test_861fff4e3acc786df9a3e54d2889fc2633e0f888";

export const DELIVERY_FEE = Number(
  process.env.NEXT_PUBLIC_DELIVERY_FEE ?? "1000"
);

export const LOW_STOCK_THRESHOLD = 20;

export const NOTIFICATION_TIMEOUT_MS = 3000;

export const ROUTES = {
  home: "/",
  cart: "/cart",
  savedItems: "/savedItems",
  account: "/account",
  signIn: "/auth/signIn",
  signUp: "/auth/signup",
  forgotPassword: "/auth/forgotPassword",
  product: (id: string) => `/product/${id}`,
  sellerDashboard: "/seller/dashboard",
  sellerAddProduct: "/seller/addProduct",
  sellerLogin: "/seller/sellerLogin",
} as const;

export const CATEGORIES = [
  "Fruits",
  "Dairy",
  "Vegetables",
  "Grains",
  "Tubers",
  "Fertilizers",
  "Livestock",
  "Legumes",
] as const;

export type Category = (typeof CATEGORIES)[number];
