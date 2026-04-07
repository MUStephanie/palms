// ─── SHOPIFY HOOK ────────────────────────────────────────────────────────────
// When integrating Shopify, replace this static data with the Storefront API:
// https://shopify.dev/docs/api/storefront/latest/objects/product
// Each Product maps to a Shopify Product node; variants map to ProductVariant nodes.
// ─────────────────────────────────────────────────────────────────────────────

export type ColourOption = {
  key:    string
  label:  string
  swatch: string
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
  colours?: ColourOption[]
  sizes?:   string[]
}

const teeColours: ColourOption[] = [
  { key: 'white', label: 'White',     swatch: '#FFFFFF' },
  { key: 'navy',  label: 'Navy Blue', swatch: '#1B2D4F' },
]

export const products: Product[] = [

  // ── KIDS TEES ───────────────────────────────────────────────────────────────

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
    colours: teeColours,
    sizes: ['2', '6', '10', '12'],
  },

  {
    id: 10, category: 'tees',
    nameEn: 'Roarsome Tee (Kids)',
    nameFr: 'T-Shirt Roarsome (Enfants)',
    nameDe: 'Roarsome T-Shirt (Kinder)',
    descEn: 'Our bestselling happiness reminder. Soft cotton, bright vibes.',
    descFr: 'Notre best-seller pour les enfants. Coton doux, bonnes vibrations.',
    descDe: 'Unser Bestseller für Kinder. Weiches Baumwollshirt, strahlende Vibes.',
    price: 800, badge: null,
    img: '/images/products/Roarsomeshirt-11.webp',
    altEn: 'Roarsome kids tee', altFr: 'T-Shirt enfant Roarsome', altDe: 'Roarsome Kinder T-Shirt',
    colours: teeColours,
    sizes: ['2', '6', '10', '12'],
  },

  // ── ADULT TEES ──────────────────────────────────────────────────────────────

  {
    id: 2, category: 'tees',
    nameEn: 'Be a Good Human Tee – Neon Pink',
    nameFr: 'T-Shirt Sois un Bon Humain – Rose Néon',
    nameDe: 'Sei ein guter Mensch T-Shirt – Neonpink',
    descEn: 'Because every day deserves good energy. Unisex fit.',
    descFr: 'Parce que chaque jour mérite de la bonne énergie. Coupe unisexe.',
    descDe: 'Weil jeder Tag gute Energie verdient. Unisex-Schnitt.',
    price: 950, badge: 'hot', badgeEn: '🔥 Popular', badgeFr: '🔥 Populaire', badgeDe: '🔥 Beliebt',
    img: '/images/products/Begoodshirt-12.webp',
    altEn: 'Be a Good Human neon pink tee', altFr: 'T-Shirt rose néon Be a Good Human', altDe: 'Neonpink Be a Good Human T-Shirt',
    colours: teeColours,
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
  },

  {
    id: 11, category: 'tees',
    nameEn: 'Be a Good Human Tee – Neon Green',
    nameFr: 'T-Shirt Sois un Bon Humain – Vert Néon',
    nameDe: 'Sei ein guter Mensch T-Shirt – Neongrün',
    descEn: 'Because every day deserves good energy. Unisex fit.',
    descFr: 'Parce que chaque jour mérite de la bonne énergie. Coupe unisexe.',
    descDe: 'Weil jeder Tag gute Energie verdient. Unisex-Schnitt.',
    price: 950, badge: 'hot', badgeEn: '🔥 Popular', badgeFr: '🔥 Populaire', badgeDe: '🔥 Beliebt',
    img: '/images/products/Begoodshirtgreen-13.webp',
    altEn: 'Be a Good Human neon green tee', altFr: 'T-Shirt vert néon Be a Good Human', altDe: 'Neongrün Be a Good Human T-Shirt',
    colours: teeColours,
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
  },

  {
    id: 12, category: 'tees',
    nameEn: 'Be Kind to Your Mind Tee',
    nameFr: 'T-Shirt Sois Doux avec Ton Esprit',
    nameDe: 'Sei Freundlich zu Deinem Geist T-Shirt',
    descEn: 'Your mind deserves kindness too. Wear the reminder.',
    descFr: 'Votre esprit mérite de la bienveillance. Portez le rappel.',
    descDe: 'Dein Geist verdient Freundlichkeit. Trag die Erinnerung.',
    price: 950, badge: 'new', badgeEn: '✨ New', badgeFr: '✨ Nouveau', badgeDe: '✨ Neu',
    img: '/images/products/Bekindtomind-06.webp',
    altEn: 'Be Kind to Your Mind tee', altFr: 'T-Shirt Be Kind to Your Mind', altDe: 'Be Kind to Your Mind T-Shirt',
    colours: teeColours,
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
  },

  {
    id: 13, category: 'tees',
    nameEn: 'Le Morne Tee',
    nameFr: 'T-Shirt Le Morne',
    nameDe: 'Le Morne T-Shirt',
    descEn: 'Inspired by Mauritius\' most iconic peak.',
    descFr: 'Inspiré du pic le plus emblématique de Maurice.',
    descDe: 'Inspiriert vom ikonischsten Gipfel Mauritius\'.',
    price: 950, badge: null,
    img: '/images/products/Lemorneshirt-10.webp',
    altEn: 'Le Morne tee', altFr: 'T-Shirt Le Morne', altDe: 'Le Morne T-Shirt',
    colours: teeColours,
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
  },

  {
    id: 14, category: 'tees',
    nameEn: 'La Preneuse Tee',
    nameFr: 'T-Shirt La Preneuse',
    nameDe: 'La Preneuse T-Shirt',
    descEn: 'Where the ocean meets island calm.',
    descFr: 'Là où l\'océan rencontre la sérénité insulaire.',
    descDe: 'Wo der Ozean auf Inselruhe trifft.',
    price: 950, badge: 'new', badgeEn: '✨ New', badgeFr: '✨ Nouveau', badgeDe: '✨ Neu',
    img: '/images/products/Lepreneuse-17.webp',
    altEn: 'La Preneuse tee', altFr: 'T-Shirt La Preneuse', altDe: 'La Preneuse T-Shirt',
    colours: teeColours,
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
  },

  {
    id: 15, category: 'tees',
    nameEn: 'You Are Loved Tee',
    nameFr: 'T-Shirt Tu es Aimé',
    nameDe: 'Du bist Geliebt T-Shirt',
    descEn: 'A reminder you can wear every single day.',
    descFr: 'Un rappel que vous pouvez porter chaque jour.',
    descDe: 'Eine Erinnerung, die du jeden Tag tragen kannst.',
    price: 950, badge: 'fave', badgeEn: '❤️ Fave', badgeFr: '❤️ Favori', badgeDe: '❤️ Favorit',
    img: '/images/products/Loved-07.webp',
    altEn: 'You Are Loved tee', altFr: 'T-Shirt Tu es Aimé', altDe: 'Du bist Geliebt T-Shirt',
    colours: teeColours,
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
  },

  {
    id: 16, category: 'tees',
    nameEn: '1% Better Every Day Tee',
    nameFr: 'T-Shirt 1% Meilleur Chaque Jour',
    nameDe: '1% Besser Jeden Tag T-Shirt',
    descEn: 'Small steps. Big life. Keep going.',
    descFr: 'Petits pas. Grande vie. Continuez.',
    descDe: 'Kleine Schritte. Großes Leben. Weiter so.',
    price: 950, badge: 'fave', badgeEn: '❤️ Fave', badgeFr: '❤️ Favori', badgeDe: '❤️ Favorit',
    img: '/images/products/Onepercentblue-14.webp',
    altEn: '1% Better Every Day tee', altFr: 'T-Shirt 1% Meilleur', altDe: '1% Besser T-Shirt',
    colours: teeColours,
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
  },

  {
    id: 17, category: 'tees',
    nameEn: 'Tamarin Tee',
    nameFr: 'T-Shirt Tamarin',
    nameDe: 'Tamarin T-Shirt',
    descEn: 'West coast soul. Island made.',
    descFr: 'Âme de la côte ouest. Fait sur l\'île.',
    descDe: 'Westküsten-Seele. Auf der Insel gemacht.',
    price: 950, badge: 'hot', badgeEn: '🔥 Popular', badgeFr: '🔥 Populaire', badgeDe: '🔥 Beliebt',
    img: '/images/products/Tamarinshirt-16.webp',
    altEn: 'Tamarin tee', altFr: 'T-Shirt Tamarin', altDe: 'Tamarin T-Shirt',
    colours: teeColours,
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
  },

  // ── CAPS ────────────────────────────────────────────────────────────────────

  {
    id: 3, category: 'caps',
    nameEn: 'Island Calm Cap – White',
    nameFr: 'Casquette Sérénité Insulaire – Blanche',
    nameDe: 'Cap Inselruhe – Weiß',
    descEn: 'Adjustable, breathable. Perfect for the Mauritius sun.',
    descFr: 'Réglable et respirante. Parfaite pour le soleil mauricien.',
    descDe: 'Verstellbar und atmungsaktiv. Perfekt für die mauritische Sonne.',
    price: 750, badge: 'fave', badgeEn: '❤️ Fave', badgeFr: '❤️ Favori', badgeDe: '❤️ Favorit',
    img: '/images/products/Capwhite-18.webp',
    altEn: 'Island Calm cap white', altFr: 'Casquette blanche Sérénité', altDe: 'Cap Inselruhe Weiß',
  },

  {
    id: 18, category: 'caps',
    nameEn: 'Island Calm Cap – Black',
    nameFr: 'Casquette Sérénité Insulaire – Noire',
    nameDe: 'Cap Inselruhe – Schwarz',
    descEn: 'Adjustable, breathable. Perfect for the Mauritius sun.',
    descFr: 'Réglable et respirante. Parfaite pour le soleil mauricien.',
    descDe: 'Verstellbar und atmungsaktiv. Perfekt für die mauritische Sonne.',
    price: 750, badge: null,
    img: '/images/products/Capblack-20.webp',
    altEn: 'Island Calm cap black', altFr: 'Casquette noire Sérénité', altDe: 'Cap Inselruhe Schwarz',
  },

  {
    id: 19, category: 'caps',
    nameEn: 'Island Calm Cap – Blue',
    nameFr: 'Casquette Sérénité Insulaire – Bleue',
    nameDe: 'Cap Inselruhe – Blau',
    descEn: 'Adjustable, breathable. Perfect for the Mauritius sun.',
    descFr: 'Réglable et respirante. Parfaite pour le soleil mauricien.',
    descDe: 'Verstellbar und atmungsaktiv. Perfekt für die mauritische Sonne.',
    price: 750, badge: null,
    img: '/images/products/Capblue-19.webp',
    altEn: 'Island Calm cap blue', altFr: 'Casquette bleue Sérénité', altDe: 'Cap Inselruhe Blau',
  },

  // ── HOODIES ─────────────────────────────────────────────────────────────────

  {
    id: 4, category: 'hoodies',
    nameEn: 'Island Hoodie – White',
    nameFr: 'Hoodie Insulaire – Blanc',
    nameDe: 'Insel Hoodie – Weiß',
    descEn: 'Cosy island evenings vibes. Premium fleece.',
    descFr: 'Pour les douces soirées insulaires. Polaire premium.',
    descDe: 'Für gemütliche Inselabende. Premium-Fleece.',
    price: 1800, badge: 'new', badgeEn: '✨ New', badgeFr: '✨ Nouveau', badgeDe: '✨ Neu',
    img: '/images/products/Hoodiewhitepalms-08.webp',
    altEn: 'Island Hoodie white', altFr: 'Hoodie blanc Insulaire', altDe: 'Insel Hoodie Weiß',
    sizes: ['S/M', 'L/XL'],
  },

  {
    id: 20, category: 'hoodies',
    nameEn: 'Island Hoodie – Grey',
    nameFr: 'Hoodie Insulaire – Gris',
    nameDe: 'Insel Hoodie – Grau',
    descEn: 'Cosy island evenings vibes. Premium fleece.',
    descFr: 'Pour les douces soirées insulaires. Polaire premium.',
    descDe: 'Für gemütliche Inselabende. Premium-Fleece.',
    price: 1800, badge: null,
    img: '/images/products/Hoodiegreypalms-09.webp',
    altEn: 'Island Hoodie grey', altFr: 'Hoodie gris Insulaire', altDe: 'Insel Hoodie Grau',
    sizes: ['S/M', 'L/XL'],
  },

  // ── TOTE BAGS ───────────────────────────────────────────────────────────────

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

  {
    id: 21, category: 'bags',
    nameEn: 'Be a Good Human Tote Bag',
    nameFr: 'Tote Bag Sois un Bon Humain',
    nameDe: 'Sei ein guter Mensch Tote Bag',
    descEn: 'Carry your good vibes everywhere. 100% cotton canvas.',
    descFr: 'Portez vos bonnes vibrations partout. Coton 100%.',
    descDe: 'Trag deine guten Vibes überallhin. 100% Baumwollcanvas.',
    price: 450, badge: null,
    img: '/images/products/Begood-15.webp',
    altEn: 'Be a Good Human tote bag', altFr: 'Tote Bag Be a Good Human', altDe: 'Be a Good Human Tote Bag',
  },

  {
    id: 22, category: 'bags',
    nameEn: 'Just Chilling Tote Bag',
    nameFr: 'Tote Bag Just Chilling',
    nameDe: 'Just Chilling Tote Bag',
    descEn: 'For everything you need and nothing you don\'t.',
    descFr: 'Pour tout ce dont vous avez besoin, rien de plus.',
    descDe: 'Für alles was du brauchst und nichts was du nicht brauchst.',
    price: 450, badge: null,
    img: '/images/products/Justchilling-05.webp',
    altEn: 'Just Chilling tote bag', altFr: 'Tote Bag Just Chilling', altDe: 'Just Chilling Tote Bag',
  },

  {
    id: 23, category: 'bags',
    nameEn: 'Younique Tote Bag',
    nameFr: 'Tote Bag Younique',
    nameDe: 'Younique Tote Bag',
    descEn: 'Carry your story. Own your vibe.',
    descFr: 'Portez votre histoire. Assumez votre vibe.',
    descDe: 'Trag deine Geschichte. Leb deinen Vibe.',
    price: 450, badge: null,
    img: '/images/products/Youniquetote-03.webp',
    altEn: 'Younique tote bag', altFr: 'Tote Bag Younique', altDe: 'Younique Tote Bag',
  },

  // ── GIFTS ───────────────────────────────────────────────────────────────────

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