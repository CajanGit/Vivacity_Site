'use client';

import React, {useState} from 'react';
import Link from 'next/link';
import AuthButton from '@/app/components/AuthButton'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNav = () => {
    setIsOpen(!isOpen);
  }

  return (
    <div className="relative">
      <nav className="px-5 h-16 flex gap-1 bg-black/40 text-white shadow-lg justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <img src="/images/logo_transparent.png" alt="Vivacity logo" className="w-14 h-14 md:w-20 md:h-20 object-contain relative" />
            <span className="font-aquire text-[#00D4F5] text-2xl md:text-4xl font-bold tracking-wide"> Vivacity Esports </span>
          </Link>
        <div className="hidden md:flex items-center gap-10">
          <Link href="/teams" className="text-gray-400 hover:text-[#00D4F5] text-lg transition-colors ">Teams</Link>
          <Link href="/socials" className="text-gray-400 hover:text-[#00D4F5] text-lg transition-colors ">Socials</Link>
          <Link href="/store" className="text-gray-400 hover:text-[#00D4F5] text-lg transition-colors ">Store</Link>
          <Link href="/coaching" className="text-gray-400 hover:text-[#00D4F5] text-lg transition-colors ">Coaching</Link>
          <AuthButton />
        </div>

        <button onClick={toggleNav} className={'space-y-1 md:hidden relative z-50'}>
          <span className={`block h-0.75 w-6 bg-white transition-all duration-300
            ${isOpen ? 'rotate-45 translate-y-[7px]' : ''}`}></span>
          <span className={`block h-0.75 w-6 bg-white transition-all duration-300
            ${isOpen ? 'opacity-0' : ''}`}></span>
          <span className={`block h-0.75 w-6 bg-white transition-all duration-300
            ${isOpen ? '-rotate-45 -translate-y-[7px]' : ''}`}></span>
        </button>
      </nav>

      <div className={`fixed top-0 left-0 h-full w-[250px] bg-black text-white transform transition-transform duration-300 z-0
        ${isOpen ? 'translate-x-0 pointer-events-auto' : '-translate-x-full pointer-events-none'}`}>
        <div className="pt-20 px-6 flex flex-col gap-6">
          <Link href="/teams" className="text-gray-400 hover:text-[#00D4F5] text-lg transition-colors overflow-hidden">Teams</Link>
          <Link href="/socials" className="text-gray-400 hover:text-[#00D4F5] text-lg transition-colors overflow-hidden">Socials</Link>
          <Link href="/store" className="text-gray-400 hover:text-[#00D4F5] text-lg transition-colors ">Store</Link>
          <Link href="/coaching" className="text-gray-400 hover:text-[#00D4F5] text-lg transition-colors overflow-hidden">Coaching</Link>
        <div className="w-full h-px bg-white/10" />
        <AuthButton />
        </div>
      </div>
    </div>
  )
}