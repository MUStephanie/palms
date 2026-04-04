'use client'
import Image from 'next/image'
import { useState } from 'react'
import { useLang } from '@/lib/LanguageContext'
import { useCart } from '@/lib/CartContext'
import { products } from '@/lib/products'

const filters = [
  { key:'all',     en:'All',      fr:'Tout',       de:'Alle'      },
  { key:'tees',    en:'T-Shirts', fr:'T-Shirts',   de:'T-Shirts'  },
  { key:'caps',    en:'Caps',     fr:'Casquettes', de:'Caps'      },
  { key:'hoodies', en:'Hoodies',  fr:'Hoodies',    de:'Hoodies'   },
  { key:'bags',    en:'Tote Bags',fr:'Tote Bags',  de:'Tote Bags' },
  { key:'gifts',   en:'Gifts',    fr:'Cadeaux',    de:'Geschenke' },
]

const badgeClass = { hot:'bg-rose', new:'bg-blue', fave:'bg-green' }

export default function Shop() {
  const { lang } = useLang()
  const { addItem } = useCart()
  const [active, setActive] = useState('all')

  const visible = active === 'all' ? products : products.filter(p => p.category === active)
  const addLabel = { en:'Add to Bag 🛍️', fr:'Ajouter 🛍️', de:'In den Beutel 🛍️' }

  return (
    <section id="shop" className="py-24 bg-sand">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <p className="text-[0.72rem] font-black tracking-[0.18em] uppercase text-rose mb-3">
            {{ en:'The Collection', fr:'La Collection', de:'Die Kollektion' }[lang]}
          </p>
          <h2 className="font-display text-4xl lg:text-5xl text-navy mb-3">
            {{ en:'Wear the Good Vibes', fr:'Portez les Bonnes Vibrations', de:'Trag die guten Vibes' }[lang]}
          </h2>
          <p className="text-slate font-semibold">
            {{ en:'Every piece is made to remind you to choose joy. Every. Single. Day.', fr:'Chaque pièce est faite pour vous rappeler de choisir la joie. Chaque. Jour.', de:'Jedes Stück erinnert dich daran, die Freude zu wählen. Jeden. Einzigen. Tag.' }[lang]}
          </p>
        </div>

        <div className="flex justify-center gap-2 flex-wrap mb-10">
          {filters.map(f => (
            <button key={f.key} onClick={() => setActive(f.key)}
              className={`px-5 py-2 rounded-full text-[0.82rem] font-black uppercase tracking-wide transition-all ${active === f.key ? 'bg-navy text-white' : 'bg-navy/10 text-slate hover:bg-navy hover:text-white'}`}>
              {f[lang]}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {visible.map(p => {
            const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)
            const name  = p[`name${cap(lang)}`  as keyof typeof p] as string
            const desc  = p[`desc${cap(lang)}`  as keyof typeof p] as string
            const badge = p.badge ? p[`badge${cap(lang)}` as keyof typeof p] as string : null

            return (
              <article key={p.id} className="bg-white rounded-[32px] overflow-hidden hover:-translate-y-2 hover:shadow-2xl transition-all duration-300">
                <div className="relative aspect-square overflow-hidden bg-sand">
                  <div className="absolute top-0 left-0 right-0 h-1 z-10 bg-gradient-to-r from-rose via-blue to-green" />
                  <Image src={p.img} alt={p.altEn} fill className="object-cover hover:scale-105 transition-transform duration-500" sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw" />
                  {badge && <span className={`absolute top-4 left-3.5 z-10 px-3 py-1.5 rounded-full text-[0.68rem] font-black tracking-wide uppercase text-white ${badgeClass[p.badge!]}`}>{badge}</span>}
                </div>
                <div className="p-5">
                  <p className="text-[0.7rem] font-black tracking-widest uppercase text-blue mb-1">{p.category}</p>
                  <h3 className="font-black text-navy mb-1">{name}</h3>
                  <p className="text-[0.82rem] text-slate font-semibold leading-relaxed mb-4">{desc}</p>
                  <div className="flex items-center justify-between">
                    <span className="font-display text-xl text-navy"><span className="font-body text-xs text-slate font-bold">Rs </span>{p.price.toLocaleString()}</span>
                    <button onClick={() => addItem(p)}
                      className="px-4 py-2.5 rounded-full text-[0.8rem] font-black transition-all duration-200 bg-navy text-white hover:bg-rose hover:scale-105">
                      {addLabel[lang]}
                    </button>
                  </div>
                </div>
              </article>
            )
          })}
        </div>

        <div className="text-center mt-12">
          <a href="https://www.instagram.com/palmsmauritius" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-7 py-4 rounded-full border-2 border-navy text-navy font-black text-sm hover:bg-navy hover:text-white transition-all">
            {{ en:'View All on Instagram ↗', fr:'Voir Tout sur Instagram ↗', de:'Alle auf Instagram ansehen ↗' }[lang]}
          </a>
        </div>
      </div>
    </section>
  )
}