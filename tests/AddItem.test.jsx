import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AddItem } from '../src/views/AddItem';

// tests written with react resting-library
// run tests with the command 'npm run test'
// run only tests in this file with 'npm run test -- tests/AddItem.test.jsx'
// run a single test by adding .only between it and its invocation:
// it.only('description', () = > callback)

const names = ['milk'];

const addItem = (listToken, itemName, daysUntilNextPurchase) => {
	console.log('item added');
};

test('renders without crashing, no message appears', () => {
	render(
		<AddItem
			listToken={'test test test'}
			itemNames={names}
			addItem={addItem}
		/>,
	);
	expect(screen.queryByTestId('message')).not.toBeInTheDocument();
});

test('accepts text input', async () => {
	render(
		<AddItem
			listToken={'test test test'}
			itemNames={names}
			addItem={addItem}
		/>,
	);
	const input = screen.getByLabelText('Item Name:');
	await userEvent.type(input, 'bread');
	await expect(input).toHaveValue('bread');
});

// this function simplifies submitting text input for the tests below.
const enterText = async (itemText) => {
	const user = userEvent.setup();
	render(
		<AddItem
			listToken={'test test test'}
			itemNames={names}
			addItem={addItem}
		/>,
	);
	const input = screen.getByLabelText('Item Name:');

	await userEvent.type(input, itemText);

	await user.click(screen.getByText('Submit'));
};

test('accepts a new item in the list', async () => {
	enterText('bread');

	await waitFor(
		() => {
			expect(screen.getByTestId('message')).toBeInTheDocument();
		},
		{ timeout: 5000 },
	);

	await expect(screen.getByTestId('message')).toHaveTextContent(
		"Item 'bread' was saved to the database.",
	);
});

test('rejects an item already in the list', async () => {
	enterText('milk');

	await waitFor(() => {
		expect(screen.getByTestId('message')).toBeInTheDocument();
	});

	expect(screen.getByTestId('message')).toHaveTextContent(
		"Item 'milk' is already on the list.",
	);
});

test('rejects a capitalized list item', async () => {
	enterText('Milk');

	await waitFor(() => {
		expect(screen.getByTestId('message')).toBeInTheDocument();
	});

	expect(screen.getByTestId('message')).toHaveTextContent(
		"Item 'milk' is already on the list.",
	);
});
