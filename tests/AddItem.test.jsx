import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AddItem } from '../src/views/AddItem';

const now = Date.now();
const simpleData = [
	{
		name: 'milk',
	},
	{
		name: 'eggs',
	},
];

it('renders without crashing, no message appears', () => {
	render(<AddItem listToken={'test test test'} data={simpleData} />);
	expect(screen.queryByTestId('message')).not.toBeInTheDocument();
});

it('accepts a new item in the list', async () => {
	const user = userEvent.setup();
	render(<AddItem listToken={'test test test'} data={simpleData} />);
	user.click(screen.getByLabelText('Item Name:'));
	user.keyboard('bread');
	await user.click(screen.getByText('Submit'));
	await waitFor(screen.queryByTestId('message').toBeInTheDocument(), {
		timeout: 5000,
	});
	expect(screen.getByTestId('message')).toHaveTextContent(
		'Item bread was saved to the database.',
	);
});
