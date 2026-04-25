import Link from "next/link"

type Item = {
  label: string
  href?: string
}

export default function MenuDropdown({ items }: { items: Item[] }) {
  return (
    <div className="fixed top-24 right-4 z-[60] w-48 rounded-lg border border-neutral-200 bg-white text-neutral-900 shadow-lg md:right-8">
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