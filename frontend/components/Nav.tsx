'use client'

import Link from "next/link"
import { useState } from 'react'

import UserMenu from '@/components/UserMenu'

export default function Nav() {
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
    const toggleUserMenu = () => {
        setIsUserMenuOpen(prev => !prev)
    }
return (
    <div>
        <nav className="relative flex gap-4">
            <Link href="/">홈</Link>
            <Link href="/about">소개 ----------</Link>
            <Link href="/cart">쇼핑백</Link>
            <button onClick={toggleUserMenu}>1213</button>
            <Link href="/shop">상점</Link>
            <Link href="/product">메뉴</Link>
            {isUserMenuOpen && (
                <UserMenu />
            )}               
        </nav>
    </div>
    )
}
