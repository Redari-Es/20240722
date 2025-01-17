"use client"
import React, { useState, useEffect, useRef } from 'react'
import { Menu, X } from 'lucide-react'
import { NavLinks } from '@/constant'
import Link from 'next/link'


const Navbar = () => {

    const [openMenu, setOpenMenu] = useState(false)
    const toggleMenu = () => {
        setOpenMenu(!openMenu)
    }

    // 用于判断点击是否在菜单内的方法
    const isClickInside = (ref: React.RefObject<HTMLElement>, event: MouseEvent) => {
        return ref.current?.contains(event.target as Node);
    };

    // 点击页面时的处理函数
    const handleClickOutside = (event: MouseEvent) => {
        if (openMenu && !isClickInside(menuRef, event)) {
            setOpenMenu(false);
        }
    };

    // 引用 Menu 容器
    const menuRef = useRef(null);

    // 监听点击事件
    React.useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [openMenu]); // 仅在 openMenu 变化时重新订阅

    return (
        <nav className='relative z-30 p-2 flex items-center'>
            <Link href='/' className='justify-start inline-flex items-center ml-0' >
                <svg viewBox="0 0 64 36" xmlns="http://www.w3.org/2000/svg" className='h-6 w-6 fill-current' aria-hidden='true' ><path fill="black" d="M41.3111 0H37.6444C30.3111 0 24.6889 4.15556 21.7556 9.28889C18.8222 3.91111 12.9556 0 5.86667 0H2.2C0.977781 0 0 0.977779 0 2.2V5.86667C0 16.1333 8.31111 24.2 18.3333 24.2H19.8V33C19.8 34.2222 20.7778 35.2 22 35.2C23.2222 35.2 24.2 34.2222 24.2 33V24.2H25.6667C35.6889 24.2 44 16.1333 44 5.86667V2.2C43.5111 0.977779 42.5333 0 41.3111 0ZM19.3111 19.5556H17.8444C10.2667 19.5556 4.15556 13.4444 4.15556 5.86667V4.4H5.62222C13.2 4.4 19.3111 10.5111 19.3111 18.0889V19.5556ZM39.1111 5.86667C39.1111 13.4444 33 19.5556 25.4222 19.5556H23.9556V18.0889C23.9556 10.5111 30.0667 4.4 37.6444 4.4H39.1111V5.86667Z"></path></svg>
                <div className='font-serif font-semibold text-nowrap'>PDF.ai</div>
            </Link >
            {/* 行菜单 */}
            <div className='hidden md:flex justify-end ml-auto'>
                <ul className={`flex-1 space-x-4 pl-20 text-nowrap text-center  h-full`}>
                    {NavLinks.map((link) => (
                        <Link href={link.href} key={link.key}
                            className="font-base text-xs text-center cursor-pointer transition-all hover:underline hover:font-bold"
                        >
                            {link.text}
                        </Link>
                    ))}
                </ul>
            </div>
            {/* 汉堡菜单 */}
            <div
                className={`cursor-pointer flex md:hidden ml-auto`}
                onClick={toggleMenu}
                aria-label="Toggle menu"
            >
                {openMenu ? <X width={32} height={32} /> : <Menu width={32} height={32} />}
            </div>
            {/* 汉堡下拉菜单 */}
            <div ref={menuRef} className={`md:hidden border-t absolute top-0 right-0 min-h-full w-full bg-white shadow-lg p-4 z-40 transition-transform duration-100 ease-in-out ${openMenu ? 'block mt-10' : 'hidden'}`}>
                <ul className='space-y-4'>
                    {NavLinks.map((link) => (
                        <li key={link.key}
                            className='hover:font-bold hover:underline'
                        >
                            <Link href={link.href}
                                className="font-base text-xs text-center cursor-pointer transition-all"
                            >
                                {link.text}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </nav >
    )
}



export default Navbar
