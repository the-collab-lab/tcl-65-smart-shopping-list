import './Home.css';
//import { generateToken } from '@the-collab-lab/shopping-list-utils';
import { Link } from 'react-router-dom';

/*export function Home({ setListToken }) {
	const generateListToken = () => {
		setListToken(generateToken());
		// redirect user to /list
	};*/
export function Home({ handleNewToken }) {
	return (
		<div className="Home">
			<p>
				Hello from the home (<code>/</code>) page!
			</p>
			<Link to="/list">
				<button onClick={handleNewToken}>New List</button>
			</Link>
		</div>
	);
}
//<button onClick={generateListToken}>New List</button>
