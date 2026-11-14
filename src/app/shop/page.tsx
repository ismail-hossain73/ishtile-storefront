import type { Metadata } from 'next';
import Link from 'next/link';
import { Catalog } from '@/components/catalog';
import { products } from '@/lib/catalog';

export const metadata: Metadata = { title: 'Shop all products' };
export default async function Shop({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; sort?: string; category?: string }>;
}) {
  const { q = '', sort = 'featured', category = 'All' } = await searchParams;
  return (
    <div className="site-width pb-20 pt-8">
      <div className="breadcrumb">
        <Link href="/">Home</Link>
        <span>/</span>
        <span>Shop</span>
      </div>
      <div className="pb-10 pt-12 sm:pt-16">
        <p className="eyebrow mb-4 text-ink/50">Your style. Your way.</p>
        <h1 className="page-heading">The collection.</h1>
        <p className="mt-5 max-w-xl text-sm leading-relaxed text-ink/60">
          Considered essentials. Unexpected favourites. Explore pieces from independent labels, all
          in one place.
        </p>
      </div>
      <Catalog
        key={`${q}-${sort}-${category}`}
        products={products}
        showBrands
        initialQuery={q}
        initialSort={sort}
        initialCategory={category}
      />
    </div>
  );
}
