'use client'
import Image from 'next/image'
import { useLang } from '@/lib/LanguageContext'

export default function Hero() {
  const { lang } = useLang()

  const eyebrow = { en: '🌴 Positive Wear · Est. 2025', fr: '🌴 Mode Positive · Fondé 2025', de: '🌴 Positive Mode · Gegr. 2025' }
  const sub     = { en: 'Positive wear and gifts designed for good vibes and island calm. T-shirts, hoodies, caps, tote bags — wear the feeling. 🌴', fr: 'Des vêtements et cadeaux positifs conçus pour les bonnes vibrations. Portez le sentiment. 🌴', de: 'Positive Mode und Geschenke für gute Stimmung und Inselruhe. Trag das Gefühl. 🌴' }
  const cta     = { en: 'Shop the Collection ✨', fr: 'Voir la Collection ✨', de: 'Zur Kollektion ✨' }
  const badge1  = { en: 'Island Made', fr: 'Fait Ici', de: 'Auf der Insel' }
  const badge2  = { en: 'Good Vibes', fr: 'Bonnes Vibrations', de: 'Gute Vibes' }

  return (
    <section id="hero" className="min-h-screen relative flex items-center overflow-hidden bg-cream">
      {/* Background blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-[300px] md:w-[560px] h-[300px] md:h-[560px] rounded-full bg-rose opacity-10 blur-[80px] -top-32 -right-16" />
        <div className="absolute w-[240px] md:w-[420px] h-[240px] md:h-[420px] rounded-full bg-blue opacity-10 blur-[80px] -bottom-20 -left-16" />
        <div className="absolute w-[160px] md:w-[280px] h-[160px] md:h-[280px] rounded-full bg-green opacity-10 blur-[80px] top-1/3 right-1/4" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center pt-24 pb-12 lg:pt-28 lg:pb-20">

          {/* Text */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-blue-pale border border-blue/25 rounded-full px-4 py-2 mb-6">
              <span className="w-2 h-2 rounded-full bg-blue animate-pulse flex-shrink-0" />
              <span className="text-[0.7rem] sm:text-[0.75rem] font-black tracking-widest uppercase text-blue">
                {eyebrow[lang]}
              </span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl leading-tight text-navy mb-5">
              {{ en: <><span className="text-rose relative inline-block">Choose<span className="absolute -bottom-1 left-0 right-0 h-1 bg-gold rounded-sm"/></span><br/>Happiness<br/>Every Day</>, fr: <>Choisissez<br/><span className="text-rose">le Bonheur</span><br/>Chaque Jour</>, de: <>Wähle<br/><span className="text-rose">das Glück</span><br/>Jeden Tag</> }[lang]}
            </h1>

            <p className="text-base sm:text-lg leading-relaxed text-navy-soft font-semibold max-w-md mx-auto lg:mx-0 mb-8">
              {sub[lang]}
            </p>

            <div className="flex flex-col sm:flex-row items-center lg:items-start gap-4 mb-8">
              <a href="#shop"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-rose text-white font-black text-sm hover:bg-rose-lt transition-all shadow-lg shadow-rose/30">
                {cta[lang]}
              </a>
              <a href="https://www.instagram.com/palmsmauritius" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-bold text-slate hover:text-rose transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/></svg>
                @palmsmauritius
              </a>
            </div>

            <div className="flex items-center justify-center lg:justify-start gap-6 pt-6 border-t border-navy/10 flex-wrap">
              <div className="text-center">
                <span className="font-display text-2xl text-rose block">🌴</span>
                <span className="text-[0.65rem] font-bold uppercase tracking-widest text-slate">Mauritius</span>
              </div>
              <div className="w-px h-10 bg-navy/10" />
              <div className="text-center">
                <span className="font-display text-2xl text-blue block">100%</span>
                <span className="text-[0.65rem] font-bold uppercase tracking-widest text-slate">{badge1[lang]}</span>
              </div>
              <div className="w-px h-10 bg-navy/10" />
              <div className="text-center">
                <span className="font-display text-2xl text-green block">☀️</span>
                <span className="text-[0.65rem] font-bold uppercase tracking-widest text-slate">{badge2[lang]}</span>
              </div>
            </div>
          </div>

          {/* Image — clean, no float cards */}
          <div className="relative max-w-[420px] mx-auto w-full hidden sm:block">
            <div className="relative rounded-[32px] lg:rounded-[48px] overflow-hidden aspect-[4/5] shadow-2xl">
              <Image
                src="/images/hero/Hero-01.webp"
                alt="Person wearing a Palms Mauritius t-shirt"
                fill className="object-cover" sizes="(max-width:1024px) 420px, 500px" priority />
              <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-rose via-blue to-green" />
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
