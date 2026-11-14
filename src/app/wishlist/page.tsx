import type { Metadata } from 'next';
import { Wishlist } from '@/components/wishlist';

export const metadata: Metadata = { title: 'Your wishlist' };
export default function WishlistPage() {
  return (
    <div className="site-width min-h-[65vh] py-14 sm:py-18">
      <p className="eyebrow mb-4 text-ink/50">A little collection of you.</p>
      <h1 className="page-heading mb-10">Your wishlist.</h1>
      <Wishlist />
    </div>
  );
}
