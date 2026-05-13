const COACH_FORM_URL = 'https://forms.gle/zLvXg6PA7YvKGnr88' 

const perks = [
  {
    label: 'Verified Badge',
    description: 'Get listed as an official Vivacity-certified coach who we may consider for coaching positions for our teams.',
  },
  {
    label: 'Built-in Audience',
    description: "Tap into Vivacity's player base — no need to build your own following from scratch.",
  },
  {
    label: 'Flexible Pricing',
    description: 'Set your own session rates. You stay in control of your time and earnings.',
  },
  {
    label: 'Community Events & Media',
    description: 'Be on a shortlist of media and community events to grow your brand.',
  },
]

export default function CoachingPage() {
  return (
    <div className="min-h-screen">

      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="relative flex flex-col items-center justify-center text-center px-8 py-24 overflow-hidden">

        {/* Label */}
        <p className="text-[10px] tracking-[0.2em] text-[#00D4F5] uppercase mb-4 relative z-10">
          Coming Soon
        </p>

        {/* Headline */}
        <h1 className="font-aquire text-[#00D4F5] text-4xl md:text-5xl font-bold tracking-wide mb-4 relative z-10">
          Coaching Hub
        </h1>

        <p className="text-sm text-gray-400 max-w-md leading-relaxed mb-2 relative z-10">
          We're building a platform to connect Vivacity players with verified coaches.
          Sessions, feedback, and growth — all in one place.
        </p>
        <p className="text-sm text-gray-500 max-w-sm leading-relaxed relative z-10">
          Check back soon. In the meantime, if you're interested in coaching for Vivacity,
          we'd love to hear from you.
        </p>
      </section>

      <div className="h-px bg-white/5" />

      {/* ── Coach signup CTA ─────────────────────────────── */}
      <section className="px-6 py-16 max-w-2xl mx-auto">

        <div className="relative rounded-2xl border border-[#00D4F5]/20 bg-[#00D4F5]/[0.04] overflow-hidden p-10 flex flex-col items-center text-center gap-6">

          <div className="relative z-10 flex flex-col items-center gap-4">
            <p className="text-[10px] tracking-[0.2em] text-[#00D4F5] uppercase">
              Want to coach?
            </p>

            <h2 className="text-2xl font-medium text-white">
              Apply to be a Vivacity Coach
            </h2>

            <p className="text-sm text-gray-400 max-w-sm leading-relaxed">
              Fill out our short form and we'll reach out when the platform launches.
              Early applicants get priority listing.
            </p>

            <a
              href={COACH_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center gap-2 bg-[#00D4F5] hover:bg-[#00bfdf] text-black font-semibold text-sm px-7 py-3 rounded-md transition-colors duration-200"
            >
              Apply Now
              {/* External link arrow */}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M7 17L17 7M17 7H7M17 7v10" />
              </svg>
            </a>

            <p className="text-xs text-gray-600">
              Opens in Google Forms — takes about 2 minutes
            </p>
          </div>
        </div>

      </section>

      <div className="h-px bg-white/5" />

      {/* ── Why coach with us ─────────────────────────────── */}
      <section className="px-6 py-16 max-w-4xl mx-auto">

        <div className="mb-10 text-center">
          <p className="text-[10px] tracking-[0.18em] text-[#00D4F5] uppercase mb-2">
            Why Sign Up?
          </p>
          <h2 className="text-2xl font-medium text-white">
            Coaches receive
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {perks.map((perk) => (
            <div
              key={perk.label}
              className="flex flex-col gap-2 rounded-xl border border-white/8 bg-white/[0.03] p-6 hover:border-[#00D4F5]/20 transition-colors"
            >
              {/* Accent dot */}
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#00D4F5]" />
                <h3 className="text-white text-sm font-semibold">{perk.label}</h3>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed pl-3.5">
                {perk.description}
              </p>
            </div>
          ))}
        </div>

      </section>

      {/* ── Bottom CTA repeat ────────────────────────────── */}
      <section className="px-6 pb-20 max-w-2xl mx-auto text-center">
        <p className="text-sm text-gray-500 mb-4">
          Questions? Reach out on our{' '}
          <a
            href="https://discord.gg/NFUA7PhAcY"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#00D4F5] hover:underline"
          >
            Discord
          </a>
          .
        </p>
      </section>

    </div>
  )
}