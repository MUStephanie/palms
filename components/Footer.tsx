'use client'
import Image from 'next/image'
import { useLang } from '@/lib/LanguageContext'

export default function Footer() {
  const { lang } = useLang()

  const shopLinks = [
    { en:'T-Shirts', fr:'T-Shirts', de:'T-Shirts' },
    { en:'Caps', fr:'Casquettes', de:'Caps' },
    { en:'Hoodies', fr:'Hoodies', de:'Hoodies' },
    { en:'Tote Bags', fr:'Tote Bags', de:'Tote Bags' },
    { en:'Gifts & Stickers', fr:'Cadeaux & Stickers', de:'Geschenke & Sticker' },
  ]
  const infoLinks = [
    { en:'Our Story', fr:'Notre Histoire', de:'Unsere Geschichte', href:'#brand' },
    { en:'Instagram', fr:'Instagram', de:'Instagram', href:'https://www.instagram.com/palmsmauritius' },
    { en:'Contact Us', fr:'Contactez-nous', de:'Kontaktiere uns', href:'#contact' },
    { en:'Shipping & Returns', fr:'Livraison & Retours', de:'Versand & Rückgabe', href:'#' },
    { en:'Privacy Policy', fr:'Politique de Confidentialité', de:'Datenschutz', href:'#' },
  ]

  return (
    <footer id="footer" className="bg-navy">
      <div className="grid grid-cols-4 h-1.5"><span className="bg-rose"/><span className="bg-blue"/><span className="bg-gold"/><span className="bg-green"/></div>
      <div className="max-w-6xl mx-auto px-6 pt-14 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pb-12 border-b border-white/10 mb-8">

          <div>
            <div className="w-32 h-24 relative mb-5">
              <Image src="/palms-logo.png" alt="Palms Mauritius" fill className="object-contain brightness-0 invert" />
            </div>
            <p className="text-[0.88rem] text-white/50 font-semibold leading-relaxed max-w-[280px] mb-5">
              {{ en:'100% Mauritius-made positive wear. Designed for good vibes and island calm. Choose happiness today.', fr:'100% vêtements positifs fabriqués à Maurice. Conçus pour les bonnes vibrations et la sérénité insulaire.', de:'100% auf Mauritius hergestellte Positivmode. Für gute Vibes und Inselruhe. Wähle heute das Glück.' }[lang]}
            </p>
            <div className="flex gap-2 mb-4">
              <a href="https://www.instagram.com/palmsmauritius" target="_blank" rel="noopener noreferrer"
                className="w-[38px] h-[38px] rounded-full bg-white/10 flex items-center justify-center text-white/55 hover:bg-rose hover:text-white transition-all hover:-translate-y-0.5">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/></svg>
              </a>
            </div>
            <span className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-[0.8rem] font-black text-white/60">
              🌴 {{ en:'Est. 2025 · Mauritius', fr:'Fondé en 2025 · Maurice', de:'Gegr. 2025 · Mauritius' }[lang]}
            </span>
          </div>

          <div>
            <h4 className="text-[0.72rem] font-black tracking-[0.14em] uppercase text-white/35 mb-4">
              {{ en:'Shop', fr:'Boutique', de:'Shop' }[lang]}
            </h4>
            <ul className="space-y-2.5">
              {shopLinks.map((l, i) => (
                <li key={i}><a href="#shop" className="text-[0.88rem] font-semibold text-white/55 hover:text-white transition-colors">{l[lang]}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[0.72rem] font-black tracking-[0.14em] uppercase text-white/35 mb-4">Info</h4>
            <ul className="space-y-2.5">
              {infoLinks.map((l, i) => (
                <li key={i}><a href={l.href} className="text-[0.88rem] font-semibold text-white/55 hover:text-white transition-colors">{l[lang]}</a></li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-[0.8rem] text-white/30 font-semibold">
          <p>© {new Date().getFullYear()} Palms Mauritius. {{ en:'All rights reserved.', fr:'Tous droits réservés.', de:'Alle Rechte vorbehalten.' }[lang]}</p>
          <p>{{ en:'Made with', fr:'Fait avec', de:'Gemacht mit' }[lang]} <span className="text-rose-lt"> ❤️ </span> {{ en:'& sunshine in Mauritius 🌴', fr:'& du soleil à Maurice 🌴', de:'& Sonnenschein auf Mauritius 🌴' }[lang]}</p>
        </div>
      </div>
    </footer>
  )
}