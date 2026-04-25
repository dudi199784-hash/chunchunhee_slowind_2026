"use client";

import Link from "next/link";
import { useState } from "react";

import UserMenu from "@/components/toggle/UserMenu";
import Menu from "@/components/toggle/Menu";

type NavProps = {
  variant?: "overlay" | "default";
};

export default function Nav({ variant = "default" }: NavProps) {
  const [isMenuOpen, setIsMenuOpen] = useState<"user" | "menu" | null>(null);
  const overlay = variant === "overlay";

  const toggleMenu = (type: "user" | "menu") => {
    setIsMenuOpen((prev) => (prev === type ? null : type));
  };

  const ghostBtn =
    "inline-flex items-center justify-center rounded-full border px-3 py-2 text-xs font-medium tracking-wide transition md:text-sm";

  const ghostBtnClass = overlay
    ? `${ghostBtn} border-white/35 bg-white/5 text-white hover:bg-white/10`
    : `${ghostBtn} border-neutral-200 bg-white text-neutral-900 hover:bg-neutral-50`;

  const iconLink = "text-xs font-medium tracking-wide md:text-sm";

  const iconLinkClass = overlay
    ? `${iconLink} text-white/90 hover:text-white`
    : `${iconLink} text-neutral-800 hover:text-neutral-950`;

  return (
    <nav className="relative flex items-center gap-2 md:gap-3">
      <Link href="/cart" className={`${iconLinkClass} hidden sm:inline`}>
        쇼핑백
      </Link>
      <button type="button" className={ghostBtnClass} aria-label="검색">
        검색
      </button>
      <button type="button" onClick={() => toggleMenu("user")} className={ghostBtnClass}>
        유저
      </button>
      <button type="button" onClick={() => toggleMenu("menu")} className={ghostBtnClass}>
        MENU
      </button>

      {isMenuOpen === "menu" && <Menu />}
      {isMenuOpen === "user" && <UserMenu />}
    </nav>
  );
}
