'use client'
import { useState } from 'react'
import Image from 'next/image'
import { useCart } from '@/lib/CartContext'
import { useLang } from '@/lib/LanguageContext'

type Step = 'cart' | 'checkout' | 'success'

export default function CartDrawer() {
  const { items, removeItem, updateQty, totalPrice, totalItems, isOpen, closeCart, clearCart } = useCart()
  const { lang } = useLang()
  const [step, setStep] = useState<Step>('cart')
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ name:'', email:'', phone:'', address:'', paymentMethod:'cash', notes:'' })

  const labels = {
    title:      { en:'Your Bag',        fr:'Votre Sac',        de:'Dein Beutel'        },
    checkout:   { en:'Checkout →',      fr:'Commander →',      de:'Zur Kasse →'        },
    clear:      { en:'Clear bag',       fr:'Vider le sac',     de:'Beutel leeren'      },
    continue:   { en:'Continue Shopping',fr:'Continuer',       de:'Weiter einkaufen'   },
    empty:      { en:'Your bag is empty 🌴', fr:'Votre sac est vide 🌴', de:'Dein Beutel ist leer 🌴' },
    total:      { en:'Total',           fr:'Total',            de:'Gesamt'             },
    placeOrder: { en:'Place Order 🌴',  fr:'Passer la commande 🌴', de:'Bestellen 🌴' },
    back:       { en:'← Back to bag',   fr:'← Retour au sac',  de:'← Zurück'          },
    success:    { en:'Order placed! 🎉', fr:'Commande reçue ! 🎉', de:'Bestellung aufgegeben! 🎉' },
    successSub: { en:"We'll be in touch soon to arrange delivery.", fr:'Nous vous contacterons bientôt.', de:'Wir melden uns bald bei dir.' },
  }

  const handleOrder = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch('/api/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          items: items.map(i => ({ name: i.product.nameEn, quantity: i.quantity, price: i.product.price })),
          total: totalPrice,
        }),
      })
      if (res.ok) {
        setStep('success')
        clearCart()
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const inputCls = "w-full px-4 py-3 rounded-2xl border-2 border-navy/10 bg-sand text-navy font-semibold text-sm outline-none focus:border-rose transition-colors"
  const labelCls = "block text-xs font-black text-slate uppercase tracking-widest mb-1"

  return (
    <>
      {isOpen && <div className="fixed inset-0 bg-navy/50 backdrop-blur-sm z-[60]" onClick={closeCart} />}

      <div className={`fixed top-0 right-0 h-full w-full sm:max-w-[420px] bg-cream z-[70] shadow-2xl flex flex-col transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-navy/10">
          <div>
            <h2 className="font-display text-2xl text-navy">{labels.title[lang]}</h2>
            {totalItems > 0 && step === 'cart' && <p className="text-xs font-bold text-slate">{totalItems} {totalItems === 1 ? 'item' : 'items'}</p>}
          </div>
          <button onClick={() => { closeCart(); setTimeout(() => setStep('cart'), 300) }}
            className="w-10 h-10 rounded-full bg-navy/10 flex items-center justify-center text-navy hover:bg-rose hover:text-white transition-all text-lg">✕</button>
        </div>
        <div className="grid grid-cols-4 h-1"><span className="bg-rose"/><span className="bg-blue"/><span className="bg-gold"/><span className="bg-green"/></div>

        {/* STEP: Cart */}
        {step === 'cart' && (
          <>
            <div className="flex-1 overflow-y-auto px-6 py-4 flex flex-col gap-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center gap-3">
                  <span className="text-6xl">🛍️</span>
                  <p className="font-display text-2xl text-navy">{labels.empty[lang]}</p>
                  <button onClick={closeCart} className="mt-4 px-6 py-3 rounded-full bg-navy text-white font-black text-sm hover:bg-rose transition-colors">
                    {labels.continue[lang]}
                  </button>
                </div>
              ) : items.map(({ product: p, quantity }) => {
                const name = lang === 'fr' ? p.nameFr : lang === 'de' ? p.nameDe : p.nameEn
                return (
                  <div key={p.id} className="flex gap-4 bg-white rounded-2xl p-4 shadow-sm">
                    <div className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-sand">
                      <Image src={p.img} alt={p.altEn} fill className="object-cover" sizes="80px" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-black text-navy text-sm leading-tight mb-1 truncate">{name}</p>
                      <p className="font-display text-navy">Rs {(p.price * quantity).toLocaleString()}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <button onClick={() => updateQty(p.id, quantity - 1)} className="w-7 h-7 rounded-full bg-navy/10 text-navy font-black flex items-center justify-center hover:bg-rose hover:text-white transition-all text-sm">−</button>
                        <span className="font-black text-navy text-sm w-5 text-center">{quantity}</span>
                        <button onClick={() => updateQty(p.id, quantity + 1)} className="w-7 h-7 rounded-full bg-navy/10 text-navy font-black flex items-center justify-center hover:bg-green hover:text-white transition-all text-sm">+</button>
                        <button onClick={() => removeItem(p.id)} className="ml-auto text-slate hover:text-rose transition-colors text-xs font-bold">✕</button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
            {items.length > 0 && (
              <div className="px-6 py-5 border-t border-navy/10 flex flex-col gap-3 bg-white">
                <div className="flex items-center justify-between">
                  <span className="font-black text-navy text-lg">{labels.total[lang]}</span>
                  <span className="font-display text-2xl text-navy">Rs {totalPrice.toLocaleString()}</span>
                </div>
                <button onClick={() => setStep('checkout')}
                  className="w-full py-4 rounded-full bg-rose text-white font-black text-center text-sm hover:bg-rose-lt transition-all shadow-lg shadow-rose/30">
                  {labels.checkout[lang]}
                </button>
                <button onClick={clearCart} className="text-xs text-slate font-bold text-center hover:text-rose transition-colors">
                  {labels.clear[lang]}
                </button>
              </div>
            )}
          </>
        )}

        {/* STEP: Checkout form */}
        {step === 'checkout' && (
          <form onSubmit={handleOrder} className="flex-1 overflow-y-auto flex flex-col">
            <div className="flex-1 px-6 py-4 flex flex-col gap-4">
              <button type="button" onClick={() => setStep('cart')} className="text-xs font-black text-slate hover:text-navy transition-colors text-left">
                {labels.back[lang]}
              </button>

              <div>
                <label className={labelCls}>{{ en:'Name', fr:'Prénom', de:'Name' }[lang]}</label>
                <input required className={inputCls} value={form.name} onChange={e => setForm(f => ({...f, name: e.target.value}))} placeholder="Your full name" />
              </div>
              <div>
                <label className={labelCls}>Email</label>
                <input required type="email" className={inputCls} value={form.email} onChange={e => setForm(f => ({...f, email: e.target.value}))} placeholder="your@email.com" />
              </div>
              <div>
                <label className={labelCls}>{{ en:'Phone / WhatsApp', fr:'Téléphone / WhatsApp', de:'Telefon / WhatsApp' }[lang]}</label>
                <input required className={inputCls} value={form.phone} onChange={e => setForm(f => ({...f, phone: e.target.value}))} placeholder="+230 5xxx xxxx" />
              </div>
              <div>
                <label className={labelCls}>{{ en:'Delivery Address', fr:'Adresse de livraison', de:'Lieferadresse' }[lang]}</label>
                <textarea required className={`${inputCls} resize-none h-20`} value={form.address} onChange={e => setForm(f => ({...f, address: e.target.value}))} placeholder="Street, Town, District" />
              </div>
              <div>
                <label className={labelCls}>{{ en:'Payment Method', fr:'Mode de paiement', de:'Zahlungsmethode' }[lang]}</label>
                <div className="flex gap-2">
                  {[{ key:'cash', en:'💵 Cash', fr:'💵 Espèces', de:'💵 Bargeld' }, { key:'mcbjuice', en:'📱 MCB Juice', fr:'📱 MCB Juice', de:'📱 MCB Juice' }].map(opt => (
                    <button key={opt.key} type="button"
                      onClick={() => setForm(f => ({...f, paymentMethod: opt.key}))}
                      className={`flex-1 py-3 rounded-2xl text-sm font-black border-2 transition-all ${form.paymentMethod === opt.key ? 'border-rose bg-rose-pale text-rose' : 'border-navy/10 text-slate hover:border-navy/30'}`}>
                      {opt[lang]}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className={labelCls}>{{ en:'Notes (optional)', fr:'Notes (optionnel)', de:'Notizen (optional)' }[lang]}</label>
                <textarea className={`${inputCls} resize-none h-16`} value={form.notes} onChange={e => setForm(f => ({...f, notes: e.target.value}))} placeholder={{ en:'Size preferences, special requests...', fr:'Préférences de taille, demandes spéciales...', de:'Größenwünsche, Sonderwünsche...' }[lang]} />
              </div>
            </div>

            <div className="px-6 py-5 border-t border-navy/10 bg-white flex flex-col gap-2">
              <div className="flex items-center justify-between mb-1">
                <span className="font-black text-navy">{labels.total[lang]}</span>
                <span className="font-display text-2xl text-navy">Rs {totalPrice.toLocaleString()}</span>
              </div>
              <button type="submit" disabled={loading}
                className="w-full py-4 rounded-full bg-rose text-white font-black text-sm hover:bg-rose-lt transition-all shadow-lg shadow-rose/30 disabled:opacity-60">
                {loading ? '⏳ Placing order...' : labels.placeOrder[lang]}
              </button>
            </div>
          </form>
        )}

        {/* STEP: Success */}
        {step === 'success' && (
          <div className="flex-1 flex flex-col items-center justify-center text-center px-8 gap-5">
            <span className="text-7xl">🎉</span>
            <h3 className="font-display text-3xl text-navy">{labels.success[lang]}</h3>
            <p className="text-slate font-semibold">{labels.successSub[lang]}</p>
            <button onClick={() => { closeCart(); setTimeout(() => setStep('cart'), 300) }}
              className="mt-4 px-8 py-4 rounded-full bg-navy text-white font-black hover:bg-rose transition-colors">
              {labels.continue[lang]}
            </button>
          </div>
        )}

      </div>
    </>
  )
}