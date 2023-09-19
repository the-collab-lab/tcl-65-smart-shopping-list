import {
	addDoc,
	collection,
	onSnapshot,
	getCountFromServer,
	doc,
	updateDoc,
	deleteDoc,
	//increment,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from './config';
import { getFutureDate } from '../utils';

/**
 * A custom hook that subscribes to a shopping list in our Firestore database
 * and returns new data whenever the list changes.
 * @param {string | null} listId
 * @see https://firebase.google.com/docs/firestore/query-data/listen
 */
export function useShoppingListData(listId) {
	// Start with an empty array for our data.
	/** @type {import('firebase/firestore').DocumentData[]} */
	const initialState = [];
	const [data, setData] = useState(initialState);

	useEffect(() => {
		if (!listId) return;

		// When we get a listId, we use it to subscribe to real-time updates
		// from Firestore.
		return onSnapshot(collection(db, listId), (snapshot) => {
			// The snapshot is a real-time update. We iterate over the documents in it
			// to get the data.
			const nextData = snapshot.docs.map((docSnapshot) => {
				// Extract the document's data from the snapshot.
				const item = docSnapshot.data();

				// The document's id is not in the data,
				// but it is very useful, so we add it to the data ourselves.
				item.id = docSnapshot.id;

				return item;
			});

			// Update our React state with the new data.
			setData(nextData);
		});
	}, [listId]);

	// Return the data so it can be used by our React components.
	return data;
}

export async function checkCount(listId) {
	try {
		const listCollectionRef = collection(db, listId);
		const snapshot = await getCountFromServer(listCollectionRef);
		return snapshot.data().count;
	} catch (error) {
		console.error('Error', error);
		throw error; // Re-throw the error to propagate it to the caller if needed
	}
}

/**
 * Add a new item to the user's list in Firestore.
 * @param {string} listId The id of the list we're adding to.
 * @param {Object} itemData Information about the new item.
 * @param {string} itemData.itemName The name of the item.
 * @param {number} itemData.daysUntilNextPurchase The number of days until the user thinks they'll need to buy the item again.
 */

export async function addItem(listId, { itemName, daysUntilNextPurchase }) {
	try {
		const listCollectionRef = collection(db, listId);

		const newItemDocRef = await addDoc(listCollectionRef, {
			dateCreated: new Date(),
			dateLastPurchased: null,
			dateNextPurchased: getFutureDate(daysUntilNextPurchase),
			name: itemName,
			totalPurchases: 0,
		});

		return newItemDocRef;
	} catch (error) {
		console.error('Error adding item:', error);
		throw error; // Re-throw the error to propagate it to the caller if needed
	}
}

export async function updateItem(listId, id, totalPurchases) {
	try {
		const itemRef = doc(db, listId, id);
		await updateDoc(itemRef, {
			dateLastPurchased: new Date(),
			totalPurchases: totalPurchases + 1,
		});
	} catch (error) {
		// Handle the error here
		console.error('Error updating item:', error);
	}
}

export async function deleteItem(listToken, itemId) {
	await deleteDoc(doc(db, listToken, itemId));
}
