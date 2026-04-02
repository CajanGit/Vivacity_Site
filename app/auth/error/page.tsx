export default function AuthError() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-2xl font=bold text-white">Authentication Error</h1>
            <p className="text-gray-400 mt-2">Something went wrong signing you in. Please try again.</p>
            <a href="/" className="mt-4 text-indigo-400 hover:text-indigo-300">
                Go home
            </a>
        </div>
    )
}