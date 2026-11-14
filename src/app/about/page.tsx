import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, Sparkle } from 'lucide-react';
import { ServiceStrip } from '@/components/footer';

export const metadata: Metadata = { title: 'About us' };
export default function About() {
  return (
    <>
      <section className="site-width grid items-center gap-10 py-14 md:grid-cols-2 md:gap-16 md:py-24">
        <div>
          <p className="eyebrow mb-5 text-ink/50">Fashion. Culture. More.</p>
          <h1 className="page-heading">
            More than
            <br />a label.
          </h1>
          <p className="mt-7 text-xl leading-snug tracking-tight">
            A place for independent minds.
            <br />
            And everything you want to be.
          </p>
          <p className="mt-6 max-w-md text-sm leading-7 text-ink/60">
            ISHTILE brings distinct fashion labels into one shared universe. From contemporary
            essentials to expressive streetwear and reimagined traditions, we believe great style
            isn’t about fitting in. It’s about finding yourself.
          </p>
          <p className="mt-4 max-w-md text-sm leading-7 text-ink/60">
            Discover a brand. Explore its story. Find a piece that feels like you. Then mix it up
            and make it your own.
          </p>
          <Link href="/brands" className="button-dark mt-8">
            Meet our brands <ArrowUpRight size={17} />
          </Link>
        </div>
        <div className="relative aspect-[.9] overflow-hidden rounded bg-ink">
          <Image
            src="/images/portrait.jpg"
            alt="Independent style, through the ISHTILE lens"
            fill
            priority
            className="object-cover"
            sizes="(max-width: 768px) 95vw, 45vw"
          />
          <Sparkle
            aria-hidden="true"
            className="absolute bottom-6 right-6 size-24 rotate-12 text-lime"
            strokeWidth={1}
          />
          <div className="absolute left-5 top-5 rotate-[-8deg] bg-lime px-4 py-2 text-xs font-bold">
            DISCOVER BEYOND LABELS.
          </div>
        </div>
      </section>
      <section className="bg-ink py-14 text-cream">
        <div className="site-width grid gap-10 sm:grid-cols-3">
          {[
            {
              number: '06',
              title: 'Independent labels',
              text: 'Each with a point of view. All worth discovering.',
            },
            {
              number: '01',
              title: 'Shared universe',
              text: 'One destination to explore, express, and belong.',
            },
            {
              number: '∞',
              title: 'Ways to be you',
              text: 'No single style. No fixed rules. Just possibility.',
            },
          ].map((item) => (
            <div key={item.title}>
              <p className="text-6xl font-semibold tracking-[-.07em] text-lime">{item.number}</p>
              <h2 className="mt-5 text-lg font-medium">{item.title}</h2>
              <p className="mt-2 text-sm text-cream/55">{item.text}</p>
            </div>
          ))}
        </div>
      </section>
      <ServiceStrip />
    </>
  );
}
