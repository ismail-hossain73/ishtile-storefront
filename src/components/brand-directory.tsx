'use client';

import { useState } from 'react';
import { Search, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { brands } from '@/lib/catalog';
import { BrandCard } from './brand-card';

export function BrandDirectory() {
  const [category, setCategory] = useState('All brands');
  const [query, setQuery] = useState('');
  const filtered = brands.filter(
    (brand) =>
      (category === 'All brands' || brand.category === category) &&
      `${brand.name} ${brand.category}`.toLowerCase().includes(query.toLowerCase().trim()),
  );
  return (
    <>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-6 border-y border-ink/20 py-4">
        <div className="flex flex-wrap gap-x-6 gap-y-3">
          {['All brands', 'Contemporary', 'Streetwear', 'Essentials', 'Traditional'].map((item) => (
            <button
              key={item}
              onClick={() => setCategory(item)}
              aria-pressed={category === item}
              className={`text-xs ${category === item ? 'font-semibold underline decoration-2 underline-offset-8' : 'text-ink/50'}`}
            >
              {item}
              {item === 'All brands' && <sup className="ml-1.5 text-[9px]">06</sup>}
            </button>
          ))}
        </div>
        <label className="flex items-center gap-2 border-b border-ink/25 pb-1">
          <Search size={15} />
          <span className="sr-only">Find a brand</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Find a brand"
            className="w-36 bg-transparent text-xs outline-none"
          />
        </label>
      </div>
      <div aria-live="polite" className="mb-5 text-xs text-ink/50">
        {filtered.length} independent {filtered.length === 1 ? 'label' : 'labels'}. A world of
        possibilities.
      </div>
      {filtered.length ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((brand) => (
            <BrandCard key={brand.slug} brand={brand} index={brands.indexOf(brand)} />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center">
          <h2 className="text-2xl font-semibold">No labels found.</h2>
          <p className="mt-3 text-sm text-ink/60">Try another name or explore all our brands.</p>
          <button
            onClick={() => {
              setQuery('');
              setCategory('All brands');
            }}
            className="button-dark mt-5"
          >
            Show all brands
          </button>
        </div>
      )}
      <div className="mt-12 flex flex-col justify-between gap-5 border-t border-ink/20 pt-8 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-lg font-semibold tracking-tight">
            Good style doesn’t stop at a label.
          </h2>
          <p className="mt-2 text-sm text-ink/55">Mix it up. Make it yours.</p>
        </div>
        <Link href="/shop" className="text-link">
          Explore all products <ArrowUpRight size={17} />
        </Link>
      </div>
    </>
  );
}
