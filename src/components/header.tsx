'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Heart, Menu, Search, ShoppingBag, X, ArrowUpRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useStore } from './store-provider';

const links = [
  { href: '/shop', label: 'Shop' },
  { href: '/brands', label: 'Brands' },
  { href: '/editorial', label: 'Editorial' },
  { href: '/about', label: 'About' },
];
export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const home = pathname === '/';
  const { cart, setCartOpen, wishlist } = useStore();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
  }, [pathname]);
  return (
    <header className={`site-header ${home ? 'header-dark' : ''}`}>
      <div className="site-width flex h-20 items-center justify-between gap-4 max-sm:h-17">
        <Link href="/" aria-label="ISHTILE home" className="shrink-0">
          <Image
            src="/images/wordmark.png"
            width={164}
            height={37}
            className={`w-35 sm:w-41 ${home ? 'brightness-0 invert' : ''}`}
            alt="ISHTILE — Discover beyond labels"
            priority
          />
        </Link>
        <nav aria-label="Main navigation" className="hidden items-center gap-9 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`nav-link ${pathname.startsWith(link.href) ? 'active' : ''}`}
            >
              {link.label}
              {link.href === '/brands' && <span className="ml-1.5 text-[9px] opacity-50">06</span>}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-1 sm:gap-3">
          <button
            className="icon-button"
            aria-label={searchOpen ? 'Close search' : 'Search products'}
            aria-expanded={searchOpen}
            onClick={() => setSearchOpen(!searchOpen)}
          >
            {searchOpen ? <X size={21} /> : <Search size={21} strokeWidth={1.6} />}
          </button>
          <Link
            href="/wishlist"
            aria-label={`Wishlist, ${wishlist.length} items`}
            className="icon-button hidden sm:flex"
          >
            <Heart size={21} strokeWidth={1.6} />
            {wishlist.length > 0 && <span className="count-dot">{wishlist.length}</span>}
          </Link>
          <button
            className="icon-button"
            onClick={() => setCartOpen(true)}
            aria-label={`Open shopping bag, ${count} items`}
          >
            <ShoppingBag size={21} strokeWidth={1.6} />
            {count > 0 && <span className="count-dot">{count}</span>}
          </button>
          <button
            className="icon-button md:hidden"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={23} /> : <Menu size={23} />}
          </button>
        </div>
      </div>
      {searchOpen && (
        <form
          action="/shop"
          className="site-width pb-5"
          onSubmit={(event) => {
            event.preventDefault();
            const query = String(new FormData(event.currentTarget).get('q') ?? '').trim();
            router.push(`/shop?q=${encodeURIComponent(query)}`);
            setSearchOpen(false);
          }}
        >
          <label htmlFor="header-search" className="sr-only">
            Search products or brands
          </label>
          <div className="flex items-center gap-3 border-b border-current/30 py-3">
            <Search size={18} />
            <input
              autoFocus
              id="header-search"
              name="q"
              placeholder="Search products, brands, a new favourite…"
              className="w-full bg-transparent text-sm outline-none placeholder:text-current/50"
              required
            />
            <button type="submit" className="text-sm underline underline-offset-4">
              Search
            </button>
          </div>
        </form>
      )}
      {menuOpen && (
        <nav id="mobile-menu" aria-label="Mobile navigation" className="mobile-menu">
          <div className="site-width py-5">
            {[...links, { href: '/wishlist', label: 'Wishlist' }].map((link) => (
              <Link
                onClick={() => setMenuOpen(false)}
                href={link.href}
                key={link.href}
                className="flex items-center justify-between border-b border-current/15 py-5 text-2xl font-medium"
              >
                {link.label}
                <ArrowUpRight size={22} />
              </Link>
            ))}
            <p className="eyebrow py-7 opacity-50">Different brands. One universe.</p>
          </div>
        </nav>
      )}
    </header>
  );
}
