import type { MediaSource } from "@/lib/media/types";

/** 히어로(ScreenVideo) 전체 영역 */
export const heroMedia: MediaSource | null = null;

/** Recommend 카드별 — 나중에 각 `media`에만 채우면 됨 */
export const recommendMedia: {
  id: "cleats" | "uniform" | "keeper" | "pet";
  label: string;
  media: MediaSource | null;
}[] = [
  { id: "cleats", label: "축구화", media: null },
  { id: "uniform", label: "유니폼", media: null },
  { id: "keeper", label: "키퍼 글로브", media: null },
  { id: "pet", label: "펫 유니폼", media: null },
];

/** CustomMaker 카드별 */
export const customMakerMedia = {
  logo: null as MediaSource | null,
  product: null as MediaSource | null,
};

/** Nav 우측 액션 — 아이콘/루프 비디오 등 */
export const navMedia = {
  cart: null as MediaSource | null,
  search: null as MediaSource | null,
  user: null as MediaSource | null,
  menu: null as MediaSource | null,
};
