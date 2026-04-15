import Link from 'next/link'

export default function SuccessPage() {
  return (
    <div className="bg-[#111314] min-h-screen flex flex-col items-center justify-center px-8 text-center">
      {/* Decorative blobs */}
      <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full bg-[#00D4F5] opacity-20 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -right-20 w-72 h-72 rounded-full bg-[#F5A800] opacity-20 blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-md">
        <p className="text-[10px] tracking-[0.18em] text-[#00D4F5] uppercase mb-3">
          Order Confirmed
        </p>
        <h1 className="text-4xl font-medium text-white mb-4">
          You're all set.
        </h1>
        <p className="text-sm text-gray-500 leading-relaxed mb-8">
          Thanks for supporting Vivacity. A confirmation email is on its way — we'll follow up when your order ships.
        </p>
        <Link
          href="/store"
          className="border border-white/40 hover:border-white hover:bg-white/5 text-white px-7 py-2.5 rounded-md text-sm font-medium transition-colors"
        >
          Back to Store
        </Link>
      </div>
    </div>
  )
}