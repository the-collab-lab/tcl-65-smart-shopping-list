# Testing

## End to End Testing and Snapshot Testing with Playwright

### Files and Folders

Playwright tests end with .spec.js.  
The e2e folder contains Playwright tests and folders with previous snapshots.  
Change the browsers being tested in playwright.config.js.

### Snapshots

The folder e2e/example.spec.js-snapshots contains the snapshots created by running the following test in example.spec.js:

```
test('snapshot', async ({ page }) => {
	await page.goto('/');

	await expect(page).toHaveScreenshot('homepage.png');
});
```

### Test Structure

- To test components, the component and any resources from React Testing Library must be imported.
- Unit tests only require importing the function being tested.
- Each test starts with a description, displayed while running tests, followed by a callback function.
- Many tests and actions in React Testing Library are asynchronous, allowing the component to render.
- Use expect() followed by an assertion to describe the expected outcomes. Write tests so they fail first, to rule out false positives.

#### With React Testing Library

```
import { ComponentToTest } from '../folder/file'

test('unique description', async () => {
	render(<component prop={'prop'}/>);
	const propText = (screen.getByText('prop'));
  expect(propText).toBeVisible()
})
```

#### Without React Testing Library

```
import { functionToTest } from '../folder/file'

test('unique description', () => {
	const value = functionToTest()
	expect(value).toBe(expectedOutcome)
});
```

### Executing tests

- run all Vitest tests by entering `npm run test` in terminal
- run tests for a specific file by entering `npm run test -- tests/filename.test.js` or `.jsx` in terminal
- run one test by adding .only to the test like so:

```
test.only('unique description', () => {
	// test
});
```
