import './Home.css';
import { Link } from 'react-router-dom';

export function Home({ handleNewToken }) {
	return (
		<div className="Home">
			<p>
				Hello from the home (<code>/</code>) page!
			</p>
			<Link to="/list">
				<button onClick={handleNewToken}>Create a New List</button>
			</Link>
		</div>
	);
}
