import Stripe from 'stripe'
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
const resend = new Resend(process.env.RESEND_API_KEY!)

// Service role client — bypasses RLS, only used server-side
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: NextRequest) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')!

  let event: Stripe.Event

  // Verify the webhook actually came from Stripe
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch (err) {
    console.error('Webhook signature failed:', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  // Only handle successful payments
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session

    // 1. Save order to Supabase
    const { error: dbError } = await supabase.from('orders').insert({
      stripe_session_id: session.id,
      stripe_payment_intent: session.payment_intent as string,
      amount_total: session.amount_total,
      currency: session.currency,
      customer_email: session.customer_details?.email,
      customer_name: session.customer_details?.name,
      product_id: session.metadata?.productId,
      product_name: session.metadata?.productName,
      shipping_address: (session as any).shipping?.address ?? null,
      status: 'paid',
    })

    if (dbError) {
      console.error('Supabase insert error:', dbError)
      // Still return 200 so Stripe doesn't retry endlessly
      return NextResponse.json({ error: 'DB error' }, { status: 200 })
    }

    // 2. Send confirmation email
    if (session.customer_details?.email) {
      await resend.emails.send({
        from: 'Vivacity Store <vivacityesports.com>', // swap in your domain later
        to: session.customer_details.email,
        subject: 'Your Vivacity order is confirmed!',
        html: `
          <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto; color: #111314;">
            <h2 style="color: #00D4F5;">Order Confirmed</h2>
            <p>Hey ${session.customer_details.name ?? 'there'},</p>
            <p>Thanks for your order! Here's what you got:</p>
            <table style="width: 100%; border-collapse: collapse; margin: 16px 0;">
              <tr>
                <td style="padding: 8px 0; color: #555;">Product</td>
                <td style="padding: 8px 0; font-weight: bold;">${session.metadata?.productName}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #555;">Total</td>
                <td style="padding: 8px 0; font-weight: bold;">$${((session.amount_total ?? 0) / 100).toFixed(2)}</td>
              </tr>
            </table>
            <p style="color: #555; font-size: 14px;">We'll be in touch when your order ships. If you have any questions, reply to this email.</p>
            <img src="https://vivacityesports.com/images/logo_banner.png" 
              width="80" style="margin-bottom: 16px;" />
          </div>
        `,
      })
    }
  }

  return NextResponse.json({ received: true })
}