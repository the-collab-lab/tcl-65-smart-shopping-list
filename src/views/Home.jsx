import './Home.css';
import { Link } from 'react-router-dom';

export function Home({ listToken, handleNewToken }) {
	const handleSubmit = () => {};

	return (
		<div className="Home">
			<p>
				Hello from the home (<code>/</code>) page!
			</p>
			<Link to="/list">
				<button onClick={handleNewToken}>Create a New List</button>
			</Link>
			<form onSubmit={handleSubmit}>
				<label htmlFor="list-token">List Token</label>
				<input
					type="text"
					id="list-token"
					value={listToken}
					onChange={() => {}}
				/>

				<button type="submit">Submit</button>
			</form>
		</div>
	);
}
