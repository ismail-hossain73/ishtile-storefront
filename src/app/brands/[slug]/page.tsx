import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowUpRight } from 'lucide-react';
import { brands, products } from '@/lib/catalog';
import { Catalog } from '@/components/catalog';
import { BrandCard } from '@/components/brand-card';

export function generateStaticParams() {
  return brands.map((brand) => ({ slug: brand.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const brand = brands.find((b) => b.slug === slug);
  return {
    title: brand ? `${brand.name} — ${brand.tagline}` : 'Brand not found',
    description: brand?.description,
  };
}
export default async function BrandPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const brand = brands.find((b) => b.slug === slug);
  if (!brand) notFound();
  const collection = products.filter((product) => product.brand === slug);
  return (
    <>
      <section
        className="brand-hero"
        style={{ '--brand-color': brand.color } as React.CSSProperties}
      >
        <div className="site-width relative z-10 pb-14 pt-7 sm:pb-18">
          <div className="flex items-center gap-2 text-[11px] text-cream/50">
            <Link href="/">Home</Link>
            <span>/</span>
            <Link href="/brands">Our brands</Link>
            <span>/</span>
            <span>{brand.name}</span>
          </div>
          <div className="mt-15 flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <div>
              <p className="eyebrow mb-6" style={{ color: brand.color }}>
                {brand.category} / Independent since {brand.since}
              </p>
              <h1
                className={`text-7xl font-semibold tracking-[-.065em] sm:text-9xl ${['mocha', 'roots'].includes(slug) ? 'font-serif italic' : ''}`}
              >
                {brand.name}
              </h1>
              <p className="mt-6 text-lg text-cream/75 sm:text-xl">{brand.tagline}</p>
            </div>
            <div className="max-w-sm">
              <p className="text-sm leading-7 text-cream/65">{brand.description}</p>
              <a href="#collection" className="text-link mt-6 border-b border-cream/40 pb-2">
                Explore the collection <ArrowUpRight size={17} />
              </a>
            </div>
          </div>
        </div>
      </section>
      <div className="site-width py-12 sm:py-16" id="collection">
        <div className="mb-5 flex items-center justify-between gap-4">
          <h2 className="section-title">The {brand.name} collection.</h2>
          <Link href="/brands" className="hidden text-xs underline underline-offset-4 sm:block">
            Explore all brands
          </Link>
        </div>
        <Catalog products={collection} />
      </div>
      <section className="site-width border-t border-ink/15 py-12 sm:py-16">
        <div className="mb-7 flex items-center justify-between">
          <h2 className="section-title">More to discover.</h2>
          <Link href="/brands" className="text-link">
            All brands <ArrowUpRight size={16} />
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          {brands
            .filter((b) => b.slug !== slug)
            .slice(0, 3)
            .map((b, index) => (
              <BrandCard key={b.slug} brand={b} index={index} />
            ))}
        </div>
      </section>
    </>
  );
}
