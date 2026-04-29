'use client'

import {createClient} from '@/lib/supabase/client'
import {signInWithDiscord, signOut } from '@/app/auth/actions'
import { useEffect, useState, useRef } from 'react'
import type { User } from '@supabase/supabase-js'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function AuthButton() {
    const router = useRouter()
    const [user, setUser] = useState<User | null>(null)
    const[loading, setLoading] = useState(true)
    const[dropdownOpen, setDropdownOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const supabase = createClient()

        //Get current session on mount
        supabase.auth.getUser().then(({ data }) => {
            setUser(data.user)
            setLoading(false)
        })

        //listen for login/logout events
        const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null)
        })
        return () => listener.subscription.unsubscribe()
    }, [])

    useEffect(() => {
        function handleClickOutside(event: MouseEvent | TouchEvent) {
            if(dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setDropdownOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        document.addEventListener('touchstart', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
            document.addEventListener('touchstart', handleClickOutside)
        }
    }, [])

    if (loading) return null

    if (!user) {
        return (
            <Link
                href="/auth/login"
                className="border border-white/50 hover:border-white hover:bg-white/5 text-white px-4 py-1.5 rounded-md text-sm font-medium transition-colors"
            >
                Sign In
            </Link>
    )
}

    return (
       <div className="relative" ref={dropdownRef}>
      
      {/* Avatar button */}
      <button
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center gap-2 group"
      >
        {user.user_metadata?.avatar_url ? (
          <img
            src={user.user_metadata.avatar_url}
            alt="avatar"
            className="w-8 h-8 rounded-full border border-white/20 group-hover:border-[#00D4F5]/50 transition-colors"
          />
        ) : (
          // Fallback if no avatar
          <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center group-hover:border-[#00D4F5]/50 transition-colors">
            <span className="text-white text-xs">
              {user.user_metadata?.full_name?.[0] ?? '?'}
            </span>
          </div>
        )}
        {/* Chevron indicator */}
        <svg
          className={`w-3 h-3 text-gray-500 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown */}
      {dropdownOpen && (
        <div className="absolute right-0 top-11 w-52 bg-black/90 border border-white/10 rounded-xl overflow-hidden shadow-xl z-50 backdrop-blur-sm">
          
          {/* User info header */}
          <div className="px-4 py-3 border-b border-white/10">
            <p className="text-white text-sm font-medium truncate">
              {user.user_metadata?.full_name ?? 'User'}
            </p>
            <p className="text-gray-500 text-xs truncate mt-0.5">
              {user.email}
            </p>
          </div>

          {/* Options */}
          <div className="py-1">
            <Link
              href="/auth/change-password"
              onClick={() => setDropdownOpen(false)}
              className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-colors w-full"
            >
              {/* Lock icon */}
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Change Password
            </Link>

            <button
              onClick={async () => {
                const supabase = createClient()
                await supabase.auth.signOut()
                setDropdownOpen(false)
                router.push('/')
              }}
              className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-colors w-full"
            >
              {/* Sign out icon */}
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Sign Out
            </button>
          </div>

        </div>
      )}
    </div>
    )
}