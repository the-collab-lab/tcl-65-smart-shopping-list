/* eslint-disable testing-library/prefer-screen-queries */
// @ts-check
// const { test, expect } = require('@playwright/test');
import { test, expect } from '@playwright/test';

// not sure how to either connect to firebase or spoof a firebase connection
test.skip('can add a unique item', async ({ page }) => {
	await page.goto('/');
	await page.getByLabel('List Token').fill('test test test');
	await page.getByText('Submit').dispatchEvent('click');

	// await page.evaluate(token => localStorage.setItem('Identity.States.token', token), {'tcl-shopping-list-token': 'test test test'})
	await page.goto('/add-item');

	// identify input
	await page.getByLabel('Item Name').fill('milk');
	await page.getByRole('button').dispatchEvent('click');
	await expect(
		page.getByText("Item 'milk' was saved to the database."),
	).toBeVisible();

	// Item 'feathers' was saved to the database.

	// milk is already on the list.

	// press submit
	// expect success message

	// const heading = await page.waitForSelector('text="Smart shopping list"')
	// fixing the lint error breaks the next line
	// expect(await heading.is_visible()).toBe(true)
});

// test('snapshot', async ({ page }) => {
//   await page.goto('/');

//   await expect(page).toHaveScreenshot('homepage.png')
// });
