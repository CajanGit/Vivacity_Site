'use client'

import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

function AuthErrorMessage() {
    const searchParams = useSearchParams()
    const error = searchParams.get('error')

    return error ? (
        <div className="mt-4 p-3 bg-red-900/20 border border-red-800 rounded text-red-400 text-sm max-w-md text-center">
            Error: {decodeURIComponent(error)}
        </div>
    ) : null
}

export default function AuthError() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-2xl font-bold text-white">Authentication Error</h1>
            <p className="text-gray-400 mt-2">Something went wrong signing you in. Please try again.</p>
            <Suspense fallback={null}>
                <AuthErrorMessage />
            </Suspense>
            <a href="/" className="mt-4 text-indigo-400 hover:text-indigo-300">
                Go home
            </a>
        </div>
    )
}