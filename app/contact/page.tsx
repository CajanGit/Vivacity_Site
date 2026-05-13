import ContactForm from '@/app/components/ContactForm'

export default function ContactUs() {
  return (
    <div className="min-h-screen bg-black/85">

      {/* Header — same pattern as store/socials pages */}
      <section className="relative flex flex-col items-center justify-center text-center px-8 py-20 overflow-hidden">

        <p className="font-aquire text-[#00D4F5] text-4xl font-bold tracking-wide mb-3 relative z-10">
          Contact Us
        </p>
        <h1 className="text-2xl font-medium text-white mb-3 relative z-10">
          We'd love to hear from you 👋
        </h1>
        <p className="text-sm text-gray-500 max-w-sm leading-relaxed relative z-10">
          Whether you're a player, a sponsor, or just curious — our door is always open.
        </p>
      </section>

      <div className="h-px bg-white/5" />

      {/* Contact Cards */}
      <section className="px-6 py-16 max-w-2xl mx-auto flex flex-col gap-4">

        {/* Discord — card style, not a link since it's instructional */}
        <div className="rounded-xl border border-white/10 bg-[#0a0b0c] px-8 py-6">
          <div className="flex items-center gap-6 mb-5">
            <span className="text-2xl flex-shrink-0">💬</span>
            <div>
              <p className="text-[10px] tracking-[0.18em] text-[#00D4F5] uppercase mb-1">Discord</p>
              <p className="text-white text-sm font-medium">The fastest way to reach us</p>
            </div>
          </div>

          {/* Steps */}
          <div className="flex flex-col gap-3 mb-6">
            {[
              { step: '01', text: 'Join our Discord server using the link below' },
              { step: '02', text: 'Head to the #modmail-help channel' },
              { step: '03', text: 'Open a ticket' },
            ].map(({ step, text }) => (
              <div key={step} className="flex items-start gap-4">
                <span className="text-[10px] font-semibold tracking-widest text-[#00D4F5] mt-0.5 flex-shrink-0 w-5">
                  {step}
                </span>
                <p className="text-gray-400 text-sm leading-relaxed">{text}</p>
              </div>
            ))}
          </div>

          <a
            href="https://discord.gg/NFUA7PhAcY"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-white/40 hover:border-[#00D4F5] hover:bg-[#00D4F5]/5 text-white px-5 py-2 rounded-md text-sm font-medium transition-colors"
          >
            <span>🎮</span>
            Join Our Discord
          </a>
        </div>

        {/* Divider with label */}
        <div className="flex items-center gap-4">
          <div className="h-px flex-1 bg-white/5" />
          <span className="text-[10px] tracking-[0.18em] text-gray-600 uppercase">Or send a message</span>
          <div className="h-px flex-1 bg-white/5" />
        </div>
 
        {/* Form card */}
        <div className="rounded-xl border border-white/10 bg-[#0a0b0c] px-8 py-8">
          <p className="text-[10px] tracking-[0.18em] text-[#00D4F5] uppercase mb-1">✉️ Email Form</p>
          <p className="text-white text-sm font-medium mb-6">We'll reply within 48 hours</p>
          <ContactForm />
        </div>

      </section>

      {/* Bottom note */}
      <section className="px-6 pb-20 max-w-2xl mx-auto">
        <p className="text-center text-xs text-gray-600 leading-relaxed">
          We're a community-first org built by players, for players. 🎯<br />
          Whatever you need — we'll get back to you as soon as we can.
        </p>
      </section>

    </div>
  )
}