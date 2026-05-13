import { Resend } from 'resend'
import { NextRequest, NextResponse } from 'next/server'

const resend = new Resend(process.env.RESEND_API_KEY!)

// Map the subject value to a readable label
const SUBJECT_LABELS: Record<string, string> = {
  general:     '💬 General Enquiry',
  sponsorship: '🤝 Sponsorship / Partnership',
  other:       '✉️ Other',
}

export async function POST(req: NextRequest) {
  try {
    const { name, email, subject, message } = await req.json()

    // Basic server-side validation — never trust the client alone
    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 })
    }

    // Simple email format check
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
    }

    const subjectLabel = SUBJECT_LABELS[subject] ?? subject

    await resend.emails.send({
      // Swap in your verified Resend domain once set up
      from: 'Vivacity Contact <noreply@vivacityesports.com>',
      // This is YOUR inbox — the user's email never touches the HTML
      to: 'contact@vivacityesports.com',
      replyTo: email, // so you can just hit Reply in your inbox
      subject: `[Contact] ${subjectLabel} — from ${name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto; color: #111314;">
          <h2 style="color: #00D4F5;">New Contact Submission</h2>
          <table style="width: 100%; border-collapse: collapse; margin: 16px 0;">
            <tr>
              <td style="padding: 8px 0; color: #555; width: 100px;">Name</td>
              <td style="padding: 8px 0; font-weight: bold;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #555;">Email</td>
              <td style="padding: 8px 0; font-weight: bold;">${email}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #555;">Subject</td>
              <td style="padding: 8px 0; font-weight: bold;">${subjectLabel}</td>
            </tr>
          </table>
          <p style="color: #555; font-size: 14px; white-space: pre-wrap;">${message}</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;" />
          <p style="color: #999; font-size: 12px;">
            Reply directly to this email to respond to ${name}.
          </p>
        </div>
      `,
    })

    return NextResponse.json({ ok: true })

  } catch (err) {
    console.error('[Contact API] Error:', err)
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 })
  }
}