import MenuDropdown from "@/components/header/MenuDropdown";

export default function Menu() {
  const items = [
    { label: "상품 소개", href: "/shop/intro" },
    { label: "인기 상품", href: "/shop/popular" },
    { label: "공지사항", href: "/support/notice" },
    { label: "FAQ", href: "/support/faq" },
    { label: "고객센터", href: "/support/contact" },
  ];

  return <MenuDropdown items={items} />;
}
