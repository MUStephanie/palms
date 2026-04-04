'use client'
import { useState } from 'react'
import { useLang } from '@/lib/LanguageContext'

export default function Contact() {
  const { lang } = useLang()
  const [form, setForm] = useState({ name:'', email:'', message:'' })
  const [status, setStatus] = useState<'idle'|'sending'|'sent'|'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) { setStatus('sent'); setForm({ name:'', email:'', message:'' }) }
      else setStatus('error')
    } catch { setStatus('error') }
  }

  const inputCls = "w-full px-5 py-4 rounded-2xl border-2 border-navy/10 bg-white text-navy font-semibold text-sm outline-none focus:border-rose transition-colors placeholder-slate/50"
  const labelCls = "block text-xs font-black text-slate uppercase tracking-widest mb-1.5"

  return (
    <section id="contact" className="py-16 sm:py-24 bg-sand">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          {/* Left — info */}
          <div>
            <p className="text-[0.72rem] font-black tracking-[0.18em] uppercase text-rose mb-3">
              {{ en:'Get in Touch', fr:'Contactez-nous', de:'Kontakt' }[lang]}
            </p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-navy leading-snug mb-5">
              {{ en:<>We'd love to<br/><span className="text-rose">hear from you</span></>, fr:<>On adore<br/><span className="text-rose">vous entendre</span></>, de:<>Wir freuen uns<br/><span className="text-rose">von dir zu hören</span></> }[lang]}
            </h2>
            <p className="text-slate font-semibold leading-relaxed mb-8">
              {{ en:'Questions about an order, custom requests, or just want to say hi? Drop us a message and we\'ll get back to you quickly. 🌴', fr:'Questions sur une commande, demandes personnalisées ou juste envie de dire bonjour ? Envoyez-nous un message. 🌴', de:'Fragen zu einer Bestellung, individuelle Wünsche oder einfach Hallo sagen? Schreib uns. 🌴' }[lang]}
            </p>

            {/* Contact options */}
            <div className="flex flex-col gap-3">
              <a href="https://www.instagram.com/palmsmauritius" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-4 bg-white rounded-2xl px-5 py-4 shadow-sm hover:shadow-md transition-all group">
                <div className="w-10 h-10 rounded-full bg-rose-pale flex items-center justify-center flex-shrink-0">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#E8505B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.5" fill="#E8505B"/></svg>
                </div>
                <div>
                  <p className="font-black text-navy text-sm">Instagram</p>
                  <p className="text-slate text-xs font-semibold">@palmsmauritius</p>
                </div>
              </a>

              <a href="https://wa.me/23058594941" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-4 bg-white rounded-2xl px-5 py-4 shadow-sm hover:shadow-md transition-all group">
                <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{background:'#E8F8EE'}}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="#25D366"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                </div>
                <div>
                  <p className="font-black text-navy text-sm">WhatsApp</p>
                  <p className="text-slate text-xs font-semibold">{{ en:'Message us directly', fr:'Écrivez-nous directement', de:'Schreib uns direkt' }[lang]}</p>
                </div>
              </a>
            </div>
          </div>

          {/* Right — form */}
          <div className="bg-white rounded-[32px] p-6 sm:p-8 shadow-sm">
            {status === 'sent' ? (
              <div className="flex flex-col items-center justify-center text-center py-12 gap-4">
                <span className="text-6xl">🌴</span>
                <h3 className="font-display text-2xl text-navy">
                  {{ en:'Message sent!', fr:'Message envoyé !', de:'Nachricht gesendet!' }[lang]}
                </h3>
                <p className="text-slate font-semibold">
                  {{ en:"We'll get back to you soon.", fr:'Nous vous répondrons bientôt.', de:'Wir melden uns bald.' }[lang]}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div>
                  <label className={labelCls}>{{ en:'Name', fr:'Prénom', de:'Name' }[lang]}</label>
                  <input required className={inputCls} value={form.name}
                    onChange={e => setForm(f => ({...f, name: e.target.value}))}
                    placeholder={{ en:'Your name', fr:'Votre prénom', de:'Dein Name' }[lang]} />
                </div>
                <div>
                  <label className={labelCls}>Email</label>
                  <input required type="email" className={inputCls} value={form.email}
                    onChange={e => setForm(f => ({...f, email: e.target.value}))}
                    placeholder="your@email.com" />
                </div>
                <div>
                  <label className={labelCls}>{{ en:'Message', fr:'Message', de:'Nachricht' }[lang]}</label>
                  <textarea required rows={5} className={`${inputCls} resize-none`} value={form.message}
                    onChange={e => setForm(f => ({...f, message: e.target.value}))}
                    placeholder={{ en:'How can we help? 🌴', fr:'Comment pouvons-nous vous aider ? 🌴', de:'Wie können wir helfen? 🌴' }[lang]} />
                </div>
                {status === 'error' && (
                  <p className="text-rose text-sm font-bold text-center">
                    {{ en:'Something went wrong. Try WhatsApp instead!', fr:'Une erreur est survenue. Essayez WhatsApp !', de:'Etwas ist schiefgelaufen. Versuche WhatsApp!' }[lang]}
                  </p>
                )}
                <button type="submit" disabled={status === 'sending'}
                  className="w-full py-4 rounded-full bg-rose text-white font-black text-sm hover:bg-rose-lt transition-all shadow-lg shadow-rose/30 disabled:opacity-60">
                  {status === 'sending'
                    ? '⏳ Sending...'
                    : { en:'Send Message 🌴', fr:'Envoyer le message 🌴', de:'Nachricht senden 🌴' }[lang]}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}