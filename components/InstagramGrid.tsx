'use client'
import Image from 'next/image'
import { useLang } from '@/lib/LanguageContext'

const images = [
  { src:'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=400&q=80', alt:'Palms tee on beach' },
  { src:'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=400&q=80',    alt:'Palms collection flat lay' },
  { src:'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=400&q=80', alt:'Good Vibes tee outdoors' },
  { src:'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=400&q=80', alt:'Palms tote at beach' },
  { src:'https://images.unsplash.com/photo-1509942774463-acf339cf87d5?w=400&q=80',    alt:'Palms hoodie at sunset' },
  { src:'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=400&q=80', alt:'Palms cap on beach' },
]

const overlayColors = ['bg-rose/55','bg-blue/55','bg-gold/55','bg-green/55','bg-rose/50','bg-blue/50']

export default function InstagramGrid() {
  const { lang } = useLang()

  return (
    <section id="instagram" className="py-24 bg-cream">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <a href="https://www.instagram.com/palmsmauritius" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xl font-black text-navy hover:text-rose transition-colors mb-4">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-rose"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/></svg>
            @palmsmauritius
          </a>
          <h2 className="font-display text-4xl lg:text-5xl text-navy mb-3">
            {{ en:'Follow the Good Vibes', fr:'Suivez les Bonnes Vibrations', de:'Folge den guten Vibes' }[lang]}
          </h2>
          <p className="text-slate font-semibold">
            {{ en:'Join our community and share your island joy 🌊', fr:'Rejoignez notre communauté et partagez votre joie insulaire 🌊', de:'Werde Teil unserer Community und teile deine Inselfreude 🌊' }[lang]}
          </p>
        </div>

        <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3 mb-10">
          {images.map((img, i) => (
            <a key={i} href="https://www.instagram.com/palmsmauritius" target="_blank" rel="noopener noreferrer"
              className="relative aspect-square rounded-2xl overflow-hidden group cursor-pointer">
              <Image src={img.src} alt={img.alt} fill className="object-cover group-hover:scale-110 transition-transform duration-400" sizes="(max-width:768px) 50vw, (max-width:1024px) 33vw, 16vw" />
              <div className={`absolute inset-0 ${overlayColors[i]} opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center`}>
                <span className="text-white text-2xl">📷</span>
              </div>
            </a>
          ))}
        </div>

        <div className="text-center">
          <a href="https://www.instagram.com/palmsmauritius" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-7 py-4 rounded-full bg-rose text-white font-black text-sm hover:bg-rose-lt hover:-translate-y-0.5 transition-all shadow-lg shadow-rose/30">
            {{ en:'Follow @palmsmauritius', fr:'Suivre @palmsmauritius', de:'Folgen @palmsmauritius' }[lang]}
          </a>
        </div>
      </div>
    </section>
  )
}