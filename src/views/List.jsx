import { useState } from 'react';
import { ListItem } from '../components';

export function List({ data, listToken }) {
	const [searchTerm, setSearchTerm] = useState('');

	return (
		<>
			<form>
				<label htmlFor="search-term">Filter items:</label>
				<input
					type="text"
					id="search-term"
					value={searchTerm}
					placeholder="Start typing here.."
					onChange={(event) => setSearchTerm(event.target.value)}
				/>
			</form>

			<ul>
				{data.map((item) => (
					<ListItem key={item.id} name={item.name} />
				))}
			</ul>
		</>
	);
}
