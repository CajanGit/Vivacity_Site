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

export async function signUpWithEmail(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string 

  const supabase = await createClient()

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/api/auth/callback`,
    },
  })

  if (error) {
    console.error('[Email SignUp] Failed:', error.message)
    redirect(`/auth/error?error=${encodeURIComponent(error.message)}`)
  }
  redirect('/auth/verify-email')
}

export async function signInWithEmail(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const supabase = await createClient()

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    console.error('[Email SignIn] Failed:', error.message)
    redirect(`/auth/error?error=${encodeURIComponent(error.message)}`)
  }

  redirect('/')

}

export async function setPassword(formData: FormData) {
  const password = formData.get('password') as string
  const confirmPassword = formData.get('confirmPassword') as string

  if (password !== confirmPassword) {
    redirect(`/auth/set-password?error=${encodeURIComponent('Passwords do not match')}`)
  }

  const supabase = await createClient()

  // Update the password in Supabase auth
  const { error } = await supabase.auth.updateUser({ password })

  if (error) {
    console.error('[Set Password] Failed:', error.message)
    redirect(`/auth/error?error=${encodeURIComponent(error.message)}`)
  }

  // Mark has_password as true in your profiles table
  const { data: { user } } = await supabase.auth.getUser()

  await supabase
    .from('profiles')
    .update({ has_password: true })
    .eq('id', user!.id)

  redirect('/')
}

export async function changePassword(formData: FormData) {
  const password = formData.get('password') as string
  const confirmPassword = formData.get('confirmPassword') as string

  if (password !== confirmPassword) {
    redirect(`/auth/change-password?error=${encodeURIComponent('Passwords do not match')}`)
  }

  const supabase = await createClient()

  const { error } = await supabase.auth.updateUser({ password })

  if (error) {
    console.error('[Change Password] Failed:', error.message)
    redirect(`/auth/change-password?error=${encodeURIComponent(error.message)}`)
  }

  // No need to update has_password — it's already true
  redirect('/?message=Password updated successfully')
}