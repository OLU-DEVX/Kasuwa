// Encapsulates the cart reducer that used to live inline in `_app.tsx`.
// Pulling it out makes the provider easier to read and gives us a single
// place to add stock-aware quantity clamping.

import { useEffect, useReducer } from "react";
import { readJSON, StorageKeys, writeJSON } from "./storage";
import type { CartItem, Product } from "./types";

type Action =
  | { type: "hydrate"; payload: CartItem[] }
  | { type: "add"; product: Product; quantity: number }
  | { type: "remove"; index: number }
  | { type: "increment"; index: number }
  | { type: "decrement"; index: number };

function reducer(state: CartItem[], action: Action): CartItem[] {
  switch (action.type) {
    case "hydrate":
      return action.payload;
    case "add":
      return [...state, { ...action.product, quantity: action.quantity }];
    case "remove":
      return state.filter((_, i) => i !== action.index);
    case "increment":
      return state.map((item, i) =>
        i === action.index ? { ...item, quantity: item.quantity + 1 } : item
      );
    case "decrement":
      return state.map((item, i) =>
        i === action.index
          ? { ...item, quantity: Math.max(1, item.quantity - 1) }
          : item
      );
  }
}

export function useCart() {
  const [items, dispatch] = useReducer(reducer, [] as CartItem[]);

  useEffect(() => {
    dispatch({
      type: "hydrate",
      payload: readJSON<CartItem[]>(StorageKeys.cart, []),
    });
  }, []);

  useEffect(() => {
    writeJSON(StorageKeys.cart, items);
  }, [items]);

  return {
    items,
    add: (product: Product, quantity: number) =>
      dispatch({ type: "add", product, quantity }),
    remove: (index: number) => dispatch({ type: "remove", index }),
    increment: (index: number) => dispatch({ type: "increment", index }),
    decrement: (index: number) => dispatch({ type: "decrement", index }),
  };
}
