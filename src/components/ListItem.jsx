import './ListItem.css';
//import {updateItem} from '../api/firebase'

export function ListItem({
	name,
	itemId,
	dateLastPurchased,
	totalPurchases,
	updateItem,
}) {
	const itemPurchased = () => {
		const oneDayInMillis = 24 * 60 * 60 * 1000;
		if (dateLastPurchased) {
			return new Date() - new Date(dateLastPurchased) <= oneDayInMillis;
		}
		return false;
	};

	return (
		<li className="ListItem">
			<label>
				<input
					type="checkbox"
					//checked={oneDayInMillis(item.dateLastPurchased)}
					checked={itemPurchased()}
					onChange={() => updateItem(itemId, dateLastPurchased, totalPurchases)}
				/>
				{name}
			</label>
		</li>
	);
}
