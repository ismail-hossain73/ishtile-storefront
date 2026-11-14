'use client';

import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  ArrowUp,
  Instagram,
  Sparkle,
  Truck,
  ShieldCheck,
  RefreshCcw,
  Plus,
} from 'lucide-react';
import { useState } from 'react';
import { brands } from '@/lib/catalog';

const linkGroups = [
  {
    title: 'Explore',
    links: [
      { href: '/shop', label: 'All products' },
      { href: '/shop?sort=newest', label: 'New arrivals' },
      { href: '/brands', label: 'Our brands' },
      { href: '/editorial', label: 'Editorial' },
      { href: '/about', label: 'About ISHTILE' },
    ],
  },
  {
    title: 'Our brands',
    links: [
      ...brands.slice(0, 4).map((brand) => ({ href: `/brands/${brand.slug}`, label: brand.name })),
      { href: '/brands', label: 'All brands →' },
    ],
  },
];

export function ServiceStrip() {
  return (
    <div className="border-y border-ink/15">
      <div className="site-width grid grid-cols-2 gap-y-6 py-7 md:grid-cols-4">
        {[
          { icon: Sparkle, title: 'Considered quality', text: 'Good pieces. Great feeling.' },
          { icon: Truck, title: 'Across Bangladesh', text: 'Your favourites, to your door.' },
          { icon: RefreshCcw, title: 'Easy returns', text: 'Find your perfect fit.' },
          { icon: ShieldCheck, title: 'Shop with confidence', text: 'Curated brands. Real style.' },
        ].map(({ icon: Icon, title, text }) => (
          <div
            key={title}
            className="flex items-center justify-center gap-3 px-2 md:border-r md:border-ink/20 md:last:border-0"
          >
            <Icon size={25} strokeWidth={1.2} className="shrink-0" />
            <div>
              <p className="text-xs font-medium sm:text-sm">{title}</p>
              <p className="mt-1 hidden text-[11px] text-ink/55 sm:block">{text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Footer() {
  const [subscribed, setSubscribed] = useState(false);
  return (
    <footer className="site-footer text-cream">
      <div className="site-width relative z-10 pt-40 sm:pt-56">
        <div className="grid gap-8 pb-12 md:grid-cols-[1.3fr_.75fr_.75fr_1.5fr] md:gap-10 lg:gap-16">
          <div>
            <Link href="/" aria-label="ISHTILE home">
              <Image
                src="/images/wordmark.png"
                width={210}
                height={47}
                alt="ISHTILE"
                className="w-48 brightness-0 invert"
              />
            </Link>
            <p className="mt-5 max-w-52 text-sm leading-relaxed text-cream/70">
              Fashion, culture and beyond.
              <br />
              Explore. Discover. Belong.
            </p>
            <div className="mt-7 flex items-center gap-4">
              <Instagram size={18} aria-hidden="true" />
              <span className="eyebrow text-cream/50">@ishtile.official</span>
            </div>
          </div>
          {linkGroups.map((group) => (
            <div key={group.title} className="hidden md:block">
              <h2 className="mb-5 text-sm font-semibold">
                {group.title} <span className="text-lime">↗</span>
              </h2>
              <div className="flex flex-col items-start gap-3 text-sm text-cream/65">
                {group.links.map((link) => (
                  <Link href={link.href} key={link.href}>
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
          <div className="md:hidden">
            {linkGroups.map((group) => (
              <details key={group.title} className="group border-b border-cream/25">
                <summary className="flex cursor-pointer list-none items-center justify-between py-4 text-sm [&::-webkit-details-marker]:hidden">
                  {group.title}
                  <Plus
                    size={18}
                    strokeWidth={1.2}
                    className="transition-transform group-open:rotate-45"
                  />
                </summary>
                <div className="flex flex-col items-start gap-4 pb-5 text-sm text-cream/65">
                  {group.links.map((link) => (
                    <Link href={link.href} key={link.href}>
                      {link.label}
                    </Link>
                  ))}
                </div>
              </details>
            ))}
          </div>
          <div>
            <h2 className="text-lg font-semibold tracking-tight">
              Join the ISHTILE+ community <span className="text-lime">↗</span>
            </h2>
            <p className="mt-3 max-w-72 text-sm leading-relaxed text-cream/65">
              A little inspiration. A first look at what’s next.
              <br />
              Get on the list.
            </p>
            <form
              className="mt-6"
              onSubmit={(event) => {
                event.preventDefault();
                setSubscribed(true);
              }}
            >
              <label htmlFor="newsletter" className="sr-only">
                Your email address
              </label>
              <div className="flex items-center rounded-full border border-cream/40 p-1">
                <input
                  id="newsletter"
                  type="email"
                  required
                  placeholder="Your email address"
                  disabled={subscribed}
                  className="min-w-0 flex-1 bg-transparent px-4 py-2 text-sm outline-none placeholder:text-cream/60"
                />
                <button
                  type="submit"
                  disabled={subscribed}
                  aria-label="Join community interest list"
                  className="flex size-10 shrink-0 items-center justify-center rounded-full bg-lime text-ink"
                >
                  <ArrowRight size={20} />
                </button>
              </div>
              <p aria-live="polite" className="mt-3 text-xs text-cream/60">
                {subscribed
                  ? 'Thanks for your interest! Email signup is a preview—nothing has been submitted.'
                  : 'Preview only. Email signup is not connected yet.'}
              </p>
            </form>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-5 border-t border-cream/25 py-7 text-[11px] text-cream/60">
          <p>© {new Date().getFullYear()} ISHTILE+. All rights reserved.</p>
          <p>Discover beyond labels.</p>
          <a href="#top" className="flex items-center gap-2">
            Back to top <ArrowUp size={14} />
          </a>
        </div>
      </div>
      <div className="footer-wordmark" aria-hidden="true" />
    </footer>
  );
}
