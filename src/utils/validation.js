const normalize = (string) => {
	return string.toLowerCase().replace(/[^a-z0-9]/gi, '');
};

export function identifyErrorMessage(newItemName, allItemNames) {
	if (newItemName === '') {
		return 'Please enter the name of your item.';
	} else if (
		allItemNames.some(
			(itemName) => normalize(itemName) === normalize(newItemName),
		)
	) {
		return `${newItemName} is already on the list.`;
	}
	return '';
}
