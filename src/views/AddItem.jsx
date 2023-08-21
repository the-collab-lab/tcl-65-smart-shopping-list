import React, { useEffect, useState } from 'react';
import { addItem } from '../api/firebase';

export function AddItem() {
	const [itemName, setItemName] = useState('');
	const [anticipation, setAnticipation] = useState('7');
	const [message, setMessage] = useState('');

	useEffect(() => {
		console.log(anticipation);
	}, [anticipation]);

	const handleSubmit = (event) => {
		event.preventDefault();

		// Here you can implement the logic to save the item to the database
		// You can use 'itemName' and 'anticipation' in this logic

		setMessage(`Item '${itemName}' was saved to the database.`);
	};

	return (
		<div>
			<p>
				Hello from the <code>/add-item</code> page!
			</p>
			<form onSubmit={handleSubmit}>
				<label htmlFor="item-name">Item Name:</label>
				<input
					type="text"
					id="item-name"
					value={itemName}
					onChange={(event) => setItemName(event.target.value)}
					required
				/>

				<label htmlFor="anticipation">Anticipation:</label>
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

			{message && <p>{message}</p>}
		</div>
	);
}
