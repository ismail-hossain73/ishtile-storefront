import type { Metadata } from 'next';
import Link from 'next/link';
import { Sparkle } from 'lucide-react';
import { BrandDirectory } from '@/components/brand-directory';
import { ServiceStrip } from '@/components/footer';

export const metadata: Metadata = { title: 'Our brands' };
export default function Brands() {
  return (
    <>
      <div className="site-width pb-18 pt-8">
        <div className="breadcrumb">
          <Link href="/">Home</Link>
          <span>/</span>
          <span>Our brands</span>
        </div>
        <div className="relative py-13 sm:py-20">
          <p className="eyebrow mb-5 text-ink/50">Curated for the way you express yourself</p>
          <h1 className="page-heading">
            Different brands.
            <br />
            One universe<span className="text-[#718421]">.</span>
          </h1>
          <p className="mt-6 max-w-lg text-sm leading-relaxed text-ink/60 sm:text-base">
            Meet the independent labels making their own rules. Find a name you love, step into
            their world, and discover what makes them different.
          </p>
          <Sparkle
            aria-hidden="true"
            className="absolute right-5 top-20 hidden size-30 rotate-12 text-[#a2b52e] lg:block"
            strokeWidth={0.8}
          />
        </div>
        <BrandDirectory />
      </div>
      <ServiceStrip />
    </>
  );
}
