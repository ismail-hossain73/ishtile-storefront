import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, Plus, Sparkle } from 'lucide-react';
import { brands, products } from '@/lib/catalog';
import { ProductCard } from '@/components/product-card';
import { BrandCard } from '@/components/brand-card';
import { ServiceStrip } from '@/components/footer';

export default function Home() {
  return (
    <>
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-art">
          <Image
            src="/images/hero.jpg"
            alt="Expressive streetwear portrait with colourful collage artwork"
            fill
            priority
            sizes="(max-width: 640px) 150vw, 75vw"
          />
        </div>
        <Sparkle className="hero-star" strokeWidth={1.2} aria-hidden="true" />
        <div className="site-width hero-content">
          <p className="eyebrow text-cream/60">Independent labels. Unlimited expression.</p>
          <h1 id="hero-title">
            MORE
            <br />
            FASHION.
            <br />
            <span className="text-lime">MORE YOU.</span>
          </h1>
          <Link
            href="/brands"
            className="mt-8 inline-flex items-center gap-7 border-b border-lime/70 pb-2 text-sm sm:mt-10 sm:text-base"
          >
            Discover beyond labels <ArrowUpRight size={20} className="text-lime" />
          </Link>
        </div>
        <div className="hero-bottom">
          <span className="h-px w-10 bg-lime" />
          <span>THE WORLD OF ISHTILE / 01</span>
        </div>
      </section>
      <nav className="campaign-track" aria-label="Shop collections">
        {[
          {
            image: 'spring',
            label: 'Spring collection — shop new arrivals',
            href: '/shop?sort=newest',
          },
          {
            image: 'summer',
            label: 'Summer essentials — shop T-shirts',
            href: '/shop?category=T-shirts',
          },
          { image: 'festive', label: 'Festive collection — explore ROOTS', href: '/brands/roots' },
          {
            image: 'monsoon',
            label: 'Monsoon collection — shop layers',
            href: '/shop?category=Layers',
          },
        ].map((campaign) => (
          <Link
            key={campaign.image}
            href={campaign.href}
            className="campaign-tile"
            aria-label={campaign.label}
          >
            <Image
              src={`/images/${campaign.image}.jpg`}
              alt={campaign.label}
              fill
              sizes="(max-width: 640px) 230px, 25vw"
            />
          </Link>
        ))}
      </nav>
      <section className="site-width pb-13 pt-8 sm:pb-18 sm:pt-12" aria-labelledby="featured-title">
        <div className="mb-7 flex items-end justify-between gap-4">
          <div>
            <p className="eyebrow mb-2 text-ink/50">Good pieces. Great possibilities.</p>
            <h2 id="featured-title" className="section-title">
              Featured products.
            </h2>
          </div>
          <Link href="/shop" className="text-link pb-1">
            View all <ArrowRight size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-7 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-6">
          {products.slice(0, 12).map((product, index) => (
            <div key={product.slug} className={index >= 6 ? 'hidden sm:block' : ''}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
        <Link href="/shop" className="button-dark mx-auto mt-8 flex w-fit sm:hidden">
          Explore all products <ArrowRight size={16} />
        </Link>
      </section>
      <div className="grid gap-3 px-3 md:grid-cols-[1.2fr_1fr]">
        <Link
          href="/editorial"
          className="editorial-banner min-h-55 rounded p-7 sm:min-h-64 sm:p-10"
        >
          <div className="relative z-10">
            <p className="eyebrow mb-4 text-cream/60">The ISHTILE journal</p>
            <h2 className="text-4xl font-semibold tracking-[-.06em]">Editorial.</h2>
            <p className="mt-2 max-w-45 text-sm leading-relaxed text-cream/75">
              Fashion, culture and
              <br />
              everything in between.
            </p>
            <span className="text-link mt-6 underline underline-offset-4">
              Explore the stories <ArrowUpRight size={16} />
            </span>
          </div>
          <Sparkle className="absolute right-8 top-7 size-17 rotate-12 text-lime" strokeWidth={1} />
        </Link>
        <Link
          href="/shop?category=T-shirts"
          className="relative flex min-h-55 items-center overflow-hidden rounded bg-lime p-7 sm:p-10"
        >
          <div className="relative z-10">
            <p className="eyebrow mb-4">Less effort. More expression.</p>
            <h2 className="text-4xl font-semibold leading-none tracking-[-.06em]">
              Everyday
              <br />
              essentials.
            </h2>
            <span className="text-link mt-6 underline underline-offset-4">
              Find your favourites <ArrowRight size={16} />
            </span>
          </div>
          <div className="absolute -right-10 bottom-0 top-0 w-3/5 rotate-[-9deg] mix-blend-multiply">
            <Image
              src="/images/essential-tee.jpg"
              alt="Black signature essential tee"
              fill
              className="object-contain"
              sizes="35vw"
            />
          </div>
          <Plus className="absolute right-5 top-5" size={22} strokeWidth={1} />
        </Link>
      </div>
      <section className="site-width py-14 sm:py-20" aria-labelledby="brands-title">
        <div className="mb-7 flex items-end justify-between gap-4">
          <div>
            <p className="eyebrow mb-2 text-ink/50">Different brands. One universe.</p>
            <h2 className="section-title" id="brands-title">
              Find your people.
            </h2>
            <p className="mt-3 text-sm text-ink/60">
              Independent minds. Distinct identities. All in one place.
            </p>
          </div>
          <Link href="/brands" className="text-link pb-1">
            All brands <ArrowRight size={16} />
          </Link>
        </div>
        <div className="grid auto-cols-[78%] grid-flow-col gap-4 overflow-x-auto pb-2 sm:auto-cols-auto sm:grid-flow-row sm:grid-cols-2 lg:grid-cols-4">
          {brands.slice(0, 4).map((brand, index) => (
            <BrandCard key={brand.slug} brand={brand} index={index} />
          ))}
        </div>
      </section>
      <ServiceStrip />
    </>
  );
}
