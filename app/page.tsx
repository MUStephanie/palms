import SchemaOrg from '@/components/SchemaOrg'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Marquee from '@/components/Marquee'
import Brand from '@/components/Brand'
import Shop from '@/components/Shop'
import QuoteCarousel from '@/components/QuoteCarousel'
import InstagramGrid from '@/components/InstagramGrid'
import Reviews from '@/components/Reviews'
import Newsletter from '@/components/Newsletter'
import Footer from '@/components/Footer'
import CartDrawer from '@/components/CartDrawer'

export default function Home() {
  return (
    <main>
      <SchemaOrg />
      <Header />
      <CartDrawer />
      <Hero />
      <Marquee />
      <Brand />
      <Shop />
      <QuoteCarousel />
      <InstagramGrid />
      <Reviews />
      <Newsletter />
      <Footer />
    </main>
  )
}