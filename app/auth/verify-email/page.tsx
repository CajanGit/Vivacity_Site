export default function VerifyEmailPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 text-center">
      <div className="max-w-sm">
        <h1 className="text-2xl font-medium text-white mb-3">Check your email</h1>
        <p className="text-sm text-gray-500 leading-relaxed">
          We sent you a confirmation link. Click it to activate your account, then come back and sign in.
        </p>
        <a href="/auth/login" className="inline-block mt-6 text-[#00D4F5] text-sm hover:text-white transition-colors">
          Back to login
        </a>
      </div>
    </div>
  )
}