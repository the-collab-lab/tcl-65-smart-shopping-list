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
	return (
		<>
			<div className="Layout">
				<header className="Layout-header">
					<h1>Fresh Out Of...</h1>
					<h2>Smart shopping list</h2>
					<p className="list-token">{listToken}</p>
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
