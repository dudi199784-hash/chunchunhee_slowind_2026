import Link from "next/link";

const ADDRESSES = [
  { id: "addr-1", label: "기본 배송지", receiver: "홍길동", phone: "010-1234-5678", address: "서울 강남구 테헤란로 00, 101동 1203호" },
  { id: "addr-2", label: "서브 배송지", receiver: "홍길동", phone: "010-9876-5432", address: "경기 성남시 분당구 판교역로 00" },
] as const;

export default function MyPage() {
  return (
    <main className="mx-auto w-full max-w-7xl bg-white px-6 py-16 text-neutral-900 md:px-10 md:py-20">
      <header className="border-b border-neutral-200 pb-8">
        <p className="text-xs font-medium tracking-[0.2em] text-neutral-500">MY PAGE</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-wide md:text-4xl">마이페이지</h1>
      </header>

      <section className="mt-10 rounded-lg border border-neutral-200 p-6">
        <h2 className="text-lg font-semibold">계정 요약</h2>
        <p className="mt-2 text-sm text-neutral-600">windy@chunchunhee.com · 일반 회원</p>
        <div className="mt-4 flex flex-wrap gap-2 text-sm">
          <Link href="/user/orders" className="rounded-md bg-neutral-900 px-4 py-2 font-medium text-white">주문내역</Link>
          <Link href="/user/login" className="rounded-md border border-neutral-300 px-4 py-2 font-medium text-neutral-800">로그인 정보 변경</Link>
        </div>
      </section>

      <section className="mt-8 rounded-lg border border-neutral-200 p-6">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-lg font-semibold">배송지 관리</h2>
          <button type="button" className="rounded-md border border-neutral-300 px-3 py-2 text-xs font-medium text-neutral-700">배송지 추가</button>
        </div>
        <ul className="mt-4 space-y-3">
          {ADDRESSES.map((a) => (
            <li key={a.id} className="rounded-md border border-neutral-200 p-4">
              <p className="text-sm font-semibold text-neutral-900">{a.label}</p>
              <p className="mt-1 text-sm text-neutral-700">{a.receiver} · {a.phone}</p>
              <p className="mt-1 text-sm text-neutral-600">{a.address}</p>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
