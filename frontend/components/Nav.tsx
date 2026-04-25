'use client'

import Link from "next/link"
import { useState } from 'react'

import UserMenu from '@/components/toggle/UserMenu'
import Menu from "@/components/toggle/Menu"

export default function Nav() {
    const [ isMenuOpen, setIsMenuOpen ] = useState<'user' | 'menu' | null>(null)
    const toggleMenu = (type: 'user' | 'menu') => {
        setIsMenuOpen(prev => prev === type ? null : type)
    }
return (
    <div>
        <nav className="relative flex gap-4">
            <Link href="/">홈</Link>
            <Link href="/about">소개 ----------</Link>
            <Link href="/cart">쇼핑백</Link>
            <button onClick={() => toggleMenu('user')}>유저</button>
            <button onClick={() => toggleMenu('menu')}>메뉴</button>

            { isMenuOpen === 'menu' && <Menu /> }
            { isMenuOpen === 'user' && <UserMenu /> }
        </nav>
    </div>
    )
}
