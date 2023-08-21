import { ListItem } from '../components';

export function List({ data, listToken }) {
	// console.log(listToken);
	if (!listToken) {
		console.log('!listToken');
		// redirect to Home
		// window.location.href = "/"
	}

	return (
		<>
			<p>
				Hello from the <code>/list</code> page!
			</p>
			<ul>
				{data.map((item) => (
					<ListItem key={item.id} name={item.name} />
				))}
			</ul>
		</>
	);
}
