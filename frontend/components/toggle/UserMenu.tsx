import MenuDropdown from "./MenuDropdown"

export default function UserMenu() {
  const items = [
    { label: "로그인" },
    { label: "주문상세" },
    { label: "주문내역" },
  ]

  return <MenuDropdown items={items} />
}