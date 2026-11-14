'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Heart } from 'lucide-react';
import { brandName, money, type Product } from '@/lib/catalog';
import { useStore } from './store-provider';

export function ProductCard({
  product,
  priority = false,
}: {
  product: Product;
  priority?: boolean;
}) {
  const { wishlist, toggleWishlist } = useStore();
  const saved = wishlist.includes(product.slug);
  return (
    <article className="product-card group">
      <div className="product-image">
        <Link
          href={`/products/${product.slug}`}
          aria-label={`View ${product.name}`}
          className="absolute inset-0"
        >
          <Image
            src={`/images/${product.image}.jpg`}
            alt={`${product.name} in ${product.color}`}
            fill
            sizes="(max-width: 640px) 48vw, (max-width: 1024px) 32vw, 24vw"
            className="object-contain transition-transform duration-500 group-hover:scale-105"
            priority={priority}
          />
        </Link>
        {product.badge && (
          <span className="absolute left-3 top-3 text-[8px] font-semibold tracking-widest sm:text-[9px]">
            {product.badge}
          </span>
        )}
        <button
          aria-label={`${saved ? 'Remove' : 'Save'} ${product.name} ${saved ? 'from' : 'to'} wishlist`}
          aria-pressed={saved}
          className="absolute right-2 top-2 flex size-9 items-center justify-center rounded-full transition-colors hover:bg-cream/70"
          onClick={() => toggleWishlist(product.slug)}
        >
          <Heart size={19} strokeWidth={1.4} fill={saved ? 'currentColor' : 'none'} />
        </button>
        <Link
          href={`/products/${product.slug}`}
          className="product-view hidden items-center justify-center gap-2 py-3 text-xs sm:flex"
        >
          Discover this piece <ArrowUpRight size={14} />
        </Link>
      </div>
      <div className="px-0.5 pb-2 pt-3">
        <div className="mb-1 flex items-center justify-between gap-1">
          <Link
            href={`/brands/${product.brand}`}
            className="text-[9px] font-medium tracking-wider text-ink/50 sm:text-[10px]"
          >
            {brandName(product.brand)}
          </Link>
          <span className="hidden text-[10px] text-ink/45 sm:block">{product.color}</span>
        </div>
        <Link
          href={`/products/${product.slug}`}
          className="block text-[13px] font-medium leading-snug sm:text-sm"
        >
          {product.name}
        </Link>
        <p className="mt-2 text-[13px] sm:text-sm">{money(product.price)}</p>
      </div>
    </article>
  );
}
