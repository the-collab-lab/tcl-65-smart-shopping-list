import {
	addDoc,
	collection,
	onSnapshot,
	getCountFromServer,
	doc,
	updateDoc,
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
/*export async function updateItem()

	export async function updateItem(listId, itemId){
		const docRef = doc(db, listId, itemId);

		await updateDoc(docRef, {
			dateLastPurchased: new Date(),
			totalPurchases: increment(1)
	
	});*/
// export async function updateItem(
// 	listId,
// 	itemId,
// 	dateLastPurchased,
// 	totalPurchases,
// ) {
// 	const itemRef = doc(db, listId, itemId);
// 	await updateDoc(itemRef, {
// 		dateLastPurchased: new Date(),
// 		totalPurchases: totalPurchases + 1,
// 	});
// } ORIGINAL CODE

export async function updateItem(
	listId,
	itemId,
	dateLastPurchased,
	totalPurchases,
) {
	try {
		const itemRef = doc(db, listId, itemId);
		await updateDoc(itemRef, {
			dateLastPurchased: new Date(),
			totalPurchases: totalPurchases + 1,
		});
		console.log('Item successfully updated!'); // Success message (optional)
	} catch (error) {
		// Handle the error here
		console.error('Error updating item:', error);
		throw error; // Re-throwing the error if you want to handle it later
	}
}

export async function deleteItem() {
	/**
	 * TODO: Fill this out so that it uses the correct Firestore function
	 * to delete an existing item. You'll need to figure out what arguments
	 * this function must accept!
	 */
}
