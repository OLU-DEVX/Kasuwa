//million-ignore
"use client";
import * as React from "react";
import { NextUIProvider } from "@nextui-org/react";
import type { AppProps } from "next/app";
import Nav from "@/components/nav";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Footer from "@/components/footer";
import { AppContext } from "@/utils/AppContext";
import Head from "next/head";
import Notification from "@/components/notification";
import "../app/globals.css";
import { apiFetch } from "@/lib/api";
import {
  readJSON,
  StorageKeys,
  writeJSON,
} from "@/lib/storage";
import { NOTIFICATION_TIMEOUT_MS } from "@/lib/constants";
import type { CartItem, Product } from "@/lib/types";

function App({ Component, pageProps }: AppProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [savedItems, setSavedItems] = useState<Product[]>([]);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [count, setCount] = useState(1);
  const [notification, setNotification] = useState("");
  const [notificationAction, setNotificationAction] = useState("");
  const [notificationVisibles, setNotificationVisible] = useState(false);
  const [list, setList] = useState<Product[]>([]);

  const FetchProducts = async () => {
    try {
      const products = await apiFetch<Product[]>("/products");
      setList(products);
    } catch {
      // Surface this in a future toast — for now leave the skeleton state.
    }
  };
  useEffect(() => {
    FetchProducts();
  }, []);
  const showNotification = (message: string) => {
    setNotification(message);
    setNotificationVisible(true);
    setTimeout(() => {
      setNotification("");
      setNotificationVisible(false);
    }, NOTIFICATION_TIMEOUT_MS);
  };

  useEffect(() => {
    // Load cart items and saved items from local storage on component mount
    setCartItems((prev) => [...prev, ...readJSON<CartItem[]>(StorageKeys.cart, [])]);
    setSavedItems((prev) => [
      ...prev,
      ...readJSON<Product[]>(StorageKeys.saved, []),
    ]);
  }, []);

  useEffect(() => {
    writeJSON(StorageKeys.cart, cartItems);
    writeJSON(StorageKeys.saved, savedItems);
  }, [cartItems, savedItems]);

  const addToCart = (product: Product, quantity: number) => {
    const itemWithCount: CartItem = { ...product, quantity };
    setCartItems([...cartItems, itemWithCount]);
    showNotification(product.name);
    setNotificationAction("added to cart");
  };
  const addToSavedItems = (product: Product) => {
    setSavedItems([...savedItems, product]);
    showNotification(product.name);
    setNotificationAction("added to saved items");
  };

  const removeFromSavedItems = (title: string, item: Product) => {
    const updatedSavedItems = savedItems.filter(
      (savedItem) => savedItem !== item
    );
    setSavedItems(updatedSavedItems);
    showNotification(title);
    setNotificationAction("removed from saved items");
  };

  const removeFromCart = (title: string, cartItemIndex: number) => {
    const updatedCart = cartItems.filter(
      (_cartItem, index: number) => index !== cartItemIndex
    );
    setCartItems(updatedCart);
    showNotification(title);
    setNotificationAction("removed from cart");
  };

  const increaseQuantity = (index: number) => {
    const updatedCartItems = cartItems.map((item, i) =>
      i === index ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCartItems(updatedCartItems);
  };
  const decreaseQuantity = (index: number) => {
    const updatedCartItems = cartItems.map((item, i) =>
      i === index
        ? { ...item, quantity: Math.max(1, item.quantity - 1) }
        : item
    );
    setCartItems(updatedCartItems);
  };
  const router = useRouter();
  return (
    <NextUIProvider>
      <AppContext.Provider
        value={{
          cartItems,
          setCartItems,
          addToCart,
          list,
          removeFromCart,
          isNavOpen,
          setIsNavOpen,
          count,
          setCount,
          increaseQuantity,
          decreaseQuantity,
          savedItems,
          setSavedItems,
          addToSavedItems,
          removeFromSavedItems,
          showNotification,
          setNotification,
          setNotificationAction,
        }}
      >
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="theme-color" content="#A46E05" />
          <meta
            name="description"
            content="Kasuwa — the open-source eFarm marketplace connecting Nigerian farmers and buyers."
          />
          <link rel="manifest" href="/manifest.json" />
          <link rel="icon" href="/icon.svg" type="image/svg+xml" />
          <title>Kasuwa — Open Source eFarm Marketplace</title>
        </Head>
        {!router.pathname.includes("auth/") &&
          !router.pathname.includes("seller/sellerForm") && <Nav />}
        {notificationVisibles && (
          <Notification name={notification} action={notificationAction} />
        )}
        <Component {...pageProps} />
        {!router.pathname.includes("auth/") && <Footer />}
      </AppContext.Provider>
    </NextUIProvider>
  );
}

export default App;
