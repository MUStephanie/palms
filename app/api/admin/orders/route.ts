import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { supabaseAdmin } from '@/lib/supabaseAdmin'

const resend = new Resend(process.env.RESEND_API_KEY)

function unauthorized() {
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
}

function checkAuth(req: NextRequest) {
  return req.headers.get('x-admin-token') === process.env.ADMIN_PASSWORD
}

const STATUS_SUBJECT: Partial<Record<string, string>> = {
  'confirmed':              '✅ Your Palms Mauritius order is confirmed!',
  'payment received':       '💳 Payment received — thank you!',
  'ready for collection':   '🎉 Your order is ready to collect!',
  'dispatched':             '🚚 Your Palms Mauritius order is on its way!',
  'cancelled':              'Your Palms Mauritius order has been cancelled',
}

const STATUS_BODY: Partial<Record<string, (name: string) => string>> = {
  'confirmed': (name) => `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
      <h1 style="color:#E8505B">Hi ${name}! ✅</h1>
      <p>Great news — your order has been confirmed. We're getting things ready for you.</p>
      <p>We'll be in touch soon about delivery or collection.</p>
      <hr/>
      <p>Questions? Message us on <a href="https://wa.me/${process.env.WHATSAPP_NUMBER}">WhatsApp</a>.</p>
      <p style="color:#5C6E8A;font-size:12px">Good vibes & sunshine 🌊<br/>Palms Mauritius</p>
    </div>`,
  'payment received': (name) => `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
      <h1 style="color:#E8505B">Hi ${name}! 💳</h1>
      <p>We've received your payment — thank you! Your order is being prepared.</p>
      <hr/>
      <p>Questions? Message us on <a href="https://wa.me/${process.env.WHATSAPP_NUMBER}">WhatsApp</a>.</p>
      <p style="color:#5C6E8A;font-size:12px">Good vibes & sunshine 🌊<br/>Palms Mauritius</p>
    </div>`,
  'ready for collection': (name) => `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
      <h1 style="color:#E8505B">Hi ${name}! 🎉</h1>
      <p>Your order is ready to collect! Please get in touch to arrange a convenient time.</p>
      <p>Message us on <a href="https://wa.me/${process.env.WHATSAPP_NUMBER}">WhatsApp</a> to confirm.</p>
      <hr/>
      <p style="color:#5C6E8A;font-size:12px">Good vibes & sunshine 🌊<br/>Palms Mauritius</p>
    </div>`,
  'dispatched': (name) => `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
      <h1 style="color:#E8505B">Hi ${name}! 🚚</h1>
      <p>Your order is on its way! You should receive it soon.</p>
      <p>Questions? Message us on <a href="https://wa.me/${process.env.WHATSAPP_NUMBER}">WhatsApp</a>.</p>
      <hr/>
      <p style="color:#5C6E8A;font-size:12px">Good vibes & sunshine 🌊<br/>Palms Mauritius</p>
    </div>`,
  'cancelled': (name) => `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
      <h1 style="color:#E8505B">Hi ${name}</h1>
      <p>Your order has been cancelled. We're sorry for any inconvenience.</p>
      <p>If you have questions, please get in touch via <a href="https://wa.me/${process.env.WHATSAPP_NUMBER}">WhatsApp</a> or reply to this email.</p>
      <hr/>
      <p style="color:#5C6E8A;font-size:12px">Palms Mauritius</p>
    </div>`,
}

// GET — fetch all orders newest first
export async function GET(req: NextRequest) {
  if (!checkAuth(req)) return unauthorized()

  const { data, error } = await supabaseAdmin
    .from('orders')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

// PUT — update order status, optionally send customer email
export async function PUT(req: NextRequest) {
  if (!checkAuth(req)) return unauthorized()

  const { id, status, sendEmail } = await req.json()

  // Update status in Supabase
  const { data, error } = await supabaseAdmin
    .from('orders')
    .update({ status })
    .eq('id', id)
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  // Send email if requested and template exists
  if (sendEmail && STATUS_SUBJECT[status] && STATUS_BODY[status]) {
    await resend.emails.send({
      from: 'Palms Mauritius <noreply@palmsmauritius.com>',
      to: data.email,
      subject: STATUS_SUBJECT[status]!,
      html: STATUS_BODY[status]!(data.name),
    })
  }

  return NextResponse.json({ success: true })
}
