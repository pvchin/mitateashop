import { carts_localstorage_key } from "../utils/constants";

// helper to get user from localstorage
export function getStoredCart() {
  const storedCart = localStorage.getItem(carts_localstorage_key);
  return storedCart ? JSON.parse(storedCart) : null;
}

export function setStoredCart(cart) {
  localStorage.setItem(carts_localstorage_key, JSON.stringify(cart));
}

export function clearStoredCart() {
  localStorage.removeItem(carts_localstorage_key);
}
