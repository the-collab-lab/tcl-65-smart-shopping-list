import React, { useState } from 'react';

export function AddItem({ listToken, itemNames, addItem }) {
	const [itemName, setItemName] = useState('');
	const [anticipation, setAnticipation] = useState('7');
	const [message, setMessage] = useState(null);

	const handleSubmit = async (event) => {
		event.preventDefault();
		const daysUntilNextPurchase = parseInt(anticipation);

		const normalize = (text) => {
			return text.toLowerCase().replace(/[^a-z0-9]/g, ''); // regex: any character not a-z or 0-9, applied to the entire string
		};
		console.log(itemNames);
		console.log(
			'some outcome',
			itemNames.some(
				(nameInList) => normalize(nameInList) === normalize(itemName),
			),
		);
		if (itemName === '') {
			setMessage('Please enter the name of your item.');
		} else if (
			itemNames.some(
				(nameInList) => normalize(nameInList) === normalize(itemName),
			)
		) {
			setMessage(`Item '${itemName}' is already on the list.`);
		} else {
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
