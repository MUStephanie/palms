'use client'
import Image from 'next/image'
import { useLang } from '@/lib/LanguageContext'
import { reviews } from '@/lib/reviews'

const topColors = ['bg-rose','bg-blue','bg-green']
const starColors = ['text-rose','text-blue','text-green']
const quoteColors = ['text-rose','text-blue','text-green']

export default function Reviews() {
  const { lang } = useLang()

  return (
    <section id="reviews" className="py-24 bg-sand">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <p className="text-[0.72rem] font-black tracking-[0.18em] uppercase text-rose mb-3">
            {{ en:'Happy Customers', fr:'Avis Clients', de:'Glückliche Kunden' }[lang]}
          </p>
          <h2 className="font-display text-4xl lg:text-5xl text-navy mb-3">
            {{ en:'Joy is Contagious', fr:'La Joie se Partage', de:'Freude ist ansteckend' }[lang]}
          </h2>
          <p className="text-slate font-semibold">
            {{ en:"Here's what people who wear the good vibes have to say.", fr:'Voici ce que disent ceux qui portent les bonnes vibrations.', de:'Das sagen Menschen, die die guten Vibes tragen.' }[lang]}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {reviews.map((r, i) => (
            <article key={i} className="bg-white rounded-[32px] p-8 relative overflow-hidden hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
              <div className={`absolute top-0 left-0 right-0 h-1 ${topColors[i]}`} />
              <span className={`font-display text-7xl leading-none block mb-4 ${quoteColors[i]}`} style={{WebkitTextStroke:'2px currentColor',color:'transparent'}}>&#8220;</span>
              <p className="text-[0.95rem] leading-[1.75] text-navy-soft font-semibold mb-6">{r[lang]}</p>
              <div className="flex items-center gap-3">
                <Image src={r.avatar} alt={r.name} width={44} height={44} className="rounded-full flex-shrink-0" />
                <div>
                  <div className={`text-sm tracking-wide mb-0.5 ${starColors[i]}`}>{'★'.repeat(r.stars)}</div>
                  <div className="font-black text-sm text-navy">{r.name}</div>
                  <div className="text-[0.75rem] text-slate font-semibold">
                    {r[`loc${lang.charAt(0).toUpperCase() + lang.slice(1)}` as keyof typeof r] as string}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}