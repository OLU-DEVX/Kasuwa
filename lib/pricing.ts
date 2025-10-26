// Order math lives here. Anywhere in the UI that displays a subtotal,
// delivery fee, or grand total should call into this module instead of
// reimplementing the arithmetic — that's how off-by-one bugs slip in.

import { DELIVERY_FEE } from "./constants";
import type { CartItem } from "./types";

export interface OrderTotals {
  itemCount: number;
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
}

export function calculateSubtotal(items: CartItem[]): number {
  return items.reduce((acc, item) => {
    const price = Number.parseFloat(item.originalPrice);
    if (!Number.isFinite(price)) return acc;
    const qty = Number.isFinite(item.quantity) ? item.quantity : 0;
    return acc + price * qty;
  }, 0);
}

export function calculateTotals(
  items: CartItem[],
  options: { deliveryFee?: number; discount?: number } = {}
): OrderTotals {
  const subtotal = calculateSubtotal(items);
  const deliveryFee = items.length === 0 ? 0 : options.deliveryFee ?? DELIVERY_FEE;
  const discount = Math.max(0, Math.min(subtotal, options.discount ?? 0));
  const total = Math.max(0, subtotal + deliveryFee - discount);
  return {
    itemCount: items.length,
    subtotal,
    deliveryFee,
    discount,
    total,
  };
}
