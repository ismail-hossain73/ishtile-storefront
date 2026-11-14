import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import type { Brand } from '@/lib/catalog';

export function BrandCard({ brand, index = 0 }: { brand: Brand; index?: number }) {
  return (
    <Link
      href={`/brands/${brand.slug}`}
      className="brand-card group"
      style={{ '--brand-color': brand.color } as React.CSSProperties}
    >
      <div className="flex items-center justify-between">
        <span className="eyebrow text-cream/55">
          0{index + 1} / {brand.category}
        </span>
        <ArrowUpRight
          size={23}
          strokeWidth={1.3}
          className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
        />
      </div>
      <div
        className={`brand-logotype ${brand.slug === 'mocha' || brand.slug === 'roots' ? 'font-serif italic' : ''}`}
      >
        {brand.name}
      </div>
      <div className="flex items-end justify-between gap-3">
        <p className="max-w-40 text-sm leading-relaxed text-cream/65">{brand.tagline}</p>
        <span className="brand-explore flex size-10 shrink-0 items-center justify-center rounded-full border border-cream/25">
          <ArrowUpRight size={18} />
        </span>
      </div>
      <span className="brand-card-orbit" aria-hidden="true" />
    </Link>
  );
}
