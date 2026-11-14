import { expect, test } from '@playwright/test';

const brandCounts = { onen: 3, farak: 3, mocha: 3, pilgrim: 3, ishtile: 3, roots: 3 };

test('homepage renders without runtime errors or horizontal overflow', async ({
  page,
}, testInfo) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto('/');
  await expect(page.getByRole('heading', { name: /MORE FASHION. MORE YOU./ })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Featured products.' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Discover beyond labels' })).toHaveAttribute(
    'href',
    '/brands',
  );
  await page.evaluate(() => document.fonts.ready);
  await expect
    .poll(() => page.evaluate(() => localStorage.getItem('ishtile-store')))
    .not.toBeNull();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(
    true,
  );
  await page.screenshot({ path: testInfo.outputPath('homepage.png'), fullPage: true });
  expect(errors).toEqual([]);
});

test('brand directory filters and links to individual storefronts', async ({ page }) => {
  await page.goto('/brands');
  await expect(page.locator('main .brand-card')).toHaveCount(6);
  await page.getByRole('button', { name: 'Streetwear', exact: true }).click();
  await expect(page.locator('main .brand-card')).toHaveCount(1);
  await page.locator('main .brand-card').click();
  await expect(page).toHaveURL('/brands/farak');
  await expect(page.getByRole('heading', { name: 'FARAK', exact: true })).toBeVisible();
  await expect(page.locator('#collection article')).toHaveCount(3);
});

test('each brand displays only its own products', async ({ page }) => {
  for (const [slug, count] of Object.entries(brandCounts)) {
    await page.goto(`/brands/${slug}`);
    await expect(page.locator('#collection article')).toHaveCount(count);
    await expect(page.locator('#collection article a[href^="/brands/"]')).toHaveCount(count);
    for (const link of await page.locator('#collection article a[href^="/brands/"]').all()) {
      await expect(link).toHaveAttribute('href', `/brands/${slug}`);
    }
  }
});

test('shop filters, sorts, and resets an empty search', async ({ page }) => {
  await page.goto('/shop');
  await expect(page.locator('main article')).toHaveCount(18);
  await page.getByRole('button', { name: 'T-shirts', exact: true }).click();
  await expect(page.locator('main article')).toHaveCount(5);
  await page.getByLabel('Sort products').selectOption('price-low');
  await expect(page.locator('main article').first()).toContainText('৳ 1,490');
  await page.getByRole('button', { name: 'Filters', exact: true }).click();
  await page.getByPlaceholder('Search products or brands').fill('nothingmatches');
  await expect(page.getByRole('heading', { name: 'Nothing here. Yet.' })).toBeVisible();
  await page.getByRole('button', { name: 'Show all products' }).click();
  await expect(page.locator('main article')).toHaveCount(18);
});

test('wishlist is saved across reloads and can be removed', async ({ page }) => {
  await page.goto('/shop');
  await page
    .getByRole('button', { name: 'Save Signature Essential Tee to wishlist', exact: true })
    .click();
  await page.goto('/wishlist');
  await expect(page.locator('main article')).toHaveCount(1);
  await page.reload();
  await expect(page.locator('main article')).toHaveCount(1);
  await page.getByRole('button', { name: 'Remove Signature Essential Tee from wishlist' }).click();
  await expect(page.getByRole('heading', { name: 'Keep your favourites close.' })).toBeVisible();
});

test('bag validates size, updates quantity, persists and removes items', async ({ page }) => {
  await page.goto('/products/signature-essential-tee');
  await page.getByRole('button', { name: 'Add to bag' }).click();
  await expect(page.getByText('Please choose a size before adding to your bag.')).toBeVisible();
  await page.getByRole('button', { name: 'M', exact: true }).click();
  await page.getByRole('button', { name: 'Add to bag' }).click();
  const bag = page.getByRole('dialog');
  await expect(bag).toBeVisible();
  await expect(bag.getByText('৳ 2,490').last()).toBeVisible();
  await bag.getByRole('button', { name: 'Increase Signature Essential Tee quantity' }).click();
  await expect(bag.getByText('৳ 4,980').last()).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(bag).not.toBeVisible();
  await page.reload();
  await page.getByRole('button', { name: 'Open shopping bag, 2 items' }).click();
  await expect(bag.getByText('৳ 4,980').last()).toBeVisible();
  await bag.getByRole('button', { name: 'Remove Signature Essential Tee', exact: true }).click();
  await expect(bag.getByRole('heading', { name: 'Room for something good.' })).toBeVisible();
});

test('header product search works', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Search products', exact: true }).click();
  await page.getByLabel('Search products or brands', { exact: true }).fill('linen');
  await page.getByRole('button', { name: 'Search', exact: true }).click();
  await expect(page).toHaveURL('/shop?q=linen');
  await expect(page.locator('main article')).toHaveCount(2);
});

test('unknown brand and product show the custom 404 page', async ({ page }) => {
  for (const path of ['/brands/unknown-label', '/products/unknown-piece']) {
    const response = await page.goto(path);
    expect(response?.status()).toBe(404);
    await expect(page.getByRole('heading', { name: /Not here./ })).toBeVisible();
  }
});
