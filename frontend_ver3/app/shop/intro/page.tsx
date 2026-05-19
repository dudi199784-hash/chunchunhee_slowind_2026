import Link from "next/link";

const BASE_PRODUCTS = [
  {
    id: "base-uniform",
    name: "베이스 유니폼",
    material: "폴리에스터 92% · 스판 8%",
    sizeRange: "S-2XL",
    guide: "통기성, 신축성 중심. 팀/개인 디자인을 AI로 입혀 주문",
  },
  {
    id: "base-logo-patch",
    name: "베이스 로고 패치",
    material: "트윌 원단 + 열전사 필름",
    sizeRange: "6cm / 8cm / 10cm",
    guide: "기본 패치 규격 위에 AI 생성 로고 디자인 적용",
  },
  {
    id: "base-warmup",
    name: "베이스 웜업 자켓",
    material: "나일론 68% · 코튼 32%",
    sizeRange: "M-XL",
    guide: "기본 자켓 핏 유지, 전면/후면 그래픽만 커스텀",
  },
] as const;

export default function ProductIntroPage() {
  return (
    <main className="mx-auto w-full max-w-7xl bg-white px-6 py-16 text-neutral-900 md:px-10 md:py-20">
      <header className="border-b border-neutral-200 pb-8">
        <p className="text-xs font-medium tracking-[0.2em] text-neutral-500">
          PRODUCT INTRO
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-wide md:text-4xl">
          상품 소개
        </h1>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-neutral-600">
          상품을 새로 제작하는 구조가 아니라, 기본 베이스 상품에 AI 디자인을
          입혀 주문하는 방식입니다. 아래는 베이스 상품의 재질/사이즈 기준표입니다.
        </p>
      </header>

      <section className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {BASE_PRODUCTS.map((item) => (
          <article
            key={item.id}
            className="border border-neutral-200 bg-white p-5 shadow-sm"
          >
            <h2 className="text-lg font-semibold text-neutral-900">{item.name}</h2>
            <dl className="mt-4 space-y-3 text-sm">
              <div>
                <dt className="text-xs font-medium tracking-wide text-neutral-500">재질</dt>
                <dd className="mt-1 text-neutral-800">{item.material}</dd>
              </div>
              <div>
                <dt className="text-xs font-medium tracking-wide text-neutral-500">사이즈</dt>
                <dd className="mt-1 text-neutral-800">{item.sizeRange}</dd>
              </div>
              <div>
                <dt className="text-xs font-medium tracking-wide text-neutral-500">설명</dt>
                <dd className="mt-1 text-neutral-700">{item.guide}</dd>
              </div>
            </dl>
          </article>
        ))}
      </section>

      <div className="mt-12 flex flex-wrap gap-3 text-sm">
        <Link
          href="/shop/popular"
          className="rounded-md border border-neutral-300 px-4 py-2 font-medium text-neutral-800 transition hover:bg-neutral-50"
        >
          인기 디자인 보기
        </Link>
        <Link
          href="/cart"
          className="rounded-md bg-neutral-900 px-4 py-2 font-medium text-white transition hover:bg-neutral-800"
        >
          쇼핑백 이동
        </Link>
      </div>
    </main>
  );
}
