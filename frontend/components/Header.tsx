"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import Nav from "@/components/Nav";

const NOTICE_ITEMS = [
  "( 한정 수량 ) 지금 구매서 windy 굿즈 증정 !",
  "오픈카톡상담 24시간",
  "단체 주문 할인율 (~50%)",
] as const;
const HIDE_SCROLL_Y = 1;
const SHOW_SCROLL_Y = 0;
const TOGGLE_COOLDOWN_MS = 220;

export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [currentNoticeIdx, setCurrentNoticeIdx] = useState(0);
  const [nextNoticeIdx, setNextNoticeIdx] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const scrollRafRef = useRef<number | null>(null);
  const isScrolledRef = useRef(false);
  const lastToggleAtRef = useRef(0);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setNextNoticeIdx((currentNoticeIdx + 1) % NOTICE_ITEMS.length);
      setIsTransitioning(true);
    }, 1750);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [currentNoticeIdx]);

  useEffect(() => {
    if (!isTransitioning) return;

    const timeoutId = window.setTimeout(() => {
      setCurrentNoticeIdx(nextNoticeIdx);
      setIsTransitioning(false);
    }, 650);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [isTransitioning, nextNoticeIdx]);

  useEffect(() => {
    const onScroll = () => {
      if (scrollRafRef.current !== null) return;

      scrollRafRef.current = window.requestAnimationFrame(() => {
        const y = window.scrollY;
        const now = performance.now();

        if (now - lastToggleAtRef.current < TOGGLE_COOLDOWN_MS) {
          scrollRafRef.current = null;
          return;
        }

        if (!isScrolledRef.current && y > HIDE_SCROLL_Y) {
          isScrolledRef.current = true;
          setIsScrolled(true);
          lastToggleAtRef.current = now;
        } else if (isScrolledRef.current && y <= SHOW_SCROLL_Y) {
          isScrolledRef.current = false;
          setIsScrolled(false);
          lastToggleAtRef.current = now;
        }
        scrollRafRef.current = null;
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (scrollRafRef.current !== null) {
        window.cancelAnimationFrame(scrollRafRef.current);
      }
    };
  }, []);

  return (
    <header
      className={isHome ? "fixed inset-x-0 top-0 z-50" : "sticky inset-x-0 top-0 z-50"}
    >
      <div
        className={`overflow-hidden bg-neutral-100/90 transition-[max-height,opacity] duration-500 ease-out ${
          isScrolled ? "max-h-0 opacity-0" : "max-h-12 opacity-100"
        }`}
      >
        <div className="relative flex items-center justify-center px-4 py-2 text-[11px] font-medium tracking-wide text-neutral-800 md:px-8 md:text-xs">
          <div className="relative h-[1.2em] w-full max-w-xl overflow-hidden text-center">
            <span
              className={`absolute left-0 right-0 top-0 truncate ${
                isTransitioning
                  ? "-translate-y-3 opacity-0 transition-all duration-650 ease-out"
                  : "translate-y-0 opacity-100"
              }`}
            >
              {NOTICE_ITEMS[currentNoticeIdx]}
            </span>
            <span
              className={`absolute left-0 right-0 top-0 truncate ${
                isTransitioning
                  ? "translate-y-0 opacity-100 transition-all duration-650 ease-out"
                  : "translate-y-3 opacity-0 transition-none"
              }`}
            >
              {NOTICE_ITEMS[nextNoticeIdx]}
            </span>
          </div>
          <span className="absolute right-4 tabular-nums text-neutral-500 md:right-8">
            {currentNoticeIdx + 1} / {NOTICE_ITEMS.length}
          </span>
        </div>
      </div>

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
    </header>
  );
}
