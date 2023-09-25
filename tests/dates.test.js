import { getDaysBetweenDates } from '../src/utils';

// tests for getDaysBetweenDates from utils/dates
// run all unit tests by entering npm run test in terminal
// run tests for this file by entering npm run test -- tests/dates.test.js in terminal

const now = new Date();

test('returns zero when dates are the same', () => {
	const daysBetweenDates = getDaysBetweenDates(now, now);
	expect(daysBetweenDates).toBe(0);
});

test('returns 5 when dates are 5 days apart', () => {
	const earlier = new Date('August 19, 2023 23:15:30');
	const later = new Date('August 24, 2023 23:15:30');
	const daysBetweenDates = getDaysBetweenDates(earlier, later);
	expect(daysBetweenDates).toBe(5);
});
