"use client"
import React from 'react'
import { Menu } from 'lucide-react'
import { NavLinks } from '@/constant'
import Link from 'next/link'

const Navbar = () => {
    return (
        <nav className='z-20 p-2 flex items-center'>
            <Link href='/' className='justify-start inline-flex items-center ml-0' >
                <svg viewBox="0 0 64 36" xmlns="http://www.w3.org/2000/svg" className='h-6 w-6 fill-current' aria-hidden='true' ><path fill="black" d="M41.3111 0H37.6444C30.3111 0 24.6889 4.15556 21.7556 9.28889C18.8222 3.91111 12.9556 0 5.86667 0H2.2C0.977781 0 0 0.977779 0 2.2V5.86667C0 16.1333 8.31111 24.2 18.3333 24.2H19.8V33C19.8 34.2222 20.7778 35.2 22 35.2C23.2222 35.2 24.2 34.2222 24.2 33V24.2H25.6667C35.6889 24.2 44 16.1333 44 5.86667V2.2C43.5111 0.977779 42.5333 0 41.3111 0ZM19.3111 19.5556H17.8444C10.2667 19.5556 4.15556 13.4444 4.15556 5.86667V4.4H5.62222C13.2 4.4 19.3111 10.5111 19.3111 18.0889V19.5556ZM39.1111 5.86667C39.1111 13.4444 33 19.5556 25.4222 19.5556H23.9556V18.0889C23.9556 10.5111 30.0667 4.4 37.6444 4.4H39.1111V5.86667Z"></path></svg>
                <div className='font-bold text-nowrap'>PDF.ai</div>
            </Link >
            <ul className="flex-1 space-x-4 pl-20 ml-auto text-nowrap text-center h-full sm:hidden md:flex justify-end">
                {NavLinks.map((link) => (
                    <Link href={link.href} key={link.key}
                        className="font-base text-xs text-center cursor-pointer transition-all hover:underline hover:font-bold"
                    >
                        {link.text}
                    </Link>
                ))}
            </ul>
            <Menu width={36} height={36} className='cursor-pointer block flex md:hidden ml-auto' />
        </nav >
    )
}



export default Navbar
