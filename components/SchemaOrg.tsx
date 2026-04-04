import { products } from '@/lib/products'

export default function SchemaOrg() {
  const storeSchema = {
    '@context': 'https://schema.org',
    '@type': 'OnlineStore',
    name: 'Palms Mauritius',
    description: '100% Mauritius-made positive wear. T-shirts, caps, hoodies, tote bags and gifts.',
    url: 'https://palmsmauritius.com',
    logo: 'https://palmsmauritius.com/palms-logo.png',
    sameAs: ['https://www.instagram.com/palmsmauritius'],
    address: { '@type': 'PostalAddress', addressCountry: 'MU' },
    currenciesAccepted: 'MUR',
    knowsLanguage: ['en', 'fr', 'de'],
    priceRange: 'Rs 150 - Rs 1200',
  }

  const productListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Palms Mauritius Collection',
    itemListElement: products.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Product',
        name: p.nameEn,
        description: p.descEn,
        image: p.img,
        brand: { '@type': 'Brand', name: 'Palms Mauritius' },
        offers: {
          '@type': 'Offer',
          price: p.price,
          priceCurrency: 'MUR',
          availability: 'https://schema.org/InStock',
          seller: { '@type': 'Organization', name: 'Palms Mauritius' },
        },
      },
    })),
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://palmsmauritius.com' },
      { '@type': 'ListItem', position: 2, name: 'Shop', item: 'https://palmsmauritius.com/#shop' },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(storeSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
    </>
  )
}