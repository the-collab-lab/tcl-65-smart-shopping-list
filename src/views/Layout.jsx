import { NavLink, Outlet } from 'react-router-dom';
import './Layout.css';

/**
 * TODO: The links defined in this file don't work!
 *
 * Instead of anchor element, they should use a component
 * from `react-router-dom` to navigate to the routes
 * defined in `App.jsx`.
 */

export function Layout({ listToken }) {
	const handleCopyToken = () => {
		// Creates a temporary input element to copy the token
		const tempInput = document.createElement('input');
		tempInput.value = listToken;
		document.body.appendChild(tempInput);
		tempInput.select();
		document.execCommand('copy');
		document.body.removeChild(tempInput);

		alert('List Token copied to clipboard!');
	};

	const listTokenDisplay = (
		<div className="list-token">
			<p>
				{listToken && 'Current list token: '}
				<span>{listToken}</span>
				{listToken && (
					<button className="button-small" onClick={handleCopyToken}>
						Copy Token
					</button>
				)}
			</p>
		</div>
	);

	return (
		<>
			<div className="Layout">
				<header className="Layout-header">
					<h1>Fresh Out Of...</h1>
					<h2>
						Welcome to your Smart shopping list that learns your buying habits
						over time!
					</h2>
					{listTokenDisplay}
				</header>
				<main className="Layout-main">
					<Outlet />
				</main>
				<nav className="Nav">
					<div className="Nav-container">
						<NavLink className="Nav-link" to="/">
							Home
						</NavLink>
						<NavLink className="Nav-link" to="/list">
							List
						</NavLink>
						<NavLink className="Nav-link" to="/add-item">
							Add Item
						</NavLink>
					</div>
				</nav>
			</div>
		</>
	);
}
