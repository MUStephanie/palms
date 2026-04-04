'use client'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { useLang } from '@/lib/LanguageContext'
import { useCart } from '@/lib/CartContext'
import type { Lang } from '@/lib/i18n'

const navLinks = [
  { en:'Shop',      fr:'Boutique',        de:'Shop',              href:'#shop'       },
  { en:'Our Story', fr:'Notre Histoire',  de:'Unsere Geschichte', href:'#brand'      },
  { en:'Instagram', fr:'Instagram',       de:'Instagram',         href:'#instagram'  },
  { en:'Reviews',   fr:'Avis',            de:'Bewertungen',       href:'#reviews'    },
  { en:'Contact',   fr:'Contact',         de:'Kontakt',           href:'#contact' },
]

export default function Header() {
  const { lang, setLang } = useLang()
  const { totalItems, openCart } = useCart()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 px-6 transition-all duration-300 ${scrolled ? 'bg-cream/90 backdrop-blur-md shadow-sm' : ''}`}>
        <div className="max-w-6xl mx-auto flex items-center justify-between h-[72px]">

          <a href="#" className="flex items-center gap-2 group">
            <div className="w-[52px] h-[52px] relative flex-shrink-0">
              <Image src="/palms-logo.png" alt="Palms Mauritius" fill className="object-contain" />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="font-display text-[1.35rem] text-rose group-hover:text-rose-lt transition-colors">Palms</span>
              <span className="text-[0.75rem] font-black tracking-widest uppercase text-navy group-hover:text-slate transition-colors">Mauritius</span>
            </div>
          </a>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <a key={link.href} href={link.href} className="text-sm font-bold text-navy/75 hover:text-navy transition-colors relative group">
                {link[lang]}
                <span className="absolute -bottom-1 left-0 w-0 h-[2.5px] bg-rose rounded-full transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <div className="flex bg-navy/10 rounded-full p-[3px] gap-[2px]">
              {(['en','fr','de'] as Lang[]).map(l => (
                <button key={l} onClick={() => setLang(l)}
                  className={`px-[10px] py-[5px] rounded-full text-[0.72rem] font-black uppercase tracking-wide transition-all ${lang === l ? 'bg-white text-navy shadow-sm' : 'text-slate'}`}>
                  {l.toUpperCase()}
                </button>
              ))}
            </div>

            <button onClick={openCart}
              className="w-[42px] h-[42px] rounded-full bg-navy text-white flex items-center justify-center text-lg hover:bg-rose transition-colors relative">
              🛍️
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-rose rounded-full text-[10px] font-black text-white flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>

            <button className="md:hidden w-[42px] h-[42px] flex flex-col items-center justify-center gap-[5px]" onClick={() => setMobileOpen(!mobileOpen)}>
              <span className={`block w-[22px] h-[2.5px] bg-navy rounded-full transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`block w-[22px] h-[2.5px] bg-navy rounded-full transition-all duration-300 ${mobileOpen ? 'opacity-0' : ''}`} />
              <span className={`block w-[22px] h-[2.5px] bg-navy rounded-full transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </button>
          </div>
        </div>
      </header>

      {mobileOpen && (
        <nav className="fixed top-[72px] left-0 right-0 z-40 bg-cream shadow-lg flex flex-col p-6 gap-1 md:hidden">
          {navLinks.map(link => (
            <a key={link.href} href={link.href} onClick={() => setMobileOpen(false)}
              className="px-4 py-3 font-bold text-navy rounded-xl hover:bg-rose-pale transition-colors">
              {link[lang]}
            </a>
          ))}
        </nav>
      )}
    </>
  )
}