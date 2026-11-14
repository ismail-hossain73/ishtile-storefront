'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { ArrowRight, Check, Heart, Ruler, Truck, RefreshCcw } from 'lucide-react';
import { brandName, money, sizes, type Product } from '@/lib/catalog';
import { useStore } from './store-provider';

export function ProductDetails({ product }: { product: Product }) {
  const [size, setSize] = useState('');
  const [sizeError, setSizeError] = useState(false);
  const [sizeGuide, setSizeGuide] = useState(false);
  const { addToCart, toggleWishlist, wishlist } = useStore();
  const saved = wishlist.includes(product.slug);
  return (
    <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
      <div>
        <div className="relative flex aspect-[1.12] items-center justify-center overflow-hidden rounded bg-sand sm:aspect-[1.25] lg:aspect-square">
          <Image
            src={`/images/${product.image}.jpg`}
            alt={`${product.name} — ${product.color}`}
            fill
            priority
            sizes="(max-width: 1024px) 95vw, 55vw"
            className="object-contain p-6 mix-blend-multiply sm:p-12"
          />
          {product.badge && <span className="eyebrow absolute left-6 top-6">{product.badge}</span>}
          <span className="absolute bottom-5 left-5 text-[10px] text-ink/45">
            Sample collection / {brandName(product.brand)}
          </span>
        </div>
        <div className="mt-4 flex items-center justify-center gap-3 text-xs text-ink/55">
          <Check size={14} /> Considered details. Everyday comfort.
        </div>
      </div>
      <div className="lg:py-5">
        <Link
          href={`/brands/${product.brand}`}
          className="eyebrow inline-flex items-center gap-3 text-ink/55"
        >
          {brandName(product.brand)} <ArrowRight size={13} />
        </Link>
        <h1 className="mt-4 max-w-md text-4xl font-semibold leading-[1.05] tracking-[-.055em] sm:text-5xl">
          {product.name}
        </h1>
        <p className="mt-5 text-2xl">{money(product.price)}</p>
        <p className="mt-5 max-w-md text-sm leading-7 text-ink/60">
          An easy addition to your everyday rotation. A considered silhouette, effortless styling,
          and the details that make it yours.
        </p>
        <div className="mt-7">
          <p className="text-xs">
            Colour: <span className="text-ink/60">{product.color}</span>
          </p>
          <span
            className={`mt-3 block size-6 rounded-full border-3 border-cream outline outline-1 outline-ink/50 ${product.color === 'Ecru' ? 'bg-[#d7c8ad]' : 'bg-ink'}`}
          />
        </div>
        <div className="mt-7">
          <div className="flex items-center justify-between">
            <p className="text-xs">
              Select a size {size && <span className="text-ink/50">/ {size}</span>}
            </p>
            <button
              onClick={() => setSizeGuide(!sizeGuide)}
              aria-expanded={sizeGuide}
              className="flex items-center gap-1.5 text-xs text-ink/60 underline underline-offset-4"
            >
              <Ruler size={13} /> Size guide
            </button>
          </div>
          <div className="mt-3 flex gap-2">
            {sizes.map((item) => (
              <button
                key={item}
                aria-pressed={size === item}
                onClick={() => {
                  setSize(item);
                  setSizeError(false);
                }}
                className={`flex h-11 min-w-12 items-center justify-center border px-3 text-xs ${size === item ? 'border-ink bg-ink text-cream' : 'border-ink/20 hover:border-ink'}`}
              >
                {item}
              </button>
            ))}
          </div>
          {sizeGuide && (
            <div className="mt-4 border border-ink/15 p-4 text-xs">
              <p className="mb-3 font-semibold">General fit guide</p>
              <div className="grid grid-cols-5 gap-2 text-center">
                {sizes.map((s, i) => (
                  <div key={s}>
                    <p className="font-medium">{s}</p>
                    <p className="mt-2 text-ink/60">
                      {36 + i * 2}–{38 + i * 2}″
                    </p>
                  </div>
                ))}
              </div>
              <p className="mt-3 text-ink/55">
                Approximate chest measurements for tops only. Sample sizing; final measurements will
                be provided by each brand.
              </p>
            </div>
          )}
          <p aria-live="polite" className="mt-2 min-h-5 text-xs text-red-700">
            {sizeError ? 'Please choose a size before adding to your bag.' : ''}
          </p>
        </div>
        <button
          onClick={() => {
            if (!size) {
              setSizeError(true);
              return;
            }
            addToCart(product.slug, size);
          }}
          className="button-dark mt-2 w-full"
        >
          Add to bag <ArrowRight size={17} />
        </button>
        <button
          onClick={() => toggleWishlist(product.slug)}
          aria-pressed={saved}
          className="mt-4 flex w-full items-center justify-center gap-2 py-2 text-xs"
        >
          <Heart size={15} fill={saved ? 'currentColor' : 'none'} />
          {saved ? 'Saved to your wishlist' : 'Save for later'}
        </button>
        <div className="my-7 grid grid-cols-2 gap-3 border-y border-ink/15 py-5 text-[11px] text-ink/65">
          <span className="flex items-center gap-2">
            <Truck size={18} strokeWidth={1.3} /> Delivery across Bangladesh
          </span>
          <span className="flex items-center gap-2">
            <RefreshCcw size={16} strokeWidth={1.3} /> Easy returns
          </span>
        </div>
        {[
          {
            title: 'The details',
            text: `${product.color} colourway. An easy-to-style ${product.category.toLowerCase()} piece from ${brandName(product.brand)}. Product details and composition are illustrative until the brand catalogue is connected.`,
          },
          {
            title: 'Care notes',
            text: 'Always follow the garment care label. Wash with similar colours, avoid harsh detergents, and air dry where possible.',
          },
          {
            title: 'Shipping & returns',
            text: 'Delivery rates, timelines, and return policies will be confirmed when checkout launches. This frontend preview does not accept real orders.',
          },
        ].map((item) => (
          <details key={item.title} className="border-b border-ink/15 py-4">
            <summary className="cursor-pointer text-xs font-medium">{item.title}</summary>
            <p className="mt-3 text-xs leading-6 text-ink/60">{item.text}</p>
          </details>
        ))}
      </div>
    </div>
  );
}
