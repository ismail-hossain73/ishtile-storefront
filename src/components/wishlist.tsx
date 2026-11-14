'use client';

import Link from 'next/link';
import { ArrowRight, Heart } from 'lucide-react';
import { products } from '@/lib/catalog';
import { useStore } from './store-provider';
import { ProductCard } from './product-card';

export function Wishlist() {
  const { wishlist } = useStore();
  const saved = products.filter((product) => wishlist.includes(product.slug));
  return saved.length ? (
    <>
      <p className="mb-6 text-xs text-ink/55">
        {saved.length} {saved.length === 1 ? 'piece' : 'pieces'} you have your eye on.
      </p>
      <div className="grid grid-cols-2 gap-x-5 gap-y-8 md:grid-cols-3 lg:grid-cols-4">
        {saved.map((product, index) => (
          <ProductCard product={product} key={product.slug} priority={index < 4} />
        ))}
      </div>
    </>
  ) : (
    <div className="flex flex-col items-center py-16 text-center">
      <Heart size={42} strokeWidth={1} className="mb-6 text-ink/40" />
      <h2 className="text-2xl font-semibold tracking-tight">Keep your favourites close.</h2>
      <p className="mt-3 max-w-xs text-sm leading-relaxed text-ink/60">
        Tap the heart on anything you love. We’ll keep it right here, on this browser.
      </p>
      <Link href="/shop" className="button-dark mt-7">
        Find your favourites <ArrowRight size={17} />
      </Link>
    </div>
  );
}
