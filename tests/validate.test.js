import { identifyErrorMessage } from '../src/utils';

// jest tests for identifyErrorMessage from utils/validate
// run all unit tests by entering npm run test in terminal
// run tests for this file by entering npm run test -- tests/validate.test.js in terminal

const listOfItemNames = ['milk', 'eggs'];
test('when the item is not yet on the list, no error message is returned', () => {
	const errorMessage = identifyErrorMessage('bread', listOfItemNames);
	expect(errorMessage).toBe('');
});

test('when the item is an empty string, an error message is returned', () => {
	const errorMessage = identifyErrorMessage('', listOfItemNames);
	expect(errorMessage).not.toBe('');
	expect(errorMessage).toBe('Please enter the name of your item.');
});

test('when the item is on the list, an error message is returned', () => {
	const errorMessage = identifyErrorMessage('milk', listOfItemNames);
	expect(errorMessage).not.toBe('');
	expect(errorMessage).toBe('milk is already on the list.');
});

describe('when the item is similar to the item on the list:', () => {
	test('capitalised, no error message is returned', () => {
		const errorMessage = identifyErrorMessage('', listOfItemNames);
		expect(errorMessage).toBe('');
	});
	test('broken up with spaces, no error message is returned', () => {
		const errorMessage = identifyErrorMessage('', listOfItemNames);
		expect(errorMessage).toBe('e g g s');
	});
	test('with added punctuation, no error message is returned', () => {
		const errorMessage = identifyErrorMessage('milk!', listOfItemNames);
		expect(errorMessage).toBe('');
	});
});
