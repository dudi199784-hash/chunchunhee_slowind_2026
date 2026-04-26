import Link from "next/link";

import SocialLoginSection from "@/components/user/SocialLoginSection";

export default function Login() {
  return (
    <section className="mx-auto flex w-full max-w-7xl px-6 py-20 md:px-10 md:py-28">
      <div className="mx-auto w-full max-w-md border border-neutral-200 bg-white p-8 shadow-sm md:p-10">
        <header className="text-center">
          <p className="text-xs font-medium tracking-[0.22em] text-neutral-500">
            CHUNCHUNHEE
          </p>
          <h1 className="mt-3 text-2xl font-semibold tracking-wide text-neutral-900 md:text-3xl">
            로그인
          </h1>
          <p className="mt-2 text-sm text-neutral-600">
            회원 정보로 로그인하고 커스텀 제작을 이어서 진행하세요.
          </p>
        </header>

        <form className="mt-8 space-y-4">
          <label className="block">
            <span className="mb-2 block text-xs font-medium tracking-wide text-neutral-700">
              이메일 또는 아이디
            </span>
            <input
              type="text"
              placeholder="example@windy.com"
              className="w-full border border-neutral-300 bg-white px-4 py-3 text-sm text-neutral-900 outline-none transition focus:border-neutral-500"
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-xs font-medium tracking-wide text-neutral-700">
              비밀번호
            </span>
            <input
              type="password"
              placeholder="비밀번호를 입력하세요"
              className="w-full border border-neutral-300 bg-white px-4 py-3 text-sm text-neutral-900 outline-none transition focus:border-neutral-500"
            />
          </label>

          <button
            type="submit"
            className="mt-2 w-full bg-neutral-900 px-4 py-3 text-sm font-medium tracking-wide text-white transition hover:bg-neutral-700"
          >
            로그인
          </button>
        </form>

        <SocialLoginSection />

        <div className="mt-6 flex items-center justify-between text-xs text-neutral-500">
          <button type="button" className="transition hover:text-neutral-800">
            비밀번호 찾기
          </button>
          <Link href="/user/signup" className="transition hover:text-neutral-800">
            회원가입
          </Link>
        </div>
      </div>
    </section>
  );
}
