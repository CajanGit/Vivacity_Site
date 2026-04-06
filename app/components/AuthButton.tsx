'use client'

import {createClient} from '@/lib/supabase/client'
import {signInWithDiscord, signOut } from '@/app/auth/actions'
import { useEffect, useState } from 'react'
import type { User } from '@supabase/supabase-js'
import { useRouter } from 'next/navigation'

export default function AuthButton() {
    const router = useRouter()
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
            <button
                onClick={() => signInWithDiscord()}
                className="border border-white/50 hover:border-white hover:bg-white/5 text-white px-4 py-1.5 rounded-md text-sm font-medium transition-colors"
            >
                Sign in with Discord
            </button>
    )
}
    // if (!user) {
    //     return (
    //         <form action={signInWithDiscord}>
    //             <button
    //                 type="submit"
    //                 className="bg-white text-black hover:bg-indigo-500 px-4 py-1.5 rounded-md text-sm font-medium transition-colors"
    //             >
    //                 Sign in with Discord
    //             </button>
    //         </form>
    //     )
    // }

    return (
        <div className="flex items-center gap-3">
            {user.user_metadata?.avatar_url && (
                <img 
                    src={user.user_metadata.avatar_url}
                    alt="avatar"
                    className="w-8 h-8 rounded-full"
                />
            )}
            <span className="text-sm text-gray-400">
                {user.user_metadata?.full_name}
            </span>
            <button
                onClick={async () => {
                    const supabase = createClient()
                    await supabase.auth.signOut()
                    router.push('/')
                }}
                className="border border-white/50 hover:border-white hover:bg-white/5 text-white px-4 py-1.5 rounded-md text-sm font-medium transition-colors"
            >
                Sign Out
            </button>

            
            {/* <form action={signOut}>
                <button
                    type="submit"
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                    Sign Out
                </button>
            </form> */}
        </div>
    )
}