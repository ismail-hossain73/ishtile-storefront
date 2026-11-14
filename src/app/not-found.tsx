import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="site-width flex min-h-[65vh] flex-col items-start justify-center py-20">
      <p className="eyebrow mb-5 text-ink/50">404 / A little off the beaten path</p>
      <h1 className="page-heading">
        Not here.
        <br />
        But there’s more.
      </h1>
      <p className="mt-6 max-w-sm text-sm leading-relaxed text-ink/60">
        That page may have moved, or this label hasn’t joined our universe yet. Let’s find you
        something good.
      </p>
      <Link href="/brands" className="button-dark mt-7">
        Explore our brands <ArrowRight size={16} />
      </Link>
    </div>
  );
}
