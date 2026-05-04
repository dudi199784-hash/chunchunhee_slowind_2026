import type { MemberDesignPreview } from "@/config/memberDesignPreview";

import { fetchApiJson } from "./http";

type ShowcaseMode = "views" | "likes";

export async function fetchPopularDesigns(): Promise<MemberDesignPreview[]> {
  const data = await fetchApiJson<MemberDesignPreview[]>("/api/designs/popular");
  return data ?? [];
}

export async function fetchShowcaseDesigns(
  mode: ShowcaseMode
): Promise<MemberDesignPreview[]> {
  const data = await fetchApiJson<MemberDesignPreview[]>(
    `/api/designs/showcase?mode=${mode}`
  );
  return data ?? [];
}
