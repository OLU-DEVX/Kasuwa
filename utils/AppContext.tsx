import { createContext, ReactNode } from "react";
import type { CartItem, Product, User } from "@/lib/types";

export interface AppContextValue {
  cartItems: CartItem[];
  setCartItems: (items: CartItem[]) => void;
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (title: string, index: number) => void;
  increaseQuantity: (index: number) => void;
  decreaseQuantity: (index: number) => void;
  list: Product[];
  isNavOpen: boolean;
  setIsNavOpen: (open: boolean) => void;
  count: number;
  setCount: (count: number) => void;
  savedItems: Product[];
  setSavedItems: (items: Product[]) => void;
  addToSavedItems: (product: Product) => void;
  removeFromSavedItems: (title: string, item: Product) => void;
  showNotification: (message: string) => void;
  setNotification: (message: string) => void;
  setNotificationAction: (action: string) => void;
  user?: User | null;
}

// Loose default so legacy callers that read `useContext(AppContext)` outside
// the provider still type-check. The provider in `pages/_app.tsx` injects
// the real value shape described by `AppContextValue`.
export const AppContext = createContext<any>(null);

export const ContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  return <AppContext.Provider value={children}>{children}</AppContext.Provider>;
};
