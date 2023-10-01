import './Home.css';
// imported useNavigate
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { checkCount } from '../api/firebase';

export function Home({ listToken, setListToken, handleNewToken }) {
	const [inputToken, setInputToken] = useState('');
	const [tokenNotFoundMessage, setTokenNotFoundMessage] = useState('');
	const [showChangeCurrentList, setShowChangeCurrentList] = useState(false);
	const navigate = useNavigate();

	const handleSubmit = async (event) => {
		event.preventDefault();
		const count = await checkCount(inputToken);
		if (count === 0) {
			setTokenNotFoundMessage('List not found');
			setInputToken(''); // Clear the input field
		} else {
			setListToken(inputToken);
			navigate('/list'); // Use the `navigate` function to navigate to '/list'
		}
	};

	const displayListTokenComponent = (
		<div className="display-list-token">
			<p>
				Current list token: <strong>{listToken}</strong>
			</p>
			<button onClick={() => setShowChangeCurrentList(true)}>
				change current list
			</button>
		</div>
	);
	const changeCurrentListComponent = (
		<div className="switch-list">
			<Link to="/list">
				<button onClick={handleNewToken}>Create a New List</button>
			</Link>
			<form onSubmit={handleSubmit}>
				<label htmlFor="list-token">Enter Token</label>
				<input
					type="text"
					id="list-token"
					placeholder="Start typing here.."
					value={inputToken}
					onChange={(event) => setInputToken(event.target.value)}
					required
				/>
				<button type="submit">Join List</button>
			</form>
			{tokenNotFoundMessage && <p>{tokenNotFoundMessage}</p>}
		</div>
	);

	return (
		<div className="Home">
			<p>
				Hello from the home (<code>/</code>) page!
			</p>
			{listToken && displayListTokenComponent}
			{!listToken || (showChangeCurrentList && changeCurrentListComponent)}
		</div>
	);
}
//add show prior lists so User can choose what list they want to join or switch to
