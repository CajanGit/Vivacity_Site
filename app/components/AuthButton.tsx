'use client'

import {createClient} from '@/lib/supabase/client'
import {signInWithDiscord, signOut } from '@/app/auth/actions'
import { useEffect, useState } from 'react'
import type { User } from '@supabase/supabase-js'

export default function AuthButton() {
    const [user, setUser] = useState<User | null>(null)
    const[loading, setLoading] = useState(true)

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

    if (loading) return null

    if (!user) {
        return (
            <form action={signInWithDiscord}>
                <button
                    type="submit"
                    className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-md text-sm font-medium transition colors"
                >
                    Sign in with Discord
                </button>
            </form>
        )
    }

    return (
        <div className="flex items-center gap-3">
            {user.user_metadata?.avatar_url && (
                <img 
                    src={user.user_metadata.avatar_url}
                    alt="avatar"
                    className="w-8 h-8 rounded-full"
                />
            )}
            <span className="text-sm text-gray-300">
                {user.user_metadata?.full_name}
            </span>
            <form action={signOut}>
                <button
                    type="submit"
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                    Sign Out
                </button>
            </form>
        </div>
    )
}