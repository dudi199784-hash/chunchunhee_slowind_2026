import type { MemberDesignPreview } from "@/config/memberDesignPreview";

import {
  fetchBrowseLogoAssets,
  formatMetricCount,
  titleFromLogoPrompt,
} from "@/app/lib/api/logoAssets";

import { fetchApiJson } from "./fetchJson";

/** `ApiV1DesignController.DesignDto` JSON */
type DesignDto = {
  id: number;
  memberSerial: number;
  productSerial: number;
  username: string;
  title: string;
  designTitle: string;
  designDescription: string;
  designCategory: string;
};

/** `ApiV1DesignController.DesignsResponse` JSON */
type DesignsResponse = {
  designs: DesignDto[];
};

type ShowcaseMode = "views" | "likes";

function mapCategory(raw: string | undefined): MemberDesignPreview["category"] {
  if (raw == null) return "기타";
  const t = raw.trim();
  if (t === "로고" || t === "유니폼" || t === "기타") return t;
  const lower = t.toLowerCase();
  if (lower === "logo") return "로고";
  if (lower === "uniform" || lower.includes("uniform")) return "유니폼";
  if (lower === "etc" || lower === "other") return "기타";
  return "기타";
}

function mapDesignsToPreview(list: DesignDto[]): MemberDesignPreview[] {
  return list.map((d) => ({
    id: d.id,
    productId: d.productSerial,
    title: d.designTitle || d.title || "제목 없음",
    author: d.username || "—",
    category: mapCategory(d.designCategory),
    /** 백엔드에 조회수·좋아요 필드가 붙으면 여기서 매핑 */
    viewsDisplay: "—",
    likesDisplay: "—",
  }));
}

/**
 * `GET /api/v1/designs` — 백엔드 `userSerial`, `category` 쿼리와 동일.
 * 응답은 `{ designs: [...] }` 형태.
 */
export async function fetchDesignList(params?: {
  userSerial?: number;
  category?: string;
}): Promise<MemberDesignPreview[]> {
  const sp = new URLSearchParams();
  if (params?.userSerial != null) sp.set("userSerial", String(params.userSerial));
  if (params?.category) sp.set("category", params.category);
  const q = sp.toString();
  const path = `/api/v1/designs${q ? `?${q}` : ""}`;
  const data = await fetchApiJson<DesignsResponse>(path);
  if (!data?.designs) return [];
  return mapDesignsToPreview(data.designs);
}

/** 구경하기에 공개된 시안만 (회원 전체 design 테이블 X) */
export async function fetchPopularDesigns(): Promise<MemberDesignPreview[]> {
  const items = await fetchBrowseLogoAssets();
  return items.map((item) => ({
    id: item.designId ?? item.id,
    productId: item.productId ?? 0,
    title: titleFromLogoPrompt(item.prompt),
    author: item.authorName,
    category: mapCategory(
      typeof item.category === "string" ? item.category : undefined,
    ),
    viewsDisplay: formatMetricCount(item.viewCount),
    likesDisplay: formatMetricCount(item.likeCount),
  }));
}

export async function fetchShowcaseDesigns(
  _mode: ShowcaseMode,
): Promise<MemberDesignPreview[]> {
  return fetchPopularDesigns();
}
