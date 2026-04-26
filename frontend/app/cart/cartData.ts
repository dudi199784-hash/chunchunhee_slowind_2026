import type { CartItemPlaceholder } from "./types";

/** API 연동 전 데모용 — 나중에 fetch 결과로 교체 */
export const cartLogoItems: CartItemPlaceholder[] = [
  { id: "logo-1", title: "팀 로고 시안 A", subtitle: "벡터 / PNG" },
  { id: "logo-2", title: "팀 로고 시안 B", subtitle: "벡터 / PNG" },
];

export const cartUniformItems: CartItemPlaceholder[] = [
  { id: "uni-1", title: "홈 유니폼", subtitle: "사이즈 M · 넘버 10" },
  { id: "uni-2", title: "어웨이 유니폼", subtitle: "사이즈 L" },
  { id: "uni-3", title: "트레이닝 상의", subtitle: "사이즈 M" },
  { id: "uni-4", title: "트레이닝 하의", subtitle: "사이즈 M" },
];

export const cartOtherItems: CartItemPlaceholder[] = [
  { id: "etc-1", title: "축구화", subtitle: "270mm" },
];

const ALL_CART_ITEMS: CartItemPlaceholder[] = [
  ...cartLogoItems,
  ...cartUniformItems,
  ...cartOtherItems,
];

export function getCartItemById(
  id: string | undefined
): CartItemPlaceholder | null {
  if (!id) return null;
  return ALL_CART_ITEMS.find((p) => p.id === id) ?? null;
}
