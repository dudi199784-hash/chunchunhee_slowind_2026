import CustomMaker from "@/app/home/CustomMaker";
import MemberDesignShowcase from "@/components/community/MemberDesignShowcase";

import CartCategorySection from "./CartCategorySection";
import {
  cartLogoItems,
  cartOtherItems,
  cartUniformItems,
} from "./cartData";

export default function CartPage() {
  return (
    <main className="mx-auto w-full max-w-7xl bg-white px-6 py-16 text-neutral-900 md:px-10 md:py-20">
      <header className="border-b border-neutral-200 pb-8">
        <p className="text-xs font-medium tracking-[0.2em] text-neutral-500">
          SHOPPING BAG
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-wide md:text-4xl">
          쇼핑백
        </h1>
        <p className="mt-2 max-w-xl text-sm text-neutral-600">
          로고 · 유니폼 · 기타 상품이 구분되어 표시됩니다. 한 줄에 최대 3개까지
          배치됩니다. 카드 이미지에 마우스를 올리면 구매하기·수정하기를 쓸 수
          있습니다.
        </p>
      </header>

      <div className="mt-12 space-y-16 md:mt-16 md:space-y-20">
        <CartCategorySection title="로고" items={cartLogoItems} />
        <CartCategorySection title="유니폼" items={cartUniformItems} />
        <CartCategorySection title="기타" items={cartOtherItems} />
      </div>

      <div className="mt-16 border-t border-neutral-200 pt-12 md:mt-20 md:pt-16">
        <CustomMaker noTopMargin />
      </div>

      <MemberDesignShowcase className="mt-12 md:mt-16" />
    </main>
  );
}
