'use client'

import { setPassword } from '@/app/auth/actions'

export default function SetPasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full bg-[#00D4F5] opacity-20 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -right-20 w-72 h-72 rounded-full bg-[#F5A800] opacity-20 blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full max-w-sm">
        <div className="text-center mb-8">
          <img src="/images/logo_transparent.png" alt="Vivacity" className="w-14 h-14 mx-auto mb-4 object-contain" />
          <h1 className="text-2xl font-medium text-white">Create a password</h1>
          <p className="text-sm text-gray-500 mt-1">
            Set a password so you can also sign in with your email.
          </p>
        </div>

        <form action={setPassword} className="flex flex-col gap-3">
          <input
            name="password"
            type="password"
            placeholder="New password"
            required
            minLength={6}
            className="bg-white/5 border border-white/10 text-white text-sm rounded-md px-3 py-2.5 placeholder:text-gray-600 focus:outline-none focus:border-[#00D4F5]/50 transition-colors"
          />
          <input
            name="confirmPassword"
            type="password"
            placeholder="Confirm password"
            required
            minLength={6}
            className="bg-white/5 border border-white/10 text-white text-sm rounded-md px-3 py-2.5 placeholder:text-gray-600 focus:outline-none focus:border-[#00D4F5]/50 transition-colors"
          />
          <button
            type="submit"
            className="border border-white/40 hover:border-white hover:bg-white/5 text-white px-4 py-2.5 rounded-md text-sm font-medium transition-colors"
          >
            Set Password
          </button>
        </form>
      </div>
    </div>
  )
}