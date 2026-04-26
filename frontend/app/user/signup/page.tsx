import Link from "next/link";

export default function SignupPage() {
  return (
    <section className="mx-auto flex w-full max-w-7xl px-6 py-20 md:px-10 md:py-28">
      <div className="mx-auto w-full max-w-md border border-neutral-200 bg-white p-8 shadow-sm md:p-10">
        <header className="text-center">
          <p className="text-xs font-medium tracking-[0.22em] text-neutral-500">CHUNCHUNHEE</p>
          <h1 className="mt-3 text-2xl font-semibold tracking-wide text-neutral-900 md:text-3xl">회원가입</h1>
        </header>

        <form className="mt-8 space-y-4">
          <input className="w-full border border-neutral-300 px-4 py-3 text-sm" placeholder="이메일" />
          <input className="w-full border border-neutral-300 px-4 py-3 text-sm" placeholder="이름" />
          <input type="password" className="w-full border border-neutral-300 px-4 py-3 text-sm" placeholder="비밀번호" />
          <input type="password" className="w-full border border-neutral-300 px-4 py-3 text-sm" placeholder="비밀번호 확인" />
          <button type="submit" className="w-full bg-neutral-900 px-4 py-3 text-sm font-medium text-white transition hover:bg-neutral-700">가입하기</button>
        </form>

        <p className="mt-6 text-center text-xs text-neutral-500">
          이미 계정이 있나요?{" "}
          <Link href="/user/login" className="font-medium text-neutral-800 underline">
            로그인
          </Link>
        </p>
      </div>
    </section>
  );
}
