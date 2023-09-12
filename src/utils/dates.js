const ONE_DAY_IN_MILLISECONDS = 86400000;

/**
 * Get a new JavaScript Date that is `offset` days in the future.
 * @example
 * // Returns a Date 3 days in the future
 * getFutureDate(3)
 * @param {number} offset
 */
export function getFutureDate(offset) {
	return new Date(Date.now() + offset * ONE_DAY_IN_MILLISECONDS);
}

export const getDaysBetweenDates = (startDateInSeconds) => {
	const startDateInMilliseconds = startDateInSeconds * 1000;
	const timeDifference = new Date() - new Date(startDateInMilliseconds);
	return Math.round(timeDifference / ONE_DAY_IN_MILLISECONDS);
};
