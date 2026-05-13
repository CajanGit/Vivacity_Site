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
      to: 'vivacity.ow@gmail.com',
      replyTo: email, // so you can just hit Reply in your inbox
      subject: `[Contact] ${subjectLabel} — from ${name}`,
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
          <title>New Contact Submission</title>
        </head>
          <body style="margin:0;padding:0;background-color:#0a0b0c;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
 
          <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#0a0b0c;padding:40px 20px;">
        <tr>
          <td align="center">
          <table width="560" cellpadding="0" cellspacing="0" style="background-color:#111314;border-radius:12px;overflow:hidden;border:1px solid #1f2123;">
 
          <!-- Header bar -->
          <tr>
            <td style="background-color:#00D4F5;padding:4px 0;"></td>
          </tr>
 
          <!-- Logo + title -->
          <tr>
            <td style="padding:36px 40px 24px 40px;">
              <p style="margin:0 0 4px 0;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:#00D4F5;">
                Vivacity Esports
              </p>
              <h1 style="margin:0;font-size:22px;font-weight:600;color:#ffffff;letter-spacing:-0.01em;">
                New Contact Submission
              </h1>
            </td>
          </tr>
 
          <!-- Divider -->
          <tr>
            <td style="padding:0 40px;">
              <div style="height:1px;background-color:#1f2123;"></div>
            </td>
          </tr>
 
          <!-- Sender details -->
          <tr>
            <td style="padding:28px 40px 0 40px;">
              <p style="margin:0 0 16px 0;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:#555b61;">
                Sender Details
              </p>
 
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding:10px 0;border-bottom:1px solid #1a1d1f;width:100px;font-size:12px;color:#555b61;text-transform:uppercase;letter-spacing:0.08em;">
                    Name
                  </td>
                  <td style="padding:10px 0;border-bottom:1px solid #1a1d1f;font-size:14px;color:#ffffff;font-weight:500;">
                    ${name}
                  </td>
                </tr>
                <tr>
                  <td style="padding:10px 0;border-bottom:1px solid #1a1d1f;font-size:12px;color:#555b61;text-transform:uppercase;letter-spacing:0.08em;">
                    Email
                  </td>
                  <td style="padding:10px 0;border-bottom:1px solid #1a1d1f;">
                    <a href="mailto:${email}" style="font-size:14px;color:#00D4F5;text-decoration:none;">
                      ${email}
                    </a>
                  </td>
                </tr>
                <tr>
                  <td style="padding:10px 0;font-size:12px;color:#555b61;text-transform:uppercase;letter-spacing:0.08em;">
                    Subject
                  </td>
                  <td style="padding:10px 0;font-size:14px;color:#ffffff;font-weight:500;">
                    ${subjectLabel}
                  </td>
                </tr>
              </table>
            </td>
          </tr>
 
          <!-- Message -->
          <tr>
            <td style="padding:28px 40px 0 40px;">
              <p style="margin:0 0 12px 0;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:#555b61;">
                Message
              </p>
              <div style="background-color:#0d0f10;border:1px solid #1f2123;border-radius:8px;padding:20px 24px;">
                <p style="margin:0;font-size:14px;color:#c8cdd2;line-height:1.7;white-space:pre-wrap;">${message}</p>
              </div>
            </td>
          </tr>
 
          <!-- Reply CTA -->
          <tr>
            <td style="padding:28px 40px;">
              <a href="mailto:${email}"
                style="display:inline-block;background-color:#00D4F5;color:#0a0b0c;font-size:13px;font-weight:600;letter-spacing:0.04em;text-decoration:none;padding:12px 24px;border-radius:6px;">
                Reply to ${name}
              </a>
            </td>
          </tr>
 
          <!-- Divider -->
          <tr>
            <td style="padding:0 40px;">
              <div style="height:1px;background-color:#1f2123;"></div>
            </td>
          </tr>
 
          <!-- Footer -->
          <tr>
            <td style="padding:24px 40px 36px 40px;">
              <p style="margin:0;font-size:11px;color:#3a3f45;line-height:1.6;">
                This message was submitted via the contact form at vivacityesports.com.<br/>
                Replying to this email will go directly to ${name} at ${email}.
              </p>
            </td>
          </tr>
 
          <!-- Bottom accent bar -->
          <tr>
            <td style="background-color:#00D4F5;padding:3px 0;"></td>
          </tr>
 
          </table>
        </td>
      </tr>
    </table>
 
    </body>
    </html>
      `,
    })

    return NextResponse.json({ ok: true })

  } catch (err) {
    console.error('[Contact API] Error:', err)
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 })
  }
}