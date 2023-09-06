import './ListItem.css';
//import {updateItem} from '../api/firebase'

export function ListItem({
	name,
	itemId,
	listId, //added listId
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
					onChange={() =>
						updateItem(listId, itemId, dateLastPurchased, totalPurchases)
					} //added ListId
				/>
				{name}
			</label>
		</li>
	);
}
