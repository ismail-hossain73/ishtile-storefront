import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { articles } from '@/lib/editorial';

export const metadata: Metadata = { title: 'Editorial' };
export default function Editorial() {
  return (
    <>
      <section className="editorial-banner py-18 sm:py-25">
        <div className="site-width relative z-10">
          <p className="eyebrow mb-5 text-cream/55">The ISHTILE journal</p>
          <h1 className="page-heading">
            Fashion. Culture.
            <br />
            Everything beyond.
          </h1>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-cream/65">
            Stories, perspectives, and a little everyday inspiration.
            <br />
            Welcome to our world.
          </p>
        </div>
      </section>
      <section className="site-width py-14 sm:py-18">
        <div className="mb-8 flex items-end justify-between">
          <h2 className="section-title">A different perspective.</h2>
          <span className="eyebrow hidden text-ink/45 sm:block">Notes from our universe</span>
        </div>
        <div className="grid gap-9 md:grid-cols-3">
          {articles.map((article) => (
            <Link href={`/editorial/${article.slug}`} className="group" key={article.slug}>
              <div className="relative aspect-[1.1] overflow-hidden rounded bg-sand">
                <Image
                  src={`/images/${article.image}.jpg`}
                  alt={article.title}
                  fill
                  sizes="(max-width: 768px) 95vw, 33vw"
                  className={`${article.image === 'linen-shirt' ? 'object-contain mix-blend-multiply' : 'object-cover'} transition-transform duration-500 group-hover:scale-105`}
                />
              </div>
              <p className="eyebrow mb-3 mt-5 text-ink/45">{article.category}</p>
              <div className="flex items-center justify-between gap-4">
                <h3 className="text-2xl font-semibold tracking-tight">{article.title}</h3>
                <ArrowUpRight size={20} />
              </div>
              <p className="mt-3 text-sm leading-relaxed text-ink/60">{article.description}</p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
