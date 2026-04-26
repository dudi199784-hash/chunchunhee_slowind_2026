import type { MemberDesignPreview } from "@/config/memberDesignPreview";

const ADJECTIVES = [
  "네온",
  "미니멀",
  "클래식",
  "스트릿",
  "빈티지",
  "모던",
  "다크",
  "파스텔",
] as const;

const NOUNS = [
  "홈 킷",
  "어웨이 킷",
  "트레이닝 세트",
  "GK 킷",
  "엠블럼",
  "로고 패치",
  "펫 유니폼",
  "스니커 매치",
  "윈드브레이커",
  "캡틴 암밴드",
] as const;

const AUTHORS = [
  "@windy_01",
  "@kit_lab",
  "@mono_fc",
  "@neon_pitch",
  "@gk_studio",
  "@pet_ball",
  "@logo_craft",
  "@street_x",
] as const;

function categoryForIndex(i: number): MemberDesignPreview["category"] {
  const r = i % 3;
  if (r === 0) return "유니폼";
  if (r === 1) return "로고";
  return "기타";
}

/** 인기 상품 페이지용 — 총 `count`개 (기본 48) */
export function buildPopularGalleryItems(
  count = 48
): MemberDesignPreview[] {
  return Array.from({ length: count }, (_, i) => {
    const title = `${ADJECTIVES[i % ADJECTIVES.length]} ${NOUNS[i % NOUNS.length]} #${i + 1}`;
    const author = AUTHORS[i % AUTHORS.length];
    const category = categoryForIndex(i);
    const base = 80 - (i % 55);
    const frac = (i % 9) + 1;
    const likesFrac = ((i * 2) % 9) + 1;
    const likesBase = Math.max(1, base - 42 + (i % 12));
    return {
      id: `popular-${i + 1}`,
      title,
      author,
      category,
      viewsDisplay: `${base}.${frac}k`,
      likesDisplay: `${likesBase}.${likesFrac}k`,
    };
  });
}

export const POPULAR_GALLERY_ITEMS = buildPopularGalleryItems(48);
