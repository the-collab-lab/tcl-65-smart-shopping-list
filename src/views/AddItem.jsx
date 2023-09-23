import React, { useEffect, useState } from 'react';
import { addItem } from '../api/firebase';
import { identifyErrorMessage } from '../utils';

export function AddItem({ listToken, data }) {
	const [itemName, setItemName] = useState('');
	const [anticipation, setAnticipation] = useState('7');
	const [message, setMessage] = useState(null);

	const handleSubmit = async (event) => {
		event.preventDefault();
		const daysUntilNextPurchase = parseInt(anticipation);

		const itemNames = data.map((item) => item.name);
		const errorMessage = identifyErrorMessage(itemName, itemNames);
		setMessage(errorMessage);

		if (!errorMessage) {
			try {
				await addItem(listToken, {
					itemName,
					daysUntilNextPurchase,
				});

				setMessage(`Item '${itemName}' was saved to the database.`);
				setItemName('');
				setAnticipation('7');
			} catch (error) {
				setMessage(`Error adding item`);
			}
		}
	};

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<label htmlFor="item-name">Item Name:</label>
				<input
					type="text"
					id="item-name"
					value={itemName}
					onChange={(event) => setItemName(event.target.value)}
				/>

				<label htmlFor="anticipation">How soon will you buy this again?</label>
				<select
					id="anticipation"
					value={anticipation}
					onChange={(event) => setAnticipation(event.target.value)}
				>
					<option value="7">Soon (7 days)</option>
					<option value="14">Kind of Soon (14 days)</option>
					<option value="30">Not Soon (30 days)</option>
				</select>

				<button type="submit">Submit</button>
			</form>

			{message && <p data-testid="message">{message}</p>}
		</div>
	);
}
