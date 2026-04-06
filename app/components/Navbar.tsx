'use client';

import Link from 'next/link';
import AuthButton from '@/app/components/AuthButton'

export default function Navbar() {
  return (
    <nav className="bg-[#111314] text-white shadow-lg">
      <div className="max-w mx-auto px-10 h-[60px] flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          <img src="/images/logo_transparent.png" alt="Vivacity logo" className="w-20 h-20 object-contain" />
          <span className="text-[#00D4F5] text-4xl font-bold tracking-wide"> Vivacity Esports </span>
        </Link>
        <div className="flex items-center gap-10">
          <Link href="/" className="text-gray-400 hover:text-[#00D4F5] text-lg transition-colors">Home</Link>
          <Link href="/teams" className="text-gray-400 hover:text-[#00D4F5] text-lg transition-colors">Teams</Link>
          <Link href="/socials" className="text-gray-400 hover:text-[#00D4F5] text-lg transition-colors">Socials</Link>
          <Link href="/coaching" className="text-gray-400 hover:text-[#00D4F5] text-lg transition-colors">Coaching</Link>
          <div className="w-px h-[18px] bg-white/10"/>
          <AuthButton />
        </div>
        {/* <ul className="flex gap-6">
          <li>
            <Link href="/" className="hover:text-blue-100">
              Home
            </Link>
          </li>
          <li>
            <Link href="/teams" className="hover:text-blue-100">
              Teams
            </Link>
          </li>
          <li>
            <Link href="/" className="hover:text-blue-100">
              Store
            </Link>
          </li>
          <li>
            <Link href="/about" className="hover:text-blue-100">
              About
            </Link>
          </li>
          <li>
            <AuthButton/>
          </li>
        </ul> */}
      </div>
    </nav>
  );
}