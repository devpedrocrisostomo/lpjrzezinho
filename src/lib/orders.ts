import type { OrderStatus, SavedOrder } from "@/types/order";

const STORAGE_KEY = "jr-zezinho-orders";

export function getSavedOrders(): SavedOrder[] {
  if (typeof window === "undefined") return [];

  try {
    const orders = window.localStorage.getItem(STORAGE_KEY);
    return orders ? (JSON.parse(orders) as SavedOrder[]) : [];
  } catch {
    return [];
  }
}

export function saveOrder(order: SavedOrder) {
  const orders = getSavedOrders();
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify([order, ...orders]));
}

export function updateOrderStatus(orderId: string, status: OrderStatus) {
  const updatedOrders = getSavedOrders().map((order) =>
    order.id === orderId ? { ...order, status } : order,
  );

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedOrders));
  return updatedOrders;
}

export function clearSavedOrders() {
  window.localStorage.removeItem(STORAGE_KEY);
}
