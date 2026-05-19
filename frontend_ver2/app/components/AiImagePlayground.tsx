"use client";

import { useState } from "react";
import {
  editUniformInpaint,
  generateOpenAiImage,
} from "@/app/lib/api/openai";
import { http } from "@/app/lib/api/http";
import { saveLogoAsset } from "@/app/lib/api/logoAssets";

export type AiImagePlaygroundProps = {
  /** 같은 페이지에 두 개일 때 label/for/id 충돌 방지 */
  instanceId: string;
  heading: string;
  previewAreaLabel: string;
  placeholder: string;
  defaultPrompt: string;
  previewAlt: string;
  rootClassName?: string;
  /** 로고: 텍스트 생성 / 유니폼: 틀+마스크 인페인트 */
  imageMode?: "generate" | "uniform-inpaint";
};

export default function AiImagePlayground({
  instanceId,
  heading,
  previewAreaLabel,
  placeholder,
  defaultPrompt,
  previewAlt,
  rootClassName = "mt-4",
  imageMode = "generate",
}: AiImagePlaygroundProps) {
  const [prompt, setPrompt] = useState(defaultPrompt);
  const [previewSrc, setPreviewSrc] = useState<string | null>(null);
  const [lastB64Png, setLastB64Png] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [saveMessage, setSaveMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const titleId = `ai-playground-title-${instanceId}`;
  const promptId = `ai-playground-prompt-${instanceId}`;

  async function handleGenerate(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSaveMessage("");
    setPreviewSrc(null);
    setLastB64Png(null);
    setLoading(true);
    try {
      let data;
      if (imageMode === "uniform-inpaint") {
        const origin = window.location.origin;
        const [tRes, mRes] = await Promise.all([
          fetch(`${origin}/uniform/template.png`),
          fetch(`${origin}/uniform/mask.png`),
        ]);
        if (!tRes.ok || !mRes.ok) {
          setError(
            "템플릿/마스크를 불러오지 못했습니다. frontend_ver2/public/uniform/template.png · mask.png 를 확인하세요.",
          );
          return;
        }
        const [templateBlob, maskBlob] = await Promise.all([
          tRes.blob(),
          mRes.blob(),
        ]);
        data = await editUniformInpaint({ prompt, template: templateBlob, mask: maskBlob });
      } else {
        data = await generateOpenAiImage({ prompt });
      }
      if (data.b64Json) {
        setLastB64Png(data.b64Json);
        setPreviewSrc(`data:image/png;base64,${data.b64Json}`);
      } else if (data.imageUrl) {
        setLastB64Png(null);
        setPreviewSrc(data.imageUrl);
      } else {
        setError("응답에 이미지 데이터(b64Json / imageUrl)가 없습니다.");
      }
    } catch (err: unknown) {
      const msg =
        err && typeof err === "object" && "response" in err
          ? JSON.stringify(
              (err as { response?: { data?: unknown } }).response?.data ??
                "요청 실패",
            )
          : "이미지 생성 요청 실패";
      setError(msg);
    } finally {
      setLoading(false);
    }
  }

  async function handleSave() {
    if (!lastB64Png) return;
    setError("");
    setSaveMessage("");
    setSaving(true);
    try {
      const { id, accessPath } = await saveLogoAsset({
        prompt,
        b64Png: lastB64Png,
      });
      const base = (http.defaults.baseURL ?? "").replace(/\/$/, "");
      const fileUrl = `${base}${accessPath}`;
      setSaveMessage(`저장됨 (id: ${id}) · ${fileUrl}`);
    } catch (err: unknown) {
      const msg =
        err && typeof err === "object" && "response" in err
          ? JSON.stringify(
              (err as { response?: { data?: unknown } }).response?.data ??
                "저장 실패",
            )
          : "이미지 저장 요청 실패";
      setError(msg);
    } finally {
      setSaving(false);
    }
  }

  return (
    <section
      className={`rounded-lg border border-neutral-300 p-4 dark:border-neutral-600 ${rootClassName}`}
      aria-labelledby={titleId}
    >
      <h2 id={titleId} className="mb-4 text-lg font-semibold">
        {heading}
      </h2>
      <div className="flex flex-col gap-6 md:flex-row">
        <div className="md:w-1/3">
          <p className="mb-2 text-sm text-neutral-600 dark:text-neutral-400">
            {previewAreaLabel}
          </p>
          <div className="flex min-h-[220px] items-center justify-center overflow-hidden rounded-md border border-neutral-200 bg-neutral-100 p-2 dark:border-neutral-700 dark:bg-neutral-800">
            {loading ? (
              <span className="text-sm text-neutral-500 dark:text-neutral-400">생성 중…</span>
            ) : previewSrc ? (
              // eslint-disable-next-line @next/next/no-img-element -- 동적 data URL / 외부 URL
              <img
                src={previewSrc}
                alt={previewAlt}
                className="max-h-52 w-full object-contain"
              />
            ) : (
              <span className="text-neutral-500 dark:text-neutral-400">{placeholder}</span>
            )}
          </div>
          <button
            type="button"
            disabled={!lastB64Png || saving || loading}
            onClick={handleSave}
            className="mt-3 w-full rounded border border-neutral-400 px-3 py-2 text-sm disabled:opacity-40 dark:border-neutral-500"
          >
            {saving ? "저장 중…" : "로컬 디스크 + DB에 저장"}
          </button>
          {!lastB64Png && previewSrc ? (
            <p className="mt-2 text-xs text-amber-700 dark:text-amber-300">
              URL로만 받은 이미지는 base64가 없어 이 저장 API를 쓸 수 없습니다. 생성 응답에
              b64Json이 있을 때만 저장됩니다.
            </p>
          ) : null}
          {saveMessage ? (
            <p className="mt-2 break-all text-xs text-green-700 dark:text-green-400">
              {saveMessage}
            </p>
          ) : null}
        </div>
        <div className="md:flex-1">
          <form onSubmit={handleGenerate} className="flex flex-col gap-3">
            <label className="text-sm font-medium" htmlFor={promptId}>
              프롬프트
            </label>
            <textarea
              id={promptId}
              className="min-h-[100px] w-full rounded border border-neutral-300 bg-white p-2 text-sm dark:border-neutral-600 dark:bg-neutral-900"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="rounded bg-neutral-900 px-4 py-2 text-sm text-white disabled:opacity-50 dark:bg-neutral-100 dark:text-neutral-900"
            >
              {loading
                ? "생성 중…"
                : imageMode === "uniform-inpaint"
                  ? "틀 유지 · 마스크 영역만 인페인트"
                  : "백엔드로 이미지 생성 요청"}
            </button>
          </form>
          {imageMode === "uniform-inpaint" ? (
            <p className="mt-2 text-xs text-neutral-500">
              틀은 <code className="rounded bg-neutral-200 px-1 dark:bg-neutral-700">public/uniform/template.png</code>
              , 편집할 부위는{" "}
              <code className="rounded bg-neutral-200 px-1 dark:bg-neutral-700">mask.png</code> (알파)로 지정됩니다.
              프롬프트는 마스크 안에 들어갈 디자인 위주로 적는 것이 좋습니다.
            </p>
          ) : null}
          {error ? (
            <pre className="mt-3 max-h-40 overflow-auto rounded bg-red-50 p-2 text-xs text-red-800 dark:bg-red-950 dark:text-red-200">
              {error}
            </pre>
          ) : null}
        </div>
      </div>
    </section>
  );
}
