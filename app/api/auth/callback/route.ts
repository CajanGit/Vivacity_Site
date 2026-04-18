import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextResponse, type NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')

  console.log('[Auth Callback] Request received', {
    origin,
    hasCode: !!code,
    url: request.url,
  })

  if (code) {
    const cookieStore = await cookies()
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll()
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          },
        },
      }
    )

    const { error } = await supabase.auth.exchangeCodeForSession(code)

    if (error) {
      console.error('[Auth Callback] Exchange code for session failed', {
        error: error.message,
        status: error.status,
        code: error.code,
      })
      const errorMessage = encodeURIComponent(error.message || 'Unknown error')
      return NextResponse.redirect(`${origin}/auth/error?error=${errorMessage}`)
    }

    console.log('[Auth Callback] Session exchange successful')
    return NextResponse.redirect(`${origin}/`)
  }

  console.warn('[Auth Callback] No code parameter provided', {
    origin,
    searchParams: Object.fromEntries(searchParams),
  })
  return NextResponse.redirect(`${origin}/auth/error?error=${encodeURIComponent('No authorization code provided')}`)
}
