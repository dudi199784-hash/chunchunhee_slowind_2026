"use client";

import {
  getRecommendImageSrc,
  getStudioProduct,
  type StudioProductId,
} from "@/config/studioProducts";

type ProductDraftHeroProps = {
  productId: StudioProductId;
};

export default function ProductDraftHero({ productId }: ProductDraftHeroProps) {
  const config = getStudioProduct(productId);
  const imageSrc = getRecommendImageSrc(productId);
  const label = config?.label ?? "상품";

  return (
    <div className="studio-maker-box-wrap">
      <div className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden rounded-sm border border-neutral-200 bg-white px-6 text-center">
        {imageSrc ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imageSrc}
              alt=""
              className="pointer-events-none absolute inset-0 h-full w-full object-contain object-center p-6 pt-14 md:p-10 md:pt-16"
              aria-hidden
            />
            <span
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent"
              aria-hidden
            />
          </>
        ) : (
          <span className="absolute inset-0 bg-neutral-100" aria-hidden />
        )}
        <div className="relative z-10 flex max-w-lg flex-col items-center">
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-neutral-700 drop-shadow-sm">
            {label}
          </span>
          <h3 className="mt-3 text-xl font-semibold text-neutral-900 drop-shadow-sm md:text-2xl">
            {label} 시안 생성
          </h3>
          <p className="mt-2 text-sm text-neutral-700">
            {config?.shortDescription ??
              "팀 컨셉에 맞춘 맞춤 시안을 만들어 보세요."}
          </p>
        </div>
      </div>
    </div>
  );
}
