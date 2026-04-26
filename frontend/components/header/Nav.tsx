"use client";

import Link from "next/link";
import { useState } from "react";

import MediaSlot from "@/components/media/MediaSlot";
import UserMenu from "@/components/toggle/UserMenu";
import Menu from "@/components/toggle/Menu";
import { navMedia } from "@/config/media";

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
    "inline-flex items-center justify-center gap-2 rounded-full border px-3 py-2 text-xs font-medium tracking-wide transition md:text-sm";

  const ghostBtnClass = overlay
    ? `${ghostBtn} border-white/35 bg-white/5 text-white hover:bg-white/10`
    : `${ghostBtn} border-neutral-200 bg-white text-neutral-900 hover:bg-neutral-50`;

  const iconLink =
    "inline-flex items-center gap-2 text-xs font-medium tracking-wide md:text-sm";

  const iconLinkClass = overlay
    ? `${iconLink} text-white/90 hover:text-white`
    : `${iconLink} text-neutral-800 hover:text-neutral-950`;

  const iconShell =
    "relative h-8 w-8 shrink-0 overflow-hidden rounded-md border border-current/25";

  return (
    <nav className="relative flex items-center gap-2 md:gap-3">
      <Link href="/cart" className={`${iconLinkClass} hidden sm:inline`}>
        <span className={iconShell} aria-hidden>
          <MediaSlot
            media={navMedia.cart}
            sizes="32px"
            dense
            objectClassName="object-contain"
            className="bg-transparent"
          />
        </span>
        쇼핑백
      </Link>
      <button type="button" onClick={() => toggleMenu("user")} className={ghostBtnClass}>
        <span className={iconShell} aria-hidden>
          <MediaSlot
            media={navMedia.user}
            sizes="32px"
            dense
            objectClassName="object-contain"
            className="bg-transparent"
          />
        </span>
        유저
      </button>
      <button type="button" onClick={() => toggleMenu("menu")} className={ghostBtnClass}>
        <span className={iconShell} aria-hidden>
          <MediaSlot
            media={navMedia.menu}
            sizes="32px"
            dense
            objectClassName="object-contain"
            className="bg-transparent"
          />
        </span>
        MENU
      </button>

      {isMenuOpen === "menu" && <Menu />}
      {isMenuOpen === "user" && <UserMenu />}
    </nav>
  );
}
