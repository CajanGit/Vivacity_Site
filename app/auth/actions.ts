'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export async function signInWithDiscord() {
  const supabase = await createClient()

  console.log('[Discord Auth] Starting sign in with Discord...')

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'discord',
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/api/auth/callback`,
    },
  })

  if (error) {
    console.error('[Discord Auth] OAuth initiation failed', {
      error: error.message,
      status: error.status,
      code: error.code,
    })
    redirect('/auth/error')
  }

  console.log('[Discord Auth] Redirecting to Discord OAuth', {
    url: data.url,
  })

  redirect(data.url)
}

export async function signOut() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  // redirect('/')
}