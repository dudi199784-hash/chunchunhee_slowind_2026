import MediaSlot from "@/components/media/MediaSlot";
import { customMakerMedia } from "@/config/media";

type CustomMakerProps = {
  /** 쇼핑백 등 다른 페이지 하단에 붙일 때 홈과 동일 `mt-20` 중복 방지 */
  noTopMargin?: boolean;
};

export default function CustomMaker({ noTopMargin }: CustomMakerProps) {
  return (
    <section
      className={`mx-auto max-w-7xl border border-red-500 px-6 pb-20 md:px-10 ${
        noTopMargin ? "mt-0" : "mt-20"
      }`}
    >
      <h2 className="mb-6 flex justify-center">커스텀 제작</h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="relative w-full min-h-[650px] overflow-hidden border border-neutral-200">
          <div className="absolute inset-0">
            <MediaSlot
              media={customMakerMedia.logo}
              sizes="(max-width: 768px) 100vw, 50vw"
              className="h-full"
              fallback={
                <h2 className="text-base font-medium md:text-lg">
                  팀 로고 생성
                </h2>
              }
            />
          </div>
        </div>
        <div className="relative w-full min-h-[650px] overflow-hidden border border-neutral-200">
          <div className="absolute inset-0">
            <MediaSlot
              media={customMakerMedia.product}
              sizes="(max-width: 768px) 100vw, 50vw"
              className="h-full"
              fallback={
                <h2 className="text-base font-medium md:text-lg">
                  상품 디자인 생성
                </h2>
              }
            />
          </div>
        </div>
      </div>
    </section>
  );
}
