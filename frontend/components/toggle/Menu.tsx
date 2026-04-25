import MenuDropdown from "./MenuDropdown"

export default function Menu() {
  const items = [
    { label: "스포츠 의류", href: "/shop/sports-wear" },
    { label: "악세사리", href: "/shop/sports-acc" },
    { label: "기타", href: "/shop/else" },
  ]

  return <MenuDropdown items={items} />
}