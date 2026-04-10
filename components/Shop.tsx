'use client'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { useLang } from '@/lib/LanguageContext'
import { useCart } from '@/lib/CartContext'
import { supabase } from '@/lib/supabase'
import type { Product } from '@/lib/products'

// Map snake_case DB row → camelCase Product type
function mapProduct(r: Record<string, unknown>): Product {
  return {
    id:       r.id       as number,
    category: r.category as Product['category'],
    nameEn: r.name_en as string, nameFr: r.name_fr as string, nameDe: r.name_de as string,
    descEn: r.desc_en as string, descFr: r.desc_fr as string, descDe: r.desc_de as string,
    price:  r.price as number,
    badge:  (r.badge ?? null) as Product['badge'],
    badgeEn: (r.badge_en ?? undefined) as string | undefined,
    badgeFr: (r.badge_fr ?? undefined) as string | undefined,
    badgeDe: (r.badge_de ?? undefined) as string | undefined,
    img:    r.img as string,
    altEn: r.alt_en as string, altFr: r.alt_fr as string, altDe: r.alt_de as string,
    colours: (r.colours ?? undefined) as Product['colours'],
    sizes:   (r.sizes   ?? undefined) as Product['sizes'],
  }
}

const filters = [
  { key: 'all',     en: 'All',       fr: 'Tout',        de: 'Alle'      },
  { key: 'tees',    en: 'T-Shirts',  fr: 'T-Shirts',    de: 'T-Shirts'  },
  { key: 'caps',    en: 'Caps',      fr: 'Casquettes',  de: 'Caps'      },
  { key: 'hoodies', en: 'Hoodies',   fr: 'Hoodies',     de: 'Hoodies'   },
  { key: 'bags',    en: 'Tote Bags', fr: 'Tote Bags',   de: 'Tote Bags' },
  { key: 'gifts',   en: 'Gifts',     fr: 'Cadeaux',     de: 'Geschenke' },
]

const badgeClass = { hot: 'bg-rose', new: 'bg-blue', fave: 'bg-green' }

// ─── Per-card variant state ───────────────────────────────────────────────────
type Selections = Record<number, { colour: string | null; size: string | null }>

