import Link from "next/link";

import Nav from "./Nav";

type MainNavBarProps = {
  isHome: boolean;
  isScrolled: boolean;
};

export default function MainNavBar({ isHome, isScrolled }: MainNavBarProps) {
  return (
    <div
      className={`border-b px-4 transition-colors duration-500 md:px-8 ${
        isHome
          ? isScrolled
            ? "border-neutral-200 bg-white/95 text-neutral-900 backdrop-blur-sm"
            : "border-transparent bg-transparent text-neutral-900"
          : "border-neutral-200 bg-white/95 text-neutral-900 backdrop-blur-sm"
      }`}
    >
      <div className="relative mx-auto flex max-w-[1900px] items-center justify-between gap-4 py-4 md:py-3">
        <Link
          href="/about"
          className="hidden text-xs font-medium tracking-wide text-neutral-900 underline-offset-4 hover:underline sm:inline md:text-sm"
        >
          + 고객센터
        </Link>
        <span className="sm:hidden" aria-hidden />

        <Link
          href="/"
          className="font-[family-name:var(--font-brand-serif)] absolute left-1/2 -translate-x-1/2 text-lg font-medium tracking-[0.28em] md:text-xl"
        >
          CHUNCHUNHEE
        </Link>

        <Nav variant="default" />
      </div>
    </div>
  );
}
