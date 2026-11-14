import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { articles } from '@/lib/editorial';

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  return { title: articles.find((a) => a.slug === slug)?.title ?? 'Story not found' };
}
export default async function Article({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  if (!article) notFound();
  return (
    <article className="site-width py-10 sm:py-16">
      <Link href="/editorial" className="text-link text-ink/55">
        <ArrowLeft size={14} /> All stories
      </Link>
      <div className="mx-auto max-w-3xl pt-12">
        <p className="eyebrow mb-5 text-ink/50">{article.category} / The ISHTILE journal</p>
        <h1 className="page-heading">{article.title}</h1>
        <p className="mt-6 text-lg text-ink/60">{article.description}</p>
        <div className="relative my-10 aspect-[1.6] overflow-hidden rounded bg-sand">
          <Image
            src={`/images/${article.image}.jpg`}
            alt={article.title}
            fill
            priority
            sizes="(max-width: 768px) 95vw, 768px"
            className={
              article.image === 'linen-shirt' ? 'object-contain mix-blend-multiply' : 'object-cover'
            }
          />
        </div>
        <div className="space-y-6 text-base leading-8 text-ink/70">
          {article.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <div className="mt-12 border-t border-ink/20 py-8">
          <Link href="/brands" className="text-link">
            Discover your next favourite label <ArrowUpRight size={17} />
          </Link>
        </div>
      </div>
    </article>
  );
}