export default function Shop() {
  const { lang }    = useLang()
  const { addItem } = useCart()
  const [active, setActive] = useState('all')
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading]   = useState(true)

  useEffect(() => {
    supabase
      .from('products')
      .select('*')
      .eq('active', true)
      .order('sort_order', { ascending: true })
      .then(({ data }) => {
        if (data) setProducts(data.map(mapProduct))
        setLoading(false)
      })
  }, [])

  // Track the selected colour + size for each product card independently
  const [selections, setSelections] = useState<Selections>({})
  // Track validation shake animation per card
  const [shaking, setShaking] = useState<Record<number, boolean>>({})

  const visible = active === 'all' ? products : products.filter(p => p.category === active)

  const addLabel   = { en: 'Add to Bag 🛍️', fr: 'Ajouter 🛍️',      de: 'In den Beutel 🛍️' }
  const pickColour = { en: 'Pick a colour',  fr: 'Choisir une couleur', de: 'Farbe wählen'    }
  const pickSize   = { en: 'Pick a size',    fr: 'Choisir une taille',  de: 'Größe wählen'    }

  function getSelection(p: Product) {
    return selections[p.id] ?? { colour: null, size: null }
  }

  function setColour(p: Product, key: string) {
    setSelections(prev => ({ ...prev, [p.id]: { ...getSelection(p), colour: key } }))
  }

  function setSize(p: Product, size: string) {
    setSelections(prev => ({ ...prev, [p.id]: { ...getSelection(p), size } }))
  }

  function handleAdd(p: Product) {
    const sel = getSelection(p)
    const needsColour = !!p.colours?.length && sel.colour === null
    const needsSize   = !!p.sizes?.length   && sel.size   === null
    if (needsColour || needsSize) {
      // Trigger shake to nudge the user
      setShaking(prev => ({ ...prev, [p.id]: true }))
      setTimeout(() => setShaking(prev => ({ ...prev, [p.id]: false })), 600)
      return
    }
    addItem(p, sel.colour, sel.size)
    // Reset selection after adding
    setSelections(prev => ({ ...prev, [p.id]: { colour: null, size: null } }))
  }

  const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)

  return (
    <section id="shop" className="py-24 bg-sand">
      {/* Shake animation keyframes */}
      <style>{`
        @keyframes palms-shake {
          0%,100% { transform: translateX(0) }
          20%      { transform: translateX(-5px) }
          40%      { transform: translateX(5px) }
          60%      { transform: translateX(-4px) }
          80%      { transform: translateX(4px) }
        }
        .palms-shake { animation: palms-shake 0.55s ease-in-out; }
      `}</style>

      <div className="max-w-6xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-14">
          <p className="text-[0.72rem] font-black tracking-[0.18em] uppercase text-rose mb-3">
            {{ en: 'The Collection', fr: 'La Collection', de: 'Die Kollektion' }[lang]}
          </p>
          <h2 className="font-display text-4xl lg:text-5xl text-navy mb-3">
            {{ en: 'Wear the Good Vibes', fr: 'Portez les Bonnes Vibrations', de: 'Trag die guten Vibes' }[lang]}
          </h2>
          <p className="text-slate font-semibold">
            {{ en: 'Every piece is made to remind you to choose joy. Every. Single. Day.', fr: 'Chaque pièce est faite pour vous rappeler de choisir la joie. Chaque. Jour.', de: 'Jedes Stück erinnert dich daran, die Freude zu wählen. Jeden. Einzigen. Tag.' }[lang]}
          </p>
        </div>

        {/* Filter pills */}
        <div className="flex justify-center gap-2 flex-wrap mb-10">
          {filters.map(f => (
            <button key={f.key} onClick={() => setActive(f.key)}
              className={`px-5 py-2 rounded-full text-[0.82rem] font-black uppercase tracking-wide transition-all ${active === f.key ? 'bg-navy text-white' : 'bg-navy/10 text-slate hover:bg-navy hover:text-white'}`}>
              {f[lang as keyof typeof f]}
            </button>
          ))}
        </div>

        {/* Product grid */}
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-white rounded-[32px] overflow-hidden animate-pulse">
                <div className="aspect-square bg-sand" />
                <div className="p-5 space-y-3">
                  <div className="h-3 bg-sand rounded w-1/3" />
                  <div className="h-4 bg-sand rounded w-2/3" />
                  <div className="h-3 bg-sand rounded w-full" />
                </div>
              </div>
            ))}
          </div>
        ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
          {visible.map(p => {
            const name  = p[`name${cap(lang)}`  as keyof typeof p] as string
            const desc  = p[`desc${cap(lang)}`  as keyof typeof p] as string
            const badge = p.badge ? p[`badge${cap(lang)}` as keyof typeof p] as string : null
            const sel   = getSelection(p)
            const shake = shaking[p.id] ?? false

            return (
              <article key={p.id} className="bg-white rounded-[32px] overflow-hidden hover:-translate-y-2 hover:shadow-2xl transition-all duration-300">
                {/* Product image */}
                <div className="relative aspect-square overflow-hidden bg-sand">
                  <div className="absolute top-0 left-0 right-0 h-1 z-10 bg-gradient-to-r from-rose via-blue to-green" />
                  <Image src={p.img} alt={p.altEn} fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                    sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw" />
                  {badge && (
                    <span className={`absolute top-4 left-3.5 z-10 px-3 py-1.5 rounded-full text-[0.68rem] font-black tracking-wide uppercase text-white ${badgeClass[p.badge!]}`}>
                      {badge}
                    </span>
                  )}
                </div>

                {/* Card body */}
                <div className="p-3 sm:p-5">
                  <p className="text-[0.7rem] font-black tracking-widest uppercase text-blue mb-1">{p.category}</p>
                  <h3 className="font-black text-navy text-sm sm:text-base mb-1">{name}</h3>
                  <p className="text-[0.82rem] text-slate font-semibold leading-relaxed mb-3">{desc}</p>

                  {/* ── Colour swatches ─────────────────────────────── */}
                  {p.colours && p.colours.length > 0 && (
                    <div className="mb-3">
                      <p className={`text-[0.68rem] font-black uppercase tracking-widest mb-1.5 transition-colors ${shake && sel.colour === null ? 'text-rose' : 'text-slate'}`}>
                        {sel.colour
                          ? p.colours.find(c => c.key === sel.colour)?.label
                          : pickColour[lang as keyof typeof pickColour]}
                      </p>
                      <div className="flex gap-2">
                        {p.colours.map(c => (
                          <button
                            key={c.key}
                            onClick={() => setColour(p, c.key)}
                            title={c.label}
                            className={`w-6 h-6 rounded-full border-2 transition-all ${
                              sel.colour === c.key
                                ? 'border-rose scale-110 shadow-md'
                                : 'border-navy/20 hover:border-navy/50'
                            }`}
                            style={{ backgroundColor: c.swatch, boxShadow: c.swatch === '#FFFFFF' ? 'inset 0 0 0 1px #ccc' : undefined }}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* ── Size pills ──────────────────────────────────── */}
                  {p.sizes && p.sizes.length > 0 && (
                    <div className="mb-4">
                      <p className={`text-[0.68rem] font-black uppercase tracking-widest mb-1.5 transition-colors ${shake && sel.size === null ? 'text-rose' : 'text-slate'}`}>
                        {sel.size ?? pickSize[lang as keyof typeof pickSize]}
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {p.sizes.map(sz => (
                          <button
                            key={sz}
                            onClick={() => setSize(p, sz)}
                            className={`px-2.5 py-1 rounded-full text-[0.68rem] font-black border-2 transition-all ${
                              sel.size === sz
                                ? 'border-rose bg-rose text-white'
                                : 'border-navy/15 text-slate hover:border-navy/40 hover:text-navy'
                            }`}
                          >
                            {sz}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* ── Price + Add to Bag ──────────────────────────── */}
                  <div className={`flex items-center justify-between ${shake ? 'palms-shake' : ''}`}>
                    <span className="font-display text-xl text-navy">
                      <span className="font-body text-xs text-slate font-bold">Rs </span>
                      {p.price.toLocaleString()}
                    </span>
                    <button
                      onClick={() => handleAdd(p)}
                      className="px-3 sm:px-4 py-2 sm:py-2.5 rounded-full text-[0.72rem] sm:text-[0.8rem] font-black transition-all duration-200 bg-navy text-white hover:bg-rose hover:scale-105">
                      {addLabel[lang as keyof typeof addLabel]}
                    </button>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
        )}

        {/* Instagram CTA */}
        <div className="text-center mt-12">
          <a href="https://www.instagram.com/palmsmauritius" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-7 py-4 rounded-full border-2 border-navy text-navy font-black text-sm hover:bg-navy hover:text-white transition-all">
            {{ en: 'View All on Instagram ↗', fr: 'Voir Tout sur Instagram ↗', de: 'Alle auf Instagram ansehen ↗' }[lang]}
          </a>
        </div>
      </div>
    </section>
  )
}
