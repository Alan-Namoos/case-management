import { useState, useEffect } from 'react';

export const useFindClient = (clients, id, history) => {
	const [currentClient, setCurrentClient] = useState({});

	useEffect(() => {
		// if (clients.length === 0) {
		// 	history.push('/');
		// 	return;
		// }
		console.log('custom hook');
		if (clients.length > 0) {
			const client = clients.find((arrayClient) => {
				return arrayClient.id === id;
			});
			if (client) {
				setCurrentClient(client);
			}
		}
	}, [clients, id]);
	return [currentClient];
};
