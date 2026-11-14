import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { brandName, products } from '@/lib/catalog';
import { ProductDetails } from '@/components/product-details';
import { ProductCard } from '@/components/product-card';

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  return { title: product ? `${product.name} — ${brandName(product.brand)}` : 'Product not found' };
}
export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) notFound();
  const related = [
    ...products.filter((p) => p.brand === product.brand && p.slug !== slug),
    ...products.filter((p) => p.brand !== product.brand && p.slug !== slug),
  ].slice(0, 4);
  return (
    <div className="site-width pb-18 pt-7">
      <div className="breadcrumb mb-8 flex-wrap">
        <Link href="/shop">Shop</Link>
        <span>/</span>
        <Link href={`/brands/${product.brand}`}>{brandName(product.brand)}</Link>
        <span>/</span>
        <span>{product.name}</span>
      </div>
      <ProductDetails product={product} />
      <section className="mt-18 border-t border-ink/15 pt-12">
        <h2 className="section-title mb-7">Good company for your new favourite.</h2>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
          {related.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
