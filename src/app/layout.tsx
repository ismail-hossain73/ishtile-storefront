import type { Metadata } from 'next';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { StoreProvider } from '@/components/store-provider';
import './globals.css';

export const metadata: Metadata = {
  title: { default: 'ISHTILE+ — Discover Beyond Labels', template: '%s | ISHTILE+' },
  description:
    'Different brands. One universe. Discover a curated collection of contemporary fashion, everyday essentials, and independent labels at ISHTILE+.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body id="top">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-lime focus:p-4 focus:text-ink"
        >
          Skip to content
        </a>
        <StoreProvider>
          <Header />
          <main id="main">{children}</main>
          <Footer />
        </StoreProvider>
      </body>
    </html>
  );
}
