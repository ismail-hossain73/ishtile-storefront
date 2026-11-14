# ISHTILE+ storefront

A frontend-first, multi-brand fashion marketplace built with **Next.js 16 App Router**, **React 19**, **TypeScript**, and **Tailwind CSS 4**.

## Run

```bash
npm install
npm run dev
```

Open http://localhost:3000. Node.js 20.9 or newer is required.

```bash
npm run build       # production build
npm start           # serve the production build
npm run typecheck   # TypeScript check
npm run test:e2e    # desktop + mobile Chromium tests
```

Before the first browser-test run, install Chromium with `npx playwright install chromium`. Tests start a development server on port 3100 automatically.

## Included

- Responsive homepage following the desktop/mobile references in `design/`.
- Searchable, category-filtered brand directory at `/brands`.
- Dedicated brand storefronts at `/brands/[slug]`, showing only that brand’s products.
- Shop search, category/brand/price filters, and sorting.
- Product detail pages with size selection, size guide, and related products.
- Wishlist and shopping-bag drawer, persisted locally in the current browser.
- About, editorial index, individual stories, and a custom 404 page.
- Keyboard-accessible controls, native modal focus handling, reduced-motion support.

## Design and assets

Cream/black/acid-lime palette, large italic hero typography, texture, collage imagery, and the ISHTILE wordmark are based on the supplied references. Images in `public/images/` were extracted from those references for this prototype, so some product images are low resolution. Replace them with original product photography before launch. The seasonal tiles reuse the supplied campaign artwork.

The typography guide specifies **Suisse Int’l**. Licensed font files were not included; the current fallback is Arial/Helvetica. Add licensed WOFF2 files and load them with `next/font/local` when available. No external image or font services are required to run the app.

## Data and backend boundary

`src/lib/catalog.ts` contains **illustrative** brands, products, prices (BDT), and descriptions. `src/lib/editorial.ts` contains sample editorial copy. Replace these with an API/database in a later phase. Product images are reused across some sample brand listings.

There is **no backend, authentication, real inventory, checkout, payment processing, or email subscription service**. The bag and wishlist are local-browser previews, not real orders. The newsletter form explicitly indicates that no email is submitted or stored. Product measurements and shipping details are placeholders, not final brand policies.

Useful integration points:

- `src/lib/catalog.ts`: brand/product data types and sample records.
- `src/components/store-provider.tsx`: cart and wishlist state, local persistence.
- `src/components/catalog.tsx`: search/filter/sort UI.
- `src/app/brands/[slug]/page.tsx`: individual brand storefronts.
- `src/app/products/[slug]/page.tsx`: product detail route.
