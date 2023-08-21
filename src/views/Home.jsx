import './Home.css';
import { generateToken } from '@the-collab-lab/shopping-list-utils';

export function Home({ setListToken }) {
	const generateListToken = () => {
		setListToken(generateToken());
	};

	return (
		<div className="Home">
			<p>
				Hello from the home (<code>/</code>) page!
			</p>
			<button onClick={generateListToken}>New List</button>
		</div>
	);
}
