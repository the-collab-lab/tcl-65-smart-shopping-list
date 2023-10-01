import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from 'react-router-dom';

import { AddItem, Home, Layout, List } from './views';

import { useShoppingListData } from './api';

import { useStateWithStorage } from './utils';

import { generateToken } from '@the-collab-lab/shopping-list-utils';

export function App() {
	/**
	 * This custom hook takes a token pointing to a shopping list
	 * in our database and syncs it with localStorage for later use.
	 * Check ./utils/hooks.js for its implementation.
	 *
	 * Use `setListToken` to allow a user to create and join a new list.
	 */
	const [listToken, setListToken] = useStateWithStorage(
		'tcl-shopping-list-token',
		null,
	);

	const handleNewToken = () => {
		// //if token is true do nothing
		// if (listToken) return;
		// //if token is false setlistToken calls the generateToken function and sets the result to state var of listToken
		setListToken(generateToken());
	};

	/**
	 * This custom hook takes our token and fetches the data for our list.
	 * Check ./api/firestore.js for its implementation.
	 */
	const data = useShoppingListData(listToken);

	return (
		<Router>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route
						index
						element={
							// listToken ? (
							// 	<Navigate to="/list" />
							// ) : (
							<Home
								listToken={listToken}
								setListToken={setListToken}
								handleNewToken={handleNewToken}
							/>
							// )
						}
					/>
					<Route
						path="/list"
						element={
							listToken ? (
								<List data={data} listToken={listToken} />
							) : (
								<Navigate replace to="/" />
							)
						}
					/>
					<Route
						path="/add-item"
						element={
							listToken ? (
								<AddItem listToken={listToken} data={data} />
							) : (
								<Navigate replace to="/" />
							)
						}
					/>
				</Route>
			</Routes>
		</Router>
	);
}
