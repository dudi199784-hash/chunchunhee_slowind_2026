"use client";

import Link from "next/link";
import { useEffect, useId, useState } from "react";

import type { CartItemPlaceholder } from "@/app/cart/types";

const PURCHASE_NAV = [
  { key: "desc" as const, label: "제품설명" },
  { key: "size" as const, label: "사이즈 안내" },
  { key: "review" as const, label: "리뷰" },
  { key: "qna" as const, label: "QnA" },
];

type TabKey = (typeof PURCHASE_NAV)[number]["key"];

const QTY_MAX = 30;
const PANEL_MIN_H = "min-h-[min(80vh,50rem)]";

function clampQuantity(n: number) {
  return Math.max(1, Math.min(QTY_MAX, n));
}

type CartPurchaseClientProps = {
  product: CartItemPlaceholder | null;
  productId: string | null;
};

function alignNameLines(qty: number, prev: string[]) {
  return Array.from({ length: qty }, (_, i) => prev[i] ?? "");
}

function ProductImageSlot() {
  return (
    <div className="flex min-h-0 flex-1 flex-col p-2 sm:p-3">
      <div
        className="flex min-h-[16rem] min-w-0 flex-1 flex-col items-center justify-center overflow-hidden rounded-lg border border-dashed border-neutral-300 bg-neutral-100"
        role="img"
        aria-label="상품 대표 사진 영역. 이미지 연동 후 표시됩니다."
      >
        <div className="flex max-w-xs flex-col items-center gap-2 px-6 text-center sm:gap-3">
          <svg
            className="h-20 w-20 shrink-0 text-neutral-300"
            viewBox="0 0 64 64"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
            aria-hidden
          >
            <rect x="6" y="10" width="52" height="40" rx="3" />
            <path
              d="M6 40l8-5 6 3 6-3 4 2 4-2 4 2 8-3v4a3 3 0 0 1-3 3H9a3 3 0 0 1-3-3v-1z"
              fill="currentColor"
              fillOpacity="0.12"
              stroke="none"
            />
            <circle
              cx="24"
              cy="24"
              r="4"
              fill="currentColor"
              fillOpacity="0.2"
              stroke="none"
            />
          </svg>
          <p className="text-sm font-medium text-neutral-500">상품 사진</p>
          <p className="text-xs leading-relaxed text-neutral-400">
            대표 이미지는 상품·재고 API와 연동되면 이 영역에 나타납니다.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function CartPurchaseClient({
  product,
  productId,
}: CartPurchaseClientProps) {
  const title = product?.title ?? "알 수 없는 상품";
  const subtitle = product?.subtitle;
  const formId = useId();

  const [quantity, setQuantity] = useState(1);
  const [qtyText, setQtyText] = useState("1");
  const [nameLines, setNameLines] = useState<string[]>([""]);
  const [activeTab, setActiveTab] = useState<TabKey>("desc");

  const applyQuantity = (n: number) => {
    const c = clampQuantity(n);
    setQuantity(c);
    setQtyText(String(c));
  };

  useEffect(() => {
    setNameLines((prev) => alignNameLines(quantity, prev));
  }, [quantity]);

  return (
    <div className="w-full">
      <div
        className="grid items-stretch gap-8"
        style={{ gridTemplateColumns: "minmax(0, 3fr) minmax(0, 2fr)" }}
      >
        {/* 상품: 항상 좌우 3:2 */}
        <div
          className={`flex min-h-0 flex-col overflow-hidden border border-neutral-200 bg-white ${PANEL_MIN_H}`}
        >
          <ProductImageSlot />
        </div>

        {/* 옵션 */}
        <div
          className={`flex min-h-0 flex-col ${PANEL_MIN_H}`}
        >
          <h2 className="shrink-0 text-lg font-semibold text-neutral-900">
            구매 옵션 확인하기
          </h2>

          <div className="mt-4 shrink-0">
            <p className="text-xs font-medium uppercase tracking-wide text-neutral-500">
              제품명
            </p>
            <p className="mt-1 text-base font-medium text-neutral-900">
              {title}
            </p>
            {subtitle ? (
              <p className="mt-1 text-sm text-neutral-500">{subtitle}</p>
            ) : null}
          </div>

          <div className="mt-4 shrink-0">
            <p
              id={`${formId}-qty-label`}
              className="text-xs font-medium uppercase tracking-wide text-neutral-500"
            >
              제품 수량
            </p>
            <div className="mt-2 flex max-w-xs items-stretch gap-0 rounded-md border border-neutral-300 bg-white">
              <button
                type="button"
                aria-label="수량 감소"
                disabled={quantity <= 1}
                onClick={() => applyQuantity(quantity - 1)}
                className="w-10 shrink-0 text-lg font-medium text-neutral-800 transition hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-40"
              >
                −
              </button>
              <input
                type="text"
                inputMode="numeric"
                autoComplete="off"
                aria-labelledby={`${formId}-qty-label`}
                value={qtyText}
                onChange={(e) => {
                  const v = e.target.value;
                  setQtyText(v);
                  const t = v.replace(/[^\d]/g, "");
                  if (t === "") return;
                  const n = parseInt(t, 10);
                  if (Number.isNaN(n)) return;
                  setQuantity(clampQuantity(n));
                }}
                onBlur={() => {
                  const t = qtyText.replace(/[^\d]/g, "");
                  if (t === "" || t === "0") {
                    applyQuantity(1);
                    return;
                  }
                  const n = parseInt(t, 10);
                  if (Number.isNaN(n)) applyQuantity(1);
                  else applyQuantity(n);
                }}
                className="min-w-0 flex-1 border-x border-neutral-200 py-2 text-center text-sm font-medium tabular-nums text-neutral-900 outline-none"
              />
              <button
                type="button"
                aria-label="수량 증가"
                disabled={quantity >= QTY_MAX}
                onClick={() => applyQuantity(quantity + 1)}
                className="w-10 shrink-0 text-lg font-medium text-neutral-800 transition hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-40"
              >
                +
              </button>
            </div>
            <p className="mt-1 text-xs text-neutral-400">
              최대 {QTY_MAX}개까지 · 숫자를 누르면 직접 입력
            </p>
          </div>

          <div className="mt-3 flex min-h-0 flex-1 flex-col">
            <div className="shrink-0">
              <p className="text-xs font-medium uppercase tracking-wide text-neutral-500">
                이니셜 또는 이름
                <span className="ml-1 font-normal normal-case text-neutral-400">
                  (박스 안에서만 스크롤)
                </span>
              </p>
              <div
                className="mt-2 flex h-[min(20rem,45vh)] min-h-[7.5rem] flex-col overflow-hidden rounded-lg border border-neutral-300 bg-neutral-50 shadow-[inset_0_1px_2px_rgba(0,0,0,0.04)]"
                role="region"
                aria-label="이니셜·이름 입력. 줄이 많을 때 이 상자 안에서만 스크롤됩니다."
              >
                <div className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden overscroll-y-contain [-webkit-overflow-scrolling:touch] px-3 py-2.5 sm:px-3.5 sm:py-3">
                  <div className="space-y-3">
                    {nameLines.map((val, i) => (
                      <div key={i}>
                        <label
                          htmlFor={`${formId}-name-${i}`}
                          className="text-xs text-neutral-600"
                        >
                          {i + 1}벌
                        </label>
                        <input
                          id={`${formId}-name-${i}`}
                          type="text"
                          value={val}
                          onChange={(e) => {
                            const v = e.target.value;
                            setNameLines((lines) => {
                              const next = [...lines];
                              next[i] = v;
                              return next;
                            });
                          }}
                          placeholder="예: J.H / 홍길동"
                          className="mt-1 w-full rounded-md border border-neutral-300 bg-white px-3 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400"
                          autoComplete="name"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-auto flex shrink-0 flex-col gap-0 pt-4">
              <p className="text-xs text-neutral-400">
                결제·배송은 API 연동 후 이어집니다. 지금은 옵션 입력 UI만
                데모입니다.
              </p>
              <button
                type="button"
                className="mt-3 w-full rounded-md bg-neutral-900 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800"
              >
                구매하기
              </button>
            </div>
          </div>
        </div>
      </div>

      <p className="mt-3 text-sm text-neutral-500">
        상품 ID{" "}
        <span className="font-mono text-neutral-700">
          {productId ?? "—"}
        </span>
      </p>

      <nav
        className="mt-16 border-b border-neutral-200"
        aria-label="상품 하단 정보"
      >
        <ul className="flex flex-wrap gap-1">
          {PURCHASE_NAV.map(({ key, label }) => (
            <li key={key}>
              <button
                type="button"
                onClick={() => setActiveTab(key)}
                className={`block border-b-2 px-3 py-3 text-sm font-medium transition ${
                  activeTab === key
                    ? "border-neutral-900 text-neutral-900"
                    : "border-transparent text-neutral-600 hover:border-neutral-300 hover:text-neutral-900"
                }`}
              >
                {label}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mt-6 min-h-[8rem] pb-16">
        {activeTab === "size" ? (
          <section aria-labelledby="tab-size">
            <h3 id="tab-size" className="text-lg font-semibold text-neutral-900">
              사이즈 안내
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-neutral-600">
              실제 사이즈는 제품·재고에 따라 API에서 불러올 수 있습니다. 여기는
              예시이며, 가슴둘레·기장 등 상세 치수 안내를 넣을 수 있습니다.
            </p>
          </section>
        ) : null}
        {activeTab === "desc" ? (
          <section aria-labelledby="tab-desc">
            <h3 id="tab-desc" className="text-lg font-semibold text-neutral-900">
              제품설명
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-neutral-600">
              {title}에 대한 상세 설명, 소재, 세탁 방법 등이 들어갑니다.
            </p>
          </section>
        ) : null}
        {activeTab === "qna" ? (
          <section aria-labelledby="tab-qna">
            <h3 id="tab-qna" className="text-lg font-semibold text-neutral-900">
              QnA
            </h3>
            <p className="mt-3 text-sm text-neutral-500">
              질문·답변 목록은 연동 후 표시됩니다.
            </p>
          </section>
        ) : null}
        {activeTab === "review" ? (
          <section aria-labelledby="tab-review">
            <h3
              id="tab-review"
              className="text-lg font-semibold text-neutral-900"
            >
              리뷰
            </h3>
            <p className="mt-3 text-sm text-neutral-500">
              구매자 리뷰는 연동 후 표시됩니다.
            </p>
          </section>
        ) : null}
      </div>

      <p className="pt-4">
        <Link
          href="/cart"
          className="text-sm font-medium text-neutral-900 underline-offset-4 hover:underline"
        >
          ← 쇼핑백으로
        </Link>
      </p>
    </div>
  );
}
