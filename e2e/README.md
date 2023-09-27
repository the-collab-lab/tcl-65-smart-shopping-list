# Testing

## End to End Testing and Snapshot Testing with Playwright

Playwright runs tests on emulated versions of different browsers and devices. In addition to end to end tests verifying app behavior, playwright does snapshot tests. These produce screenshots which can be used to identify unexpected ui changes.  
Playwright generates a report when tests are complete.

### Files and Folders

Playwright tests end with .spec.js.  
The e2e folder contains Playwright tests and folders with previous snapshots.  
Change the browsers being tested in playwright.config.js.

### Test Structure

- Playwright tests must be imported.
- Each test starts with a description, displayed while running tests, followed by a callback function which takes the page to be rendered as an argument.
- Many tests and actions in React Testing Library are asynchronous, allowing the component to render.
- Use expect() followed by an assertion to describe the expected outcomes. Write tests so they fail first, to rule out false positives.

```test('has heading', async ({ page }) => {
	await page.goto('/');

	const heading = await page.waitForSelector('text="Smart shopping list"');
	expect(await heading.isVisible()).toBe(true);
});
```

### Snapshot Testing

- Snapshot tests take screenshots and compare them as the project evolves, to identify unexpected changes.
- Snapshots are saved in a folder in e2e.

```
test('snapshot', async ({ page }) => {
	await page.goto('/');

	await expect(page).toHaveScreenshot('homepage.png');
});
```

### Executing tests

- Run all Playwright tests by entering `npm run e2e` in terminal
- Playwright runs tests on several browsers at once. Change which browsers are tested by commenting or un-commenting items under projects in playwright.config.js.
