import './ListItem.css';
import { updateItem } from '../api/firebase';
import { getDaysBetweenDates } from '../utils';
import { deleteItem, updateItem } from '../api/firebase';

export function ListItem({ item, listId }) {
	const { name, id, dateLastPurchased, totalPurchases } = item;
	// Function to check if the item was purchased within the last 24 hours
	const isPurchased = () => {
		const oneDayInMillis = 24 * 60 * 60 * 1000;

		// If dateLastPurchased exists, check if it was purchased within the last 24 hours
		if (dateLastPurchased) {
			return (
				new Date() - new Date(dateLastPurchased?.seconds * 1000) <=
				oneDayInMillis
			); // Converted dateLastPurchased to milliseconds for comparison
		}

		// Return false if dateLastPurchased does not exist
		return false;
	};

	function determineItemIndicator(item) {
		const now = new Date();
		if (
			item.dateLastPurchased &&
			getDaysBetweenDates(item.dateLastPurchased.toDate(), now) > 60
		) {
			return 'inactive';
		}
		const days = getDaysBetweenDates(now, item.dateNextPurchased.toDate());
		if (days < 0) {
			return 'overdue';
		} else if (days <= 7) {
			return 'soon';
		} else if (days > 7 && days <= 30) {
			return 'kind of soon';
		} else {
			return 'not soon';
		}
	}
	const indicatorClass = `indicator-${determineItemIndicator(item).replaceAll(
		' ',
		'-',
	)}`;
	const handleDelete = (e) => {
		e.preventDefault();
		if (window.confirm(`Do you really want to delete ${name}?`)) {
			deleteItem(listId, id);
		}
	};

	return (
		<li className="ListItem">
			<label>
				<input
					type="checkbox"
					checked={isPurchased()}
					onChange={() => updateItem(listId, item)}
				/>
				{name}
				<span className={indicatorClass}>{determineItemIndicator(item)}</span>
			</label>
			<button onClick={handleDelete}>Delete</button>
		</li>
	);
}
