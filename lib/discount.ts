// Promo / discount code resolution.
//
// Codes are matched case-insensitively. Right now the catalogue lives in
// memory; once the backend exposes an endpoint we'll fetch it dynamically
// but keep the same `Discount` shape so callers don't have to change.

export interface Discount {
  code: string;
  /** Percentage off the order subtotal, expressed 0–1 (e.g. 0.1 = 10%). */
  percent?: number;
  /** Flat NGN amount off. Applied after `percent`. */
  flat?: number;
  /** Optional minimum subtotal in NGN before the code is valid. */
  minSubtotal?: number;
}

const CATALOG: Discount[] = [
  { code: "WELCOME10", percent: 0.1 },
  { code: "FREESHIP", flat: 1000 },
  { code: "BULK5", percent: 0.05, minSubtotal: 25_000 },
];

export type DiscountResult =
  | { ok: true; discount: Discount; amount: number }
  | {
      ok: false;
      reason: "unknown_code" | "below_minimum" | "empty_code";
      message: string;
    };

export function resolveDiscount(
  rawCode: string,
  subtotal: number
): DiscountResult {
  const code = rawCode.trim().toUpperCase();
  if (!code) {
    return {
      ok: false,
      reason: "empty_code",
      message: "Enter a code to apply.",
    };
  }
  const found = CATALOG.find((d) => d.code === code);
  if (!found) {
    return {
      ok: false,
      reason: "unknown_code",
      message: `"${rawCode}" is not a valid discount code.`,
    };
  }
  if (found.minSubtotal && subtotal < found.minSubtotal) {
    return {
      ok: false,
      reason: "below_minimum",
      message: `Spend at least ₦${found.minSubtotal.toLocaleString()} to use ${code}.`,
    };
  }
  const percentCut = found.percent ? subtotal * found.percent : 0;
  const flatCut = found.flat ?? 0;
  const amount = Math.min(subtotal, percentCut + flatCut);
  return { ok: true, discount: found, amount };
}
