import { ListItem } from '../components';
import { redirect } from 'react-router-dom';

export function List({ data, listToken }) {
	console.log(listToken);
	if (listToken) {
		return redirect('/');
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
