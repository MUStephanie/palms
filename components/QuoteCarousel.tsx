'use client'
import { useState, useEffect } from 'react'
import { useLang } from '@/lib/LanguageContext'
import { quotes } from '@/lib/quotes'

const dotActiveColors = ['bg-rose','bg-blue','bg-green','bg-gold-dk']

export default function QuoteCarousel() {
  const { lang } = useLang()
  const [idx, setIdx] = useState(0)
  const [fading, setFading] = useState(false)

  const go = (i: number) => {
    setFading(true)
    setTimeout(() => { setIdx(i); setFading(false) }, 300)
  }

  useEffect(() => {
    const t = setInterval(() => go((idx + 1) % quotes.length), 5000)
    return () => clearInterval(t)
  }, [idx])

  const q = quotes[idx]

  return (
    <section id="quote" className="py-24 text-center relative overflow-hidden" style={{background:'linear-gradient(135deg,#FDE8EA 0%,#E4F1FB 40%,#E3F5EC 75%,#FEF6DC 100%)'}}>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <span className="font-display text-[20vw] text-navy/[0.04]">✨</span>
      </div>
      <div className="max-w-3xl mx-auto px-6 relative z-10">
        <span className="text-6xl block mb-5 animate-spin" style={{animationDuration:'20s'}}>🌴</span>
        <blockquote>
          <p className={`font-display text-2xl sm:text-3xl lg:text-5xl text-navy leading-snug mb-4 transition-opacity duration-300 ${fading ? 'opacity-0' : 'opacity-100'}`}>
            &ldquo;{q[lang]}&rdquo;
          </p>
          <footer className="text-sm font-bold tracking-widest uppercase text-slate">{q.attr}</footer>
        </blockquote>
        <div className="flex items-center justify-center gap-3 mt-9">
          {quotes.map((_, i) => (
            <button key={i} onClick={() => go(i)}
              className={`h-2 rounded-full transition-all duration-300 ${i === idx ? `w-6 ${dotActiveColors[i]}` : 'w-2 bg-navy/15'}`} />
          ))}
        </div>
      </div>
    </section>
  )
}