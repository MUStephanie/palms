import type { Metadata } from 'next'
import { Pacifico, Nunito } from 'next/font/google'
import { LanguageProvider } from '@/lib/LanguageContext'
import { CartProvider } from '@/lib/CartContext'
import './globals.css'

const pacifico = Pacifico({ weight:'400', subsets:['latin'], variable:'--font-pacifico', display:'swap' })
const nunito   = Nunito({ subsets:['latin'], variable:'--font-nunito', display:'swap' })

export const metadata: Metadata = {
  metadataBase: new URL('https://palmsmauritius.com'),
  title: {
    default: 'Palms Mauritius | 100% Mauritius-Made Positive Wear',
    template: '%s | Palms Mauritius',
  },
  description: 'Good vibes. Island made. 100% Mauritius-made positive wear — T-shirts, caps, hoodies, tote bags and gifts.',
  keywords: ['Mauritius', 'positive wear', 't-shirts', 'island fashion', 'good vibes', 'Mauritius gifts', 'palmsmauritius'],
  authors: [{ name: 'Palms Mauritius', url: 'https://palmsmauritius.com' }],
  creator: 'Palms Mauritius',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: ['fr_FR', 'de_DE'],
    url: 'https://palmsmauritius.com',
    siteName: 'Palms Mauritius',
    title: 'Palms Mauritius | Positive Wear',
    description: 'Good vibes. Island made. 100% Mauritius-made positive wear.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Palms Mauritius - Positive Wear' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Palms Mauritius | Positive Wear',
    description: 'Good vibes. Island made. 100% Mauritius-made positive wear.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${pacifico.variable} ${nunito.variable} font-body bg-cream text-navy overflow-x-hidden`}>
        <LanguageProvider>
          <CartProvider>
            {children}
          </CartProvider>
        </LanguageProvider>
      </body>
    </html>
  )
}