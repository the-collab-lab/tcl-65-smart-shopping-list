import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
	/*apiKey: 'FILL_ME_IN',
	authDomain: 'FILL_ME_IN',
	databaseURL: 'FILL_ME_IN',
	projectId: 'FILL_ME_IN',
	storageBucket: 'FILL_ME_IN',
	messagingSenderId: 'FILL_ME_IN',
	appId: 'FILL_ME_IN',*/
	apiKey: 'AIzaSyD3enzTuQr4UgSBqdEtsM2ALxE9yTvgbB0',
	authDomain: 'tcl-65-smart-shopping-list.firebaseapp.com',
	projectId: 'tcl-65-smart-shopping-list',
	storageBucket: 'tcl-65-smart-shopping-list.appspot.com',
	messagingSenderId: '296109919082',
	appId: '1:296109919082:web:1f9f32faa4684f1224f313',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
