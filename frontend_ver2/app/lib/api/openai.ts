import { http } from "./http";

const OPENAI_IMAGE_BASE = "/api/v1/openai/images";

export interface GenerateOpenAiImageBody {
  prompt: string;
}

/** 백엔드 `OpenaiImageResponse` — `imageUrl`은 백엔드에 필드가 있을 때만 사용 */
export interface GenerateOpenAiImageResponse {
  b64Json: string | null;
  imageUrl?: string | null;
}

export async function generateOpenAiImage(
  body: GenerateOpenAiImageBody,
): Promise<GenerateOpenAiImageResponse> {
  const res = await http.post<GenerateOpenAiImageResponse>(
    `${OPENAI_IMAGE_BASE}/generate`,
    body,
  );
  return res.data;
}

/** 유니폼 틀 PNG + 마스크 PNG + 프롬프트 → 인페인트 (multipart) */
export async function editUniformInpaint(params: {
  prompt: string;
  template: Blob;
  mask: Blob;
}): Promise<GenerateOpenAiImageResponse> {
  const fd = new FormData();
  fd.append("prompt", params.prompt);
  fd.append("template", params.template, "template.png");
  fd.append("mask", params.mask, "mask.png");
  const res = await http.post<GenerateOpenAiImageResponse>(
    `${OPENAI_IMAGE_BASE}/edit-uniform`,
    fd,
  );
  return res.data;
}
