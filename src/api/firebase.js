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
import {
	ONE_DAY_IN_MILLISECONDS,
	getDaysBetweenDates,
	getFutureDate,
} from '../utils';
import { calculateEstimate } from '@the-collab-lab/shopping-list-utils';

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
	// return data;
	return data.sort(comparePurchaseUrgency);
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
			estimatedDaysUntilNextPurchase: daysUntilNextPurchase,
		});

		return newItemDocRef;
	} catch (error) {
		console.error('Error adding item:', error);
		throw error; // Re-throw the error to propagate it to the caller if needed
	}
}

export async function updateItem(listId, item) {
	//the following clause insists that w/in the first 2 purchases, the calculateEstimate() returns what the user input in the add-item form. Remove this if we choose to use calculateEstimate() as is. Which returns daysSinceLastPurchase w/in the first 2 purchases-- which caused a 0 estimatedDaysUntilNextPurchase issue during testing.

	let daysSinceLastPurchase;
	if (item.totalPurchases < 2) {
		daysSinceLastPurchase = item.estimatedDaysUntilNextPurchase;
	} else {
		daysSinceLastPurchase = getDaysBetweenDates(
			new Date(item.dateLastPurchased?.seconds * 1000), // Convert from seconds to milliseconds and then to a Date
			new Date(),
		);
	}

	const estimatedDaysUntilNextPurchase =
		calculateEstimate(
			item.estimatedDaysUntilNextPurchase,
			daysSinceLastPurchase,
			item.totalPurchases,
		) * ONE_DAY_IN_MILLISECONDS; // Convert to Milliseconds;

	const currentDateInMs = new Date().getTime();
	const nextPurchaseDateInMs = estimatedDaysUntilNextPurchase + currentDateInMs;
	try {
		const itemRef = doc(db, listId, item.id);
		await updateDoc(itemRef, {
			dateLastPurchased: new Date(),
			totalPurchases: item.totalPurchases + 1,
			dateNextPurchased: new Date(nextPurchaseDateInMs),
		});
	} catch (error) {
		console.error('Error updating item:', error);
	}
}

export async function deleteItem(listToken, itemId) {
	try {
		await deleteDoc(doc(db, listToken, itemId));
	} catch (error) {
		console.log('Error deleting item:', error);
	}
}

export function comparePurchaseUrgency(a, b) {
	// return positive number if a > b
	const now = new Date();

	// rule out inactive items
	const isItemAInactive = a.dateLastPurchased
		? getDaysBetweenDates(a.dateLastPurchased.toDate(), now) > 60
		: false;
	const isItemBInactive = b.dateLastPurchased
		? getDaysBetweenDates(b.dateLastPurchased.toDate(), now) > 60
		: false;

	if (isItemAInactive && !isItemBInactive) return 1;
	if (!isItemAInactive && isItemBInactive) return -1;

	// compare dateNextPurchased
	const daysUntilNextPurchaseA = getDaysBetweenDates(
		now,
		a.dateNextPurchased.toDate(),
	);
	const daysUntilNextPurchaseB = getDaysBetweenDates(
		now,
		b.dateNextPurchased.toDate(),
	);

	const difference = daysUntilNextPurchaseA - daysUntilNextPurchaseB;

	//compare alphabetically
	if (difference === 0) {
		if (a.name < b.name) {
			return -1;
		}
		if (a.name > b.name) {
			return 1;
		}
	}
	return difference;
}
