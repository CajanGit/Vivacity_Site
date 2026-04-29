'use client'

import { useState } from 'react'
import { signInWithDiscord, signInWithEmail, signUpWithEmail } from '@/app/auth/actions'
import { SiDiscord } from '@icons-pack/react-simple-icons'

export default function LoginPage() {
  const [mode, setMode] = useState<'signin' | 'signup'>('signin')

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      {/* Decorative blobs — consistent with your design system */}
      <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full bg-[#00D4F5] opacity-20 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -right-20 w-72 h-72 rounded-full bg-[#F5A800] opacity-20 blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full max-w-sm">
        {/* Header */}
        <div className="text-center mb-8">
          <img src="/images/logo_transparent.png" alt="Vivacity" className="w-14 h-14 mx-auto mb-4 object-contain" />
          <h1 className="text-2xl font-medium text-white">
            {mode === 'signin' ? 'Welcome back' : 'Create an account'}
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            {mode === 'signin' ? 'Sign in to your Vivacity account' : 'Join the Vivacity community'}
          </p>
        </div>

        {/* Discord button — always available */}
      
        <button
            onClick={() => signInWithDiscord()}
            className="w-full flex items-center justify-center gap-3 bg-[#5865F2] hover:bg-[#4752C4] text-white px-4 py-2.5 rounded-md text-sm font-medium transition-colors mb-4"
        >
            <SiDiscord className="w-4 h-4" />
            Continue with Discord
        </button>
        

        {/* Divider */}
        <div className="flex items-center gap-3 mb-4">
          <div className="flex-1 h-px bg-white/10" />
          <span className="text-xs text-gray-600">or</span>
          <div className="flex-1 h-px bg-white/10" />
        </div>

        {/* Email form */}
        <form action={mode === 'signin' ? signInWithEmail : signUpWithEmail} className="flex flex-col gap-3">
          <input
            name="email"
            type="email"
            placeholder="Email"
            required
            className="bg-white/5 border border-white/10 text-white text-sm rounded-md px-3 py-2.5 placeholder:text-gray-600 focus:outline-none focus:border-[#00D4F5]/50 transition-colors"
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            required
            minLength={6}
            className="bg-white/5 border border-white/10 text-white text-sm rounded-md px-3 py-2.5 placeholder:text-gray-600 focus:outline-none focus:border-[#00D4F5]/50 transition-colors"
          />
          <button
            type="submit"
            className="border border-white/40 hover:border-white hover:bg-white/5 text-white px-4 py-2.5 rounded-md text-sm font-medium transition-colors"
          >
            {mode === 'signin' ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        {/* Toggle mode */}
        <p className="text-center text-sm text-gray-600 mt-4">
          {mode === 'signin' ? "Don't have an account? " : 'Already have an account? '}
          <button
            onClick={() => setMode(mode === 'signin' ? 'signup' : 'signin')}
            className="text-[#00D4F5] hover:text-white transition-colors"
          >
            {mode === 'signin' ? 'Sign up' : 'Sign in'}
          </button>
        </p>
      </div>
    </div>
  )
}