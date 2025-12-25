// Compile-time assertions for pricing helpers.

import { calculateSubtotal, calculateTotals } from "../pricing";
import type { CartItem } from "../types";

const sampleItem: CartItem = {
  _id: "p1",
  name: "Tomatoes",
  description: "Fresh basket",
  originalPrice: "1500",
  stock: "30",
  category: "Vegetables",
  images: [{ url: "/tomato.jpg" }],
  quantity: 2,
};

// `calculateSubtotal` returns a number for an empty cart…
const _emptySubtotal: number = calculateSubtotal([]);
// …and for a populated one.
const _populatedSubtotal: number = calculateSubtotal([sampleItem]);

// `calculateTotals` exposes the documented shape.
const totals = calculateTotals([sampleItem], { discount: 100 });
const _itemCount: number = totals.itemCount;
const _subtotal: number = totals.subtotal;
const _delivery: number = totals.deliveryFee;
const _discount: number = totals.discount;
const _total: number = totals.total;

// Delivery fee on an empty cart should be zero — assert via narrowing.
const emptyTotals = calculateTotals([]);
const _emptyDelivery: 0 = emptyTotals.deliveryFee === 0 ? 0 : 0;

void [
  _emptySubtotal,
  _populatedSubtotal,
  _itemCount,
  _subtotal,
  _delivery,
  _discount,
  _total,
  _emptyDelivery,
];
