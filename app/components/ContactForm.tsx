'use client'

import { useState } from 'react'

type Status = 'idle' | 'loading' | 'success' | 'error'

export default function ContactForm() {
  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')

    // FormData reads the form's name attributes automatically
    const form = e.currentTarget
    const data = {
      name: (form.elements.namedItem('name') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      subject: (form.elements.namedItem('subject') as HTMLSelectElement).value,
      message: (form.elements.namedItem('message') as HTMLTextAreaElement).value,
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!res.ok) {
        const json = await res.json()
        throw new Error(json.error ?? 'Something went wrong')
      }

      setStatus('success')
      form.reset()
    } catch (err) {
      setStatus('error')
      setErrorMsg(err instanceof Error ? err.message : 'Unknown error')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">

      {/* Name + Email row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="name" className="text-[10px] tracking-[0.18em] text-[#00D4F5] uppercase">
            Your Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            placeholder="Ethan"
            className="bg-white/5 border border-white/10 focus:border-[#00D4F5]/50 focus:outline-none rounded-lg px-4 py-3 text-sm text-white placeholder:text-gray-600 transition-colors"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className="text-[10px] tracking-[0.18em] text-[#00D4F5] uppercase">
            Your Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="you@example.com"
            className="bg-white/5 border border-white/10 focus:border-[#00D4F5]/50 focus:outline-none rounded-lg px-4 py-3 text-sm text-white placeholder:text-gray-600 transition-colors"
          />
        </div>
      </div>

      {/* Subject dropdown */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="subject" className="text-[10px] tracking-[0.18em] text-[#00D4F5] uppercase">
          What's this about?
        </label>
        <select
          id="subject"
          name="subject"
          required
          defaultValue=""
          className="bg-white/5 border border-white/10 focus:border-[#00D4F5]/50 focus:outline-none rounded-lg px-4 py-3 text-sm text-white transition-colors appearance-none"
        >
          <option value="" disabled className="bg-[#0a0b0c] text-gray-500">
            Select a topic…
          </option>
          <option value="general" className="bg-[#0a0b0c]">💬 General Enquiry</option>
          <option value="sponsorship" className="bg-[#0a0b0c]">🤝 Sponsorship / Partnership</option>
          <option value="tryout" className="bg-[#0a0b0c]">🎮 Player Tryout</option>
          <option value="coaching" className="bg-[#0a0b0c]">🏆 Coaching</option>
          <option value="media" className="bg-[#0a0b0c]">🎥 Media / Press</option>
          <option value="other" className="bg-[#0a0b0c]">✉️ Other</option>
        </select>
      </div>

      {/* Message */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="message" className="text-[10px] tracking-[0.18em] text-[#00D4F5] uppercase">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder="Tell us what's on your mind…"
          className="bg-white/5 border border-white/10 focus:border-[#00D4F5]/50 focus:outline-none rounded-lg px-4 py-3 text-sm text-white placeholder:text-gray-600 transition-colors resize-none"
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={status === 'loading' || status === 'success'}
        className="border border-white/40 hover:border-[#00D4F5] hover:bg-[#00D4F5]/5 disabled:opacity-50 disabled:cursor-not-allowed text-white px-7 py-2.5 rounded-md text-sm font-medium transition-colors"
      >
        {status === 'loading' ? 'Sending…' : status === 'success' ? '✅ Sent!' : 'Send Message'}
      </button>

      {/* Feedback */}
      {status === 'success' && (
        <p className="text-green-400 text-xs text-center">
          We got it — we'll be in touch soon 👋
        </p>
      )}
      {status === 'error' && (
        <p className="text-red-400 text-xs text-center">
          {errorMsg || 'Something went wrong. Try Discord instead.'}
        </p>
      )}

    </form>
  )
}