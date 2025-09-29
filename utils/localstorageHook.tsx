// Thin compatibility shims kept so existing imports continue to work.
// New code should reach for `lib/storage.ts` directly.

import { readJSON, StorageKeys, writeJSON } from "@/lib/storage";
import type { CartItem, Product } from "@/lib/types";

export const saveCartItems = (cartItems: CartItem[]): void =>
  writeJSON(StorageKeys.cart, cartItems);

export const loadCartItems = (): CartItem[] =>
  readJSON<CartItem[]>(StorageKeys.cart, []);

export const saveSavedItems = (savedItems: Product[]): void =>
  writeJSON(StorageKeys.saved, savedItems);

export const loadSavedItems = (): Product[] =>
  readJSON<Product[]>(StorageKeys.saved, []);
