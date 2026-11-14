export type Brand = {
  slug: string;
  name: string;
  category: string;
  tagline: string;
  description: string;
  color: string;
  since: string;
};

export const brands: Brand[] = [
  {
    slug: 'onen',
    name: 'ONEN +',
    category: 'Contemporary',
    tagline: 'Everyday. Anything but ordinary.',
    description:
      'Considered essentials for the way you move. Clean lines, easy silhouettes, and a little unexpected detail. This is your everyday, reimagined.',
    color: '#d3e0ba',
    since: '2021',
  },
  {
    slug: 'farak',
    name: 'FARAK',
    category: 'Streetwear',
    tagline: 'Made to stand apart.',
    description:
      'Rooted in the streets. Made for self-expression. FARAK brings oversized silhouettes and a fearless point of view to your daily rotation.',
    color: '#b8a3c4',
    since: '2020',
  },
  {
    slug: 'mocha',
    name: 'MOCHA +',
    category: 'Contemporary',
    tagline: 'A softer kind of statement.',
    description:
      'Slow mornings, warm neutrals, and beautiful simplicity. Discover thoughtful pieces that move effortlessly from one part of your day to the next.',
    color: '#d9bba0',
    since: '2022',
  },
  {
    slug: 'pilgrim',
    name: 'PILGRIM',
    category: 'Essentials',
    tagline: 'For wherever you’re headed.',
    description:
      'Made for the curious. From city streets to the road less travelled, PILGRIM makes functional, enduring pieces for a life in motion.',
    color: '#a3b8b0',
    since: '2019',
  },
  {
    slug: 'ishtile',
    name: 'ISHTILE +',
    category: 'Essentials',
    tagline: 'More fashion. More you.',
    description:
      'Our signature collection. Confident essentials, expressive details, and premium everyday comfort. Discover the pieces at the heart of ISHTILE.',
    color: '#d5f348',
    since: '2025',
  },
  {
    slug: 'roots',
    name: 'ROOTS',
    category: 'Traditional',
    tagline: 'Tradition, in a new light.',
    description:
      'A contemporary perspective on timeless craft. Natural textures and thoughtful details celebrate where we come from—and where we’re going.',
    color: '#d9bd78',
    since: '2023',
  },
];

export type Product = {
  slug: string;
  name: string;
  brand: string;
  category: 'T-shirts' | 'Shirts' | 'Polos' | 'Layers' | 'Bottoms';
  price: number;
  image: string;
  color: string;
  badge?: string;
};

export const products: Product[] = [
  {
    slug: 'signature-essential-tee',
    name: 'Signature Essential Tee',
    brand: 'ishtile',
    category: 'T-shirts',
    price: 2490,
    image: 'essential-tee',
    color: 'Black',
    badge: 'BESTSELLER',
  },
  {
    slug: 'onen-linen-shirt',
    name: 'Everyday Linen Shirt',
    brand: 'onen',
    category: 'Shirts',
    price: 2990,
    image: 'linen-shirt',
    color: 'Ecru',
    badge: 'NEW',
  },
  {
    slug: 'signature-polo',
    name: 'Signature Polo',
    brand: 'ishtile',
    category: 'Polos',
    price: 2990,
    image: 'polo',
    color: 'Black',
  },
  {
    slug: 'farak-check-shirt',
    name: 'Off-Duty Check Shirt',
    brand: 'farak',
    category: 'Shirts',
    price: 2990,
    image: 'check-shirt',
    color: 'Check',
    badge: 'NEW',
  },
  {
    slug: 'pilgrim-sports-polo',
    name: 'Movement Sports Polo',
    brand: 'pilgrim',
    category: 'Polos',
    price: 1990,
    image: 'sports-polo',
    color: 'Black',
  },
  {
    slug: 'mocha-basic-tee',
    name: 'The Everyday Tee',
    brand: 'mocha',
    category: 'T-shirts',
    price: 1490,
    image: 'basic-tee',
    color: 'Ecru',
  },
  {
    slug: 'farak-hoodie',
    name: 'After Hours Hoodie',
    brand: 'farak',
    category: 'Layers',
    price: 3490,
    image: 'hoodie',
    color: 'Black',
  },
  {
    slug: 'onen-logo-tee',
    name: 'Minimal Logo Tee',
    brand: 'onen',
    category: 'T-shirts',
    price: 1990,
    image: 'logo-tee',
    color: 'Black',
  },
  {
    slug: 'farak-overshirt',
    name: 'Utility Overshirt',
    brand: 'farak',
    category: 'Layers',
    price: 3990,
    image: 'overshirt',
    color: 'Black',
  },
  {
    slug: 'roots-relaxed-shirt',
    name: 'Heritage Relaxed Shirt',
    brand: 'roots',
    category: 'Shirts',
    price: 3490,
    image: 'relaxed-shirt',
    color: 'Ecru',
  },
  {
    slug: 'pilgrim-cargo-pants',
    name: 'Everywhere Cargo Pants',
    brand: 'pilgrim',
    category: 'Bottoms',
    price: 3990,
    image: 'cargo-pants',
    color: 'Black',
  },
  {
    slug: 'mocha-shorts',
    name: 'Weekend Shorts',
    brand: 'mocha',
    category: 'Bottoms',
    price: 1990,
    image: 'shorts',
    color: 'Black',
  },
  {
    slug: 'onen-relaxed-shirt',
    name: 'Relaxed Cotton Shirt',
    brand: 'onen',
    category: 'Shirts',
    price: 2690,
    image: 'relaxed-shirt',
    color: 'Ecru',
  },
  {
    slug: 'roots-essential-tee',
    name: 'Natural Cotton Tee',
    brand: 'roots',
    category: 'T-shirts',
    price: 1790,
    image: 'basic-tee',
    color: 'Ecru',
  },
  {
    slug: 'mocha-linen-shirt',
    name: 'Sunday Linen Shirt',
    brand: 'mocha',
    category: 'Shirts',
    price: 2890,
    image: 'linen-shirt',
    color: 'Ecru',
    badge: 'NEW',
  },
  {
    slug: 'pilgrim-utility-shirt',
    name: 'Journey Utility Shirt',
    brand: 'pilgrim',
    category: 'Layers',
    price: 3590,
    image: 'overshirt',
    color: 'Black',
  },
  {
    slug: 'roots-daily-shirt',
    name: 'Daily Weave Shirt',
    brand: 'roots',
    category: 'Shirts',
    price: 2490,
    image: 'linen-shirt',
    color: 'Ecru',
  },
  {
    slug: 'signature-logo-tee',
    name: 'Original Logo Tee',
    brand: 'ishtile',
    category: 'T-shirts',
    price: 1990,
    image: 'logo-tee',
    color: 'Black',
  },
];

export const categories = ['All', 'T-shirts', 'Shirts', 'Polos', 'Layers', 'Bottoms'] as const;
export const sizes = ['S', 'M', 'L', 'XL', 'XXL'];
export const money = (amount: number) => `৳ ${amount.toLocaleString('en-BD')}`;
export const brandName = (slug: string) =>
  brands.find((brand) => brand.slug === slug)?.name ?? slug;
