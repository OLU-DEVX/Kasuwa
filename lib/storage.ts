// SSR-safe typed wrapper around `localStorage`. Calling code can pretend
// `window` always exists; on the server we short-circuit to the supplied
// fallback so Next.js's static rendering doesn't crash.

const isBrowser = (): boolean => typeof window !== "undefined";

export function readJSON<T>(key: string, fallback: T): T {
  if (!isBrowser()) return fallback;
  const raw = window.localStorage.getItem(key);
  if (raw === null) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    // Corrupted JSON — pretend the slot was empty rather than throwing.
    return fallback;
  }
}

export function writeJSON<T>(key: string, value: T): void {
  if (!isBrowser()) return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Quota or serialization failure — silently ignore; cart state will
    // still be correct in-memory for the current session.
  }
}

export function removeKey(key: string): void {
  if (!isBrowser()) return;
  window.localStorage.removeItem(key);
}

export const StorageKeys = {
  cart: "cartItems",
  saved: "savedItems",
  user: "user",
  farmer: "farmer",
  mainCountdownEnd: "mainCountdownEnd",
  flashSaleEnd: "flashSaleEnd",
} as const;
