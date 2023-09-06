import './ListItem.css';
//import { isWithinLastDay } from '../utils/dates';
//import {updateItem} from '../api/firebase'

/*export function ListItem({ item, listId, handleDeleteConfirmation, urgency }) {
	const { itemId, name, dateLastPurchased, dateNextPurchased, totalPurchases } =
		item;

	const lastPurchasedDate = dateLastPurchased?.toDate().toDateString();
	const nextPurchasedDate = dateNextPurchased?.toDate().toDateString();

	const handlePurchase = async (e) => {
		if (e.target.checked) {
			await updateItem(listId, item);
		}
	};*/

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
					onChange={() => updateItem(itemId, dateLastPurchased, totalPurchases)}
				/>
				{name}
			</label>
		</li>
	);
}
