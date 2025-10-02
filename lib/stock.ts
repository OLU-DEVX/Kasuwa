// Inventory state derived from the backend's free-form `stock` string.
// We keep the parsing in one place so the cart, product card, and product
// detail page can't drift apart.

import { LOW_STOCK_THRESHOLD } from "./constants";

export type StockStatus = "out" | "low" | "in";

export interface StockInfo {
  amount: number;
  status: StockStatus;
}

export function parseStock(raw: string | number | null | undefined): StockInfo {
  const amount =
    typeof raw === "number"
      ? raw
      : Number.parseFloat((raw ?? "").toString());
  if (!Number.isFinite(amount) || amount <= 0) {
    return { amount: 0, status: "out" };
  }
  if (amount < LOW_STOCK_THRESHOLD) {
    return { amount, status: "low" };
  }
  return { amount, status: "in" };
}

export function stockLabel(status: StockStatus): string {
  switch (status) {
    case "out":
      return "Out of stock";
    case "low":
      return "Low on stock";
    case "in":
      return "In stock";
  }
}

export function stockColorClass(status: StockStatus): string {
  switch (status) {
    case "out":
      return "text-red-500";
    case "low":
      return "text-yellow-500";
    case "in":
      return "text-stone-600";
  }
}
