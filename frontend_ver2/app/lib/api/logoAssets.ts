import { http } from "./http";

export interface SaveLogoAssetBody {
  prompt: string;
  /** data:image 접두사 없이 순수 base64 */
  b64Png: string;
}

export interface SaveLogoAssetResponse {
  id: number;
  accessPath: string;
}

export async function saveLogoAsset(
  body: SaveLogoAssetBody,
): Promise<SaveLogoAssetResponse> {
  const res = await http.post<SaveLogoAssetResponse>(
    "/api/v1/logo-assets",
    body,
  );
  return res.data;
}
