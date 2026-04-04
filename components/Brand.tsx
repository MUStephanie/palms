'use client'
import { useLang } from '@/lib/LanguageContext'

export default function Brand() {
  const { lang } = useLang()

  const p1 = { en:<>Palms Mauritius was born from a simple idea: <strong className="text-white">wear positivity</strong> and bring the calm of island life into your every day. Every piece is designed right here in Mauritius, with love and intention.</>, fr:<>Palms Mauritius est né d'une simple idée : <strong className="text-white">porter la positivité</strong> et la sérénité de l'île dans votre quotidien. Chaque pièce est conçue ici, à Maurice, avec amour et intention.</>, de:<>Palms Mauritius entstand aus einer einfachen Idee: <strong className="text-white">Positivität tragen</strong> und die Ruhe des Insellebens in deinen Alltag bringen. Jedes Stück wird hier auf Mauritius mit Liebe entworfen.</> }
  const p2 = { en:'From tees to tote bags, our designs celebrate good vibes, joy, and the happiness you can choose — today and every day. 🌺', fr:'Des t-shirts aux tote bags, nos créations célèbrent les bonnes vibrations, la joie, et le bonheur — aujourd\'hui et tous les jours. 🌺', de:'Von T-Shirts bis Tote Bags feiern unsere Designs gute Stimmung, Freude und das Glück — heute und jeden Tag. 🌺' }

  const pills = [
    { label:{ en:'Designed with Love 🧡', fr:'Conçu avec Amour 🧡', de:'Mit Liebe entworfen 🧡' }, cls:'bg-rose/20 text-rose-lt border border-rose/30' },
    { label:{ en:'Island Crafted 🌊', fr:'Artisanat Insulaire 🌊', de:'Insel-Handwerk 🌊' }, cls:'bg-blue/20 text-blue-lt border border-blue/30' },
    { label:{ en:'Ethical & Local 🌿', fr:'Éthique & Local 🌿', de:'Ethisch & Lokal 🌿' }, cls:'bg-gold/15 text-gold border border-gold/30' },
    { label:{ en:'Positive Vibes Only 🌴', fr:'Vibrations Positives 🌴', de:'Nur positive Vibes 🌴' }, cls:'bg-green/20 text-green-lt border border-green/30' },
  ]

  return (
    <section id="brand" className="py-16 sm:py-24 bg-navy relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{background:'radial-gradient(ellipse at 15% 50%,rgba(232,80,91,.14),transparent 55%), radial-gradient(ellipse at 85% 50%,rgba(58,134,212,.12),transparent 55%)'}} />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="text-center lg:text-left">
            <p className="text-[0.72rem] font-black tracking-[0.18em] uppercase text-gold mb-3">
              {{ en:'Our Story', fr:'Notre Histoire', de:'Unsere Geschichte' }[lang]}
            </p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-white leading-snug">
              {{ en:<>Born under<br/><span className="text-gold">the Mauritian</span> <span className="text-green-lt">sun ☀️</span></>, fr:<>Né sous<br/><span className="text-gold">le soleil</span> <span className="text-green-lt">mauricien ☀️</span></>, de:<>Unter der<br/><span className="text-gold">mauritischen</span> <span className="text-green-lt">Sonne ☀️</span></> }[lang]}
            </h2>
          </div>
          <div>
            <p className="text-base leading-[1.8] text-white/70 font-semibold mb-5">{p1[lang]}</p>
            <p className="text-base leading-[1.8] text-white/70 font-semibold mb-6">{p2[lang]}</p>
            <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
              {pills.map((p, i) => (
                <span key={i} className={`px-4 py-2 rounded-full text-[0.78rem] font-black tracking-wide ${p.cls}`}>{p.label[lang]}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}