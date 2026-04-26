import MenuDropdown from "@/components/header/MenuDropdown";

export default function UserMenu() {
  const items = [
    { label: "로그인", href: "/user/login" },
    { label: "회원가입", href: "/user/signup" },
    { label: "마이페이지", href: "/user/mypage" },
    { label: "주문내역", href: "/user/orders" },
  ];

  return <MenuDropdown items={items} />;
}
