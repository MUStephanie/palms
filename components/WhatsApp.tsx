'use client'
import { useLang } from '@/lib/LanguageContext'

// Replace with your actual WhatsApp number (with country code, no + or spaces)
const WHATSAPP_NUMBER = '23000000000'

export default function WhatsApp() {
  const { lang } = useLang()

  const waMessage = encodeURIComponent({
    en: "Hi Palms Mauritius! I'd like to place an order 🌴",
    fr: "Bonjour Palms Mauritius ! Je voudrais passer une commande 🌴",
    de: "Hallo Palms Mauritius! Ich möchte eine Bestellung aufgeben 🌴",
  }[lang])

  const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${waMessage}`

  return (
    <section id="contact" className="py-16 sm:py-24 relative overflow-hidden" style={{background:'linear-gradient(135deg,#1C2B4A 0%,#1E3A6E 50%,#0F2D45 100%)'}}>
      <div className="absolute inset-0 pointer-events-none" style={{background:'radial-gradient(ellipse at 20% 40%,rgba(232,80,91,.15),transparent 50%), radial-gradient(ellipse at 80% 60%,rgba(78,175,124,.12),transparent 50%)'}} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* Left — copy */}
          <div className="text-center lg:text-left">
            <p className="text-[0.72rem] font-black tracking-[0.18em] uppercase text-gold mb-3">
              {{ en:'Order Now', fr:'Commander', de:'Jetzt Bestellen' }[lang]}
            </p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-white leading-snug mb-5">
              {{ en:<>Ready to wear<br/><span className="text-green-lt">the good vibes?</span></>, fr:<>Prêt à porter<br/><span className="text-green-lt">les bonnes vibrations ?</span></>, de:<>Bereit, die<br/><span className="text-green-lt">guten Vibes zu tragen?</span></> }[lang]}
            </h2>
            <p className="text-white/70 font-semibold leading-relaxed text-base">
              {{ en:"Message us on WhatsApp to place your order. We'll confirm your items, arrange delivery or pickup, and accept payment via cash or MCB Juice. Easy and personal. 🌴", fr:"Envoyez-nous un message sur WhatsApp pour passer votre commande. Nous confirmons vos articles et acceptons le paiement en espèces ou MCB Juice. 🌴", de:"Schreibe uns auf WhatsApp, um deine Bestellung aufzugeben. Wir bestätigen deine Artikel und akzeptieren Zahlung per Bargeld oder MCB Juice. 🌴" }[lang]}
            </p>
          </div>

          {/* Right — CTAs */}
          <div className="flex flex-col items-center lg:items-start gap-4">

            {/* WhatsApp button */}
            <a href={waUrl} target="_blank" rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-5 rounded-full font-black text-base transition-all hover:-translate-y-1 hover:shadow-2xl"
              style={{background:'#25D366', color:'white', boxShadow:'0 8px 32px rgba(37,211,102,0.35)'}}>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              {{ en:'Order via WhatsApp', fr:'Commander via WhatsApp', de:'Per WhatsApp bestellen' }[lang]}
            </a>

            {/* Payment methods */}
            <div className="flex items-center gap-3 flex-wrap justify-center lg:justify-start">
              <span className="text-white/40 text-xs font-bold uppercase tracking-widest">
                {{ en:'We accept', fr:'Nous acceptons', de:'Wir akzeptieren' }[lang]}
              </span>
              <span className="px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-white/70 text-xs font-black">💵 Cash</span>
              <span className="px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-white/70 text-xs font-black">📱 MCB Juice</span>
            </div>

            {/* Reassurance */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full mt-2">
              {[
                { icon:'🌴', en:'Island made', fr:'Fait à Maurice', de:'Auf der Insel' },
                { icon:'🚚', en:'Local delivery', fr:'Livraison locale', de:'Lokale Lieferung' },
                { icon:'💚', en:'Personal service', fr:'Service personnalisé', de:'Persönlicher Service' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-2xl px-4 py-3">
                  <span className="text-xl">{item.icon}</span>
                  <span className="text-white/60 text-xs font-black">{item[lang]}</span>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}