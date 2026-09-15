import { products, productMap } from './products.js';

export const STORAGE_KEY = 'mori-market-cart';

const normalizeCart = (items) => {
  if (!Array.isArray(items)) {
    return [];
  }

  return items
    .filter((item) => item && typeof item.productId === 'string')
    .map((item) => ({
      productId: item.productId,
      quantity: Number.isFinite(item.quantity) ? Math.max(1, Math.floor(item.quantity)) : 1,
    }));
};

export function getCart() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return normalizeCart(parsed);
  } catch (error) {
    console.warn('Failed to parse cart:', error);
    return [];
  }
}

export function saveCart(cart) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(normalizeCart(cart)));
}

export function getCartItems() {
  return getCart()
    .map((item) => {
      const product = productMap[item.productId];
      if (!product) {
        return null;
      }

      return {
        productId: item.productId,
        quantity: item.quantity,
        product,
      };
    })
    .filter(Boolean);
}

export function getCartCount() {
  return getCartItems().reduce((count, item) => count + item.quantity, 0);
}

export function addToCart(productId, quantity = 1) {
  const cart = getCart();
  const item = cart.find((entry) => entry.productId === productId);
  const nextQuantity = Math.max(1, Number(quantity) || 1);

  if (item) {
    item.quantity += nextQuantity;
  } else {
    cart.push({ productId, quantity: nextQuantity });
  }

  saveCart(cart);
}

export function updateCartQuantity(productId, quantity) {
  const cart = getCart();
  const item = cart.find((entry) => entry.productId === productId);
  if (!item) return;

  const nextQuantity = Math.max(1, Number(quantity) || 1);
  item.quantity = nextQuantity;
  saveCart(cart);
}

export function removeFromCart(productId) {
  const cart = getCart().filter((item) => item.productId !== productId);
  saveCart(cart);
}

export function clearCart() {
  saveCart([]);
}

export function getSubtotal() {
  return getCartItems().reduce((total, item) => total + item.product.price * item.quantity, 0);
}

export function getShippingFee() {
  const subtotal = getSubtotal();
  const itemCount = getCartItems().length;
  if (itemCount === 0) return 0;
  return subtotal >= 1000 ? 0 : 80;
}

export function getTotal() {
  return getSubtotal() + getShippingFee();
}

export function getProductById(productId) {
  return products.find((product) => product.id === productId) || null;
}
