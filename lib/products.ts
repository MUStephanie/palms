// ─── SHOPIFY HOOK ────────────────────────────────────────────────────────────
// When integrating Shopify, replace this static data with the Storefront API:
// https://shopify.dev/docs/api/storefront/latest/objects/product
// Each Product maps to a Shopify Product node; variants map to ProductVariant nodes.
// ─────────────────────────────────────────────────────────────────────────────

export type ColourOption = {
  key:    string   // internal key
  label:  string   // display name
  swatch: string   // CSS colour value
}

export type Product = {
  id:       number
  category: 'tees' | 'caps' | 'hoodies' | 'bags' | 'gifts'
  nameEn: string; nameFr: string; nameDe: string
  descEn: string; descFr: string; descDe: string
  price:  number
  badge:  'hot' | 'new' | 'fave' | null
  badgeEn?: string; badgeFr?: string; badgeDe?: string
  img:    string
  altEn: string; altFr: string; altDe: string
  // Variant options — only present for products that need selection
  colours?: ColourOption[]
  sizes?:   string[]
}

export const products: Product[] = [
  // ── 1. Kids Tee ─────────────────────────────────────────────────────────────
  {
    id: 1, category: 'tees',
    nameEn: 'You are Younique Tee (Kids)',
    nameFr: 'T-Shirt Tu es Unique (Enfants)',
    nameDe: 'Du bist Einzigartig T-Shirt (Kinder)',
    descEn: 'Our bestselling happiness reminder. Soft cotton, bright vibes.',
    descFr: 'Notre best-seller pour les enfants. Coton doux, bonnes vibrations.',
    descDe: 'Unser Bestseller für Kinder. Weiches Baumwollshirt, strahlende Vibes.',
    price: 800, badge: 'hot', badgeEn: '🔥 Popular', badgeFr: '🔥 Populaire', badgeDe: '🔥 Beliebt',
    img: '/images/products/Youniqueshirt-04.webp',
    altEn: 'You are Younique kids tee', altFr: 'T-Shirt enfant Younique', altDe: 'Younique Kinder T-Shirt',
    colours: [
      { key: 'white', label: 'White',     swatch: '#FFFFFF' },
      { key: 'navy',  label: 'Navy Blue', swatch: '#1B2D4F' },
    ],
    sizes: ['2', '6', '10', '12'],
  },

  // ── 2. Adult Tee ────────────────────────────────────────────────────────────
  {
    id: 2, category: 'tees',
    nameEn: 'Be a Good Human Tee – Neon Pink',
    nameFr: 'T-Shirt Sois un Bon Humain – Rose Néon',
    nameDe: 'Sei ein guter Mensch T-Shirt – Neonpink',
    descEn: 'Because every day deserves good energy. Unisex fit.',
    descFr: 'Parce que chaque jour mérite de la bonne énergie. Coupe unisexe.',
    descDe: 'Weil jeder Tag gute Energie verdient. Unisex-Schnitt.',
    price: 950, badge: 'new', badgeEn: '✨ New', badgeFr: '✨ Nouveau', badgeDe: '✨ Neu',
    img: '/images/products/Begoodshirt-12.webp',
    altEn: 'Be a Good Human neon pink tee', altFr: 'T-Shirt rose néon Be a Good Human', altDe: 'Neonpink Be a Good Human T-Shirt',
    colours: [
      { key: 'white', label: 'White',     swatch: '#FFFFFF' },
      { key: 'navy',  label: 'Navy Blue', swatch: '#1B2D4F' },
    ],
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
  },

  // ── 3. Cap ──────────────────────────────────────────────────────────────────
  {
    id: 3, category: 'caps',
    nameEn: 'Island Calm Cap',
    nameFr: 'Casquette Sérénité Insulaire',
    nameDe: 'Cap Inselruhe',
    descEn: 'Adjustable, breathable. Perfect for the Mauritius sun.',
    descFr: 'Réglable et respirante. Parfaite pour le soleil mauricien.',
    descDe: 'Verstellbar und atmungsaktiv. Perfekt für die mauritische Sonne.',
    price: 750, badge: 'fave', badgeEn: '❤️ Fave', badgeFr: '❤️ Favori', badgeDe: '❤️ Favorit',
    img: '/images/products/Capwhite-18.webp',
    altEn: 'Island Calm cap', altFr: 'Casquette Sérénité', altDe: 'Cap Inselruhe',
    colours: [
      { key: 'white', label: 'White',     swatch: '#FFFFFF' },
      { key: 'black', label: 'Black',     swatch: '#1A1A1A' },
      { key: 'navy',  label: 'Navy Blue', swatch: '#1B2D4F' },
    ],
    // One size fits all (adjustable strap) — no sizes array
  },

  // ── 4. Hoodie ───────────────────────────────────────────────────────────────
  {
    id: 4, category: 'hoodies',
    nameEn: 'Island Hoodie',
    nameFr: 'Hoodie Insulaire',
    nameDe: 'Insel Hoodie',
    descEn: 'Cosy island evenings vibes. Premium fleece.',
    descFr: 'Pour les douces soirées insulaires. Polaire premium.',
    descDe: 'Für gemütliche Inselabende. Premium-Fleece.',
    price: 1800, badge: 'new', badgeEn: '✨ New', badgeFr: '✨ Nouveau', badgeDe: '✨ Neu',
    img: '/images/products/Hoodiewhitepalms-08.webp',
    altEn: 'Island Hoodie', altFr: 'Hoodie Insulaire', altDe: 'Insel Hoodie',
    colours: [
      { key: 'white', label: 'White', swatch: '#FFFFFF' },
      { key: 'grey',  label: 'Grey',  swatch: '#9CA3AF' },
    ],
    sizes: ['S/M', 'L/XL'],
  },

  // ── 5. Tote Bag ─────────────────────────────────────────────────────────────
  {
    id: 5, category: 'bags',
    nameEn: 'Sunshine and Rainbows Tote Bag',
    nameFr: 'Tote Bag Soleil et Arc-en-Ciel',
    nameDe: 'Sonnenschein und Regenbögen Tote Bag',
    descEn: 'Carry your good vibes everywhere. 100% cotton canvas.',
    descFr: 'Portez vos bonnes vibrations partout. Coton 100%.',
    descDe: 'Trag deine guten Vibes überallhin. 100% Baumwollcanvas.',
    price: 450, badge: 'hot', badgeEn: '🔥 Popular', badgeFr: '🔥 Populaire', badgeDe: '🔥 Beliebt',
    img: '/images/products/Sunshinetote-01.webp',
    altEn: 'Sunshine and Rainbows tote bag', altFr: 'Tote Bag Soleil et Arc-en-Ciel', altDe: 'Sonnenschein Tote Bag',
  },

  // ── 6. Sticker Pack ─────────────────────────────────────────────────────────
  {
    id: 6, category: 'gifts',
    nameEn: 'Positivity Sticker Pack',
    nameFr: 'Pack de Stickers Positivité',
    nameDe: 'Positivitäts-Sticker-Pack',
    descEn: 'Set of 6 stickers. Bottle not included (for illustration purposes only).',
    descFr: 'Lot de 6 stickers. Bouteille non incluse (à titre illustratif uniquement).',
    descDe: '6 Sticker im Set. Flasche nicht enthalten (nur zur Illustration).',
    price: 300, badge: 'fave', badgeEn: '❤️ Fave', badgeFr: '❤️ Favori', badgeDe: '❤️ Favorit',
    img: '/images/products/Sunshine-sticker-21.webp',
    altEn: 'Positivity sticker pack', altFr: 'Pack stickers positivité', altDe: 'Positivitäts Sticker Pack',
  },
]
