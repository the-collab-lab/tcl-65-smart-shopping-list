// @ts-check

import { test, expect } from '@playwright/test';

test('has heading', async ({ page }) => {
	await page.goto('/');

	const heading = await page.waitForSelector('text="Smart shopping list"');
	// fixing the lint error breaks the next line of code
	// eslint-disable-next-line playwright/prefer-web-first-assertions
	expect(await heading.isVisible()).toBe(true);
});

test('snapshot', async ({ page }) => {
	await page.goto('/');

	await expect(page).toHaveScreenshot('homepage.png');
});
