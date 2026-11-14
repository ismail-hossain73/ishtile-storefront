'use client';

import { useMemo, useState } from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { brandName, brands, categories, type Product } from '@/lib/catalog';
import { ProductCard } from './product-card';

type Props = {
  products: Product[];
  showBrands?: boolean;
  initialQuery?: string;
  initialSort?: string;
  initialCategory?: string;
};
export function Catalog({
  products,
  showBrands = false,
  initialQuery = '',
  initialSort = 'featured',
  initialCategory = 'All',
}: Props) {
  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState<string>(
    categories.some((c) => c === initialCategory) ? initialCategory : 'All',
  );
  const [brand, setBrand] = useState('all');
  const [sort, setSort] = useState(
    ['featured', 'newest', 'price-low', 'price-high'].includes(initialSort)
      ? initialSort
      : 'featured',
  );
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [price, setPrice] = useState('all');
  const results = useMemo(() => {
    const term = query.trim().toLowerCase();
    const filtered = products.filter(
      (product) =>
        (category === 'All' || product.category === category) &&
        (brand === 'all' || product.brand === brand) &&
        (price === 'all' || (price === 'under' ? product.price < 2500 : product.price >= 2500)) &&
        (!term ||
          `${product.name} ${brandName(product.brand)} ${product.category} ${product.color}`
            .toLowerCase()
            .includes(term)),
    );
    if (sort === 'price-low') filtered.sort((a, b) => a.price - b.price);
    if (sort === 'price-high') filtered.sort((a, b) => b.price - a.price);
    if (sort === 'newest')
      filtered.sort((a, b) => Number(b.badge === 'NEW') - Number(a.badge === 'NEW'));
    return filtered;
  }, [products, category, brand, sort, query, price]);
  const hasFilters = category !== 'All' || brand !== 'all' || query !== '' || price !== 'all';
  function reset() {
    setQuery('');
    setCategory('All');
    setBrand('all');
    setPrice('all');
  }
  return (
    <section aria-label="Product collection">
      <div className="catalog-tabs flex gap-6 overflow-x-auto border-b border-ink/20 sm:gap-9">
        {categories.map((item) => (
          <button
            onClick={() => setCategory(item)}
            key={item}
            aria-pressed={category === item}
            className={`shrink-0 border-b-2 py-4 text-sm transition-colors ${category === item ? 'border-ink font-semibold' : 'border-transparent text-ink/50 hover:text-ink'}`}
          >
            {item}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap items-center justify-between gap-4 py-6">
        <p className="text-xs text-ink/55">
          {results.length} {results.length === 1 ? 'piece' : 'pieces'} to make your own
        </p>
        <div className="flex items-center gap-5">
          <button
            onClick={() => setFiltersOpen(!filtersOpen)}
            aria-expanded={filtersOpen}
            aria-controls="catalog-filters"
            className="flex items-center gap-2 text-xs"
          >
            <SlidersHorizontal size={15} /> Filters
            {hasFilters && <span className="size-1.5 rounded-full bg-ink" />}
          </button>
          <label className="flex items-center gap-2 text-xs">
            <span className="hidden text-ink/50 sm:inline">Sort by</span>
            <select
              aria-label="Sort products"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="max-w-36 bg-transparent py-2 outline-none"
            >
              <option value="featured">Featured</option>
              <option value="newest">New arrivals</option>
              <option value="price-low">Price: low to high</option>
              <option value="price-high">Price: high to low</option>
            </select>
          </label>
        </div>
      </div>
      {(filtersOpen || initialQuery) && (
        <div
          id="catalog-filters"
          className="mb-7 flex flex-wrap items-end gap-4 rounded border border-ink/15 p-4 sm:p-5"
        >
          <label className="min-w-48 flex-1">
            <span className="eyebrow mb-2 block text-ink/50">Find your favourite</span>
            <div className="flex items-center gap-2 border-b border-ink/30 py-2">
              <Search size={16} />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products or brands"
                className="w-full bg-transparent text-sm outline-none"
              />
            </div>
          </label>
          {showBrands && (
            <label className="flex-1">
              <span className="eyebrow mb-2 block text-ink/50">Brand</span>
              <select
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                className="w-full min-w-32 border-b border-ink/30 bg-transparent py-2 text-sm"
              >
                <option value="all">All brands</option>
                {brands.map((b) => (
                  <option key={b.slug} value={b.slug}>
                    {b.name}
                  </option>
                ))}
              </select>
            </label>
          )}
          <label className="flex-1">
            <span className="eyebrow mb-2 block text-ink/50">Price</span>
            <select
              className="w-full min-w-32 border-b border-ink/30 bg-transparent py-2 text-sm"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            >
              <option value="all">All prices</option>
              <option value="under">Under ৳ 2,500</option>
              <option value="over">৳ 2,500 and above</option>
            </select>
          </label>
          {hasFilters && (
            <button
              className="flex items-center gap-2 py-2 text-xs underline underline-offset-4"
              onClick={reset}
            >
              Clear all <X size={13} />
            </button>
          )}
        </div>
      )}
      {results.length ? (
        <div className="grid grid-cols-2 gap-x-4 gap-y-7 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-6">
          {results.map((product, index) => (
            <ProductCard key={product.slug} product={product} priority={index < 4} />
          ))}
        </div>
      ) : (
        <div className="py-24 text-center">
          <Search size={32} className="mx-auto mb-5 text-ink/40" strokeWidth={1} />
          <h3 className="text-2xl font-semibold">Nothing here. Yet.</h3>
          <p className="mt-3 text-sm text-ink/60">
            Try a different search or let a new favourite find you.
          </p>
          <button className="button-dark mx-auto mt-6" onClick={reset}>
            Show all products
          </button>
        </div>
      )}
    </section>
  );
}
