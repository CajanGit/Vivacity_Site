import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextResponse, type NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')

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
    if (!error) {
      return NextResponse.redirect(`${origin}/`)
    }
  }

  return NextResponse.redirect(`${origin}/auth/error`)
}

// ```
// **What's happening here:**
// - When Discord redirects back to your site after login, it includes a one-time `code` in the URL
// - This route grabs that code and exchanges it with Supabase for a real session
// - If it works, the user gets redirected to your homepage, logged in
// - If it fails, they go to an error page (we'll create that later)

// ---

// ## Step 3 — Tell Supabase About the Callback Route

// Go back to your **Supabase dashboard → Authentication → URL Configuration** and add this to the **Redirect URLs** list:
// ```
// http://localhost:3000/api/auth/callback