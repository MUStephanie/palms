import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { supabaseAdmin } from '@/lib/supabase'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, phone, address, items, total, paymentMethod, notes } = body

    // 1. Save to Supabase
    const { data, error } = await supabaseAdmin.from('orders').insert([{
      name, email, phone, address,
      items,
      total,
      payment_method: paymentMethod,
      notes,
      status: 'pending',
    }]).select().single()

    if (error) throw error

    // 2. Email to you
    await resend.emails.send({
      from: 'Palms Mauritius Orders <orders@palmsmauritius.com>',
      to: process.env.YOUR_EMAIL!,
      subject: `🛍️ New Order — ${name} — Rs ${total.toLocaleString()}`,
      html: `
        <h2>New Order Received</h2>
        <p><strong>Order ID:</strong> ${data.id}</p>
        <hr/>
        <h3>Customer</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Address:</strong> ${address}</p>
        <p><strong>Payment:</strong> ${paymentMethod}</p>
        ${notes ? `<p><strong>Notes:</strong> ${notes}</p>` : ''}
        <hr/>
        <h3>Items</h3>
        <table border="1" cellpadding="8" style="border-collapse:collapse;width:100%">
          <tr><th>Product</th><th>Qty</th><th>Price</th><th>Subtotal</th></tr>
          ${items.map((i: { name: string; quantity: number; price: number }) =>
            `<tr><td>${i.name}</td><td>${i.quantity}</td><td>Rs ${i.price.toLocaleString()}</td><td>Rs ${(i.price * i.quantity).toLocaleString()}</td></tr>`
          ).join('')}
        </table>
        <h3>Total: Rs ${total.toLocaleString()}</h3>
      `,
    })

    // 3. Confirmation email to customer
    await resend.emails.send({
      from: 'Palms Mauritius <hello@palmsmauritius.com>',
      to: email,
      subject: '🌴 Your Palms Mauritius order is confirmed!',
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
          <h1 style="color:#E8505B">Thanks, ${name}! 🌴</h1>
          <p>Your order has been received. We'll be in touch shortly to arrange delivery and payment.</p>
          <h3>Your order:</h3>
          ${items.map((i: { name: string; quantity: number; price: number }) =>
            `<p>${i.quantity}× ${i.name} — Rs ${(i.price * i.quantity).toLocaleString()}</p>`
          ).join('')}
          <h3>Total: Rs ${total.toLocaleString()}</h3>
          <p><strong>Payment:</strong> ${paymentMethod}</p>
          <hr/>
          <p>Questions? Message us on <a href="https://wa.me/${process.env.WHATSAPP_NUMBER}">WhatsApp</a> or reply to this email.</p>
          <p style="color:#5C6E8A;font-size:12px">Good vibes & sunshine 🌊<br/>Palms Mauritius</p>
        </div>
      `,
    })

    return NextResponse.json({ success: true, orderId: data.id })
  } catch (err) {
    console.error('Order error:', err)
    return NextResponse.json({ success: false, error: 'Order failed' }, { status: 500 })
  }
}