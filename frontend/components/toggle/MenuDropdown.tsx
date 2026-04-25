import Link from "next/link"

type Item = {
  label: string
  href?: string
}

export default function MenuDropdown({ items }: { items: Item[] }) {
  return (
    <div className="fixed top-16 right-6 w-48 shadow-lg rounded-lg z-50 border">
      <ul className="py-2 text-sm">
        {items.map((item, idx) => (
          <li
            key={idx}
            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
          >
            {item.href ? (
              <Link href={item.href}>{item.label}</Link>
            ) : (
              item.label
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}