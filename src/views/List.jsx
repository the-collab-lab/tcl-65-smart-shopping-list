import { useEffect, useState } from 'react';
import { ListItem } from '../components';
import { updateItem } from '../api/firebase';

export function List({ data, listToken }) {
	const [searchTerm, setSearchTerm] = useState('');
	const [filteredData, setFilteredData] = useState([]);

	// Function to update the filteredData based on the searchTerm
	const updateFilteredData = () => {
		const filteredItems = data.filter((item) => {
			if (item.name) {
				return item.name.toLowerCase().includes(searchTerm.toLowerCase());
			}
		});
		setFilteredData(filteredItems);
	};

	// Update filteredData whenever searchTerm or data changes
	useEffect(() => {
		updateFilteredData();
	}, [searchTerm, data]);

	const handleClear = () => {
		setSearchTerm('');
		setFilteredData(data);
	};

	return (
		<>
			<form className="filter-form">
				<label htmlFor="search-term">Filter items:</label>
				<input
					type="text"
					id="search-term"
					value={searchTerm}
					placeholder="Start typing here.."
					onChange={(event) => setSearchTerm(event.target.value)}
				></input>
				{searchTerm.length > 0 && (
					<button type="reset" className="clear" onClick={handleClear}>
						X
					</button>
				)}
			</form>

			<ul>
				{filteredData.map((item) => (
					<ListItem
						key={item.id}
						name={item.name}
						itemId={item.id}
						listId={listToken} //added listId
						dateLastPurchased={item.dateLastPurchased}
						totalPurchases={item.totalPurchases}
						updateItem={updateItem}
						data={data}
					/>
				))}
			</ul>
		</>
	);
}
