'use client';

import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react';
import { brandName, money, products, sizes } from '@/lib/catalog';

type CartItem = { slug: string; size: string; quantity: number };
type Store = {
  cart: CartItem[];
  wishlist: string[];
  toggleWishlist: (slug: string) => void;
  addToCart: (slug: string, size: string) => void;
  setCartOpen: (open: boolean) => void;
};
const StoreContext = createContext<Store | null>(null);
export function useStore() {
  const context = useContext(StoreContext);
  if (!context) throw new Error('Store components must be inside StoreProvider');
  return context;
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [ready, setReady] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    try {
      const saved: unknown = JSON.parse(localStorage.getItem('ishtile-store') || '{}');
      if (saved && typeof saved === 'object') {
        const data = saved as { cart?: unknown; wishlist?: unknown };
        if (Array.isArray(data.cart))
          setCart(
            data.cart.filter(
              (item): item is CartItem =>
                item &&
                typeof item === 'object' &&
                products.some((p) => p.slug === item.slug) &&
                sizes.includes(item.size) &&
                Number.isInteger(item.quantity) &&
                item.quantity > 0 &&
                item.quantity <= 10,
            ),
          );
        if (Array.isArray(data.wishlist))
          setWishlist(
            data.wishlist.filter(
              (slug): slug is string =>
                typeof slug === 'string' && products.some((p) => p.slug === slug),
            ),
          );
      }
    } catch {
      /* A private browser or older saved data should not block shopping. */
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) {
      try {
        localStorage.setItem('ishtile-store', JSON.stringify({ cart, wishlist }));
      } catch {
        /* Storage may be unavailable. */
      }
    }
  }, [cart, wishlist, ready]);

  useEffect(() => {
    if (cartOpen) {
      dialog.current?.showModal();
      document.body.style.overflow = 'hidden';
    } else {
      dialog.current?.close();
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [cartOpen]);

  function addToCart(slug: string, size: string) {
    setCart((items) => {
      const found = items.some((item) => item.slug === slug && item.size === size);
      return found
        ? items.map((item) =>
            item.slug === slug && item.size === size
              ? { ...item, quantity: Math.min(10, item.quantity + 1) }
              : item,
          )
        : [...items, { slug, size, quantity: 1 }];
    });
    setCartOpen(true);
  }
  function changeQuantity(slug: string, size: string, delta: number) {
    setCart((items) =>
      items
        .map((item) =>
          item.slug === slug && item.size === size
            ? { ...item, quantity: Math.min(10, item.quantity + delta) }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  }
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  const total = cart.reduce(
    (sum, item) => sum + (products.find((p) => p.slug === item.slug)?.price ?? 0) * item.quantity,
    0,
  );

  return (
    <StoreContext.Provider
      value={{
        cart,
        wishlist,
        addToCart,
        setCartOpen,
        toggleWishlist: (slug) =>
          setWishlist((items) =>
            items.includes(slug) ? items.filter((item) => item !== slug) : [...items, slug],
          ),
      }}
    >
      {children}
      <dialog
        ref={dialog}
        className="cart-dialog"
        onClose={() => setCartOpen(false)}
        onClick={(event) => {
          if (event.target === event.currentTarget) setCartOpen(false);
        }}
        aria-labelledby="cart-title"
      >
        <div className="cart-panel">
          <div className="flex items-center justify-between border-b border-ink/15 pb-5">
            <h2 id="cart-title" className="text-2xl font-semibold tracking-tight">
              Your bag <span className="text-ink/45">({count})</span>
            </h2>
            <button
              className="icon-button"
              onClick={() => setCartOpen(false)}
              aria-label="Close bag"
            >
              <X size={23} />
            </button>
          </div>
          {cart.length === 0 ? (
            <div className="flex flex-1 flex-col items-center justify-center gap-5 py-20 text-center">
              <ShoppingBag size={46} strokeWidth={1} />
              <h3 className="text-2xl font-semibold">Room for something good.</h3>
              <p className="text-sm text-ink/60">Your next favourite is waiting to be found.</p>
              <Link href="/shop" onClick={() => setCartOpen(false)} className="button-dark">
                Explore the collection <ArrowRight size={17} />
              </Link>
            </div>
          ) : (
            <>
              <div className="flex-1 space-y-6 overflow-y-auto py-7">
                {cart.map((item) => {
                  const product = products.find((p) => p.slug === item.slug)!;
                  return (
                    <div key={`${item.slug}-${item.size}`} className="flex gap-4">
                      <Link
                        href={`/products/${product.slug}`}
                        onClick={() => setCartOpen(false)}
                        className="relative h-28 w-25 shrink-0 overflow-hidden rounded bg-sand"
                      >
                        <Image
                          src={`/images/${product.image}.jpg`}
                          alt={product.name}
                          fill
                          className="object-contain"
                          sizes="100px"
                        />
                      </Link>
                      <div className="flex flex-1 flex-col items-start">
                        <span className="eyebrow text-ink/50">{brandName(product.brand)}</span>
                        <Link
                          href={`/products/${product.slug}`}
                          onClick={() => setCartOpen(false)}
                          className="mt-1 text-sm font-semibold"
                        >
                          {product.name}
                        </Link>
                        <p className="mt-1 text-xs text-ink/60">
                          {product.color} / {item.size}
                        </p>
                        <div className="mt-auto flex w-full items-center justify-between pt-3">
                          <div className="flex items-center gap-3 border border-ink/20">
                            <button
                              className="p-1.5"
                              aria-label={`Decrease ${product.name} quantity`}
                              onClick={() => changeQuantity(item.slug, item.size, -1)}
                            >
                              <Minus size={13} />
                            </button>
                            <span className="text-xs">{item.quantity}</span>
                            <button
                              className="p-1.5 disabled:opacity-30"
                              disabled={item.quantity >= 10}
                              aria-label={`Increase ${product.name} quantity`}
                              onClick={() => changeQuantity(item.slug, item.size, 1)}
                            >
                              <Plus size={13} />
                            </button>
                          </div>
                          <span className="text-sm font-medium">
                            {money(product.price * item.quantity)}
                          </span>
                        </div>
                      </div>
                      <button
                        className="self-start p-1 text-ink/50"
                        aria-label={`Remove ${product.name}`}
                        onClick={() =>
                          setCart((items) =>
                            items.filter((i) => !(i.slug === item.slug && i.size === item.size)),
                          )
                        }
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  );
                })}
              </div>
              <div className="border-t border-ink/15 pt-5">
                <div className="mb-4 flex justify-between text-lg font-semibold">
                  <span>Subtotal</span>
                  <span>{money(total)}</span>
                </div>
                <p className="mb-5 rounded bg-ink/5 p-3 text-xs leading-relaxed text-ink/60">
                  This is a preview shopping bag. Checkout, payments, and delivery will be available
                  when the backend is connected.
                </p>
                <button className="button-dark w-full" onClick={() => setCartOpen(false)}>
                  Keep exploring <ArrowRight size={17} />
                </button>
              </div>
            </>
          )}
        </div>
      </dialog>
    </StoreContext.Provider>
  );
}
