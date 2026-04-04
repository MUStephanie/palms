'use client'
import Image from 'next/image'
import { useCart } from '@/lib/CartContext'
import { useLang } from '@/lib/LanguageContext'

export default function CartDrawer() {
  const { items, removeItem, updateQty, totalPrice, totalItems, isOpen, closeCart, clearCart } = useCart()
  const { lang } = useLang()

  const labels = {
    title:    { en:'Your Bag', fr:'Votre Sac', de:'Dein Beutel' },
    empty:    { en:'Your bag is empty 🌴', fr:'Votre sac est vide 🌴', de:'Dein Beutel ist leer 🌴' },
    emptyHint:{ en:'Add some good vibes!', fr:'Ajoutez des bonnes vibrations !', de:'Füge gute Vibes hinzu!' },
    total:    { en:'Total', fr:'Total', de:'Gesamt' },
    checkout: { en:'Checkout →', fr:'Commander →', de:'Zur Kasse →' },
    clear:    { en:'Clear bag', fr:'Vider le sac', de:'Beutel leeren' },
    continue: { en:'Continue Shopping', fr:'Continuer les achats', de:'Weiter einkaufen' },
    // TODO: replace checkout href with Peach Payments / MIPS redirect
  }

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div className="fixed inset-0 bg-navy/50 backdrop-blur-sm z-[60]" onClick={closeCart} />
      )}

      {/* Drawer */}
      <div className={`fixed top-0 right-0 h-full w-full max-w-[420px] bg-cream z-[70] shadow-2xl flex flex-col transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-navy/10">
          <div>
            <h2 className="font-display text-2xl text-navy">{labels.title[lang]}</h2>
            {totalItems > 0 && <p className="text-xs font-bold text-slate">{totalItems} {totalItems === 1 ? 'item' : 'items'}</p>}
          </div>
          <button onClick={closeCart} className="w-10 h-10 rounded-full bg-navy/10 flex items-center justify-center text-navy hover:bg-rose hover:text-white transition-all text-lg">✕</button>
        </div>

        {/* Flag stripe */}
        <div className="grid grid-cols-4 h-1"><span className="bg-rose"/><span className="bg-blue"/><span className="bg-gold"/><span className="bg-green"/></div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4 flex flex-col gap-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center gap-3">
              <span className="text-6xl">🛍️</span>
              <p className="font-display text-2xl text-navy">{labels.empty[lang]}</p>
              <p className="text-slate font-semibold text-sm">{labels.emptyHint[lang]}</p>
              <button onClick={closeCart}
                className="mt-4 px-6 py-3 rounded-full bg-navy text-white font-black text-sm hover:bg-rose transition-colors">
                {labels.continue[lang]}
              </button>
            </div>
          ) : (
            items.map(({ product: p, quantity }) => {
              const name = lang === 'fr' ? p.nameFr : lang === 'de' ? p.nameDe : p.nameEn
              return (
                <div key={p.id} className="flex gap-4 bg-white rounded-2xl p-4 shadow-sm">
                  <div className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-sand">
                    <Image src={p.img} alt={p.altEn} fill className="object-cover" sizes="80px" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-black text-navy text-sm leading-tight mb-1 truncate">{name}</p>
                    <p className="font-display text-navy text-base">Rs {(p.price * quantity).toLocaleString()}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <button onClick={() => updateQty(p.id, quantity - 1)}
                        className="w-7 h-7 rounded-full bg-navy/10 text-navy font-black flex items-center justify-center hover:bg-rose hover:text-white transition-all text-sm">−</button>
                      <span className="font-black text-navy text-sm w-5 text-center">{quantity}</span>
                      <button onClick={() => updateQty(p.id, quantity + 1)}
                        className="w-7 h-7 rounded-full bg-navy/10 text-navy font-black flex items-center justify-center hover:bg-green hover:text-white transition-all text-sm">+</button>
                      <button onClick={() => removeItem(p.id)}
                        className="ml-auto text-slate hover:text-rose transition-colors text-xs font-bold">✕</button>
                    </div>
                  </div>
                </div>
              )
            })
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-6 py-5 border-t border-navy/10 flex flex-col gap-3 bg-white">
            <div className="flex items-center justify-between">
              <span className="font-black text-navy text-lg">{labels.total[lang]}</span>
              <span className="font-display text-2xl text-navy">Rs {totalPrice.toLocaleString()}</span>
            </div>
            <a href="#"
              onClick={(e) => { e.preventDefault(); /* TODO: redirect to Peach Payments / MIPS checkout */ alert('Checkout coming soon!') }}
              className="w-full py-4 rounded-full bg-rose text-white font-black text-center text-sm hover:bg-rose-lt hover:-translate-y-0.5 transition-all shadow-lg shadow-rose/30">
              {labels.checkout[lang]}
            </a>
            <button onClick={clearCart}
              className="text-xs text-slate font-bold text-center hover:text-rose transition-colors">
              {labels.clear[lang]}
            </button>
          </div>
        )}
      </div>
    </>
  )
}