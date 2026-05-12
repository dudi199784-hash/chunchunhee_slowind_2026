"use client";

import { useState } from "react";
import { generateOpenAiImage } from "@/app/lib/api/openai";

export default function LogoImagePlayground() {
  const [prompt, setPrompt] = useState(
    "심플한 원형 로고, 티셔츠 브랜드, 미니멀 벡터 스타일",
  );
  const [previewSrc, setPreviewSrc] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleGenerate(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setPreviewSrc(null);
    setLoading(true);
    try {
      const data = await generateOpenAiImage({ prompt });
      if (data.b64Json) {
        setPreviewSrc(`data:image/png;base64,${data.b64Json}`);
      } else if (data.imageUrl) {
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

  return (
    <section
      className="mt-8 rounded-lg border border-neutral-300 p-4 dark:border-neutral-600"
      aria-labelledby="logo-image-playground-title"
    >
      <h2 id="logo-image-playground-title" className="mb-4 text-lg font-semibold">
        로고 · 이미지 생성 테스트
      </h2>
      <div className="flex flex-col gap-6 md:flex-row">
        <div className="md:w-1/3">
          <p className="mb-2 text-sm text-neutral-600 dark:text-neutral-400">로고 영역</p>
          <div className="flex h-40 items-center justify-center rounded-md bg-neutral-100 text-neutral-500 dark:bg-neutral-800 dark:text-neutral-400">
            로고 자리
          </div>
          <p className="mt-2 text-xs text-neutral-500">
            백엔드 연동 후 생성 이미지를 로고 후보로 쓰거나 저장 플로우를 붙이면 됩니다.
          </p>
        </div>
        <div className="md:flex-1">
          <form onSubmit={handleGenerate} className="flex flex-col gap-3">
            <label className="text-sm font-medium" htmlFor="image-prompt">
              프롬프트
            </label>
            <textarea
              id="image-prompt"
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
              {loading ? "생성 중…" : "백엔드로 이미지 생성 요청"}
            </button>
          </form>
          {error ? (
            <pre className="mt-3 max-h-40 overflow-auto rounded bg-red-50 p-2 text-xs text-red-800 dark:bg-red-950 dark:text-red-200">
              {error}
            </pre>
          ) : null}
          {previewSrc ? (
            <div className="mt-4">
              <p className="mb-2 text-sm font-medium">결과</p>
              {/* eslint-disable-next-line @next/next/no-img-element -- 동적 data URL / 외부 URL */}
              <img
                src={previewSrc}
                alt="생성 결과"
                className="max-h-80 w-auto max-w-full rounded border border-neutral-200 dark:border-neutral-700"
              />
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
