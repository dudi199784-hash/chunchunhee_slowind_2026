import type { CartItemPlaceholder } from "@/app/cart/types";

import { fetchApiJson } from "./http";

type CartItemApi = CartItemPlaceholder & {
  category: "로고" | "유니폼" | "기타";
};

export async function fetchCartItems(): Promise<CartItemApi[]> {
  const data = await fetchApiJson<CartItemApi[]>("/api/cart/items");
  return data ?? [];
}

export async function fetchCartItemById(
  id: number | undefined
): Promise<CartItemPlaceholder | null> {
  if (!id) return null;
  const items = await fetchCartItems();
  return items.find((item) => item.id === id) ?? null;
}
