/** API 연동 전 — 홈/쇼핑백 프리뷰용 목 데이터 */
export type MemberDesignPreview = {
  id: string;
  title: string;
  author: string;
  category: "로고" | "유니폼" | "기타";
  viewsDisplay: string;
  likesDisplay: string;
};

export const memberDesignsByViews: MemberDesignPreview[] = [
  {
    id: "v-1",
    title: "Thunder FC 홈 킷",
    author: "@windy_01",
    category: "유니폼",
    viewsDisplay: "12.4k",
    likesDisplay: "1.8k",
  },
  {
    id: "v-2",
    title: "키퍼 글로브 커스텀",
    author: "@gk_studio",
    category: "기타",
    viewsDisplay: "9.1k",
    likesDisplay: "892",
  },
  {
    id: "v-3",
    title: "클럽 엠블럼 리디자인",
    author: "@logo_lab",
    category: "로고",
    viewsDisplay: "8.0k",
    likesDisplay: "2.1k",
  },
];

export const memberDesignsByLikes: MemberDesignPreview[] = [
  {
    id: "l-1",
    title: "네온 그라데이션 유니폼",
    author: "@neon_kit",
    category: "유니폼",
    viewsDisplay: "6.2k",
    likesDisplay: "3.2k",
  },
  {
    id: "l-2",
    title: "미니멀 로고 세트",
    author: "@mono_brand",
    category: "로고",
    viewsDisplay: "4.5k",
    likesDisplay: "2.8k",
  },
  {
    id: "l-3",
    title: "펫 유니폼 커플룩",
    author: "@pet_pitch",
    category: "기타",
    viewsDisplay: "3.8k",
    likesDisplay: "2.1k",
  },
];
