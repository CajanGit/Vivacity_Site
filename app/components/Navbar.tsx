'use client';

import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-blue-700 text-white p-4 shadow-lg">
      <div className="max-w-8xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold hover:text-blue-100">
          Vivacity Esports
        </Link>
        <ul className="flex gap-6">
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
        </ul>
      </div>
    </nav>
  );
}