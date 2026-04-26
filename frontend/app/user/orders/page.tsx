import Link from "next/link";

const ORDERS = [
  {
    id: "CH-20260427-001",
    date: "2026-04-27",
    status: "제작 진행중",
    total: "189,000원",
    items: [
      { name: "베이스 유니폼", option: "M / 등번호 10", qty: 2, detail: "이니셜: JH, HK" },
      { name: "로고 패치", option: "8cm", qty: 1, detail: "로고 시안 B" },
    ],
  },
  {
    id: "CH-20260412-015",
    date: "2026-04-12",
    status: "배송 완료",
    total: "72,000원",
    items: [{ name: "웜업 자켓", option: "L", qty: 1, detail: "후면 로고 커스텀" }],
  },
] as const;

export default function OrdersPage() {
  return (
    <main className="mx-auto w-full max-w-7xl bg-white px-6 py-16 text-neutral-900 md:px-10 md:py-20">
      <header className="border-b border-neutral-200 pb-8">
        <p className="text-xs font-medium tracking-[0.2em] text-neutral-500">ORDER HISTORY</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-wide md:text-4xl">주문내역</h1>
        <p className="mt-2 text-sm text-neutral-600">주문상세는 각 주문 카드 안에 포함됩니다.</p>
      </header>

      <div className="mt-8 space-y-5">
        {ORDERS.map((order) => (
          <article key={order.id} className="rounded-lg border border-neutral-200 p-5">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-neutral-100 pb-3">
              <p className="text-sm font-semibold">주문번호 {order.id}</p>
              <p className="text-xs text-neutral-500">{order.date} · {order.status}</p>
            </div>
            <ul className="mt-4 space-y-3">
              {order.items.map((item, idx) => (
                <li key={idx} className="rounded-md bg-neutral-50 px-4 py-3 text-sm">
                  <p className="font-medium text-neutral-900">{item.name}</p>
                  <p className="mt-1 text-neutral-600">{item.option} · 수량 {item.qty}개</p>
                  <p className="mt-1 text-neutral-500">상세: {item.detail}</p>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-right text-sm font-semibold text-neutral-900">합계 {order.total}</p>
          </article>
        ))}
      </div>

      <p className="mt-8 text-sm">
        <Link href="/user/mypage" className="font-medium text-neutral-800 underline">← 마이페이지</Link>
      </p>
    </main>
  );
}
