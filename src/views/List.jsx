import { useEffect, useState } from 'react';
import { ListItem } from '../components';
import { useNavigate } from 'react-router-dom';
import './List.css';

export function List({ data, listToken }) {
	const [searchTerm, setSearchTerm] = useState('');
	const [filteredData, setFilteredData] = useState([]);
	const navigate = useNavigate();

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

	const handleAddItem = () => {
		navigate('/add-item');
	};

	return data.length > 0 ? (
		<>
			<form className="filter-form">
				<label htmlFor="search-term">
					Search items:{'  '}
					<input
						type="text"
						id="search-term"
						value={searchTerm}
						placeholder="Start typing here.."
						onChange={(event) => setSearchTerm(event.target.value)}
					></input>
				</label>
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
						item={item}
						listId={listToken} //added listId
					/>
				))}
			</ul>
		</>
	) : (
		<>
			<p>The shopping list is currently empty</p>
			<button
				className="button-primary add-item-button"
				onClick={handleAddItem}
			>
				Add Item
			</button>
		</>
	);
}
