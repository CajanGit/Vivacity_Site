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
    <div className="relative z-50">
      <nav className="p-5 flex gap-1 bg-black/40 text-white shadow-lg justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <img src="/images/logo_transparent.png" alt="Vivacity logo" className="w-8 h-8 object-contain" />
            <span className="text-[#00D4F5] text-lg md:text-4xl font-bold tracking-wide"> Vivacity Esports </span>
          </Link>
        <div className="hidden md:flex items-center gap-10">
          <Link href="/teams" className="text-gray-400 hover:text-[#00D4F5] text-lg transition-colors ">Teams</Link>
          <Link href="/socials" className="text-gray-400 hover:text-[#00D4F5] text-lg transition-colors ">Socials</Link>
          <Link href="/coaching" className="text-gray-400 hover:text-[#00D4F5] text-lg transition-colors ">Coaching</Link>
          <AuthButton />
        </div>

        <button onClick={toggleNav} className={'space-y-1 md:hidden relative z-50'}>
          <span className={`block h-1 w-6 bg-white
            ${isOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
          <span className={`block h-1 w-6 bg-white
            ${isOpen ? 'opacity-0' : ''}`}></span>
          <span className={`block h-1 w-6 bg-white
            ${isOpen ? '-rotate-45 -translate-y-1' : ''}`}></span>
        </button>
      </nav>

      <div className={`fixed top-0 left-0 h-full w-[250px] bg-black text-white transform transition-transform duration-300 z-0
        ${isOpen ? 'translate-x-0 pointer-events-auto' : '-translate-x-full pointer-events-none'}`}>
        <div className="pt-20 px-6 flex flex-col gap-6">
          <Link href="/teams" className="text-gray-400 hover:text-[#00D4F5] text-lg transition-colors overflow-hidden">Teams</Link>
          <Link href="/socials" className="text-gray-400 hover:text-[#00D4F5] text-lg transition-colors overflow-hidden">Socials</Link>
          <Link href="/coaching" className="text-gray-400 hover:text-[#00D4F5] text-lg transition-colors overflow-hidden">Coaching</Link>
        <div className="w-full h-px bg-white/10" />
        <AuthButton />
        </div>
      </div>
    </div>
  )
}